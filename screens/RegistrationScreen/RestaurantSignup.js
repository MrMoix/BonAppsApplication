import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Image, Text, TextInput, TouchableOpacity, View, Platform, Alert, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";




export default function RestaurantSignup({ navigation }){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numberPlace, setNumberPlace] = useState("");
  


  const onFooterLoginPress = () => {
    navigation.navigate("Login");
  };

  const onFooterNextPress = () => {
    navigation.navigate("HomeRestaurantView");
  };
  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          name,
          address,
          phoneNumber,
          type,
          numberPlace
        };
        const usersRef = firebase.firestore().collection("Restaurant");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("LogoCharging");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });

    
  };



  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <TextInput
          style={styles.input}
          placeholder="Restaurant Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAddress(text)}
          value={address}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Number of place"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setNumberPlace(text)}
          value={numberPlace}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
    
        <TextInput
          style={styles.input}
          placeholder="Restaurant type"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setType(text)}
          value={type}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          require='true'
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>{onRegisterPress()}}
        >
          <Text style={styles.buttonTitle}>Next</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
