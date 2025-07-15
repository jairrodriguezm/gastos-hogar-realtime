import { useState, type ReactNode } from "react";
import { CreateFormContext } from "./CreateFormContext";

type UiProviderProps = { children: ReactNode};

export function UiProvider({ children }: UiProviderProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [lastSelectedUser, setLastSelectedUser] = useState<string | null>(null);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    return (
    <CreateFormContext.Provider
      value={{
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        lastSelectedUser,
        setLastSelectedUser,
      }}
    >
      {children}
    </CreateFormContext.Provider>
  );
}