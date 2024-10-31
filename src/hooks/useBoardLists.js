import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection,
  serverTimestamp,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from './useAuth';

export const useBoardLists = (boardId) => {
  const [boardLists, setBoardLists] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!boardId) return;

    const boardListsCollection = collection(db, 'Boards', boardId, 'Lists');
    const listsQuery = query(boardListsCollection, orderBy('order', 'asc'));

    const unsubscribe = onSnapshot(listsQuery, (snapshot) => {
      setBoardLists(prev => {
        const newLists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Ne mettre à jour que si les données ont changé
        if (JSON.stringify(prev) === JSON.stringify(newLists)) {
          return prev;
        }
        return newLists;
      });
    });

    return () => unsubscribe();
  }, [boardId]);

  const addBoardList = useCallback(async (boardId, listData) => {
    if (!user) return;

    try {
      const boardListsCollection = collection(db, 'Boards', boardId, 'Lists');
      const lastList = boardLists[boardLists.length - 1];
      const newOrder = lastList ? (lastList.order || 0) + 1000 : 1000;

      await addDoc(boardListsCollection, {
        ...listData,
        order: newOrder,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la liste:', error);
    }
  }, [user, boardLists]);

  const updateBoardList = useCallback(async (boardId, listId, listData) => {
    if (!user || !boardId || !listId || !listData) return;
    try {
      await updateDoc(doc(db, 'Boards', boardId, 'Lists', listId), listData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la liste:', error);
    }
  }, [user]);

  const deleteBoardList = useCallback(async (boardId, listId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'Boards', boardId, 'Lists', listId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la liste:', error);
    }
  }, [user]);

  const updateListsOrder = useCallback(async (boardId, newLists) => {
    if (!user) return;

    try {
      const batch = writeBatch(db);

      newLists.forEach((list, index) => {
        const listRef = doc(db, 'Boards', boardId, 'Lists', list.id);
        batch.update(listRef, { order: index * 1000 });
      });

      await batch.commit();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'ordre des listes:', error);
    }
  }, [user]);

  return useMemo(() => ({
    boardLists,
    addBoardList,
    updateBoardList,
    updateListsOrder,
    deleteBoardList
  }), [boardLists, addBoardList, updateBoardList, updateListsOrder, deleteBoardList]);
};
