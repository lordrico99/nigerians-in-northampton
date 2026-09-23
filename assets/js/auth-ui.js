(function () {
  "use strict";

  const API_BASE_URL = (
    window.NIN_API_BASE_URL ||
    `${window.location.protocol}//${window.location.hostname}:5000/api`
  ).replace(/\/$/, "");

  const CACHE_KEY = "nin_auth_user_cache";


  /* =========================================================
     CACHE
  ========================================================= */

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


  /* =========================================================
     CURRENT PAGE
  ========================================================= */

  function getCurrentPageTarget() {
    return (
      `${window.location.pathname.split("/").pop() || "index.html"}` +
      `${window.location.search || ""}` +
      `${window.location.hash || ""}`
    );
  }


  /* =========================================================
     DESKTOP ACCOUNT DROPDOWN
  ========================================================= */

  function closeAccountDropdown() {
    const account =
      document.getElementById("headerAccount");

    const button =
      document.getElementById("accountButton");

    const dropdown =
      document.getElementById("accountDropdown");

    if (account) {
      account.classList.remove("show");
    }

    if (button) {
      button.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    if (dropdown) {
      dropdown.classList.remove("show");
    }
  }


  function openAccountDropdown() {
    const account =
      document.getElementById("headerAccount");

    const button =
      document.getElementById("accountButton");

    const dropdown =
      document.getElementById("accountDropdown");

    if (account) {
      account.classList.add("show");
    }

    if (button) {
      button.setAttribute(
        "aria-expanded",
        "true"
      );
    }

    if (dropdown) {
      dropdown.classList.add("show");
    }
  }


  /* =========================================================
     LOGGED OUT STATE
  ========================================================= */

  function showLoggedOut() {

    /* -------------------------------------------------------
       DESKTOP
    ------------------------------------------------------- */

    const signIn =
      document.getElementById("headerSignIn");

    const account =
      document.getElementById("headerAccount");


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


    /* -------------------------------------------------------
       MOBILE
    ------------------------------------------------------- */

    const mobileLoggedOut =
      document.getElementById(
        "mobileAccountLoggedOut"
      );

    const mobileLoggedIn =
      document.getElementById(
        "mobileAccountLoggedIn"
      );

    const mobileIdentity =
      document.getElementById(
        "mobileLoggedInIdentity"
      );


    /* Show Sign In / Create Account */

    if (mobileLoggedOut) {
      mobileLoggedOut.style.setProperty(
        "display",
        "flex",
        "important"
      );
    }


    /* Hide logged-in actions */

    if (mobileLoggedIn) {
      mobileLoggedIn.style.setProperty(
        "display",
        "none",
        "important"
      );
    }


    /* Hide logged-in identity */

    if (mobileIdentity) {
      mobileIdentity.classList.remove(
        "is-visible"
      );
    }


    /* -------------------------------------------------------
       CLEAR AUTH STATE
    ------------------------------------------------------- */

    cacheUser(null);

    window.NINCurrentUser = null;
  }


  /* =========================================================
     LOGGED IN STATE
  ========================================================= */

  function showLoggedIn(user) {

    /* -------------------------------------------------------
       DESKTOP
    ------------------------------------------------------- */

    const signIn =
      document.getElementById("headerSignIn");

    const account =
      document.getElementById("headerAccount");


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


    /* -------------------------------------------------------
       USER DATA
    ------------------------------------------------------- */

    const name =
      user?.name || "Account";

    const email =
      user?.email || "";

    const role =
      user?.role || "Member";


    /* -------------------------------------------------------
       DESKTOP ACCOUNT DETAILS
    ------------------------------------------------------- */

    const accountButtonName =
      document.getElementById(
        "accountButtonName"
      );

    const accountAvatar =
      document.getElementById(
        "accountAvatar"
      );

    const dropdownName =
      document.getElementById(
        "accountDropdownName"
      );

    const dropdownEmail =
      document.getElementById(
        "accountDropdownEmail"
      );

    const dropdownRole =
      document.getElementById(
        "accountDropdownRole"
      );


    if (accountButtonName) {
      accountButtonName.textContent =
        name;
    }


    if (accountAvatar) {
      accountAvatar.textContent =
        getInitials(name);
    }


    if (dropdownName) {
      dropdownName.textContent =
        name;
    }


    if (dropdownEmail) {
      dropdownEmail.textContent =
        email;
    }


    if (dropdownRole) {
      dropdownRole.textContent =
        role;
    }


    /* -------------------------------------------------------
       MOBILE LOGGED-IN ACTIONS
    ------------------------------------------------------- */

    const mobileLoggedOut =
      document.getElementById(
        "mobileAccountLoggedOut"
      );

    const mobileLoggedIn =
      document.getElementById(
        "mobileAccountLoggedIn"
      );


    if (mobileLoggedOut) {
      mobileLoggedOut.style.setProperty(
        "display",
        "none",
        "important"
      );
    }


    if (mobileLoggedIn) {

      /*
       * IMPORTANT:
       * This is intentionally "block", not "flex".
       * The buttons must stack vertically:
       *
       * List Your Business
       * Advertise With Us
       * Profile
       * Sign out
       */

      mobileLoggedIn.style.setProperty(
        "display",
        "block",
        "important"
      );
    }


    /* -------------------------------------------------------
       MOBILE USER IDENTITY
       Name + Email + Initials
    ------------------------------------------------------- */

    const mobileIdentity =
      document.getElementById(
        "mobileLoggedInIdentity"
      );

    const mobileName =
      document.getElementById(
        "mobileAccountName"
      );

    const mobileEmail =
      document.getElementById(
        "mobileAccountEmail"
      );

    const mobileAvatar =
      document.getElementById(
        "mobileAccountAvatar"
      );


    /* Show identity above Home */

    if (mobileIdentity) {
      mobileIdentity.classList.add(
        "is-visible"
      );
    }


    /* Name */

    if (mobileName) {
      mobileName.textContent =
        name;
    }


    /* Email */

    if (mobileEmail) {
      mobileEmail.textContent =
        email;
    }


    /* Initials */

    if (mobileAvatar) {
      mobileAvatar.textContent =
        getInitials(name);
    }


    /* -------------------------------------------------------
       MOBILE PROFILE
    ------------------------------------------------------- */

    const mobileProfileLink =
      document.getElementById(
        "mobileProfileLink"
      );


    if (mobileProfileLink) {
      mobileProfileLink.href = "#";
    }


    /* -------------------------------------------------------
       SAVE AUTH STATE
    ------------------------------------------------------- */

    cacheUser(user);

    window.NINCurrentUser = user;
  }


  /* =========================================================
     INITIALS
  ========================================================= */

  function getInitials(name) {

    const parts =
      String(name || "Account")
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


  /* =========================================================
     DESKTOP ACCOUNT DROPDOWN
  ========================================================= */

  function setupAccountDropdown() {

    const accountButton =
      document.getElementById(
        "accountButton"
      );

    const accountDropdown =
      document.getElementById(
        "accountDropdown"
      );

    const account =
      document.getElementById(
        "headerAccount"
      );


    if (
      !accountButton ||
      !accountDropdown ||
      !account
    ) {
      return;
    }


    if (
      accountButton.dataset.authUiReady ===
      "true"
    ) {
      return;
    }


    accountButton.dataset.authUiReady =
      "true";


    /* Toggle dropdown */

    accountButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();


        const isOpen =
          account.classList.contains(
            "show"
          );


        if (isOpen) {
          closeAccountDropdown();
        } else {
          openAccountDropdown();
        }
      }
    );


    /* Prevent dropdown click from bubbling */

    accountDropdown.addEventListener(
      "click",
      function (event) {
        event.stopPropagation();
      }
    );


    /* Close when clicking elsewhere */

    document.addEventListener(
      "click",
      function (event) {

        if (!account.contains(event.target)) {
          closeAccountDropdown();
        }
      }
    );


    /* Close with Escape */

    document.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Escape") {
          closeAccountDropdown();
        }
      }
    );
  }


  /* =========================================================
     PROFILE LINKS
  ========================================================= */

  function setupProfileLinks() {

    const desktopProfile =
      document.getElementById(
        "profileMenuLink"
      );

    const mobileProfile =
      document.getElementById(
        "mobileProfileLink"
      );


    [
      desktopProfile,
      mobileProfile
    ]
      .filter(Boolean)
      .forEach(function (link) {

        if (
          link.dataset.authProfileReady ===
          "true"
        ) {
          return;
        }


        link.dataset.authProfileReady =
          "true";


        link.addEventListener(
          "click",
          function (event) {

            event.preventDefault();

          }
        );
      });
  }


  /* =========================================================
     LOGOUT
  ========================================================= */

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


  /* =========================================================
     SIGN OUT BUTTONS
  ========================================================= */

  function setupSignOut() {

    const desktopSignOut =
      document.getElementById(
        "desktopSignOut"
      );

    const mobileSignOut =
      document.getElementById(
        "mobileSignOut"
      );


    [
      desktopSignOut,
      mobileSignOut
    ]
      .filter(Boolean)
      .forEach(function (button) {

        if (
          button.dataset.authLogoutReady ===
          "true"
        ) {
          return;
        }


        button.dataset.authLogoutReady =
          "true";


        button.addEventListener(
          "click",
          function (event) {

            event.preventDefault();

            logout();

          }
        );
      });
  }


  /* =========================================================
     LOGIN / SIGNUP LINKS
  ========================================================= */

  function updateAuthLinks() {

    const target =
      getCurrentPageTarget();


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


        link.href =
          url.href;
      });
  }


  /* =========================================================
     CHECK CURRENT USER
  ========================================================= */

  async function checkCurrentUser() {

    try {

      const response =
        await fetch(
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


      showLoggedIn(
        payload.user
      );


    } catch (error) {

      console.error(
        "Could not check authentication state:",
        error
      );


      /* -----------------------------------------------------
         FALL BACK TO CACHED USER
      ----------------------------------------------------- */

      const cachedUser =
        getCachedUser();


      if (cachedUser) {

        showLoggedIn(
          cachedUser
        );

      } else {

        showLoggedOut();
      }
    }
  }


  /* =========================================================
     INITIALISE AUTH UI
  ========================================================= */

  async function initAuthUI() {

    setupAccountDropdown();

    setupSignOut();

    setupProfileLinks();

    updateAuthLinks();


    /* -------------------------------------------------------
       SHOW CACHED STATE FIRST
    ------------------------------------------------------- */

    const cachedUser =
      getCachedUser();


    if (cachedUser) {

      showLoggedIn(
        cachedUser
      );

    } else {

      showLoggedOut();
    }


    /* -------------------------------------------------------
       VERIFY WITH SERVER
    ------------------------------------------------------- */

    await checkCurrentUser();
  }


  /* =========================================================
     START
  =========================================================

     auth-ui.js is loaded dynamically by
     site-header.js.

     Therefore DOMContentLoaded may already
     have happened.
  ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initAuthUI
    );

  } else {

    initAuthUI();
  }

})();