import { createContext, useContext, useState } from "react"

// Ciração do Contexto
const TokenContext = createContext()

// Criação do Provedor para o Contexto
export function TokenProvider(props) {


    const [token, setToken] = useState("")

    function changeToken(themeRecieved) {

        setToken(themeRecieved)
        localStorage.setItem('token', themeRecieved)
    }

    function removeToken() {
        setToken("")
        localStorage.removeItem('token')
        
    }

    return (

       
        <TokenContext.Provider value={{ token, changeToken, removeToken }}>
            {props.children}
        </TokenContext.Provider>

    )

}

// Hook Personalizado que irá ser utilizado quando quisermos utilizar alguma das Funcionalidades contidas em nosso Contexto
export function useToken() {

    const context = useContext(TokenContext)

    return context

}