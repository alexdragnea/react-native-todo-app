import { Alert, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';
import Home from './screens/Home';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodo from './screens/AddTodo';
import Onboarding from './screens/Onboarding';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import React from 'react';

const Stack = createNativeStackNavigator();

function HomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Home />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Add')}
            >
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

function LogoTitle() {
    return (
        <Image
            style={{ width: 40, height: 40, bottom: 5 }}
            source={require('./assets/todo-icon.png')}
        />
    );
}

export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Todo App"
                        component={HomeScreen}
                        options={{
                            headerShown: true, headerStyle: {
                                backgroundColor: '#0C2D48',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitleAlign: 'center',
                            headerLeft: (props) => <LogoTitle {...props} />,
                            headerRight: () => (
                                <IconButton icon="help" iconColor={MD3Colors.primary100}
                                    onPress={() =>

                                        Alert.alert(
                                            'Todo App',
                                            'App version is 1.0.0.',
                                            [
                                                {
                                                    text: 'Github',
                                                    onPress: () => Linking.openURL('https://github.com/alexdragnea/react-native-todo-app')
                                                },
                                                {
                                                    text: 'Close',
                                                    onPress: () => console.log('Ask me later pressed')
                                                },
                                            ],
                                            { cancelable: false }
                                        )}
                                />
                            ),

                        }}
                    />
                    <Stack.Screen
                        name="Add"
                        component={AddTodo}
                        options={{
                            presentation: 'modal',
                            headerShown: true, headerStyle: {
                                backgroundColor: '#0C2D48',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitleAlign: 'center'
                        }}
                    />
                    <Stack.Screen
                        name="Onboarding"
                        component={Onboarding}
                        options={{
                            headerShown: true, headerStyle: {
                                backgroundColor: '#0C2D48',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitleAlign: 'center'
                        }}
                    />
                </Stack.Navigator>
                <View>
                    <Text style={{
                        textAlignVertical: "center",
                        textAlign: "center",
                        fontSize: 15,
                        height: 34,
                        backgroundColor: '#0C2D48'
                    }}></Text>
                </View>
            </NavigationContainer>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 20,
        right: 172,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
    },

    plus: {
        fontSize: 40,
        color: '#fff',
        position: 'absolute',
        top: -6,
        left: 9,
    }
});
