const gallery = document.querySelector('.gallery');

export function renderResultsList(images) {
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
    gallery.insertAdjacentHTML("beforeend", markup);
};