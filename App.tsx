import DateTimePicker from '@react-native-community/datetimepicker';
import { AnimatedClock } from 'components/AnimatedClock';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Platform, SafeAreaView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (selectedDate?: Date) => {
    setDate(selectedDate);
    hidePicker();
  };
  const onChange = (selectedDate?: Date) => {
    setDate(selectedDate);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#121212',
      }}>
      <StatusBar style="inverted" />
      <AnimatedClock customDate={date} color="gold" width={24} height={24} strokeWidth={20} />
      <AnimatedClock customDate={date} color="skyblue" width={48} height={48} strokeWidth={20} />
      <DateTimePicker
        value={date ?? new Date()}
        mode="time"
        onChange={(event, selectedDate) => onChange(selectedDate)}
        display="spinner"
        neutralButtonLabel="OK"
        negativeButtonLabel="Cancel"
        themeVariant="dark"
      />
      <Button title="Show Time Picker" onPress={showPicker} />
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      />
    </SafeAreaView>
  );
}
