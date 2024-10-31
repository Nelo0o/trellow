import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerContainer: {
    borderBottomWidth: 0,
    ...Platform.select({
      android: {
        height: 80,
        paddingTop: 10,
      },
    }),
  },
  headerTitle: {
    ...typography.h2,
    color: colors.surface,
  },
  backIcon: {
    marginLeft: spacing.sm,
  },
});
