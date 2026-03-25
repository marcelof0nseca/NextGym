const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll("#navMenu a");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

if (navLinks.length > 0 && navMenu) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const scheduleItems = document.querySelectorAll(".schedule-item");
const emptyMessage = document.getElementById("emptyMessage");

if (filterButtons.length > 0 && scheduleItems.length > 0 && emptyMessage) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

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
  input.parentElement.querySelector(".error-message").textContent = message;
}

function clearError(input) {
  input.classList.remove("error");
  input.parentElement.querySelector(".error-message").textContent = "";
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