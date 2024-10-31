import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { SectionHeader } from './SectionHeader';
import { colors } from '../../theme';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const TagsSection = ({ selectedTags, onTagAdd, onTagRemove }) => {
  return (
    <>
      <SectionHeader title="Étiquettes" icon="tag" />
      <View style={styles.card}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.predefinedColors}
        >
          {colors.tags.map((color) => {
            const isSelected = selectedTags.includes(color);
            return (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  isSelected && styles.colorButtonDisabled
                ]}
                onPress={() => !isSelected && onTagAdd(color)}
                disabled={isSelected}
              >
                <Icon
                  name={isSelected ? "check" : "plus"}
                  type="feather"
                  size={16}
                  color={isSelected ? "#666" : "white"}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {selectedTags.length > 0 && (
          <View style={styles.tagsList}>
            {selectedTags.map((color) => (
              <View key={color} style={styles.tagContainer}>
                <View style={[styles.tagColor, { backgroundColor: color }]} />
                <TouchableOpacity
                  style={styles.removeTagButton}
                  onPress={() => onTagRemove(color)}
                >
                  <Icon name="x" type="feather" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    </>
  );
};
