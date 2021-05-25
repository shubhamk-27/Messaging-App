import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { auth, db } from '../firebase';
import { TouchableOpacity } from 'react-native';
import { LogBox } from 'react-native';

import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
LogBox.ignoreLogs(['Setting a timer']);

const homeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id: id, chatName: chatName
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Let's Chat !",
            headerStyle: {
                backgroundColor: "#008891"
            },
            headerTitleStyle: {
                color: 'black',
                marginLeft: 40,
                fontStyle: 'italic'
            },
            headerTintColor: {
                color: '#black'
            },
            headerLeft: () => (
                <View style={{ marginLeft: 20, }}>
                    <TouchableOpacity onPress={signOut}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity>
                        <AntDesign name='camerao' size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name='pencil' size={24} color="black" />
                    </TouchableOpacity>

                </View>
            )
        })
    }, [])

    return (
        <SafeAreaView style={styles.Container}>
            <StatusBar style='dark' />
            <ScrollView >
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default homeScreen

const styles = StyleSheet.create({
    Container: {
        height: "100%",
        backgroundColor: "#fff"
    },
})
