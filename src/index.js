import { fetchSearchValues } from './fetchSearchValues';

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