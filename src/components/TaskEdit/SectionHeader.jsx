import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from '@rneui/themed';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const SectionHeader = ({ title, icon }) => {
  return (
    <View style={styles.sectionHeader}>
      <Icon name={icon} type="feather" size={20} color="#2c3e50" />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};
