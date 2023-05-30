import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
import { renderResultsList } from './makeMarkup';

const loadMoreButton = document.querySelector('.load-more');

export async function fetchSearchValues(searchQuery, page) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=36730507-d69436f33261eb3b1b2a44ec5&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
        const { hits, totalHits } = response.data;
        if (hits.length > 0) {
            renderResultsList(hits);
            if (page * 40 < totalHits) {
                loadMoreButton.style.display = 'block';
            }
            else if (page * 40 >= totalHits) {
                loadMoreButton.style.display = 'none';
                Notify.failure("We're sorry, but you've reached the end of search results.");
            }
        }
        else {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
    } catch (error) {
        console.error(error);
    }
};