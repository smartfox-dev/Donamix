import React from 'react'
import { useState, useEffect } from 'react';
// import { SelectedButtonProvider } from './SelectedButtonContext';
// import { useSelectedButtonState } from './SelectedButtonContext';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import MuiButton from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[];
    }
}

export default function DonationPayment() {
    const navigate = useNavigate();
    const [payment, setPayment] = useState(100);
    const [checked, setChecked] = useState(false);
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: payment,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().
            then((details) => {
                const name = details.payer.name.given_name;
                toast.success(`Transaction completed by ${name}`);
            })
            .catch(err => {
                toast.error(`Transaction error`);
            });
    }
    
    return (
        <div className="sm:flex-1 flex-col bg-dashboard-background w-full mainBody">
            <div className="sm:px-5 px-2 w-full h-full flex flex-col gap-6">
                <div className="rounded-t-full">
                    <ins className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-5794587985510139"
                        data-ad-slot="3734166205"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
                {/* <div className="w-full justify-center flex bg-white rounded-t-2xl p-3">
                    <div className='flex w-full'>
                        <img className="w-full h-auto" src="/images/donation/back.png" />
                    </div>
                </div> */}
                <div className="flex flex-col gap-6">
                    <span className="text-[25px] font-bold">Support Donamix and Help Us Create a Thriving Community</span>
                </div>
                <div className="flex flex-col gap-12 bg-white rounded-md justify-center p-8">
                    <ArrowBackIcon className="cursor-pointer" onClick={() => navigate('/donation')} />
                    <div className="flex flex-col items-center">
                        <span className="text-[25px] font-bold">Donate to</span>
                        <span className="text-[25px] font-bold">Donamix Social Network</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="flex flex-row gap-2 items-end">
                            <span className="text-[35px] font-bold">$</span>
                            <input
                                type='text'
                                className="text-[35px] font-bold"
                                style={{ width: `${String(payment).length}ch`, minWidth: '30px' }}
                                value={payment}
                                onChange={(e) => setPayment(Number(e.target.value))}
                            />
                            <span className="text-[25px] font-bold">USD</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <div className="flex flex-row">
                            <input
                                id="monthly-donation"
                                type="checkbox"
                                checked={checked}
                                onChange={handleCheckboxChange}
                                className="w-9 h-9 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col justify-between">
                            <span className="font-bold">Make this a monthly donation.</span>
                            <span>Automate your generosity.</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PayPalButtons
                            // disabled={!checked}
                            className='flex flex-col w-auto'
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}