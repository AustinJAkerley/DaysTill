import { useColorScheme } from 'react-native';

export type Theme = {
  dark: boolean;
  background: string;
  card: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  accent: string;
  danger: string;
  inputBackground: string;
  separator: string;
};

const light: Theme = {
  dark: false,
  background: '#F5F6FA',
  card: '#FFFFFF',
  cardBorder: '#D3D7E0',
  text: '#0B1220',
  textMuted: '#6B7280',
  accent: '#3B82F6',
  danger: '#EF4444',
  inputBackground: '#FFFFFF',
  separator: '#E5E7EB',
};

const dark: Theme = {
  dark: true,
  background: '#0B1220',
  card: '#161E2E',
  cardBorder: '#31405A',
  text: '#F3F4F6',
  textMuted: '#9AA4B2',
  accent: '#60A5FA',
  danger: '#F87171',
  inputBackground: '#161E2E',
  separator: '#232C3D',
};

/** Accent colors a user can assign to a countdown. */
export const PALETTE: string[] = [
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#EF4444', // red
  '#F59E0B', // amber
  '#10B981', // emerald
  '#14B8A6', // teal
  '#6366F1', // indigo
];

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
