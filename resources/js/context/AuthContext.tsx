import React, { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User, userValidator } from '@/lib/validation/user';
import { getAuthToken, removeAuthToken } from '@/actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';

import CONSTANTS from '@/config/constants';
import axios from 'axios';
import { getCurrentUser } from '@/api/auth';

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (val: boolean) => void;
    user: User | null;
    setUser: (val: User) => void;
    reload: () => void;
    searchKey: string;
    setSearchKey: Dispatch<SetStateAction<string>>;
    performSearch: () => void;
    member: number;
    setMember: (value: number) => void;
};

const AuthContext: React.Context<AuthContextType> =
    createContext<AuthContextType>({
        isAuth: false,
        setIsAuth: () => { },
        user: null,
        setUser: () => { },
        reload: () => { },
        searchKey: '',
        setSearchKey: () => { },
        performSearch: () => { },
        member: 0,
        setMember: () => { },
    });

export const useAuthContext = () => useContext(AuthContext);

interface IAuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState('')
    const [member, setMember] = useState(0);

    const performSearch = () => {
        console.log(searchKey)
    }

    const reload = () => {
        getCurrentUser()
            .then((res) => {

                if (res.code === CONSTANTS.SUCCESS) {

                    const curUser = userValidator.parse(res.data);
                    setUser(curUser);

                } else {
                    removeAuthToken();
                    setIsAuth(false);
                    delete axios.defaults.headers.common['Authorization'];
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        const authToken = getAuthToken();
        if (authToken === null) {
            setIsAuth(false);
            setUser(null);
        }

        if (isAuth === false && authToken) {
            setIsAuth(true);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
            return;
        }

        const ignoreAuthPaths = ['/auth', '/verifyemail', '/waitlist', '/privacy-policy', '/about', '/conduct', '/faq', '/terms', '/advertise', '/feed/download', '/donation', '/chat/safety', '/press', '/promote'];
        if (
            !ignoreAuthPaths.find(
                (val) => location.pathname.slice(0, val.length) === val
            )
        ) {
            if (!authToken) navigate('/auth');
        }
    }, [isAuth, location, navigate]);

    useEffect(() => {
        if (isAuth === true && user === null) {
            reload();
        }
    }, [isAuth, user]);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, reload, searchKey, setSearchKey, performSearch, member, setMember }}>
            {children}
        </AuthContext.Provider>
    );
};
