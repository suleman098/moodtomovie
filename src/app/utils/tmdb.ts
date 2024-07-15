const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is missing");
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  trailer: string; // Add trailer property
}

export const fetchMoviesByMood = async (genreId: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.results) {
      throw new Error("No results found");
    }

    const movies = await Promise.all(data.results.map(async (movie: any) => {
      try {
        const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`);
        if (!trailerResponse.ok) {
          throw new Error(`Error fetching trailer for movie ${movie.id}: ${trailerResponse.statusText}`);
        }

        const trailerData = await trailerResponse.json();
        const trailer = trailerData.results.length ? trailerData.results[0].key : null;
        return {
          ...movie,
          trailer,
        };
      } catch (error) {
        console.error(`Error processing movie ${movie.id}:`, error);
        return {
          ...movie,
          trailer: null,
        };
      }
    }));

    return movies;
  } catch (error) {
    console.error("Error fetching movies by mood:", error);
    return [];
  }
};
