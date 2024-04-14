import { useContext, useRef, useState, Children} from 'react'
import { Text,  SafeAreaView, TouchableOpacity, View  } from 'react-native'
import { CpfContext } from '../context/cpfcontext'
import { Canvas, Path, SkPath, Skia, useCanvasRef, useTouchHandler } from '@shopify/react-native-skia'
import { styles } from '../styles'
import { Camera, CameraType } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'





export default function Assign () {

  
    const [paths, setPaths] = useState<SkPath[]>([])
    const {cpf, setCpf} = useContext(CpfContext)
    const [type, setType] = useState(CameraType.front)
    const [permission, requestPermission] = Camera.useCameraPermissions()
    const currentPath = useRef<SkPath | null>(null)
    const ref = useCanvasRef()
    const camRef = useRef<Camera>(null)
    const {photoUri, setPhotoUri, setAssing, assign} = useContext(CpfContext)
    const navigation = useNavigation<any>()
    
       
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

        onEnd: async () => {
          if(!currentPath.current) return
          currentPath.current = null 
          const image = await camRef.current?.takePictureAsync()
          setPhotoUri(image?.uri)
        }
      }
    )

    const clear = () => {
      setPaths([])
    }

    const save = () => {
      const image = ref.current?.makeImageSnapshot()
      if (image) {
        const base = image.encodeToBase64()
        setAssing(base)
        navigation.navigate('Result')
      }
    }

  
    return (
      <SafeAreaView style={styles.containerAssign}>
        <View style={[styles.item, { flex: 5 }]}>
          <Canvas style={styles.container} onTouch={onTouch} ref={ref}>
            {
              Children.toArray(paths.map((path, index) => (
                <Path path={path} style={"stroke"} strokeWidth={3} color={'blue'}></Path>
              )))
            }
          </Canvas>
        </View>
        <View style={[styles.item, { flex: 1 }]}>
          <TouchableOpacity  
          style={[styles.button]}
          onPress={() => {
              clear()
          }}
          ><Text style={styles.buttonText}>apagar</Text></TouchableOpacity>

          <TouchableOpacity  
          style={[styles.button]}
          onPress={() => {
              save()
          }}
          ><Text style={styles.buttonText}>salvar</Text></TouchableOpacity>
        </View>

        <Camera style={styles.camera} type={type} ref={camRef}></Camera>
        
      </SafeAreaView>
    )
}

