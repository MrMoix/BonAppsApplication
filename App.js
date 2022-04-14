import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LoginScreen, HomeScreen, RegistrationScreen, OrderPlacing } from "./screens";
import RestaurantSignup from "./screens/RegistrationScreen/RestaurantSignup";
import RestaurantInfo from "./screens/HomeScreen/RestaurantInfo";
import HomeRestaurantView from "./screens/HomeScreen/HomeRestaurantView";
import LogoCharging from "./screens/RegistrationScreen/LogoCharging";
import { LogBox } from "react-native";
import BenefitsScreen from "./screens/HomeScreen/BenefitsScreen";
import AddDish from "./screens/HomeScreen/AddDish";
import TableTimeReservation from "./screens/OrderPlacing/TableTimeReservation";
import CartScreen from "./screens/Cart/Cart";
import ReservationSuccess from "./screens/OrderPlacing/ReservationSuccess";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

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
        name="HomeScreen"
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
        name="LoginScreen"
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
    <Stack.Navigator initialRouteName="Join Us">
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

function CartStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen
        name="CartShopping"
        component={CartScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="TableTimeReservation"
        component={TableTimeReservation}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ReservationSuccess"
        component={ReservationSuccess}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#4BBE77",
            width: 240,
          },
          drawerLabelStyle: {
            color: "#fff",
          },
          drawerActiveTintColor: {
            color: "#fff",
          },
          drawerActiveBackgroundColor: "#4cce4a",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerStyle: {
              backgroundColor: "#4BBE77",
            },
            headerTintColor: "#fff",
          }}
        />
        <Drawer.Screen
          name="Login"
          component={AuthStack}
          options={{
            headerStyle: {
              backgroundColor: "#4BBE77",
            },
            headerTintColor: "#fff",
          }}
        />
        <Drawer.Screen
          name="Join Us"
          component={JoinUsStack}
          options={{
            headerStyle: {
              backgroundColor: "#4BBE77",
            },
            headerTintColor: "#fff",
          }}
        />
        <Drawer.Screen
        name="Cart"
        component={CartStack}
        options={{
          headerStyle: {
            backgroundColor: "#4BBE77",
          },
          headerTintColor: "#fff",
        }}
      />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
