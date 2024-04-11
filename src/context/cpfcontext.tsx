import { createContext, ReactNode,  useState } from "react"


type CpfProps = {
    children: ReactNode;
}

interface ICpfProps {
    cpf: string,
    setCpf: React.Dispatch<React.SetStateAction<string>>
}

export const CpfContext = createContext<ICpfProps>({} as ICpfProps)


export const CpfProvider = ({ children }: CpfProps) => {
    const [cpf, setCpf] = useState<string>('123456')    


    return (

        <CpfContext.Provider value={{
            cpf,
            setCpf
        }}>
            {children}
        </CpfContext.Provider>
    )
}