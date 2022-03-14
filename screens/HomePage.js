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

const Home = ({navigation}) => {
    return(
        <View style= {styles.container}>
            <Text>Home Screen</Text>
            <Button
            title='Click here'
            onPress={()=> navigation.navigate("SignUp")}
            ></Button>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});