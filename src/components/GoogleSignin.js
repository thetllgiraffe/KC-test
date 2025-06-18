export function GoogleSignIn() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  window.handleCredentialResponse = function (response) {
    const jwt = response.credential;
    const userData = parseJwt(jwt);
    console.log("Google User:", userData);
  };

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(document.getElementById("google-signin"), {
    theme: "filled_black",
    size: "large",
    shape: "pill",
  });

  if (!document.getElementById("google-identity")) {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-identity";
    document.head.appendChild(script);
  }

  setTimeout(() => {
    window.google?.accounts.id.initialize({
      client_id: clientId,
      callback: window.handleCredentialResponse,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("google-signin"),
      {
        theme: "filled_black",
        size: "large",
        shape: "pill",
        width: 320,
      }
    );
  }, 1000);

  return `<div id="google-signin" style="margin-top: 2rem;"></div>`;
}
