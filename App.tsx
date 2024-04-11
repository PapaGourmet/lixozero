import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import { CpfProvider } from './src/context/cpfcontext'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import Assign from './src/pages/Assign'
import Home from './src/pages/home'


export default function App() {

  const Stack = createNativeStackNavigator()
  const styles = (title: string) => {return {title: title, headerStyle: {backgroundColor: '#000'}, headerTintColor: 'white'}}
  

  return (

    <CpfProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={styles('Identificação')}/>
          <Stack.Screen name="Assign" component={Assign} options={styles('Assinatura')}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CpfProvider>

  )
}


