import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Informacion: React.FC<{ country: any, onPress: () => void }> = ({ country, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
        <Text>{country.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Informacion;


