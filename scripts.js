document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const heroContainer = document.getElementById('heroContainer');

    const publicKey = '3aee933e7188d4779d4befd870f20bc1';
    const privateKey = '5f4766e87903528f71c5d136ef000164f4cd6dd5';
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
                .then(response => response.json())
                .then(data => {
                    displayHeroes(data.data.results);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    });

    function displayHeroes(heroes) {
        heroContainer.innerHTML = '';
        if (heroes.length === 0) {
            heroContainer.innerHTML = '<p>No heroes found.</p>';
            return;
        }

        heroes.forEach(hero => {
            const heroCard = document.createElement('div');
            heroCard.className = 'hero-card';

            const heroImg = document.createElement('img');
            heroImg.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
            heroImg.alt = hero.name;

            const heroName = document.createElement('h2');
            heroName.textContent = hero.name;

            heroCard.appendChild(heroImg);
            heroCard.appendChild(heroName);
            heroContainer.appendChild(heroCard);
        });
    }
});
