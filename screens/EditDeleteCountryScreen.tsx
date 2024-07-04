import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { database } from '../config/firebaseConfig';
import { ref, update, remove, onValue } from 'firebase/database';

const EditDeleteCountryScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { countryId } = route.params || {};
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    if (countryId) {
      const countryRef = ref(database, `countries/${countryId}`);
      const unsubscribe = onValue(countryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCountry(data);
        }
      });

      return () => unsubscribe(); // Cleanup function for unsubscribing from Firebase listener
    }
  }, [countryId]);

  const handleUpdate = () => {
    if (countryId) {
      update(ref(database, `countries/${countryId}`), country)
        .then(() => {
          Alert.alert('Actualizado', 'El registro se ha actualizado correctamente.');
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert('Error', `Hubo un error al actualizar el registro: ${error.message}`);
        });
    }
  };

  const handleDelete = () => {
    if (countryId) {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro que deseas eliminar este registro?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar', onPress: () => {
              remove(ref(database, `countries/${countryId}`))
                .then(() => {
                  Alert.alert('Eliminado', 'El registro se ha eliminado correctamente.');
                  navigation.goBack();
                })
                .catch((error) => {
                  Alert.alert('Error', `Hubo un error al eliminar el registro: ${error.message}`);
                });
            }
          }
        ]
      );
    }
  };

  if (!country) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Nombre"
        value={country.name}
        onChangeText={(text) => setCountry({ ...country, name: text })}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Capital"
        value={country.capital}
        onChangeText={(text) => setCountry({ ...country, capital: text })}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Población"
        value={country.population}
        onChangeText={(text) => setCountry({ ...country, population: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Idioma"
        value={country.language}
        onChangeText={(text) => setCountry({ ...country, language: text })}
      />
      <Button title="Actualizar" onPress={handleUpdate} />
      <Button title="Eliminar" onPress={handleDelete} color="red" />
    </View>
  );
};

export default EditDeleteCountryScreen;
