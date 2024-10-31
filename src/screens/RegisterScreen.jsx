import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Input, Button, Text, Icon } from '@rneui/themed';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import useUser from '../hooks/useUser';
import { colors, commonStyles } from '../theme';
import { registerStyles } from '../styles/register.styles';
import { useAuth } from '../hooks/useAuth';

export default function RegisterScreen({ navigation }) {
  const { addUserPseudo } = useUser();
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (!pseudo.trim()) {
      Alert.alert('Erreur', 'Le pseudo est requis');
      return;
    }

    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      const cleanPseudo = pseudo.trim();

      try {
        await addUserPseudo(user.uid, cleanPseudo);

        Alert.alert(
          'Inscription réussie',
          'Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } catch (pseudoError) {
        Alert.alert('Erreur', 'Erreur lors de la création du profil');
      }
    } catch (error) {
      let message = 'Une erreur est survenue lors de l\'inscription';

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Cet email est déjà utilisé';
          break;
        case 'auth/weak-password':
          message = 'Le mot de passe doit contenir au moins 6 caractères';
          break;
        case 'auth/invalid-email':
          message = 'L\'adresse email n\'est pas valide';
          break;
        default:
          break;
      }

      Alert.alert('Erreur', message);
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={registerStyles.content}>
        <View style={registerStyles.header}>
          <Text style={registerStyles.title}>Inscription</Text>
          <Text style={registerStyles.subtitle}>Créez votre compte</Text>
        </View>

        <View style={[commonStyles.card, registerStyles.formCard]}>
          <Input
            placeholder="Pseudo"
            leftIcon={
              <Icon
                name="person"
                type="material"
                color={colors.primary}
                size={24}
              />
            }
            onChangeText={setPseudo}
            value={pseudo}
            containerStyle={registerStyles.inputContainer}
            inputContainerStyle={registerStyles.inputField}
          />
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
            containerStyle={registerStyles.inputContainer}
            inputContainerStyle={registerStyles.inputField}
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
            containerStyle={registerStyles.inputContainer}
            inputContainerStyle={registerStyles.inputField}
          />
          <Input
            placeholder="Confirmer le mot de passe"
            leftIcon={
              <Icon
                name="lock"
                type="material"
                color={colors.primary}
                size={24}
              />
            }
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            containerStyle={registerStyles.inputContainer}
            inputContainerStyle={registerStyles.inputField}
          />

          <Button
            title="S'inscrire"
            onPress={handleRegister}
            containerStyle={registerStyles.buttonContainer}
            buttonStyle={commonStyles.button}
          />
        </View>

        <Button
          title="Déjà un compte ? Se connecter"
          type="clear"
          onPress={() => navigation.navigate('Login')}
          titleStyle={registerStyles.linkButtonText}
        />
      </View>
    </View>
  );
}
