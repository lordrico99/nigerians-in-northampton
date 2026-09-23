(function () {
  "use strict";


  /* =========================================================
     LOAD SHARED SITE HEADER
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


      const headerHTML =
        await response.text();


      container.innerHTML =
        headerHTML;


      /* -------------------------------------------------------
         Set correct active navigation
      ------------------------------------------------------- */

      setActiveNavigation();


      /* -------------------------------------------------------
         Load authentication UI after header exists
      ------------------------------------------------------- */

      await loadAuthUI();


      /* -------------------------------------------------------
         Notify page scripts
      ------------------------------------------------------- */

      document.dispatchEvent(
        new CustomEvent(
          "nin:header-loaded"
        )
      );


    } catch (error) {

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

    const currentPath =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    const currentPage =
      currentPath ||
      "index.html";


    document
      .querySelectorAll(
        "#siteHeader [data-header-page]"
      )
      .forEach(
        (item) => {

          item.classList.remove(
            "active"
          );

          item.removeAttribute(
            "aria-current"
          );

        }
      );


    /* -------------------------------------------------------
       HOME
    ------------------------------------------------------- */

    if (
      currentPage ===
      "index.html"
    ) {

      document
        .querySelectorAll(
          '#siteHeader [data-header-page="home"]'
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


    /* -------------------------------------------------------
       BUSINESSES
    ------------------------------------------------------- */

    if (
      currentPage === "businesses.html" ||
      currentPage === "listing.html" ||
      currentPage === "list-your-business.html"
    ) {

      document
        .querySelectorAll(
          '#siteHeader [data-header-page="businesses"]'
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

  }



  /* =========================================================
     LOAD AUTHENTICATION UI
  ========================================================= */

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
  ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      loadSiteHeader
    );

  } else {

    loadSiteHeader();

  }

})();

