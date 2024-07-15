// src/app/components/MoodButtons.tsx

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMood } from '../context/MoodContext';

const moods = [
  { name: 'Cheerful', genreId: '35', emoji: '😊' },
  { name: 'Reflective', genreId: '18', emoji: '🤔' },
  { name: 'Gloomy', genreId: '80', emoji: '☹️' },
  { name: 'Humorous', genreId: '35', emoji: '😂' },
  { name: 'Melancholy', genreId: '18', emoji: '😔' },
  { name: 'Idyllic', genreId: '10749', emoji: '🌸' },
  { name: 'Chill', genreId: '10751', emoji: '😌' },
  { name: 'Romantic', genreId: '10749', emoji: '❤️' },
  { name: 'Weird', genreId: '878', emoji: '🌀' },
  { name: 'Sleepy', genreId: '10770', emoji: '😴' },
  { name: 'Angry', genreId: '80', emoji: '😡' },
  { name: 'Fearful', genreId: '27', emoji: '😱' },
  { name: 'Lonely', genreId: '18', emoji: '😞' },
  { name: 'Tense', genreId: '53', emoji: '😬' },
  { name: 'Thoughtful', genreId: '99', emoji: '💭' },
  { name: 'Thrill seeking', genreId: '28', emoji: '😜' },
  { name: 'Playful', genreId: '16', emoji: '😃' },
];

const MoodButtons: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { setSelectedMood } = useMood();
  const router = useRouter();

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleMoodSelect = (genreId: string, mood: string) => {
    setSelectedMood(mood);
    router.push(`/movies?genreId=${genreId}&mood=${mood}`);
  };

  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="relative w-full max-w-3xl flex flex-col items-center">
        <AnimatePresence>
          {!isClicked && (
            <motion.a
              href="#"
              onClick={handleClick}
              className="relative inline-block px-4 py-2 font-medium group"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-black group-hover:text-white flex items-center justify-center w-full h-full">
                Select Mood
              </span>
            </motion.a>
          )}
        </AnimatePresence>

        {isClicked && (
          <motion.table
            className="table-md	 mt-12 border-collapse w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <tbody>
              {Array.from({ length: Math.ceil(moods.length / 4) }).map((_, rowIndex) => (
                <motion.tr key={rowIndex} className="border-none">
                  {moods.slice(rowIndex * 4, rowIndex * 4 + 4).map((mood, colIndex) => (
                    <motion.td
                      key={colIndex}
                      className="p-2 border-none"
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 30 } },
                      }}
                    >
                      <button
                        onClick={() => handleMoodSelect(mood.genreId, mood.name)}
                        className="relative inline-block px-4 py-2 font-medium group w-full"
                      >
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative text-black group-hover:text-white flex items-center justify-center w-full h-full">
                          {mood.emoji} {mood.name}
                        </span>
                      </button>
                    </motion.td>
                  ))}
                  {Array.from({ length: 4 - (moods.slice(rowIndex * 4, rowIndex * 4 + 4).length % 4) }).map((_, emptyIndex) => (
                    <td key={`empty-${emptyIndex}`} className="p-2 border-none"></td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>
    </div>
  );
};

export default MoodButtons;
