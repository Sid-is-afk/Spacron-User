import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NewRequestScreen from './screens/NewRequestScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import CartScreen from './screens/CartScreen';
import PrintsScreen from './screens/PrintsScreen';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ flex: 1, backgroundColor: colors.background }}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'New Request') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Prints') {
              iconName = 'print';
            } else if (route.name === 'Cart') {
              iconName = 'shopping-cart';
            } else if (route.name === 'Order History') {
              iconName = 'history';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.iconInactive,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingBottom: 4,
            paddingTop: 4,
            height: 60,
          },
          tabBarLabelStyle: {
            fontFamily: 'PlusJakartaSans_500Medium',
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name="New Request" component={NewRequestScreen} />
        <Tab.Screen name="Prints" component={PrintsScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Order History" component={OrderHistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5D3EFF" />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.appContainer}>
      <ThemeProvider>
        <CartProvider>
          <TabNavigator />
        </CartProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  }
});
