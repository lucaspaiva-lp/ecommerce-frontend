import homePage from './home.js';
import produtosPage from './produtos.js';
import loginPage from './login.js';
import checkoutPage from './checkout.js';

const app = document.getElementById('app');
const navLinks = document.querySelectorAll('.nav-link');

// Função para atualizar nav ativa
function setActiveLink(hash) {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Router simples
function router() {
  const hash = window.location.hash || '#home';
  setActiveLink(hash);
  let pageContent = '';

  switch(hash) {
    case '#home':
      pageContent = homePage();
      break;
    case '#produtos':
      pageContent = produtosPage();
      break;
    case '#login':
      pageContent = loginPage();
      break;
    case '#checkout':
      pageContent = checkoutPage();
      break;
    default:
      pageContent = '<h2>Página não encontrada</h2>';
  }

  app.innerHTML = pageContent;

  // --- INICIALIZAÇÃO DO CAROUSEL ---
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const slideWidth = slides[0].getBoundingClientRect().width;

  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  let currentIndex = 0;

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      track.style.transform = `translateX(-${slides[currentIndex].style.left})`;
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.style.transform = `translateX(-${slides[currentIndex].style.left})`;
    }
  });
}
// --- INICIALIZAÇÃO DO CARRINHO ---
function initCart() {
  const cartElement = document.getElementById('cart');
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cart = [];

  if (!cartElement || !openCartBtn || !closeCartBtn) return;

  // Atualiza visualmente o carrinho: mostra itens, miniaturas e total
  // Função updateCart() que exibe os itens no carrinho
  function updateCart() {
  cartItemsElement.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.classList.add('cart-item'); // adiciona classe para CSS
    li.innerHTML = `
      ${item.thumbHTML}
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
      </div>
    `;

    cartItemsElement.appendChild(li);
  });

  cartTotalElement.textContent = total.toFixed(2);
}


  openCartBtn.addEventListener('click', () => cartElement.classList.add('open'));
  closeCartBtn.addEventListener('click', () => cartElement.classList.remove('open'));

// Delegação de clique para adicionar produtos ao carrinho
// Adiciona produto ao carrinho ao clicar no botão "Adicionar ao carrinho"
// Inclui nome, preço e imagem do produto
  document.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    const card = e.target.closest('.product-card, .product-item');
    const name = card.querySelector('h3').textContent;
    const priceText = card.querySelector('.product-price').textContent;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.'));
   let thumbHTML;
    const img = card.querySelector('img');
    if (img) {
      thumbHTML = `<img src="${img.src}" alt="${name}" class="cart-thumb">`;
    } else {
      thumbHTML = card.querySelector('.thumb').innerHTML; // pega SVG
    }

    // Adiciona o item ao carrinho
    cart.push({ name, price, thumbHTML });
    updateCart();
  }
  if (e.target.id === 'checkout') {
    // Navega para a rota #checkout dentro do SPA
    window.location.hash = '/tests/frontend/#checkout';

    // Fecha o carrinho visualmente
    const cartElement = document.getElementById('cart');
    if (cartElement) cartElement.classList.remove('open');
  }
});

}
  initCarousel();
  initCart();
  // Depois de initCart() ou dentro de initCart(), mas fora do 'add-to-cart'
const checkoutBtn = document.getElementById('checkout');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    // Navega para a rota #checkout sem quebrar o carrinho
    window.location.hash = '/tests/frontend/#checkout';
    const cartElement = document.getElementById('cart');
    if (cartElement) cartElement.classList.remove('open'); // fecha o carrinho
  });
}

  // --- FIM DO CAROUSEL ---
}

// Após app.innerHTML = pageContent; dentro do router()
const checkoutBtn = document.getElementById('checkout');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    // NÃO usar href direto
    // window.location.href = '/checkout.html';
    
    // Use hash para navegar dentro do app modular
    window.location.hash = '#checkout';
  });
}




// Eventos
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

// Atualiza ano no footer
document.getElementById('year').textContent = new Date().getFullYear();