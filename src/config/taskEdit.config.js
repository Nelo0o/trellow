import { colors } from '../theme';

export const PRIORITY_CONFIG = {
  high: {
    color: colors.priority.high.main,
    label: 'Haute',
    icon: 'alert-circle',
    backgroundColor: colors.priority.high.background
  },
  medium: {
    color: colors.priority.medium.main,
    label: 'Moyenne',
    icon: 'alert-triangle',
    backgroundColor: colors.priority.medium.background
  },
  low: {
    color: colors.priority.low.main,
    label: 'Basse',
    icon: 'info',
    backgroundColor: colors.priority.low.background
  }
};
