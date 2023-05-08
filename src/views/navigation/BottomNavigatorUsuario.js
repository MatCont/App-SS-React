import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {View} from 'react-native';
import HomeScreen from '../screens/usuario/HomeScreen';
import CartScreen from '../screens/usuario/CartScreen';
import FormularioScreen from '../screens/usuario/FormularioScreen';
import Perfil from '../screens/usuario/Perfil';

const Tab = createBottomTabNavigator();

const BottomNavigatorUsuario = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}>

      <Tab.Screen 
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      
      <Tab.Screen
        name="F.A.F"
        component={FormularioScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="article" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="Buscar"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}>
              <Icon name="search" color={COLORS.primary} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="chat" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigatorUsuario;
