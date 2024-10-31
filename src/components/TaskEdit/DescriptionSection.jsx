import React from 'react';
import { View } from 'react-native';
import { Input } from '@rneui/themed';
import { SectionHeader } from './SectionHeader';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const DescriptionSection = ({ description, onChangeDescription }) => {
  return (
    <>
      <SectionHeader title="Description" icon="file-text" />
      <View style={styles.card}>
        <Input
          placeholder="Description de la tâche"
          value={description}
          onChangeText={onChangeDescription}
          multiline
          numberOfLines={4}
          leftIcon={null}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.textAreaInput}
        />
      </View>
    </>
  );
};
