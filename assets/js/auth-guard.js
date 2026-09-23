/*
  Protect pages that require a signed-in community account.

  Add this script in the <head> of list-your-business.html and any future
  member-only page. The page will redirect to login.html when no active
  account session exists.
*/
(function () {
  const apiBase = (
    window.NIN_API_BASE_URL ||
    `${window.location.protocol}//${window.location.hostname}:5000/api`
  ).replace(/\/$/, '');

  const target = `${window.location.pathname.split('/').pop() || 'index.html'}${window.location.search || ''}${window.location.hash || ''}`;
  const loginURL = `login.html?mode=login&next=${encodeURIComponent(target)}`;

  document.documentElement.classList.add('nin-auth-checking');

  fetch(`${apiBase}/auth/me`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store'
  })
    .then((response) => {
      if (!response.ok) {
        window.location.replace(loginURL);
        return null;
      }
      return response.json();
    })
    .then((payload) => {
      if (!payload?.success || !payload?.user) {
        window.location.replace(loginURL);
        return;
      }

      window.NINCurrentUser = payload.user;
      document.documentElement.classList.remove('nin-auth-checking');
      document.documentElement.classList.add('nin-authenticated');
    })
    .catch(() => {
      window.location.replace(loginURL);
    });
})();
