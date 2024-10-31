import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Input, Button, Text, Icon } from '@rneui/themed';
import { useAuth } from '../hooks/useAuth';
import { colors, commonStyles } from '../theme';
import { loginStyles } from '../styles/login.styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      let message = 'Une erreur est survenue lors de la connexion';

      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Aucun compte trouvé avec cet email';
          break;
        case 'auth/wrong-password':
          message = 'Mot de passe incorrect';
          break;
        case 'auth/invalid-email':
          message = 'L\'adresse email n\'est pas valide';
          break;
        case 'auth/user-disabled':
          message = 'Ce compte a été désactivé';
          break;
        default:
          if (error.message === 'Veuillez vérifier votre email avant de vous connecter') {
            message = error.message;
          }
          break;
      }

      Alert.alert('Oups !', message);
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={loginStyles.content}>
        <View style={loginStyles.header}>
          <Text style={loginStyles.title}>Connexion</Text>
          <Text style={loginStyles.subtitle}>Bienvenue sur Trellow</Text>
        </View>

        <View style={[commonStyles.card, loginStyles.formCard]}>
          <Input
            placeholder="Email"
            leftIcon={
              <Icon
                name="email"
                type="material"
                color={colors.primary}
                size={24}
              />
            }
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={loginStyles.inputContainer}
            inputContainerStyle={loginStyles.inputField}
          />
          <Input
            placeholder="Mot de passe"
            leftIcon={
              <Icon
                name="lock"
                type="material"
                color={colors.primary}
                size={24}
              />
            }
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            containerStyle={loginStyles.inputContainer}
            inputContainerStyle={loginStyles.inputField}
          />

          <Button
            title="Se connecter"
            onPress={handleLogin}
            containerStyle={loginStyles.buttonContainer}
            buttonStyle={commonStyles.button}
          />
        </View>

        <Button
          title="Pas de compte ? S'inscrire"
          type="clear"
          onPress={() => navigation.navigate('Register')}
          titleStyle={loginStyles.linkButtonText}
        />
      </View>
    </View>
  );
}
