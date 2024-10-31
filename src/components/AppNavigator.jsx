import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useAuth } from '../hooks/useAuth';
import { colors, typography, spacing, navigation } from '../theme';
import { TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BoardsScreen from '../screens/BoardsScreen';
import CreateBoardScreen from '../screens/CreateBoardScreen';
import BoardTreeScreen from '../screens/BoardTreeScreen';
import TaskEditScreen from '../screens/TaskEditScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackScreenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: colors.background },
};

const BoardStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="BoardsList" component={BoardsScreen} />
    <Stack.Screen name="BoardTree" component={BoardTreeScreen} />
    <Stack.Screen
      name="CreateBoard"
      component={CreateBoardScreen}
      options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          ...typography.h2,
        },
      }}
    />
    <Stack.Screen name="TaskEdit" component={TaskEditScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const { user } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(user?.emailVerified || false);

  useEffect(() => {
    const checkEmailVerification = setInterval(async () => {
      if (user && !isEmailVerified) {
        try {
          await user.reload();
          const updatedUser = auth.currentUser;
          if (updatedUser?.emailVerified) {
            setIsEmailVerified(true);
            clearInterval(checkEmailVerification);
          }
        } catch (error) {
          console.error('Erreur lors de la vérification:', error);
        }
      } else {
        clearInterval(checkEmailVerification);
      }
    }, 2000);

    return () => clearInterval(checkEmailVerification);
  }, [user, isEmailVerified]);

  const getTabBarIcon = (name, type = 'material') => ({ color }) => (
    <Icon
      name={name}
      type={type}
      color={color}
      size={navigation.tab.icon.size}
      style={{
        marginTop: spacing.xs,
        marginBottom: 0,
      }}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 65,
          paddingTop: spacing.xs,
          paddingBottom: spacing.xs,
          shadowColor: colors.text.primary,
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          marginTop: 0,
          marginBottom: 5,
          fontSize: typography.small.fontSize,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('home', 'feather'),
          tabBarLabel: 'Accueil',
        }}
      />
      <Tab.Screen
        name="Boards"
        component={BoardStack}
        options={{
          tabBarIcon: getTabBarIcon('trello', 'font-awesome'),
          tabBarLabel: 'Tableaux',
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              disabled={!isEmailVerified}
              style={[
                props.style,
                !isEmailVerified && { opacity: 0.5 }
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: getTabBarIcon('user', 'feather'),
          tabBarLabel: 'Profil',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: getTabBarIcon('settings', 'feather'),
          tabBarLabel: 'Paramètres',
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...stackScreenOptions,
      cardStyle: {
        backgroundColor: colors.background,
      },
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
