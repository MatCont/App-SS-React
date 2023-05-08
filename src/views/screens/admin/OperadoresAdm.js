//muestra todos los operadores

//puede ver los reportes de su establecimiento y los de la comuna

import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import {PrimaryButton} from '../../components/Button';
import notificacionesDetalle from '../../../consts/notificacionesDetalle';

import dataOperadores from '../../../consts/dataOperadores';


const OperadorsAdm = ({navigation}) => {

  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.nombre}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.rut}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>{item.establecimiento}</Text>
        </View>

      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.light, flex: 1}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}></Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={dataOperadores}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
       
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default OperadorsAdm;
