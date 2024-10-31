import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Card, Icon } from '@rneui/themed';
import { format, parseISO, isValid } from 'date-fns';
import styles from '../styles/taskItem.styles';
import { colors } from '../theme';

const PRIORITIES = {
  high: {
    color: colors.priority.high.main,
    background: colors.priority.high.background,
    label: 'Haute',
  },
  medium: {
    color: colors.priority.medium.main,
    background: colors.priority.medium.background,
    label: 'Moyenne',
  },
  low: {
    color: colors.priority.low.main,
    background: colors.priority.low.background,
    label: 'Basse',
  },
};

const TaskItem = ({ item: task, drag, isActive, listId, onTaskPress }) => {
  const formatTaskDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return '';
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'dd/MM/yyyy') : '';
  };

  const getPriorityInfo = (priority) => {
    if (!priority) return null;
    const normalizedPriority = priority.toLowerCase();
    return PRIORITIES[normalizedPriority] || null;
  };

  const priorityInfo = getPriorityInfo(task.priority);

  return (
    <TouchableOpacity
      onLongPress={drag}
      onPress={() => onTaskPress(task, listId)}
      disabled={isActive}
      style={[styles.taskItem, isActive && styles.draggingTask]}
    >
      <Card containerStyle={[
        styles.taskCard,
        priorityInfo && { borderLeftWidth: 4, borderLeftColor: priorityInfo.color }
      ]}>
        <View style={styles.taskHeader}>
          <View style={styles.taskTitleContainer}>
            <Text style={styles.taskTitle} numberOfLines={1}>
              {task.name}
            </Text>
          </View>
          {priorityInfo && (
            <View style={[
              styles.priorityContainer,
              { backgroundColor: priorityInfo.background }
            ]}>
              <Icon
                name="flag"
                type="feather"
                size={12}
                color={priorityInfo.color}
                style={styles.priorityIcon}
              />
              <Text style={[
                styles.priorityLabel,
                { color: priorityInfo.color }
              ]}>
                {priorityInfo.label}
              </Text>
            </View>
          )}
        </View>

        {task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}

        <View style={styles.taskFooter}>
          <View style={styles.tagsContainer}>
            {(task.tags || []).map((tag, index) => (
              <View
                key={index}
                style={[styles.tag, { backgroundColor: tag }]}
              />
            ))}
          </View>

          {task.dueDate && (
            <View style={styles.dueDateContainer}>
              <Icon
                name="calendar"
                type="feather"
                size={12}
                color={colors.text.secondary}
                containerStyle={styles.dateIcon}
              />
              <Text style={[
                styles.dueDate,
                new Date(task.dueDate) < new Date() && styles.overdue
              ]}>
                {formatTaskDate(task.dueDate)}
              </Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default TaskItem;
