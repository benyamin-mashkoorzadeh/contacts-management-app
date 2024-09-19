import {PURPLE} from '../../helpers/colors'
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";

const SearchContact = () => {
    const {contactSearch} = useContext(ContactContext)


    return (
        <div className="input-group mx-2 w-75" dir="ltr">
                            <span className="input-group-text" id="basic-addon1"
                                  style={{backgroundColor: PURPLE}}>
                                <i className="fas fa-search"></i>
                            </span>
            <input dir="rtl" type="text"
                   className="form-control" placeholder="جستجوی مخاطب" aria-label="search"
                   aria-describedby="basic-addon1"
                   onChange={event => contactSearch(event.target.value)}/>
        </div>
    )
}

export default SearchContact