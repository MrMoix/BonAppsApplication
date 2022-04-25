import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import * as Notifications from "expo-notifications";

export default function TableTimeReservation({ navigation }) {

  const navigateHome = () => {
    navigation.navigate("HomeScreen");
  };

  async function scheduleAndCancel() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        
      }),
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'BonApps',
        body: "Hello,  your order is ready soon !",
        color: "#4cce4a",
        subtitle: "BonApps Application",
        backgroundColor: "#4cce4a",
        name: 'default',
        
      },
      trigger:{ seconds: 1,}
    });
  }

  function combine(){
    navigateHome();
    scheduleAndCancel();
  }

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
          <TouchableOpacity style={styles.button} onPress={() => combine()}>
            <Text style={styles.buttonTitle}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
