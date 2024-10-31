import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from '@rneui/themed';
import useBoards from '../hooks/useBoards';
import Header from '../components/Header';
import { commonStyles } from '../theme';
import { createBoardStyles as styles } from '../styles/createBoard.styles';

export default function CreateBoardScreen({ navigation }) {
  const { addBoard } = useBoards();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateBoard = async () => {
    const newBoard = {
      name,
      description,
    };
    await addBoard(newBoard);
    navigation.goBack();
  };

  return (
    <View style={commonStyles.container}>
      <Header
        title="Créer un tableau"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={[commonStyles.card, styles.formCard]}>
          <Input
            placeholder="Nom du tableau"
            onChangeText={setName}
            value={name}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputField}
            label="Nom"
            labelStyle={styles.inputLabel}
          />
          <Input
            placeholder="Description du tableau"
            onChangeText={setDescription}
            value={description}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputField}
            label="Description"
            labelStyle={styles.inputLabel}
            multiline
          />
        </View>
        <Button
          title="Créer"
          onPress={handleCreateBoard}
          containerStyle={styles.buttonContainer}
          buttonStyle={commonStyles.button}
          disabled={!name.trim()}
        />
      </View>
    </View>
  );
}
