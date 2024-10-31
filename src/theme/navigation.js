import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows } from './shadows';

export const navigation = {
  tab: {
    bar: {
      backgroundColor: colors.surface,
      borderTopColor: colors.border,
      height: 85,
      paddingVertical: spacing.xs,
      ...shadows.medium,
    },
    label: {
      ...typography.small,
      marginTop: spacing.xs,
    },
    icon: {
      size: 18,
      marginTop: spacing.xs,
    },
  },
  stack: {
    header: {
      backgroundColor: colors.primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    title: {
      ...typography.h2,
      color: colors.surface,
    },
  },
};
