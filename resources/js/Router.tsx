import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import About from '@/components/widgets/profile/About';


import Auth from '@/pages/auth';
import AuthLayout from '@/pages/auth/layout';
import BlogCreate from '@/pages/blog/create';
import BlogDetail from '@/pages/blog/[id]';
import BlogEdit from '@/pages/blog/[id]/edit';
import BlogHome from '@/pages/blog';


import MyBlogCreate from '@/pages/myblog/create';
import MyBlogDetail from '@/pages/myblog/[id]';
import MyBlogEdit from '@/pages/myblog/[id]/edit';
import MyBlogHome from '@/pages/myblog';

import DashboardLayout from '@/pages/dashboard/layout';
import Layout from '@/pages/layout';
import Logout from '@/components/widgets/auth/Logout';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/profile';
import ProfileLayout from './pages/profile/layout';
import ProfileEdit from '@/pages/profile/edit';
import ProfileBlock from '@/pages/profile/block';
import ProfileSetting from '@/pages/profile/setting';
import VerifyEmail from './components/widgets/profile/VerifyEmail';
import VerifyEmailAddress from './components/widgets/profile/VerifyEmailAddress';
import { useAuthContext } from '@/context/AuthContext';
import { LinkedInCallback } from "react-linkedin-login-oauth2";

import Search from './pages/search/index';
import Nearby from './pages/nearby/index';
import Forum from './pages/forum/index';
import ForumDetail from './pages/forum/ForumDetail';
import Marketplace from './pages/marketplace/index';
import MyMarket from './pages/marketplace/MyMarket';
import MarketDetail from './pages/marketplace/MarketDetail';
import MyMarketDetail from './pages/marketplace/MyMarketDetail';
import Video from './pages/video'

import Download from './pages/download';
import Aboutus from './pages/aboutus';
import UserProfile from './pages/userpage/UserProfile';
import Report from './pages/userpage/Report'
import Block from './pages/userpage/Block'

import HomeLayout from './pages/homelayout';
import DetailPost from './pages/posts/[id]';
import Home from '@/pages/home';
import PrivacyPolicy from './pages/privacypolicy';
import WaitList from './pages/waitlist';
import UnAuthLayout from './pages/unauthlayout';

import ChatroomList from './pages/chatroom/ChatroomList';
import Login from './pages/chatroom/login';
import Index from './pages/chatroom';
import Inbox from './pages/inbox/Inbox';
import InboxLayout from './pages/inbox/InboxLayout';

import Upgrade from './pages/upgrade';
import Payment from './pages/upgrade/payment';
import { useLocation } from 'react-router-dom';
import { roomOut } from './api/chat';
import Job from './pages/job';
import Group from './pages/group';
import Donation from './pages/donation';
import DonationPayment from './pages/donation/payment';
import JobDetail from './pages/job/JobDetail';
import Faq from './pages/Faq';
import Press from './pages/Press';
import Admin from './pages/chat/admin';
import Safety from './pages/chat/safety';
import Rules from './pages/chat/rules';
import Conduct from './pages/conduct';
import SiteMap from './pages/sitemap';
import Terms from './pages/terms';
import UpgradedUser from './pages/UpgradedUser';
import Contacts from './pages/contacts';
import Advertise from './pages/advertise';
import Promote from './pages/promote';
import Launch from './pages/advertise/launch';
import GroupDetail from './pages/group/GroupDetail';

import Event from './pages/event/index';
import CreateEvent from './pages/event/CreateEvent';

export default function Router() {
    const { isAuth, user } = useAuthContext();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.pathname.includes('room/page')) {
            console.log('location', location.pathname)
            roomOut()
                .then((res) => console.log('Success logout'))
                .catch((err) => console.log('error logout'))
        }
    }, [location])

    return (
        <Routes>
            <Route path="auth" element={<AuthLayout />}>
                <Route index element={<Auth />} />
            </Route>
            <Route path="linkedin/callback" element={<LinkedInCallback />} />
            <Route path="verifyemail" element={<VerifyEmail />} />
            <Route path="verifyemailaddress" element={<VerifyEmailAddress />} />
            {/* <Route path="privacy-policy" element={<PrivacyPolicy/>} /> */}


            <Route path="logout" element={<Logout />} />


            {isAuth === true && (
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="feed" element={<HomeLayout />} >
                        <Route path="download" element={<Download />} />
                        <Route path="search" element={<Search />} />
                        <Route path="nearby" element={<Nearby />} />
                        <Route path="video" element={<Video />} />
                    </Route>
                    <Route path="forum" element={<HomeLayout />} >
                        <Route index element={<Forum />} />
                        <Route path=':id' element={<ForumDetail />} />
                    </Route>
                    <Route path="jobs" element={<HomeLayout />} >
                        <Route index element={<Job />} />
                        <Route path=":id" element={<JobDetail />} />
                    </Route>
                    <Route path="group" element={<HomeLayout />} >
                        <Route index element={<Group />} />
                        <Route path='edit' element={<Group />} />
                        <Route path=':id' element={<GroupDetail />} />
                    </Route>
                    <Route path="event" element={<HomeLayout />}>
                        <Route index element={< Event />} />
                        <Route path='create' element={< CreateEvent />} />
                    </Route>
                    <Route path="donation" element={<HomeLayout />} >
                        <Route index element={<Donation />} />
                        <Route path="payment" element={<DonationPayment />} />
                    </Route>
                    <Route path="marketplace" element={<HomeLayout />} >
                        <Route index element={<Marketplace />} />
                        <Route path=":id" element={<MarketDetail />} />
                    </Route>
                    <Route path="mymarketplace" element={<HomeLayout />} >
                        <Route index element={<MyMarket />} />
                        <Route path=":id" element={<MyMarketDetail />} />
                    </Route>
                    <Route path="chatrooms" element={<HomeLayout />} >
                        <Route index element={<ChatroomList />} />
                    </Route>
                    <Route path="upgrade" element={<Upgrade />}></Route>
                    <Route path="payment/:id" element={<Payment />}></Route>
                    <Route path="rooms" >
                        <Route path='login' element={<Login />} />
                        <Route path='page/:id' element={<Index />} />
                    </Route>
                    <Route path="inbox" element={<InboxLayout />}>
                        <Route index element={<Inbox />} />
                    </Route>
                    <Route path="profile">
                        <Route index element={<ProfileEdit />} />
                        <Route path=":username" element={<UserProfile />} />
                        <Route path="report/:id" element={<Report />} />
                        <Route path="block/:id" element={<Block />} />
                        {/* <Route path="about" element={<About />} /> */}
                        <Route path="edit" element={<ProfileEdit />} />
                        <Route path="settings" element={<ProfileSetting />} />
                        <Route path="blocked-user" element={<ProfileBlock />} />
                    </Route>
                    <Route path="blog" element={<DashboardLayout />}>
                        <Route index element={<BlogHome />} />
                        <Route path="create" element={<BlogCreate />} />
                        <Route path=":id" element={<BlogDetail />} />
                        <Route path=":id/edit" element={<BlogEdit />} />
                    </Route>
                    <Route path="myblog" element={<DashboardLayout />}>
                        <Route index element={<MyBlogHome />} />
                        <Route path="create" element={<MyBlogCreate />} />
                        <Route path=":id" element={<MyBlogDetail />} />
                        <Route path=":id/edit" element={<MyBlogEdit />} />
                    </Route>
                    {/* <Route path="privacy-policy" element={<PrivacyPolicy />} /> */}
                    <Route path="waitlist" element={<WaitList />} />
                    <Route path="aboutus" element={<Aboutus />} />

                    <Route path="posts/:id" element={<DetailPost />} />

                    <Route path="faq" element={<Faq />} />

                    <Route path="press" element={<Press />} />

                    <Route path="conduct" element={<Conduct />} />

                    <Route path="sitemap" element={<SiteMap />} />

                    <Route path="terms" element={<Terms />} />

                    <Route path="privacy-policy" element={<PrivacyPolicy />} />

                    <Route path="advertise" element={<Advertise />} />

                    <Route path="launch" element={<Launch />} />

                    <Route path="upgraded-users" element={<UpgradedUser />} />

                    <Route path="contacts" element={<Contacts />} />

                    <Route path="promote" element={<Promote />} />

                    <Route path="chat" >
                        <Route path="admin" element={<Admin />} />
                        <Route path="safety" element={<Safety />} />
                        <Route path="rules" element={<Rules />} />
                    </Route>

                    {/*  */}
                </Route>
            )}
            {isAuth === false && (
                <Route path="/" element={<UnAuthLayout />}>
                    <Route path="waitlist" element={<WaitList />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="aboutus" element={<Aboutus />} />
                    <Route path="conduct" element={<Conduct />} />
                    <Route path="donation" element={<Donation />} />
                    <Route path="faq" element={<Faq />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="advertise" element={<Advertise />} />
                    <Route path="/feed/download" element={<Download />} />
                    <Route path="/chat/safety" element={<Safety />} />
                    <Route path="press" element={<Press />} />
                    <Route path="promote" element={<Promote />} />
                </Route>
            )}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
