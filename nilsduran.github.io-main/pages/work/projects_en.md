---
layout: default
title: Projects & Open-Source
tags: projects
permalink: /projects_en/
lang: en
js:
  - js/gh_projects.js
  - js/util_buttons.js
---

<h1>Projects</h1>

<p>
  Here are some of my public repositories on Github. Click-through to check out the
  work in more detail.
</p>

<hr />

<h2>Public Repos</h2>

<div id="display-projects"></div>

<div class="circle-button">
  <div
    class="top-circle"
    data-sr-id="80"
    style="
      visibility: visible;
      -webkit-transform: scale(1);
      opacity: 1;
      transform: scale(1);
      opacity: 1;
      -webkit-transition: -webkit-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)
          0s,
        opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
      transition: transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s,
        opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    "
  >
    <img src="{{ site.url }}/images/logos/top.png" />
  </div>
</div>

{% for js in page.js %}
<script type="text/javascript">
  {% include {{ js }} %}
</script>
{% endfor %}

<script src="https://cdn.jsdelivr.net/emojione/3.0.3/lib/js/emojione.min.js"></script>
<script type="text/javascript">
  $(function () {
    $("#display-projects").getRepos(
      "nilsduran"
    ); /* Add your github username. */
  });
</script>

<style>
  .active-project {
    transition: all 0.2s ease-in-out;
  }

  .active-project:hover {
    transform: scale(1.01);
  }
</style>
