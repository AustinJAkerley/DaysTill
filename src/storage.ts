import AsyncStorage from '@react-native-async-storage/async-storage';
import { Countdown } from './types';

const STORAGE_KEY = 'daystill.countdowns.v1';

export async function loadCountdowns(): Promise<Countdown[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Countdown[];
  } catch {
    return [];
  }
}

export async function saveCountdowns(countdowns: Countdown[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
  } catch {
    // Persisting failed (e.g. storage full); state stays in memory for the session.
  }
}
