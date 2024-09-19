import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => {},
    setFilteredContacts: () => {},
    filteredContacts: [],
    setContacts: () => {},
    contacts: [],
    contactQuery: {},
    groups: [],
    // errors: [],
    deleteContact: () => {},
    createContact: () => {},
    contactSearch: () => {}
})