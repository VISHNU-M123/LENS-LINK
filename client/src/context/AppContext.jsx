import axios from 'axios'
import { useEffect, useState } from 'react'
import { createContext } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : (false))
    const [userData, setUserData] = useState(false)

    const loadUserProfileData = async () => {
      try {
        const {data} = await axios.get(`${backendUrl}/api/user/getUserProfile`, {headers:{token}})

        if(data.success){
          setUserData(data.userData)
        }else{
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const value = {
        backendUrl,
        token, setToken,
        userData, setUserData,
        loadUserProfileData
    }

    useEffect(() => {
      if(token){
        loadUserProfileData()
      }else{
        setUserData(false)
      }
    },[token])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
