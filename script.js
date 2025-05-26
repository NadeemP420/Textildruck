document.addEventListener("DOMContentLoaded", function() {
  // Navigation: Wechseln zwischen den Sektionen
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('data-section');
      showSection(target);
    });
  });

  function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => {
      if(sec.id === id){
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });
  }

  // "Jetzt shoppen" Button in der Home-Sektion
  const shopNowBtn = document.getElementById('shop-now');
  shopNowBtn.addEventListener('click', function(){
    showSection('shop');
  });

  // Logo Upload: Vorschau anzeigen
  const logoFileInput = document.getElementById('logoFile');
  const logoPreview = document.getElementById('logoPreview');
  if (logoFileInput) {
    logoFileInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          logoPreview.innerHTML = `<img src="${e.target.result}" alt="Logo Vorschau" style="max-width:200px; margin-top:20px;">`;
        }
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
    // Demo-Login, in einem realen System würde hier die Authentifizierung erfolgen
    if(username === "user" && password === "pass") {
      loginMessage.textContent = "Erfolgreich angemeldet!";
      loginMessage.style.color = "green";
      localStorage.setItem("loggedInUser", username);
    } else {
      loginMessage.textContent = "Falscher Benutzername oder Passwort.";
      loginMessage.style.color = "red";
    }
  });

  // Interaktive Farbauswahl für T-Shirt Mockup
  const colorPicker = document.getElementById('colorPicker');
  const tshirtMockup = document.getElementById('tshirt-mockup');
  colorPicker.addEventListener('change', function() {
    // Zum Demo-Zweck ändern wir den Rahmen als Indikator der gewählten Farbe.
    tshirtMockup.style.border = `5px solid ${this.value}`;
  });

  // Warenkorb-Simulation
  let cart = [];
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Hier wird das Oversize T-Shirt als Beispielprodukt hinzugefügt
      cart.push({ product: "Oversize T-Shirt", color: colorPicker.value });
      alert("Produkt wurde dem Warenkorb hinzugefügt!");
      updateCartDisplay();
    });
  });

  function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = "";
    if(cart.length === 0) {
      cartItemsDiv.textContent = "Ihr Warenkorb ist leer.";
    } else {
      cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `<p>${index+1}. ${item.product} - Farbe: ${item.color}</p>`;
      });
    }
  }

  // Checkout-Simulation
  const checkoutBtn = document.getElementById('checkout');
  checkoutBtn.addEventListener('click', function() {
    if(cart.length === 0) {
      alert("Keine Produkte im Warenkorb!");
    } else {
      alert("Sie werden zur Kasse geleitet (Demo).");
      // Im Demo-Fall leeren wir den Warenkorb nach dem Checkout
      cart = [];
      updateCartDisplay();
    }
  });
});
