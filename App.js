import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./screens";
import RestaurantSignup from "./screens/RegistrationScreen/RestaurantSignup";
import RestaurantInfo from "./screens/HomeScreen/RestaurantInfo";
import HomeRestaurantView from "./screens/HomeScreen/HomeRestaurantView";
import LogoCharging from "./screens/RegistrationScreen/LogoCharging";
import { LogBox } from "react-native";
import BenefitsScreen from "./screens/HomeScreen/BenefitsScreen";
import AddDish from "./screens/HomeScreen/AddDish";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

console.ignoredYellowBox = true;
LogBox.ignoreAllLogs();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png",
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
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
      <Stack.Screen
        name="LogoCharging"
        component={LogoCharging}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="AddDish"
        component={AddDish}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}

function AuthStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Login">
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
    </Stack.Navigator>
  );
}

function JoinUsStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="JoinUs">
      <Stack.Screen
        name="BenefitsScreen"
        component={BenefitsScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="RestaurantSignUp"
        component={RestaurantSignup}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#4BBE77",
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Login" component={AuthStack} />
        <Drawer.Screen
          name="JoinUs"
          component={JoinUsStack}
          options={{
            drawerActiveBackgroundColor: "#4BBE77",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
