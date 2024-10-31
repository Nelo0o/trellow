import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './useAuth';


export default function useUser() {
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();

  const addUserPseudo = async (userId, pseudo) => {
    try {
      console.log('Tentative d\'ajout du pseudo dans useUser:', pseudo);
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        pseudo: pseudo,
        createdAt: serverTimestamp(),
      }, { merge: true });

      setUserData(prev => ({
        ...prev,
        pseudo: pseudo
      }));

      console.log('Pseudo ajouté avec succès dans useUser');
    } catch (error) {
      console.error('Erreur dans addUserPseudo:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        }
      });

      return () => unsubscribe();
    } else {
      setUserData(null);
    }
  }, [user]);

  const updateUserPseudo = async (pseudo) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      await setDoc(doc(db, 'Users', userId), { pseudo: pseudo });
    }
  };

  return {
    addUserPseudo,
    updateUserPseudo,
    userData,
  };
}
