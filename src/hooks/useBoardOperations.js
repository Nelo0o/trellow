import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from './useAuth';

export const useBoardOperations = () => {
  const [boards, setBoards] = useState([]);
  const { user } = useAuth();  // Utilisation du hook useAuth existant

  useEffect(() => {
    if (!user) return;

    const boardsCollection = collection(db, 'Boards');
    const q = query(
      boardsCollection,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const boardList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBoards(boardList);
    });

    return () => unsubscribe();
  }, [user]);

  const addBoard = async (boardData) => {
    if (!user) return;

    try {
      const boardsCollection = collection(db, 'Boards');
      const newBoard = {
        ...boardData,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };
      await addDoc(boardsCollection, newBoard);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du tableau:', error);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await deleteDoc(doc(db, 'Boards', boardId));
    } catch (error) {
      console.error('Erreur lors de la suppression du tableau:', error);
    }
  };

  const updateBoard = async (boardId, updatedData) => {
    try {
      const boardRef = doc(db, 'Boards', boardId);
      await updateDoc(boardRef, updatedData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du tableau:', error);
    }
  };

  return { boards, addBoard, deleteBoard, updateBoard };
};
