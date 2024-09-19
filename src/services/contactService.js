import axios from "axios";

const SERVER_URL = 'http://localhost:8000/api';


// @desc Get All Contacts
// @root Get http://localhost:8000/contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`
    return axios.get(url)
}

// @desc Get Contact with Contact ID
// @root Get http://localhost:8000/contacts/:contactId
export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url)
}

// @desc Get All Groups
// @root Get http://localhost:8000/groups
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`
    return axios.get(url)
}

// @desc Get Groups with Group ID
// @root Get http://localhost:8000/groups/:groupId
export const getGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`
    return axios.get(url)
}

// @desc Create a new Contact
// @root Post http://localhost:8000/contacts/create
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts/create`
    return axios.post(url, contact)
}

// @desc Update a Contact
// @root Put http://localhost:8000/contacts/edit/:contactId
export const updateContact = (contact, contactId) => {
    const url = `${SERVER_URL}/contacts/edit/${contactId}`
    return axios.put(url, contact)
}

// @desc Delete a Contact
// @root Delete http://localhost:8000/contacts/delete/:contactId
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/delete/${contactId}`
    return axios.delete(url)
}