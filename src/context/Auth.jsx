import { auth, firestore } from "@/config/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"

const Auth = createContext()

const initialState = {
    isAuth: false,
    user: {}
}

const AuthContext = ({ children }) => {

    const [isAppLoading, setIsAppLoading] = useState(true)
    const [state, setState] = useState(initialState)

    const readProfile = () => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(firestore, "users", user.uid));
                if (docSnap.exists()) {
                    const user = docSnap.data()
                    console.log('user', user)
                    setState({ isAuth: true, user })
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("User not Found!");
                }
                setIsAppLoading(false)                    
            } else {
                setIsAppLoading(false)
            }
        });
    }


    useEffect(() => {
        readProfile();
    }, [])

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setState(initialState)
                window.toastify("Logout Successfully", "success")
            }).catch((error) => {
                console.error(error)
                window.toastify("Please try again", "info")
            });
    }


    return (
        <Auth.Provider value={{ ...state, isAppLoading, handleLogout, dispatch: setState }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext

export const useAuth = () => useContext(Auth)