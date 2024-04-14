import { Text,  SafeAreaView, TouchableOpacity, useWindowDimensions, View  } from 'react-native'
import { styles } from '../styles'
import { useContext } from 'react'
import { CpfContext } from '../context/cpfcontext'
import { Image } from 'expo-image'
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export default function Result () {

    const {cpf, photoUri, assign} = useContext(CpfContext)

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{`CPF: ${cpf}`}</Text>
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