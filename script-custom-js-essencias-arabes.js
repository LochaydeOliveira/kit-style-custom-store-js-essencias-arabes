(function() {
    // ============================================================
    // PARTE 1: Lógica de Ocultar Elementos (Anterior)
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
    // PARTE 2: Lógica do Slide Automático (Nova)
    // ============================================================
    
    function ativarSlideAutomatico() {
        // O ID do slide no seu HTML é 'splide02'
        const seletorSlide = '#splide02';
        const elementoSlide = document.querySelector(seletorSlide);

        // Verifica se o slide realmente existe nesta página
        if (elementoSlide && window.Splide) {
            
            // Cria uma nova instância do Splide apontando para o elemento existente.
            // O Splide.js é inteligente o suficiente para reconhecer que ele já foi 
            // inicializado e vai apenas atualizar as configurações.
            new Splide(seletorSlide, {
                type      : 'loop',      // Faz o slide voltar ao início infinitamente
                autoplay  : true,        // Ativa o modo automático
                interval  : 3000,        // Tempo entre os slides (em milissegundos, 3000 = 3 segundos)
                pauseOnHover: true,      // Pausa o autoplay quando o mouse está em cima
                arrows    : true,        // Mantém as setas ativas
                pagination: false,       // Desativa as bolinhas de paginação (opcional)
                perPage   : 1,           // Mostra 1 slide por vez (ajuste conforme necessário)
                breakpoints: {           // Configurações para mobile
                    768: {
                        perPage: 1,
                    }
                }
            }).mount(); // O método .mount() aplica as configurações

            console.log('Autoplay ativado para o slide:', seletorSlide);
        } else {
            console.warn('Slide #splide02 ou biblioteca Splide não encontrados.');
        }
    }

    // ============================================================
    // EXECUÇÃO
    // ============================================================

    // Executa as funções assim que o DOM básico estiver pronto
    function inicializar() {
        gerenciarVisibilidade();
        ativarSlideAutomatico();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }
})();