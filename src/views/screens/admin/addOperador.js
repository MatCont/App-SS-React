//registra un nuevo operador
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import dataComunaEstablecimiento from '../../../consts/dataComunaEstablecimiento'
import dataEstablecimientos from '../../../consts/dataEstablecimientos'
import dataTipoEstablecimiento from '../../../consts/dataTipoEstablecimiento'

/* import SQLite from 'react-native-sqlite-storage';
import db from './Utils/DataBase' */
import COLORS from '../../../consts/colors';
import { PrimaryButton } from '../../components/Button';



//juntar los nombre y apellidos en una variable
//guardar en la bdd, nombre completo, rut, comuna, establecimiento


const addOperador = () => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [rutValido, setRutValido] = useState('');
  const [comunaId, setComunaId] = useState('');
  const [nombreComuna, setNombreComuna] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [establecimientoId, setEstablecimientoId] = useState('');
  const [establecimientos, setEstablecimientos] = useState([]);
 //------------------------------------------------------------------------------------------
 const limpiarTexto = (textoIngresado, setTexto) => {
  const textoLimpio = textoIngresado.replace(/[^a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]/g, '');
  setTexto(textoLimpio);
};
//--------------------------------------------------RUT-----------------------------------------
const verificarRut = (rut, setRut) => {
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
    setRut(rutSinDigito);
  } else {
    console.log('Error', 'El Rut ingresado es incorrecto');
    setRut(false);
  }
};
//-----------------------------------------comuna tipo establecimiento----------------------------------------------------
const getEstablecimientosPorComunaYTipo = (comunaId, tipoId) => {
  const establecimientosFiltrados = dataEstablecimientos.filter(
    establecimiento => establecimiento.idComuna === comunaId && establecimiento.idTipo === tipoId
  );
  const nombresEstablecimientos = establecimientosFiltrados.map(
    establecimiento => establecimiento.nombre
  );
  setEstablecimientoId('');
  return nombresEstablecimientos;
};

const handleComunaChange = comunaId => {
  setComunaId(comunaId);
  const comuna = dataComunaEstablecimiento.find(c => c.id === comunaId);
  setNombreComuna(comuna ? comuna.name : '');
  const nuevosEstablecimientos = getEstablecimientosPorComunaYTipo(comunaId, tipoId);
  setEstablecimientos(nuevosEstablecimientos);
};

const handleTipoChange = tipoId => {
  setTipoId(tipoId);
  const tipo = dataTipoEstablecimiento.find(t => t.id === tipoId);
  setNombreTipo(tipo ? tipo.nombre : '');
  const nuevosEstablecimientos = getEstablecimientosPorComunaYTipo(comunaId, tipoId);
  setEstablecimientos(nuevosEstablecimientos);
};

const handleEstablecimientoChange = establecimientoId => {
  setEstablecimientoId(establecimientoId);
}
  //------------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="black" />

        <Image
          style={styles.image}
          source={require('../../../assets/logo_MS.png')}
        />
        <Text style={styles.Titulo}>Añadir operador</Text>

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

      if(primerNombre != '' && segundoApellido != ' ' && primerApellido != ' ' && segundoApellido != ' '){
          setNombre({primerNombre}+" "+{segundoNombre}+" "+{primerApellido}+" "+{segundoApellido})
      }
        

<Text style={styles.subTitulo}>Ingrese rut</Text>
        <TextInput
          value={rut}
          onChangeText={setRut}
          onBlur={() => verificarRut(rut, setRutValido)}
          maxLength={9}
          keyboardType='numeric'
          placeholder="Rut sin puntos ni guion"
          style={styles.textInput}
        />
        {rutValidoAgresor ? (
          <Text style={{ color: 'green', alignSelf: 'center' }}>Rut válido</Text>
        ) : (
          <Text style={{ color: 'red', alignSelf: 'center' }}>Rut incorrecto</Text>
        )}

<Text style={styles.subTitulo}>Seleccione una comuna</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={comunaId}
            onValueChange={handleComunaChange}
          >
            <Picker.Item label="Seleccione una comuna" value="" />
            {dataComunaEstablecimiento.map(comuna => (
              <Picker.Item key={comuna.id} label={comuna.name} value={comuna.id} />
            ))}
          </Picker>
        </View>
        {comunaId ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Seleccione un tipo de establecimiento</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={tipoId}
            onValueChange={handleTipoChange}
          >
            <Picker.Item label="Seleccione un tipo de establecimiento" value="" />
            {dataTipoEstablecimiento.map(tipo => (
              <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
            ))}
          </Picker>
        </View>
        {tipoId ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}


        <Text style={styles.subTitulo}>Seleccione un establecimiento</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={establecimientoId}
            onValueChange={handleEstablecimientoChange}
          >
            <Picker.Item label="Seleccione un establecimiento" value="" />
            {establecimientos.map((nombre, index) => (
              <Picker.Item key={index} label={nombre} value={nombre} />
            ))}
          </Picker>
        </View>
        {establecimientoId ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <View>
          <Text></Text>

        </View>
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
    fontSize: 30, 
    color: "black", 
    fontWeight: 'bold', 
    alignSelf: 'center' 
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
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 30,
  }

});

export default addOperador