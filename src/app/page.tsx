// src/app/page.tsx

import React from 'react';
import MoodButtons from './components/MoodButtons';

const Home: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <MoodButtons />
    </div>
  );
};

export default Home;
