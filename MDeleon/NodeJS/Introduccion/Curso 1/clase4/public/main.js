document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/movies')
        .then(response => response.json())
        .then(data => {
            const moviesContainer = document.getElementById('movies-container');
            data.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `
                    <h2>${movie.title}</h2>
                    <p>Year: ${movie.year}</p>
                    <p>Director: ${movie.director}</p>
                    <p>Duration: ${movie.duration}</p>
                    <p>Rate: ${movie.rate}</p>
                    <img src="${movie.poster}" alt="${movie.title} poster">
                `;
                moviesContainer.appendChild(movieElement);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
});