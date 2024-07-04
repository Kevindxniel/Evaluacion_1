import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Kevin Orbea</Text>
      <Button title="Continuar" onPress={() => navigation.navigate('Main')} />
    </View>
  );
};

export default WelcomeScreen;
