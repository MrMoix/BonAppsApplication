import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TableTimeReservation({ route, navigation }) {
  const [orderType, setOrderType] = useState(true);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [seatAmount, setSeatAmount] = useState("");
  const [restaurantData, setRestaurantData] = useState("");
  const params = route.params;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const reserveTable = async () => {
    let restaurantid = params.restaurantid;

    const restaurantRef = firebase
      .firestore()
      .collection("Restaurant")
      .doc(restaurantid);
    const restaurantDoc = await restaurantRef.get();
    setRestaurantData(restaurantDoc.data());

    console.log("max sseats " + restaurantData.numberPlace);

    if (restaurantData.numberPlace >= seatAmount) {
      const order = {
        dishList: params.dishList,
        uid: params.uid,
        restaurantid: params.restaurantid,
        seatAmount,
        orderTime: new Date(),
        date,
        orderStatus: "Ordered",
        totalPrice: params.dishList
          .reduce((a, c) => {
            return parseFloat(a) + parseFloat(c.price);
          }, 0)
          .toFixed(2),
      };
      firebase
        .firestore()
        .collection("Orders")
        .add(order)
        .then(() => {
          navigation.navigate("ReservationSuccess");
          const uid = firebase.auth().currentUser.uid;

          const userCart = firebase.firestore().collection("Clients").doc(uid);
          userCart.update({ currentCartItem: [] });
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      Alert.alert("Alert ", "Not enough seats available in this restaurant.", [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />

        <SwitchSelector
          style={{ margin: 15 }}
          initial={0}
          onPress={(value) => {
            setOrderType(value);
          }}
          //textColor={"#4cce4a"}
          //selectedColor={color.white}
          buttonColor={"#4cce4a"}
          //borderColor={"#4BBE77"}
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
            <Text style={styles.normalText}>Reserve a table </Text>
            <TextInput
              style={styles.input}
              placeholder="Number of places"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setSeatAmount(parseInt(text))}
              value={seatAmount + ""}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        )}

        <View>
          <View>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.buttonTitle}>Pick a day</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={showTimepicker}>
              <Text style={styles.buttonTitle}>Pick time</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.normalText}>
            Time chosen: {date.toLocaleString()}
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => reserveTable()}
          >
            <Text style={styles.buttonTitle}>Reserve a table</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
