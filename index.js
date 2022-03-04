// object with functions to handle the input autocomplete, the fetch data
const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(movieSearched) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "7f36c176",
        s: movieSearched,
      },
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  },
};
// spread the autoCompleteConfig object and make it happen inside of the #left-autocomplete
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"));
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"));
  },
});

// get more info of the selected movie
const onMovieSelect = async (movie, summaryElement) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "7f36c176",
      i: movie.imdbID,
    },
  });
  summaryElement.innerHTML = movieTemplate(response.data);
};

// render the movie info
const movieTemplate = (movieDetail) => {
  return `
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieDetail.Poster}"/>
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">Box Office</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}</p>
  <p class="subtitle">IMDB Rating</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
