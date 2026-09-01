const apiKey = 'b2f4046af3384b2896c152521251508';
        const cityInput = document.getElementById('cidade'); //Usa document.getElementById para selecionar o elemento HTML com o ID "city-input".
        const autocompleteList = document.getElementById('autocomplete-list'); //Seleciona o elemento HTML com o ID "autocomplete-list".

        cityInput.addEventListener('input', function() { //Adiciona um "ouvinte de evento" ao campo de input. A função é executada toda vez que o valor do input muda (ou seja, quando o usuário digita algo).

            const query = this.value;//Pega o valor atual do campo de input e armazena na variável query.

            // Limpa a lista se o campo estiver vazio
            if (!query) {
                clearAutocompleteList();
                return;
            }

            // Faz a requisição apenas se tiver 2 ou mais caracteres para evitar muitas requisições. Uma otimização. A requisição só é feita se o usuário digitar 2 ou mais caracteres, reduzindo o número de chamadas à API.
            if (query.length < 2) {
                return;
            }

            // Inicia a requisição à API. A URL é construída dinamicamente com a chave (apiKey) e a busca (query).
            fetch(`https://api.weatherapi.com/v1/search.json?key=${'b2f4046af3384b2896c152521251508'}&q=${query}`)
                .then(response => response.json())//Depois que a requisição é concluída, a resposta é convertida de JSON para um objeto JavaScript.

                .then(data => { //Recebe os dados já convertidos.
                    clearAutocompleteList(); // Limpa antes de popular

                    if (data.length > 0) { //Verifica se a API retornou algum resultado.

                        data.forEach(city => { //Itera sobre cada cidade retornada no array data.

                            const item = document.createElement('div'); //Cria um novo elemento div para cada sugestão.
                            item.classList.add('autocomplete-list-item'); //Adiciona a classe CSS para estilizar o item.

                            item.innerHTML = `<strong>${city.name}</strong>, ${city.region}, ${city.country}`;//Adiciona o texto do item, com o nome da cidade em negrito.
                            
                            item.addEventListener('click', function() { //Adiciona um evento de clique a cada item da lista.

                                cityInput.value = city.name; //Quando o item é clicado, o valor do input é preenchido com o nome da cidade.
                                clearAutocompleteList();
                            });

                            autocompleteList.appendChild(item); //Adiciona o novo item div à lista de sugestões.
                        });

                    } else { //Se a API não encontrar resultados, um item com a mensagem "Nenhum resultado encontrado" é adicionado à lista.
                        const noResults = document.createElement('div');
                        noResults.classList.add('autocomplete-list-item');
                        noResults.innerText = 'Nenhum resultado encontrado';
                        autocompleteList.appendChild(noResults);
                    }
                })

                .catch(error => { //Caso ocorra um erro na requisição (por exemplo, problema de conexão ou chave inválida), ele é capturado e exibido no console do navegador. A lista também é limpa.
                    console.error('Erro ao buscar cidades:', error);
                    clearAutocompleteList();
                });
        });

        // Fecha a lista quando o usuário clica fora dela. Outro ouvinte de evento, desta vez no documento inteiro.

        document.addEventListener('click', function(e) { //Verifica se o clique do usuário ocorreu fora do contêiner de autocompletar. Se sim, a lista é escondida.
            if (!e.target.closest('.autocomplete-container')) {
                clearAutocompleteList();
            }
        });

        // Uma função separada para limpar a lista, tornando o código mais organizado. autocompleteList.innerHTML = ''; remove todos os elementos filhos da lista.
        function clearAutocompleteList() {
            autocompleteList.innerHTML = '';
        }