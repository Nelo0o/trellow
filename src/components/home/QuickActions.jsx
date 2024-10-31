import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@rneui/themed';
import { colors, commonStyles } from '../../theme';
import { homeStyles } from '../../styles/home.styles';

const QuickActions = ({ actions }) => (
  <View style={homeStyles.quickActionsGrid}>
    {actions.map((action) => (
      <TouchableOpacity
        key={action.label}
        onPress={action.disabled ? null : action.onPress}
        style={[
          commonStyles.card,
          homeStyles.quickActionCard,
          action.disabled && homeStyles.disabledCard
        ]}
      >
        <Icon
          name={action.icon}
          type="material"
          color={action.disabled ? colors.grey : action.color}
          size={32}
        />
        <Text style={[
          homeStyles.quickActionLabel,
          action.disabled && homeStyles.disabledText
        ]}>
          {action.label}
          {action.disabled && '\n(Vérifiez votre email)'}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default QuickActions;
