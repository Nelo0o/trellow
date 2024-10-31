import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Card, Icon, Dialog, Input } from '@rneui/themed';
import DraggableFlatList from 'react-native-draggable-flatlist';
import TaskItem from './TaskItem';
import styles from '../styles/listItem.styles';

const ListItem = ({
  item: list,
  drag,
  isActive,
  boardId,
  boardTasks,
  updateTasksOrder,
  onTaskPress,
  onUpdateList,
  onDeleteList,
  onAddTask,
}) => {
  const [isTaskDialogVisible, setIsTaskDialogVisible] = React.useState(false);
  const [isDeleteListDialogVisible, setIsDeleteListDialogVisible] = React.useState(false);
  const [taskName, setTaskName] = React.useState('');
  const [isEditListDialogVisible, setIsEditListDialogVisible] = React.useState(false);
  const [listName, setListName] = React.useState(list.name);

  const handleAddTask = () => {
    if (taskName.trim()) {
      onAddTask(list.id, taskName.trim());
      setTaskName('');
      setIsTaskDialogVisible(false);
    }
  };

  const handleUpdateList = () => {
    if (listName.trim()) {
      onUpdateList({ ...list, name: listName.trim() });
      setIsEditListDialogVisible(false);
    }
  };

  return (
    <Card containerStyle={[styles.listCard, isActive && styles.draggingList]}>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={styles.listHeader}
        onPress={() => setIsEditListDialogVisible(true)}
      >
        <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>
        <TouchableOpacity onPress={() => setIsDeleteListDialogVisible(true)}>
          <Icon name="trash" type="feather" size={20} color="#FF4444" />
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.tasksContainer}>
        <DraggableFlatList
          data={boardTasks[list.id] || []}
          renderItem={(props) => (
            <TaskItem {...props} listId={list.id} onTaskPress={onTaskPress} />
          )}
          keyExtractor={item => item.id}
          onDragEnd={({ data }) => updateTasksOrder(boardId, list.id, data)}
          activationDistance={8}
          dragHitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          scrollEnabled={true}
          style={styles.draggableList}
        />
      </View>

      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => setIsTaskDialogVisible(true)}
      >
        <Text style={styles.addTaskText}>+ Ajouter une tâche</Text>
      </TouchableOpacity>

      <Dialog isVisible={isTaskDialogVisible} onBackdropPress={() => setIsTaskDialogVisible(false)}>
        <Dialog.Title title="Ajouter une tâche" />
        <Input
          placeholder="Nom de la tâche"
          value={taskName}
          onChangeText={setTaskName}
          autoFocus
        />
        <Dialog.Actions>
          <Dialog.Button
            title="Annuler"
            onPress={() => {
              setTaskName('');
              setIsTaskDialogVisible(false);
            }}
          />
          <Dialog.Button title="Ajouter" onPress={() => handleAddTask()} />
        </Dialog.Actions>
      </Dialog>
      <Dialog isVisible={isDeleteListDialogVisible} onBackdropPress={() => setIsDeleteListDialogVisible(false)}>
        <Dialog.Title title="Supprimer la liste ?" />
        <Dialog.Actions>
          <Dialog.Button title="Annuler" onPress={() => setIsDeleteListDialogVisible(false)} />
          <Dialog.Button title="Supprimer" onPress={() => onDeleteList(list.id)} />
        </Dialog.Actions>
      </Dialog>
      <Dialog isVisible={isEditListDialogVisible} onBackdropPress={() => setIsEditListDialogVisible(false)}>
        <Dialog.Title title="Modifier la liste" />
        <Input
          placeholder="Nom de la liste"
          value={listName}
          onChangeText={setListName}
          autoFocus
        />
        <Dialog.Actions>
          <Dialog.Button
            title="Annuler"
            onPress={() => {
              setListName(list.name);
              setIsEditListDialogVisible(false);
            }}
          />
          <Dialog.Button title="Modifier" onPress={() => handleUpdateList()} />
        </Dialog.Actions>
      </Dialog>
    </Card>
  );
};

export default ListItem;
