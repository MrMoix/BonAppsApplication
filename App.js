import React from "react";
import{NavigationContainer} from '@react-navigation/native'
import{createStackNavigator} from '@react-navigation/stack'

import Login from './screens/Login'
import SignUp from "./screens/SignUp";
import Home from "./screens/HomePage";

const AppStack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer >
      <AppStack.Navigator screenOptions={{headerShown: false}}>

        <AppStack.Screen name="Login" component={Login}/>
        <AppStack.Screen name="SignUp" component={SignUp}/>
        <AppStack.Screen name="Home" component={Home}/>
      

      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;