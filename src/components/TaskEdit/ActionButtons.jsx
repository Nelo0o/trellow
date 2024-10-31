import React from 'react';
import { View } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const ActionButtons = ({ onSave, onDelete }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Enregistrer"
        icon={
          <Icon
            name="check"
            type="feather"
            color="white"
            size={20}
            style={styles.buttonIcon}
          />
        }
        onPress={onSave}
        containerStyle={styles.buttonWrapper}
        buttonStyle={styles.saveButton}
      />

      <Button
        title="Supprimer la tâche"
        icon={
          <Icon
            name="trash-2"
            type="feather"
            color="white"
            size={20}
            style={styles.buttonIcon}
          />
        }
        onPress={onDelete}
        containerStyle={styles.buttonWrapper}
        buttonStyle={styles.deleteButton}
      />
    </View>
  );
};
