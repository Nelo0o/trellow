import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const loginStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
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
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
  linkButtonText: {
    ...typography.button,
    color: colors.primary,
  },
});
