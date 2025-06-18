import { renderLanding } from "./components/Landing.js";
import { renderLogin } from "./components/login/Login.js";

function handleRouting() {
  const hash = window.location.hash;

  if (hash === "#login") {
    renderLogin();
  } else if (hash === "#createaccount") {
    renderCreateAccount();
  } else {
    renderLanding();
  }
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("load", handleRouting);
