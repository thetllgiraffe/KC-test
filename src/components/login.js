import "../style.css";
import "./login.css";
import robo from "/neural_robot.png";

export function renderLogin() {
  document.querySelector("#app").innerHTML = `
  <div class="login-container">
    <img src="${robo}" alt="neural robot" class="robot-bg" />
    <div class="login-card">
      <h2>Kard Chips</h2>
      <form class="login-form">
        <input type="text" placeholder="Username or Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" class="neon-btn">Sign In</button>
      </form>
      <p class="signup-prompt">Don't have an account?</p>
      <button id="create-account" class="neon-outline-btn create-account-btn">Create Account</button>
    </div>
  </div>
`;

  document.getElementById("create-account").addEventListener("click", () => {
    alert("Redirecting to account creation (placeholder)");
  });
}
