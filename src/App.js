import {useEffect} from "react";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert';
import {useImmer} from "use-immer";
import {ToastContainer, toast} from 'react-toastify';

import _ from 'lodash';

import {ContactContext} from "./context/contactContext";
import './App.css';
import {AddContact, EditContact, ViewContact, Contacts, Navbar} from "./components";
import {createContact, deleteContact, getAllContacts, getAllGroups} from './services/contactService';
import {COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW} from "./helpers/colors";
import {logDOM} from "@testing-library/react";

const App = () => {

    const [loading, setLoading] = useImmer(false)
    const [contacts, setContacts] = useImmer([])
    const [groups, setGroups] = useImmer([])
    const [filteredContacts, setFilteredContacts] = useImmer([])
    // const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();

                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    const createContactForm = async (values) => {
        // event.preventDefault()
        try {
            setLoading((draft) => !draft)

            // await contactSchema.validate(contact, {abortEarly: false})

            const {status, data} = await createContact(values)

            /*
            NOTE
            1. Rerender -> forceRender, setForceRender
            2. SetContact(data)
            */


            if (status === 200) {

                toast.success('مخاطب با موفقیت ساخته شد', {icon: "🚀"})
                // const allContacts = [...contacts, JSON.parse(config.data)]
                // setContacts(allContacts)
                // setFilteredContacts(allContacts)

                setContacts(draft => {
                    draft.push(data)
                })
                setFilteredContacts(draft => {
                    draft.push(data)
                })

                // setContact({})
                // setErrors([])
                setLoading((prevLoading) => !prevLoading)
                navigate('/contacts')
            }
        } catch (err) {
            console.log(err.message)
            // setErrors(err.inner)
            setLoading((prevLoading) => !prevLoading)
        }
    }

    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div dir="rtl"
                         style={{backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: '1em'}}
                         className="p-4">
                        <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                        <p style={{color: FOREGROUND}}>مطمئن هستید که میخواهید مخاطب را پاک کنید؟</p>
                        <button onClick={() => {
                            removeContact(contactId, contactFullname)
                            onClose()
                        }} className="btn mx-2" style={{backgroundColor: PURPLE}}>مطمئن هستم
                        </button>

                        <button onClick={onClose} className="btn" style={{backgroundColor: COMMENT}}>
                            انصراف
                        </button>
                    </div>
                )
            }
        })
    }

    const removeContact = async (contactId) => {
        /*
               * 1- forceRender -> setForceRender
               * 2- Server Request
               * 3- Delete Local State
               * 4- Delete State Before Server Request
               */

        // Contacts Copy
        const contactsBackup = [...contacts]
        try {


            // const updatedContacts = contacts.filter(c => c.id !== contactId)
            // setContacts(updatedContacts)
            // setFilteredContacts(updatedContacts)

            setContacts((draft) => draft.filter((c) => c.id !== contactId))
            setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId))

            // Sending Delete Request to Server
            const {status} = await deleteContact(contactId)

            toast.error('مخاطب با موفقیت حذف شد', {icon: '💣'})

            if (status !== 200) {
                setContacts(contactsBackup)
                setFilteredContacts(contactsBackup)
            }
        } catch (err) {
            console.log(err.message)

            setContacts(contactsBackup)
            setFilteredContacts(contactsBackup)
        }
    }


    let filterTimeOut;
    const contactSearch = _.debounce(query => {
        // clearTimeout(filterTimeOut)

        if (!query) return setFilteredContacts([...contacts])


        // filterTimeOut = setTimeout(() => {
        // setFilteredContacts(contacts.filter((contact) => {
        //     return contact.fullname
        //         .toLowerCase().includes(query.toLowerCase())
        // }))

        setFilteredContacts((draft) =>
            draft.filter((c) =>
                c.fullname.toLowerCase().includes(query.toLowerCase()))
        )

        // }, 1000)
    }, 1000)


    return (
        <ContactContext.Provider value={{
            loading,
            setLoading,
            setContacts,
            setFilteredContacts,
            contacts,
            filteredContacts,
            groups,
            // errors,
            deleteContact: confirmDelete,
            createContact: createContactForm,
            contactSearch,
        }}>
            <div className="App">
                <ToastContainer rtl={true} position="top-right" theme="colored" />
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                </Routes>
            </div>
        </ContactContext.Provider>

    );
}

export default App;
