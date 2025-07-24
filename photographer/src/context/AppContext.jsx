import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [photographerToken, setPhotographerToken] = useState(localStorage.getItem('photographerToken') ? localStorage.getItem('photographerToken') : (false))

    const value = {
        backendUrl,
        photographerToken, setPhotographerToken
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider