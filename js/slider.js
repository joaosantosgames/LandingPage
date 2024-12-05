// NEW SLIDER
class Carousel {
    constructor(container, autoPlay = true, intervalTime = 3000) {
        this.container = container;
        this.sliders = container.querySelector('.featSlides');
        this.sliderItems = Array.from(container.querySelectorAll('.featSlide'));
        this.nextButton = container.querySelector('.featControl.Next');
        this.prevButton = container.querySelector('.featControl.Prev');
        this.indicators = Array.from(container.querySelectorAll('.featIndicator'));
        this.currentIndex = 0;
        this.autoPlay = autoPlay;
        this.intervalTime = intervalTime;
        this.slideInterval = null;

        this.cloneSlides();
        this.addEventListeners();
        this.updateIndicators();
        this.sliders.style.transform = 'translateX(-100%)'; // Start at the first real slide

        if (this.autoPlay) {
            this.startSlideShow();
        }
    }

    cloneSlides() {
        const firstClone = this.sliderItems[0].cloneNode(true);
        const lastClone = this.sliderItems[this.sliderItems.length - 1].cloneNode(true);
        this.sliders.appendChild(firstClone);
        this.sliders.insertBefore(lastClone, this.sliderItems[0]);
    }

    showSlide(index) {
        this.sliders.style.transition = 'transform 0.5s ease-in-out';
        this.currentIndex = index;
        this.sliders.style.transform = `translateX(-${(this.currentIndex + 1) * 100}%)`;

        if (this.currentIndex === this.sliderItems.length) {
            setTimeout(() => {
                this.sliders.style.transition = 'none';
                this.currentIndex = 0;
                this.sliders.style.transform = `translateX(-${(this.currentIndex + 1) * 100}%)`;
            }, 500);
        } else if (this.currentIndex === -1) {
            setTimeout(() => {
                this.sliders.style.transition = 'none';
                this.currentIndex = this.sliderItems.length - 1;
                this.sliders.style.transform = `translateX(-${(this.currentIndex + 1) * 100}%)`;
            }, 500);
        }

        this.updateIndicators();
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }

    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }

    updateIndicators() {
        let realIndex = (this.currentIndex + this.sliderItems.length) % this.sliderItems.length;
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realIndex);
        });
    }

    startSlideShow() {
        this.slideInterval = setInterval(() => this.nextSlide(), this.intervalTime);
    }

    stopSlideShow() {
        clearInterval(this.slideInterval);
    }

    addEventListeners() {
        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
            this.stopSlideShow();
            if (this.autoPlay) this.startSlideShow();
        });

        this.prevButton.addEventListener('click', () => {
            this.prevSlide();
            this.stopSlideShow();
            if (this.autoPlay) this.startSlideShow();
        });

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.showSlide(index);
                this.stopSlideShow();
                if (this.autoPlay) this.startSlideShow();
            });
        });
    }
}

// Iniciar sliders
//new Carousel(document.getElementById('slider1'), true); // Com auto-play
new Carousel(document.getElementById('highlights'), true); // Sem auto-play