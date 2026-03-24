// (function() {

//     const style = document.createElement('style');
//     style.id = 'style-ocultar-elementos';
//     style.innerHTML = `
//         .alert.-yellow, 
//         .section-pages .holder-content .pages,
//         .category-options > div { 
//             display: none !important; 
//         }
//     `;
//     document.head.appendChild(style);

//     function gerenciarVisibilidade() {
//         const urlAtual = window.location.href;

//         if (!urlAtual.includes("sobre-nos")) {
//             const cssInjetado = document.getElementById('style-ocultar-elementos');
//             if (cssInjetado) {
//                 cssInjetado.remove();
//             }
//         }
//     }

//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', gerenciarVisibilidade);
//     } else {
//         gerenciarVisibilidade();
//     }
// })();