import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useCountdowns } from '../CountdownsContext';
import { useTheme } from '../theme';
import {
  countdownLabel,
  daysUntil,
  formatLongDate,
} from '../utils/date';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const { getById, setArchived, removeCountdown } = useCountdowns();
  const countdown = getById(route.params.id);

  if (!countdown) {
    return (
      <SafeAreaView
        style={[styles.safe, styles.center, { backgroundColor: theme.background }]}
      >
        <Text style={{ color: theme.textMuted }}>This countdown was removed.</Text>
      </SafeAreaView>
    );
  }

  const days = daysUntil(countdown.date);
  const bigNumber = days === 0 ? 'Today' : Math.abs(days).toString();
  const unit =
    days === 0 ? '' : Math.abs(days) === 1 ? 'day' : 'days';

  const confirmDelete = () => {
    Alert.alert(
      'Delete countdown',
      `Remove "${countdown.title}"? This can't be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeCountdown(countdown.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
      edges={['left', 'right', 'bottom']}
    >
      <View style={styles.hero}>
        <View style={[styles.dot, { backgroundColor: countdown.color }]} />
        <Text style={[styles.title, { color: theme.text }]}>
          {countdown.title}
        </Text>
        <Text style={[styles.date, { color: theme.textMuted }]}>
          {formatLongDate(countdown.date)}
        </Text>

        <View style={styles.numberBlock}>
          <Text style={[styles.number, { color: countdown.color }]}>
            {bigNumber}
          </Text>
          {unit ? (
            <Text style={[styles.unit, { color: theme.textMuted }]}>{unit}</Text>
          ) : null}
        </View>
        <Text style={[styles.label, { color: theme.text }]}>
          {countdownLabel(countdown.date)}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => setArchived(countdown.id, !countdown.archived)}
          style={({ pressed }) => [
            styles.action,
            {
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={[styles.actionText, { color: theme.text }]}>
            {countdown.archived ? 'Unarchive' : 'Archive'}
          </Text>
        </Pressable>

        <Pressable
          onPress={confirmDelete}
          style={({ pressed }) => [
            styles.action,
            {
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={[styles.actionText, { color: theme.danger }]}>
            Delete
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  date: {
    fontSize: 15,
    marginTop: 8,
  },
  numberBlock: {
    alignItems: 'center',
    marginTop: 40,
  },
  number: {
    fontSize: 88,
    fontWeight: '900',
    lineHeight: 96,
  },
  unit: {
    fontSize: 18,
    marginTop: -6,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
  },
  action: {
    flex: 1,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
