import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Input } from '@rneui/themed';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import useBoards from '../hooks/useBoards';
import { boardTreeStyles } from '../styles/boardTree.styles';
import { colors } from '../theme';

export default function BoardTreeScreen({ route, navigation }) {
  const { boardId } = route.params;
  const {
    boardLists,
    addBoardList,
    updateBoardList,
    deleteBoardList,
    boardTasks,
    addBoardTask,
    updateListsOrder,
    updateTasksOrder,
  } = useBoards(boardId);

  const [name, setName] = useState('');
  const [isListDialogVisible, setIsListDialogVisible] = useState(false);

  const handleAddList = () => {
    if (name.trim()) {
      addBoardList(boardId, { name: name.trim() });
      setName('');
      setIsListDialogVisible(false);
    }
  };

  const handleTaskPress = (task, listId) => {
    navigation.navigate('TaskEdit', {
      task: { ...task, id: task.id },
      listId,
      boardId
    });
  };

  const renderList = ({ item: list, drag, isActive }) => (
    <ListItem
      item={list}
      drag={drag}
      isActive={isActive}
      boardId={boardId}
      boardTasks={boardTasks}
      updateTasksOrder={updateTasksOrder}
      onTaskPress={handleTaskPress}
      onUpdateList={(list) => updateBoardList(boardId, list.id, { name: list.name })}
      onDeleteList={(listId) => deleteBoardList(boardId, listId)}
      onAddTask={(listId, taskName) => addBoardTask(boardId, listId, { name: taskName })}
    />
  );

  return (
    <View style={boardTreeStyles.container}>
      <Header title="Arborescence" showBackButton={true} />

      <DraggableFlatList
        horizontal
        data={boardLists}
        renderItem={renderList}
        keyExtractor={item => item.id}
        onDragEnd={({ data }) => updateListsOrder(boardId, data)}
        containerStyle={boardTreeStyles.listsContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      <Button
        title="+ Ajouter une liste"
        containerStyle={boardTreeStyles.addListButton}
        buttonStyle={boardTreeStyles.addListButtonStyle}
        titleStyle={boardTreeStyles.addListButtonText}
        onPress={() => setIsListDialogVisible(true)}
      />

      <Dialog
        isVisible={isListDialogVisible}
        onBackdropPress={() => setIsListDialogVisible(false)}
      >
        <Dialog.Title title="Ajouter une liste" />
        <Input
          placeholder="Nom de la liste"
          value={name}
          onChangeText={setName}
          autoFocus
          containerStyle={boardTreeStyles.dialogInput}
        />
        <Dialog.Actions>
          <Dialog.Button
            title="Annuler"
            onPress={() => setIsListDialogVisible(false)}
            titleStyle={{ color: colors.secondary }}
          />
          <Dialog.Button
            title="Ajouter"
            onPress={() => handleAddList()}
            titleStyle={{ color: colors.primary }}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
