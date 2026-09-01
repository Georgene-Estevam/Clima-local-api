async function buscarClima() {
  const cidade = document.getElementById("cidade").value.trim();
  const apiKey = "b2f4046af3384b2896c152521251508";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&aqi=yes&lang=pt`;

  try {
    const resposta = await fetch(url); //Envia a requisição HTTP para a API. await faz o JavaScript esperar até que a resposta chegue.
    const dados = await resposta.json();// Converte a resposta da API (que vem em formato JSON) para um objeto JavaScript. Agora podemos acessar os dados com: dados.location, dados.current, etc.
    console.log(dados); // Para depuração

    if (dados.error) {
      let resultadoTextoDaPesquisa = document.getElementById("resultado")

      if (cidade === "") {
        resultadoTextoDaPesquisa.innerHTML = `<p>❌ Por favor, informe uma cidade.</p>`

        cidade.addEventListener ("input", () =>  {

          if (cidade !== "") {
            const removerMensagem = resultadoTextoDaPesquisa.innerHTML = ""
            removerMensagem.remove()
          }
        })

      } else {
        resultadoTextoDaPesquisa.innerHTML = `<p>❌ Cidade não encontrada: "${cidade}"</p>`

        cidade.addEventListener ("input", () =>  {
          if (cidade !== "") {
            const removerMensagem = resultadoTextoDaPesquisa.innerHTML = "";
            removerMensagem.remove()
          }
        })
      }

    } else {
      const { location, current } = dados;
      document.getElementById("local").innerHTML = `${location.name},`
      document.getElementById("regiao").innerHTML = `${location.region},`
      document.getElementById("pais").innerHTML = `${location.country}.`

      document.getElementById("resultado-Temp-Celsius").innerHTML = `${current.temp_c}°C`
      document.getElementById("resultado-Temp-Fahrenheit").innerHTML = `${current.temp_f}°F`

      document.getElementById("condition").innerHTML = `${current.condition.text}`
      document.getElementById("conditionIcon").innerHTML = `<img src="https:${current.condition.icon}" alt="Ícone do clima">`

      document.getElementById("velocidade-Vento-Kmh").innerHTML = `${current.wind_kph}Km/h`
      document.getElementById("velocidade-Vento-Mph").innerHTML = `${current.wind_mph}mph`

      const grauDoVento = document.getElementById("grau-Do-Vento")
      const direcaoDoVento = document.getElementById("direcao-Vento")

      function grauParaDirecao(grau) {
        let direcaoTexto = ""

        if (grau >= 337.5 || grau < 22.5) direcaoTexto = "Norte"
        if (grau >= 22.5 && grau < 67.5) direcaoTexto = "Nordeste"
        if (grau >= 67.5 && grau < 112.5) direcaoTexto = "Leste"
        if (grau >= 112.5 && grau < 157.5) direcaoTexto = "Sudeste"
        if (grau >= 157.5 && grau < 202.5) direcaoTexto = "Sul"
        if (grau >= 202.5 && grau < 247.5) direcaoTexto = "Sudoeste"
        if (grau >= 247.5 && grau < 292.5) direcaoTexto = "Oeste"
        if (grau >= 292.5 && grau < 337.5) direcaoTexto = "Noroeste"

        return direcaoTexto
      }

      grauDoVento.innerHTML = `Grau: ${current.wind_degree}°`
      direcaoDoVento.innerHTML = `Direção: ${grauParaDirecao(current.wind_degree)}`
      //${current.wind_dir} -

      document.getElementById("umidade").innerHTML = `${current.humidity}%`
      //document.getElementById("qualidade-do-ar").innerHTML = `${current.air_quality.pm2_5.toFixed(1)} µg/m³`
    }
  } catch (erro) {
    //document.getElementById("resultado").innerHTML = `<p>Erro ao buscar dados.</p>`;
    /*alert("Erro ao buscar dados")*/
    console.error("Erro na requisição:", erro);
  }
}