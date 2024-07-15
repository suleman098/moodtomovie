"use client";

import React from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  trailer: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="carousel rounded-box p-8">
      {movies.map((movie) => (
        <div key={movie.id} className="carousel-item p-4">
          <div
            className="bg-white shadow-lg rounded-lg p-6"
            style={{ width: '500px', height: '800px' }} // Adjusted width and height
          >
            <figure className="flex justify-center mb-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded"
                style={{ width: '100%', height: 'auto', maxHeight: '400px' }} // Adjusted max height
              />
            </figure>
            <div className="mt-4">
              <h2 className="text-2xl font-bold" style={{ color: 'black' }}>
                {movie.title}
              </h2>
              <p className="text-sm" style={{ color: 'black' }}>
                {movie.release_date} · {movie.runtime} min · ⭐ {movie.vote_average}/10
              </p>
              <p className="mt-2" style={{ color: 'black' }}>
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
