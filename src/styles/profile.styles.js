import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const profileStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  profileCard: {
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: spacing.md,
  },
  pseudoText: {
    ...typography.h2,
    color: colors.text.primary,
  },
  bioSection: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  bioText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'left',
  },
  buttonContainer: {
    width: '100%',
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
});
