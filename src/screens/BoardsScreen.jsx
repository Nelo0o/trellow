import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Dialog, Icon } from '@rneui/themed';
import useBoards from '../hooks/useBoards';
import Header from '../components/Header';
import { colors, typography, commonStyles } from '../theme';
import { boardsStyles } from '../styles/boards.styles';

export default function BoardsScreen({ navigation }) {
  const { boards, deleteBoard } = useBoards();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [boardToDeleteId, setBoardToDeleteId] = useState(null);

  const toggleDialog = (boardId = null) => {
    setBoardToDeleteId(boardId);
    setIsDialogVisible(!isDialogVisible);
  };

  return (
    <View style={commonStyles.container}>
      <Header
        title="Tableaux"
        showBackButton={false}
      />
      <View style={boardsStyles.content}>
        <Text style={boardsStyles.title}>Mes Tableaux ({boards.length})</Text>
        <FlatList
          data={boards}
          keyExtractor={item => item.id}
          contentContainerStyle={boardsStyles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BoardTree', { boardId: item.id })}
            >
              <View style={[commonStyles.card, boardsStyles.boardCard]}>
                <View style={boardsStyles.boardContent}>
                  <View style={boardsStyles.textContainer}>
                    <Text style={boardsStyles.boardName}>{item.name}</Text>
                    <Text style={boardsStyles.boardDescription}>{item.description}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleDialog(item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Icon
                      name="delete-outline"
                      type="material"
                      color={colors.danger}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <Button
          title="Créer un tableau"
          containerStyle={boardsStyles.createButtonContainer}
          buttonStyle={commonStyles.button}
          onPress={() => navigation.navigate('CreateBoard')}
        />
      </View>

      <Dialog
        isVisible={isDialogVisible}
        onBackdropPress={() => toggleDialog()}
      >
        <Dialog.Title title="Supprimer le tableau ?" />
        <Text style={typography.body}>Voulez-vous vraiment supprimer ce tableau ?</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="Annuler"
            onPress={() => toggleDialog()}
          />
          <Dialog.Button
            title="Supprimer"
            titleStyle={{ color: colors.danger }}
            onPress={({ boardId = boardToDeleteId }) => {
              deleteBoard(boardId);
              toggleDialog();
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
