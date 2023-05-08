import 'react-native-gesture-handler';
import React from 'react';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import BottomNavigatorUser from './src/views/navigation/BottomNavigatorUsuario';
import BottomNavigatorOperador from './src/views/navigation/BottomNavigationOperador';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
const Stack = createStackNavigator();

import EstablecimientosPicker from './src/views/screens/EstablecimientosPicker';

import Login from './src/views/Login';

/*


*/
const App = () => {
  return (

    <NavigationContainer>
      <StatusBar backgroundColor="black" />
      <Stack.Navigator screenOptions={{ headerShown: Login }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomNavigatorOperador} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
