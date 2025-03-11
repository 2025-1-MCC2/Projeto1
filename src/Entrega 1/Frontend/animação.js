const text = "O Instituto Criativo é uma ONG que nasceu para transformar a vida das pessoas por meio da educação criativa e inovadora!";
const typingElement = document.getElementById("typingEffect");
let index = 0;

function type() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100);  // Ajuste a velocidade da digitação
    }

}

// Função para trocar a posição de duas imagens
function trocarPosicoes(imagem1, imagem2) {
    // Captura o elemento pai (container da galeria)
    const galeria = document.querySelector('.galeria-unica');
  
    // Cria um elemento temporário para ajudar na troca
    const temp = document.createElement('div');
    galeria.insertBefore(temp, imagem1); // Insere o temp antes da imagem1
    galeria.insertBefore(imagem1, imagem2); // Move a imagem1 para antes da imagem2
    galeria.insertBefore(imagem2, temp); // Move a imagem2 para antes do temp
    galeria.removeChild(temp); // Remove o temp
  }
  
  // Função para trocar as imagens aleatoriamente
  function trocarImagensAleatoriamente() {
    // Seleciona todas as imagens da galeria
    const imagens = document.querySelectorAll('.galeria-imagem-unica');
    const imagensArray = Array.from(imagens); // Converte NodeList para array
  
    // Seleciona duas imagens aleatórias
    const indice1 = Math.floor(Math.random() * imagensArray.length);
    let indice2 = Math.floor(Math.random() * imagensArray.length);
  
    // Garante que as duas imagens sejam diferentes
    while (indice2 === indice1) {
      indice2 = Math.floor(Math.random() * imagensArray.length);
    }
  
    // Troca as posições das duas imagens
    trocarPosicoes(imagensArray[indice1], imagensArray[indice2]);
  }
  
  // Inicia a troca automática de imagens
  setInterval(trocarImagensAleatoriamente, 500); // Troca a cada 70 milissegundos


  document.addEventListener("DOMContentLoaded", function () {
    // Função para animar os números
    function animateNumber(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 16ms é o tempo aproximado de um frame

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }, 16); // 16ms para uma animação suave
    }

    // Configuração do Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Quando o elemento entra na viewport, anima os números
                    const targetNumbers = {
                        big: 30000, // Número grande
                        num1: 2500, // Primeiro número menor
                        num2: 20000, // Segundo número menor
                        num3: 100, // Terceiro número menor
                    };

                    // Anima o número grande
                    const bigNumber = entry.target.querySelector(".impact-highlight .impact-number");
                    if (bigNumber) {
                        animateNumber(bigNumber, targetNumbers.big, 2000);
                    }

                    // Anima os números menores
                    const numbers = entry.target.querySelectorAll(".impact-grid .impact-number");
                    if (numbers.length >= 3) {
                        animateNumber(numbers[0], targetNumbers.num1, 2000);
                        animateNumber(numbers[1], targetNumbers.num2, 2000);
                        animateNumber(numbers[2], targetNumbers.num3, 2000);
                    }

                    // Para de observar após a animação ser disparada
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5, // Dispara a animação quando 50% do elemento estiver visível
        }
    );

    // Observa o container dos números
    const numerosContainer = document.querySelector(".impact-section");
    if (numerosContainer) {
        observer.observe(numerosContainer);
    }
});

document.addEventListener("DOMContentLoaded", function () {
  // URLs das imagens (substitua pelos caminhos reais das imagens)
  const imagens = [
      "img/lucy_mari.jpg",
      "img/rodrigo_assirati.jpg"
  ];

  // Seleciona todos os placeholders de imagem
  const placeholders = document.querySelectorAll(".imagem-placeholder");

  // Adiciona as imagens aos placeholders
  placeholders.forEach((placeholder, index) => {
      const img = document.createElement("img");
      img.src = imagens[index];
      img.alt = "Foto do voluntário";
      img.style.width = "120%";
      img.style.height = "100%";
      img.style.borderRadius = "10px"; // Bordas levemente arredondadas
      placeholder.innerHTML = ""; // Remove o fundo cinza
      placeholder.appendChild(img); // Adiciona a imagem
  });
});

const carouselContainer = document.querySelector('.carousel-container');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length / 2; // Consideramos apenas os itens originais
let currentIndex = 0;

function updateCarousel() {
    const offset = -currentIndex * (100 / totalItems);
    carouselContainer.style.transform = `translateX(${offset}%)`;

    // Reseta a posição quando chega ao final
    if (currentIndex >= totalItems) {
        setTimeout(() => {
            carouselContainer.style.transition = 'none'; // Desativa a transição
            currentIndex = 0;
            carouselContainer.style.transform = `translateX(0%)`;
            setTimeout(() => {
                carouselContainer.style.transition = 'transform 0.5s ease-in-out'; // Reativa a transição
            }, 50);
        }, 500); // Tempo da transição
    }
}

function nextItem() {
    currentIndex++;
    updateCarousel();
}

function prevItem() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

document.querySelector('.carousel-button.next').addEventListener('click', nextItem);
document.querySelector('.carousel-button.prev').addEventListener('click', prevItem);

// Opcional: Autoplay (roda automaticamente)
setInterval(nextItem, 3000); // Altere 3000 para o tempo desejado em milissegundos

const marcasCarouselContainer = document.querySelector('.marcas-carousel-container');
const marcasItems = document.querySelectorAll('.marcas-carousel-item');
const totalMarcasItems = marcasItems.length;
const visibleMarcasItems = 5; // Número de itens visíveis por vez
let currentMarcasIndex = 0;

// Função para mover o carrossel de marcas
function moveMarcasCarousel() {
    const offset = -currentMarcasIndex * (100 / visibleMarcasItems);
    marcasCarouselContainer.style.transform = `translateX(${offset}%)`;
}

// Função para avançar automaticamente
function autoRotateMarcas() {
    currentMarcasIndex = (currentMarcasIndex + 1) % (totalMarcasItems - visibleMarcasItems + 1);
    moveMarcasCarousel();
}

// Inicia a rotação automática
setInterval(autoRotateMarcas, 3000); // Muda a cada 3 segundos (ajuste conforme necessário)