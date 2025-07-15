import { useContext } from "react";
import { CreateFormContext } from './CreateFormContext';

export function useCreateForm() {
  const context = useContext(CreateFormContext);
  if (!context) {
    throw new Error('useCreateForm should be use within CreateFormProvider');
  }
  return context;
}