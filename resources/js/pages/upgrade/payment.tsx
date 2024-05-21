import React, { Fragment } from 'react';
import LeftSidebar from '@/pages/dashboard/layout/LeftSidebar';
import { useEffect, useState } from 'react';
import { getTitle } from '@/api/upgrade';
import { useAppContext } from '@/context/AppContext';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { Spinner } from '@material-tailwind/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import UpgradePayment from '@/components/widgets/upgrade/Payment';

import { useParams } from 'react-router-dom';

const Payment = () => {
    const { id: money } = useParams();
    const { setIsLeftSidebarOpen } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [payMethod, setMethod] = useState('paypal');
    const [title, setTitle] = useState(`Creator's Club`);
    if (isLoading)
        return (
            <div className="items-center justify-center flex w-full h-[300px]">
                <Spinner />
            </div>
        );

    const onRadioSelect = (value: string) => {
        setMethod(value);
    }

    useState(() => {
        switch (money) {
            case "36":
                setTitle(`Creator's Club`);
                break;
            case "66":
                setTitle(`Moderator Membership`);
                break;
            case "111":
                setTitle(`Admin Access Pass`);
                break;
            case "488":
                setTitle(`VIP Subscription`);
                break;
            default:
                setTitle(`Creator's Club`);
                break;
        }
    }, [money]);
    
    return (
        <div className="w-full h-full relative flex flex-col gap-5 mb-20 lg:flex-row lg:gap-0">
            <LeftSidebar onStateChange={true} />
            <div className="min-h-[700px] flex flex-col justify-start p-10 flex-1">
                <div>
                    <h3 className="text-2xl font-semibold text-black font-poppins">
                        Payment
                    </h3>
                    <p className="text-[#7D7D7D] font-medium font-poppins text-xl mt-[10px]">
                        {title}
                    </p>
                </div>
                <UpgradePayment />
            </div>
        </div>
    );
};

export default Payment;
