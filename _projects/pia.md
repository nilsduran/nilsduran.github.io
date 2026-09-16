---
layout: project
title: SinergIA — Multi-Agent Systems & LLM LoRA Fine-Tuning
subtitle: Clinical Question-Answering Evaluation with LangGraph and Gemini
date_display: "Spring 2025"
duration: "Academic Project in Collaboration with Telefónica"
team_size: 4
hero_color_1: "#0ea5e9"
hero_color_2: "#0f172a"
image_format: png
index_description: "Multi-agent conversational architecture with LangGraph and Google Gemini, fine-tuning clinical experts with LoRA to boost MedQA accuracy."
executive_summary: "SinergIA is an applied AI research project conducted with guidance from Telefónica Innovación Digital. It addresses domain limitations in generalist LLMs by orchestrating specialized expert agents using LangGraph and LoRA fine-tuning, benchmarked on the clinical MedQA dataset."
technologies:
  - Python
  - LangGraph
  - Google Gemini API
  - LoRA / PEFT
  - Streamlit
  - MedQA Benchmark
  - Pandas / Scikit-learn
key_achievements:
  - "Designed an agentic multi-expert deliberation architecture with LangGraph"
  - "Fine-tuned domain-specialized language models using LoRA"
  - "Outperformed baseline Gemini 2.5 Flash accuracy on MedQA by +3% absolute (from 87% to 90%)"
  - "Quantified agent diversity via dissimilarity matrix analysis and temperature profiling"
  - "Built an interactive Streamlit dashboard for model battles, Elo calculation, and consultation"
accuracy: "90.0%"
improvement: "+3.0% (Diversity)"
architecture_description: "The system implements a supervisor-expert network where a supervisory orchestrator receives clinical queries, retrieves semantic embeddings, and dynamically delegates reasoning steps to fine-tuned LoRA expert agents. The agents critique and refine each other's outputs to reach a consensus, substantially reducing hallucinations."
challenges:
  - problem: Agent Coordination
    description: Preventing consensus collapse and contradictory reasoning loops between multiple model instances.
    solution: Implemented strict state graph transitions in LangGraph with confidence-weighted supervisor aggregation.
  - problem: Diversity Optimization
    description: Ensuring that fine-tuned agents provided genuinely diverse clinical perspectives rather than redundant opinions.
    solution: Developed an Elo rating system and dissimilarity matrix to evaluate and select optimal agent combinations.
learnings: "Demonstrated that ensembles of domain-adapted smaller models orchestrated in structured agentic graphs can consistently surpass raw zero-shot performance of single large models on domain-specific benchmarks like MedQA."
github_url: "https://github.com/nilsduran/PIA"
---

## Project Overview

**SinergIA** was developed as a collaboration project with guidance from **Telefónica Innovación Digital**. The objective was to investigate whether cognitive diversity in multi-agent systems could reliably enhance complex clinical reasoning and reduce hallucinations in medical question answering.

### Technical Methodology

1. **LoRA Fine-Tuning:** Fine-tuned language models on medical and clinical literature to create specialized sub-domain experts.
2. **LangGraph State Orchestration:** Designed stateful conversational graphs coordinating expert deliberations, critique loops, and supervisory consensus.
3. **Benchmarking on MedQA:** Evaluated the multi-agent system on USMLE-style questions from the MedQA benchmark, achieving a verified improvement from **87% to 90%** accuracy over standalone Gemini 2.5 Flash baselines.
4. **Diversity & Elo Rating:** Computed dissimilarity matrices and head-to-head Elo ratings to understand temperature dynamics and model complementarity.
