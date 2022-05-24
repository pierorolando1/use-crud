import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import React, { FC } from "react"
import { Context } from "./context"

type ProviderProps = {
    children: React.ReactNode,
}

export const Provider: FC<ProviderProps> = ({
    children,
}) => {
    return (
        <Context.Provider value={null}>
            <MantineProvider>
                <ModalsProvider>
                    {children}
                </ModalsProvider>
            </MantineProvider>
        </Context.Provider>
    )
}
