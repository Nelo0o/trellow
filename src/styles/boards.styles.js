import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const boardsStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  listContainer: {
    gap: spacing.md,
  },
  boardCard: {
    marginBottom: spacing.md,
  },
  boardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  boardName: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  boardDescription: {
    ...typography.body,
    color: colors.text.secondary,
  },
  createButtonContainer: {
    marginTop: 'auto',
    marginBottom: spacing.md,
  },
  createButton: {
    backgroundColor: colors.success,
  },
});
