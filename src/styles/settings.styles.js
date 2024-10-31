import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const settingsStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.md,
  },
  settingLabel: {
    ...typography.body,
    color: colors.text.primary,
  },
  valueText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  divider: {
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  developmentText: {
    ...typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
