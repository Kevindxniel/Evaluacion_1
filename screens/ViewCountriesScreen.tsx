import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { database } from '../config/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import Informacion from '../components/Informacion';

interface Country {
  id: string;
  name: string;
  capital: string;
  population: string;
  language: string;
}

const ViewCountriesScreen: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchId, setSearchId] = useState<string>('');
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const countriesRef = ref(database, 'countries');
    onValue(countriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const countriesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setCountries(countriesArray);
      }
    });
  }, []);

  const handleSearch = () => {
    const foundCountry = countries.find(country => country.id === searchId);
    if (foundCountry) {
      setCountry(foundCountry);
    } else {
      Alert.alert('No encontrado', 'No se encontró un país con ese ID');
    }
  };

  const renderCountryInfo = ({ item }: { item: Country }) => (
    <Informacion
      country={item}
      onPress={() => Alert.alert(
        'Información',
        `Nombre: ${item.name}\nCapital: ${item.capital}\nPoblación: ${item.population}\nIdioma: ${item.language}`
      )}
    />
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Buscar por ID"
        value={searchId}
        onChangeText={setSearchId}
      />
      <Button title="Buscar" onPress={handleSearch} />
      
      {country && (
        <View style={{ marginVertical: 20 }}>
          <Text>ID: {country.id}</Text>
          <Text>Nombre: {country.name}</Text>
          <Text>Capital: {country.capital}</Text>
          <Text>Población: {country.population}</Text>
          <Text>Idioma: {country.language}</Text>
        </View>
      )}

      <FlatList
        data={countries}
        keyExtractor={(item) => item.id}
        renderItem={renderCountryInfo}
      />
    </View>
  );
};

export default ViewCountriesScreen;
