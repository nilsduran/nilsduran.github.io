---
layout: page
title: Blog
permalink: /blog/
lang: ca
---

# Últimes Publicacions

{% for post in site.posts %}
  {% if post.lang == 'ca' %}
    <article class="post-item">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" }}</time>
      <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
      <a href="{{ post.url }}">Llegir més...</a>
    </article>
  {% endif %}
{% endfor %}