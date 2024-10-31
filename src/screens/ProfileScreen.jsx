import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import useUser from '../hooks/useUser';
import { Input, Button, Text, Dialog, Avatar } from '@rneui/themed';
import { commonStyles } from '../theme';
import { profileStyles } from '../styles/profile.styles';

export default function ProfileScreen() {
  const { userData, updateUserPseudo } = useUser();
  const [newPseudo, setNewPseudo] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  const handleUpdatePseudo = () => {
    updateUserPseudo(newPseudo);
    toggleDialog();
  };

  return (
    <View style={commonStyles.container}>
      <Header title="Profil" />
      <View style={profileStyles.content}>
        <View style={[commonStyles.card, profileStyles.profileCard]}>
          <View style={profileStyles.avatarContainer}>
            <Avatar
              size={100}
              rounded
              icon={{ name: 'person', type: 'material' }}
              containerStyle={profileStyles.avatar}
            />
            <Text style={profileStyles.pseudoText}>
              {userData?.pseudo ? String(userData.pseudo) : 'Aucun pseudo'}
            </Text>
          </View>

          <View style={profileStyles.bioSection}>
            <Text style={profileStyles.sectionTitle}>Bio</Text>
            <Text style={profileStyles.bioText}>
              Une bio qui manque d'inspiration.
            </Text>
          </View>

          <Button
            title={`${userData ? 'Modifier' : 'Ajouter un'} pseudo`}
            onPress={toggleDialog}
            containerStyle={profileStyles.buttonContainer}
            buttonStyle={commonStyles.button}
          />
        </View>
      </View>

      <Dialog
        isVisible={isDialogVisible}
        onBackdropPress={toggleDialog}
      >
        <Dialog.Title title="Modifier le pseudo" />
        <Input
          placeholder="Nouveau pseudo"
          onChangeText={setNewPseudo}
          containerStyle={profileStyles.inputContainer}
          inputContainerStyle={profileStyles.inputField}
        />
        <Dialog.Actions>
          <Dialog.Button
            title="Annuler"
            onPress={toggleDialog}
          />
          <Dialog.Button
            title="Enregistrer"
            onPress={handleUpdatePseudo}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
