import { StyleSheet } from 'react-native';
import { colors, spacing, commonStyles, shadows } from '../theme';

export const boardTreeStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    height: '100%',
  },
  listsContainer: {
    padding: spacing.lg,
    flex: 1,
  },
  addListButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 160,
    borderRadius: 25,
    ...shadows.medium,
  },
  addListButtonStyle: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: spacing.md,
  },
  addListButtonText: {
    color: colors.surface,
    fontWeight: '600',
  },
  dialogInput: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
});
