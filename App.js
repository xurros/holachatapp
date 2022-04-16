import React from "react";

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// This is to eliminate the yellow warning from react-native
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "AsyncStorage",
  "Animated",
]);

export default function App() {
  const Stack = createStackNavigator();

  return (

    < NavigationContainer >
      <Stack.Navigator
        initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start} />

        <Stack.Screen
          name="Chat"
          component={Chat} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}



