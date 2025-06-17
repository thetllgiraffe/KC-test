import { renderLanding } from "./components/Landing.js";
import { renderLogin } from "./components/login/Login.js";

function route() {
  const hash = window.location.hash;
  if (hash === "#login") {
    renderLogin();
  } else {
    renderLanding();
  }
}

window.addEventListener("hashchange", route);

route();
