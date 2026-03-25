// Dummy JSON data for events
const eventsData = [
    {
        id: 1,
        name: "Tech Innovators Summit 2026",
        category: "Technology",
        date: "2026-04-15T09:00:00",
        location: "Convention Center, Downtown",
        description: "Join industry leaders to discuss the future of AI, web3, and quantum computing. A full day of keynotes, workshops, and networking.",
        imageId: 1014
    },
    {
        id: 2,
        name: "Summer Indie Music Festival",
        category: "Music",
        date: "2026-05-22T14:30:00",
        location: "Riverside Park Ampitheater",
        description: "Experience the best local indie bands live outdoors. Food trucks, local artisans, and great vibes guaranteed.",
        imageId: 1025
    },
    {
        id: 3,
        name: "Art & Design Showcase",
        category: "Art",
        date: "2026-04-05T18:00:00",
        location: "Modern Art Gallery, 4th Ave",
        description: "Explore immersive contemporary art installations. Meet the artists and enjoy complimentary refreshments during opening night.",
        imageId: 1015
    },
    {
        id: 4,
        name: "Startup Pitch Night",
        category: "Business",
        date: "2026-04-12T19:00:00",
        location: "The Hub Coworking Space",
        description: "Watch early-stage founders pitch their ideas to a panel of expert investors. Great opportunity for networking and finding co-founders.",
        imageId: 1044
    },
    {
        id: 5,
        name: "Marathon City Run",
        category: "Sports",
        date: "2026-06-10T06:00:00",
        location: "City Square Marker",
        description: "Annual city marathon drawing runners from all over the country. Features a 5k, 10k, and full marathon course.",
        imageId: 1058
    }
];

// Helper to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const fullDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    return { day, month, fullDate, time };
};

// DOM Elements
const eventsGrid = document.getElementById('eventsGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Function to generate event card HTML
const createEventCard = (event, index) => {
    const { day, month, fullDate, time } = formatDate(event.date);
    
    // Create random-seeming image from picsum based on ID for consistency
    const imageUrl = `https://picsum.photos/id/${event.imageId}/600/400`;
    
    // Add staggered animation delay
    const animationDelay = `${index * 0.1}s`;

    return `
        <div class="event-card" style="animation: fade-in 0.6s ease ${animationDelay} both;">
            <div class="card-image">
                <img src="${imageUrl}" alt="${event.name}" loading="lazy">
                <div class="date-badge">
                    <span class="day">${day}</span>
                    <span class="month">${month}</span>
                </div>
            </div>
            <div class="card-content">
                <span class="event-category">${event.category}</span>
                <h3 class="event-title">${event.name}</h3>
                
                <div class="event-info">
                    <div class="info-item">
                        <i class="fa-regular fa-clock"></i>
                        <span>${time} - ${fullDate}</span>
                    </div>
                    <div class="info-item">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${event.location}</span>
                    </div>
                </div>
                
                <p class="event-description">${event.description}</p>
                
                <button class="btn-register" onclick="alert('Registration flow for ${event.name} would open here!')">Register</button>
            </div>
        </div>
    `;
};

// Function to render events
const renderEvents = (events) => {
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        eventsGrid.style.display = 'none';
        noResults.classList.remove('hidden');
        return;
    }
    
    eventsGrid.style.display = 'grid';
    noResults.classList.add('hidden');
    
    const eventsHTML = events.map((event, index) => createEventCard(event, index)).join('');
    eventsGrid.innerHTML = eventsHTML;
};

// Initialize app
const init = () => {
    // Initial render
    renderEvents(eventsData);
    
    // Setup search listener
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderEvents(eventsData);
            return;
        }
        
        const filteredEvents = eventsData.filter(event => 
            event.name.toLowerCase().includes(searchTerm) || 
            event.description.toLowerCase().includes(searchTerm) ||
            event.category.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
        
        renderEvents(filteredEvents);
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
            navbar.style.padding = '12px 0';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '16px 0';
        }
    });
};

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
