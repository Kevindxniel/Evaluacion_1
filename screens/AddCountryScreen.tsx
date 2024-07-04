import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { database } from '../config/firebaseConfig';
import { ref, push } from 'firebase/database';

const AddCountryScreen: React.FC = () => {
  const [countryData, setCountryData] = useState({
    name: '',
    capital: '',
    population: '',
    language: ''
  });

  const handleChangeText = (key: string, value: string) => {
    setCountryData({ ...countryData, [key]: value });
  };

  const handleAddCountry = () => {
    push(ref(database, 'countries'), countryData)
      .then(() => {
        Alert.alert('Registro Agregado', 'El país se ha registrado correctamente.');
        setCountryData({
          name: '',
          capital: '',
          population: '',
          language: ''
        });
      })
      .catch((error) => {
        Alert.alert('Error', `Hubo un error al registrar el país: ${error.message}`);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Agregar País</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, width: '100%' }}
        placeholder="Nombre"
        value={countryData.name}
        onChangeText={(text) => handleChangeText('name', text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, width: '100%' }}
        placeholder="Capital"
        value={countryData.capital}
        onChangeText={(text) => handleChangeText('capital', text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, width: '100%' }}
        placeholder="Población"
        value={countryData.population}
        onChangeText={(text) => handleChangeText('population', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, width: '100%' }}
        placeholder="Idioma"
        value={countryData.language}
        onChangeText={(text) => handleChangeText('language', text)}
      />
      <Button
        title="Agregar País"
        onPress={handleAddCountry}
      />
    </View>
  );
};

export default AddCountryScreen;

