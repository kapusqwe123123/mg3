// Плавный скролл по ссылкам меню
var links = document.querySelectorAll('.menu a');

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(e) {
    e.preventDefault();
    var id = this.getAttribute('href');
    var block = document.querySelector(id);
    if (block) {
      window.scrollTo({
        top: block.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
}

// Появление карточек при скролле
var cards = document.querySelectorAll('.card, .item');

function showCards() {
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  }
}

// Начальное состояние карточек
for (var j = 0; j < cards.length; j++) {
  cards[j].style.opacity = '0';
  cards[j].style.transform = 'translateY(20px)';
  cards[j].style.transition = '0.5s';
}

window.addEventListener('scroll', showCards);
showCards();