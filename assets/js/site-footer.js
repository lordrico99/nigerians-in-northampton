(function () {
  "use strict";

  async function loadSiteFooter() {
    const container = document.getElementById("siteFooter");

    if (!container) {
      return;
    }

    try {
      const footerURL = new URL(
        "partials/footer.html",
        document.baseURI
      );

      const response = await fetch(footerURL, {
        cache: "no-cache"
      });

      if (!response.ok) {
        throw new Error(
          `Footer request failed: ${response.status}`
        );
      }

      const html = await response.text();

      container.innerHTML = html;

      /* Update footer year automatically */
      container.querySelectorAll("[data-year]").forEach(function (node) {
        node.textContent = new Date().getFullYear();
      });

      /* Notify other scripts that the footer is ready */
      document.dispatchEvent(
        new CustomEvent("nin:footer-loaded", {
          detail: {
            container: container
          }
        })
      );

    } catch (error) {
      console.error(
        "Could not load shared footer:",
        error
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      loadSiteFooter,
      { once: true }
    );
  } else {
    loadSiteFooter();
  }

})();