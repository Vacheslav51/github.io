// script.js

/**
 * Файл: script.js
 * Описание: Интерактивные элементы для лендинга форума
 * Включает: бургер-меню, аккордеон, модальное окно для спикеров
 */

// === 1. Бургер-меню для мобильной версии ===
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Открытие/закрытие меню при клике на бургер
    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Закрытие меню при ресайзе окна (если стало больше 768px)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // === 2. Аккордеон для блока "Полезная информация" ===
    const accordionItems = document.querySelectorAll('.accordion__item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');
        const content = item.querySelector('.accordion__content');
        
        header.addEventListener('click', function() {
            // Закрыть все другие открытые элементы (опционально)
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherHeader = otherItem.querySelector('.accordion__header');
                    const otherContent = otherItem.querySelector('.accordion__content');
                    otherHeader.classList.remove('active');
                    otherContent.classList.remove('show');
                }
            });
            
            // Открыть/закрыть текущий элемент
            header.classList.toggle('active');
            content.classList.toggle('show');
        });
    });
    
    // === 3. Модальное окно для спикеров ===
    const modal = document.getElementById('speakerModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');
    
    // Функция закрытия модального окна
    function closeModalWindow() {
        modal.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }
    
    // Закрытие по крестику
    closeModal.addEventListener('click', closeModalWindow);
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalWindow();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        }
    });
    
    // === 4. Заполнение карточек спикеров (заглушки) ===
    const speakersGrid = document.getElementById('speakersGrid');
    
    // Данные спикеров (заглушки)
    const speakersData = [
        {
            name: 'Иванов Иван Иванович',
            position: 'Доктор исторических наук, профессор НГУ',
            description: 'Специалист по межкультурной коммуникации и этнографии народов Сибири. Автор более 100 научных работ.',
            image: 'https://placehold.co/300x200/2134A0/white?text=Иванов+И.И.'
        },
        {
            name: 'Петрова Анна Сергеевна',
            position: 'Руководитель центра межнациональных отношений',
            description: 'Эксперт в области гармонизации межэтнических отношений, организатор множества форумов и конференций.',
            image: 'https://placehold.co/300x200/DE2726/white?text=Петрова+А.С.'
        },
        {
            name: 'Сидоров Алексей Петрович',
            position: 'Кандидат культурологии, доцент НГУЭУ',
            description: 'Исследователь традиционных ценностей и культурного наследия. Автор учебных пособий по культурологии.',
            image: 'https://placehold.co/300x200/242424/white?text=Сидоров+А.П.'
        }
    ];
    
    // Функция создания карточки спикера
    function createSpeakerCard(speaker) {
        const card = document.createElement('div');
        card.className = 'speaker-card';
        
        card.innerHTML = `
            <img src="${speaker.image}" alt="${speaker.name}" class="speaker-card__image">
            <div class="speaker-card__content">
                <h3 class="speaker-card__name">${speaker.name}</h3>
                <p class="speaker-card__position">${speaker.position}</p>
                <p class="speaker-card__description">${speaker.description.substring(0, 80)}...</p>
            </div>
        `;
        
        // Добавляем обработчик для открытия модального окна
        card.addEventListener('click', function() {
            openSpeakerModal(speaker);
        });
        
        return card;
    }
    
    // Функция открытия модального окна с информацией о спикере
    function openSpeakerModal(speaker) {
        modalBody.innerHTML = `
            <h2 class="modal__name">${speaker.name}</h2>
            <p class="modal__position">${speaker.position}</p>
            <p class="modal__description">${speaker.description}</p>
        `;
        
        modal.classList.add('show');
        document.body.classList.add('no-scroll');
    }
    
    // Заполняем сетку спикеров
    if (speakersGrid) {
        speakersData.forEach(speaker => {
            speakersGrid.appendChild(createSpeakerCard(speaker));
        });
    }
    
    // === 5. Плавный скролл по якорям ===
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Вспомогательный класс для предотвращения скролла при открытом меню/модалке
document.body.classList.add('no-scroll', function() {
    this.style.overflow = 'hidden';
});

// Убираем класс при загрузке, если не нужно
window.addEventListener('load', function() {
    document.body.classList.remove('no-scroll');
});