// src/app/layout.tsx

import './styles/globals.css';
import { MoodProvider } from './context/MoodContext';
import Navbar from './components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Mood2Movie</title>
      </head>
      <body className="bg-white flex flex-col min-h-screen">
        <MoodProvider>
          <Navbar />
          <main className="flex flex-1 items-center justify-center mt-16 md:mt-10vh p-4 md:p-8">
            {children}
          </main>
          <footer className="bg-black text-center text-white h-16 md:h-5vh flex items-center justify-center">
            &copy; {new Date().getFullYear()} Mood2Movie
          </footer>
        </MoodProvider>
      </body>
    </html>
  );
}

