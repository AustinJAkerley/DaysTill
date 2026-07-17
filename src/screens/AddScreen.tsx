import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useCountdowns } from '../CountdownsContext';
import { PALETTE, useTheme } from '../theme';
import { formatLongDate, toISODate } from '../utils/date';

type Props = NativeStackScreenProps<RootStackParamList, 'Add'>;

export default function AddScreen({ navigation }: Props) {
  const theme = useTheme();
  const { addCountdown } = useCountdowns();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [color, setColor] = useState(PALETTE[0]);
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');

  const canSave = title.trim().length > 0;

  const onChangeDate = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (event.type === 'set' && selected) {
      setDate(selected);
    }
  };

  const onSave = () => {
    if (!canSave) return;
    addCountdown({
      title: title.trim(),
      date: toISODate(date),
      color,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
      edges={['left', 'right', 'bottom']}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.label, { color: theme.textMuted }]}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Summer vacation"
            placeholderTextColor={theme.textMuted}
            style={[
              styles.input,
              {
                color: theme.text,
                backgroundColor: theme.inputBackground,
                borderColor: theme.cardBorder,
              },
            ]}
            autoFocus
            returnKeyType="done"
            maxLength={60}
          />

          <Text style={[styles.label, { color: theme.textMuted }]}>
            Target date
          </Text>
          {Platform.OS === 'android' && (
            <Pressable
              onPress={() => setShowPicker(true)}
              style={[
                styles.input,
                styles.dateButton,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Text style={{ color: theme.text, fontSize: 16 }}>
                {formatLongDate(toISODate(date))}
              </Text>
            </Pressable>
          )}
          {showPicker && (
            <View style={styles.pickerWrap}>
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onChangeDate}
                minimumDate={undefined}
                themeVariant={theme.dark ? 'dark' : 'light'}
              />
            </View>
          )}

          <Text style={[styles.label, { color: theme.textMuted }]}>Color</Text>
          <View style={styles.palette}>
            {PALETTE.map((c) => {
              const selected = c === color;
              return (
                <Pressable
                  key={c}
                  onPress={() => setColor(c)}
                  style={[
                    styles.swatch,
                    { backgroundColor: c },
                    selected && {
                      borderColor: theme.text,
                      borderWidth: 3,
                    },
                  ]}
                  accessibilityLabel={`Color ${c}`}
                />
              );
            })}
          </View>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: theme.separator }]}>
          <Pressable
            onPress={onSave}
            disabled={!canSave}
            style={({ pressed }) => [
              styles.saveButton,
              {
                backgroundColor: canSave ? theme.accent : theme.cardBorder,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.saveText,
                { color: canSave ? '#FFFFFF' : theme.textMuted },
              ]}
            >
              Save countdown
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
  },
  dateButton: {
    justifyContent: 'center',
  },
  pickerWrap: {
    marginTop: 4,
    alignItems: 'flex-start',
  },
  palette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderColor: 'transparent',
  },
  footer: {
    padding: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  saveButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
