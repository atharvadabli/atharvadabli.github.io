function applyCaptionPreference(showCaptions) {
    document.body.classList.toggle('hide-captions', !showCaptions);
}

function initializeSlideshows() {
    document.querySelectorAll('.photo-slideshow').forEach((slideshow) => {
        const slides = Array.from(slideshow.querySelectorAll('.photo-card'));
        if (!slides.length) return;

        let activeIndex = 0;
        const controls = document.createElement('div');
        controls.className = 'slideshow-controls';

        const previousButton = document.createElement('button');
        previousButton.type = 'button';
        previousButton.className = 'slideshow-button';
        previousButton.setAttribute('aria-label', 'Previous photo');
        previousButton.innerHTML = '<i data-lucide="chevron-left" class="w-5 h-5"></i>';

        const counter = document.createElement('p');
        counter.className = 'slideshow-counter';

        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.className = 'slideshow-button';
        nextButton.setAttribute('aria-label', 'Next photo');
        nextButton.innerHTML = '<i data-lucide="chevron-right" class="w-5 h-5"></i>';

        controls.append(previousButton, counter, nextButton);

        const thumbs = document.createElement('div');
        thumbs.className = 'slideshow-thumbs';
        const thumbButtons = slides.map((slide, index) => {
            const img = slide.querySelector('img');
            const thumb = document.createElement('button');
            thumb.type = 'button';
            thumb.className = 'slideshow-thumb';
            thumb.setAttribute('aria-label', `Show photo ${index + 1}`);
            if (img) {
                const thumbImg = document.createElement('img');
                thumbImg.src = img.currentSrc || img.src;
                thumbImg.alt = '';
                thumbImg.loading = 'lazy';
                thumb.appendChild(thumbImg);
            }
            thumb.addEventListener('click', () => showSlide(index));
            thumbs.appendChild(thumb);
            return thumb;
        });

        function showSlide(index) {
            activeIndex = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('is-active', slideIndex === activeIndex);
            });
            thumbButtons.forEach((thumb, thumbIndex) => {
                thumb.classList.toggle('is-active', thumbIndex === activeIndex);
            });
            counter.textContent = `${activeIndex + 1} / ${slides.length}`;
        }

        previousButton.addEventListener('click', () => showSlide(activeIndex - 1));
        nextButton.addEventListener('click', () => showSlide(activeIndex + 1));
        slideshow.append(controls, thumbs);
        showSlide(0);
    });
}

initializeSlideshows();

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
