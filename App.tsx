import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Text, Button, TouchableOpacity } from 'react-native';

export default function App() {

  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [plus, setPlus] = useState<any>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text>First number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Numeric Values Only"
            placeholderTextColor="#60605e"
            keyboardType={'numeric'}
            onChangeText={(text) => { setFirst(Number(text)) }}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text>Second number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Numeric Values Only"
            placeholderTextColor="#60605e"
            keyboardType={'numeric'}
            onChangeText={(text) => { setSecond(Number(text)) }}
          />
        </View>
        <View style={styles.rowContainer}>
          <Button title="Sum" onPress={(ev) => setPlus(first + second)} />
        </View>

        <View style={styles.rowContainer}>
          {plus !== null && (<Text>The sum is: {plus}</Text>)}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    flexDirection: "column",
    padding: 16,
    marginTop: 100,
  },
  rowContainer: {
    flexDirection: "column",
    width: '100%',
    marginBottom: 16
  },

  textInput: {
    width: '100%',
    backgroundColor: '#dde8c9',
    padding: 16,
  }, 
});
