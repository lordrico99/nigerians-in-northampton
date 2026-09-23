(function () {

  "use strict";


  /* =========================================================
     API
  ========================================================= */

  const API_BASE_URL = (
    window.NIN_API_BASE_URL ||
    `${window.location.protocol}//${window.location.hostname}:5000/api`
  ).replace(/\/$/, "");


  const CACHE_KEY =
    "nin_auth_user_cache";


  /* =========================================================
     RESPONSIVE HEADER STATE
  ========================================================= */

  const mobileHeaderQuery =
    window.matchMedia("(max-width: 991.98px)");

  let currentAuthState =
    "logged-out";


  /*
   * Desktop:
   *   Logged out  -> Sign in visible
   *   Logged in   -> Account dropdown visible
   *
   * Mobile:
   *   Sign in and account dropdown are ALWAYS hidden.
   *   Authentication actions live inside the hamburger drawer.
   */

  function syncHeaderAccountVisibility() {

    const signIn =
      document.getElementById(
        "headerSignIn"
      );

    const account =
      document.getElementById(
        "headerAccount"
      );


    const isMobile =
      mobileHeaderQuery.matches;


    /* -------------------------------------------------------
       MOBILE
    ------------------------------------------------------- */

    if (isMobile) {

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
          "none",
          "important"
        );

      }

      return;

    }


    /* -------------------------------------------------------
       DESKTOP — LOGGED IN
    ------------------------------------------------------- */

    if (
      currentAuthState ===
      "logged-in"
    ) {

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

      }

      return;

    }


    /* -------------------------------------------------------
       DESKTOP — LOGGED OUT
    ------------------------------------------------------- */

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

    }

  }


  /* ---------------------------------------------------------
     KEEP DESKTOP / MOBILE HEADER IN SYNC WHEN SCREEN SIZE
     CHANGES WITHOUT RELOADING THE PAGE.
  --------------------------------------------------------- */

  function handleHeaderBreakpointChange() {

    syncHeaderAccountVisibility();

  }


  if (
    typeof mobileHeaderQuery.addEventListener ===
    "function"
  ) {

    mobileHeaderQuery.addEventListener(
      "change",
      handleHeaderBreakpointChange
    );

  } else if (
    typeof mobileHeaderQuery.addListener ===
    "function"
  ) {

    mobileHeaderQuery.addListener(
      handleHeaderBreakpointChange
    );

  }


  /* =========================================================
     CACHE
  ========================================================= */

  function getCachedUser() {

    try {

      return JSON.parse(
        localStorage.getItem(
          CACHE_KEY
        ) || "null"
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

        localStorage.removeItem(
          CACHE_KEY
        );

      }

    } catch {

      /*
       * Ignore localStorage errors.
       */

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
      document.getElementById(
        "headerAccount"
      );


    const button =
      document.getElementById(
        "accountButton"
      );


    const dropdown =
      document.getElementById(
        "accountDropdown"
      );


    if (account) {

      account.classList.remove(
        "show"
      );

    }


    if (button) {

      button.setAttribute(
        "aria-expanded",
        "false"
      );

    }


    if (dropdown) {

      dropdown.classList.remove(
        "show"
      );

    }

  }


  function openAccountDropdown() {

    /*
     * Never open the desktop account dropdown
     * on mobile.
     */

    if (
      mobileHeaderQuery.matches
    ) {

      return;

    }


    const account =
      document.getElementById(
        "headerAccount"
      );


    const button =
      document.getElementById(
        "accountButton"
      );


    const dropdown =
      document.getElementById(
        "accountDropdown"
      );


    if (account) {

      account.classList.add(
        "show"
      );

    }


    if (button) {

      button.setAttribute(
        "aria-expanded",
        "true"
      );

    }


    if (dropdown) {

      dropdown.classList.add(
        "show"
      );

    }

  }


  /* =========================================================
     LOGGED OUT
  ========================================================= */

  function showLoggedOut() {

    currentAuthState =
      "logged-out";


    /* -------------------------------------------------------
       DESKTOP / MOBILE HEADER
    ------------------------------------------------------- */

    closeAccountDropdown();

    syncHeaderAccountVisibility();


    /* -------------------------------------------------------
       MOBILE DRAWER
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


    /* -------------------------------------------------------
       SHOW LOGGED-OUT MOBILE ACTIONS
    ------------------------------------------------------- */

    if (mobileLoggedOut) {

      mobileLoggedOut.style.setProperty(
        "display",
        "flex",
        "important"
      );

    }


    /* -------------------------------------------------------
       HIDE LOGGED-IN MOBILE ACTIONS
    ------------------------------------------------------- */

    if (mobileLoggedIn) {

      mobileLoggedIn.style.setProperty(
        "display",
        "none",
        "important"
      );

    }


    /* -------------------------------------------------------
       HIDE LOGGED-IN USER IDENTITY
    ------------------------------------------------------- */

    if (mobileIdentity) {

      mobileIdentity.classList.remove(
        "is-visible"
      );

    }


    /* -------------------------------------------------------
       CLEAR AUTH STATE
    ------------------------------------------------------- */

    cacheUser(null);

    window.NINCurrentUser =
      null;

  }


  /* =========================================================
     LOGGED IN
  ========================================================= */

  function showLoggedIn(user) {

    currentAuthState =
      "logged-in";


    /* -------------------------------------------------------
       DESKTOP / MOBILE HEADER
    ------------------------------------------------------- */

    closeAccountDropdown();

    syncHeaderAccountVisibility();


    /* -------------------------------------------------------
       USER DATA
    ------------------------------------------------------- */

    const name =
      user?.name ||
      "Account";


    const email =
      user?.email ||
      "";


    const role =
      user?.role ||
      "Member";


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
       MOBILE ACCOUNT ACTIONS
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


    /* -------------------------------------------------------
       SHOW IDENTITY ABOVE HOME
    ------------------------------------------------------- */

    if (mobileIdentity) {

      mobileIdentity.classList.add(
        "is-visible"
      );

    }


    /* -------------------------------------------------------
       MOBILE NAME
    ------------------------------------------------------- */

    if (mobileName) {

      mobileName.textContent =
        name;

    }


    /* -------------------------------------------------------
       MOBILE EMAIL
    ------------------------------------------------------- */

    if (mobileEmail) {

      mobileEmail.textContent =
        email;

    }


    /* -------------------------------------------------------
       MOBILE INITIALS
    ------------------------------------------------------- */

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

      mobileProfileLink.href =
        "#";

    }


    /* -------------------------------------------------------
       SAVE AUTH STATE
    ------------------------------------------------------- */

    cacheUser(user);

    window.NINCurrentUser =
      user;

  }


  /* =========================================================
     INITIALS
  ========================================================= */

  function getInitials(name) {

    const parts =
      String(
        name ||
        "Account"
      )
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


    /* -------------------------------------------------------
       TOGGLE
    ------------------------------------------------------- */

    accountButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();


        /*
         * Do not allow the desktop account
         * dropdown to operate on mobile.
         */

        if (
          mobileHeaderQuery.matches
        ) {

          closeAccountDropdown();

          return;

        }


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


    /* -------------------------------------------------------
       KEEP DROPDOWN CLICK FROM BUBBLING
    ------------------------------------------------------- */

    accountDropdown.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

      }
    );


    /* -------------------------------------------------------
       CLOSE OUTSIDE
    ------------------------------------------------------- */

    document.addEventListener(
      "click",
      function (event) {

        if (
          !account.contains(
            event.target
          )
        ) {

          closeAccountDropdown();

        }

      }
    );


    /* -------------------------------------------------------
       ESCAPE
    ------------------------------------------------------- */

    document.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key ===
          "Escape"
        ) {

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
            "Content-Type":
              "application/json"
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

    window.NINCurrentUser =
      null;


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


    /*
     * Establish initial header visibility before
     * authentication is checked.
     */

    currentAuthState =
      getCachedUser()
        ? "logged-in"
        : "logged-out";


    syncHeaderAccountVisibility();


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
  ========================================================= */

  /*
   * auth-ui.js is loaded dynamically
   * by site-header.js.
   *
   * DOMContentLoaded may therefore
   * already have happened.
   */

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