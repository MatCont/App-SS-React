//puede ver los reportes de su establecimiento y los de la comuna

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import { PrimaryButton } from '../../components/Button';
import dataOperadores from '../../../consts/dataOperadores';
import notificacion from '../../../consts/notificacionesDetalle'

const ReportesOperador = ({ navigation }) => {
  const [filterEstablecimiento, setFilterEstablecimiento] = useState('');
  const [filterFechaInicio, setFilterFechaInicio] = useState('');
  const [filterFechaFin, setFilterFechaFin] = useState('');

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        {/* <Image source={item.image} style={{height: 80, width: 80}} /> */}
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>{item.establecimiento}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.fecha}</Text>
        </View>
      </View>
    );
  };

  const filteredData = notificacion.filter(
    (item) =>
      item.establecimiento.toLowerCase().includes(filterEstablecimiento.toLowerCase()) &&
      (!filterFechaInicio || item.fecha >= filterFechaInicio) &&
      (!filterFechaFin || item.fecha <= filterFechaFin)
  );

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.light, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reportes Operador</Text>
      </View>
      <View style={style.filterContainer}>
        <TextInput
          style={style.input}
          placeholder="Filtrar por hospital"
          onChangeText={(text) => setFilterEstablecimiento(text)}
          value={filterEstablecimiento}
        />
        <View style={style.dateFilterContainer}>
          <TextInput
            style={[style.input, style.dateInput]}
            placeholder="Fecha inicio"
            onChangeText={(text) => setFilterFechaInicio(text)}
            value={filterFechaInicio}
          />
          <TextInput
            style={[style.input, style.dateInput]}
            placeholder="Fecha fin"
            onChangeText={(text) => setFilterFechaFin(text)}
            value={filterFechaFin}
          />
        </View>
        
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={filteredData}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View style={{ marginHorizontal: 55 }}>
            <PrimaryButton title="Vaciar Bandeja" />
          </View>
        )}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 10,
  },
  filterInput: {
    
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 20,
    paddingHorizontal: 20,
    width: '48%',
  },
  dateFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  dateFilterInput: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 20,
    paddingHorizontal: 20,
    width: '48%',
  },
});
export default ReportesOperador;
