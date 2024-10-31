import { StyleSheet } from 'react-native';
import { colors, spacing, shadows, typography } from '../theme';

const styles = StyleSheet.create({
  taskItem: {
    marginVertical: spacing.xs,
  },
  draggingTask: {
    opacity: 0.7,
    ...shadows.small,
  },
  taskCard: {
    margin: 0,
    marginVertical: spacing.xxs,
    padding: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderLeftWidth: 0,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  taskTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityIcon: {
    marginRight: spacing.sm,
  },
  taskTitle: {
    flex: 1,
    ...typography.body,
    fontWeight: '500',
  },
  description: {
    ...typography.small,
    color: colors.text.secondary,
    marginVertical: spacing.xs,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  tag: {
    width: 20,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: spacing.xs,
  },
  dueDate: {
    ...typography.small,
    color: colors.text.secondary,
  },
  overdue: {
    color: colors.danger,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  priorityLabel: {
    ...typography.small,
    marginLeft: spacing.xxs,
    fontWeight: '600',
  },
});

export default styles;
