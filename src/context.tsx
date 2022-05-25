import { FirebaseOptions } from "firebase/app";
import { createContext } from "react";

export const Context = createContext<{ firebaseConfig: FirebaseOptions }>({
    firebaseConfig: {}
})
