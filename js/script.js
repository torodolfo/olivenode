// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', function() {
        if (mobileMenu.style.display === 'flex') {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'flex';
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top functionality
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide back to top button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0.7';
        }
    });

    // Load services
    loadServices();

    // Load publications
    loadPublications();
});

// Load Services
function loadServices() {
    // Embedded services data to avoid CORS issues when opening locally
    const services = [
        {
            "title": "Fractional Leadership",
            "description": "For organizations needing interim executive support without a full-time hire, I provide fractional roles to lead teams and drive initiatives during transitions or growth phases. Examples: Fractional Chief Supply Chain Officer (CSCO): Lead supply chain transformations, including team building, process improvements, and vendor management. Fractional Operations Director: Oversee daily operations, quality controls, and efficiency projects, with a focus on Lean Six Sigma. Fractional Quality and Compliance Leader: Implement and audit quality systems, ensuring adherence to industry standards. Let's discuss how my expertise can help your business thrive."
        },
        {
            "title": "Board/Advisory Roles",
            "description": "As a board advisor, I bring independent, strategic perspectives to help guide your organization's long-term vision. My focus is on governance, systems design, risk management and culture. Expect insights on process design, operational scalability, sustainability initiatives, supply chain and business trends, novel technology, vision, values and principles to inform board decisions. Let's discuss how my expertise can help your business thrive."
        },
        {
            "title": "Consulting",
            "description": "I'll work with your team to unlock significant cost savings and improve cash flow in areas such as: Supply Chain Optimization: Comprehensive audits and recommendations to streamline procurement, inventory management, and logistics. Ideal for companies facing supply disruptions or scaling challenges. Quality Management and Compliance: Assistance with ISO9001 certification and continuous improvement to enhance product quality and operational resilience. Strategic Procurement: Sourcing strategies, supplier negotiations, and risk assessments. International Business Management: Advice on cross-border operations and cultural integration. Leadership Development: I will coach and mentor your managers, helping them become more effective leaders who can inspire and motivate their teams. Training and Empowerment: I will create custom training programs to upskill your team, giving them the knowledge and confidence to take ownership of their roles and contribute to your goals. My process involves a deep dive into your current operations to understand your unique challenges. From there, we'll create a customized plan that is both strategic and practical. My goal is to leave you with a more efficient supply chain and a team that is energized, skilled, and ready to take on the future. Let's discuss how my expertise can help your business thrive."
        }
    ];
    
    try {
        const servicesGrid = document.getElementById('services-grid');
        servicesGrid.innerHTML = '';
        
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(serviceCard);
        });
    } catch (error) {
        console.error('Error loading services:', error);
        document.getElementById('services-grid').innerHTML = '<p>Error loading services. Please try again later.</p>';
    }
}

// Load Publications
function loadPublications() {
    // Embedded publications data to avoid CORS issues when opening locally
    const publications = []; // Empty array - no publications yet
    
    try {
        const publicationsGrid = document.getElementById('publications-grid');
        
        if (publications.length === 0) {
            publicationsGrid.innerHTML = '<p class="no-publications">No publications available yet. Check back soon for new content.</p>';
            return;
        }
        
        // Pagination setup (for future use when publications are added)
        const itemsPerPage = 6;
        let currentPage = 1;
        const totalPages = Math.ceil(publications.length / itemsPerPage);
        
        function displayPublications(page) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pagePublications = publications.slice(startIndex, endIndex);
            
            publicationsGrid.innerHTML = '';
            
            pagePublications.forEach(publication => {
                const publicationCard = document.createElement('div');
                publicationCard.className = 'publication-card';
                publicationCard.innerHTML = `
                    ${publication.image ? `<img src="${publication.image}" alt="${publication.title}">` : ''}
                    <div class="publication-content">
                        <h3>${publication.title}</h3>
                        <p class="date">${publication.date}</p>
                        <p>${publication.summary}</p>
                        ${publication.link ? `<a href="${publication.link}" class="btn btn-primary">Read More</a>` : ''}
                    </div>
                `;
                publicationsGrid.appendChild(publicationCard);
            });
        }
        
        function setupPagination() {
            const pagination = document.getElementById('pagination');
            if (totalPages <= 1) {
                pagination.style.display = 'none';
                return;
            }
            
            pagination.style.display = 'flex';
            pagination.style.justifyContent = 'center';
            pagination.style.gap = '0.5rem';
            pagination.style.marginTop = '2rem';
            
            pagination.innerHTML = '';
            
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.className = 'btn';
                pageBtn.style.padding = '0.5rem 1rem';
                
                if (i === currentPage) {
                    pageBtn.style.backgroundColor = '#556B2F';
                    pageBtn.style.color = 'white';
                } else {
                    pageBtn.style.backgroundColor = 'white';
                    pageBtn.style.color = '#556B2F';
                    pageBtn.style.border = '1px solid #556B2F';
                }
                
                pageBtn.addEventListener('click', function() {
                    currentPage = i;
                    displayPublications(currentPage);
                    setupPagination();
                });
                
                pagination.appendChild(pageBtn);
            }
        }
        
        displayPublications(currentPage);
        setupPagination();
        
    } catch (error) {
        console.error('Error loading publications:', error);
        document.getElementById('publications-grid').innerHTML = '<p class="no-publications">Error loading publications. Please try again later.</p>';
    }
}

// Add smooth scrolling behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

