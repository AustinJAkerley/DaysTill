import React, { useMemo } from 'react';
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useCountdowns } from '../CountdownsContext';
import { useTheme } from '../theme';
import { daysUntil } from '../utils/date';
import CountdownCard from '../components/CountdownCard';
import { Countdown } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const { countdowns, loading } = useCountdowns();

  const sections = useMemo(() => {
    const active = countdowns
      .filter((c) => !c.archived)
      .sort((a, b) => daysUntil(a.date) - daysUntil(b.date));
    const archived = countdowns
      .filter((c) => c.archived)
      .sort((a, b) => daysUntil(b.date) - daysUntil(a.date));

    const result: { title: string; data: Countdown[] }[] = [];
    if (active.length) result.push({ title: 'Upcoming', data: active });
    if (archived.length) result.push({ title: 'Archived', data: archived });
    return result;
  }, [countdowns]);

  const isEmpty = !loading && countdowns.length === 0;

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.header}>
        <Text style={[styles.heading, { color: theme.text }]}>Days Till</Text>
        <Text style={[styles.subheading, { color: theme.textMuted }]}>
          {countdowns.filter((c) => !c.archived).length} active
        </Text>
      </View>

      {isEmpty ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            No countdowns yet
          </Text>
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Tap the + button to start counting down to something.
          </Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <Text style={[styles.sectionHeader, { color: theme.textMuted }]}>
              {section.title}
            </Text>
          )}
          renderItem={({ item }) => (
            <CountdownCard
              countdown={item}
              onPress={() => navigation.navigate('Detail', { id: item.id })}
            />
          )}
        />
      )}

      <Pressable
        onPress={() => navigation.navigate('Add')}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: theme.accent, opacity: pressed ? 0.9 : 1 },
        ]}
        accessibilityLabel="Add countdown"
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
  },
  subheading: {
    fontSize: 15,
    marginTop: 2,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 120,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
    marginTop: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '300',
  },
});
