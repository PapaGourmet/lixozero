import { createContext, ReactNode,  useState } from "react"


type CpfProps = {
    children: ReactNode;
}

interface ICpfProps {
    cpf: string,
    setCpf: React.Dispatch<React.SetStateAction<string>>
    photoUri: string | null | undefined
    setPhotoUri: React.Dispatch<React.SetStateAction<string | null | undefined>>
    assign: string
    setAssing: React.Dispatch<React.SetStateAction<string>>
}

export const CpfContext = createContext<ICpfProps>({} as ICpfProps)


export const CpfProvider = ({ children }: CpfProps) => {
    const [cpf, setCpf] = useState<string>('123456') 
    const [photoUri, setPhotoUri] = useState<string | null | undefined>(null)  
    const [assign, setAssing] = useState('base64AssinaturaPNG') 


    return (

        <CpfContext.Provider value={{
            cpf,
            setCpf,
            photoUri,
            setPhotoUri,
            assign,
            setAssing
        }}>
            {children}
        </CpfContext.Provider>
    )
}