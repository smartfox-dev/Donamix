import React from 'react'
import { useState, useEffect } from 'react';
// import { SelectedButtonProvider } from './SelectedButtonContext';
// import { useSelectedButtonState } from './SelectedButtonContext';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import MuiButton from '@/components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[];
    }
}

export default function UpgradePayment() {
    const navigate = useNavigate();
    const { id: money } = useParams();
    const [payment, setPayment] = useState(100);
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    const [checked, setChecked] = useState(false);

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

    useEffect(() => {
        setPayment(Number(money));
    }, [money])
    return (
        <div className="sm:flex-1 flex-col bg-dashboard-background w-full">
            <div className="sm:px-5 px-2 w-full h-full flex flex-col gap-6">
                <div className="rounded-t-full">
                    <ins className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-5794587985510139"
                        data-ad-slot="3734166205"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
                <div className="flex flex-col gap-12 bg-white rounded-md justify-center p-8">
                    <ArrowBackIcon className="cursor-pointer" onClick={() => navigate('/upgrade')} />
                    <div className="flex flex-col items-center">
                        <span className="text-[25px] font-bold">Upgrade Now to</span>
                        <span className="text-[25px] font-bold">Unlock Premium Donamix Features</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="flex flex-row gap-2 items-end">
                            <span className="text-[35px] font-bold">$</span>
                            <input
                                type='text'
                                className="text-[35px] font-bold"
                                style={{ width: `${String(payment).length}ch`, minWidth: '30px' }}
                                value={payment}
                            // onChange={(e) => setPayment(e.target.value)}
                            />
                            <span className="text-[25px] font-bold">USD</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PayPalButtons
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