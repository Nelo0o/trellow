import React, { useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Text, Icon } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SectionHeader } from './SectionHeader';
import { taskEditStyles as styles } from '../../styles/taskEdit.styles';

export const DateSection = ({ dateISO, onDateChange, onClearDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateSelect = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <>
      <SectionHeader title="Date d'échéance" icon="calendar" />
      <TouchableOpacity
        style={[styles.card, styles.dateButton]}
        onPress={() => setShowDatePicker(true)}
      >
        <View style={styles.dateContent}>
          <Text style={styles.dateButtonText}>
            {dateISO
              ? format(parseISO(dateISO), 'dd MMMM yyyy', { locale: fr })
              : 'Sélectionner une date'
            }
          </Text>
        </View>
        {dateISO && (
          <Icon
            name="x-circle"
            type="feather"
            size={20}
            color="#666"
            onPress={onClearDate}
          />
        )}
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateISO ? parseISO(dateISO) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? "spinner" : "default"}
          onChange={handleDateSelect}
        />
      )}
    </>
  );
};
