import React from 'react';
import { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Image, StatusBar, Button, Alert, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '../components/Button';
import COLORS from './../../consts/colors';

const FormularioScreen = () => {
  const [agresion, setAgresion] = useState('');
  const [agresor, setAgresor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [nombreAgresor, setNombreAgresor] = useState('');
  const [rutAgresor, setRutAgresor] = useState('');
  const [sectorAgresion, setSectorAgresion] = useState('');
  const [domicilioAgresor, setDomicilioAgresor] = useState('');
  const [telefonoAgresor, setTelefonoAgresor] = useState('');
  const [unidad, setUnidad] = useState('');
  const [establecimiento, setEstablecimiento] = useState('');
  const [comuna, setComuna] = useState('');
  const [servicioSalud, setServicioSalud] = useState('');

  const navigation = useNavigation(); 

  //--------------------------------------------------FECHA-----------------------------------------
const formatDate = (text : String) => {
  // Elimina todo lo que no sea dígito
  const cleaned = text.replace(/[^0-9]/g, '');

  // Divide en grupos de 2, 2 y 4 caracteres
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);

  if (match) {
    // Formatea la fecha con los separadores deseados
    const formatted = match[1] + '/' + match[2] + '/' + match[3];
    setDate(formatted);
  } else {
    setDate(cleaned);
  }
};
//-------------------------------------------------------------------------------------------
const clearHora = (text : String) =>{
  const cleaned = text.replace(/[^0-9]/g, '');
  setTime(cleaned)
}
//--------------------------------------------------NUMERO-----------------------------------------
const clearNum = (text: String) =>{
  const cleaned = text.replace(/[^0-9]/g, '');
  setTelefonoAgresor(cleaned)
}
//--------------------------------------------------RUT-----------------------------------------
const formatRut = (value: String) => {
let formattedValue = value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
formattedValue = formattedValue.substring(0, 9); // Limita el valor a 9 caracteres

if (formattedValue.length <= 1) {
  return formattedValue;
}

if (formattedValue.length <= 4) {
  return `${formattedValue.slice(0, 1)}.${formattedValue.slice(1)}`;
}

const rutWithoutDv = formattedValue.slice(0, -1);
const dv = formattedValue.slice(-1);
return `${rutWithoutDv.slice(0, -3)}.${rutWithoutDv.slice(-3, -1)}.${rutWithoutDv.slice(-1)}-${dv}`;
};
const handleRutChange = (value : String) => {
  setRutAgresor(formatRut(value));
};
  //-------------------------------------------------------------------------------------------------
  return(
    <View style={styles.container}>
      <ScrollView>
      <Image
                style={{ width: 100, height: 100, alignSelf:'center', marginTop:10 }}
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/02/Logotipo_del_Instituto_de_Salud_P%C3%BAblica_de_Chile.png" }}
              />
        <Text style={{fontSize:15, color:"black",fontWeight:'bold', textAlign: 'center'}}>
          FORMULARIO DE NOTIFICACIÓN DE AGRESIONES HACIA
          LOS FUNCIONARIOS DE LA SALUD PÚBLICA</Text>

         

        <Text style={styles.Titulo}>Datos de la agresión</Text>

        <Text style={styles.subTitulo}>Ingrese Fecha</Text>
        <TextInput
          value={date}
          placeholder="dd/mm/yyyy"
          onChangeText={formatDate}
          maxLength={10}
          style={styles.textInput}
        />

        <Text style={styles.subTitulo}>Ingrese Hora</Text>
        <TextInput style={styles.textInput}
        value={time}
        onChangeText={clearHora}
        placeholder="hh:mm"
        keyboardType="numeric"
        maxLength={5}
        />

        <Text style={styles.subTitulo}>Ingrese Tipo de agresión</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={agresion}
            onValueChange={(itemValue) => setAgresion(itemValue)}
          >
            <Picker.Item label="Con arma de fuego" value="Arma de fuego" />
            <Picker.Item label="Con arma blanca" value="Arma blanca" />
            <Picker.Item label="Con objeto contundente" value="Objeto contundente" />
            <Picker.Item label="Sexual" value="Sexual" />
            <Picker.Item label="Empujones, combos, patadas" value="Empujones, combos, patadas" />
            <Picker.Item label="Otros tipo de agresión física" value="Otros tipo de agresión física" />
            <Picker.Item label="Ataque contra la infraestructura" value="Ataque contra la infraestructura" />
            <Picker.Item label="Sexual verbal" value="Sexual verbal" />
            <Picker.Item label="Amenazas u hostigamientos" value="Amenazas u hostigamientos" />
            <Picker.Item label="Insultos o garabatos" value="Insultos o garabatos" />
            <Picker.Item label="Burlas o descalificaciones" value="Burlas o descalificaciones" />
            <Picker.Item label="Calumnias por redes sociales, injurias" value="Injurias,
  calumnias por redes sociales" />
            <Picker.Item label="Otro tipo de agresión verbal" value="Otro tipo de agresión verbal" />
          </Picker>
        </View>

        <Text style={styles.subTitulo}>Tipo de agresor</Text>
        <View style={styles.multiSelect}>
            <Picker
                selectedValue={agresor}
                onValueChange={(itemValue) => setAgresor(itemValue)}
              >
                <Picker.Item label="Paciente" value="Paciente" />
                <Picker.Item label="Familiar/acompañante del paciente" value="Familiar/acompañante del paciente" />
                <Picker.Item label="Paciente de Salud Mental" value="Paciente de Salud Mental" />
                <Picker.Item label="Otro/a" value="Otro/a" />
            </Picker>
        </View>

  <Text style={styles.Titulo}>Datos del agresor</Text>
  <Text style={styles.subTitulo}>Ingrese nombre</Text>
    <TextInput
        value={nombreAgresor}
        onChangeText={setNombreAgresor}
        placeholder="Nombre completo"
        maxLength={60}
        style={styles.textInput}
    />

    <Text style={styles.subTitulo}>Ingrese rut</Text>
    <TextInput
      value={rutAgresor}
      onChangeText={handleRutChange}
      maxLength={15}
      placeholder="1.111.111-1"
      style={styles.textInput} 
  />
  
    <Text style={styles.subTitulo}>Ingrese dirección</Text>
    <TextInput
        value={domicilioAgresor}
        onChangeText={setDomicilioAgresor}
        placeholder="domicilio"
        maxLength={30}
        style={styles.textInput}
    />

    <Text style={styles.subTitulo}>Ingrese teléfono</Text>
    <TextInput
      value={telefonoAgresor}
      onChangeText={clearNum}
      keyboardType='numeric'
      placeholder="1 11111111"
      maxLength={9}
      style={styles.textInput}
  />

    <Text style={styles.subTitulo}>Ingrese sector de la agresión</Text>
    <TextInput
        value={sectorAgresion}
        onChangeText={setSectorAgresion}
        placeholder="Nombre sector"
        maxLength={20}
        style={styles.textInput}
    />


    <Text style={styles.Titulo}>Datos del lugar de la agresión</Text>
    <Text style={styles.subTitulo}>Ingrese Servicio de Salud </Text>
    <TextInput
        value={servicioSalud}
        onChangeText={setServicioSalud}
        placeholder="Servicio de Salud"
        maxLength={20}
        style={styles.textInput}
    />


    <Text style={styles.subTitulo}>Ingrese comuna </Text>
    <TextInput
        value={comuna}
        onChangeText={setComuna}
        placeholder="Comuna"
        maxLength={20}
        style={styles.textInput}
    />

    <Text style={styles.subTitulo}>Ingrese establecimiento </Text>
    <TextInput
        value={establecimiento}
        onChangeText={setEstablecimiento}
        placeholder="Establecimiento"
        maxLength={30}
        style={styles.textInput}
    />
    <Text style={styles.subTitulo}>Ingrese unidad</Text>
    <TextInput
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Unidad"
        maxLength={20}
        style={styles.textInput}
    />

    
    <Text style={styles.Titulo}>Datos Testigos 1</Text>
    <Text style={styles.subTitulo}>Ingrese nombre</Text>
    <TextInput
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Nombre Completo"
        maxLength={20}
        style={styles.textInput}
    />
    <Text style={styles.subTitulo}>Ingrese rut</Text>
    <TextInput
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Rut"
        maxLength={20}
        style={styles.textInput}
    />
    <Text style={styles.subTitulo}>Ingrese teléfono</Text>
    <TextInput
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Teléfono"
        maxLength={20}
        style={styles.textInput}
    />

    <Text style={styles.Titulo}>Datos Testigos 2</Text>
    <Text style={styles.subTitulo}>Ingrese nombre</Text>
    <TextInput
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Nombre Completo"
        maxLength={20}
        style={styles.textInput}
    />
    <Text style={styles.subTitulo}>Ingrese rut</Text>
    <TextInput
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Rut"
        maxLength={20}
        style={styles.textInput}
    />
    <Text style={styles.subTitulo}>Ingrese teléfono</Text>
    <TextInput
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Teléfono"
        maxLength={20}
        style={styles.textInput}
    />

    <Text style={styles.Titulo}>Descripción de la agresión</Text>
    <Text style={styles.subTitulo}>Descripción</Text>
    <TextInput
        multiline
        value={unidad}
        onChangeText={setUnidad}
        placeholder="  "
        style={{
          backgroundColor: 'white',
          alignSelf:'center',
          paddingStart:30,
          width:'80%',
          height: 200,
          borderRadius:30,
        }}
    />



    <View >
        <PrimaryButton
          style={styles.Buttons}
          onPress={() => navigation.navigate("Formularios")}
          title="Enviar"
        />
    </View>
          </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    /* alignItems: 'center', */
  },
  
  Titulo: {
    marginTop: 15,
    color: '#1e6496',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  subTitulo: {
    flex: 1,
    marginTop: 15,
    height: 35,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  textInput: {
    flex: 1,
    height: 50,
    fontSize: 13,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  Buttons: {
    fontSize: 13,
  },

  multiSelect:{
    fontSize: 13,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    /* justifyContent: 'center',
    alignItems: 'center', */
  },
  
  /* ,
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }, */
/*   card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',

cocntainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  }, */
});

export default FormularioScreen;