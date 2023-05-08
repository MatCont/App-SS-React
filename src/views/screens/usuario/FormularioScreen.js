import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, Button, Alert, ScrollView, Platform, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '../../components/Button';
import COLORS from '../../../consts/colors';
//import DateTimePicker from '@react-native-community/datetimepicker';
import dataComunaEstablecimiento from '../../../consts/dataComunaEstablecimiento'
import dataEstablecimientos from '../../../consts/dataEstablecimientos'
import dataTipoEstablecimiento from '../../../consts/dataTipoEstablecimiento'
//import DatePicker from 'react-native-date-picker';

//arreglar el formato fecha, hora

const FormularioScreen = () => {

  //const [show, setShow] = useState(false);


  const [agresion, setAgresion] = useState('');
  const [agresor, setAgresor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [nombreAgresor, setNombreAgresor] = useState('');
  const [rutAgresor, setRutAgresor] = useState('');
  const [rutValidoAgresor, setRutValidoAgresor] = useState(false); //rut valido es el que se envia, no tiene dv
  const [rutValidoTestigo1, setRutValidoTestigo1] = useState(false); //rut valido es el que se envia, no tiene dv
  const [rutValidoTestigo2, setRutValidoTestigo2] = useState(false); //rut valido es el que se envia, no tiene dv
  const [sectorAgresor, setSectorAgresor] = useState('');
  const [domicilioAgresor, setDomicilioAgresor] = useState('');
  const [telefonoAgresor, setTelefonoAgresor] = useState('');
  const [unidad, setUnidad] = useState('');
  const [comunaId, setComunaId] = useState('');
  const [nombreComuna, setNombreComuna] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [nombreTipo, setNombreTipo] = useState('');
  const [establecimientoId, setEstablecimientoId] = useState('');
  const [establecimientos, setEstablecimientos] = useState([]);
  const servicioSalud = 'Servicio de salud del BioBio';
  const [nombreTestigo1, setNombreTestigo1] = useState('');
  const [rutTestigo1, setRutTestigo1] = useState('');
  const [telefonoTestigo1, setTelefonoTestigo1] = useState('');
  const [nombreTestigo2, setNombreTestigo2] = useState('');
  const [rutTestigo2, setRutTestigo2] = useState('');
  const [telefonoTestigo2, setTelefonoTestigo2] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const navigation = useNavigation();

  //--------------------------------------------------FECHA-----------------------------------------
  const formatDate = (text) => {
    // Elimina todo lo que no sea dígito
    const cleaned = text.replace(/[^0-9]/g, '')

    // Divide en grupos de 2, 2 y 4 caracteres
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/)

    if (match) {
      // Formatea la fecha con los separadores deseados
      const formatted = match[1] + '/' + match[2] + '/' + match[3]
      setDate(formatted)
    } else {
      setDate(cleaned)
    }
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
    setTime(formattedHora)
  }

  //--------------------------------------------------NUMERO-----------------------------------------
  const clearNum = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setTelefonoAgresor(cleaned)
  }
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
  //---------------------------------------Save form----------------------------------------------------------
  const saveNewForms = async () => {
    if (!agresion || !date || !time || !comuna || !establecimiento || !unidad || !nombreTestigo1 || !rutTestigo1 || !telefonoTestigo1 || !descripcion) {
      Alert.alert('Error', 'Por favor complete todos los campos obligatorios');
      console.log('error')
    } else {
      Alert.alert('Guardado exitoso');
    }
  }

  //-------------------------------------------------------------------------------------------------
  /*  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={showPicker}>
              <Text>Selecciona una hora</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={chosenTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onTimeChange}
              />
            )}
            <Text>La hora seleccionada es: {chosenTime.toLocaleTimeString()}</Text>
          </View> */
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <ScrollView>
        <Image
          style={styles.image}
          source={require('../../../assets/logo_MS.png')}
        />
        <Text style={{ fontSize: 15, color: "black", fontWeight: 'bold', textAlign: 'center' }}>
          FORMULARIO DE NOTIFICACIÓN DE AGRESIONES HACIA
          LOS FUNCIONARIOS DE LA SALUD PÚBLICA</Text>







        <Text style={styles.Titulo}>Datos de la agresión</Text>

        <Text style={styles.subTitulo}>Ingrese fecha (*)</Text>
        <TextInput
          value={date}
          placeholder="dd/mm/yyyy"
          onChangeText={formatDate}
          maxLength={8}
          style={styles.textInput}
        />
        {date ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}
        <Text style={styles.Titulo}>----------------------------------</Text>
      

        <Text style={styles.Titulo}>----------------------------------</Text>
        <Text style={styles.subTitulo}>Ingrese hora*</Text>
        <TextInput style={styles.textInput}
          value={time}
          onChangeText={handleHoraChange}
          placeholder="hh:mm"
          keyboardType="numeric"
          maxLength={5}
        />
        {time ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese tipo de agresión*</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={agresion}
            onValueChange={(itemValue) => setAgresion(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
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
        {agresion ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Tipo de agresor</Text>
        <View style={styles.multiSelect}>
          <Picker
            selectedValue={agresor}
            onValueChange={(itemValue) => setAgresor(itemValue)}
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Paciente" value="Paciente" />
            <Picker.Item label="Familiar/acompañante del paciente" value="Familiar/acompañante del paciente" />
            <Picker.Item label="Paciente de Salud Mental" value="Paciente de Salud Mental" />
            <Picker.Item label="Otro/a" value="Otro/a" />
          </Picker>
        </View>
        {agresor ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}


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
          onChangeText={setRutAgresor}
          onBlur={() => verificarRut(rutAgresor, setRutValidoAgresor)}
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

        <Text style={styles.subTitulo}>Ingrese sector del agresor</Text>
        <TextInput
          value={sectorAgresor}
          onChangeText={setSectorAgresor}
          placeholder="Sector"
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

        <Text style={styles.Titulo}>Datos del lugar de la agresión</Text>
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

        <Text style={styles.subTitulo}>Ingrese unidad</Text>
        <TextInput
          value={unidad}
          onChangeText={setUnidad}
          placeholder="Unidad"
          maxLength={20}
          style={styles.textInput}
        />
        <Text style={styles.Titulo}>Datos testigos</Text>
        <Text style={styles.subTitulo}>Ingrese nombre de testigo 1*</Text>
        <TextInput
          value={nombreTestigo1}
          onChangeText={setNombreTestigo1}
          placeholder="Nombre"
          maxLength={50}
          style={styles.textInput}
        />
        {nombreTestigo1 ? (
          <Text style={styles.campoIngresado}>Campo ingresado</Text>
        ) : (
          <Text style={styles.campoObligatorio}>Campo obligatorio</Text>
        )}

        <Text style={styles.subTitulo}>Ingrese rut de testigo 1*</Text>
        <TextInput
          value={rutTestigo1}
          onChangeText={setRutTestigo1}
          onBlur={() => verificarRut(rutTestigo1, setRutValidoTestigo1)}
          placeholder="Rut sin puntos ni guion"
          maxLength={12}
          keyboardType='numeric'
          style={styles.textInput}
        />
        {rutValidoTestigo1 ? (
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


        <Text style={styles.Titulo}>Opcional tertigo 2</Text>
        <Text style={styles.subTitulo}>Ingrese nombre de testigo 2</Text>
        <TextInput
          value={nombreTestigo2}
          onChangeText={setNombreTestigo2}
          placeholder="Nombre"
          maxLength={50}
          style={styles.textInput}
        />
        <Text style={styles.subTitulo}>Ingrese rut de testigo 2</Text>
        <TextInput
          value={rutTestigo2}
          onChangeText={setRutTestigo2}
          onBlur={() => verificarRut(rutTestigo2, setRutValidoTestigo2)}
          placeholder="Rut sin puntos ni guion"
          maxLength={9}
          keyboardType='numeric'
          style={styles.textInput}
        />
        {rutValidoTestigo2 ? (
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
  campoObligatorio: {
    color: 'red',
  },
  campoIngresado: {
    color: 'green'
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