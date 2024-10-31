import React from 'react';
import { View } from 'react-native';
import { Input, Dialog } from '@rneui/themed';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';
import { SectionHeader } from './SectionHeader';

export const TaskNameSection = ({ name, onChangeName }) => {
  return (
    <>
      <SectionHeader title="Nom de la tâche" icon="file-text" />
      <View style={styles.container}>
        <Input
          style={styles.card}
          value={name}
          onChangeText={onChangeName}
          placeholder="Nom de la tâche"
          inputContainerStyle={styles.inputContainer}
        />
      </View>
    </>
  );
};
