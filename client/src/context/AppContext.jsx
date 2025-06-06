import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [ user, setUser ] = useState(null)
    const [ showLogin, setShowLogin ] = useState(false)
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'))
    const [ refreshToken, setRefreshToken ] = useState(localStorage.getItem('refreshToken'))
    const [ credit, setCredit ] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get(`${backendUrl}/api/v1/users/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.data.success) {
                        setUser(response.data.data); 
                        setAccessToken(token);       
                        setRefreshToken(localStorage.getItem('refreshToken'));
                    } else {
                        // Clear tokens if the response indicates failure
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        setAccessToken(null);
                        setRefreshToken(null);
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    // Clear tokens on error (e.g., invalid/expired token)
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setAccessToken(null);
                    setRefreshToken(null);
                    setUser(null);
                }
            }
        };
        fetchUser();
    }, []);

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, accessToken, setAccessToken, refreshToken, setRefreshToken, credit, setCredit,
    }

    return (
        <AppContext.Provider value={value}>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;