// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('open')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        });
    });


    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-up, .slide-left, .slide-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop watching once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Form Submission Prevention (for demo purposes) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.textContent = 'Request Sent Successfully!';
                btn.style.backgroundColor = '#16325B'; // Navy color to show success
                btn.style.color = '#FFFFFF';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // --- Chatbot Logic ---
    const chatbotToggler = document.getElementById('chatbot-toggler');
    const closeBotBtn = document.getElementById('close-bot-btn');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatbotBody = document.getElementById('chatbot-body');

    // Toggle Chatbot Window
    chatbotToggler.addEventListener('click', () => {
        chatbotContainer.classList.toggle('open');
    });

    closeBotBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('open');
    });

    // Chatbot Responses Dictionary
    const responses = {
        "hello": "Hello! I am Crescent Bot. How can I assist you with your smile today?",
        "hi": "Hi there! Welcome to Crescent Dental. How can I help you?",
        "hours": "We are open Monday through Friday from 8:00 AM to 5:00 PM. We are closed on weekends.",
        "time": "We are open Monday through Friday from 8:00 AM to 5:00 PM.",
        "location": "We are located at 18901 W Warren Ave, Detroit, MI 48228.",
        "address": "Our clinic is at 18901 W Warren Ave, Detroit, MI 48228.",
        "appointment": "You can request an appointment by filling out the form in the Contact section below, or by calling us at +1 313-271-4500.",
        "book": "You can request an appointment using our contact form or give us a call at +1 313-271-4500.",
        "services": "We offer General Dentistry, Cosmetic Dentistry, Teeth Whitening, Dental Implants, Emergency Care, and Children's Dentistry.",
        "emergency": "If you have a dental emergency, please call us immediately at +1 313-271-4500 for same-day assistance.",
        "cost": "Costs vary depending on the treatment. We accept most insurances and offer flexible payment plans. Please call us for specifics!",
        "insurance": "We work with most major insurance providers. Feel free to call us at +1 313-271-4500 to verify your specific coverage."
    };

    const defaultResponse = "I'm a simple bot and might not understand complex questions. Please call us at +1 313-271-4500 or use our contact form for detailed inquiries.";

    function getBotResponse(input) {
        const text = input.toLowerCase();
        for (const key in responses) {
            if (text.includes(key)) {
                return responses[key];
            }
        }
        return defaultResponse;
    }

    function createMessageElement(message, sender) {
        const div = document.createElement('div');
        div.classList.add('chat-message', `${sender}-message`);
        
        let avatarIcon = sender === 'bot' ? '<i class="ph-fill ph-robot"></i>' : '<i class="ph-fill ph-user"></i>';
        
        div.innerHTML = `
            <div class="msg-avatar">${avatarIcon}</div>
            <div class="msg-content">${message}</div>
        `;
        return div;
    }

    function createTypingIndicator() {
        const div = document.createElement('div');
        div.classList.add('chat-message', 'bot-message', 'typing-element');
        div.innerHTML = `
            <div class="msg-avatar"><i class="ph-fill ph-robot"></i></div>
            <div class="msg-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        return div;
    }

    function handleChat() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        chatbotBody.appendChild(createMessageElement(message, 'user'));
        chatInput.value = '';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        // Show typing indicator
        const typingIndicator = createTypingIndicator();
        chatbotBody.appendChild(typingIndicator);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        // Simulate network delay then add bot response
        setTimeout(() => {
            chatbotBody.removeChild(typingIndicator);
            const responseText = getBotResponse(message);
            chatbotBody.appendChild(createMessageElement(responseText, 'bot'));
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 800 + Math.random() * 500); // random delay between 0.8s and 1.3s
    }

    sendChatBtn.addEventListener('click', handleChat);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    });

});