import { colors } from './colors';
import { spacing } from './spacing';
import { shadows } from './shadows';

export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.surface,
    margin: spacing.xxs,
    ...shadows.small,
  },
  listCard: {
    width: 320,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    margin: spacing.xxs,
    ...shadows.small,
  },
  button: {
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  }
};
