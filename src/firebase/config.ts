import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { useContext } from 'react'
import { Context } from '../context'

export const useFirebase = () => {
    const { firebaseConfig } = useContext(Context)
    const app = initializeApp(firebaseConfig)

    return {
        db: getFirestore(app),
        storage: getStorage(app)
    }
}
