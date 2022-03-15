import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
    Button,
    TextInput
} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';


const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>
            <FormInput
                labelValue={email}
                onChangeText={userEmail => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={userPassword => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormInput
                labelValue={confirmPassword}
                onChangeText={userPassword => setPassword(userPassword)}
                placeholderText="ConfirmPassword"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Sign Up"
                onPress={() => navigation.navigate("Home")}
            />

            <View style={[styles.textPrivate, { padding: 10 }]}>
                <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our</Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked')}>
                    <Text style={[styles.color_textPrivate, { color: '#4BBE77' }]}>Terms of service</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <TouchableOpacity TouchableOpacity onPress={() => alert('Privacy Clicked')}>
                    <Text style={[styles.color_textPrivate, { color: '#4BBE77' }]}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>

            <SocialButton
                buttonTitle="Sign Up with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => fbLogin()}
            />

            <SocialButton

                buttonTitle="Sign U with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => googleLogin()}
            />

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>
                    Have and account? Sign In
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 25,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: '500',
        color: '#4BBE77',
        marginTop: 5,
    },
});
