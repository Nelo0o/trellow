import { useState, useCallback } from 'react';
import useBoards from './useBoards';
import * as ImagePicker from 'expo-image-picker';
import { useRequestPermissions } from './useRequestPermissions';
import { Alert } from 'react-native';

export const useTaskEdit = ({ task, listId, boardId, navigation }) => {
  const { boardLists, updateTaskName, updateTaskDescription, updateTaskTags, updateTaskDueDate,
          updateTaskPriority, deleteBoardTask, moveTaskBetweenLists,
          updateTaskImages, removeTaskImage } = useBoards(boardId);

  const [taskName, setTaskName] = useState(task.name || '');
  const [taskDescription, setTaskDescription] = useState(task.description || '');
  const [selectedTags, setSelectedTags] = useState(task.tags || []);
  const [priority, setPriority] = useState(task.priority?.toLowerCase() || 'medium');
  const [dateISO, setDateISO] = useState(task.dueDate || null);
  const [images, setImages] = useState(task.images || []);
  const [selectedListId, setSelectedListId] = useState(listId);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const { requestPermissions } = useRequestPermissions();

  const handlers = {
    handleNameChange: setTaskName,
    handleDescriptionChange: setTaskDescription,
    handlePriorityChange: setPriority,

    handleDateChange: (date) => {
      setDateISO(date ? date.toISOString() : null);
    },

    handleClearDate: useCallback((e) => {
      e?.stopPropagation();
      setDateISO(null);
    }, []),

    handleTagAdd: (tag) => {
      setSelectedTags(prev => [...prev, tag]);
    },

    handleTagRemove: (tagToRemove) => {
      setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
    },

    handleImageAdd: async () => {
      try {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          quality: 0.8,
        });

        if (!result.canceled && result.assets) {
          const newImages = result.assets.map(asset => ({
            uri: asset.uri,
            name: `image_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.jpg`,
            type: 'image/jpeg'
          }));

          const updatedImages = await updateTaskImages(boardId, listId, task.id, newImages);
          setImages(prev => [...prev, ...updatedImages]);
        }
      } catch (error) {
        console.error('Erreur de sélection:', error);
        Alert.alert('Erreur', 'Erreur lors de la sélection: ' + error.message);
      }
    },

    handleImageDelete: async (imageUrl) => {
      try {
        await removeTaskImage(boardId, listId, task.id, imageUrl);
        setImages(prev => prev.filter(img => img !== imageUrl));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        Alert.alert('Erreur', 'Impossible de supprimer l\'image.');
      }
    },

    handleListChange: async (newListId) => {
      if (newListId !== listId) {
        try {
          await moveTaskBetweenLists(boardId, task.id, listId, newListId, task, 1000);
          navigation.goBack();
        } catch (error) {
          console.error('Erreur lors du déplacement:', error);
        }
      }
    },

    handleSave: async () => {
      try {
        const updates = [];

        if (taskName !== task.name) {
          updates.push(updateTaskName(boardId, listId, task.id, taskName));
        }
        if (taskDescription !== task.description) {
          updates.push(updateTaskDescription(boardId, listId, task.id, taskDescription));
        }
        if (JSON.stringify(selectedTags) !== JSON.stringify(task.tags)) {
          updates.push(updateTaskTags(boardId, listId, task.id, selectedTags));
        }
        if (dateISO !== task.dueDate) {
          updates.push(updateTaskDueDate(boardId, listId, task.id, dateISO));
        }
        if (priority !== task.priority) {
          updates.push(updateTaskPriority(boardId, listId, task.id, priority));
        }

        await Promise.all(updates);
        navigation.goBack();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
      }
    },

    handleDeleteTask: async () => {
      try {
        await deleteBoardTask(boardId, listId, task.id);
        navigation.goBack();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    },

    setIsDeleteDialogVisible,
    boardLists
  };

  return {
    taskName,
    taskDescription,
    selectedTags,
    priority,
    dateISO,
    images,
    selectedListId,
    isDeleteDialogVisible,
    handlers
  };
};
