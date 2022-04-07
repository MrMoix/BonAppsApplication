import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import SwitchSelector from "react-native-switch-selector";
import icons from "../../constants/icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TableTimeReservation({ navigation }) {
  const [orderType, setOrderType] = useState(true);
  const [tablePlaces, setTablePlaces] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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
              onChangeText={(text) => setTablePlaces(text)}
              value={tablePlaces}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTitle}>Reserve a table</Text>
            </TouchableOpacity>
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
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
