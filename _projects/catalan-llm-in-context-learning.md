---
layout: project
priority: 6
title: In-Context Learning in LLMs for Catalan NLP
subtitle: Empirical Benchmark of Prompting Paradigms Across Open-Weight Model Families
category: "Natural Language Processing & LLMs"
hero_color_1: "#0284c7"
hero_color_2: "#0f172a"
image_format: png
date: 2026-05-15
date_display: "Spring 2026"
duration: "Research Project"
team_size: 1
technologies:
  - Python
  - Large Language Models (LLMs)
  - LLaMA 3.3 / LLaMA 3.1
  - In-Context Learning (ICL)
  - Prompt Engineering
  - Catalan NLP Evaluation
github_url: "https://github.com/nilsduran"
paper_url: "/docs/Nils_Duran_Catalan_LLM_Report.pdf"
index_description: "Empirical research paper evaluating in-context learning, few-shot prompting, and reasoning capabilities of open-weight LLMs on Catalan text manipulation tasks."
---

## Executive Summary & Research Motivation

As part of the Advanced Generative Language Models (MGL) coursework at UPC, this research project investigates the **in-context learning (ICL)** capabilities of state-of-the-art open-weight large language models when tasked with non-trivial text manipulation and syntactic transformation in **Catalan**--a medium/low-resource language often underrepresented in pretraining corpora.

Unlike full parameter fine-tuning, in-context learning enables models to resolve tasks purely through instruction prompting and demonstration priming. The study benchmarked multiple model scales across three distinct prompting regimes to isolate instruction following, inductive reasoning from examples, and multi-step symbolic calculation in Catalan.

---

## Experimental Setup & Prompting Regimes

Each linguistic and symbolic manipulation task was evaluated across three distinct evaluation protocols:

- **1. Zero-Shot (0-Shot):** Detailed task instructions formatted strictly in Catalan without providing any input-output demonstrations.
- **2. Few-Shot (5-Shot):** Task instructions accompanied by five randomized demonstrations of valid input-output pairs exemplifying edge cases.
- **3. Examples-Only:** No explanatory instructions provided; the prompt contains exclusively demonstration pairs, forcing inductive task inference.

---

## Evaluated Models & Metrics

The evaluation compared open-weight foundation models across parameter scales:
- **LLaMA 3.3 (70B Instruct):** High-capacity open model.
- **LLaMA 3.1 (8B Instant):** Compact edge-deployable model.
- **GPT-OSS Series:** Open-source architectures evaluating architectural variance.

### Core Metrics:
1. **Exact Match (EM):** Strict string-level accuracy requiring perfect reproduction of punctuation, diacritics, and formatting.
2. **Word Match (WM):** Token-level overlap assessing partial semantic correctness.

---

## Key Empirical Findings & Benchmark Visualizations

![Few-Shot Exact Match Accuracy per Model and Task](/images/projects/catalan-llm-in-context-learning/catalan-llm-in-context-learning.png)
*Figure 1: Exact Match (EM) accuracy heatmap across open-weight models and four evaluated Catalan manipulation tasks (Aritmètica, Idioma, Atbash, and Combinació).*

![Global Leaderboard by Prompting Regime](/images/projects/catalan-llm-in-context-learning/plot_global_leaderboard_em.png)
*Figure 2: Global leaderboard showing mean Exact Match accuracy across Zero-Shot, Few-Shot, and Examples-Only prompting regimes.*

1. **Scale Dominance in Catalan Reasoning:** LLaMA 3.3 70B achieved near-flawless performance on symbolic arithmetic extraction, whereas the 8B model scored only 5.88% in zero-shot, jumping to 21.18% with few-shot priming.
2. **Demonstrations vs. Instructions:** Few-shot prompting consistently yielded the highest performance across all model families. Interestingly, *Examples-Only* prompting achieved competitive accuracy, demonstrating strong inductive pattern extrapolation without explicit Catalan natural language instructions.
3. **Download Full Report:** The complete 7-page technical research paper with task-specific breakdown curves is available [here](/docs/Nils_Duran_Catalan_LLM_Report.pdf).

