import React from "react"
import { useModals } from "@mantine/modals"
import { useFirebase } from "../firebase/config"
import { toCapitalize } from "../helpers"
import { FormField, useCreateOrUpdateProps } from "../types"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { showNotification } from "@mantine/notifications"
import CheckIcon from "../components/icons/CheckIcon"
import { Space, TextInput } from "@mantine/core"

type Action = "create" | "update"

function useCreateOrUpdate<T>({
    collection: c,
    formFields
}: useCreateOrUpdateProps<T>) {
    const { db } = useFirebase()
    const modals = useModals()

    let state = {} as T

    const actions = {
        "create": async () => {
            try {
                await addDoc(collection(db, c), state)
                showNotification({
                    color: "teal",
                    icon: <CheckIcon />,
                    title: " created",
                    message: " was created successfully"
                })
            } catch (error) {
                showNotification({
                    color: "red",
                    title: "Something goes wrong!",
                    message: JSON.stringify(error)
                })
            }
        },
        "update": async (idToUpdate: string) => {
            try {
                await updateDoc(doc(db, c, idToUpdate), state)

                showNotification({
                    color: "teal",
                    icon: <CheckIcon />,
                    title: " updated",
                    message: " was updated successfully"
                })
            } catch (error) {
                showNotification({
                    color: "red",
                    title: "Something goes wrong!",
                    message: JSON.stringify(error)
                })
            }
        }
    }

    const renderField = (field: FormField<T>) => {
        switch (field.type) {
            case "text":
                return (
                    <React.Fragment key="">
                        <TextInput
                            placeholder={field.label}
                            onChange={(e) => state = { ...state, [field.field]: e.target.value }}
                        />
                        <Space h="md" />
                    </React.Fragment>
                )
            case "video":
                return
            case "image":
                return
            default:
                break;
        }
    }

    const renderModal = ({ action, idToUpdate }: { action: Action, idToUpdate?: string }) => {
        if (!idToUpdate && action == "update") throw "You need to provide an id to update it"

        modals.openConfirmModal({
            title: `${toCapitalize(action)}`,
            children: (
                <>{formFields.map(renderField)}</>
            ),
            labels: { confirm: `${toCapitalize(action)}`, cancel: "Cancel" },
            onConfirm: action == "update" ? () => actions.update(idToUpdate!) : actions.create,
        })
    }

    return {
        create: () => {
            renderModal({ action: "create" })
        },
        update: (idToUpdate: string) => {
            renderModal({ action: "update", idToUpdate })
        }
    }
}

export default useCreateOrUpdate
