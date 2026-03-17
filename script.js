document.addEventListener('DOMContentLoaded', () => {

    /* Update Year */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------------------------------
       CUSTOM CURSOR
    -----------------------------------*/
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    const hoverables = document.querySelectorAll('a, .bento-item, button');

    if (cursor && dot) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Adding a small delay to the outer ring for a trailing effect
            setTimeout(() => {
                cursor.style.left = `${x}px`;
                cursor.style.top = `${y}px`;
            }, 50);

            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
        });

        // Hover states on interactive elements
        hoverables.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
                dot.style.display = 'none';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
                dot.style.display = 'block';
            });
        });
    }

    /* ---------------------------------
       HEADER SCROLL HIDE
    -----------------------------------*/
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                if (window.scrollY > lastScrollY) {
                    // Scrolling down
                    header.classList.add('hidden');
                } else {
                    // Scrolling up
                    header.classList.remove('hidden');
                }
            } else {
                header.classList.remove('hidden');
            }
            lastScrollY = window.scrollY;
        }, { passive: true });
    }


    /* ---------------------------------
       INTERSECTION OBSERVER (FADE IN)
    -----------------------------------*/
    const bentoItems = document.querySelectorAll('.bento-item');
    
    if (bentoItems.length > 0) {
        // Initial state for animation
        bentoItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        bentoItems.forEach(item => observer.observe(item));
    }


    /* ---------------------------------
       CARD HOVER GLOW EFFECT 
       (Dynamically tracks mouse position inside cards)
    -----------------------------------*/
    document.querySelectorAll('.bento-item').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Apply radial gradient that tracks the mouse
            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px, 
                    rgba(255, 255, 255, 0.05) 0%, 
                    transparent 40%
                ),
                rgba(18, 18, 18, 0.6)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(18, 18, 18, 0.6)';
        });
    });


    /* ---------------------------------
       TERMINAL BOOT SEQUENCE (index.html)
    -----------------------------------*/
    const bootContainer = document.getElementById('boot-sequence');
    if (bootContainer) {
        const text = "Initializing System Sequence...";
        const lines = [
            "Loading core modules. . . [OK]",
            "Fetching UI components. . [OK]",
            "Establishing connection . [OK]",
            "Bypassing security protocols. . . ",
            "Access Granted."
        ];
        
        const typeContainer = document.getElementById('typing-header');
        const logsContainer = document.getElementById('boot-logs');
        
        // Typewriter effect
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typeContainer.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Drop lines
                dropLines(0);
            }
        }

        function dropLines(index) {
            if (index < lines.length) {
                const p = document.createElement('div');
                p.style.marginBottom = '0.5rem';
                
                if (index === lines.length - 1) {
                    p.innerHTML = `<span style="color: var(--accent-base)">${lines[index]}</span>`;
                } else {
                    p.textContent = lines[index];
                }
                
                logsContainer.appendChild(p);
                
                setTimeout(() => dropLines(index + 1), 300 + Math.random() * 500);
            } else {
                // Done loading, show button
                setTimeout(() => {
                    const btn = document.createElement('a');
                    btn.href = 'home.html';
                    btn.className = 'btn-tech';
                    btn.style.marginTop = '2rem';
                    btn.style.animation = 'pulse 2s infinite';
                    btn.innerHTML = 'Initialize <span class="cmd-dot g" style="margin-left:8px;"></span>';
                    logsContainer.appendChild(btn);
                }, 800);
            }
        }

        setTimeout(typeWriter, 500);
    }
});
