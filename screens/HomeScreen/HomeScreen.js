import React from 'react'
import { firebase } from '../../firebase/config';
import { Text, View, TouchableOpacity, } from 'react-native'
import styles from './styles';

export default function HomeScreen({ navigation }) {

    const onLogOutPress = () => {
        firebase
            .auth()
            .signOut()
            .then(() => navigation.navigate('Login'))
    }

    return (
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onLogOutPress()}>
                <Text style={styles.buttonTitle}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}