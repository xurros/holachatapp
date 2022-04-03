import React from "react";

// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "@react-navigation/native-stack";

// This is to eliminate the yellow warning from react-native
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


// create navigator
const Stack = createStackNavigator();


export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>

        <Stack.Navigator
          initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={Start} />

          <Stack.Screen
            name="Chat"
            component={Chat} />
        </Stack.Navigator>

      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

