import { createContext } from "react";

export type CreateFormContextType = {
    isCreateModalOpen: boolean;
    openCreateModal: () => void;
    closeCreateModal: () => void;
    lastSelectedUser: string | null;
    setLastSelectedUser: (userId: string) => void;
}

export const CreateFormContext = createContext<CreateFormContextType |  undefined>(undefined);