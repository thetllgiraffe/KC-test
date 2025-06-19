import "../../style.css";
import "./Login.css";
import robo from "/neural_robot.png";
import techgrid4 from "/tech_grid4.png";
import { flickerSwitch } from "../backgrounds/GridFlicker.js";
import { renderCreateAccount } from "../createAccount/CreateAccount.js";
import { GoogleSignIn } from "../GoogleSignin.js";

export function renderLogin() {
  document.querySelector("#app").innerHTML = `
    <div class="login-container">
      <img src="${techgrid4}" alt="tech grid" class="tech-bg" />
      <img src="${robo}" alt="neural robot" class="robot-bg" />
      <div class="login-card">
        <h2>Kard Chips</h2>
        <form class="login-form">
          <input type="text" placeholder="Username or Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" class="neon-outline-btn">Sign In</button>
        </form>
        ${GoogleSignIn()}
        <p class="signup-prompt">Don't have an account?</p>
        <button id="create-account" class="neon-outline-btn create-account-btn">Join the Circuit</button>
      </div>
    </div>
  `;

  flickerSwitch();

  document.getElementById("create-account").addEventListener("click", () => {
    window.location.hash = "#createaccount";
    renderCreateAccount();
  });

  document
    .querySelector(".login-card")
    .insertAdjacentHTML("beforeend", GoogleSignIn());
}
