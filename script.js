
// Check if user is signed up
function checkAuth() {
    const userData = JSON.parse(localStorage.getItem('luqmarUserData'));
    if (!userData && !window.location.pathname.includes('signup.html')) {
        window.location.href = '/signup.html';
    }
}

// Initialize horizontal scroll and moon phase
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
feather.replace();

    // Update moon phase visualization based on cycle day
    function updateMoonPhase() {
        const cyclePhases = JSON.parse(sessionStorage.getItem('cyclePhases'));
        const userData = JSON.parse(localStorage.getItem('luqmarUserData'));
        
        // Example calculation - in a real app you'd use actual cycle data
        const cycleDay = 7; // Example day
        const totalDays = 28; // Example cycle length
        
        let phase = 'follicular';
        let phaseName = 'Waxing Crescent';
        let phaseDescription = 'Energy is building';
        let moonStyle = 'radial-gradient(circle at 30% 30%, transparent 60%, #6d4b77 60%)';
        
        if (cycleDay <= 5) {
            phase = 'menstrual';
            phaseName = 'New Moon Phase';
            phaseDescription = 'Time for rest and reflection';
            moonStyle = 'radial-gradient(circle at 70% 30%, transparent 60%, #6d4b77 60%)';
        } else if (cycleDay >= 10 && cycleDay <= 14) {
            phase = 'ovulation';
            phaseName = 'Full Moon Phase';
            phaseDescription = 'Peak energy and creativity';
            moonStyle = 'radial-gradient(circle at 50% 50%, #6d4b77 0%, #6d4b77 100%)';
        } else if (cycleDay >= 22) {
            phase = 'luteal';
            phaseName = 'Waning Gibbous';
            phaseDescription = 'Prepare for transition';
            moonStyle = 'radial-gradient(circle at 70% 30%, #6d4b77 60%, transparent 60%)';
        }
        
        // Update UI
        document.querySelector('.moon-phase').style.background = moonStyle;
        document.getElementById('current-phase-name').textContent = phaseName;
        document.getElementById('current-cycle-day').textContent = cycleDay;
        document.getElementById('days-until-next').textContent = `${totalDays - cycleDay} days until next cycle`;
        document.getElementById('cycle-progress').style.width = `${(cycleDay / totalDays) * 100}%`;
    }
    
    updateMoonPhase();

    // Horizontal scroll navigation
    const main = document.querySelector('main');
    let isDown = false;
    let startX;
    let scrollLeft;

    main.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - main.offsetLeft;
        scrollLeft = main.scrollLeft;
    });

    main.addEventListener('mouseleave', () => {
        isDown = false;
    });

    main.addEventListener('mouseup', () => {
        isDown = false;
    });

    main.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - main.offsetLeft;
        const walk = (x - startX) * 2;
        main.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    main.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - main.offsetLeft;
        scrollLeft = main.scrollLeft;
    });

    main.addEventListener('touchend', () => {
        isDown = false;
    });

    main.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - main.offsetLeft;
        const walk = (x - startX) * 2;
        main.scrollLeft = scrollLeft - walk;
    });
// Track current cycle phase (example data)
    const cyclePhases = {
        'menstrual': { 
            name: 'New Moon Phase', 
            color: '#6d4b77',
description: 'Time for rest and reflection'
        },
        'follicular': { 
            name: 'Waxing Crescent', 
            color: '#46a3ff',
            description: 'Energy is building'
        },
        'ovulation': { 
            name: 'Full Moon Phase', 
            color: '#ff6b6b',
            description: 'Peak energy and creativity'
        },
        'luteal': { 
            name: 'Waning Gibbous', 
            color: '#ffb946',
            description: 'Prepare for transition'
        }
    };
    
    // Store in session for use across pages
    sessionStorage.setItem('cyclePhases', JSON.stringify(cyclePhases));
    // Example user data
    const userData = {
        name: 'Cosmic Explorer',
        cycleLength: 28,
        lastPeriodStart: new Date().toISOString(),
        moodTrends: [],
        symptoms: [],
        currentPhase: 'menstrual' // Track current cycle phase for nutrition
    };
localStorage.setItem('luqmarUserData', JSON.stringify(userData));
});
// Community interactions
function setupCommunity() {
    // Like post functionality
    document.querySelectorAll('.community-post [data-feather="heart"]').forEach(icon => {
        icon.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const heart = this.querySelector('i');
            if (heart.classList.contains('text-pink-500')) {
                heart.classList.remove('text-pink-500', 'fill-pink-500');
            } else {
                heart.classList.add('text-pink-500', 'fill-pink-500');
            }
        });
    });

    // Follow community functionality
    document.querySelectorAll('.community-group').forEach(group => {
        group.addEventListener('click', function(e) {
            // In a real app, this would redirect to the community page
            console.log('Navigating to community:', this.getAttribute('href'));
        });
    });
}

// Navigation active state
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('custom-navbar a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `/${currentPage}`) {
            link.classList.add('active-nav-link');
        }
    });
});