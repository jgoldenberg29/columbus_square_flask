import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

export function FormProvider({children}) {
    const [showForm, setShowForm] = useState(false);
    const [showNewsForm, setShowNewsForm] = useState(false);
    const [isUpdateForm, setIsUpdateForm] = useState(false);
    const [newsUpdate, setNewsUpdate] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [showNewsRemove, setShowNewsRemove] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState('');
    const [removeItemId, setRemoveItemId] = useState('')
    const [newsToUpdate, setNewsToUpdate] = useState('');
    const [newsToDelete, setNewsToDelete] = useState('');

    const contextProps = {
        showForm,
        setShowForm,
        showNewsForm,
        setShowNewsForm,
        isUpdateForm,
        setIsUpdateForm,
        newsUpdate,
        setNewsUpdate,
        showRemove,
        setShowRemove,
        showNewsRemove,
        setShowNewsRemove,
        removeItemId,
        setRemoveItemId,
        itemToUpdate,
        setItemToUpdate,
        newsToUpdate,
        setNewsToUpdate,
        newsToDelete,
        setNewsToDelete,
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
