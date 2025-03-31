document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const menuClose = document.querySelector('.menu-close');
  const body = document.body;
  
  const carouselSettings = {
    autoplaySpeed: 500,
    isPaused: false
  };
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.add('active');
    body.classList.add('menu-open');
  });
  
  menuClose.addEventListener('click', function() {
    navMenu.classList.remove('active');
    body.classList.remove('menu-open');
  });

  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });
  
  const carouselContainer = document.querySelector('.image-carousel');
  const totalImages = 10;
  let currentImageIndex = 0;
  const imagePaths = [];
  let carouselInterval;
  
  for (let i = 1; i <= totalImages; i++) {
    imagePaths.push(`public/desktop/image${i}.png`);
  }
  
  imagePaths.forEach((path, index) => {
    const img = document.createElement('img');
    img.src = path;
    img.alt = `Carousel Image ${index + 1}`;
    img.className = 'carousel-image';
    
    if (index === 0) {
      img.classList.add('active');
    }
    
    carouselContainer.appendChild(img);
  });
  
  function rotateImages() {
    if (carouselSettings.isPaused) return;
    
    const images = document.querySelectorAll('.carousel-image');
    
    images[currentImageIndex].classList.remove('active');
    
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    
    images[currentImageIndex].classList.add('active');
  }
  
  carouselContainer.addEventListener('mouseenter', function() {
    carouselSettings.isPaused = true;
  });
  
  carouselContainer.addEventListener('mouseleave', function() {
    carouselSettings.isPaused = false;
  });
  
  carouselInterval = setInterval(rotateImages, carouselSettings.autoplaySpeed);
  
  const deliverSmarterSection = document.querySelector('.deliver-smarter');
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
      deliverSmarterSection.classList.remove('waypoint-hover', 'relay-hover', 'horizon-hover');
      
      if (index == 0) {
        deliverSmarterSection.classList.add('waypoint-hover');
      } else if (index == 1) {
        deliverSmarterSection.classList.add('relay-hover');
      } else if (index == 2) {
        deliverSmarterSection.classList.add('horizon-hover');
      }
    });
    
    card.addEventListener('mouseleave', function() {
      deliverSmarterSection.classList.remove('waypoint-hover', 'relay-hover', 'horizon-hover');
    });
  });
  
  const newsCardsContainer = document.querySelector('.news-cards-container');
  const newsCards = document.querySelector('.news-cards');
  const newsCardItems = document.querySelectorAll('.news-card');
  const nextArrow = document.querySelector('.next-arrow');
  const prevArrow = document.querySelector('.prev-arrow');
  
  let currentNewsIndex = 0;
  let newsCardWidth = newsCardItems[0].offsetWidth + 20;
  let newsMaxIndex = newsCardItems.length - (window.innerWidth <= 992 ? 1 : 3);
  
  updateNewsArrowState();
  
  nextArrow.addEventListener('click', () => {
    if (window.innerWidth <= 576) {
      const scrollAmount = newsCardWidth;
      newsCardsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      if (currentNewsIndex < newsMaxIndex) {
        currentNewsIndex++;
        slideNewsCards();
        updateNewsArrowState();
      }
    }
  });
  
  prevArrow.addEventListener('click', () => {
    if (window.innerWidth <= 576) {
      const scrollAmount = -newsCardWidth;
      newsCardsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      if (currentNewsIndex > 0) {
        currentNewsIndex--;
        slideNewsCards();
        updateNewsArrowState();
      }
    }
  });
  
  function slideNewsCards() {
    if (window.innerWidth > 576) {
      newsCards.style.transform = `translateX(-${currentNewsIndex * newsCardWidth}px)`;
    }
  }
  
  function updateNewsArrowState() {
    if (window.innerWidth <= 576) {
      const isAtStart = newsCardsContainer.scrollLeft <= 10;
      const isAtEnd = newsCardsContainer.scrollLeft + newsCardsContainer.clientWidth >= newsCards.scrollWidth - 10;
      
      if (isAtStart) {
        prevArrow.classList.add('disabled');
      } else {
        prevArrow.classList.remove('disabled');
      }
      
      if (isAtEnd) {
        nextArrow.classList.add('disabled');
      } else {
        nextArrow.classList.remove('disabled');
      }
    } else {
      if (currentNewsIndex === 0) {
        prevArrow.classList.add('disabled');
      } else {
        prevArrow.classList.remove('disabled');
      }
      
      if (currentNewsIndex === newsMaxIndex) {
        nextArrow.classList.add('disabled');
      } else {
        nextArrow.classList.remove('disabled');
      }
    }
  }
  
  if (window.innerWidth <= 576) {
    newsCardsContainer.addEventListener('scroll', function() {
      newsCards.style.transform = 'none'
      updateNewsArrowState();
    });
  }
  
  const featureGrid = document.querySelector('.feature-grid');
  const featureCards = document.querySelectorAll('.feature-card');
  const nextFeatureArrow = document.querySelector('.next-feature-arrow');
  const prevFeatureArrow = document.querySelector('.prev-feature-arrow');
  
  let currentFeatureIndex = 0;
  let featureCardWidth = 0;
  let featureMaxIndex = 0;
  
  function initFeatureSlider() {
    if (window.innerWidth <= 992) {
      featureCardWidth = featureCards[0].offsetWidth + 20;
      featureMaxIndex = featureCards.length - 1;
      
      updateFeatureArrowState();
      
      document.querySelector('.features-navigation').style.display = 'flex';
    } else {
      document.querySelector('.features-navigation').style.display = 'none';
    }
  }
  
  initFeatureSlider();
  
  nextFeatureArrow.addEventListener('click', () => {
    if (currentFeatureIndex < featureMaxIndex) {
      currentFeatureIndex++;
      slideFeatureCards();
      updateFeatureArrowState();
    }
  });
  
  prevFeatureArrow.addEventListener('click', () => {
    if (currentFeatureIndex > 0) {
      currentFeatureIndex--;
      slideFeatureCards();
      updateFeatureArrowState();
    }
  });
  
  function slideFeatureCards() {
    featureGrid.scrollTo({
      left: currentFeatureIndex * featureCardWidth,
      behavior: 'smooth'
    });
  }
  
  function updateFeatureArrowState() {
    if (currentFeatureIndex === 0) {
      prevFeatureArrow.classList.add('disabled');
    } else {
      prevFeatureArrow.classList.remove('disabled');
    }
    
    if (currentFeatureIndex === featureMaxIndex) {
      nextFeatureArrow.classList.add('disabled');
    } else {
      nextFeatureArrow.classList.remove('disabled');
    }
  }
  
  const mobileFeatures = document.querySelectorAll('.mobile-feature-card');
  const nextMobileFeatureArrow = document.querySelector('.next-mobile-feature-arrow');
  const prevMobileFeatureArrow = document.querySelector('.prev-mobile-feature-arrow');
  const mobileFeaturesContainer = document.querySelector('.mobile-features-container');
  
  let currentMobileFeatureIndex = 0;
  let mobileFeatureCardWidth = 0;
  let mobileFeatureMaxIndex = 0;
  
  function initMobileFeaturesSlider() {
    if (window.innerWidth <= 576) {
      mobileFeatureCardWidth = mobileFeatures[0].offsetWidth + 10;
      mobileFeatureMaxIndex = mobileFeatures.length - 1;
      
      updateMobileFeatureArrowState();
    }
  }
  
  if (mobileFeatures.length > 0 && nextMobileFeatureArrow && prevMobileFeatureArrow) {
    initMobileFeaturesSlider();
    
    nextMobileFeatureArrow.addEventListener('click', () => {
      if (currentMobileFeatureIndex < mobileFeatureMaxIndex) {
        currentMobileFeatureIndex++;
        slideMobileFeatures();
        updateMobileFeatureArrowState();
      }
    });
    
    prevMobileFeatureArrow.addEventListener('click', () => {
      if (currentMobileFeatureIndex > 0) {
        currentMobileFeatureIndex--;
        slideMobileFeatures();
        updateMobileFeatureArrowState();
      }
    });
  }
  
  function slideMobileFeatures() {
    mobileFeaturesContainer.scrollTo({
      left: currentMobileFeatureIndex * mobileFeatureCardWidth,
      behavior: 'smooth'
    });
  }
  
  function updateMobileFeatureArrowState() {
    if (currentMobileFeatureIndex === 0) {
      prevMobileFeatureArrow.classList.add('disabled');
    } else {
      prevMobileFeatureArrow.classList.remove('disabled');
    }
    
    if (currentMobileFeatureIndex === mobileFeatureMaxIndex) {
      nextMobileFeatureArrow.classList.add('disabled');
    } else {
      nextMobileFeatureArrow.classList.remove('disabled');
    }
  }
  
  window.addEventListener('resize', () => {
    newsCardWidth = newsCardItems[0].offsetWidth + 20;
    newsMaxIndex = newsCardItems.length - (window.innerWidth <= 992 ? 1 : 3);
    
    if (currentNewsIndex > newsMaxIndex) {
      currentNewsIndex = newsMaxIndex;
    }
    
    slideNewsCards();
    updateNewsArrowState();
    
    initFeatureSlider();
    
    if (mobileFeatures.length > 0) {
      initMobileFeaturesSlider();
    }
  });
});