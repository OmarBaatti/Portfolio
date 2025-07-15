// SCRIPT PER AGGIUNGERE UN PEZZO AL LINEAR GRADIENT DEL HEADER H1 IN BASE ALLA POSIZIONE DEL MOUSE
const button = document.getElementById("scrollb");
button.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
window.addEventListener("scroll", () => {
    if (window.scrollY >= 500 ) { // 5 scrolls give precisely 500px so >=
        button.classList.add("visible");
    } else {
        button.classList.remove("visible");
    }
});




const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    function handleMenuVisibility() {
        if (window.innerWidth <= 480) {
            menuToggle.style.display = 'block';
            if (!mobileMenu.classList.contains('mobile-visible')) {
                mobileMenu.style.display = 'none';
            }
        } else {
            menuToggle.style.display = 'none';
            mobileMenu.style.display = 'flex';
            mobileMenu.classList.remove('mobile-visible');
        }
    }
    handleMenuVisibility();
    window.addEventListener('resize', handleMenuVisibility);
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('mobile-visible');
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 480) {
                mobileMenu.classList.remove('mobile-visible');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}
