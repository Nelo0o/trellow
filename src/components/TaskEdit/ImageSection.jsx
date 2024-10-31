import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SectionHeader } from './SectionHeader';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const ImageSection = ({ images, onImageAdd, onImageDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <SectionHeader title="Images" icon="image" />
      <View style={styles.card}>
        <View style={styles.imagesContainer}>
          {images.map((imageUrl, index) => (
            <View key={index} style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => setSelectedImage(imageUrl)}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageDeleteButton}
                onPress={() => onImageDelete(imageUrl)}
              >
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addImageButton}
            onPress={onImageAdd}
          >
            <MaterialIcons name="add-photo-alternate" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setSelectedImage(null)}
        >
          <Image
            source={{ uri: selectedImage }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};
