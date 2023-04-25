import React from 'react';
import { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Image, StatusBar, Button, Alert, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

/* import SQLite from 'react-native-sqlite-storage';
import db from './Utils/DataBase' */
import COLORS from './../../consts/colors';
import { PrimaryButton } from '../components/Button';

const Perfil = () => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [rut, setRut] = useState('');
  const [date, setDate] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [mutual, setMutual] = useState('');
  const [estamento, setEstamento] = useState('');
  const [tipoEstamento, setTipoEstamento] = useState('');
  const [establecimiento, setEstablecimiento] = useState('opcion1');

  const navigation = useNavigation();
//-------------------------------------------Funciones-----------------------------------------------  
  const handleTextChangePrimerNom = (text) => {
    // Eliminar todos los caracteres que no sean letras usando una expresión regular
    const onlyLetters = text.replace(/[^A-Za-z]/g, '');
    setPrimerNombre(onlyLetters);
  };
  const handleTextChangeSegNom = (text) => {
    // Eliminar todos los caracteres que no sean letras usando una expresión regular
    const onlyLetters = text.replace(/[^A-Za-z]/g, '');
    setSegundoNombre(onlyLetters);
  };
  const handleTextChangePrimerApe = (text) => {
    // Eliminar todos los caracteres que no sean letras usando una expresión regular
    const onlyLetters = text.replace(/[^A-Za-z]/g, '');
    setPrimerApellido(onlyLetters);
  };
  const handleTextChangeSegApe = (text) => {
    // Eliminar todos los caracteres que no sean letras usando una expresión regular
    const onlyLetters = text.replace(/[^A-Za-z]/g, '');
    setSegundoApellido(onlyLetters);
  };

//--------------------------------------------------FECHA-----------------------------------------
const formatDate = (text) => {
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
//--------------------------------------------------NUMERO-----------------------------------------
const clearNum = (text) =>{
  const cleaned = text.replace(/[^0-9]/g, '');
  setTelefono(cleaned)
}
//--------------------------------------------------RUT-----------------------------------------
const formatRut = (value) => {
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
const handleRutChange = (value) => {
  setRut(formatRut(value));
};
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------sqlLite-----------------------------------------
const guardarPerfil = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO Perfil (primerNombre, segundoNombre, primerApellido, segundoApellido, rut, fechaNacimiento, telefono, correo, domicilio, mutual, estamento, tipoEstamento, establecimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [primerNombre, segundoNombre, primerApellido, segundoApellido, rut, date, telefono, correo, domicilio, mutual, estamento, tipoEstamento, establecimiento],
      (tx, results) => {
        console.log('Los datos se han guardado correctamente');
      },
      (error) => {
        console.log('Ha ocurrido un error al guardar los datos:', error);
      }
    );
  });
};
//-------------------------------------------------------------------------



  //------------------------------------------------------------------------------------------
    return(
        <View style={styles.container}>
          <ScrollView>
              <StatusBar backgroundColor="black"/>

              <Image
                style={{ width: 100, height: 100, alignSelf:'center', marginTop:10 }}
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/02/Logotipo_del_Instituto_de_Salud_P%C3%BAblica_de_Chile.png" }}
              />
              <Text  style={{fontSize:30, color:"black",fontWeight:'bold', alignSelf:'center'}}>Datos Personales</Text>

              <Text style={styles.subTitulo}>Ingrese primer nombre</Text>
              <TextInput
                value={primerNombre}
                onChangeText={handleTextChangePrimerNom}
                placeholder="Primer nombre"
                maxLength={15}
                keyboardType="ascii-capable"
                style={styles.textInput}
              />
              <Text style={styles.subTitulo}>Ingrese segundo nombre</Text>
            <TextInput
              value={segundoNombre}
              onChangeText={handleTextChangeSegNom}
              placeholder="Segundo nombre"
              maxLength={15}
              style={styles.textInput}
            />
            <Text style={styles.subTitulo}>Ingrese primer apellido</Text>
            <TextInput
              value={primerApellido}
              onChangeText={handleTextChangePrimerApe}
              placeholder="Primer apellido"
              maxLength={15}
              style={styles.textInput}
            />
            <Text style={styles.subTitulo}>Ingrese segundo apellido</Text>
            <TextInput
              value={segundoApellido}
              onChangeText={handleTextChangeSegApe}
              placeholder="Segundo apellido"
              maxLength={15}
              style={styles.textInput}

            />
 
      <Text style={styles.subTitulo}>Ingrese rut</Text>
        <TextInput
          value={rut}
          onChangeText={handleRutChange}
          maxLength={15}
          placeholder="11.111.111-1"
          style={styles.textInput} 
      />

      <Text style={styles.subTitulo}>Ingrese fecha nacimiento</Text>
        <TextInput
        value={date}
        placeholder="dd/mm/yyyy"
        onChangeText={formatDate}
        maxLength={10}
        style={styles.textInput}
      />
      <Text style={styles.subTitulo}>Ingrese teléfono</Text>
        <TextInput
          value={telefono}
          onChangeText={clearNum}
          keyboardType='numeric'
          placeholder="111111111"
          maxLength={9}
          style={styles.textInput}
      />
      <Text style={styles.subTitulo}>Ingrese correo electrónico</Text>
        <TextInput
        value={correo}
        onChangeText={setCorreo}
        placeholder="...@gmail.com"
        maxLength={40}
        style={styles.textInput}
      />
        
        <Text style={styles.subTitulo}>Ingrese dirección</Text>
        <TextInput
        value={domicilio}
        onChangeText={setDomicilio}
        placeholder="Domicilio"
        style={styles.textInput}
      />
      <Text style={styles.subTitulo}>Ingrese mutual</Text>
      <View style={styles.multiSelect}>
        <Picker
            selectedValue={mutual}
            onValueChange={(itemValue) => setMutual(itemValue)}
          >
            <Picker.Item label="ISL" value="ISL" />
            <Picker.Item label="Mutual de seguridad" value="Mutual de seguridad" />
            <Picker.Item label="ACHS" value="ACHS" />
            <Picker.Item label="IST" value="IST" />
            <Picker.Item label="Sin mutualidad" value="Sin mutualidad" />
        </Picker>
      </View>
      <Text style={styles.subTitulo}>Ingrese estamento</Text>
      <View style={styles.multiSelect}>
        <Picker
            selectedValue={estamento}
            onValueChange={(itemValue) => setEstamento(itemValue)}
          >
            <Picker.Item label="Auxiliar" value="Auxiliar" />
            <Picker.Item label="Administrativo" value="Administrativo" />
            <Picker.Item label="Tecnico" value="Tecnico" />
            <Picker.Item label="Tecnico superior" value="Tecnico superior" />
            <Picker.Item label="Profesional" value="Profesional" />
            <Picker.Item label="Medico" value="Medico" />
            <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>
      <Text style={styles.subTitulo}>Indique que estamento</Text>
        <TextInput
        value={tipoEstamento}
        onChangeText={setTipoEstamento}
        placeholder="Tipo de estamento"
        style={styles.textInput}
      />


        <Text style={styles.subTitulo}>Seleccione establecimiento ¿sacar?</Text>
      <View style={styles.multiSelect}>
        <Picker
            selectedValue={establecimiento}
            onValueChange={(itemValue) => setEstablecimiento(itemValue)}
          >
            <Picker.Item label="Opción 1" value="opcion1" />
            <Picker.Item label="Opción 2" value="opcion2" />
            <Picker.Item label="Opción 3" value="opcion3" />
        </Picker>
      </View>




              <View style={styles.Buttons }>
                <PrimaryButton 
                    title="Guardar"
                    color="blue"
                    //onPress={() => guardarPerfil()}/>
                    onPress={() => navigation.navigate("Perfil")}/>

                    
              </View> 
          </ScrollView>
        </View>
      )
}
 //------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    
    /* alignItems: 'center', */
  },
  
  Titulo: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
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
  buttonLayout: {
    justifyContent: 'center',
    alignItems: 'flex-start', 
    marginTop:10 
  },
  Buttons: {
    fontSize: 13,
    height: 50,
    marginTop: 15,
  },

  multiSelect:{
    fontSize: 13,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    
    /* justifyContent: 'center',
    alignItems: 'center', */
  },
  /* container: {
    flex: 1,
    backgroundColor: '#1a9bd7',
  },
  textInput:{
    alignSelf:'center',
    padding: 10,
    paddingStart:30,
    width:'80%',
    height: 50,
    marginTop:20,
    borderRadius:30,
    backgroundColor:'#fff'
  },
    subTitulo:{
      fontSize:20,
      color:"white",
      alignSelf:'center',
      paddingTop:10
      
    },
  buttonLayout: {
    justifyContent: 'center',
    alignItems: 'flex-start', 
    marginTop:10 
  },
  multiSelect:{
    padding: 10,
    paddingStart:20,
    backgroundColor:'#fff',
    borderRadius: 30,
    width:'80%',
    height: 50,
    alignSelf:'center',
    
  },
  buttons: {
    bottom: 0,
    left: 0,
    right: 0,
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#1a9bd7',
  }, */
  
});

export default Perfil