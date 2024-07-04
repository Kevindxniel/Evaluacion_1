import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import gamesData from '../assets/games.json';

const ApiScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const renderGameItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.gameItem}
      onPress={() => setSelectedGame(item)}
    >
      <Image source={{ uri: item.image }} style={styles.gameItemImage} />
      <View style={styles.gameItemDetails}>
        <Text style={styles.gameItemName}>{item.name}</Text>
        <Text>{item.developer}</Text>
        <Text>{item.releaseDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Juegos</Text>
      <FlatList
        data={gamesData}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {selectedGame && (
        <View style={styles.selectedGameContainer}>
          <Text style={styles.selectedGameTitle}>Detalles del Juego</Text>
          <Image source={{ uri: selectedGame.image }} style={styles.selectedGameImage} />
          <Text style={styles.selectedGameName}>{selectedGame.name}</Text>
          <Text>Desarrolladores: {selectedGame.developers.join(', ')}</Text>
          <Text>Fecha de Lanzamiento: {selectedGame.releaseDate}</Text>
          <Text>Descripción: {selectedGame.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  gameItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  gameItemDetails: {
    flex: 1,
  },
  gameItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedGameContainer: {
    marginTop: 20,
  },
  selectedGameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedGameImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  selectedGameName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ApiScreen;
