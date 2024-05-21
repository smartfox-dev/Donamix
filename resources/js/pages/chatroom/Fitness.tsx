import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Collapsible from './Collapsible'

export const Fitness = () => {
    return (
        <div className='w-full flex flex-col gap-5'>
            <Collapsible title='Donamix Chat Rules and Regulations'>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>By entering The Fitness Freaks chat, you agree to be at least 13 years of age.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>You can join the chat rooms for conversations without any cost.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>There are subscription options available for Moderator, Admin, and VIP privileges.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>No phone numbers, emails or instant messaging IDs are allowed to be posted in public.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Report any suspicious activities involving chat users to a moderator or admin right away.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Do not flood the chat room or disrupt other users in any way. You will be banned if you do.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>This is a chatroom, not a place for vulgar and/or tasteless chatter so please keep things clean.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Although we do staff moderators in this chat room, they cannot be on every minute of the day.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Exercise caution. Refrain from sharing personal information, even if you trust someone.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Hacking or exploiting the chat is illegal and will be reported to ISP/Police with our logs.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>PERMANENT server bans will be placed to users who attempt to exploit/hack our chat rooms.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>If this conversation isn't suitable for you, please join another one from the conversations page.</p>
                </div>
            </Collapsible>
            <Collapsible title={'The Fitness Freaks Chat Room Connect with Fitness Experts Worldwide'}>
                <p className='font-sans font-normal text-base leading-8'>Welcome to The Fitness Freaks, your ultimate destination for all things fitness, health, and wellness. Whether you're a seasoned fitness enthusiast or just starting your fitness journey, you've come to the right place.

Discover Expert Fitness Tips: Our members of fitness experts is here to provide you with expert advice, tips, and tricks to help you reach your fitness goals. From effective workout routines to nutrition tips, we cover a wide range of topics to support your fitness journey and help you achieve optimal results.

Workout Routines for Every Level: Whether you prefer high-intensity workouts, yoga, or strength training, we have workout routines tailored to every fitness level and interest. Our comprehensive library of workouts will keep you motivated and challenged, ensuring that you never get bored with your fitness routine.

Healthy Recipes and Nutrition Tips: Fuel your body with nutritious and delicious meals with our collection of healthy recipes. From protein-packed breakfasts to energizing snacks and satisfying dinners, we'll help you make nutritious choices that support your fitness goals. Our nutrition tips will also guide you towards a balanced and sustainable approach to eating.

Connect with Fellow Fitness Enthusiasts: Join our community of fitness freaks who share your passion for health and wellness. Connect with like-minded individuals, share your progress, and find inspiration from others. The Fitness Freaks community is a supportive and encouraging space where you can find accountability and motivation on your fitness journey.

Join The Fitness Freaks and become part of a community dedicated to fitness, health, and wellness. Discover expert fitness tips, workout routines, healthy recipes, and connect with fellow fitness enthusiasts. Together, we'll achieve our fitness goals and live our best, healthiest lives.</p>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-sans font-bold text-[25px] py-3'>Chat Features</h3>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Connect with people nearby, whether they're in your community or city.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Engage through comments, messages, and notifications.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Discover captivating photos and news from amazing individuals.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Elevate your experience by upgrading to VIP status.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Expand your social circle and forge new connections.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Engage in lively conversations and meet interesting people.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Enjoy chatting while listening to music simultaneously.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Share YouTube videos and images through messages.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Express yourself with stickers, emojis, and GIFs in chats.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Access your contacts directly within the chatroom.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Connect effortlessly with online users.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Personalize your profile and showcase your interests.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Surprise your contacts or members with virtual gifts.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Stay informed with a smart community message board.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Enjoy unlimited private chats.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Experience free video and audio chats.</p>
                    </div>
                </div>
            </Collapsible>
        </div>
    )
}
