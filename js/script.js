document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use device preference
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the theme
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Reading time calculation
    function calculateReadingTime() {
        const text = document.querySelector('.essay-content').textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 250); // Average reading speed 250 wpm
        document.getElementById('readingTime').innerHTML = `<i class="far fa-clock"></i> ${readingTime} min read`;
    }
    calculateReadingTime();
    
    // Progress bar functionality
    function updateProgressBar() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrollDistance = scrollHeight - clientHeight;
        const scrolled = (scrollTop / scrollDistance) * 100;
        
        document.getElementById('progressBar').style.width = scrolled + '%';
    }
    
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initialize progress bar
    
    // Smooth scrolling for table of contents links
    document.querySelectorAll('#toc a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting in TOC
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentActiveSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentActiveSection = section.getAttribute('id');
            }
        });
        
        // Remove previous active class and add to current
        document.querySelectorAll('#toc a').forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href').substring(1);
            if (href === currentActiveSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initialize section highlighting
    
    // Add CSS for active TOC item
    const style = document.createElement('style');
    style.textContent = `
        #toc a.active {
            font-weight: bold;
            color: var(--progress-bar-color);
        }
    `;
    document.head.appendChild(style);
    
    // Citation tooltips
    document.querySelectorAll('blockquote cite').forEach(citation => {
        citation.setAttribute('title', 'Click to see full citation information');
        citation.style.cursor = 'pointer';
        
        citation.addEventListener('click', function() {
            // In a real implementation, this would show a modal with citation details
            alert('Full citation information would appear here.');
        });
    });
});
