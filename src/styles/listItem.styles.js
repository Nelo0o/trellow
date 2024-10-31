import { StyleSheet } from 'react-native';
import { colors, spacing, shadows, typography } from '../theme';

const styles = StyleSheet.create({
  listCard: {
    width: 320,
    marginHorizontal: spacing.sm,
    padding: spacing.md,
    borderRadius: spacing.md,
    flex: 1,
    maxHeight: '85%',
    backgroundColor: colors.surface,
    shadowColor: colors.text.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  draggingList: {
    shadowColor: colors.text.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listTitle: {
    fontSize: typography.h2.fontSize,
    fontWeight: '600',
    color: colors.text.primary,
  },
  tasksContainer: {
    flex: 0,
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    padding: spacing.sm,
    overflow: 'hidden',
    maxHeight: '81%',
    height: 'auto',
  },
  draggableList: {
    flex: 0,
    height: 'auto',
  },
  addTaskButton: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    alignItems: 'center',
    shadowColor: colors.text.secondary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  addTaskText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: typography.body.fontSize,
  },
});

export default styles;
