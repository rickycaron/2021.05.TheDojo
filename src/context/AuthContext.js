import { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { user: action.payload, authIsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
        //everytime the page is refreshed, the logged in user will be lost, here authIsReady is to get the user from the begining
    })

    useEffect(() => {
        // onAuthStateChanged() is to get the current loggedin user initially and every time there is a change of auth, 
        // here it first get the current logged in user or null, then we have got the status of the logged in user, 
        // so we set authIsReady and begin to evaluate all the components
        //it also returns an unsubscribe method to stop the listener for further action
        const unsub = projectAuth.onAuthStateChanged(user => {
            dispatch({ type: 'AUTH_IS_READY', payload: user });
            //we only need to run it for once, to get the initial status of the user in the beginning, 
            //so we unsubscribe the listener for it here to stop it
            unsub();
        })
    }, [])

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}