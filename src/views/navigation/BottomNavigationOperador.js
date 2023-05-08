import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import HomeOperador from '../screens/operador/HomeOperador'
import FormularioOperador from '../screens/operador/FormularioOperador'
import ReportesOperador from '../screens/operador/ReportesOperador'

const Tab = createBottomTabNavigator();

const BottomNavigatorOperador = () => {
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
        component={HomeOperador}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      
      <Tab.Screen
        name="F.A.F"
        component={FormularioOperador}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="article" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="Reportes"
        component={ReportesOperador}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="chat" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigatorOperador;
