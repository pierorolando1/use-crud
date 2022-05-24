import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

export const useFirebase = (config: FirebaseOptions) => {
    const app = initializeApp(config)

    return {
        db: getFirestore(app)
    }
}
