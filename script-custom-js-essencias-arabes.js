// Função para verificar a URL e ocultar o elemento
function ocultarAlerta() {
  // Obtém a URL atual
  const urlAtual = window.location.href;

  // Verifica se a URL contém "sobre-nos"
  if (urlAtual.includes("sobre-nos")) {
    // Seleciona o elemento que você deseja ocultar
    const elementoAlerta = document.querySelector(".alert.-yellow");

    // Se o elemento existir, oculta-o
    if (elementoAlerta) {
      elementoAlerta.style.display = "none";
    }
  }
}

// Executa a função quando a página for carregada
window.addEventListener("load", ocultarAlerta);