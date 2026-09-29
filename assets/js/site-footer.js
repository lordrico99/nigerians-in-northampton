(function () {
  "use strict";

  /* =========================================================
     LOAD SHARED SITE FOOTER
  ========================================================== */

  async function loadSiteFooter() {

    /*
     * Find the shared footer placeholder.
     * If the page still has an old inline footer and no
     * placeholder, create the placeholder immediately before it.
     */

    let container =
      document.getElementById("siteFooter");


    const existingFooters =
      Array.from(
        document.querySelectorAll(
          "footer.site-footer"
        )
      );


    if (!container) {

      container =
        document.createElement("div");

      container.id =
        "siteFooter";


      if (existingFooters.length) {

        existingFooters[0]
          .parentNode
          .insertBefore(
            container,
            existingFooters[0]
          );

      }
      else {

        document.body.appendChild(
          container
        );

      }

    }


    try {

      /* =======================================================
         LOAD SHARED FOOTER PARTIAL
      ======================================================== */

      const footerURL =
        new URL(
          "partials/footer.html",
          document.baseURI
        );


      const response =
        await fetch(
          footerURL,
          {
            cache: "no-store"
          }
        );


      if (!response.ok) {

        throw new Error(
          `Could not load shared footer (${response.status})`
        );

      }


      const html =
        await response.text();


      /*
       * Insert the shared footer.
       */

      container.innerHTML =
        html;


      /* =======================================================
         REMOVE OLD INLINE FOOTERS
         This prevents duplicate/conflicting footers.
      ======================================================== */

      document
        .querySelectorAll(
          "footer.site-footer"
        )
        .forEach(
          function (footer) {

            if (
              !container.contains(
                footer
              )
            ) {

              footer.remove();

            }

          }
        );


      /* =======================================================
         UPDATE COPYRIGHT YEAR
      ======================================================== */

      container
        .querySelectorAll(
          "[data-year]"
        )
        .forEach(
          function (node) {

            node.textContent =
              new Date().getFullYear();

          }
        );


      /* =======================================================
         FOOTER LOADED EVENT
      ======================================================== */

      document.dispatchEvent(
        new CustomEvent(
          "nin:footer-loaded",
          {
            detail: {
              container:
                container
            }
          }
        )
      );


    }
    catch (error) {

      console.error(
        "Could not load shared footer:",
        error
      );

    }

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
      loadSiteFooter,
      {
        once: true
      }
    );

  }
  else {

    loadSiteFooter();

  }

})();