document.addEventListener('DOMContentLoaded', function () {
    const resultsDiv = document.getElementById('results');
    const loadMoreDiv = document.getElementById('load-more');
    const searchInput = document.getElementById('search');

    let lastView = [];
    let countriesPerLoad = 20; 
    let currentIndex = 0; 


    if (localStorage.getItem('countries')) {
        lastView = JSON.parse(localStorage.getItem('countries'));
        loadCountries();
    } else {
        // Veri yoksa API'den çek
        const url = 'https://restcountries.com/v2/all';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                lastView = data.map(country => ({
                    flag: country.flag,
                    name: country.name,
                    capital: country.capital,
                    languages: country.languages[0].name,
                    populations: country.population
                }));

                // Veriyi localStorage'a kaydetme islmei yapalim
                localStorage.setItem('countries', JSON.stringify(lastView));

                // İlk 20 ülkeyi yükleyecektir
                loadCountries();
            })
            .catch(error => console.log('API error:', error));
    }

    
    function loadCountries() {
        const nextIndex = currentIndex + countriesPerLoad;
        const countriesToShow = lastView.slice(currentIndex, nextIndex);

        countriesToShow.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.style.width = '200px';
            countryDiv.style.height = '240px';
            countryDiv.style.position = 'relative';
            countryDiv.style.backgroundColor = 'rgb(125, 125, 241)';
            countryDiv.style.margin = '5px';
            countryDiv.style.display = 'inline-block';

            const addImg = document.createElement('img');
            addImg.src = country.flag;
            addImg.style.width = '180px';
            addImg.style.height = '110px';
            addImg.style.marginLeft = '10px';
            addImg.style.marginTop = '10px';
            addImg.style.backgroundColor = 'bisque';
            countryDiv.appendChild(addImg);

            const countryName = document.createElement('p');
            countryName.style.color = 'orange';
            countryName.style.textAlign = 'center';
            countryName.style.fontSize = 'larger';
            countryName.style.fontWeight = '600';
            countryName.textContent = country.name;
            countryDiv.appendChild(countryName);

            const pragraf1 = document.createElement('p');
            pragraf1.textContent = `Capital: ${country.capital}`;
            pragraf1.style.padding = '3px 4px 5px 6px';
            countryDiv.appendChild(pragraf1);

            const pragraf2 = document.createElement('p');
            pragraf2.textContent = `Language: ${country.languages}`;
            pragraf2.style.padding = '3px 4px 5px 6px';
            countryDiv.appendChild(pragraf2);

            const pragraf3 = document.createElement('p');
            pragraf3.textContent = `Population: ${country.populations}`;
            pragraf3.style.padding = '3px 4px 5px 6px';
            countryDiv.appendChild(pragraf3);

            resultsDiv.appendChild(countryDiv);
        });

        currentIndex = nextIndex;

        if (currentIndex >= lastView.length) {
            loadMoreDiv.style.display = 'none'; // Tüm ülkeler yüklendiyse 'load more' kısmını gizle
        }
    }

    // IntersectionObserver kullanarak sayfa sonuna yaklaş 
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadCountries();
        }
    });

    observer.observe(loadMoreDiv);


    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        resultsDiv.innerHTML = '';

        const filteredCountries = lastView.filter(country =>
            country.name.toLowerCase().includes(searchTerm)
        );

        filteredCountries.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.style.width = '200px';
            countryDiv.style.height = '240px';
            countryDiv.style.position = 'relative';
            countryDiv.style.backgroundColor = 'rgb(125, 125, 241)';
            countryDiv.style.margin = '5px';
            countryDiv.style.display = 'inline-block';

            const addImg = document.createElement('img');
            addImg.src = country.flag;
            addImg.style.width = '180px';
            addImg.style.height = '110px';
            addImg.style.marginLeft = '10px';
            addImg.style.marginTop = '10px';
            addImg.style.backgroundColor = 'bisque';
            countryDiv.appendChild(addImg);

            const countryName = document.createElement('p');
            countryName.style.color = 'orange';
            countryName.style.textAlign = 'center';
            countryName.style.fontSize = 'larger';
            countryName.style.fontWeight = '600';
            countryName.textContent = country.name;
            countryDiv.appendChild(countryName);

            const pragraf1 = document.createElement('p');
            pragraf1.textContent = `Capital: ${country.capital}`;
            pragraf1.style.padding = '3px 4px 5px 6px';
            countryDiv.appendChild(pragraf1);

            const pragraf2 = document.createElement('p');
            pragraf2.textContent = `Language: ${country.languages}`;
            pragraf2.style.padding = '3px 4px 5px 6px';
            countryDiv.appendChild(pragraf2);

            const pragraf3 = document.createElement('p');
            pragraf3.textContent = `Population: ${country.populations}`;
            pragraf3.style.padding = '3px 4px 5px 6px';
            countryDiv.appendChild(pragraf3);

            resultsDiv.appendChild(countryDiv);
        });
    });
});
