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
    // PARTE 2: Lógica do Slide Automático (Mais Robusta)
    // ============================================================
    
    let tentativasAutoplay = 0;
    const maxTentativas = 40; // Tenta por até 20 segundos (40 * 500ms)

    function tentarAtivarAutoplay() {
        tentativasAutoplay++;

        // Procura por qualquer elemento com a classe .splide dentro da seção de destaques
        const elementoSlide = document.querySelector('.highlight .splide');

        // VERIFICAÇÃO CRÍTICA: O elemento E a biblioteca Splide existem?
        // Verificamos window.Splide e também tentamos acessar Splide diretamente
        const splideDisponivel = window.Splide || (typeof Splide !== 'undefined');

        if (elementoSlide && splideDisponivel) {
            
            // Sucesso! Vamos configurar.
            try {
                // Usamos o elemento encontrado diretamente, em vez do ID
                new Splide(elementoSlide, {
                    type      : 'loop',      
                    autoplay  : true,        
                    interval  : 3000,        
                    pauseOnHover: true,      
                    arrows    : true,        
                    pagination: false,       
                    perPage   : 1,           
                    breakpoints: {           
                        768: { perPage: 1 }
                    }
                }).mount();

                console.log('Autoplay do Splide ativado com sucesso após ' + tentativasAutoplay + ' tentativas.');
                
                // Pára de tentar
                clearInterval(intervaloAutoplay);
            } catch (erro) {
                console.error('Erro ao tentar montar o Splide:', erro);
                // Se der erro, para de tentar para não travar a página
                clearInterval(intervaloAutoplay);
            }

        } else if (tentativasAutoplay >= maxTentativas) {
            // Desiste após muitas tentativas frustradas
            console.warn('Desistindo de ativar o autoplay. O elemento .splide ou a biblioteca Splide.js não carregaram a tempo.');
            console.log('Verificando se o elemento existe:', elementoSlide);
            console.log('Verificando se a biblioteca Splide está disponível:', splideDisponivel);
            clearInterval(intervaloAutoplay);
        }
        // Se ainda não achou e não estourou o limite, o intervalo continua...
    }

    // Define o intervalo para tentar a cada 500 milissegundos (meio segundo)
    let intervaloAutoplay;

    // ============================================================
    // EXECUÇÃO
    // ============================================================

    // 1. A ocultação roda IMEDIATAMENTE (é a mais rápida)
    gerenciarVisibilidade();

    // 2. A tentativa do slide começa no DOMContentLoaded, mas aguarda a biblioteca
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            intervaloAutoplay = setInterval(tentarAtivarAutoplay, 500);
        });
    } else {
        intervaloAutoplay = setInterval(tentarAtivarAutoplay, 500);
    }
})();