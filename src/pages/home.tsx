import { StatusBar } from 'expo-status-bar'
import { useContext, useEffect } from 'react'
import { Text,  TextInput, SafeAreaView, TouchableOpacity  } from 'react-native'
import { CpfContext } from '../context/cpfcontext'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../styles'
import { Camera, CameraType } from 'expo-camera'


export default function Home () {

    const {cpf, setCpf} = useContext(CpfContext)
    const navigation = useNavigation<any>()
    const [permission, requestPermission] = Camera.useCameraPermissions()

    useEffect(() => {
      (async () => {
        const x = await Camera.getCameraPermissionsAsync()
      })()
      
    }, [])

    


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
    )
}
