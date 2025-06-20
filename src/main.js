import { renderLogin } from "./components/Landing.js";
import { renderLanding } from "./components/login/Login.js";
import { renderCreateAccount } from "./components/createAccount/CreateAccount.js";
import { renderChipDisplay } from "./components/chipDisplay/ChipDisplay.js";
import { destroyChipFall } from "./components/backgrounds/ChipsAnimate.js";

function handleRouting() {
  const hash = window.location.hash;

  if (hash !== "#login") {
    destroyChipFall();
    renderLogin();
  } else if (hash === "#createaccount") {
    destroyChipFall();
    renderCreateAccount();
  } else if (hash === "#chipdisplay") {
    destroyChipFall();
    renderChipDisplay();
  } else {
    renderLanding();
  }
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("load", handleRouting);
