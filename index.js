// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu-desktop');
const body = document.body;
const closeMenu = document.querySelector('.close-menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

// Close menu on close button click
closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
    body.classList.remove('no-scroll');
});

// Smooth scroll and close menu on link click
const menuLinks = document.querySelectorAll('.menu-desktop a');

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (targetId === 'contato') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Close menu
        menu.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});


// Carrossel
const track = document.getElementById('carouselTrack');
const cards = track.querySelectorAll('.card');
const scrollInterval = 4000; // 4 segundos

let currentIndex = 0;
let autoRun;

// Função principal que move o carrossel
function updateCarousel() {
    if (cards.length === 0) return;

    // Calcula a largura de um card incluindo o GAP CSS
    const cardWidth = cards[0].offsetWidth;
    const gap = 20; // Deve ser o mesmo valor do gap no CSS
    
    // Calcula o deslocamento necessário
    const translateX = -(currentIndex * (cardWidth + gap));
    
    // Aplica a transformação CSS para mover a pista suavemente
    track.style.transform = `translateX(${translateX}px)`;
}

// Função para mover (para frente ou para trás) com lógica de loop
function moveCarousel(direction) {
    const cardsVisible = getVisibleCardsCount();
    const maxIndex = cards.length - cardsVisible;

    currentIndex += direction;

    // Lógica de Loop Infinito
    if (currentIndex > maxIndex) {
        currentIndex = 0; // Volta ao início
    } else if (currentIndex < 0) {
        currentIndex = maxIndex; // Vai para o final
    }

    updateCarousel();
}

// Função auxiliar para saber quantos cards estão visíveis (baseado no CSS)
function getVisibleCardsCount() {
    if (window.innerWidth <= 768) return 1; // No mobile, foca em 1
    return 3; // No desktop, definimos 3 no CSS
}

// Controles Manuais (clique nos botões reseta o tempo do auto-play)
function moveManual(direction) {
    stopAutoPlay();
    moveCarousel(direction);
    startAutoPlay();
}

// Funções de Auto-Play
function startAutoPlay() {
    stopAutoPlay(); // Garante que não haja múltiplos intervalos
    autoRun = setInterval(() => moveCarousel(1), scrollInterval);
}

function stopAutoPlay() {
    clearInterval(autoRun);
}

// --- Eventos ---

// Inicia o auto-play
startAutoPlay();

// Ajusta a posição se a janela for redimensionada
window.addEventListener('resize', updateCarousel);

// Pausa ao passar o mouse ou tocar (melhor UX)
const container = document.querySelector('.carousel-container');
container.addEventListener('mouseenter', stopAutoPlay);
container.addEventListener('mouseleave', startAutoPlay);
container.addEventListener('touchstart', stopAutoPlay, {passive: true});
container.addEventListener('touchend', startAutoPlay);