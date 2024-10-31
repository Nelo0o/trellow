import { StyleSheet } from 'react-native';
import { colors, spacing, shadows, typography, commonStyles } from '../theme';

export const taskEditStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: 'white',
    height: 'auto',
    borderRadius: 12,
    padding: spacing.lg,
    margin: spacing.xxs,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  textAreaInput: {
    textAlignVertical: 'top',
    minHeight: 100,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.md,
    ...typography.body,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  priorityChip: {
    marginVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageDeleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButtonText: {
    marginLeft: spacing.sm,
    ...typography.body,
    color: colors.text.primary,
  },
  picker: {
    marginHorizontal: -spacing.lg,
    marginVertical: -spacing.md,
  },
  buttonContainer: {
    padding: spacing.xs,
    paddingBottom: spacing.xl + spacing.lg,
    backgroundColor: colors.background,
  },
  buttonWrapper: {
    marginVertical: spacing.xs,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  dialogText: {
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.text.primary,
  },
  dialogCancelButton: {
    color: colors.text.secondary,
  },
  dialogDeleteButton: {
    color: colors.danger,
  },
  predefinedColors: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.lg,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    marginBottom: spacing.sm,
  },
  tagColor: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.xs,
  },
  removeTagButton: {
    padding: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
  colorButtonDisabled: {
    opacity: 0.5,
  },
});
