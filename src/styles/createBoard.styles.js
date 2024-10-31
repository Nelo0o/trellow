import { StyleSheet } from 'react-native';
import { colors, spacing, typography, commonStyles } from '../theme';

export const createBoardStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  formCard: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  inputField: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  inputLabel: {
    ...typography.body,
    color: colors.text.primary,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
});
