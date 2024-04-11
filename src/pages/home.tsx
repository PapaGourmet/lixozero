import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text,  TextInput, SafeAreaView, TouchableOpacity  } from 'react-native';
import { CpfContext } from '../context/cpfcontext';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function Home () {

    const {cpf, setCpf} = useContext(CpfContext)
    const navigation = useNavigation<any>()

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.text}>CPF</Text>
        <TextInput 
            style={styles.input} 
            keyboardType='numeric' maxLength={11}
            value={cpf}
            onChangeText={(text) => setCpf(text)}
        ></TextInput>
        
        <TouchableOpacity  
        style={[styles.button]}
        onPress={() => {
            navigation.navigate('Assign')
        }}
        >
        <Text style={styles.buttonText}>assinar multa</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    color: 'white',
    padding: 20
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 5,
    padding: 8
  },
  button: {
    backgroundColor: '#458',
    padding: 10,
    borderRadius: 5,
    marginTop: 4
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  link: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  }
});