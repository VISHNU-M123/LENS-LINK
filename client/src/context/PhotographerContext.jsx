import { createContext, useState } from "react";

export const PhotographerContext = createContext()

const PhotographerContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [photographerToken, setPhotographerToken] = useState(localStorage.getItem('photographerToken') ? localStorage.getItem('photographerToken') : (false))

    const value = {
        backendUrl,
        photographerToken, setPhotographerToken
    }
    return (
        <PhotographerContext.Provider value={value}>
            {props.children}
        </PhotographerContext.Provider>
    )
}

export default PhotographerContextProvider