//registra un faf completo
//terminar
// direfenciar ek tipo de estamento segun el numero y separarlos
//fecha, hora, fecha nacimiento, edad, telefono, telefono agresor, 
//agregar causa primaria y causa segundaria
//obtener edad, region, provincia, 
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


const FormularioOperador = () => {
  //I.	IDENTIFIQUE TIPO(S) DE AGRESIÓN(ES)
  const [tipoAgresion, setTipoAgresion] = useState('');

  //II.	ANTECEDENTES DE LA AGRESIÓN
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [comunaId, setComunaId] = useState('');
  const [nombreComuna, setNombreComuna] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [nombreTipo, setNombreTipo] = useState('');

  const [establecimientoId, setEstablecimientoId] = useState('');
  const [establecimientos, setEstablecimientos] = useState([]);
  const [servicioSalud, setServicioSalud] = useState('');//SS biobio ver como esta en la bdd
  const [unidad, setUnidad] = useState('');
  const [descripcionUnidad, setDescripcionUnidad] = useState('');


  //III.	IDENTIFICACIÓN DEL AFECTADO
  const [primerNombreAfectado, setPrimerNombreAfectado] = useState('');
  const [segundoNombreAfectado, setSegundoNombreAfectado] = useState('');
  const [primerApellidoAfectado, setPrimerApellidoAfectado] = useState('');
  const [segundoApellidoAfectado, setSegundoApellidoAfectado] = useState('');
  const [genero, setGenero] = useState('');
  const [estamentoAfectado, setEstamentoAfectado] = useState('');
  const [tipoEstamento, setTipoEstamento] = useState('');
  const [rutValido, setRutValido] = useState('');
  const [rutValidoAfectado, setRutValidoAfectado] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edad, setEdad] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [telefonoAfectado, setTelefonoAfectado] = useState('');
  const [correo, setCorreo] = useState('');
  const [mutualidad, setMutualiad] = useState('');

  //IV.	DATOS DE EL/LA AGRESOR/A (de ser posible)
  const [tipoAgresor, setTipoAgresor] = useState('');
  const [primerNombreAgresor, setPrimerNombreAgresor] = useState('');
  const [segundoNombreAgresor, setSegundoNombreAgresor] = useState('');
  const [primerApellidoAgresor, setPrimerApellidoAgresor] = useState('');
  const [segundoApellidoAgresor, setSegundoApellidoAgresor] = useState('');
  const [rutAgresor, setRutAgresor] = useState('');
  const [rutAgresorValido, setRutAgresorValido] = useState('');
  const [sectorAgresor, setSectorAgresor] = useState('');
  const [domicilioAgresor, setDomicilioAgresor] = useState('');
  const [telefonoAgresor, setTelefonoAgresor] = useState('');

  //V.	TESTIGOS DEL CONFLICTO
  // TESTIGO 1
  const [primerNombreTestigo1, setPrimerNombreTestigo1] = useState('');
  const [segundoNombreTestigo1, setSegundoNombreTestigo1] = useState('');
  const [primerApellidoTestigo1, setPrimerApellidoTestigo1] = useState('');
  const [segundoApellidoTestigo1, setSegundoApellidoTestigo1] = useState('');
  const [rutTestigo1, setRutTestigo1] = useState('');
  const [rutTestigo1Valido, setRutTestigo1Valido] = useState('');
  const [telefonoTestigo1, setTelefonoTestigo1] = useState('');
  // TESTIGO 2
  const [primerNombreTestigo2, setPrimerNombreTestigo2] = useState('');
  const [segundoNombreTestigo2, setSegundoNombreTestigo2] = useState('');
  const [primerApellidoTestigo2, setPrimerApellidoTestigo2] = useState('');
  const [segundoApellidoTestigo2, setSegundoApellidoTestigo2] = useState('');
  const [rutTestigo2, setRutTestigo2] = useState('');
  const [rutTestigo2Valido, setRutTestigo2Valido] = useState('');
  const [telefonoTestigo2, setTelefonoTestigo2] = useState('');

  //VII.	DESCRIPCIÓN DEL INCIDENTE
  const [descripcion, setDescripcion] = useState('');


  //------------------------------------------------------------------------------------------
  const limpiarTexto = (textoIngresado, setTexto) => {
    const textoLimpio = textoIngresado.replace(/[^a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]/g, '');
    setTexto(textoLimpio);
  };
  //--------------------------------------------------RUT-----------------------------------------
  const verificarRut = (rutValido, setRutValido) => {
    // Remover guiones y puntos del Rut
    const rutLimpio = rutValido.replace(/[^0-9Kk]/g, '');

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
    } else {
      console.log('Error', 'El Rut ingresado es incorrecto');
      setRutValido(false);
    }
  };
  //--------------------------------------------------FECHA-----------------------------------------
  const formatDate = (text) => {
    // Elimina todo lo que no sea dígito
    const cleaned = text.replace(/[^0-9]/g, '')

    // Divide en grupos de 2, 2 y 4 caracteres
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/)

    if (match) {
      // Formatea la fecha con los separadores deseados
      const formatted = match[1] + '/' + match[2] + '/' + match[3]
      setFecha(formatted)
    } else {
      setFecha(cleaned)
    }
  }
  //--------------------------------------------------NUMERO-----------------------------------------
  const clearNum = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setTelefonoAgresor(cleaned)
  }
  //-----------------------------------------HORA--------------------------------------------------

  const handleHoraChange = (text) => {
    // Lógica para formatear la hora en formato de 12 horas con dos puntos
    // Ejemplo: convierte "1111" a "11:11"
    let formattedHora = ''
    if (text.length === 2 && time.length < 2) {
      formattedHora = `${text}:`
    } else if (text.length > 2 && time.length === 2) {
      formattedHora = `${text.slice(0, 2)}:${text.slice(2)}`
    } else {
      formattedHora = text
    }
    setHora(formattedHora)
  }
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
        <Text style={styles.Titulo}>INGRESAR FORMULARIO</Text>

        <Text style={styles.categoria}>I.	IDENTIFIQUE TIPO(S) DE AGRESIÓN(ES)</Text>

        <Text style={styles.subTitulo}>Ingrese tipo de agresión*</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={tipoAgresion}
            onValueChange={(itemValue) => setTipoAgresion(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="A.F: Con arma de fuego" value="1" />
            <Picker.Item label="A.F: Con arma blanca" value="2" />
            <Picker.Item label="A.F: Con objeto contundente" value="3" />
            <Picker.Item label="A.F: Golpes, patadas, empujones" value="4" />
            <Picker.Item label="A.F.S: Tocaciones, agarrones, etc" value="5" />
            <Picker.Item label="A.V.S: Lenguaje con connotacion sexual u obseno" value="6" />
            <Picker.Item label="A.V: Amenazas u hostigamientos" value="7" />
            <Picker.Item label="A.V: Insultos o garabatos" value="8" />
            <Picker.Item label="A.V: Burlas o descalificaciones" value="9" />
            <Picker.Item label="A.V: Denotación por redes sociales" value="10" />
            <Picker.Item label="Ataque contra la infraestructura" value="11" />
            <Picker.Item label="Otro tipo de agresión" value="12" />
   
          </Picker>
        </View>
        {tipoAgresion ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <Text style={styles.categoria}>II.	ANTECEDENTES DE LA AGRESIÓN</Text>


        <Text style={styles.subTitulo}>Ingrese fecha (*)</Text>
        <TextInput
          value={fecha}
          placeholder="dd/mm/yyyy"
          onChangeText={formatDate}
          maxLength={8}
          style={styles.textInput}
        />
        {fecha ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese hora*</Text>
        <TextInput style={styles.textInput}
          value={hora}
          onChangeText={handleHoraChange}
          placeholder="hh:mm"
          keyboardType="numeric"
          maxLength={5}
        />
        {hora ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
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

        <Text style={styles.subTitulo}>Seleccione unidad</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={unidad}
            onValueChange={(itemValue) => setUnidad(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Area atención abierta" value="1" />
            <Picker.Item label="Area atención cerrada" value="2" />
            <Picker.Item label="Servicios de apoyo" value="3" />
            <Picker.Item label="Servicios generales" value="4" />
            <Picker.Item label="OIRS" value="5" />
            <Picker.Item label="SOME" value="6" />
            <Picker.Item label="Urgencia" value="7" />
            <Picker.Item label="Sala de espera" value="8" />
            <Picker.Item label="Visita Domiciliaria" value="9" />
            <Picker.Item label="Sector/Box" value="10" />
            <Picker.Item label="Exterior del Centro" value="11" />
            <Picker.Item label="Vía pública" value="12" />
            <Picker.Item label="Otro" value="13" />
          </Picker>
        </View>
        {unidad ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese descripcion de la unidad</Text>
        <TextInput
          value={descripcionUnidad}
          onChangeText={(text) => limpiarTexto(text, setDescripcionUnidad)}
          placeholder="Descripcion"
          maxLength={60}
          keyboardType="ascii-capable"
          style={styles.textInput}
        />


        <Text style={styles.categoria}>III.	IDENTIFICACIÓN DEL AFECTADO</Text>

        <Text style={styles.subTitulo}>Ingrese primer nombre</Text>
        <TextInput
          value={primerNombreAfectado}
          onChangeText={(text) => limpiarTexto(text, setPrimerNombreAfectado)}
          placeholder="Primer nombre"
          maxLength={15}
          keyboardType="ascii-capable"
          style={styles.textInput}
        />{primerNombreAfectado && ( // Mostrar el mensaje solo si showMessage es true
          <Text style={{ marginTop: 8, color: 'green' }}>Campo ingresado</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese segundo nombre</Text>
        <TextInput
          value={segundoNombreAfectado}
          onChangeText={(text) => limpiarTexto(text, setSegundoNombreAfectado)}
          placeholder="Segundo nombre"
          maxLength={15}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese primer apellido</Text>
        <TextInput
          value={primerApellidoAfectado}
          onChangeText={(text) => limpiarTexto(text, setPrimerApellidoAfectado)}
          placeholder="Primer apellido"
          maxLength={15}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese segundo apellido</Text>
        <TextInput
          value={segundoApellidoAfectado}
          onChangeText={(text) => limpiarTexto(text, setSegundoApellidoAfectado)}
          placeholder="Segundo apellido"
          maxLength={15}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Seleccione genero</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={genero}
            onValueChange={(itemValue) => setGenero(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Masculino" value="2" />
            <Picker.Item label="Femenino" value="3" />
          </Picker>
        </View>

        <Text style={styles.subTitulo}>Seleccione estamento *</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={estamentoAfectado}
            onValueChange={(itemValue) => setEstamentoAfectado(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="APS Aux." value="2" />
            <Picker.Item label="APS Adm." value="3" />
            <Picker.Item label="APS Tec." value="4" />
            <Picker.Item label="APS Tec. Sup." value="5" />
            <Picker.Item label="APS Prof." value="6" />
            <Picker.Item label="APS Med. Otros" value="7" />
            <Picker.Item label="Hospital Aux." value="8" />
            <Picker.Item label="Hospital Adm." value="9" />
            <Picker.Item label="Hospital Tec." value="10" />
            <Picker.Item label="Hospital Prof." value="11" />
            <Picker.Item label="Hospital Ley Med." value="12" />
          </Picker>
        </View>
        {estamentoAfectado ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Indique estamento *</Text>
        <TextInput
          value={tipoEstamento}
          onChangeText={(text) => limpiarTexto(text, setTipoEstamento)}
          placeholder="Ingrese el tipo de estamento"
          maxLength={20}
          style={styles.textInput}
        />

        <Text style={styles.subTitulo}>Ingrese rut</Text>
        <TextInput
          value={rutValido}
          onChangeText={setRutValido}
          onBlur={() => verificarRut(rutValido, setRutValidoAfectado)}
          maxLength={9}
          keyboardType='numeric'
          placeholder="Rut sin puntos ni guion"
          style={styles.textInput}
        />
        {rutValidoAfectado ? (
          <Text style={{ color: 'green', alignSelf: 'center' }}>Rut válido</Text>
        ) : (
          <Text style={{ color: 'red', alignSelf: 'center' }}>Rut incorrecto</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese fecha nacimiento</Text>
        <TextInput
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
          maxLength={9}
          keyboardType='numeric'
          placeholder="Ingrese fecha"
          style={styles.textInput}
        />
        {fechaNacimiento ? (
          <Text style={{ color: 'green' }}>Campo Ingresado</Text>
        ) : (
          <Text style={{ color: 'red' }}>Campo Obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese edad</Text>
        <TextInput
          value={edad}
          onChangeText={setEdad}
          maxLength={2}
          keyboardType='numeric'
          placeholder="Ingrese edad"
          style={styles.textInput}
        />
        {edad ? (
          <Text style={{ color: 'green' }}>Campo Ingresado</Text>
        ) : (
          <Text style={{ color: 'red' }}>Campo Obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese domicilio</Text>
        <TextInput
          value={domicilio}
          onChangeText={(text) => limpiarTexto(text, setDomicilio)}
          placeholder="Domicilio"
          maxLength={50}
          keyboardType="ascii-capable"
          style={styles.textInput}
        />{domicilio ? (
          <Text style={{ color: 'green' }}>Campo Ingresado</Text>
        ) : (
          <Text style={{ color: 'red' }}>Campo Obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese teléfono</Text>
        <TextInput
          value={telefonoAfectado}
          onChangeText={setTelefonoAfectado}
          keyboardType='numeric'
          placeholder="111111111"
          maxLength={9}
          style={styles.textInput}
        />

        <Text style={styles.subTitulo}>Ingrese correo</Text>
        <TextInput
          value={correo}
          onChangeText={setCorreo}
          placeholder="correo"
          maxLength={30}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese mutual</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={mutualidad}
            onValueChange={(itemValue) => setMutualiad(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="ISL" value="ISL" />
            <Picker.Item label="Mutual de seguridad" value="Mutual de seguridad" />
            <Picker.Item label="ACHS" value="ACHS" />
            <Picker.Item label="IST" value="IST" />
            <Picker.Item label="Sin mutualidad" value="Sin mutualidad" />
          </Picker>
        </View>


        <Text style={styles.categoria}>IV.	DATOS DE EL/LA AGRESOR/A </Text>


        <Text style={styles.subTitulo}>Seleccione tipo agresor *</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={tipoAgresor}
            onValueChange={(itemValue) => setTipoAgresor(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Paciente" value="2" />
            <Picker.Item label="Familiar/Acompañante del paciente" value="3" />
            <Picker.Item label="Paciente de Salud Mental" value="4" />
            <Picker.Item label="Otro." value="5" />
          </Picker>
        </View>
        {estamentoAfectado ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}
        <Text style={styles.subTitulo}>Ingrese primer nombre</Text>
        <TextInput
          value={primerNombreAgresor}
          onChangeText={setPrimerNombreAgresor}
          placeholder="Primer nombre"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese segundo nombre</Text>
        <TextInput
          value={segundoNombreAgresor}
          onChangeText={setSegundoNombreAgresor}
          placeholder="Segundo nombre"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese primer apellido</Text>
        <TextInput
          value={primerApellidoAgresor}
          onChangeText={primerApellidoAgresor}
          placeholder="Primer apellido"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese segundo apellido</Text>
        <TextInput
          value={segundoApellidoAgresor}
          onChangeText={primerApellidoAgresor}
          placeholder="Segundo apellido"
          maxLength={20}
          style={styles.textInput}
        />


        <Text style={styles.subTitulo}>Ingrese rut</Text>
        <TextInput
          value={rutAgresor}
          onChangeText={setRutAgresor}
          onBlur={() => verificarRut(rutAgresor, setRutAgresorValido)}
          maxLength={9}
          keyboardType='numeric'
          placeholder="Rut sin puntos ni guion"
          style={styles.textInput}
        />
        {rutAgresorValido ? (
          <Text style={{ color: 'green', alignSelf: 'center' }}>Rut válido</Text>
        ) : (
          <Text style={{ color: 'red', alignSelf: 'center' }}>Rut incorrecto</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese sector del agresor</Text>
        <TextInput
          value={sectorAgresor}
          onChangeText={setSectorAgresor}
          placeholder="Sector agresor"
          maxLength={20}
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
          placeholder="111111111"
          maxLength={9}
          style={styles.textInput}
        />
        <Text style={styles.categoria}>V.	TESTIGOS DEL CONFLICTO</Text>

        <Text style={styles.subTitulo}>Ingrese primer nombre</Text>
        <TextInput
          value={primerNombreTestigo1}
          onChangeText={setPrimerNombreTestigo1}
          placeholder="Primer nombre"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese segundo nombre</Text>
        <TextInput
          value={segundoNombreTestigo1}
          onChangeText={setSegundoNombreTestigo1}
          placeholder="Segundo nombre"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese primer apellido</Text>
        <TextInput
          value={primerApellidoTestigo1}
          onChangeText={primerApellidoTestigo1}
          placeholder="Primer apellido"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese segundo apellido</Text>
        <TextInput
          value={segundoApellidoTestigo1}
          onChangeText={primerApellidoTestigo1}
          placeholder="Segundo apellido"
          maxLength={20}
          style={styles.textInput}
        />

        <Text style={styles.subTitulo}>Ingrese rut de testigo 1*</Text>
        <TextInput
          value={rutTestigo1}
          onChangeText={setRutTestigo1}
          onBlur={() => verificarRut(rutTestigo1, setRutTestigo1Valido)}
          placeholder="Rut sin puntos ni guion"
          maxLength={12}
          keyboardType='numeric'
          style={styles.textInput}
        />
        {rutTestigo1Valido ? (
          <Text style={{ color: 'green', alignSelf: 'center' }}>Rut válido</Text>
        ) : (
          <Text style={{ color: 'red', alignSelf: 'center' }}>Rut incorrecto</Text>
        )}


        <Text style={styles.subTitulo}>Ingrese telefono de testigo 1*</Text>
        <TextInput
          value={telefonoTestigo1}
          onChangeText={setTelefonoTestigo1}
          placeholder="Telefono"
          maxLength={9}
          keyboardType='numeric'
          style={styles.textInput}
        />
        {telefonoTestigo1 ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}


        <Text style={styles.opcional}>Opcional tertigo 2</Text>

        <Text style={styles.subTitulo}>Ingrese primer nombre</Text>
        <TextInput
          value={primerApellidoTestigo2}
          onChangeText={setPrimerApellidoTestigo2}
          placeholder="Primer nombre"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese segundo nombre</Text>
        <TextInput
          value={segundoApellidoTestigo2}
          onChangeText={setSegundoNombreTestigo2}
          placeholder="Segundo nombre"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese primer apellido</Text>
        <TextInput
          value={primerApellidoTestigo2}
          onChangeText={primerApellidoTestigo2}
          placeholder="Primer apellido"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese segundo apellido</Text>
        <TextInput
          value={segundoApellidoTestigo2}
          onChangeText={primerApellidoTestigo2}
          placeholder="Segundo apellido"
          maxLength={20}
          style={styles.textInput}
        />

        <Text style={styles.subTitulo}>Ingrese rut de testigo 2</Text>
        <TextInput
          value={rutTestigo2}
          onChangeText={setRutTestigo2}
          onBlur={() => verificarRut(rutTestigo2, setRutTestigo2Valido)}
          placeholder="Rut sin puntos ni guion"
          maxLength={9}
          keyboardType='numeric'
          style={styles.textInput}
        />
        {rutTestigo2Valido ? (
          <Text style={{ color: 'green', alignSelf: 'center' }}>Rut válido</Text>
        ) : (
          <Text style={{ color: 'red', alignSelf: 'center' }}>Rut incorrecto</Text>
        )}


        <Text style={styles.subTitulo}>Ingrese telefono de testigo 2</Text>
        <TextInput
          value={telefonoTestigo2}
          onChangeText={setTelefonoTestigo2}
          placeholder="Telefono"
          maxLength={9}
          keyboardType='numeric'
          style={styles.textInput}
        />

        <Text style={styles.categoria}>VII. DESCRIPCIÓN DEL INCIDENTE</Text>

        <Text style={styles.Titulo}>Descripción de la agresión</Text>
        <Text style={styles.subTitulo}>Descripción*</Text>
        <TextInput
          style={styles.descrip}
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
        />
        {descripcion ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}




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
    color: '#1e6496',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 20,
  },
  categoria: {
    marginTop: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  subTitulo: {
    flex: 1,
    marginTop: 15,
    height: 35,
    borderRadius: 10,
    flexDirection: 'row',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  opcional: {
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  campoObligatorio: {
    color: 'red',
  },
  campoIngresado: {
    color: 'green'
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  Buttons: {
    fontSize: 13,
  },
  time: {
    fontSize: 20,
    marginTop: 16,
  },

  multiSelect: {
    height: 50,
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
    borderRadius: 10,
    backgroundColor: COLORS.white,
    /* justifyContent: 'center',
    alignItems: 'center', */
  },
  descrip: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
    paddingStart: 10,
    paddingEnd: 10,
    width: '100%',
    height: 200,
    borderRadius: 30,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 30,
  }
});

export default FormularioOperador