import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Checkbox from './Checkbox';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoReducer } from '../redux/todosSlice';
import { updateTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Todo({
  id,
  text,
  desc,
  isCompleted,
  isToday,
  hour,
}) {
  const [localHour, setLocalHour] = React.useState(new Date(hour));
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const [thisTodoIsToday, setThisTodoIsToday] = hour ? React.useState(moment(hour).isSame(moment(), 'day')) : React.useState(false);

  const handleDeleteTodo = async () => {
    dispatch(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem('Todos', JSON.stringify(
        todos.filter(todo => todo.id !== id)
      ));
      console.log('Todo deleted succesfully');
    } catch (e) {
      console.log(e);
    }
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are you sure?',
      'This action will delete your todo permanently!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
        },
        {
          text: 'Delete',
          onPress: handleDeleteTodo,
        },
      ],
      {
        cancelable: true,
      }
    );
  };


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox id={id} text={text} desc={desc} hour={hour} isCompleted={isCompleted} isToday={thisTodoIsToday} />
        <View style={{ flex: 1 }}>
          <Text
            selectable
            style={
              isCompleted
                ? [styles.text, { textDecorationLine: 'line-through', color: '#ff1900' }]
                : styles.text}
          >{text}</Text>
          <Text
            selectable
            style={
              isCompleted
                ? [styles.description, { textDecorationLine: 'line-through', color: '#20537d' }]
                : styles.description}
          >{desc}</Text>

          <Text style={
            isCompleted
              ? [styles.time, { textDecorationLine: 'line-through', color: '#20537d' }]
              : styles.time}>
            <Text
            >Due at </Text>{moment(localHour).format('LT')}</Text>
        </View>
        <TouchableOpacity onPress={displayDeleteAlert}>
          <MaterialIcons name="delete-outline" size={30} color="#20537d" style={styles.button} />
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF0000',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#20537d',
  },


  time: {
    fontSize: 15,
    fontWeight: '800',
    color: '#20537d',
  }
});