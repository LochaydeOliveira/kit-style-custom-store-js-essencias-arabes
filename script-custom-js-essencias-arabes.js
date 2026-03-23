(function() {
    // ============================================================
    // PARTE 1: Lógica de Ocultar Elementos (Mantida)
    // ============================================================
    
    // 1. Injeta o CSS imediatamente para ocultar os elementos por padrão
    const style = document.createElement('style');
    style.id = 'style-ocultar-elementos';
    style.innerHTML = `
        .alert.-yellow, 
        .section-pages .holder-content .pages,
        .category-options > div { 
            display: none !important; 
        }
    `;
    document.head.appendChild(style);

    // Função para decidir se mantém oculto ou se exibe
    function gerenciarVisibilidade() {
        const urlAtual = window.location.href;

        // Se a URL NÃO contiver "sobre-nos", nós removemos a ocultação para mostrar os elementos
        if (!urlAtual.includes("sobre-nos")) {
            const cssInjetado = document.getElementById('style-ocultar-elementos');
            if (cssInjetado) {
                cssInjetado.remove(); // Remove o bloco de CSS, voltando ao normal da loja
            }
        }
    }

    // ============================================================
    // PARTE 2: Lógica do Slide Automático (Simulação de Clique)
    // ============================================================
    
    let intervaloSimulacaoClique;
    const tempoEntreSlides = 3000; // 3 segundos (em milissegundos)

    function simularCliqueProximoSlide() {
        // Procura o botão "Próximo" (Next) dentro da seção de destaques
        const botaoProximo = document.querySelector('.highlight .splide__arrow--next');

        if (botaoProximo) {
            // Verifica se o botão não está desativado (disabled)
            // Se o Splide nativo da Yampi chegar ao fim e não estiver em loop, 
            // ele pode desativar o botão.
            if (!botaoProximo.disabled) {
                botaoProximo.click(); // Simula o clique
                console.log('Simulando clique no próximo slide (Autoplay forçado).');
            } else {
                console.log('Botão próximo desativado. Tentando voltar ao primeiro slide.');
                // Se estiver desativado, tentamos clicar no botão "Anterior" repetidamente
                // para voltar ao início, simulando um loop.
                retornarAoInicio();
            }
        }
    }

    function retornarAoInicio() {
        const botaoAnterior = document.querySelector('.highlight .splide__arrow--prev');
        if (botaoAnterior) {
            // Clica no anterior até que ele fique desativado (chegou no primeiro)
            let loopRetorno = setInterval(() => {
                if (botaoAnterior && !botaoAnterior.disabled) {
                    botaoAnterior.click();
                } else {
                    clearInterval(loopRetorno);
                    console.log('Retornou ao primeiro slide.');
                }
            }, 100); // Clica rápido para voltar
        }
    }

    function iniciarAutoplayForcado() {
        // Limpa qualquer intervalo anterior para evitar duplicidade
        clearInterval(intervaloSimulacaoClique);

        // Verifica se o slide existe na página
        if (document.querySelector('.highlight .splide')) {
            // Inicia o intervalo para clicar a cada X segundos
            intervaloSimulacaoClique = setInterval(simularCliqueProximoSlide, tempoEntreSlides);
            console.log('Autoplay forçado iniciado (clique simulado a cada ' + tempoEntreSlides/1000 + 's).');
        }
    }

    // ============================================================
    // EXECUÇÃO
    // ============================================================

    // 1. A ocultação roda IMEDIATAMENTE (é a mais rápida)
    gerenciarVisibilidade();

    // 2. A simulação do clique começa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarAutoplayForcado);
    } else {
        iniciarAutoplayForcado();
    }
})();