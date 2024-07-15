// src/app/movies/Movies.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchMoviesByMood, Movie } from '../utils/tmdb';
import { useMood } from '../context/MoodContext';

const Movies: React.FC = () => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get('genreId');
  const mood = searchParams.get('mood'); // Get the mood from the search params
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedMood } = useMood();

  useEffect(() => {
    console.log('Effect triggered'); // Debugging log

    if (genreId) {
      setSelectedMood(mood || ''); // Set the mood in context
      const fetchMovies = async () => {
        setLoading(true);
        console.log('Fetching movies'); // Debugging log
        const movies = await fetchMoviesByMood(genreId as string);
        const moviesWithTrailers = movies.filter((movie) => movie.trailer); // Filter movies with trailers
        console.log('Fetched Movies:', moviesWithTrailers); // Debugging log
        setMovies(moviesWithTrailers);
        setLoading(false);
      };
      fetchMovies();
    }
  }, [genreId, mood, setSelectedMood]);

  return (
    <div className="flex items-center justify-center w-full p-4 mt-16" style={{ height: 'calc(100vh - 64px)' }}>
      {loading ? (
        <div className="text-center">
          <span className="loading loading-ring loading-lg"></span>
          <p className="mt-4 text-lg font-medium text-black">
            Fetching movies for your {mood} mood
          </p>
        </div>
      ) : (
        <div className="carousel carousel-center bg-neutral rounded-box w-full">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="carousel-item w-full flex bg-white justify-center">
                <div
                  className="bg-white shadow-lg p-4 border-black border-2 rounded-box"
                  style={{ maxWidth: '40%', height: '600px' }}
                >
                  <iframe
                    width="100%"
                    height="300"
                    src={`https://www.youtube.com/embed/${movie.trailer}`}
                    title={movie.title}
                    allowFullScreen
                    className="mb-4 rounded-box"
                  />
                  <h2 className="card-title text-xl font-bold">{movie.title}</h2>
                  <p className="text-sm text-gray-500">
                    {movie.release_date} · {movie.runtime}min · ⭐ {movie.vote_average}/10
                  </p>
                  <div className="mt-2 text-black overflow-auto" style={{ height: '150px', overflowY: 'auto' }}>
                    {movie.overview}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg font-medium text-black">No movies with trailers found for this mood.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
