const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll("#navMenu a");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.focus();
    }
  });
}

if (navLinks.length > 0 && navMenu) {
  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      }
    });
  });
}

function createAccessibilityPanel() {
  const widget = document.createElement("aside");
  widget.className = "accessibility-widget";
  widget.setAttribute("aria-labelledby", "accessibilityWidgetTitle");

  widget.innerHTML = `
    <button class="accessibility-trigger" type="button" id="accessibilityTrigger" aria-expanded="false" aria-controls="accessibilityPanel">
      <img src="img/icone-acessibilidade.svg" alt="" aria-hidden="true" />
      <span class="accessibility-trigger-text">Acessibilidade</span>
    </button>

    <section class="accessibility-panel" id="accessibilityPanel" aria-hidden="true" inert>
      <div class="accessibility-panel-header">
        <div>
          <span class="accessibility-kicker">NextGym</span>
          <h2 id="accessibilityWidgetTitle">Assistente de acessibilidade</h2>
        </div>
        <button class="accessibility-close" type="button" id="accessibilityClose" aria-label="Fechar assistente">×</button>
      </div>

      <div class="panel-actions" aria-label="Preferencias de exibicao">
        <button type="button" id="toggleLargeText" aria-pressed="false">
          <strong>Texto maior</strong>
          <span>Aumenta o tamanho da fonte da interface.</span>
        </button>
        <button type="button" id="toggleContrast" aria-pressed="false">
          <strong>Alto contraste</strong>
          <span>Melhora leitura em ambientes com baixa visibilidade.</span>
        </button>
        <button type="button" id="toggleMotion" aria-pressed="false">
          <strong>Reduzir movimento</strong>
          <span>Remove transicoes para uma navegacao mais estavel.</span>
        </button>
      </div>

      <p class="accessibility-note">O site tambem integra o VLibras para traducao de conteudo em Libras.</p>
    </section>
  `;

  document.body.appendChild(widget);
}

function applyAccessibilityPreferences() {
  const largeText = localStorage.getItem("nextgym-large-text") === "true";
  const highContrast = localStorage.getItem("nextgym-high-contrast") === "true";
  const reducedMotion = localStorage.getItem("nextgym-reduced-motion") === "true";

  document.documentElement.classList.toggle("large-text", largeText);
  document.body.classList.toggle("high-contrast", highContrast);
  document.body.classList.toggle("reduced-motion", reducedMotion);

  const largeTextButton = document.getElementById("toggleLargeText");
  const contrastButton = document.getElementById("toggleContrast");
  const motionButton = document.getElementById("toggleMotion");

  if (largeTextButton) largeTextButton.setAttribute("aria-pressed", String(largeText));
  if (contrastButton) contrastButton.setAttribute("aria-pressed", String(highContrast));
  if (motionButton) motionButton.setAttribute("aria-pressed", String(reducedMotion));
}

createAccessibilityPanel();
applyAccessibilityPreferences();

const accessibilityTrigger = document.getElementById("accessibilityTrigger");
const accessibilityPanel = document.getElementById("accessibilityPanel");
const accessibilityClose = document.getElementById("accessibilityClose");

function setAccessibilityPanelOpen(isOpen) {
  if (!accessibilityTrigger || !accessibilityPanel) return;

  accessibilityPanel.classList.toggle("open", isOpen);
  accessibilityPanel.setAttribute("aria-hidden", String(!isOpen));
  accessibilityTrigger.setAttribute("aria-expanded", String(isOpen));
  accessibilityPanel.inert = !isOpen;

  if (isOpen) {
    accessibilityClose.focus();
  }
}

if (accessibilityTrigger && accessibilityPanel && accessibilityClose) {
  accessibilityTrigger.addEventListener("click", () => {
    setAccessibilityPanelOpen(!accessibilityPanel.classList.contains("open"));
  });

  accessibilityClose.addEventListener("click", () => {
    setAccessibilityPanelOpen(false);
    accessibilityTrigger.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && accessibilityPanel.classList.contains("open")) {
      setAccessibilityPanelOpen(false);
      accessibilityTrigger.focus();
    }
  });
}

[
  ["toggleLargeText", "nextgym-large-text"],
  ["toggleContrast", "nextgym-high-contrast"],
  ["toggleMotion", "nextgym-reduced-motion"],
].forEach(([buttonId, storageKey]) => {
  const button = document.getElementById(buttonId);

  if (button) {
    button.addEventListener("click", () => {
      const nextValue = localStorage.getItem(storageKey) !== "true";
      localStorage.setItem(storageKey, String(nextValue));
      applyAccessibilityPreferences();
    });
  }
});

const filterButtons = document.querySelectorAll(".filter-btn");
const scheduleItems = document.querySelectorAll(".schedule-item");
const emptyMessage = document.getElementById("emptyMessage");

if (filterButtons.length > 0 && scheduleItems.length > 0 && emptyMessage) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      const filter = button.dataset.filter;
      let visibleCount = 0;

      scheduleItems.forEach((item) => {
        const category = item.dataset.category;

        if (filter === "todos" || category === filter) {
          item.style.display = "flex";
          visibleCount++;
        } else {
          item.style.display = "none";
        }
      });

      if (visibleCount === 0) {
        emptyMessage.classList.remove("hidden");
      } else {
        emptyMessage.classList.add("hidden");
      }
    });
  });
}

const form = document.getElementById("trialForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const modalityInput = document.getElementById("modality");
const shiftInput = document.getElementById("shift");

function setError(input, message) {
  input.classList.add("error");
  input.setAttribute("aria-invalid", "true");
  const errorMessage = input.parentElement.querySelector(".error-message");

  if (errorMessage) {
    errorMessage.textContent = message;
  }
}

function clearError(input) {
  input.classList.remove("error");
  input.setAttribute("aria-invalid", "false");
  const errorMessage = input.parentElement.querySelector(".error-message");

  if (errorMessage) {
    errorMessage.textContent = "";
  }
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 11;
}

if (
  form &&
  submitBtn &&
  formStatus &&
  nameInput &&
  emailInput &&
  phoneInput &&
  modalityInput &&
  shiftInput
) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    formStatus.textContent = "";
    formStatus.className = "form-status";

    [nameInput, emailInput, phoneInput, modalityInput, shiftInput].forEach(clearError);

    if (nameInput.value.trim() === "") {
      setError(nameInput, "Digite seu nome completo.");
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      setError(emailInput, "Digite seu e-mail.");
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, "Informe um e-mail válido.");
      isValid = false;
    }

    if (phoneInput.value.trim() === "") {
      setError(phoneInput, "Digite seu telefone.");
      isValid = false;
    } else if (!validatePhone(phoneInput.value.trim())) {
      setError(phoneInput, "Informe um telefone válido.");
      isValid = false;
    }

    if (modalityInput.value === "") {
      setError(modalityInput, "Selecione uma modalidade.");
      isValid = false;
    }

    if (shiftInput.value === "") {
      setError(shiftInput, "Selecione um turno.");
      isValid = false;
    }

    if (!isValid) {
      formStatus.textContent = "Corrija os campos destacados antes de enviar.";
      formStatus.classList.add("failure");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    setTimeout(() => {
      formStatus.textContent =
        "Cadastro enviado com sucesso! Em breve nossa equipe entrará em contato :).";
      formStatus.classList.add("success");
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar cadastro";
    }, 1500);
  });
}
