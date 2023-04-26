import React, { useState } from 'react';
import { View, Text, Button } from 'react-native'; // Importa Picker y Button de react-native
import dataComunaEstablecimiento from './dataComunaEstablecimiento'; // Importa el arreglo de datos de comuna
import dataTipoEstablecimiento from './dataTipoEstablecimiento'; // Importa el arreglo de datos de tipo de establecimiento
import dataEstablecimientos from './dataEstablecimientos'; // Importa el arreglo de datos de establecimientos
import { Picker } from '@react-native-picker/picker';
const EstablecimientosScreen = () => {
  const [selectedComuna, setSelectedComuna] = useState(null); // Estado para almacenar la comuna seleccionada
  const [selectedTipo, setSelectedTipo] = useState(null); // Estado para almacenar el tipo de establecimiento seleccionado
  const [filteredEstablecimientos, setFilteredEstablecimientos] = useState([]); // Estado para almacenar los establecimientos filtrados

  // Función para manejar el cambio de la selección de la comuna
  const handleComunaChange = (value) => {
    setSelectedComuna(value); // Actualiza el estado con la comuna seleccionada
    setFilteredEstablecimientos([]); // Reinicia el estado de los establecimientos filtrados
  };

  // Función para manejar el cambio de la selección del tipo de establecimiento
  const handleTipoChange = (value) => {
    setSelectedTipo(value); // Actualiza el estado con el tipo de establecimiento seleccionado
    setFilteredEstablecimientos([]); // Reinicia el estado de los establecimientos filtrados
  };

  // Función para filtrar los establecimientos basados en la comuna y el tipo de establecimiento seleccionados
  const filterEstablecimientos = () => {
    const filtered = dataEstablecimientos.filter(
      (establecimiento) =>
        establecimiento.idComuna === selectedComuna && establecimiento.idTipo === selectedTipo
    );
    setFilteredEstablecimientos(filtered); // Actualiza el estado de los establecimientos filtrados
  };

  return (
    <View>
      {/* Picker para seleccionar la comuna */}
      <Picker
        selectedValue={selectedComuna}
        onValueChange={(value) => handleComunaChange(value)}
      >
        <Picker.Item label="Selecciona una comuna" value={null} /> {/* Opción predeterminada */}
        {dataComunaEstablecimiento.map((comuna, index) => (
          <Picker.Item key={index} label={comuna.name} value={comuna.id} />
        ))}
      </Picker>
      {/* Picker para seleccionar el tipo de establecimiento */}
      <Picker
        selectedValue={selectedTipo}
        onValueChange={(value) => handleTipoChange(value)}
      >
        <Picker.Item label="Selecciona un tipo de establecimiento" value={null} /> {/* Opción predeterminada */}
        {dataTipoEstablecimiento.map((tipo, index) => (
          <Picker.Item key={index} label={tipo.nombre} value={tipo.id} />
        ))}
      </Picker>
      {/* Botón para filtrar los establecimientos */}
      <Button title="Filtrar" onPress={filterEstablecimientos} />
      {/* Mostrar los establecimientos filtrados */}
      {filteredEstablecimientos.length > 0 ? (
        <View>
                <Text>Establecimientos filtrados:</Text>
                {filteredEstablecimientos.map((establecimiento, index) => (
        <Text key={index}>
          {establecimiento.nombre} - Comuna: {establecimiento.idComuna} - Tipo: {establecimiento.idTipo}
        </Text>
      ))}
    </View>
  ) : null}
</View>

);
};

export default EstablecimientosScreen;