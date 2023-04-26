import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, Button, Alert, ScrollView } from 'react-native';
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
  const [genero, setGenero] = useState('');
  const [rut, setRut] = useState('');
  const [rutValido, setRutValido] = useState(false); //rut valido es el que se envia, no tiene dv
  const [date, setDate] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [mutual, setMutual] = useState('');
  const [estamento, setEstamento] = useState('');
  const [tipoEstamento, setTipoEstamento] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  //-------------------------------------------Limpiar texto-----------------------------------------------  
  const limpiarTexto = (textoIngresado, setTexto) => {
    const textoLimpio = textoIngresado.replace(/[^a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]/g, '');
    setTexto(textoLimpio);
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
  const clearNum = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setTelefono(cleaned)
  }
  //--------------------------------------------------RUT-----------------------------------------
  const verificarRut = (rut) => {
    // Remover guiones y puntos del Rut
    const rutLimpio = rut.replace(/[^0-9Kk]/g, '');

    // Obtener el número base y dígito verificador
    const rutRegExp = /^(\d+)([kK\d])$/;
    const rutSinDigito = rutLimpio.slice(0, -1);
    const match = rutLimpio.match(rutRegExp);

    if (!match) {
      // El Rut no cumple con el formato válido
      console.log('Error', 'El Rut ingresado no es válido');
      return;
    }

    const num = parseInt(match[1]);
    const dv = match[2].toUpperCase();

    // Calcular dígito verificador esperado
    let M = 0;
    let S = 1;
    let numRut = num; // Crear una nueva variable para almacenar el valor numérico del Rut
    for (; numRut; numRut = Math.floor(numRut / 10)) {
      S = (S + numRut % 10 * (9 - M++ % 6)) % 11;
    }

    const dvEsperado = S ? S - 1 + '' : 'K';

    // Comparar dígito verificador ingresado con el esperado
    if (dv === dvEsperado) {
      console.log('Éxito', 'El Rut ingresado es válido');
      setRutValido(rutSinDigito);
      console.log('rut', rutValido);
    } else {
      console.log('Error', 'El Rut ingresado es incorrecto');
      console.log('rut', rutValido);
      setRutValido(false);
    }
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
  //--------------------------------------------------Datos obligatorios-----------------------------------------
  const savePerfil = async () => {
    if (!primerNombre || !segundoNombre || !primerApellido || !segundoApellido || !rut || !date || !telefono || !correo || !domicilio || !mutual || !estamento || !tipoEstamento) {
      console.log('Error', 'Por favor complete todos los campos obligatorios');
    } else {
      console.log('Guardado exitoso');
    }
  }
//-----------------------------------------------
const handleInputPress = () => {
  setShowMessage(true); // Mostrar el mensaje al seleccionar el input text
  console.log('entro')
}
  //------------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="black" />

        <Image
          style={styles.image}
          source={require('./../../assets/logo_MS.png')}
        />
        <Text style={{ fontSize: 30, color: "black", fontWeight: 'bold', alignSelf: 'center' }}>Datos Personales</Text>

        <Text style={styles.subTitulo}>Ingrese primer nombre</Text>
        <TextInput
          value={primerNombre}
          onChangeText={(text) => limpiarTexto(text, setPrimerNombre)}
          placeholder="Primer nombre"
          maxLength={15}
          onPress={handleInputPress}
          keyboardType="ascii-capable"
          style={styles.textInput}
        />{showMessage && ( // Mostrar el mensaje solo si showMessage es true
        <Text style={{ marginTop: 8, color: 'green' }}>Mensaje de ejemplo</Text>
      )}

        <Text style={styles.subTitulo}>Ingrese segundo nombre</Text>
        <TextInput
          value={segundoNombre}
          onChangeText={(text) => limpiarTexto(text, setSegundoNombre)}
          placeholder="Segundo nombre"
          maxLength={15}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese primer apellido</Text>
        <TextInput
          value={primerApellido}
          onChangeText={(text) => limpiarTexto(text, setPrimerApellido)}
          placeholder="Primer apellido"
          maxLength={15}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese segundo apellido</Text>
        <TextInput
          value={segundoApellido}
          onChangeText={(text) => limpiarTexto(text, setSegundoApellido)}
          placeholder="Segundo apellido"
          maxLength={15}
          style={styles.textInput}

        />

<Text style={styles.subTitulo}>Ingrese genero</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={genero}
            onValueChange={(itemValue) => setGenero(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
            <Picker.Item label="Sin informacion" value="Sin informacion" />
          </Picker>
        </View>

<Text style={styles.subTitulo}>Ingrese rut</Text>
        <TextInput
          value={rut}
          onChangeText={setRut}
          onBlur={() => verificarRut(rut)}
          maxLength={12}
          placeholder="11.111.111-1"
          onPress={handleInputPress}
          style={styles.textInput}
        />
        {rutValido ? (
          <Text style={{ color: 'green', alignSelf:'center'}}>Rut válido</Text>
        ) : (
          <Text style={{ color: 'red', alignSelf:'center' }}>Rut incorrecto</Text>
        )}

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
            <Picker.Item label="Seleccione" value="" />
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
            <Picker.Item label="Seleccione" value="" />
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

        <View style={styles.Buttons}>
          <PrimaryButton
            title="Guardar"
            color="blue"
            //onPress={() => guardarPerfil()}/>
            onPress={() => savePerfil()} />

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
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonLayout: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10
  },
  Buttons: {
    fontSize: 13,
    height: 50,
    marginTop: 15,
  },

  multiSelect: {
    fontSize: 13,
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
    /* justifyContent: 'center',
    alignItems: 'center', */
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 30,
  }
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