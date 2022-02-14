const apiKey = "7f36c176";
const url = ` http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`;

const fetchData = async (movieSearched) => {
  const response = await axios.get(`http://www.omdbapi.com`, {
    params: {
      apikey: `${apiKey}`,
      s: movieSearched,
    },
  });
  if (response.data.Error) {
    // console.log(response.data.Error);
    return [];
  }
  return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
<label><b>Search for a movie</b></label>
<input class="input"/>
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>
  </div>
</div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

// action that happens when receive a input
const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  // fatchData happens, then dropdown is active
  dropdown.classList.add("is-active");

  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `<img src="${imgSrc}"/>
     ${movie.Title}`;

    resultsWrapper.appendChild(option);
  }
};

//debounce function wrapping the function
input.addEventListener("input", debounce(onInput, 500));
