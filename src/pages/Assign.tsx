import { useContext, useRef, useState, Children, useEffect, LegacyRef} from 'react'
import { Text,  SafeAreaView, TouchableOpacity, useWindowDimensions, View  } from 'react-native'
import { CpfContext } from '../context/cpfcontext'
import { Canvas, Path, SkPath, Skia, useCanvasRef, useTouchHandler } from '@shopify/react-native-skia'
import { styles } from '../styles'
import { Camera, CameraType } from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'




export default function Assign () {

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
    const [paths, setPaths] = useState<SkPath[]>([])
    const {cpf, setCpf} = useContext(CpfContext)
    const [type, setType] = useState(CameraType.front)
    const [permission, requestPermission] = Camera.useCameraPermissions()
    const [photoUri, setPhotoUri] = useState<string | null | undefined>(null)
    const currentPath = useRef<SkPath | null>(null)
    const ref = useCanvasRef()
    const camRef = useRef<Camera>(null)

    const imageToBase64 = async (imageUri: string) => {
      try {
        // Ler o arquivo de imagem do sistema de arquivos local
        const fileInfo = await FileSystem.getInfoAsync(imageUri)
        
        // Verificar se o arquivo existe
        if (!fileInfo.exists) {
          throw new Error('Arquivo não encontrado')
        }
    
        // Ler o conteúdo do arquivo como base64
        const base64Data = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        })
    
        return base64Data
      } catch (error) {
        console.error('Erro ao converter imagem para base64:', error)
        return null
      }
    }

    
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
        console.log(base)
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
        <Image
        style={styles.image}
        source={photoUri}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      </SafeAreaView>
    )
}

