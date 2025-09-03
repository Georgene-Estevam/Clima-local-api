async function buscarClima() {
  const cidade = document.getElementById("cidade").value.trim();
  const apiKey = "b2f4046af3384b2896c152521251508";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&lang=pt`;

  try {
    const resposta = await fetch(url); //Envia a requisição HTTP para a API. await faz o JavaScript esperar até que a resposta chegue.
    const dados = await resposta.json();// Converte a resposta da API (que vem em formato JSON) para um objeto JavaScript. Agora podemos acessar os dados com: dados.location, dados.current, etc.

    console.log(dados); // Para depuração

    if (dados.error) {
      document.getElementById("resultado").innerHTML = `<p>❌ Cidade não encontrada: "${cidade}"</p>`;
    } else {
      const { location, current } = dados;
      document.getElementById("local").innerHTML = `${location.name},`
      document.getElementById("regiao").innerHTML = `${location.region},`
      document.getElementById("pais").innerHTML = `${location.country}.`

      document.getElementById("resultadoTemp").innerHTML = `${current.temp_c}°C`
      /*document.getElementById("fahrenheit").innerHTML = `${current.temp_f}°F`*/
      document.getElementById("condition").innerHTML = `${current.condition.text}`
      document.getElementById("conditionIcon").innerHTML = `<img src="https:${current.condition.icon}" alt="Ícone do clima">`
      document.getElementById("velocidadeVento").innerHTML = `${current.wind_kph}Km/h`
      document.getElementById("umidade").innerHTML = `${current.humidity}%`
      
      /*document.getElementById("resultado").innerHTML = `
        <h2>${location.name}, ${location.region}, ${location.country}</h2>
    
        <p><strong>Temperatura:</strong> ${current.temp_c}°C </p><br>
        <p>Clima: ${current.condition.text} <img src="https:${current.condition.icon}" alt="Ícone do clima"></p><br>
        <p>Velocidade do vento: ${current.wind_kph}Km/h</p><br>
        
      `;*/
    }
  } catch (erro) {
    document.getElementById("resultado").innerHTML = `<p>Erro ao buscar dados.</p>`;
    /*alert("Erro ao buscar dados")*/
    console.error("Erro na requisição:", erro);
  }
}