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

Participated in the **IEEE BigData 2024 Cup** competition with team *PlatsBruts*, focused on predicting the human rating difficulty (Elo) of complex chess tactical positions.

### Technical Approach

- **Chess Engine Feature Extraction:** Parsed FEN/PGN positions to extract deep heuristic features from **Stockfish** (centipawn evaluation, node search depth, candidate move variance).
- **Human-Centric Modeling with Maia & Leela:** Incorporated evaluation distributions from **Maia Chess** (neural networks specifically trained to emulate human players across specific Elo brackets) to identify human perceptual blindspots.
- **Ensemble Regression:** Built gradient-boosted decision tree ensembles mapping engine metrics and tactical complexity indicators to continuous Elo difficulty scores.
