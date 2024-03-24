import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

export function FormProvider({children}) {
    const [showForm, setShowForm] = useState(false);
    const [showNewsForm, setShowNewsForm] = useState(false);
    const [isUpdateForm, setIsUpdateForm] = useState(false)
    const [showRemove, setShowRemove] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')
    const [removeItemId, setRemoveItemId] = useState('')

    const contextProps = {
        showForm,
        setShowForm,
        showNewsForm,
        setShowNewsForm,
        isUpdateForm,
        setIsUpdateForm,
        showRemove,
        setShowRemove,
        removeItemId,
        setRemoveItemId,
        itemToUpdate,
        setItemToUpdate,
    }

    return (
        <FormContext.Provider value={contextProps}>
            {children}
        </FormContext.Provider>
    );
}

export function useForm() {
    return useContext(FormContext);
}
