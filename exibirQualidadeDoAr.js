function obterClassificacaoAr(us_epa_index) {
    const classificacoes = {
        1: { 
        label: 'Bom', 
        cor: '#00a651', 
        descricao: 'Qualidade do ar satisfatória',
        emoji: '😊'
        },
        2: { 
        label: 'Moderado', 
        cor: '#ffcc00', 
        descricao: 'Qualidade do ar aceitável',
        emoji: '😐'
        },
        3: { 
        label: 'Prejudicial para grupos sensíveis', 
        cor: '#ff6600', 
        descricao: 'Membros de grupos sensíveis podem sofrer efeitos',
        emoji: '😷'
        },
        4: { 
        label: 'Prejudicial', 
        cor: '#cc0000', 
        descricao: 'Todos podem começar a sofrer efeitos',
        emoji: '😤'
        },
        5: { 
        label: 'Muito prejudicial', 
        cor: '#660099', 
        descricao: 'Risco à saúde aumentado para todos',
        emoji: '🤒'
        },
        6: { 
        label: 'Perigoso', 
        cor: '#7e0000', 
        descricao: 'Alerta de saúde: qualidade do ar perigosa',
        emoji: '⚠️'
        }
  };
}
