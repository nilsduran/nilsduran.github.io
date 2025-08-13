---
layout: default
---

<script>
  // Simple language detection and redirection
  const userLang = navigator.language || navigator.userLanguage;
  const supportedLangs = ['en', 'ca'];
  let lang = 'en'; // default to English

  if (supportedLangs.includes(userLang.slice(0, 2))) {
    lang = userLang.slice(0, 2);
  }

  // Redirect to the language-specific page
  window.location.href = `/about_${lang}/`;
</script>

<div style="text-align: center; margin-top: 5em;">
  <p>Redirecting to your preferred language...</p>
  <p>If you are not redirected, please select a language:</p>
  <a href="/about_en/">English</a> | <a href="/about_ca/">Català</a>
</div>