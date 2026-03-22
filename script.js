const API_KEY = '8d77142d';
const BASE_URL = 'https://www.omdbapi.com/';

const form = document.querySelector('#searchForm');
const input = document.querySelector('#searchInput');
const gallery = document.querySelector('#movieList');
const loader = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  currentQuery = input.value.trim();
  if (!currentQuery) return;

   currentPage = 1;
  gallery.innerHTML = ''; 
  loadMoreBtn.classList.add('is-hidden'); 
  
  fetchMovies(currentQuery, currentPage);
});


loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  fetchMovies(currentQuery, currentPage);
});

function fetchMovies(query, page) {
 
  loader.classList.remove('is-hidden');

  fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        renderMovies(data.Search);
        
        const totalResults = parseInt(data.totalResults);
        if (totalResults > page * 10) {
          loadMoreBtn.classList.remove('is-hidden');
        } else {
          loadMoreBtn.classList.add('is-hidden');
        }
      } else {
        alert("Ой! " + data.Error);
        loadMoreBtn.classList.add('is-hidden');
      }
    })
    .catch(error => console.error("Помилка:", error))
    .finally(() => {
     
      loader.classList.add('is-hidden');
      
       if (page > 1) {
        window.scrollBy({
          top: 600,
          behavior: 'smooth',
        });
      }
    });
}

function renderMovies(movies) {
    const markup = movies.map(({ Title, Year, Poster }) => {
      const placeholder = 'https://dummyimage.com/400x600/dbdbdb/787878.png&text=No+Poster';
    const imgUrl = Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400x600?text=No+Poster';
    
    return `
      <li class="gallery-item">
        <img class="gallery-image" src="${imgUrl}" alt="${Title}" />
        <div class="info">
          <p class="info-item"><b>${Title}</b></p>
          <p class="info-item">Рік: ${Year}</p>
        </div>
      </li>
    `;
  }).join("");

  gallery.insertAdjacentHTML('beforeend', markup);
}