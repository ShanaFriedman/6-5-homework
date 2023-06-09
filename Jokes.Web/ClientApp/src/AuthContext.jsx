import axios from "axios";
import { useEffect, useState, useContext, createContext } from "react";

const AuthContext = createContext()

const AuthContextComponent = ({children}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getUser = async() => {
            const {data} = await axios.get('/api/account/getcurrentuser')
            setUser(data)
            setIsLoading(false)
        }
        getUser()
    },[])

    if(isLoading){
        return(<><h1>Loading...</h1></>)
    }
    return(<AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>)
}

const useAuth = () => {
    return useContext(AuthContext)
}

export {AuthContextComponent, useAuth}