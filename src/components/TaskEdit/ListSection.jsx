import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SectionHeader } from './SectionHeader';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const ListSection = ({ boardLists, selectedListId, onListChange }) => {
  return (
    <>
      <SectionHeader title="Liste" icon="list" />
      <View style={styles.card}>
        <Picker
          selectedValue={selectedListId}
          onValueChange={onListChange}
          style={styles.picker}
        >
          {boardLists.map((list) => (
            <Picker.Item
              key={list.id}
              label={list.name}
              value={list.id}
            />
          ))}
        </Picker>
      </View>
    </>
  );
};
