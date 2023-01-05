# Todo React Native App


## Project Structure

Todo App is a React-Native based project using expo for starting the application development process faster. The application enables users to perform almost all CRUD operations to create <strong>to do's</strong>.

More about [React-Native](https://reactnative.dev/) and [Expo](https://expo.dev/).


## Expo 

Expo is an open-source framework for apps that run natively on Android, iOS, and the web. Expo brings together the best of mobile and the web and enables many important features for building and scaling an app.

Expo enables testing of application using our own devices without to much struggle or a simulator.In order to do this, first, make sure to download the <strong>Expo GO</strong> application on your mobile devices.

1. ```npm install``` - install dependencies
2. ```expo start``` - launch the application with Expo
3. Scan the QR code and enjoy.


### Expo with Github Actions

With the help of github actions, at every merge into main branch, the latest code will be build on the <strong>expo.dev</strong> website and the QR can be scanned by whoever wants to test the application, without cloning the project.

There is only a workflow that runs on the main branch and builds the code.Currently, the QR code is working only for android devices, for IOS devices the project needs to be cloned and then the expo needs to be used locally.

![QR for Android](./developer-guide/images/android-expo-qr.png)

Github actions workflow sample 

```
name: Build CI/CD
on:
  push:
    branches:
      - main
jobs:
  Build-for-android:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 14.15.0
      - uses: actions/setup-java@v1.4.3
        with:
          java-version: '9.0.4' # The JDK version to make available on the path.
          java-package: jdk # (jre, jdk, or jdk+fx) - defaults to jdk
          architecture: x64 # (x64 or x86) - defaults to x64
      - uses: expo/expo-github-action@v5
        with:
          expo-version: 6.x
          expo-username: ${{ secrets.EXPO_CLI_USERNAME }}
          expo-password: ${{ secrets.EXPO_CLI_PASSWORD }}
      - name: Install deps
        run: yarn install
      - name: Login
        run: expo login -u ${{ secrets.EXPO_CLI_USERNAME }} -p ${{ secrets.EXPO_CLI_PASSWORD }}
      - name: Build Android APK Bundle
        run: expo build:android
```


## Features

 - First launch of the application: 
   - users will be greeted with a onboarding screen in which they need to enter their name in order to continue.
 

 - Home screen:
   - on this screen, users will be greeted with Good Morning, Afternoon or Evening based on the time and also with the name they provided on the onboarding screen.
   
   - todo's can be added for the current day or the next day (tomorrow) given a time.

   - if the button ```Today``` is not presset, then the todo will be marked as tomorrow.

   - if the button ```Alert``` is not pressed, then a notification will not be scheduled.
   
   - the todo's can be marked as completed and an alert dialog will pop up.After the todo is marked as completed it can be hidden using the ```Hide Completed``` button.
    
   - the todo's can be deleted using a button.
   
   - the todo's object as json

```
 Object {
    "desc": "Fix failing testa ",
    "hour": 1672766875165,
    "id": 181583,
    "isComplited": false,
    "isToday": false,
    "text": "Fix tests on Todo ",
  }
```

 - Dark/Light mode: users can set the mode they want to view the application (dark/light), the setting will be saved and the whole implementaiton is based on <strong>ThemeProvider</strong> library.
 

 - Push notification:

   - If the button ```Alert``` is pressed, then a notification will be scheduled at the time setted on the todo.
   


## Libraries

The libraries used can be found inside ```package.json``` file.


```package.json```

```
"dependencies": {
    "@react-native-async-storage/async-storage": "~1.17.3",
    "@react-native-community/datetimepicker": "6.2.0",
    "@react-navigation/bottom-tabs": "^6.5.2",
    "@react-navigation/native": "^6.0.8",
    "@react-navigation/native-stack": "^6.9.7",
    "@reduxjs/toolkit": "^1.9.1",
    "expo": "^46.0.0",
    "expo-constants": "~13.2.4",
    "expo-device": "~4.3.0",
    "expo-notifications": "~0.16.1",
    "expo-status-bar": "~1.4.0",
    "expo-updates": "~0.14.7",
    "lint": "^0.8.19",
    "moment": "^2.29.4",
    "react": "18.0.0",
    "react-dom": "18.0.0",
    "react-native": "0.69.6",
    "react-native-modal-datetime-picker": "^14.0.1",
    "react-native-paper": "^5.1.0",
    "react-native-safe-area-context": "4.3.1",
    "react-native-screens": "~3.15.0",
    "react-native-web": "~0.18.7",
    "react-redux": "^8.0.5",
    "redux": "^4.2.0",
    "styled-components": "^5.3.6",
    "yarn": "^1.22.19"
  },
```
### React Native Async Storage

<strong>AsyncStorage</strong> is an unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage.

The AsyncStorage JavaScript code is a facade that provides a clear JavaScript API, real Error objects, and non-multi functions. Each method in the API returns a Promise object.


Importing the AsyncStorage library:
```
import {AsyncStorage} from 'react-native';
```

Persisting data:
```

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
```


### React Navigation

React Navigation is a standalone library that enables you to implement navigation functionality in a React Native application.

### ReduxJS ToolKit

Redux Toolkit is an official package from the Redux Team that helps configuring Redux store and reduces boilerplate.


## Demo

![Demo](./developer-guide/images/demo.gif)
