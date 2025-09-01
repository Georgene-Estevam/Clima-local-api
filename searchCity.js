const apiKey = 'b2f4046af3384b2896c152521251508'; // Substitua pela sua chave da API
        const cityInput = document.getElementById('cidade');
        const autocompleteList = document.getElementById('autocomplete-list');

        cityInput.addEventListener('input', function() {
            const query = this.value;
            // Limpa a lista se o campo estiver vazio
            if (!query) {
                clearAutocompleteList();
                return;
            }

            // Faz a requisição apenas se tiver 3 ou mais caracteres para evitar muitas requisições
            if (query.length < 3) {
                return;
            }

            fetch(`https://api.weatherapi.com/v1/search.json?key=${'b2f4046af3384b2896c152521251508'}&q=${query}`)
                .then(response => response.json())
                .then(data => {
                    clearAutocompleteList(); // Limpa antes de popular
                    if (data.length > 0) {
                        data.forEach(city => {
                            const item = document.createElement('div');
                            item.classList.add('autocomplete-list-item');
                            item.innerHTML = `<strong>${city.name}</strong>, ${city.region}, ${city.country}`;
                            
                            item.addEventListener('click', function() {
                                cityInput.value = city.name;
                                clearAutocompleteList();
                            });

                            autocompleteList.appendChild(item);
                        });
                    } else {
                        const noResults = document.createElement('div');
                        noResults.classList.add('autocomplete-list-item');
                        noResults.innerText = 'Nenhum resultado encontrado';
                        autocompleteList.appendChild(noResults);
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar cidades:', error);
                    clearAutocompleteList();
                });
        });

        // Fecha a lista quando o usuário clica fora dela
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.autocomplete-container')) {
                clearAutocompleteList();
            }
        });

        function clearAutocompleteList() {
            autocompleteList.innerHTML = '';
        }