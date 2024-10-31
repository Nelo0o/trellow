import React, { useState, useMemo } from 'react';
import { View, ScrollView, Alert, RefreshControl } from 'react-native';
import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../hooks/useAuth';
import { useEmailVerification } from '../hooks/useEmailVerification';
import Header from '../components/Header';
import EmailVerification from '../components/home/EmailVerification';
import QuickActions from '../components/home/QuickActions';
import Statistics from '../components/home/Statistics';
import { colors, commonStyles } from '../theme';
import { homeStyles } from '../styles/home.styles';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const {
    isEmailVerified,
    canResendEmail,
    countdown,
    fadeAnim,
    handleResendEmail,
    handleManualRefresh
  } = useEmailVerification(user);

  const quickActions = useMemo(() => [
    {
      icon: 'add-box',
      label: 'Nouveau tableau',
      onPress: () => navigation.navigate('CreateBoard'),
      color: colors.primary,
      disabled: !isEmailVerified
    },
    {
      icon: 'list-alt',
      label: 'Mes tableaux',
      onPress: () => navigation.navigate('Boards'),
      color: colors.primary,
      disabled: !isEmailVerified
    },
    {
      icon: 'person',
      label: 'Mon profil',
      onPress: () => navigation.navigate('Profile'),
      color: colors.primary,
      disabled: false
    },
  ], [isEmailVerified, navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de se déconnecter.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await handleManualRefresh();
    setRefreshing(false);
  };

  return (
    <View style={commonStyles.container}>
      <Header title="Accueil" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        style={homeStyles.content}
      >
        <EmailVerification
          user={user}
          isEmailVerified={isEmailVerified}
          fadeAnim={fadeAnim}
          onResendEmail={handleResendEmail}
          canResend={canResendEmail}
          countdown={countdown}
        />

        <QuickActions actions={quickActions} />

        <Statistics />

        <Button
          title="Se déconnecter"
          onPress={handleLogout}
          containerStyle={homeStyles.logoutButton}
          buttonStyle={[commonStyles.button, { backgroundColor: colors.danger }]}
        />
      </ScrollView>
    </View>
  );
}
