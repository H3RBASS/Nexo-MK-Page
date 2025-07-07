        // Añade esto al inicio de tu script.js

// Función para el modo oscuro
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema inicial
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Escuchar clicks en el botón
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });
}

// Modifica el event listener DOMContentLoaded para incluir la nueva función
document.addEventListener('DOMContentLoaded', function() {
    setupThemeToggle(); // Añade esta línea al inicio
    
    // El resto de tu código JavaScript existente...
    const mobileMenu = document.getElementById('mobile-menu');
    // ... resto del código
});
        // Menú móvil
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenu = document.getElementById('nav-menu');
            const featuresDropdown = document.getElementById('features-dropdown');
            
            // Toggle del menú principal
            mobileMenu.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Bloquear scroll cuando el menú está abierto
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Toggle del dropdown en móviles
            if (featuresDropdown) {
                const dropdownLink = featuresDropdown.querySelector('.nav-link');
                
                dropdownLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        featuresDropdown.classList.toggle('active');
                    }
                });
            }
            
            // Cerrar menú al hacer clic en un enlace
            const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown .nav-link)');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && 
                    !mobileMenu.contains(e.target) && 
                    !navMenu.contains(e.target) && 
                    navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Animación para los elementos al hacer scroll
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const fadeInOnScroll = function() {
                fadeElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementTop < windowHeight - 100) {
                        element.style.animation = 'fadeInUp 1s ease forwards';
                        element.style.animationDelay = element.getAttribute('style')?.match(/animation-delay: (.*?);/)?.[1] || '0s';
                    }
                });
            };
            
            // Ejecutar al cargar y al hacer scroll
            fadeInOnScroll();
            window.addEventListener('scroll', fadeInOnScroll);
        });
        