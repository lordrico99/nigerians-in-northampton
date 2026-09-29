(function () {
  "use strict";

  /* =========================================================
     LOAD SHARED HEADER
  ========================================================== */

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


      container.innerHTML = `
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
     ACTIVE NAVIGATION
     
     One mapping is used for the entire shared header.
     Desktop and mobile items use the same data-header-page
     values, so the active state stays consistent.
  ========================================================== */

  function setActiveNavigation() {

    const currentPage =
      getCurrentPage();


    const pageMap = {

      "index.html":
        "home",

      "businesses.html":
        "businesses",

      "listing.html":
        "businesses",

      "list-your-business.html":
        "businesses",

      "community.html":
        "community",

      "news.html":
        "news",

      "events.html":
        "events",

      "guides.html":
        "guides",

      "about.html":
        "about"

    };


    const activePage =
      pageMap[currentPage] ||
      null;


    /* ---------------------------------------------------------
       Clear ALL active states first
    ---------------------------------------------------------- */

    document
      .querySelectorAll(
        "#siteHeader [data-header-page]"
      )
      .forEach(
        function (item) {

          item.classList.remove(
            "active"
          );

          item.removeAttribute(
            "aria-current"
          );

        }
      );


    /* ---------------------------------------------------------
       Nothing to activate for pages not represented in the
       main navigation.
    ---------------------------------------------------------- */

    if (!activePage) {
      return;
    }


    /* ---------------------------------------------------------
       Activate every matching desktop/mobile navigation item.
    ---------------------------------------------------------- */

    document
      .querySelectorAll(
        `#siteHeader [data-header-page="${activePage}"]`
      )
      .forEach(
        function (item) {

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
     CURRENT PAGE
     
     Handles:
     - /index.html
     - /
     - /news.html
     - query strings
     - hash fragments
  ========================================================== */

  function getCurrentPage() {

    const pathname =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    /*
     * Root URL:
     * /  -> index.html
     */
    if (!pathname) {

      return "index.html";

    }


    return pathname;

  }


  /* =========================================================
     AUTH UI
  ========================================================== */

  function loadAuthUI() {

    return new Promise(
      function (resolve, reject) {

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
          function () {

            window.NINAuthUILoaded =
              true;

            resolve();

          };


        script.onerror =
          function () {

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
     START
  ========================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      loadSiteHeader,
      {
        once: true
      }
    );

  }
  else {

    loadSiteHeader();

  }

})();