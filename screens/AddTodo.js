import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Switch, TouchableWithoutFeedback, Keyboard, Alert, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from '../components/theme';
import { Container } from '../components/style';
import { addTodoReducer } from '../redux/todosSlice';
import * as Notifications from 'expo-notifications';

export default function AddTodo() {

    const [date, setDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [isToday, setIsToday] = React.useState(false);
    const [withAlert, setWithAlert] = React.useState(false);
    const listTodos = useSelector(state => state.todos.todos);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        getTheme();
    }, []);

    const getTheme = async () => {
        const themeValue = await AsyncStorage.getItem('@theme');
        setTheme(themeValue);
    };


    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    const addTodo = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter a todo title!');

            return;
        }
        //Check for the Email TextInput
        if (!description.trim()) {
            Alert.alert('Error', 'Please enter a description!');
            return;
        }

        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            text: name,
            desc: description,
            hour: isToday ? date.toISOString() : new Date(date).getTime() + 24 * 60 * 60 * 1000,
            isToday: isToday,
            isComplited: false
        };
        try {
            await AsyncStorage.setItem('Todos', JSON.stringify([...listTodos, newTodo]));
            dispatch(addTodoReducer(newTodo));
            console.log('Todo saved correctly');
            if (withAlert) {
                await scheduleTodoNotification(newTodo);
            }
            navigation.goBack();
        }
        catch (e) {
            console.log(e);
        }
    };


    const scheduleTodoNotification = async (todo) => {
        // set trigger time to todo.hour if todo.isToday === true else set trigger time to todo.hour + 24 hours
        // const trigger = todo.isToday ? todo.hour : new Date(todo.hour).getTime() + 24 * 60 * 60 * 1000;
        const trigger = new Date(todo.hour);
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Notification: you have a task to do!',
                    body: todo.text,
                    sound: true,
                    vibrate: true,

                },
                trigger,
            });
            console.log('Notification scheduled');
        } catch (e) {
            alert('The notification failed to schedule, make sure the hour is valid');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
                <Container>
                    <View style={Container.Container}>
                        <Text style={styles.title}>Add a Todo</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>Name</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Todo title"
                                placeholderTextColor="#BFD7ED"
                                onChangeText={(text) => { setName(text) }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>Description </Text>
                            <TextInput
                                style={styles.descInput}
                                placeholder="Todo description"
                                placeholderTextColor="#BFD7ED"
                                onChangeText={(desc) => { setDescription(desc) }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>Time</Text>
                            <Button title="Select time" onPress={showDatePicker} />
                            <DateTimePickerModal
                                date={date}
                                isVisible={datePickerVisible}
                                mode="time"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                        <View style={[styles.inputContainer, { paddingBottom: 0, alignItems: 'center' }]}>
                            <View>
                                <Text style={styles.inputTitle}>Today</Text>
                                <Text style={{ color: '#0074B7', fontSize: 12, maxWidth: '84%', paddingBottom: 10 }}>If you disable today, the task will be scheduled for tomorrow.</Text>
                            </View>
                            <Switch
                                value={isToday}
                                onValueChange={(value) => { setIsToday(value) }}
                            />
                        </View>
                        <View style={[styles.inputContainer, { paddingBottom: 0, alignItems: 'center' }]}>
                            <View>
                                <Text style={styles.inputTitle}>Alert</Text>
                            </View>
                            <Switch
                                value={withAlert}
                                onValueChange={(value) => { setWithAlert(value) }}
                            />
                        </View>

                        <TouchableOpacity onPress={addTodo} style={styles.button}>
                            <Text style={{ color: 'white' }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </Container>
            </ThemeProvider>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    title: {
        color: '#20537d',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    textInput: {
        borderBottomColor: '#60A3D9',
        borderBottomWidth: 1,
        width: '80%',
        color: '#60A3D9',
    },
    descInput: {
        borderBottomColor: '#60A3D9',
        borderBottomWidth: 1,
        width: '68%',
        color: '#60A3D9',
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 30,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
        color: '#20537d',
    },
    inputContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#20537d',
        height: 46,
        borderRadius: 11,
    }
});