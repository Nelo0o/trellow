import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const homeStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  welcomeText: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  statLabel: {
    ...typography.small,
    color: colors.text.secondary,
    marginTop: spacing.xxs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  quickActionCard: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    minWidth: '30%',
    borderRadius: 8,
  },
  quickActionLabel: {
    ...typography.small,
    color: colors.text.secondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
  warningCard: {
    backgroundColor: '#FFF3E0',
    borderColor: colors.warning,
    marginBottom: 15,
    borderRadius: 8,
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  warningText: {
    marginLeft: 10,
    flex: 1,
    color: colors.warning,
    fontSize: 14,
  },
  disabledCard: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  disabledText: {
    color: colors.grey,
    fontSize: 12,
    textAlign: 'center',
  },
  verificationContainer: {
    marginHorizontal: spacing.xxs,
    marginVertical: spacing.md,
  },
  verificationCard: {
    borderRadius: 15,
    padding: spacing.lg,
    margin: spacing.xxs,
    backgroundColor: colors.surface,
    elevation: 4,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  instructionsContainer: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  instructionText: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    paddingLeft: spacing.sm,
  },
  resendButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    marginVertical: spacing.md,
  },
  resendButtonText: {
    ...typography.button,
    marginRight: spacing.xs,
  },
  spamWarning: {
    ...typography.small,
    color: colors.warning,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
