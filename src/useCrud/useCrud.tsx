import React from "react"
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { Text } from "@mantine/core"
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import CheckIcon from "../components/icons/CheckIcon";
import { useFirebase } from "../firebase/config";
import { useCrudProps } from "../types";
import useCreateOrUpdate from "../useCreateOrUpdate";

function useCrud<T>({
    /// Collection
    c,
    label,
    formFields
}: useCrudProps<T>) {

    const modals = useModals()
    const { db } = useFirebase()
    const { create, update } = useCreateOrUpdate({ collection: c, formFields })

    return {
        create: () => {
            create()
        },
        getAll: async () => {
            const docs = await getDocs(collection(db, c))
            const final: any[] = []
            docs.forEach((d) => {
                final.push(d)
            })
            return final as Partial<T>[]
        },
        getById: async (id: string) => {
            return (await getDoc(doc(db, c, id))).data() as Partial<T>
        },
        update: (idToUpdate: string) => update(idToUpdate),
        delete: (idToDelete: string) => {
            modals.openConfirmModal({
                title: `Delete ${label}`,
                children: (
                    <Text size="sm">Are you sure you want to delete this {label.toLowerCase()}</Text>
                ),
                confirmProps: { color: 'red' },
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onConfirm: async () => {
                    showNotification({
                        id: 'delete-data',
                        loading: true,
                        title: 'Deleting',
                        message: 'Deleting your data, you cannot close this yet',
                        autoClose: false,
                        disallowClose: true,
                    });
                    await deleteDoc(doc(db, c, idToDelete))
                    showNotification({
                        id: "delete-data",
                        color: 'teal',
                        title: `${label} was deleted`,
                        message: `${label} was deleted succesfully`,
                        icon: <CheckIcon />,
                        autoClose: 2000,
                    })
                }
            })
        },
    }
}

export default useCrud
