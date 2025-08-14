---
layout: page
title: Blog
permalink: /blog_en/
lang: en
---

# Latest Posts

{% for post in site.posts %}
  {% if post.lang == 'en' %}
    <article class="post-item">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
      <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
      <a href="{{ post.url }}">Read more...</a>
    </article>
  {% endif %}
{% endfor %}