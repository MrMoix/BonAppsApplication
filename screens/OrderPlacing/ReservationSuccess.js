import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

export default function TableTimeReservation({ navigation }) {

  const navigateHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />

        <View>
          <Text style={styles.normalText}>
            You reservation has been successfully placed.
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={navigateHome}>
            <Text style={styles.buttonTitle}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
