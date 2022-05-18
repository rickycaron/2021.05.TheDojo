import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            // signup, create the new user with email and password
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Network connection failed. Could not complete signup')
            }

            // upload user thumbnail
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}` // define a path for the img
            const img = await projectStorage.ref(uploadPath).put(thumbnail) // upload the image file
            const imgUrl = await img.ref.getDownloadURL() //get the url for the uploaded img

            // add display name AND PHOTO_URL name to user
            await res.user.updateProfile({ displayName, photoURL: imgUrl })

            // create a user document
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online: true,
                displayName,
                photoURL: imgUrl,
            })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { signup, error, isPending }
}