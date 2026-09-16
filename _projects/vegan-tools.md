---
layout: project
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

**Vegan Tools** ([vegantools.org](https://vegantools.org)) is a deployed, production web platform engineered to solve real friction points for vegans, vegetarians, and consumers with dietary restrictions navigating a non-vegan world.

Rather than generic chat interfaces, Vegan Tools provides **fast, purpose-built utilities** powered by specialized multi-modal AI pipelines, structured schemas, and comprehensive food science knowledge bases.

---

## Core Modules & Features

```
                               ┌────────────────────────────────────────────────────────┐
                               │                    vegantools.org                      │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
                    ┌─────────────────────────────────────┼─────────────────────────────────────┐
                    ▼                                     ▼                                     ▼
        🔍 Ingredient Checker                  📷 Menu OCR Interpreter                🥗 Recipe Veganizer
  - E-Number / additive database        - Multi-lingual menu image parsing     - Functional culinary substitutions
  - Hidden animal byproduct detection   - Dissection of complex dish components- Moisture & leavening preservation
  - Certainty & cross-contamination     - Cross-referencing allergen tables    - Nutritional macro rebalancing
```

### 1. Product Ingredient Checker
- **The Problem:** Food labels contain obscure chemical names, nested additives, and European food additive codes (E-numbers) that often mask animal-derived sources (e.g., E120 / carmine from cochineal insects, E904 shellac, bone char filtered sugars, or ambiguously sourced mono- and diglycerides).
- **The Solution:** An ultra-fast scanner that breaks down raw ingredient strings, queries a verified dictionary of additives, and evaluates ambiguous ingredients with confidence ratings and manufacturer inquiry guidance.

### 2. Restaurant Menu OCR Interpreter
- **The Problem:** Dining out in unfamiliar or international restaurants often involves deciphering unfamiliar culinary terms and regional preparations.
- **The Solution:** Users upload or snap a photo of physical menus. The pipeline performs OCR extraction and multi-modal semantic analysis, classifying dishes as naturally vegan, adaptable with minor modifications (e.g., omitting dairy dressings), or inherently animal-based.

### 3. Culinary Recipe Veganizer
- **The Problem:** Simply removing eggs or butter from recipes ruins dough hydration, texture, emulsification, and rise.
- **The Solution:** A structured culinary transformation engine that analyzes each non-vegan ingredient's functional role (binding, fat ratio, leavening, moisture) and suggests optimized culinary substitutes (e.g., aquafaba vs. flax egg vs. silken tofu) tailored to the specific cooking technique.

---

## Architecture & Engineering Highlights

- **Frontend:** Next.js and React with TypeScript, prioritizing sub-second initial load times, progressive web app (PWA) mobile optimization, and accessible responsive design.
- **AI Integration:** Multi-modal LLMs configured with strict JSON schema outputs and fallback rule-based validators to eliminate hallucinations on dietary safety claims.
- **Infrastructure:** Deployed globally with CDN caching and edge routing for high availability and low latency.
