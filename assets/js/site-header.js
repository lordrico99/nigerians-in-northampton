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

      /*
       * main.js is loaded after this event.
       * That means Locale's base.js sees the
       * shared header elements when it initializes.
       */

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
  ========================================================= */

  function setActiveNavigation() {

    const currentPage =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() ||
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