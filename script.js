document.addEventListener("DOMContentLoaded", function() {
  // Navigation: Wechsel zwischen den Sektionen
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('data-section');
      showSection(target);
      if (target === 'design') {
        drawTshirt();
      }
    });
  });

  function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => {
      if (sec.id === id) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });
  }

  // "Jetzt shoppen"-Button in der Home-Sektion
  const shopNowBtn = document.getElementById('shop-now');
  shopNowBtn.addEventListener('click', function() {
    showSection('shop');
  });

  // Logo Upload: Vorschau anzeigen und für T-Shirt Design speichern
  let logoImage = null; // Globales Logo für den Canvas
  const logoFileInput = document.getElementById('logoFile');
  const logoPreview = document.getElementById('logoPreview');
  if (logoFileInput) {
    logoFileInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          // Vorschau im Upload-Bereich
          logoPreview.innerHTML = `<img src="${e.target.result}" alt="Logo Vorschau" style="max-width:200px; margin-top:20px;">`;
          // Neues Image-Objekt für den Canvas erstellen
          logoImage = new Image();
          logoImage.onload = function() {
            if (document.getElementById('design').classList.contains('active')) {
              drawTshirt();
            }
          };
          logoImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Login-System (Demo)
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === "user" && password === "pass") {
      loginMessage.textContent = "Erfolgreich angemeldet!";
      loginMessage.style.color = "green";
      localStorage.setItem("loggedInUser", username);
    } else {
      loginMessage.textContent = "Falscher Benutzername oder Passwort.";
      loginMessage.style.color = "red";
    }
  });

  // Interaktive Farbauswahl im Shop (für Bildrahmen, Demo)
  const colorPicker = document.getElementById('colorPicker');
  const tshirtMockup = document.getElementById('tshirt-mockup');
  colorPicker.addEventListener('change', function() {
    tshirtMockup.style.border = `5px solid ${this.value}`;
  });

  // Warenkorb-Simulation
  let cart = [];
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      cart.push({ product: "Oversize T-Shirt", color: colorPicker.value });
      alert("Produkt wurde dem Warenkorb hinzugefügt!");
      updateCartDisplay();
    });
  });

  function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = "";
    if (cart.length === 0) {
      cartItemsDiv.textContent = "Ihr Warenkorb ist leer.";
    } else {
      cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `<p>${index + 1}. ${item.product} - Farbe: ${item.color}</p>`;
      });
    }
  }

  const checkoutBtn = document.getElementById('checkout');
  checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
      alert("Keine Produkte im Warenkorb!");
    } else {
      alert("Sie werden zur Kasse geleitet (Demo).");
      cart = [];
      updateCartDisplay();
    }
  });

  // T-Shirt Design mit Canvas
  const designColorPicker = document.getElementById('designColorPicker');
  if (designColorPicker) {
    designColorPicker.addEventListener('change', drawTshirt);
  }
  
  // Canvas und T-Shirt Outline initialisieren
  const canvas = document.getElementById('tshirtCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let tshirtOutlineImage = new Image();
  tshirtOutlineImage.src = 'tshirt_outline.png'; // Stelle sicher, dass dieses Bild vorhanden ist

  // Funktion zum Zeichnen des T-Shirts im Canvas
  function drawTshirt() {
    if (!ctx) return;
    // Hintergrundfarbe (T-Shirt-Farbe)
    const tshirtColor = designColorPicker ? designColorPicker.value : "#d4a5a5";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = tshirtColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // T-Shirt Outline zeichnen – entweder sofort, wenn bereits geladen, oder beim Laden
    if (tshirtOutlineImage.complete) {
      ctx.drawImage(tshirtOutlineImage, 0, 0, canvas.width, canvas.height);
      // Logo zeichnen, falls vorhanden
      if (logoImage) {
        const logoWidth = canvas.width / 3;
        const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
        const x = (canvas.width - logoWidth) / 2;
        const y = (canvas.height - logoHeight) / 2;
        ctx.drawImage(logoImage, x, y, logoWidth, logoHeight);
      }
    } else {
      tshirtOutlineImage.onload = function() {
        ctx.drawImage(tshirtOutlineImage, 0, 0, canvas.width, canvas.height);
        if (logoImage) {
          const logoWidth = canvas.width / 3;
          const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
          const x = (canvas.width - logoWidth) / 2;
          const y = (canvas.height - logoHeight) / 2;
          ctx.drawImage(logoImage, x, y, logoWidth, logoHeight);
        }
      };
    }
  }
});
