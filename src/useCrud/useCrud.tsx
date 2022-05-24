import React from "react"

import { deleteDoc, doc } from "firebase/firestore";

import useSWR from "swr"

import { Text } from "@mantine/core"
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import CheckIcon from "../components/icons/CheckIcon";
import { useFirebase } from "../firebase/config";
import { useCrudProps } from "../types";

function useCrud<T>({
    collection,
    firebaseConfig,
    label
}: useCrudProps<T>) {

    const modals = useModals()
    const { db } = useFirebase(firebaseConfig)

    return {
        //Create
        create: () => {/*TODO*/ },
        //Read
        getAll: () => {/*TODO*/ },
        getById: (_id: string) => {/*TODO*/ },
        //Update
        update: (_id: string) => {/*TODO*/ },
        //Delete
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
                    await deleteDoc(doc(db, collection, idToDelete))
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
