import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";


import './index.css';
import App from './App';
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter basename="contacts-management-app">
            <App/>
        </BrowserRouter>
    </StrictMode>
);