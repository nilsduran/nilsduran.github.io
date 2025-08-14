---
layout: page
title: Projectes
permalink: /projects/
lang: ca
---

# Els Meus Projectes

Aquí hi ha alguns dels projectes en els quals he treballat.

{% for project in site.collections.portfolio %}
  {% if project.lang == 'ca' %}
    <article class="post-item">
      <div class="project-item-content">
        <a href="{{ project.url }}">
          <img src="/images/placeholder-project.png" alt="{{ project.title }}" style="width: 100%; height: auto; max-width: 300px; display: block; margin-bottom: 1em;">
        </a>
        <h2><a href="{{ project.url }}">{{ project.title }}</a></h2>
        <p>{{ project.excerpt | strip_html | truncatewords: 50 }}</p>
        <a href="{{ project.url }}">Llegir més...</a>
      </div>
    </article>
  {% endif %}
{% endfor %}