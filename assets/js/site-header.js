(function () {
  "use strict";


  /* =========================================================
     LOAD SHARED HEADER
     ========================================================= */

  async function loadSiteHeader() {

    const container =
      document.getElementById("siteHeader");

    if (!container) {
      return;
    }


    try {

      const headerURL =
        new URL(
          "partials/header.html",
          document.baseURI
        );


      const response =
        await fetch(
          headerURL,
          {
            cache: "no-store"
          }
        );


      if (!response.ok) {

        throw new Error(
          `Could not load shared header (${response.status})`
        );

      }


      container.innerHTML =
        await response.text();


      setActiveNavigation();

      await loadAuthUI();

      setupHeaderInteractions();

      document.dispatchEvent(
        new CustomEvent(
          "nin:header-loaded"
        )
      );


    }
    catch (error) {

      console.error(
        "NIN site header could not be loaded:",
        error
      );


      container.innerHTML =
        `
          <div
            class="container py-3"
            style="color:#b91c1c;"
          >
            Unable to load site navigation.
          </div>
        `;

    }

  }


  /* =========================================================
     ACTIVE PAGE
     ========================================================= */

  function setActiveNavigation() {

    const currentPage =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase()
      ||
      "index.html";


    const items =
      document.querySelectorAll(
        "#siteHeader [data-header-page]"
      );


    items.forEach(
      (item) => {

        item.classList.remove(
          "active"
        );

        item.removeAttribute(
          "aria-current"
        );

      }
    );


    let activePage =
      null;


    if (
      currentPage ===
      "index.html"
    ) {

      activePage =
        "home";

    }
    else if (
      currentPage ===
        "businesses.html" ||
      currentPage ===
        "listing.html" ||
      currentPage ===
        "list-your-business.html"
    ) {

      activePage =
        "businesses";

    }
    else if (
      currentPage ===
      "community.html"
    ) {

      activePage =
        "community";

    }
    else if (
      currentPage ===
      "events.html"
    ) {

      activePage =
        "events";

    }
    else if (
      currentPage ===
      "guides.html"
    ) {

      activePage =
        "guides";

    }
    else if (
      currentPage ===
      "about.html"
    ) {

      activePage =
        "about";

    }


    if (!activePage) {
      return;
    }


    document
      .querySelectorAll(
        `#siteHeader [data-header-page="${activePage}"]`
      )
      .forEach(
        (item) => {

          item.classList.add(
            "active"
          );

          item.setAttribute(
            "aria-current",
            "page"
          );

        }
      );

  }


  /* =========================================================
     AUTH UI
     ========================================================= */

  function loadAuthUI() {

    return new Promise(
      (resolve, reject) => {

        if (
          window.NINAuthUILoaded
        ) {

          resolve();

          return;

        }


        const script =
          document.createElement(
            "script"
          );


        script.src =
          new URL(
            "assets/js/auth-ui.js",
            document.baseURI
          ).href;


        script.async =
          false;


        script.onload =
          () => {

            window.NINAuthUILoaded =
              true;

            resolve();

          };


        script.onerror =
          () => {

            reject(
              new Error(
                "Could not load assets/js/auth-ui.js"
              )
            );

          };


        document.body.appendChild(
          script
        );

      }
    );

  }


  /* =========================================================
     HEADER INTERACTIONS
     ========================================================= */

  function setupHeaderInteractions() {

    const header =
      document.getElementById(
        "siteHeader"
      );


    if (!header) {
      return;
    }


    setupMobileDrawer(header);

    setupDesktopMenus(header);

    setupAccountDropdown(header);

  }


  /* =========================================================
     MOBILE DRAWER
     ========================================================= */

  function setupMobileDrawer(header) {

    const drawer =
      header.querySelector(
        "#navDrawer"
      );


    const toggle =
      header.querySelector(
        ".mobile-menu-toggle"
      );


    if (!drawer || !toggle) {
      return;
    }


    function isMobile() {

      return window.matchMedia(
        "(max-width: 991.98px)"
      ).matches;

    }


    function openDrawer() {

      if (!isMobile()) {
        return;
      }


      if (
        typeof drawer.showModal ===
        "function"
      ) {

        if (!drawer.open) {
          drawer.showModal();
        }

      }
      else {

        drawer.setAttribute(
          "open",
          ""
        );

      }


      toggle.setAttribute(
        "aria-expanded",
        "true"
      );


      toggle.setAttribute(
        "aria-label",
        "Close navigation"
      );

    }


    function closeDrawer() {

      if (
        typeof drawer.close ===
        "function"
      ) {

        if (drawer.open) {
          drawer.close();
        }

      }
      else {

        drawer.removeAttribute(
          "open"
        );

      }


      toggle.setAttribute(
        "aria-expanded",
        "false"
      );


      toggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    }


    toggle.setAttribute(
      "aria-expanded",
      "false"
    );


    toggle.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        event.stopPropagation();


        if (
          drawer.open
        ) {

          closeDrawer();

        }
        else {

          openDrawer();

        }

      }
    );


    /* Close button */

    drawer
      .querySelectorAll(
        '[data-bs-dismiss="drawer"]'
      )
      .forEach(
        (button) => {

          button.addEventListener(
            "click",
            (event) => {

              event.preventDefault();

              closeDrawer();

            }
          );

        }
      );


    /* Any regular mobile nav link closes the drawer */

    drawer
      .querySelectorAll(
        "a.nav-link"
      )
      .forEach(
        (link) => {

          link.addEventListener(
            "click",
            () => {

              window.setTimeout(
                closeDrawer,
                0
              );

            }
          );

        }
      );


    /* Close when clicking backdrop */

    drawer.addEventListener(
      "click",
      (event) => {

        if (
          event.target ===
          drawer
        ) {

          closeDrawer();

        }

      }
    );


    /* Escape */

    drawer.addEventListener(
      "cancel",
      () => {

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );


        toggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      }
    );


    /* Keep drawer closed when switching to desktop */

    const mediaQuery =
      window.matchMedia(
        "(max-width: 991.98px)"
      );


    function syncDrawerWithViewport() {

      if (
        !mediaQuery.matches
      ) {

        closeDrawer();

      }

    }


    if (
      typeof mediaQuery.addEventListener ===
      "function"
    ) {

      mediaQuery.addEventListener(
        "change",
        syncDrawerWithViewport
      );

    }
    else if (
      typeof mediaQuery.addListener ===
      "function"
    ) {

      mediaQuery.addListener(
        syncDrawerWithViewport
      );

    }


    syncDrawerWithViewport();

  }


  /* =========================================================
     DESKTOP DROPDOWN MENUS
     ========================================================= */

  function setupDesktopMenus(header) {

    const triggers =
      header.querySelectorAll(
        '[data-bs-toggle="menu"]'
      );


    if (!triggers.length) {
      return;
    }


    function isDesktop() {

      return window.matchMedia(
        "(min-width: 992px)"
      ).matches;

    }


    function closeAllMenus() {

      header
        .querySelectorAll(
          ".desktop-nav-row .nav-item.menu-open"
        )
        .forEach(
          (item) => {

            item.classList.remove(
              "menu-open"
            );


            const trigger =
              item.querySelector(
                '[data-bs-toggle="menu"]'
              );


            if (trigger) {

              trigger.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          }
        );

    }


    triggers.forEach(
      (trigger) => {

        const navItem =
          trigger.closest(
            ".nav-item"
          );


        if (!navItem) {
          return;
        }


        trigger.setAttribute(
          "aria-expanded",
          "false"
        );


        trigger.addEventListener(
          "click",
          (event) => {

            if (!isDesktop()) {
              return;
            }


            event.preventDefault();

            event.stopPropagation();


            const wasOpen =
              navItem.classList.contains(
                "menu-open"
              );


            closeAllMenus();


            if (!wasOpen) {

              navItem.classList.add(
                "menu-open"
              );


              trigger.setAttribute(
                "aria-expanded",
                "true"
              );

            }

          }
        );

      }
    );


    document.addEventListener(
      "click",
      (event) => {

        if (!isDesktop()) {
          return;
        }


        if (
          !event.target.closest(
            "#siteHeader .desktop-nav-row"
          )
        ) {

          closeAllMenus();

        }

      }
    );


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key !== "Escape"
        ) {

          return;

        }


        closeAllMenus();

      }
    );


    window.addEventListener(
      "resize",
      closeAllMenus
    );

  }


  /* =========================================================
     ACCOUNT DROPDOWN
     ========================================================= */

  function setupAccountDropdown(header) {

    const button =
      header.querySelector(
        "#accountButton"
      );


    const dropdown =
      header.querySelector(
        "#accountDropdown"
      );


    if (!button || !dropdown) {
      return;
    }


    function closeAccount() {

      dropdown.hidden =
        true;


      button.setAttribute(
        "aria-expanded",
        "false"
      );

    }


    function openAccount() {

      dropdown.hidden =
        false;


      button.setAttribute(
        "aria-expanded",
        "true"
      );

    }


    closeAccount();


    button.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        event.stopPropagation();


        if (
          dropdown.hidden
        ) {

          openAccount();

        }
        else {

          closeAccount();

        }

      }
    );


    dropdown.addEventListener(
      "click",
      (event) => {

        const link =
          event.target.closest(
            "a, button"
          );


        if (
          link &&
          link.id !==
            "accountButton"
        ) {

          /*
            Allow the action to proceed.
            The dropdown closes immediately.
          */

          closeAccount();

        }

      }
    );


    document.addEventListener(
      "click",
      (event) => {

        if (
          !event.target.closest(
            "#siteHeader #headerAccount"
          )
        ) {

          closeAccount();

        }

      }
    );


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key ===
          "Escape"
        ) {

          closeAccount();

        }

      }
    );


    window.addEventListener(
      "resize",
      closeAccount
    );

  }


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      loadSiteHeader
    );

  }
  else {

    loadSiteHeader();

  }

})();

