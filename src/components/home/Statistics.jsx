import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from '@rneui/themed';
import { colors, commonStyles } from '../../theme';
import { homeStyles } from '../../styles/home.styles';
import useStatistics from '../../hooks/useStatistics';

const Statistics = () => {
  const stats = useStatistics();

  return (
    <View style={[commonStyles.card, homeStyles.statsContainer]}>
      {stats.map((stat) => (
        <View key={stat.label} style={homeStyles.statItem}>
          <Icon
            name={stat.icon}
            type="material"
            color={colors.primary}
            size={32}
          />
          <Text style={homeStyles.statValue}>{stat.value}</Text>
          <Text style={homeStyles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default Statistics;
