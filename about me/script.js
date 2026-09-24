// ===== ДАННЫЕ О БУРГЕРАХ =====
const burgers = [
    {
        id: 1,
        name: 'Classic Vibe',
        description: 'Сочная говяжья котлета, свежие томаты, хрустящий салат, маринованные огурчики и фирменный соус.',
        price: 450,
        category: 'beef',
        badge: 'Хит',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        name: 'Cheese Melt',
        description: 'Двойная котлета, много сыра Чедар, карамелизированный лук и бекон. Для тех, кто очень голоден.',
        price: 590,
        category: 'beef',
        badge: 'Новинка',
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        name: 'Chicken Fresh',
        description: 'Хрустящее куриное филе, лёгкий соус на основе йогурта, свежий огурец и листья салата.',
        price: 390,
        category: 'chicken',
        badge: '',
        image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        name: 'Spicy Chick',
        description: 'Острая куриная котлета, соус чили, халапеньо и сыр. Для любителей поострее.',
        price: 430,
        category: 'chicken',
        badge: '🌶 Остро',
        image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        name: 'Veggie Green',
        description: 'Котлета из нута и овощей, гуакамоле, томаты и свежая зелень. Вегетарианский рай.',
        price: 420,
        category: 'veggie',
        badge: 'Veggie',
        image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        name: 'Double Beef',
        description: 'Две говяжьи котлеты, двойной сыр, бекон и специальный соус BBQ. Максимум вкуса.',
        price: 650,
        category: 'beef',
        badge: 'Топ',
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
];

// ===== ОТРИСОВКА КАРТОЧЕК =====
const menuGrid = document.getElementById('menuGrid');

function renderBurgers(filter = 'all') {
    const filtered = filter === 'all' 
        ? burgers 
        : burgers.filter(b => b.category === filter);
    
    menuGrid.innerHTML = filtered.map(burger => `
        <div class="burger-card" data-category="${burger.category}">
            <div class="burger-img-wrapper">
                ${burger.badge ? `<span class="badge">${burger.badge}</span>` : ''}
                <img src="${burger.image}" alt="${burger.name}" class="burger-img" loading="lazy">
            </div>
            <div class="burger-info">
                <h3 class="burger-name">${burger.name}</h3>
                <p class="burger-desc">${burger.description}</p>
                <div class="burger-bottom">
                    <span class="price">${burger.price} ₽</span>
                    <button class="btn-order" data-id="${burger.id}">Заказать</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Навешиваем обработчики на новые кнопки
    document.querySelectorAll('.btn-order').forEach(btn => {
        btn.addEventListener('click', openOrderModal);
    });
}

// ===== ФИЛЬТРАЦИЯ =====
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderBurgers(btn.dataset.filter);
    });
});

// ===== МОДАЛЬНОЕ ОКНО ЗАКАЗА =====
const modal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');
const modalBurgerName = document.getElementById('modalBurgerName');
const modalBurgerPrice = document.getElementById('modalBurgerPrice');
const confirmOrder = document.getElementById('confirmOrder');

let currentBurger = null;

function openOrderModal(e) {
    const burgerId = parseInt(e.target.dataset.id);
    currentBurger = burgers.find(b => b.id === burgerId);
    
    if (currentBurger) {
        modalBurgerName.textContent = `Бургер: ${currentBurger.name}`;
        modalBurgerPrice.textContent = `Цена: ${currentBurger.price} ₽`;
        modal.classList.add('active');
    }
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

confirmOrder.addEventListener('click', () => {
    const name = document.getElementById('orderName').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    
    if (!name || !phone) {
        alert('Пожалуйста, заполните имя и телефон');
        return;
    }
    
    alert(`Спасибо, ${name}! Ваш заказ "${currentBurger.name}" принят. Мы свяжемся с вами по номеру ${phone}.`);
    
    document.getElementById('orderName').value = '';
    document.getElementById('orderPhone').value = '';
    modal.classList.remove('active');
});

// ===== НАВИГАЦИЯ ПРИ СКРОЛЛЕ =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== МОБИЛЬНОЕ МЕНЮ =====
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== ПЕРВИЧНАЯ ОТРИСОВКА =====
renderBurgers();