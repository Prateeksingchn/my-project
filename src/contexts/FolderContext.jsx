import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'folders'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const foldersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFolders(foldersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createFolder = async (name) => {
    try {
      const newFolder = {
        name,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await addDoc(collection(db, 'folders'), newFolder);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      await deleteDoc(doc(db, 'folders', folderId));
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const renameFolder = async (folderId, newName) => {
    try {
      await updateDoc(doc(db, 'folders', folderId), {
        name: newName,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error renaming folder:', error);
    }
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        selectedFolder,
        setSelectedFolder,
        createFolder,
        deleteFolder,
        renameFolder,
        loading
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error('useFolder must be used within a FolderProvider');
  }
  return context;
}; 