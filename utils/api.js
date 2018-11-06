const BASE_API = 'https://yts.am/api/v2/'

class Api {
  // para traer las sugerencias de la API
  async getSuggestion(id) {
    const query = await fetch(`${BASE_API}movie_suggestions.json?movie_id=${id}`)
    const { data } = await query.json()
    return data.movies
  }
  // función para traer las películas que en realidad son las categorías
  async getMovies() {
    const query = await fetch(`${BASE_API}list_movies.json?`)
    const { data } = await query.json()
    return data.movies
  }
  // Función para traer una sola película para buscarla
  async searchMovie(title) {
    const query = await fetch(`${BASE_API}list_movies.json?limit=1&sort_by=rating&query_term=${title}`)
    const { data } = await query.json()
    return data.movies
  }
}

export default new Api()
