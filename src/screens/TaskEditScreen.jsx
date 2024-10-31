import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../components/Header';
import { TaskNameSection } from '../components/TaskEdit/TaskNameSection';
import { DescriptionSection } from '../components/TaskEdit/DescriptionSection';
import { PrioritySection } from '../components/TaskEdit/PrioritySection';
import { DateSection } from '../components/TaskEdit/DateSection';
import { TagsSection } from '../components/TaskEdit/TagsSection';
import { ImageSection } from '../components/TaskEdit/ImageSection';
import { ListSection } from '../components/TaskEdit/ListSection';
import { ActionButtons } from '../components/TaskEdit/ActionButtons';
import { DeleteConfirmDialog } from '../components/TaskEdit/DeleteConfirmDialog';
import { useTaskEdit } from '../hooks/useTaskEdit';
import { taskEditStyles as styles } from '../styles/taskEdit.styles';

export default function TaskEditScreen({ route, navigation }) {
  const { task, listId, boardId } = route.params;

  const {
    taskName,
    taskDescription,
    selectedTags,
    priority,
    dateISO,
    images,
    selectedListId,
    isDeleteDialogVisible,
    handlers
  } = useTaskEdit({ task, listId, boardId, navigation });

  return (
    <View style={styles.container}>
      <Header title={task.name} showBackButton={true} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TaskNameSection
          name={taskName}
          onChangeName={handlers.handleNameChange}
        />

        <DescriptionSection
          description={taskDescription}
          onChangeDescription={handlers.handleDescriptionChange}
        />

        <PrioritySection
          priority={priority}
          onPriorityChange={handlers.handlePriorityChange}
        />

        <DateSection
          dateISO={dateISO}
          onDateChange={handlers.handleDateChange}
          onClearDate={handlers.handleClearDate}
        />

        <TagsSection
          selectedTags={selectedTags}
          onTagAdd={handlers.handleTagAdd}
          onTagRemove={handlers.handleTagRemove}
        />

        <ImageSection
          images={images}
          onImageAdd={handlers.handleImageAdd}
          onImageDelete={handlers.handleImageDelete}
        />

        <ListSection
          boardLists={handlers.boardLists}
          selectedListId={selectedListId}
          onListChange={handlers.handleListChange}
        />

        <ActionButtons
          onSave={handlers.handleSave}
          onDelete={() => handlers.setIsDeleteDialogVisible(true)}
        />
      </ScrollView>

      <DeleteConfirmDialog
        isVisible={isDeleteDialogVisible}
        onConfirm={handlers.handleDeleteTask}
        onCancel={() => handlers.setIsDeleteDialogVisible(false)}
      />
    </View>
  );
}
