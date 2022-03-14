import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { initializeApp } from 'firebase/app'
import { getDatabase, push, ref, onValue } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'

import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Home from './screens/HomePage'

const AppStack = createStackNavigator()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDcdYiAl0P6_LZNxoxTgD1fPTyE6EpEfsg',
  authDomain: 'bonapp-7cc65.firebaseapp.com',
  databaseURL:
    'https://bonapp-7cc65-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bonapp-7cc65',
  storageBucket: 'bonapp-7cc65.appspot.com',
  messagingSenderId: '198916352344',
  appId: '1:198916352344:web:c08718687f9d0af4df9d2d',
  measurementId: 'G-G6MJH49PMZ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const analytics = getAnalytics(app)

const App = () => {
  ref(database, 'Client/')
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="SignUp" component={SignUp} />
        <AppStack.Screen name="Home" component={Home} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App
