import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  writeBatch,
  serverTimestamp,
  addDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  orderBy,
  getDoc,
  getDocs,
  where
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

export const useBoardTasks = (boardId, boardLists) => {
  const [boardTasks, setBoardTasks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!boardId || !boardLists.length) return;

    setIsLoading(true);
    const unsubscribes = boardLists.map(list => {
      const tasksQuery = query(
        collection(db, 'Boards', boardId, 'Lists', list.id, 'Tasks'),
        orderBy('order', 'asc')
      );

      return onSnapshot(
        tasksQuery,
        (snapshot) => {
          const tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBoardTasks(prev => ({
            ...prev,
            [list.id]: tasks
          }));
          setIsLoading(false);
        },
        (err) => {
          console.error('Erreur lors de l\'écoute des tâches:', err);
          setError(err);
          setIsLoading(false);
        }
      );
    });

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [boardId, boardLists]);

  const getAllTasks = async () => {
    try {
      let totalTasks = 0;
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error('Utilisateur non connecté');
      }

      const boardsQuery = query(
        collection(db, 'Boards'),
        where('userId', '==', userId)
      );
      const boardsSnapshot = await getDocs(boardsQuery);

      for (const boardDoc of boardsSnapshot.docs) {
        const listsQuery = query(collection(db, 'Boards', boardDoc.id, 'Lists'));
        const listsSnapshot = await getDocs(listsQuery);

        for (const listDoc of listsSnapshot.docs) {
          const tasksQuery = query(collection(db, 'Boards', boardDoc.id, 'Lists', listDoc.id, 'Tasks'));
          const tasksSnapshot = await getDocs(tasksQuery);
          totalTasks += tasksSnapshot.size;
        }
      }
      return totalTasks;
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      return 0;
    }
  };

  const addBoardTask = async (boardId, listId, taskData) => {
    try {
      const tasksCollection = collection(db, 'Boards', boardId, 'Lists', listId, 'Tasks');
      const currentTasks = boardTasks[listId] || [];
      const maxOrder = currentTasks.reduce((max, task) =>
        Math.max(max, task.order || 0), 0);

      await addDoc(tasksCollection, {
        ...taskData,
        order: maxOrder + 1000,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        tags: [],
        dueDate: null,
        priority: 'MEDIUM',
        completed: false
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
      throw error;
    }
  };

  const deleteBoardTask = async (boardId, listId, taskId) => {
    try {
      await deleteDoc(doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', taskId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      throw error;
    }
  };

  const updateTasksOrder = async (boardId, listId, reorderedTasks) => {
    try {
      const batch = writeBatch(db);

      reorderedTasks.forEach((task, index) => {
        const taskRef = doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', task.id);
        batch.update(taskRef, {
          order: calculateOrder(index, reorderedTasks.length),
          updatedAt: serverTimestamp()
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'ordre:', error);
      throw error;
    }
  };

  const moveTaskBetweenLists = async (boardId, taskId, sourceListId, targetListId, taskData, newOrder) => {
    try {
      const batch = writeBatch(db);

      const sourceTaskRef = doc(db, 'Boards', boardId, 'Lists', sourceListId, 'Tasks', taskId);
      batch.delete(sourceTaskRef);

      const targetTasks = boardTasks[targetListId] || [];
      const maxOrder = targetTasks.reduce((max, task) =>
        Math.max(max, task.order || 0), 0);

      const targetTaskRef = doc(db, 'Boards', boardId, 'Lists', targetListId, 'Tasks', taskId);
      batch.set(targetTaskRef, {
        ...taskData,
        order: maxOrder + 1000,
        updatedAt: serverTimestamp(),
        movedAt: serverTimestamp(),
        listId: targetListId
      });

      await batch.commit();
    } catch (error) {
      console.error('Erreur lors du déplacement de la tâche:', error);
      throw error;
    }
  };

  const updateTaskName = async (boardId, listId, taskId, name) => {
    try {
      const taskRef = doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', taskId);
      await updateDoc(taskRef, {
        name,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom de la tâche:', error);
      throw error;
    }
  };

  const updateTaskDescription = async (boardId, listId, taskId, description) => {
    try {
      const taskRef = doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', taskId);
      await updateDoc(taskRef, {
        description,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la description:', error);
      throw error;
    }
  };

  const updateTaskImages = async (boardId, listId, taskId, imageFiles) => {
    try {
      console.log('Début upload images:', imageFiles);

      const uploadPromises = imageFiles.map(async (file) => {
        try {
          const fileName = `tasks/${boardId}/${taskId}/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
          const imageRef = ref(storage, fileName);

          const response = await fetch(file.uri);
          const blob = await response.blob();

          console.log('Uploading file:', fileName);

          const metadata = {
            contentType: 'image/jpeg',
          };

          const snapshot = await uploadBytes(imageRef, blob, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);

          return downloadURL;

        } catch (error) {
          console.error('Erreur pendant l\'upload individuel:', error);
          throw error;
        }
      });

      const imageUrls = await Promise.all(uploadPromises);

      const taskRef = doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', taskId);

      const taskDoc = await getDoc(taskRef);
      const existingImages = taskDoc.data()?.images || [];

      await updateDoc(taskRef, {
        images: [...existingImages, ...imageUrls],
        updatedAt: serverTimestamp()
      });

      return imageUrls;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw error;
    }
  };

  const updateTaskTags = async (boardId, listId, taskId, tags) => {
    try {
      const taskRef = doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', taskId);
      await updateDoc(taskRef, {
        tags,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des tags:', error);
      throw error;
    }
  };

  const updateTaskDueDate = async (boardId, listId, taskId, dueDate) => {
    try {
      const taskRef = doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', taskId);
      await updateDoc(taskRef, {
        dueDate: dueDate || null,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la date limite:', error);
      throw error;
    }
  };

  const updateTaskPriority = async (boardId, listId, taskId, priority) => {
    try {
      const taskRef = doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', taskId);
      await updateDoc(taskRef, {
        priority,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la priorité:', error);
      throw error;
    }
  };

  const calculateOrder = (index, totalItems) => {
    const BASE_ORDER = 1000;
    const SPACING = 1000;

    if (totalItems <= 1) return BASE_ORDER;

    return (index + 1) * SPACING;
  };

  const removeTaskImage = async (boardId, listId, taskId, imageUrl) => {
    try {

      if (!imageUrl) {
        throw new Error('URL de l\'image non définie');
      }

      const taskRef = doc(db, 'Boards', boardId, 'Lists', listId, 'Tasks', taskId);

      const taskDoc = await getDoc(taskRef);
      const currentImages = taskDoc.data()?.images || [];

      const updatedImages = currentImages.filter(img => img !== imageUrl);

      await updateDoc(taskRef, {
        images: updatedImages,
        updatedAt: serverTimestamp()
      });

      try {
        const fileRef = ref(storage, imageUrl);
        await deleteObject(fileRef);
      } catch (storageError) {
        console.warn('Erreur lors de la suppression du fichier storage:', storageError);
      }

      return true;
    } catch (error) {
      console.error('Erreur détaillée lors de la suppression:', error);
      throw error;
    }
  };

  return {
    boardTasks,
    getAllTasks,
    isLoading,
    error,
    addBoardTask,
    deleteBoardTask,
    updateTasksOrder,
    moveTaskBetweenLists,
    updateTaskName,
    updateTaskDescription,
    updateTaskImages,
    updateTaskTags,
    updateTaskDueDate,
    updateTaskPriority,
    removeTaskImage
  };
};
