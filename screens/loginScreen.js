import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Image, Input, Button } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';

const loginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.chat}>Let's Chat</Text>
            <Image source={{
                uri: "http://assets.stickpng.com/images/580b57fcd9996e24bc43c526.png",
            }}
                style={{
                    height: 200,
                    width: 200,
                    marginBottom: 20,
                    borderRadius: 5,
                }}
            />
            <View style={styles.inputContainer}>
                <Input
                    autoFocus
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button} title="Login" onPress={signIn} />
            <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.button} type={'outline'} title="Register" />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    chat: {
        fontSize: 40,
        marginBottom: 30,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    container: {
        marginTop: 40,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});

export default loginScreen;


