import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import { AuthProvider } from './src/hooks/useAuth';
import AppNavigator from './src/components/AppNavigator';
import { theme } from './src/theme/rneui-theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
