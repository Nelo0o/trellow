import React from 'react';
import { Text } from 'react-native';
import { Dialog } from '@rneui/themed';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const DeleteConfirmDialog = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onCancel}
    >
      <Dialog.Title title="Confirmation" />
      <Text style={styles.dialogText}>
        Êtes-vous sûr de vouloir supprimer cette tâche ?
      </Text>
      <Dialog.Actions>
        <Dialog.Button
          title="Annuler"
          onPress={onCancel}
          titleStyle={styles.dialogCancelButton}
        />
        <Dialog.Button
          title="Supprimer"
          onPress={onConfirm}
          titleStyle={styles.dialogDeleteButton}
        />
      </Dialog.Actions>
    </Dialog>
  );
};
