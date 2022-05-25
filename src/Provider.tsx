import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import type { FirebaseOptions } from "firebase/app"
import React, { FC } from "react"
import { Context } from "./context"

type ProviderProps = {
    children: React.ReactNode,
    firebaseConfig: FirebaseOptions
}

export const Provider: FC<ProviderProps> = ({
    children,
    firebaseConfig
}) => {
    return (
        <Context.Provider value={{ firebaseConfig }}>
            <MantineProvider>
                <ModalsProvider>
                    {children}
                </ModalsProvider>
            </MantineProvider>
        </Context.Provider>
    )
}
