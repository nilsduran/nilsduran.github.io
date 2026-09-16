---
layout: project
priority: 2
title: Vegan Tools
subtitle: Production Full-Stack Web Platform Providing AI-Powered Assistance for Everyday Plant-Based Living
category: "Production Full-Stack & Applied AI"
hero_color_1: "#065f46"
hero_color_2: "#0f172a"
image_format: png
date: 2026-09-08
date_display: "September 2026"
duration: "Live in Production"
team_size: 1
technologies:
  - TypeScript
  - React / Next.js
  - Python / FastAPI
  - Multi-Modal Vision & OCR
  - Structured LLM Outputs
  - Cloudflare & Vercel
demo_url: "https://vegantools.org"
github_url: "https://github.com/nilsduran/Vegan-Tools"
index_description: "A production-grade web platform featuring an Ingredient Checker, Menu OCR Interpreter, and Recipe Veganizer built with Next.js and multi-modal AI."
---

## Overview

**Vegan Tools** ([vegantools.org](https://vegantools.org)) is a deployed, production web application engineered to eliminate everyday friction for vegans, vegetarians, and consumers with dietary restrictions navigating a non-vegan world.

Rather than generic conversational interfaces, Vegan Tools provides **specialized, high-speed utilities** powered by client-side caching, vision-language APIs, strict JSON schema validation, and verified biochemical food additive databases.

![Vegan Tools Production Home Screen](/images/projects/vegan-tools/home.png)
*Figure 1: Production interface of vegantools.org featuring quick access to the interactive map, scanner, and recipe suite.*

---

## Key Modules & Features

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin: 1.5rem 0 2rem 0;">
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem;">
    <h3 style="margin-top: 0; color: #047857;">🔍 Product Ingredient Scanner</h3>
    <p style="margin-bottom: 0; font-size: 0.95rem; color: #475569;">Instant evaluation of ingredient lists, identifying obscure chemical compounds, E-number derivatives (e.g., E120 carmine, E904 shellac), and bone-char processing indicators with verified dietary confidence ratings.</p>
  </div>
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem;">
    <h3 style="margin-top: 0; color: #047857;">🗺️ Interactive Vegan Discovery Map</h3>
    <p style="margin-bottom: 0; font-size: 0.95rem; color: #475569;">A high-performance interactive map interface indexing verified plant-based restaurants, bakeries, and grocery stores with real-time geolocation filtering and community curation.</p>
  </div>
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem;">
    <h3 style="margin-top: 0; color: #047857;">🥗 Smart Recipe Veganizer</h3>
    <p style="margin-bottom: 0; font-size: 0.95rem; color: #475569;">Nutritional and culinary transformation engine that analyzes the functional purpose of animal products in traditional recipes (binding, fat ratio, aeration) and computes biochemically optimal plant substitutions.</p>
  </div>
</div>

### Interactive Discovery Map

The interactive map module provides real-time exploration of vegan-friendly locations, filtering dining options by certification level, cuisine, and opening hours.

![Interactive Vegan Map Interface](/images/projects/vegan-tools/map.png)
*Figure 2: Interactive map view on vegantools.org/map for finding plant-based establishments with responsive filtering.*

---

### Culinary Recipe Transformation

Unlike naive keyword replacements, the recipe engine understands the physical role of ingredients in baking and cooking. Replacing eggs in a meringue requires aquafaba's albumin-mimicking protein structure, whereas an egg in a brownie requires moisture and fat balance from flaxseed or silken tofu. The system provides step-by-step culinary adaptations with adjusted baking times and moisture ratios.

![Recipe Transformation Suite](/images/projects/vegan-tools/recipes.png)
*Figure 3: Recipe veganization workflow on vegantools.org/recipes showing culinary adaptations and ingredient alternatives.*

---

## Technical Architecture & Engineering Highlights

- **Modern Frontend Stack:** Built with Next.js, React, and TypeScript, optimized for sub-second page loads, progressive web app (PWA) offline capabilities, and mobile-first responsive interactions.
- **Vision & Multi-Modal Processing:** Integrates camera capture and multi-lingual OCR pipelines to parse physical food menus and packaging directly in the browser.
- **Strict Schema Enforcement:** Backend LLM pipelines enforce deterministic JSON schemas with fallback deterministic rule engines, eliminating hallucinated safety claims on allergens and ingredients.
- **Global Edge Deployment:** Served globally across CDN edge nodes with optimized asset compression for minimal latency on mobile cellular connections.
