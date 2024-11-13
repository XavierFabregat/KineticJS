// public/js/app.js

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', () => {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  for (const link of scrollLinks) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetID = link.getAttribute('href').substr(1);
      const targetSection = document.getElementById(targetID);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth',
        });
      }
    });
  }
});
