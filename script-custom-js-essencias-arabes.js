(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .alert.-yellow, 
        .section-pages .holder-content .pages { 
            display: none !important; 
        }
    `;
    document.head.appendChild(style);

    function gerenciarVisibilidade() {
        const urlAtual = window.location.href;
        if (!urlAtual.includes("sobre-nos")) {
            style.innerHTML = '';
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', gerenciarVisibilidade);
    } else {
        gerenciarVisibilidade();
    }
})();