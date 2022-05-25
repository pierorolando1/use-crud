export type InputType = "text" | "video" | "image"

export type FormField<T> = { type: InputType, field: keyof T, label: string }

export type useCrudProps<U> = {
    /// Collection in FIRESTORE that you want to interact
    c: string,
    onCreate?: (arg0: U) => void,
    onUpdate?: (arg0: U) => void,
    onDelete?: () => void,
    formFields: FormField<U>[],
    label: string
}

export type useCreateOrUpdateProps<U> = {
    collection: string,
    formFields: FormField<U>[],
}
