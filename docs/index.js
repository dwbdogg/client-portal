// docs/index.js

// Simple logger so we can see status in the console
const log = (...a) => console.log("[demo]", ...a);

// 1) Initialize the portal to YOUR env
const portal = new ClientPortal({
  url: "https://fit4lesstesting.perfectgym.com/ClientPortal2/",   // ← your test env
  defaultState: "Login",                                          // or "Profile"
  minHeight: 1000,
  loadMask: { disable: false },

  // Optional toggles
  loginPage: { navbar: false, logo: false, backgroundImage: false },
  navigation: { hide: false, logo: false },
  registration: { logo: false },

  onConnect: () => { log("onConnect"); setAuthUI(false); },
  onLogin:   () => { log("onLogin");   setAuthUI(true);  },
  onLogout:  () => { log("onLogout");  setAuthUI(false); },
  onChangeState: (info) => log("onChangeState", info)
});

// 2) Mount it into the placeholder div in docs/index.html
const host = document.getElementById("pg-client-portal");
if (!host) {
  console.error("Missing #pg-client-portal in docs/index.html");
} else {
  host.appendChild(portal.element);
  log("iframe appended");
}

// 3) Hook up header buttons used by index.html
window.goTo = function(stateName, params) {
  try {
    portal.goTo(stateName, params || {});
  } catch (e) {
    console.error("goTo error", e);
  }
};

window.logout = function() {
  try {
    if (portal.logout) portal.logout();
    else portal.goTo("Logout");
  } catch (e) {
    console.error("logout error", e);
  }
};

// 4) Show/hide nav for auth state
function setAuthUI(isLogged) {
  document.querySelectorAll(".logged-state").forEach(el => el.style.display = isLogged ? "inline-block" : "none");
  document.querySelectorAll(".not-logged-state").forEach(el => el.style.display = isLogged ? "none" : "inline-block");
}

// 5) Safety checks
if (!window.ClientPortal) {
  console.error("ClientPortal is not defined — library failed to load.");
}
