import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Router from '@/Router';
import { ThemeProvider } from '@material-tailwind/react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;
const clientID = import.meta.env.VITE_PAYPAL_CLIENT_ID as string;
const initialOptions = {
    clientID: clientID,
    currency: "USD",
    intent: "capture",
};


function App() {
    const token = localStorage.getItem('auth_token');
    axios.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : undefined;
    // setInterval(() => {
    //     const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    //     axios.post(`${apiUrl}/chat/random`, { 'num': randomNumber })
    //         .then((res) => {
    //             console.log('successs')
    //         })
    //         .catch((err) => console.log('Failed'))
    // }, 10000)
    return (
        <BrowserRouter>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
            >
                <AuthProvider>
                    <ThemeProvider>
                        <PayPalScriptProvider options={initialOptions}>
                            <Toaster />
                            <Router />
                        </PayPalScriptProvider>
                    </ThemeProvider>
                </AuthProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App;
