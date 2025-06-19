import { renderLanding } from "./components/Landing.js";
import { renderLogin } from "./components/login/Login.js";
import { renderChipDisplay } from "./components/chipDisplay/ChipDisplay.js";

function handleRouting() {
  const hash = window.location.hash;

  if (hash === "#login") {
    renderLogin();
  } else if (hash === "#createaccount") {
    renderCreateAccount();
  } else if (hash === "#chipdisplay") {
    renderChipDisplay();
  } else {
    renderLanding();
  }
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("load", handleRouting);
