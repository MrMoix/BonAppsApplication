import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Image, Text, TextInput, TouchableOpacity, View, Platform, Alert, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import * as ImagePicker from 'expo-image-picker';

export default function LogoCharging({ navigation }){

  const [image, setImage] = useState(null);

  const user = firebase.auth().currentUser;

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri)
      uploadImage(result.uri, 'logo')
          .then(() => {
              console.log('it work')
              console.log(user.uid)
          })
          .catch(error => {
              console.log('it does not work')
              console.error(error)
              console.log(user.uid)
          })
  }
    console.log(result);

    
};

const createThreeButtonAlert = () =>
    Alert.alert('Check your email', 'Your registration succed !', [
      {
        text: 'Continue',
        onPress: () => console.log('Continue pressed'),
      },
    ]);

uploadImage = async (uri, imageName) => {
  const response = await fetch(uri);
  const blob = await response.blob(); 

  const ref = firebase.storage().ref().child(user.uid+"/"+imageName);
  return ref.put(blob);

  };


  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        
      <Image source={{ uri: image }} style={styles.logo} />
      <TouchableOpacity
          style={styles.button}
          onPress={pickImage}
        >
          <Text style={styles.buttonTitle}>Select a logo</Text>
        </TouchableOpacity>  
       
        <TouchableOpacity
          style={styles.button}
          onPress={()=> {createThreeButtonAlert(), navigation.navigate("HomeRestaurantView")}}
        >
          <Text style={styles.buttonTitle}>Next</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};