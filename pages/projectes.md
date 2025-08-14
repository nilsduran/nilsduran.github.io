---
layout: page
title: Projectes
permalink: /projects/
lang: ca
---

Aquí hi ha alguns dels projectes en els quals he treballat.

<div class="project-list">
{% for project in site.pages %}
  {% if project.type == 'project' and project.lang == 'ca' %}
    <article class="post-item project-item">
      <div class="project-item-content">
        <a href="{{ project.url | relative_url }}">
          <img src="/images/placeholder-project.png" alt="{{ project.title }}" style="width: 100%; height: auto; max-width: 300px; display: block; margin-bottom: 1em;">
        </a>
        <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
        <p>{{ project.content | strip_html | truncatewords: 50 }}</p>
      </div>
    </article>
  {% endif %}
{% endfor %}
</div>