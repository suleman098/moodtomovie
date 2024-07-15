// src/app/components/Navbar.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useMood } from '../context/MoodContext';

const moodHeadlines: { [key: string]: string } = {
  Cheerful: '😊 Enjoy the cheerfulness!',
  Reflective: '🤔 Time to reflect!',
  Gloomy: '☹️ Feeling gloomy?',
  Humorous: '😂 Time for some laughs!',
  Melancholy: '😔 In a melancholic mood?',
  Idyllic: '🌸 Enjoy the idyllic scenes!',
  Chill: '😌 Time to chill!',
  Romantic: '❤️ Feeling romantic?',
  Weird: '🌀 Embrace the weirdness!',
  Sleepy: '😴 Ready for a nap?',
  Angry: '😡 Feeling angry?',
  Fearful: '😱 Feeling fearful?',
  Lonely: '😞 Feeling lonely?',
  Tense: '😬 Feeling tense?',
  Thoughtful: '💭 Deep in thought?',
  ThrillSeeking: '😜 Seeking thrills?',
  Playful: '😃 Ready to play?',
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { selectedMood } = useMood();
  const [title, setTitle] = useState('Mood2Movie');

  useEffect(() => {
    if (pathname.startsWith('/movies') && selectedMood) {
      setTitle(moodHeadlines[selectedMood] || 'Mood2Movie');
    } else {
      setTitle('Mood2Movie');
    }
  }, [selectedMood, pathname]);

  return (
    <div className="navbar bg-white shadow-lg w-full md:w-1/2 h-16 md:h-10vh fixed top-4 left-1/2 transform -translate-x-1/2 rounded-full flex justify-between items-center px-4 border-3 border-white">
      <Link href="/" className="flex justify-center items-center">
        <Image src="/images/logo1.png" alt="Logo" width={40} height={50} className="md:w-16 md:h-20" />
      </Link>
      <div className="flex-grow flex justify-center relative">
        <AnimatePresence mode="wait">
          <motion.h1
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute text-black font-bold text-sm md:text-lg"
          >
            {title}
          </motion.h1>
        </AnimatePresence>
      </div>
      <div className="w-26 md:w-35 flex justify-end relative">
        <div className="relative inline-block px-2 md:px-4 py-1 md:py-2 font-medium group rounded-full">
          <AnimatePresence mode="wait">
            {pathname.startsWith('/movies') && selectedMood ? (
              <motion.div
                key="edit-mood-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="relative inline-block px-2 md:px-4 py-1 md:py-2 font-medium group rounded-full">
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-full"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black rounded-full"></span>
                  <span className="relative text-black group-hover:text-white">Edit Mood</span>
                </Link>
              </motion.div>
            ) : (
              <span className="opacity-0 inline-block px-2 md:px-4 py-1 md:py-2 font-medium group rounded-full">Edit Mood</span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
