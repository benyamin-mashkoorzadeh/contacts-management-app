import {CURRENTLINE, CYAN, ORANGE, PINK, PURPLE, RED} from "../../helpers/colors";
import Spinner from "../Spinner";
import Contact from "./Contact";
import {Link} from "react-router-dom";
import {useContext} from 'react';
import {ContactContext} from "../../context/contactContext";

const Contacts = () => {
    const { filteredContacts, loading, deleteContact } = useContext(ContactContext);
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 float-end">
                                <Link to={"/contacts/add"} className="btn m-2" style={{backgroundColor: PINK}}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"></i>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {

                loading ? <Spinner/> : (
                    <section className="container">
                        <div className="row">
                            {
                                filteredContacts.length > 0 ? filteredContacts.map((contact) => (

                                        <Contact key={contact.id} contact={contact}
                                                 deleteContact={() => deleteContact(contact.id, contact.fullname)}/>
                                    )) :
                                    (
                                        <div className="text-center py-5" style={{backgroundColor: CURRENTLINE}}>
                                            <p className="h3" style={{color: ORANGE}}>
                                                مخاطب یافت نشد
                                            </p>
                                            <img src={require('../../assets/no-found.gif')} alt="پیدا نشد"
                                                 className="w-25"/>
                                        </div>
                                    )
                            }

                        </div>
                    </section>
                )
            }

        </>
    )
}

export default Contacts