import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Countdown } from '../types';
import { useTheme } from '../theme';
import { countdownLabel, daysUntil, formatLongDate } from '../utils/date';

type Props = {
  countdown: Countdown;
  onPress: () => void;
};

export default function CountdownCard({ countdown, onPress }: Props) {
  const theme = useTheme();
  const days = daysUntil(countdown.date);
  const bigNumber =
    days === 0 ? 'Today' : Math.abs(days).toString();
  const unit = days === 0 ? '' : Math.abs(days) === 1 ? 'day' : 'days';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={[styles.accent, { backgroundColor: countdown.color }]} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {countdown.title}
        </Text>
        <Text style={[styles.date, { color: theme.textMuted }]}>
          {formatLongDate(countdown.date)}
        </Text>
        {countdown.archived ? (
          <Text style={[styles.archived, { color: theme.textMuted }]}>
            Archived
          </Text>
        ) : null}
      </View>
      <View style={styles.count}>
        <Text style={[styles.number, { color: countdown.color }]}>
          {bigNumber}
        </Text>
        {unit ? (
          <Text style={[styles.unit, { color: theme.textMuted }]}>{unit}</Text>
        ) : null}
        <Text style={[styles.sub, { color: theme.textMuted }]}>
          {days < 0 && days !== 0 ? countdownLabel(countdown.date) : days > 0 ? 'left' : ''}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 12,
    overflow: 'hidden',
  },
  accent: {
    width: 6,
    alignSelf: 'stretch',
  },
  body: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  date: {
    fontSize: 13,
    marginTop: 4,
  },
  archived: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  count: {
    minWidth: 84,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  number: {
    fontSize: 28,
    fontWeight: '800',
  },
  unit: {
    fontSize: 12,
    marginTop: -2,
  },
  sub: {
    fontSize: 11,
    marginTop: 2,
  },
});
