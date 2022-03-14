import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';

const SignUp = ({navigation}) => {
    return(
        <View style= {styles.container}>
            <Text>SignUp Screen</Text>
            <Button
            title='Click here'
            onPress={()=> navigation.navigate("Login")}
            ></Button>
        </View>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});