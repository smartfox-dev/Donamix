import React from 'react'
import { useState, useEffect } from 'react';
// import { SelectedButtonProvider } from './SelectedButtonContext';
// import { useSelectedButtonState } from './SelectedButtonContext';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[];
    }
}

export default function Donation() {

    const navigate = useNavigate();
    const selectButton = () => {
        navigate("/donation/payment");
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
                <div className="w-full justify-center flex bg-white rounded-t-2xl p-3">
                    <div className='flex w-full'>
                        <img className='w-full h-auto' src="images/donation/back.png" />
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <span className="text-[25px] font-bold">Support Donamix and Help Us Create a Thriving Community</span>
                        <span>Do you want to support Donamix by making a donation? This is possible. Donamix is working hard to give the services to its members that costs both time and money. If you think that Donamix needs to grow and if you would like to see more features here, then show us your support.</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">Our Need, Your Want – An Amazing Offer!</span>
                        <span>At Donamix, we believe in the power of connection and the importance of fostering a vibrant online community. As a free social network that aims to bring people together, we rely on the support of generous individuals like you to help us continue providing a platform for meaningful interactions. Your contribution will go a long way in enabling us to enhance our features, improve user experience, and expand our reach to connect even more individuals worldwide.</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">Why Donate?</span>
                        <div className="flex flex-col gap-4">
                            <span>By making a donation to Donamix, you actively contribute to the growth and sustainability of our platform. Your support enables us to:</span>
                            <span><span className="font-bold">1</span>  Enhance User Experience: With your donations, we can invest in technology upgrades, server maintenance, and security measures to ensure a seamless and safe user experience for all our members.</span>
                            <span><span className="font-bold">2</span>  Develop New Features: Your contributions allow us to innovate and introduce new features that enrich the Donamix experience. From advanced search options to personalized recommendations, your donation helps us continually evolve and meet the needs of our users.</span>
                            <span><span className="font-bold">3</span>  Expand Outreach: Donamix is committed to connecting individuals from all walks of life. With your support, we can invest in marketing campaigns and outreach initiatives to reach more people, fostering a diverse and inclusive community.</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">How to Donate:</span>
                        <div className="flex flex-col gap-8">
                            <span>We appreciate any amount you can contribute towards our mission of creating a thriving social network community. To make a donation, simply enter the desired amount then click on the "Donate" button below. You will be directed to a secure payment gateway where you can choose your preferred payment method.</span>
                            <span>We also offer the option to set up recurring donations, allowing you to support Donamix on an monthly basis. Every donation, big or small, makes a difference in helping us build a stronger and more connected community.</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">Thank You:</span>
                        <span>We would like to express our heartfelt gratitude for considering a donation to Donamix. Your support not only helps us sustain our platform but also contributes to the positive impact we strive to make in the lives of our users. Together, let's continue to connect, share, discover, and explore boundless possibilities on Donamix.</span>
                    </div>
                    <Button onClick={() => selectButton()}>Donate</Button>
                </div>
            </div>
        </div >
    )
}