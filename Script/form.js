/* -------------------------------------------------------------------------- */
// Alle interactieve onderdelen voor onze site. We maken van alle inputs een object met zijn eigen eigenschappen.
let email = {},
  submitButton;
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
// Twee standaard functies, nog basic, maar kan je nog uitbreiden.
const isValidEmailAddress = function (emailAddress) {
  // Basis manier om e-mailadres te checken.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isValidPassword = function (password) {
  // Het wachtwoord moet minstens 6 karakters bevatten, verder niks.
  return password.length > 1;
};

const isEmpty = function (fieldValue) {
  return !fieldValue || !fieldValue.length;
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
const doubleCheckEmailAddress = function () {
  if (isValidEmailAddress(email.input.value)) {
    // Stop met dit veld in de gaten te houden; het is in orde.
    email.input.removeEventListener("input", doubleCheckEmailAddress);
    removeErrors();
  } else {
    // Stuk herhalende code.
    if (isEmpty(email.input.value)) {
      email.errorMessage.innerText = "This field is required";
    } else {
      email.errorMessage.innerText = "Invalid emailaddress";
    }
  }
};

const addErrors = function () {
  email.input.classList.add("c-input__email--error");
  email.errorMessage.classList.add("c-label__error-message--visible");
};

const removeErrors = function () {
  email.input.classList.remove("c-input__email--error");
  email.errorMessage.classList.remove("c-label__error-message--visible");
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
const getDOMElements = function () {
  email.errorMessage = document.querySelector(".js-email-error-message");
  email.input = document.querySelector(".js-email-input");
  submitButton = document.querySelector(".js-submit-button");
};

const enableListeners = function () {
  email.input.addEventListener("blur", function () {
    if (!isValidEmailAddress(email.input.value)) {
      if (isEmpty(email.input.value)) {
        email.errorMessage.innerText = "This field is required";
      } else {
        email.errorMessage.innerText = "Invalid emailaddress";
      }
      addErrors();

      // Gebruik een named function (doubleCheckPassword), om die er weer af te kunnen halen. Dit vermijdt ook het dubbel toevoegen ervan.
      email.input.addEventListener("input", doubleCheckEmailAddress);
    }
  });

  submitButton.addEventListener("click", function (e) {
    // We gaan de form zelf versturen wanneer nodig.

    if (isValidEmailAddress(email.input.value)) {
      console.log("Form is good to go!");
      window.location.href = "data.html";
    } else {
      addErrors();
      email.input.addEventListener("input", doubleCheckEmailAddress);
    }
  });
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
// We kunnen pas iets doen met onze html-content (DOM) als die geladen is.
document.addEventListener("DOMContentLoaded", function () {
  // Ook even testen of ik DoMConteeentLoeaaded goed geschreven heb...
  console.log("DOM loaded");

  // We splitsen alles netjes op in verschillende functies.
  // 1. Alle linken leggen naar onze HTML.
  getDOMElements();

  // 2. We voegen listeners toe om te wachten op interactie
  enableListeners();
});
/* -------------------------------------------------------------------------- */
