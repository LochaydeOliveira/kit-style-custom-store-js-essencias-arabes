(function() {
    // 1. Injeta o CSS imediatamente para garantir que os elementos fiquem ocultos
    // mesmo que o resto da página ainda esteja carregando.
    const style = document.createElement('style');
    style.innerHTML = `
        .alert.-yellow, 
        .section-pages .holder-content .pages { 
            display: none !important; 
        }
    `;
    document.head.appendChild(style);

    // 2. Função para verificar a URL e decidir se mostra os elementos
    function gerenciarVisibilidade() {
        const urlAtual = window.location.href;

        // Se NÃO contiver "sobre-nos", nós removemos a ocultação (exibimos)
        if (!urlAtual.includes("sobre-nos")) {
            style.innerHTML = ''; // Limpa o CSS de ocultação que criamos acima
        }
    }

    // Executa assim que o DOM básico estiver pronto (mais rápido que o 'load')
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', gerenciarVisibilidade);
    } else {
        gerenciarVisibilidade();
    }
})();