import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { firebase } from "../../firebase/config";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import * as Google from "expo-auth-session/providers/google";
import { Button } from "react-native";
import { GoogleAuthProvider } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [auth, setAuth] = useState('')
  // const [credential, setCredential] = useState('')

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "198916352344-ffq544auov9b332ivn18u85vm0jd8jpa.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log("user", user);

      if (user) {
        const usersRef = firebase.firestore().collection("Clients");
        const data = {
          id: user.uid,
          email: user.email,
          fullName: user.displayName,
        };
        usersRef
          .doc(user.uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              usersRef
                .doc(user.uid)
                .set(data)
                .then(() => navigation.navigate("Home"));
              return;
            } else {
              navigation.navigate("Home");
            }
          });
      }
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const provider = new firebase.auth.GoogleAuthProvider();

      const credential = provider.credential(id_token);

      console.log("token", id_token);

      firebase.auth().signInWithCredential(credential);

      // const uid = response.user.uid
      //   const usersRef = firebase.firestore().collection('Clients')
      //   usersRef
      //     .doc(uid)
      //     .get()
      //     .then(firestoreDocument => {
      //       if (!firestoreDocument.exists) {
      //         alert("User does not exist anymore.")
      //         return;
      //       }
      //       const user = firestoreDocument.data()
      //       navigation.navigate('Home')
      //     })
      //     .catch(error => {
      //       alert(error)
      //     });
    }
  }, [response]);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onRestaurantPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("Restaurant");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("HomeRestaurantView");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("Clients");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("Home");
            // Alert.alert("Check your email", "Your registration succeeded!", [
            //   {
            //     text: "Continue",
            //     onPress: () => console.log("Continue pressed"),
            //   },
            // ]);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  //const verifyEmailAlert = () => {

  const onGoogleLoginPress = () => {
    promptAsync();
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
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onLoginPress();
          }}
        >
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onRestaurantPress()}
        >
          <Text style={styles.buttonTitle}>Restaurant login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => onGoogleLoginPress()}
        >
          <Text style={styles.buttonTitle}>Log in with Google</Text>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
