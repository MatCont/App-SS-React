//clase deprueba

import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';

import dataComunaEstablecimiento from '../../consts/dataComunaEstablecimiento'
import dataEstablecimientos from '../../consts/dataEstablecimientos'
import dataTipoEstablecimiento from '../../consts/dataTipoEstablecimiento'

const EstablecimientosPicker = () => {
    const [comunaId, setComunaId] = useState('');
    const [nombreComuna, setNombreComuna] = useState('');
    const [tipoId, setTipoId] = useState('');
    const [nombreTipo, setNombreTipo] = useState('');
    const [establecimientoId, setEstablecimientoId] = useState('');
    const [establecimientos, setEstablecimientos] = useState([]);

   
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

    return (
        <View>
            <Picker
                selectedValue={comunaId}
                onValueChange={handleComunaChange}
            >
                <Picker.Item label="Seleccione una comuna" value="" />
                {dataComunaEstablecimiento.map(comuna => (
                    <Picker.Item key={comuna.id} label={comuna.name} value={comuna.id} />
                ))}
            </Picker>
            <Picker
                selectedValue={tipoId}
                onValueChange={handleTipoChange}
            >
                <Picker.Item label="Seleccione un tipo de establecimiento" value="" />
                {dataTipoEstablecimiento.map(tipo => (
                    <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
                ))}
            </Picker>
            <Picker
                selectedValue={establecimientoId}
                onValueChange={handleEstablecimientoChange}
            >
                <Picker.Item label="Seleccione un establecimiento" value="" />
                {establecimientos.map((nombre, index) => (
                    <Picker.Item key={index} label={nombre} value={nombre} />
                ))}
            </Picker>
            <Text>comunaId: {nombreComuna}</Text>
            <Text>tipoId: {nombreTipo}</Text>
            <Text>establecimientoId: {establecimientoId}</Text>
            <Text>establecimientos length: {establecimientos.length}</Text>
        </View>
    );
};

export default EstablecimientosPicker;
