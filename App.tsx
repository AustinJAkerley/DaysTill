import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/navigation';
import { CountdownsProvider } from './src/CountdownsContext';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const navTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <CountdownsProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              options={{ title: 'New Countdown', presentation: 'modal' }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ title: '', headerBackTitle: 'Back' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CountdownsProvider>
    </SafeAreaProvider>
  );
}

