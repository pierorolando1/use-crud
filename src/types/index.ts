import { FirebaseOptions } from "firebase/app"

export type InputType = "text" | "video" | "image"

export type FormField<T> = { type: InputType, field: keyof T, label: string }

export type useCrudProps<U> = {
    firebaseConfig: FirebaseOptions,

    /// Collection in FIRESTORE that you want to interact
    collection: string,
    onCreate?: (arg0: U) => void,
    onUpdate?: (arg0: U) => void,
    onDelete?: () => void,
    formFields: FormField<U>[],
    label: string
}
