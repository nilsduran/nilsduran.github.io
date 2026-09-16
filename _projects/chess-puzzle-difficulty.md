---
layout: project
title: IEEE BigData 2024 Cup — Predicting Chess Puzzle Difficulty
subtitle: Machine Learning Difficulty Estimation Combining Neural Chess Engines
type: project
image_format: png
index_description: "Ensemble machine learning model predicting human Elo difficulty of tactical chess puzzles leveraging Stockfish, Leela Chess Zero, and Maia."
date_display: "November 2024"
team_size: 3
technologies:
  - Python
  - Scikit-learn
  - LightGBM / XGBoost
  - Chess Engines (Stockfish, Leela, Maia)
  - Feature Engineering
  - Pandas / NumPy
key_achievements:
  - "Engineered domain-specific positional and tactical features from game engines"
  - "Extracted human blunder and difficulty patterns using Maia neural networks"
  - "Trained cross-validated ensemble models to predict player Elo difficulty ratings"
github_url: "https://github.com/nilsduran/IEEE-BigData-2024-Cup--Predicting-Chess-Puzzle-Difficulty"
---

## Project Overview

Participated in the **IEEE BigData 2024 Cup** competition with team *PlatsBruts*, competing to accurately predict the human solving difficulty rating (Elo) of tactical chess puzzles from millions of positions.

Predicting puzzle difficulty is challenging because traditional chess engines evaluate *objective positional advantage* rather than *human cognitive difficulty*. A move that is trivial for an engine to calculate can be virtually invisible to a human master, and vice versa.

---

## Technical Methodology & Feature Engineering

### 1. Engine Heuristic Features
- **Stockfish Search Dynamics:** Evaluated positions at varying depths to extract centipawn volatility, move order stability, node count expansion, and evaluation deltas between the best move and second-best alternative.
- **Shannon Entropy of Move Distribution:** Calculated the entropy over candidate move probabilities; high entropy reflects ambiguous positions with many plausible-looking decoy moves (blunder traps).

### 2. Human Behavior Modeling with Maia Chess
- **Maia Neural Networks:** Unlike standard superhuman engines, **Maia** is trained directly on millions of human games across specific rating tiers (Maia 1100 to Maia 1900) to predict the exact move a human at that rating would make.
- Extracted disagreement rates between superhuman ground truth (Stockfish) and human expectation (Maia) as direct proxies for tactical difficulty and intuitive traps.

### 3. Gradient Boosted Decision Ensembles
- Trained **LightGBM** and **XGBoost** regression models with Bayesian hyperparameter optimization and k-fold cross-validation, optimizing Root Mean Squared Error (RMSE) against verified human rating benchmarks.
