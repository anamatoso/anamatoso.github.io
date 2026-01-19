/*

TemplateMo 593 personal shape

https://templatemo.com/tm-593-personal-shape

*/

// JavaScript Document

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for portfolio items
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            const portfolioSection = document.querySelector('.portfolio-grid');
            if (portfolioSection) {
                portfolioObserver.observe(portfolioSection);
            }
            // Add GitHub / Paper buttons under tech tags when data attributes are present on portfolio items
            (function addPortfolioActions() {
                const items = document.querySelectorAll('.portfolio-item');
                items.forEach(item => {
                    try {
                        const content = item.querySelector('.portfolio-content');
                        if (!content) return;
                        // ensure an actions container exists
                        let actions = content.querySelector('.portfolio-actions');
                        if (!actions) {
                            actions = document.createElement('div');
                            actions.className = 'portfolio-actions';
                            // insert after .portfolio-tech if present, else append
                            const tech = content.querySelector('.portfolio-tech');
                            if (tech && tech.parentNode) tech.parentNode.insertBefore(actions, tech.nextSibling);
                            else content.appendChild(actions);
                        }

                        const repo = item.dataset.github || item.dataset.repo || item.dataset.githubUrl || item.dataset.githuburl;
                        const paper = item.dataset.paper || item.dataset.paperUrl || item.dataset.paperurl || item.dataset.paperlink;

                        // helper to create anchor
                        function makeButton(href, cls, text) {
                            const a = document.createElement('a');
                            a.className = 'project-btn ' + cls;
                            a.href = href;
                            a.target = '_blank';
                            a.rel = 'noopener';
                            a.textContent = text;
                            return a;
                        }

                        // Clear existing children to avoid duplication (if script runs multiple times)
                        actions.innerHTML = '';

                        if (repo) {
                            actions.appendChild(makeButton(repo, 'github', 'GitHub'));
                        }
                        if (paper) {
                            actions.appendChild(makeButton(paper, 'paper', 'Paper'));
                        }
                        // if neither link present, keep actions empty (no buttons shown)
                    } catch (e) {
                        // ignore per-item errors
                    }
                });
            })();
            // Show only featured items on the main page (index).
            // Mark items as featured by adding: data-featured="true"
            try {
                const path = window.location.pathname || '';
                const isIndex = path === '' || path.endsWith('/') || path.endsWith('index.html');
                if (isIndex) {
                    // Replace homepage portfolio items with the ones marked as featured in portfolio.html
                    (async function populateFeaturedFromPortfolio() {
                        try {
                            console.log('[site] populateFeaturedFromPortfolio: fetching portfolio.html');
                            const res = await fetch('portfolio.html');
                            if (res.ok) {
                                console.log('[site] portfolio.html fetched successfully');
                                const text = await res.text();
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(text, 'text/html');
                                const featured = doc.querySelectorAll('.portfolio-item[data-featured="true"]');
                                console.log('[site] featured items found in portfolio.html:', featured.length);
                                const grid = document.querySelector('#portfolio .portfolio-grid');
                                if (grid && featured.length > 0) {
                                    grid.innerHTML = '';
                                    featured.forEach(item => {
                                        // import node to current document to preserve structure
                                        const imported = document.importNode(item, true);
                                        // Remove inline styles that might be specific to full-portfolio layout
                                        imported.style.display = '';
                                        grid.appendChild(imported);
                                    });

                                } else {
                                    console.log('[site] No featured items found in fetched portfolio.html — applying fallback');
                                    // Fallback: hide non-featured in-place if fetch fails or no featured items
                                    const items = document.querySelectorAll('#portfolio .portfolio-item');
                                    items.forEach(item => {
                                        if (item.dataset.featured !== 'true') item.style.display = 'none';
                                    });
                                }
                            } else {
                                console.log('[site] fetch(portfolio.html) returned non-ok status; applying fallback');
                                // Fallback behavior
                                const items = document.querySelectorAll('#portfolio .portfolio-item');
                                items.forEach(item => {
                                    if (item.dataset.featured !== 'true') item.style.display = 'none';
                                });
                            }
                        } catch (err) {
                            console.error('[site] Could not fetch portfolio.html:', err);
                            // On any error, fallback to hiding non-featured items present in index.html
                            const items = document.querySelectorAll('#portfolio .portfolio-item');
                            items.forEach(item => {
                                if (item.dataset.featured !== 'true') item.style.display = 'none';
                            });
                        }
                    })();

                    // Fetch work.html to populate research counts and recent publications
                    (async function fetchWorkData() {
                        try {
                            const res = await fetch('work.html');
                            if (!res.ok) return;
                            const text = await res.text();
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(text, 'text/html');

                            const pubs = doc.querySelectorAll('.work-entry.publication');
                            // Count total number of location elements inside oral and poster entries
                            const oralNodes = doc.querySelectorAll('#oral-communications .work-entry.oral');
                            const posterNodes = doc.querySelectorAll('#poster-presentations .work-entry.poster');

                            function countLocations(nodeList) {
                                let total = 0;
                                nodeList.forEach(n => {
                                    try {
                                        const locs = n.querySelectorAll('.location');
                                        total += locs.length;
                                    } catch (e) {
                                        // ignore
                                    }
                                });
                                return total;
                            }

                            const oralCountByLocation = countLocations(oralNodes);
                            const posterCountByLocation = countLocations(posterNodes);

                            // Support multiple possible id names used in different versions of the HTML
                            const pubCountEl1 = document.getElementById('pub-count');
                            const pubCountEl2 = document.getElementById('publication-count');
                            const oralCountEl = document.getElementById('oral-count');
                            const posterCountEl = document.getElementById('poster-count');

                            if (pubCountEl1) pubCountEl1.textContent = pubs.length;
                            if (pubCountEl2) pubCountEl2.textContent = pubs.length;
                            if (oralCountEl) oralCountEl.textContent = oralCountByLocation;
                            if (posterCountEl) posterCountEl.textContent = posterCountByLocation;

                            const recentList = document.getElementById('recent-publications-list');
                            if (recentList) {
                                recentList.innerHTML = '';
                                const max = Math.min(2, pubs.length);
                                for (let i = 0; i < max; i++) {
                                    const p = pubs[i];
                                    const authorsEl = p.querySelector('.authors');
                                    const journalEl = p.querySelector('.journal');
                                    const dateEl = p.querySelector('.date');

                                    // Prefer the anchor inside the title (publications use a.work-title-link)
                                    const titleAnchor = p.querySelector('a.work-title-link') || p.querySelector('.work-title a') || p.querySelector('a.external-link');
                                    const titleText = titleAnchor ? titleAnchor.textContent.trim() : (p.querySelector('.work-title') ? p.querySelector('.work-title').textContent.trim() : 'Publication');
                                    const href = titleAnchor ? titleAnchor.href : ('work.html#publications');

                                    const title = titleText;
                                    const authors = authorsEl ? authorsEl.textContent.trim() : '';
                                    const journal = journalEl ? journalEl.textContent.trim() : '';
                                    const date = dateEl ? dateEl.textContent.trim() : '';

                                    const li = document.createElement('li');
                                    // Authors on one line, journal and date on the next (match work.html layout)
                                    const journalPart = journal ? `<span class="journal">${journal}</span>` : '';
                                    const datePart = date ? `<span class="date">${date}</span>` : '';
                                    const sep = (journal && date) ? ' <span class="sep">•</span> ' : '';
                                    li.innerHTML = `
                                        <a href="${href}" target="_blank" rel="noopener">${title}</a>
                                        <div class="meta">
                                            <div class="pub-authors">${authors}</div>
                                            <div class="pub-journal-date">${journalPart}${sep}${datePart}</div>
                                        </div>`;
                                    recentList.appendChild(li);
                                }
                            }
                        } catch (err) {
                            // fail silently
                            console.error('Could not fetch work.html:', err);
                        }
                    })();
                }
            } catch (e) {
                // ignore errors on older browsers
            }
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced form submission with better UX
        document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    const form = e.target;
    
    // Add loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';
    
    try {
        // Get form data
        const formData = new FormData(form);
        
        // Submit to Formspree
        const response = await fetch('https://formspree.io/f/xeqwayrj', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Success state
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Show success animation
            submitBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Reset form after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        } else {
            // Error state
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Error handling
        submitBtn.textContent = 'Error - Try Again';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
        console.error('Form submission error:', error);
    }
});

        // Enhanced parallax effect for hero background
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });