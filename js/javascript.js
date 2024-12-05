document.addEventListener('DOMContentLoaded', () => {
    const itens = document.querySelectorAll('#sobre ul li');
    let currentIndex = 0;
    let interval;
    let isPaused = false;

    const startRotation = () => {
        interval = setInterval(() => {
            if (!isPaused) {
                itens[currentIndex].classList.remove('hovered');
                currentIndex = (currentIndex + 1) % itens.length;
                itens[currentIndex].classList.add('hovered');
            }
        }, 3000); // Intervalo de 3 segundos
    };

    const stopRotation = () => {
        clearInterval(interval);
    };

    itens.forEach(item => {
        item.addEventListener('mouseenter', () => {
            isPaused = true;
            itens[currentIndex].classList.remove('hovered');
        });

        item.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    });

    startRotation();
});


// Document Object Model
document.addEventListener('scroll', roll);


function roll() {
    var btn = document.getElementById("btnUp");
    var altura = window.innerHeight
    var posAtual = window.scrollY;
    var w = window.innerWidth;
    var lastPos = 0;
    if (posAtual > 80) {
        btn.classList.remove('ocultar')
        btn.classList.add('mostrar')
        console.log('trocou')
    } if (posAtual == 0) {
        btn.classList.remove('mostrar')
        btn.classList.add('ocultar')
        console.log('trocou-de-novo')
    }

    lastPos = posAtual;
}