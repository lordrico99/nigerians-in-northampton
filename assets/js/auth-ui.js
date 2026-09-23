(function () {
  "use strict";

  const API_BASE_URL = (
    window.NIN_API_BASE_URL ||
    `${window.location.protocol}//${window.location.hostname}:5000/api`
  ).replace(/\/$/, "");

  const CACHE_KEY = "nin_auth_user_cache";

  function getCachedUser() {
    try {
      return JSON.parse(
        localStorage.getItem(CACHE_KEY) || "null"
      );
    } catch {
      return null;
    }
  }

  function cacheUser(user) {
    try {
      if (user) {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify(user)
        );
      } else {
        localStorage.removeItem(CACHE_KEY);
      }
    } catch {
      // Ignore localStorage errors.
    }
  }

  function getCurrentPageTarget() {
    return (
      `${window.location.pathname.split("/").pop() || "index.html"}` +
      `${window.location.search || ""}` +
      `${window.location.hash || ""}`
    );
  }

  function closeAccountDropdown() {
    const account = document.getElementById("headerAccount");
    const button = document.getElementById("accountButton");
    const dropdown = document.getElementById("accountDropdown");

    if (account) {
      account.classList.remove("show");
    }

    if (button) {
      button.setAttribute("aria-expanded", "false");
    }

    if (dropdown) {
      dropdown.classList.remove("show");
    }
  }

  function openAccountDropdown() {
    const account = document.getElementById("headerAccount");
    const button = document.getElementById("accountButton");
    const dropdown = document.getElementById("accountDropdown");

    if (account) {
      account.classList.add("show");
    }

    if (button) {
      button.setAttribute("aria-expanded", "true");
    }

    if (dropdown) {
      dropdown.classList.add("show");
    }
  }

function showLoggedOut() {
  const signIn = document.getElementById("headerSignIn");
  const account = document.getElementById("headerAccount");

  if (signIn) {
    signIn.style.setProperty(
      "display",
      "inline-flex",
      "important"
    );
  }

  if (account) {
    account.style.setProperty(
      "display",
      "none",
      "important"
    );

    account.classList.remove("show");
  }

  closeAccountDropdown();

  const mobileLoggedOut =
    document.getElementById("mobileAccountLoggedOut");

  const mobileLoggedIn =
    document.getElementById("mobileAccountLoggedIn");

  if (mobileLoggedOut) {
    mobileLoggedOut.style.setProperty(
      "display",
      "flex",
      "important"
    );
  }

  if (mobileLoggedIn) {
    mobileLoggedIn.style.setProperty(
      "display",
      "none",
      "important"
    );
  }

  cacheUser(null);
  window.NINCurrentUser = null;
}

function showLoggedIn(user) {
  const signIn = document.getElementById("headerSignIn");
  const account = document.getElementById("headerAccount");

  if (signIn) {
    signIn.style.setProperty(
      "display",
      "none",
      "important"
    );
  }

if (account) {
  account.style.setProperty(
    "display",
    "flex",
    "important"
  );

  account.classList.remove("show");
}

  const name = user?.name || "Account";
  const email = user?.email || "";
  const role = user?.role || "Member";

  const accountButtonName =
    document.getElementById("accountButtonName");

  const accountAvatar =
    document.getElementById("accountAvatar");

  const dropdownName =
    document.getElementById("accountDropdownName");

  const dropdownEmail =
    document.getElementById("accountDropdownEmail");

  const dropdownRole =
    document.getElementById("accountDropdownRole");

  if (accountButtonName) {
    accountButtonName.textContent = name;
  }

  if (accountAvatar) {
    accountAvatar.textContent = getInitials(name);
  }

  if (dropdownName) {
    dropdownName.textContent = name;
  }

  if (dropdownEmail) {
    dropdownEmail.textContent = email;
  }

  if (dropdownRole) {
    dropdownRole.textContent = role;
  }

  const mobileLoggedOut =
    document.getElementById("mobileAccountLoggedOut");

  const mobileLoggedIn =
    document.getElementById("mobileAccountLoggedIn");

  if (mobileLoggedOut) {
    mobileLoggedOut.style.setProperty(
      "display",
      "none",
      "important"
    );
  }

  if (mobileLoggedIn) {
    mobileLoggedIn.style.setProperty(
      "display",
      "flex",
      "important"
    );
  }

  const mobileName =
    document.getElementById("mobileAccountName");

  const mobileEmail =
    document.getElementById("mobileAccountEmail");

  if (mobileName) {
    mobileName.textContent = name;
  }

  if (mobileEmail) {
    mobileEmail.textContent = email;
  }

  const mobileProfileLink =
    document.getElementById("mobileProfileLink");

  if (mobileProfileLink) {
    mobileProfileLink.href = "#";
  }

  cacheUser(user);
  window.NINCurrentUser = user;
}

  function getInitials(name) {
    const parts = String(name || "Account")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!parts.length) {
      return "A";
    }

    if (parts.length === 1) {
      return parts[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return (
      `${parts[0][0]}${parts[parts.length - 1][0]}`
    ).toUpperCase();
  }

  function setupAccountDropdown() {
    const accountButton =
      document.getElementById("accountButton");

    const accountDropdown =
      document.getElementById("accountDropdown");

    const account =
      document.getElementById("headerAccount");

    if (!accountButton || !accountDropdown || !account) {
      return;
    }

    if (
      accountButton.dataset.authUiReady === "true"
    ) {
      return;
    }

    accountButton.dataset.authUiReady = "true";

    accountButton.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen =
          account.classList.contains("show");

        if (isOpen) {
          closeAccountDropdown();
        } else {
          openAccountDropdown();
        }
      }
    );

    accountDropdown.addEventListener(
      "click",
      function (event) {
        event.stopPropagation();
      }
    );

    document.addEventListener(
      "click",
      function (event) {
        if (
          !account.contains(event.target)
        ) {
          closeAccountDropdown();
        }
      }
    );

    document.addEventListener(
      "keydown",
      function (event) {
        if (event.key === "Escape") {
          closeAccountDropdown();
        }
      }
    );
  }

  function setupProfileLinks() {
    const desktopProfile =
      document.getElementById("profileMenuLink");

    const mobileProfile =
      document.getElementById("mobileProfileLink");

    [desktopProfile, mobileProfile]
      .filter(Boolean)
      .forEach(function (link) {
        if (
          link.dataset.authProfileReady === "true"
        ) {
          return;
        }

        link.dataset.authProfileReady = "true";

        link.addEventListener(
          "click",
          function (event) {
            event.preventDefault();
          }
        );
      });
  }

  async function logout() {
    try {
      await fetch(
        `${API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      console.error(
        "Logout request failed:",
        error
      );
    }

    cacheUser(null);
    window.NINCurrentUser = null;

    window.location.reload();
  }

  function setupSignOut() {
    const desktopSignOut =
      document.getElementById("desktopSignOut");

    const mobileSignOut =
      document.getElementById("mobileSignOut");

    [desktopSignOut, mobileSignOut]
      .filter(Boolean)
      .forEach(function (button) {
        if (
          button.dataset.authLogoutReady === "true"
        ) {
          return;
        }

        button.dataset.authLogoutReady = "true";

        button.addEventListener(
          "click",
          function (event) {
            event.preventDefault();
            logout();
          }
        );
      });
  }

  function updateAuthLinks() {
    const target = getCurrentPageTarget();

    document
      .querySelectorAll(
        '#siteHeader a[href*="login.html"], ' +
        '#siteHeader a[href*="signup.html"]'
      )
      .forEach(function (link) {
        const url =
          new URL(
            link.href,
            document.baseURI
          );

        url.searchParams.set(
          "next",
          target
        );

        link.href = url.href;
      });
  }

  async function checkCurrentUser() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/me`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store"
        }
      );

      if (!response.ok) {
        showLoggedOut();
        return;
      }

      const payload =
        await response.json();

      if (
        !payload?.success ||
        !payload?.user
      ) {
        showLoggedOut();
        return;
      }

      showLoggedIn(payload.user);

    } catch (error) {
      console.error(
        "Could not check authentication state:",
        error
      );

      const cachedUser =
        getCachedUser();

      if (cachedUser) {
        showLoggedIn(cachedUser);
      } else {
        showLoggedOut();
      }
    }
  }

  async function initAuthUI() {
    setupAccountDropdown();
    setupSignOut();
    setupProfileLinks();
    updateAuthLinks();

    const cachedUser =
      getCachedUser();

    if (cachedUser) {
      showLoggedIn(cachedUser);
    } else {
      showLoggedOut();
    }

    await checkCurrentUser();
  }

  /*
   * auth-ui.js is loaded dynamically by site-header.js.
   * Therefore DOMContentLoaded may already have happened.
   */
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initAuthUI
    );
  } else {
    initAuthUI();
  }

})();