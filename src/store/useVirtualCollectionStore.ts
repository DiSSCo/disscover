import { create } from 'zustand';

interface CreateVirtualCollectionData {
    title: string,
    description: string,
    type: string,
    specimen: string
}

interface VirtualCollectionState {
    formData: CreateVirtualCollectionData,
    updateField: (field: any, value: any) => void;
    resetFormData: () => void
}

export const useVirtualCollectionStore = create<VirtualCollectionState>((set) => ({
    formData: {
        title: '',
        description: '',
        type: 'Reference Collection',
        specimen: ''
    },
    updateField: (field, value) => 
        set((state) => ({
            formData: { ...state.formData, [field]: value }
        })),
    resetFormData: () => set({ formData: {
        title: '',
        description: '',
        type: 'Reference Collection',
        specimen: ''
    }})
}));
