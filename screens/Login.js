import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimensions'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'

// importing firebase features
import { initializeApp } from 'firebase/app'
import { getDatabase, push, ref, onValue } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'

// web app's Firebase configuration
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

// initializing firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const analytics = getAnalytics(app)

const Login = ({ navigation }) => {
  // defining the collection name
  ref(database, 'Client/')

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  // saving log in details to the firebase
  const saveLogin = () => {
    push(ref(database, 'Client/'), { email: email, password: password })
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Sign In" onPress={saveLogin} />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>

      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => fbLogin()}
      />

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => googleLogin()}
      />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 25,
  },
  logo: {
    height: 150,
    width: 250,
    resizeMode: 'cover',
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 1,
  },
  navButtonText: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '500',
    color: '#4BBE77',
    marginTop: 5,
  },
})
