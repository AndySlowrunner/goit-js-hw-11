import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let currentPage = 1;
let currentSearchQuery = '';

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
    if (searchQuery === '') {
        return;
    }
    currentSearchQuery = searchQuery;
    currentPage = 1;
    gallery.innerHTML = '';
    loadMoreButton.style.display = 'none';
    await fetchSearchValues(currentSearchQuery, currentPage);
};

async function handleLoadMore() {
    currentPage += 1;
    await fetchSearchValues(currentSearchQuery, currentPage);
};

async function fetchSearchValues(searchQuery, page) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=36730507-d69436f33261eb3b1b2a44ec5&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
        const { hits, totalHits } = response.data;
        if (hits.length > 0) {
            renderResultsList(hits);
            if (currentPage * 40 < totalHits) {
                loadMoreButton.style.display = 'block';
                Notify.success(`Hooray! We found ${totalHits} images.`)
            } else {
                loadMoreButton.style.display = 'none';
                Notify.failure("We're sorry, but you've reached the end of search results.");
            }
        } else {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
    } catch (error) {
        console.error(error);
    }
};

function renderResultsList(images) {
    const markup = images
        .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
            return `
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b class="info-key">Likes</b>
                            <b class="info-value">${likes}</b>
                        </p>
                        <p class="info-item">
                            <b class="info-key">Views</b>
                            <b class="info-value">${views}</b>
                        </p>
                        <p class="info-item">
                            <b class="info-key">Comments</b>
                            <b class="info-value">${comments}</b>
                        </p>
                        <p class="info-item">
                            <b class="info-key">Downloads</b>
                            <b class="info-value">${downloads}</b>
                        </p>
                    </div>
                </div>
            `;
        })
        .join('');
    gallery.innerHTML = markup;
};