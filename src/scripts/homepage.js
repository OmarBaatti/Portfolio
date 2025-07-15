// Soft Skills Carousel 3D
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('softSkillsCarousel');
    const prevBtn = document.getElementById('prevSoftSkill');
    const nextBtn = document.getElementById('nextSoftSkill');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    const cards = carousel.querySelectorAll('.soft-skill-card');
    const totalCards = cards.length;
    const angleStep = 360 / totalCards;
    let currentAngle = 0;
    
    // Posiziona le carte inizialmente
    function initializeCards() {
        cards.forEach((card, index) => {
            const angle = index * angleStep;
            card.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(400px)`;
            
            // Aggiungi click listener per navigazione diretta
            card.addEventListener('click', () => {
                if (!card.classList.contains('active')) {
                    goToCard(index);
                }
            });
        });
        updateActiveCard();
    }
    
    // Vai direttamente a una carta specifica
    function goToCard(targetIndex) {
        const targetAngle = -targetIndex * angleStep;
        currentAngle = targetAngle;
        updateActiveCard();
    }
    
    // Aggiorna la carta attiva
    function updateActiveCard() {
        const activeIndex = Math.round((-currentAngle % 360) / angleStep);
        const normalizedIndex = ((activeIndex % totalCards) + totalCards) % totalCards;
        
        cards.forEach((card, index) => {
            if (index === normalizedIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
    }
    
    // Ruota il carosello
    function rotateCarousel(direction) {
        currentAngle += direction * angleStep;
        updateActiveCard();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => rotateCarousel(-1));
    prevBtn.addEventListener('click', () => rotateCarousel(1));
    
    // RIMOSSA LA ROTAZIONE AUTOMATICA
    
    // Gestione touch per dispositivi mobili
    let startX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                rotateCarousel(-1);
            } else {
                rotateCarousel(1);
            }
        }
        
        isDragging = false;
    });
    
    // Inizializza il carosello
    initializeCards();
});