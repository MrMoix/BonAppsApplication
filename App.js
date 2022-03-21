import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./screens";
import RestaurantSignup from "./screens/RegistrationScreen/RestaurantSignup";
import RestaurantInfo from "./screens/HomeScreen/RestaurantInfo";
import HomeRestaurantView from "./screens/HomeScreen/HomeRestaurantView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="RestaurantSignup"
          component={RestaurantSignup}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="RestaurantInfo"
          component={RestaurantInfo}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="HomeRestaurantView"
          component={HomeRestaurantView}
          options={{ title: "", headerTransparent: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
