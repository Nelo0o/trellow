import { createTheme } from '@rneui/themed';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = createTheme({
  lightColors: {
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    white: colors.surface,
    error: colors.danger,
  },

  components: {
    Button: {
      raised: false,
      buttonStyle: {
        borderRadius: 8,
        paddingVertical: spacing.md,
      },
      titleStyle: typography.button,
    },

    Card: {
      containerStyle: {
        borderRadius: 12,
        margin: 0,
      },
    },

    Text: {
      h1Style: typography.h1,
      h2Style: typography.h2,
      style: typography.body,
    },
  },
});
