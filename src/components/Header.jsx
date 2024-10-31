import React from 'react';
import { Header as RNEHeader } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import { headerStyles } from '../styles/header.styles';

const Header = ({ title, showBackButton = false }) => {
  const navigation = useNavigation();

  return (
    <RNEHeader
      statusBarProps={{
        backgroundColor: colors.primary,
        barStyle: 'light-content',
      }}
      backgroundColor={colors.primary}
      leftComponent={
        showBackButton
          ? {
            icon: 'arrow-back',
            type: 'ionicon',
            color: colors.surface,
            size: 24,
            onPress: () => navigation.goBack(),
            iconStyle: headerStyles.backIcon,
          }
          : undefined
      }
      centerComponent={{
        text: title,
        style: headerStyles.headerTitle,
      }}
      containerStyle={headerStyles.headerContainer}
    />
  );
};

export default Header;
