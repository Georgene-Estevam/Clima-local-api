async function buscarClima() {
  const cidade = document.getElementById("cidade").value.trim()
  const apiKey = "b2f4046af3384b2896c152521251508"
  //const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&aqi=yes&lang=pt`
  //days=3 (Quantidade de dias disponível para o plano gratuito)
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=3&aqi=yes&lang=pt`


  try {
    const resposta = await fetch(url) //Envia a requisição HTTP para a API. await faz o JavaScript esperar até que a resposta chegue.
    const dadosDoClima = await resposta.json() // Converte a resposta da API (que vem em formato JSON) para um objeto JavaScript. Agora podemos acessar os dados com: dados.location, dados.current, etc.
    console.log(dadosDoClima) // Para depuração

    if (dadosDoClima.error) {
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
            const removerMensagem = resultadoTextoDaPesquisa.innerHTML = ""
            removerMensagem.remove()
          }
        })
      }

    } else {
      const { location, current } = dadosDoClima;
      let local = document.getElementById("local")
      local.innerHTML = `${location.name},`
      let regiao = document.getElementById("regiao")
      regiao.innerHTML = `${location.region},`
      let pais = document.getElementById("pais")
      pais.innerHTML = `${location.country}.`

      //Função para ajustar data e hora para o padrão BR
      function formatarHorarioPadraoBrasil() {
        const horaAtual = new Date(current.last_updated)
        const horarioBrasil = horaAtual.toLocaleDateString("pt-BR",{
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "numeric",
          year: "numeric"
        })

        return horarioBrasil
      }

      let horarioLocalAtualizado = document.getElementById("horario-dados-atualizado")
      horarioLocalAtualizado.innerHTML = `Dados atualizado ${formatarHorarioPadraoBrasil()} horário local do modelo.`
 
      //Dados das temperaturas
      let tempCelcius = document.getElementById("resultado-Temp-Celsius")
      tempCelcius.innerHTML = `${current.temp_c}°C`
      let tempFahrenheit = document.getElementById("resultado-Temp-Fahrenheit")
      tempFahrenheit.innerHTML = `${current.temp_f}°F`

      //Dados das temperaturas máxima e mínima prevista para o dia
      const forecastDay = dadosDoClima.forecast.forecastday[0].day
      let temperaturaMaxima = document.getElementById("temperatura-Maxima")
      temperaturaMaxima.innerHTML = `${forecastDay.maxtemp_c}°C`
      let temperaturaMinima = document.getElementById("temperatura-Minima")
      temperaturaMinima.innerHTML = `${forecastDay.mintemp_c}°C`

      //Dados das condições climáticas
      let condicaoClimatica = document.getElementById("condition")
      condicaoClimatica.innerHTML = `${current.condition.text}`
      let iconeCondicaoClimatica = document.getElementById("conditionIcon")
      iconeCondicaoClimatica.innerHTML = `<img src="https:${current.condition.icon}" alt="Ícone do clima">`

      //Dados da umidade do ar
      let umidade = document.getElementById("umidade")
      umidade.innerHTML = `${current.humidity}%`

      //Dados sensação térmica
      let sensacaoTermica = document.getElementById("sensacao")
      sensacaoTermica.innerHTML = `${current.feelslike_c}°C`

      //Dados do ponto de orvalho
      let pontoOrvalho = document.getElementById("ponto-orvalho")
      pontoOrvalho.innerHTML = `${current.dewpoint_c}°C`

      //Dados da velocidade do vento
      let velocidadeVentoKmh = document.getElementById("velocidade-Vento-Kmh")
      velocidadeVentoKmh.innerHTML = `${current.wind_kph} Km/h`
      let velocidadeVentoMph = document.getElementById("velocidade-Vento-Mph")
      velocidadeVentoMph.innerHTML = `${current.wind_mph} mph`

      ////Dados da precipitação da chuva em milimetros
      let precipitacao = document.getElementById("precipitacao")
      precipitacao.innerHTML = `${forecastDay.totalprecip_mm} mm`

      //Dados da direção e grau do vento
      const grauDoVento = document.getElementById("grau-Do-Vento")
      const direcaoDoVento = document.getElementById("direcao-Vento")

      //Função para exibir a direção do vento
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

      grauDoVento.innerHTML = `${current.wind_degree}°`
      direcaoDoVento.innerHTML = `${grauParaDirecao(current.wind_degree)}`

      //Dados da visibilidade
      let visibilidadeEmKm = document.getElementById("visibilidade-Km")
      visibilidadeEmKm.innerHTML = `${current.vis_km} Km`
      let visibilidadeEmMilhas = document.getElementById("visibilidade-Miles")
      visibilidadeEmMilhas.innerHTML = `${current.vis_miles} <i>milhas</i>`

      //Dados da qualidade do ar e do poluente
      document.getElementById("pm2_5").innerHTML = `${current.air_quality.pm2_5.toFixed(1)} µg/m³`
      document.getElementById("pm10").innerHTML = `${current.air_quality.pm10.toFixed(1)} µg/m³`
      document.getElementById("o3").innerHTML = `${current.air_quality.o3.toFixed(1)} µg/m³`
      document.getElementById("no2").innerHTML = `${current.air_quality.no2.toFixed(1)} µg/m³`
      document.getElementById("so2").innerHTML = `${current.air_quality.so2.toFixed(1)} µg/m³`
      document.getElementById("co").innerHTML = `${current.air_quality.co.toFixed(1)} µg/m³`

      //Dados da previsão do dia para 3 dias
      async function exibirPrevisao() {
        const containerPrevisoes = document.getElementById("previsoes")
        containerPrevisoes.innerHTML = ''

        dadosDoClima.forecast.forecastday.forEach((dia) => {
          const divDia = document.createElement('div')
          divDia.className = 'dia-previsao'

          const { date, day } = dia;
          const tempMax = day.maxtemp_c;
          const tempMin = day.mintemp_c;
          const condicao = day.condition.text;
          const icone = day.condition.icon;
          const chuva = day.daily_chance_of_rain;
          const uv = day.uv;
          const vento = day.maxwind_kph;
          
          divDia.innerHTML = `
            <div class="card-dia">
              <h3>${formatarData(date)}</h3>
              <img src="https:${icone}" alt="${condicao}" class="icone-clima">
              <p class="condicao">${condicao}</p>
              
              <div class="temperaturas">
                <span class="temp-max">Máxima: <strong>${tempMax}°C</strong></span>
                <span class="temp-min">Mínima: <strong>${tempMin}°C</strong></span>
              </div>
              
              <div class="detalhes">
                <p>💧 Chuva: ${chuva}%</p>
                <p>💨 Vento: ${vento} km/h</p>
                <p>☀️ UV: ${uv.toFixed(1)}</p>
              </div>
            </div>
          `

          containerPrevisoes.appendChild(divDia)
        })
      }
      
      function formatarData(dataString) {
        const formatoDaData = { day: 'numeric', month: 'short' }
        return new Date(dataString).toLocaleDateString('pt-Br', formatarData)
      }

      exibirPrevisao()
    }
  } catch (erro) {
      document.getElementById("resultado").innerHTML = `<p>Erro ao buscar dados.</p>`
      console.error("Erro na requisição:", erro)
  }
}