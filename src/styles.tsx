import { StyleSheet  } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      color: '#000',
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
    },
    containerAssign: {
        flex: 1,
        flexDirection: 'column', // Garante que as views são organizadas horizontalmente
      },
      item: {
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        color: 'white',
        padding: 10
      },
      camera: {
        position: 'absolute',
        width: 1, // Definir largura e altura mínimas para garantir que a câmera seja renderizada
        height: 1,
        top: -10, // Mover a câmera para fora do layout visível
        left: -10,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
      },
      image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0553',
      },
  })