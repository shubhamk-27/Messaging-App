import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';

const registerScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
                });
            })
            .catch((error) => alert(error.message));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "go to login",
            headerTitleStyle: {
                margin: 60,
            }
        });
    }, [navigation]);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light' />

            <Text style={{
                marginTop: 40,
                marginBottom: 40,
                display: 'flex',
                fontSize: 30,
                fontStyle: 'italic',
                fontWeight: 'bold'
            }}>Create your account</Text>

            <View style={styles.inputContainer}>
                <Input
                    autoFocus
                    type='text'
                    value={name}
                    placeholder="Full Name"
                    onChangeText={text => setName(text)}
                />
                <Input
                    type='email'
                    value={email}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    type='password'
                    value={password}
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    type='text'
                    value={imageUrl}
                    placeholder="Profile Picture URL (optional)"
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                />

            </View>

            <Button containerStyle={styles.button}
                title="Register"
                raised
                onPress={register}
            />
            <View style={{ height: 120 }} />

        </KeyboardAvoidingView >
    )
}

export default registerScreen;

const styles = StyleSheet.create({
    inputContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        marginTop: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
