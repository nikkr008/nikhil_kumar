import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import axios from 'react-native-axios'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.get('https://api.cipra.ai:5000/takehome/signin', {
        params: { email, password }
      });

      console.log(response.status);
      if (response.status === 200) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in');
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={require('../utils/logo.png')} style={styles.logo} />
      <Text style= {styles.heading}>Sign In</Text>
      <View style={{flexDirection: 'row'}}>
        <Image source={require('../utils/user.png')} style={styles.id} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={{flexDirection: 'row'}}>
      <Image source={require('../utils/key.png')} style={styles.id} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      </View>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: windowHeight*0.05,
    backgroundColor: '#ffffff',
    height: windowHeight
  },
  logo: {
    width: windowWidth,
    height: windowHeight*0.1,
    alignSelf: 'center',
    marginTop: windowHeight*0.05,
    marginBottom: windowHeight*0.05,
    resizeMode: 'contain'
  },
  id: {
    width: windowWidth*0.15,
    height: windowHeight*0.04,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  heading:{
    fontSize: windowHeight*0.05,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    marginBottom: windowHeight*0.08
  },
  input: {
    height: windowHeight*0.05,
    width: windowWidth*0.7,
    borderColor: '#000000',
    borderRadius: 15,
    borderWidth: windowWidth*0.005,
    marginBottom: windowHeight*0.02,
    color: '#000000'
  },
});

export default Signin;
