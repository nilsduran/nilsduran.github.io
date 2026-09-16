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
architecture_image: "/images/projects/pia/architecture.png"
demo_video: "/images/projects/pia/demo.mov"
github_url: "https://github.com/nilsduran/PIA"
---

## Project Overview

**SinergIA** was developed as an applied artificial intelligence research project in collaboration with **Telefónica Innovación Digital**. The project investigated whether cognitive diversity within multi-agent LLM systems can measurably improve complex clinical diagnostic reasoning and mitigate hallucinations on standardized medical benchmarks.

Using **LangGraph** and **Google Gemini**, the system orchestrates specialized expert agents, evaluates candidate opinions through peer-critique loops, and aggregates final conclusions through a supervisory consensus module.

---

## Technical Methodology

### 1. Domain Adaptation with LoRA
Generalist language models often struggle with nuanced clinical protocols and pharmaceutical interactions. We fine-tuned domain-specific smaller models using **Low-Rank Adaptation (LoRA)** on curated medical corpora, creating specialized agents (diagnostic specialist, pharmacologist, and clinical critic) that operate with high domain fidelity.

### 2. Multi-Agent Orchestration with LangGraph
Rather than standard linear chains, the orchestration is modeled as a stateful cyclic graph in LangGraph:
- **Query Intake & Routing:** A supervisor agent ingests the clinical patient vignette and dynamically delegates sub-problems to specialized expert agents.
- **Peer Deliberation & Critique:** Agents review peer justifications, identify diagnostic edge cases, and challenge ungrounded assertions.
- **Consensus & Confidence Aggregation:** When confidence criteria are satisfied, the supervisor synthesizes the consensus diagnostic recommendation.

### 3. Diversity Modeling & Elo Ratings
To quantify the benefit of agent diversity:
- **Dissimilarity Matrices:** Computed pairwise output dissimilarities across agent configurations and decoding temperatures to identify non-redundant agent pairs.
- **Head-to-Head Elo Evaluation:** Implemented an automated tournament framework to benchmark agent combinations against baseline Gemini Flash models.

---

## Benchmark Results on MedQA

Evaluated on USMLE clinical questions from the **MedQA benchmark**:
- **Baseline Gemini 2.5 Flash:** 87.0% accuracy
- **SinergIA Multi-Agent Consensus:** **90.0% accuracy (+3.0% absolute gain)**
- **Hallucination Rate:** Significantly reduced through multi-agent cross-verification loops.

---

## Interactive Streamlit Application

The project includes an interactive **Streamlit dashboard** allowing clinicians and researchers to:
1. Conduct real-time diagnostic consultations with inspectable multi-agent deliberation traces.
2. Run head-to-head model battles and observe real-time Elo rating adjustments.
3. Visualize agent diversity dissimilarity heatmaps across prompt variations.
