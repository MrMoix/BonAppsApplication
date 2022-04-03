import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";

export default function AddDish({ navigation }) {
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [studentPrice, setStudentPrice] = useState("");
  const [logo, setLogo] = useState(null);

  const user = firebase.auth().currentUser;
  const uid = user.uid;

  const addDish = () => {
    firebase
      .auth()
      //.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          dishName,
          dishPrice,
          studentPrice,
          logo,
        };
        const usersRef = firebase
          .firestore()
          .collection("Restaurant")
          .doc(uid)
          .collection("Dishes");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Dishes");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setLogo(result.uri);
        uploadImage(result.uri, "logo")
          .then(() => {
            console.log("it work");
            console.log(user.uid);
          })
          .catch((error) => {
            console.log("it does not work");
            console.error(error);
            console.log(user.uid);
          });
      }
      console.log(result);
    };

    uploadImage = async (uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      const ref = firebase
        .storage()
        .ref()
        .child(user.uid + "/" + imageName);
      return ref.put(blob);
    };
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
          placeholder="*Dish Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDishName(text)}
          value={dishName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="*Dish price"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDishPrice(text)}
          value={dishPrice}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Student price"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setStudentPrice(text)}
          value={studentPrice}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Select a logo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addDish();
          }}
        >
          <Text style={styles.buttonTitle}>Add to the menu</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
