import React from 'react'

import Collapsible from './Collapsible'
import { Button } from '@/components/ui/button'

import { FaCheckCircle } from "react-icons/fa";

export default function Login() {
  return (
    <div className='w-full flex flex-col p-7 items-center gap-5'>
      <div className='flex flex-col pt-[100px] pb-[50px] px-auto md:w-[680px] w-full items-center gap-5'>
        <h3 className=' font-sans font-bold text-[34px]'>Member Login</h3>
        <p className='font-sans font-normal text-[23px]'>Login with your account or enter as a Guest</p>
        <div className='w-full flex flex-row flex-wrap gap-3'>
          <div className='p-5 bg-white rounded-xl flex flex-1 gap-3 items-center justify-center min-w-[330px]'>
            <img src='/images/google.svg' className='w-[40px] h-[40px]' alt=''/>
            <p className='font-sans font-semibold text-2xl'>Sign in with Google</p>
          </div>
          <div className='p-5 bg-white rounded-xl'>
            <img src='/images/facebook.svg' className='w-[40px] h-[40px]' alt=''/>
          </div>
          <div className='p-5 bg-white rounded-xl'>
            <img src='/images/apple.svg' className='w-[50px] h-[50px]' alt=''/>
          </div>
        </div>
        <div className='flex flex-col w-full gap-3'>
          <label htmlFor='email_address' className='font-sans font-normal text-base'>Email address</label>
          <input id='email_address' className='p-5 w-full rounded-lg' placeholder='Username or email address' />
        </div>
        <div className='flex flex-col w-full gap-3'>
          <label htmlFor='password' className='font-sans font-normal text-base'>Email address</label>
          <input id='Password' className='p-5 w-full rounded-lg' placeholder='Password' />
        </div>
        <Button variant='default' className='w-full p-7 font-sans font-bold text-base'>Sign in</Button>
      </div>
      <div className='flex flex-col pb-[100px] px-auto md:w-[680px] w-full items-center gap-5'>
        <h3 className=' font-sans font-bold text-[23px]'>Login as Guest</h3>
        <div className='flex flex-col w-full gap-3'>
          <label htmlFor='email_address' className='font-sans font-normal text-base'>Email address</label>
          <input id='email_address' className='p-5 w-full rounded-lg' placeholder='Username or email address' />
        </div>
        <Button variant='default' className='w-full p-7 font-sans font-bold text-base'>Enter as a Guest</Button>
        <div className='flex justify-end w-full'>  
          <p className='font-sans font-semibold text-base'>Forgot Password</p>
        </div>
      </div>
      <div className='w-full flex flex-col gap-5'>
        <Collapsible title='Donamix Chat Rules and Regulations'>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>By entering USA chat, you agree to be at least 13 years of age.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>The general chat rooms are totally Free. No registration is required.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>Type your nickname and press "Enter as Guest".</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>No phone numbers, emails or instant messaging IDs are allowed to be posted in public.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>Any suspicious activities relating to the exploitation of chat users, report it to a mod or the room admin immediately.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>Do not flood the chat room or disrupt other users in any way. You will be banned if you do.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>This is a chatroom, not a place for vulgar and/or tasteless chatter so please keep things clean.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>Although we do staff moderators in this chat room, they cannot be on every minute of the day.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>Do not give out any personal information to anyone, no matter how much you think you can trust them.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>Hack/exploit of the chat is a punishable offense by law. We have logs and will report to ISP/Police anyone who does.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>PERMANENT server bans will be placed to users who attempt to exploit/hack our chat rooms.</p>
          </div>
          <div className='flex flex-row w-full gap-3 items-center'>
            <FaCheckCircle />
            <p className='font-sans font-normal text-base'>Please select another of our Chat Rooms from our drop down menu above the chat if this one is not suitable for you.</p>
          </div>
        </Collapsible>
        <Collapsible title='USA Chat Room Connect with Friends in America'>
          <p className='font-sans font-normal text-base leading-8'>If you're an American and looking to make friends, then we highly recommend joining our free USA chat room. There are thousands of people in there that would love to talk with you about anything and everything. USA American Chat is a free USA online chat and entertainment site that connects Native Americans in the United States and around the world. You can meet people from all over the country and make friends with them. It's a great way to learn about other parts of America! With free USA chat room, you can chat with friends in your region! What makes the USA online chat unique? This is a free American online chat room. Our chat rooms have many lower or custom rooms, depending on where you feel you want to chat.<br/>Meet new friends, create new conversations, and get to know different people of different languages without signing up. Join and become a part of our free US chat room today to talk about life, sports, movies and more. Meet and find new people to chat with or share your ideas, opinions on current events, or anything else that interests you with Americans and make new friends.</p>
          <div className='flex flex-col gap-2'>
            <h3 className='font-sans font-bold text-[25px] py-3'>Chat Features</h3>
            <div className='flex flex-row w-full gap-3 items-center'>
              <FaCheckCircle />
              <p className='font-sans font-normal text-base'>Talk to people nearby, maybe in your community or city.</p>
            </div>
            <div className='flex flex-row w-full gap-3 items-center'>
              <FaCheckCircle />
              <p className='font-sans font-normal text-base'>Comments, messages, favorite notifications.</p>
            </div>
            <div className='flex flex-row w-full gap-3 items-center'>
              <FaCheckCircle />
              <p className='font-sans font-normal text-base'>Pictures and news from awesome people.</p>
            </div>
            <div className='flex flex-row w-full gap-3 items-center'>
              <FaCheckCircle />
              <p className='font-sans font-normal text-base'>Upgrade your account and become a VIP.</p>
            </div>
            <div className='flex flex-row w-full gap-3 items-center'>
              <FaCheckCircle />
              <p className='font-sans font-normal text-base'>Helps in making new friends.</p>
            </div>
          </div>
        </Collapsible>
      </div>
    </div>
  )
}