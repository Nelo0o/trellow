import React from 'react';
import { View } from 'react-native';
import { Chip } from '@rneui/themed';
import { SectionHeader } from './SectionHeader';
import { PRIORITY_CONFIG } from '../../config/taskEdit.config';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const PrioritySection = ({ priority, onPriorityChange }) => {
  return (
    <>
      <SectionHeader title="Priorité" icon="flag" />
      <View style={[styles.card, styles.priorityContainer]}>
        {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
          <Chip
            key={key}
            type="outline"
            title={config.label}
            icon={{
              name: config.icon,
              type: 'feather',
              size: 20,
              color: priority === key ? 'white' : config.color,
            }}
            onPress={() => onPriorityChange(key)}
            containerStyle={[
              styles.priorityChip,
              {
                backgroundColor: priority === key ? config.color : config.backgroundColor,
              }
            ]}
            buttonStyle={{ borderWidth: 0 }}
            titleStyle={{
              color: priority === key ? 'white' : config.color,
              fontWeight: '600'
            }}
          />
        ))}
      </View>
    </>
  );
};
