import { getPopularMovies } from "@/services/movie";
import React from "react";

async function Movies() {
  const data = await getPopularMovies();
  console.log(data);
  return (
    <div></div>
  )
}

export default Movies;
