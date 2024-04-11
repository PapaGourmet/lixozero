import { StatusBar } from 'expo-status-bar'
import { useContext, useRef, useState, Children} from 'react'
import { StyleSheet, Text,  TextInput, SafeAreaView, TouchableOpacity, useWindowDimensions  } from 'react-native'
import { CpfContext } from '../context/cpfcontext'
import { Canvas, Path, SkPath, Skia, useTouchHandler } from '@shopify/react-native-skia'


export default function Assign () {

    const [paths, setPaths] = useState<SkPath[]>([])
    const {cpf, setCpf} = useContext(CpfContext)
    const {height, width} = useWindowDimensions()
    const currentPath = useRef<SkPath | null>(null)
    const onTouch = useTouchHandler(
      {
        onStart: ({x, y}) => {
          currentPath.current = Skia.Path.Make()
          currentPath.current.moveTo(x,y)
        },

        onActive: ({x, y}) => {
          setPaths(values => values.concat(currentPath.current!))
          currentPath.current?.lineTo(x,y)
        },

        onEnd: () => {
          if(!currentPath.current) return;
          setPaths(values => values.concat(currentPath.current!))
          console.log(paths)
          currentPath.current = null
        }
      }
    )

    return (
  
        <Canvas style={styles.container} onTouch={onTouch} >
          {
            Children.toArray(paths.map((path, index) => (
              <Path path={path} style={"stroke"} strokeWidth={2}></Path>
            )))
          }
        </Canvas>
 
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
})