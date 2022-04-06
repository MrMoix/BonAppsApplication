import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import { Image, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import SwitchSelector from "react-native-switch-selector";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import icons from "../../constants/icons";
// import DateTimePickerAndroid from '@react-native-community/datetimepicker'; 

export default function TableTimeReservation({ navigation }) {
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [studentPrice, setStudentPrice] = useState("");
  const [orderType, setOrderType] = useState(true);
  const [tablePlaces, setTablePlaces] = useState("");
  // const [date, setDate] = useState(new Date(1598051730000));

  const restaurantTitle = "kfc";
  const addDish = async () => {
    const currentUser = firebase.auth().currentUser;
    const restaurantTitle = currentUser.uid;
    const snapshot = await firebase
      .firestore()
      .collection("Restaurant")
      .where("id", "==", restaurantTitle)
      .get();

    const uid = snapshot.docs[0].id;
    const restaurantRef = firebase
      .firestore()
      .collection("Restaurant")
      .doc(uid);

    const res = await restaurantRef
      .collection("Dishes")
      .add({ name: dishName, price: dishPrice })
      .then(() => {
        navigation.navigate("HomeRestaurantView");
      });
  };

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   DateTimePickerAndroid.open({
  //     value: date,
  //     onChange,
  //     mode: currentMode,
  //     is24Hour: true
  //   })
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />

        <SwitchSelector
          initial={0}
          onPress={(value) => {
            setOrderType(value);
          }}
          textColor={color.purple} //'#7a44cf'
          selectedColor={color.white}
          buttonColor={color.purple}
          borderColor={color.purple}
          hasPadding
          options={[
            { label: "Eat in", value: true }, // imageIcon: images.feminino images.feminino = require('./path_to/assets/img/feminino.png')
            {
              label: "Take away",
              value: false,
            },
          ]}
          testID="order-type-selector"
          accessibilityLabel="order-type-selector"
        />
        {orderType && (
          <View>
            <Text>Reserve table </Text>
            <TextInput
              style={styles.input}
              placeholder="Number of places"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setTablePlaces(text)}
              value={tablePlaces}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        )}
{/*         
        <View>
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          <Text>selected: {date.toLocaleString()}</Text>
        </View> */}

      </KeyboardAwareScrollView>
    </View>
  );
}
