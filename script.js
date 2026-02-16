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
    
// Данные спикеров (реальные из документа)
const speakersData = [
    // Спикеры
    {
        name: 'Сильвестров Артемий',
        position: 'Иерей, помощник руководителя Информационно-консультационного центра по вопросам сектантства миссионерского отдела Новосибирской епархии Русской Православной Церкви',
        description: 'Представитель Русской Православной Церкви, специалист по вопросам сектантства и межрелигиозного диалога.',
        image: 'assets/spikers/Silvestorov.jpg'
    },
    {
        name: 'Азимов Фарход Точидинович',
        position: 'Заместитель муфтия Новосибирской области',
        description: 'Представитель Духовного управления мусульман Новосибирской области, эксперт в области исламской культуры и межконфессиональных отношений.',
        image: 'assets/spikers/Azimov.jpg'
    },
    {
        name: 'Базаров Бато-лама',
        position: 'Председатель местной религиозной организации буддистов «Ринчин» г. Новосибирска',
        description: 'Глава буддийской общины Новосибирска, представитель традиционного буддизма в регионе.',
        image: 'assets/spikers/Bazarov.jpg'
    },
    {
        name: 'Емельянов Александр Николаевич',
        position: 'Управляющий делами Новосибирской епархии Русской Православной Старообрядческой Церкви',
        description: 'Представитель старообрядческой общины, хранитель традиций древлеправославия.',
        image: 'assets/spikers/Emelanov.jpg'
    },
    {
        name: 'Бацалов Мухаммад Гусейнович',
        position: 'Имам соборной мечети Духовного управления мусульман Новосибирской области',
        description: 'Духовный лидер мусульманской общины, имам соборной мечети Новосибирска.',
        image: 'assets/spikers/Bacalov.jpg'
    },
    {
        name: 'Шнеур Залмен Заклос',
        position: 'Главный раввин Новосибирской области',
        description: 'Духовный лидер иудейской общины Новосибирской области, представитель Федерации еврейских общин России.',
        image: 'assets/spikers/Snerov.jpg'
    },
    {
        name: 'Бекназарян Григор',
        position: 'Иерей, настоятель церкви «Сурб Аствацацин» г. Новосибирска Армянской Апостольской Православной Церкви',
        description: 'Представитель Армянской Апостольской Церкви, настоятель армянской церкви в Новосибирске.',
        image: 'assets/spikers/Becnazaran.jpg'
    },
    // Эксперты
    {
        name: 'Запорожченко Андрей Владимирович',
        position: 'Кандидат исторических наук, религиовед, доцент НГПУ и НГУ',
        description: 'Религиовед, специалист по истории религий, доцент кафедры теории, истории, культуры и музеологии НГПУ и кафедры востоковедения НГУ.',
        image: 'https://placehold.co/300x200/DE2726/white?text=Запорожченко+А.В.'
    },
    {
        name: 'Саженин Игорь Игоревич',
        position: 'Кандидат филологических наук, доцент НГПУ',
        description: 'Филолог, специалист по современному русскому языку, доцент кафедры современного русского языка и методики его преподавания НГПУ.',
        image: 'https://placehold.co/300x200/242424/white?text=Саженин+И.И.'
    },
    {
        name: 'Зеленцов Виктор Викторович',
        position: 'Кандидат исторических наук, доцент НГУЭУ, лектор общества «Знание»',
        description: 'Историк, специалист по международным отношениям, доцент кафедры мировой экономики, международных отношений и права НГУЭУ.',
        image: 'assets/spikers/Zelenev.jpg'
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