import React, { useState, useEffect } from 'react'
import ReactCountryFlag from "react-country-flag"
import { useAuthContext } from '@/context/AuthContext';
import { FiPlusCircle } from "react-icons/fi";
import axios from 'axios';
import {
    PhoneInput,
    defaultCountries,
    parseCountry,
} from 'react-international-phone';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BACKEND_API as string;

const pages = [
    {
        value: 'general',
        title: 'General Questions',
    },
    {
        value: 'account',
        title: 'Account Settings',
    },
    {
        value: 'privacy',
        title: 'Privacy FAQ',
    },
    {
        value: 'conversations',
        title: 'Conversations FAQ',
    },
    {
        value: 'blog',
        title: 'BLOG FAQ',
    },
];



export default function Admin() {
    const { user } = useAuthContext();
    const [tab, setTab] = useState('general')
    const [users, setUsers] = useState(null)
    const [isLoad, setLoad] = useState(false)
    const navigate = useNavigate()

    const [countryData, setCountryData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = (countryName) => {
        if (!countryName) {
            setError('The input field cannot be empty');
            setCountryData(null);
            return;
        }

        const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`;
        fetch(finalURL)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Not Found") {
                    setError("Country Information is not Found");
                    setCountryData(null);
                    return;
                } else if (data.length === 0) {
                    setError('Please enter a valid country name.');
                    setCountryData(null);
                    return
                } else {
                    setError('');
                    setCountryData(data[0]);
                    console.log(handleSearch(data[0].flags.svg))
                    return data[0].flags.svg
                }
            })
            .catch(() => {
                setError('An error occurred while fetching data.');
                setCountryData(null);
                return
            });
    };

    useEffect(() => {
        axios.get(`${apiUrl}/users/upgraded`)
            .then((res) => {
                if (res.data.message == 'success') {
                    let temp = []
                    res.data.data.map((item, i) => {
                        temp.push({
                            'id': item.id,
                            'name': item.id,
                            'birthday': item.birthday,
                            'avatar': item.avatar,
                            'country': item.country,
                            'description': item.description,
                            'role': item.role,
                            'age': item.age,
                            'credit': item.credit
                        })
                    })
                    setUsers(res.data.data)

                }
                else {
                    console.log(res)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className='flex flex-col justify-center items-center lg:p-12 md:p-8 sm:p-5 p-3 w-full'>
                <div className='flex flex-col rounded-2xl bg-white justify-center gap-10 w-full'>
                    <div className='flex flex-col gap-3'>
                        <span className='font-inter font-normal text-md text-center mt-14'>MEET OUR ADMINS, MODERATORS AND VIP MEMBERS!!</span>
                        <span className='font-inter font-semibold text-xl text-center'>FEEL FREE TO THANK THEM ON OCCASION!</span>
                    </div>
                    <div className='flex lg:flex-row md:flex-row flex-col gap-3 p-8 flex-wrap justify-center'>
                        {isLoad ? users && users.map((item, i) => (
                            <div className='bg-[#F1F1F1] rounded-2xl h-auto lg:w-[30%] md:w-1/2 w-full p-5 flex flex-col gap-4 justify-between items-center' key={i}>
                                <img src={item.avatar} alt="" className='w-[80px] h-[80px] rounded-full cursor-pointer' onClick={() => {
                                    navigate('/profile/' + item.name)
                                }} />
                                <span className='font-inter font-semibold text-[black] text-xl'>{item.name}</span>
                                {item.role === 'VIP' && <span className='font-inter font-bold text-[#8874DC] text-md'>{item.role}</span>}
                                {item.role === 'Moderator' && <span className='font-inter font-bold text-[#4C7737] text-md'>{item.role}</span>}
                                {item.role === 'Admin' && <span className='font-inter font-bold text-[red] text-md'>{item.role}</span>}
                                <span className='font-inter font-normal text-center text-[#A1A1A1] text-md'>{item.description}</span>
                                <div className='flex flex-row justify-between w-full'>
                                    <span className='font-inter font-bold text-[black] text-md'><ReactCountryFlag
                                        countryCode={item.country}
                                        svg
                                        style={{
                                            width: '2em',
                                            height: '2em',
                                        }}
                                        title={item.flag}
                                    /></span>
                                    <span className='font-inter font-bold text-[black] text-md'>{item.age} years old</span>
                                </div>
                                <button className='w-full h-[50px] rounded-xl text-[white] bg-black' onClick={() => {
                                    navigate('/profile/' + item.name)
                                }}>Contact</button>
                            </div>
                        )) : users && users.slice(0, 5).map((item, i) => (
                            <div className='bg-[#F1F1F1] rounded-2xl h-auto lg:w-[30%] md:w-1/2 w-full p-5 flex flex-col gap-4 justify-between items-center' key={i}>
                                <img src={item.avatar} alt="" className='w-[80px] h-[80px] rounded-full cursor-pointer' onClick={() => {
                                    navigate('/profile/' + item.name)
                                }} />
                                <span className='font-inter font-semibold text-[black] text-xl'>{item.name}</span>
                                {item.role === 'VIP' && <span className='font-inter font-bold text-[#8874DC] text-md'>{item.role}</span>}
                                {item.role === 'Moderator' && <span className='font-inter font-bold text-[#4C7737] text-md'>{item.role}</span>}
                                {item.role === 'Admin' && <span className='font-inter font-bold text-[red] text-md'>{item.role}</span>}
                                <span className='font-inter font-normal text-center text-[#A1A1A1] text-md'>{item.description}</span>
                                <div className='flex flex-row justify-between w-full'>
                                    <span className='font-inter font-bold text-[black] text-md'><ReactCountryFlag
                                        countryCode={item.country}
                                        svg
                                        style={{
                                            width: '2em',
                                            height: '2em',
                                        }}
                                        title={item.flag}
                                    /></span>
                                    <span className='font-inter font-bold text-[black] text-md'>{item.age} years old</span>
                                </div>
                                <button className='w-full h-[50px] rounded-xl text-[white] bg-black' onClick={() => {
                                    navigate('/profile/' + item.name)
                                }}>Contact</button>
                            </div>
                        ))}
                    </div>
                    {users && users.length > 5 && <div className='flex flex-col w-full justify-center items-center mb-10'>
                        <button className='w-[200px] h-[50px] rounded-full text-[white] bg-black' onClick={() => setLoad(true)}>Load More</button>
                    </div>}

                </div>
            </div>
        </>
    )
}
