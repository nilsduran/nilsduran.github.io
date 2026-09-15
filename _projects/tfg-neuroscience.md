---
layout: project
title: Computational Neuroscience & EEG Decoding (TFG)
date: 2026-06-26
index_description: "Decoding perceptual consciousness during binocular rivalry from multi-channel EEG epochs using Spatio-Temporal GNNs, LoRA-adapted Transformers, and LaBraM."
category: "Deep Learning & Neuroscience"
technologies: ["PyTorch", "PyTorch Geometric", "MNE-Python", "Transformers", "LoRA", "XAI / SHAP"]
image_format: "png"
github: "https://github.com/nilsduran/TFG"
---

# Decoding Perceptual Consciousness with Deep Learning (Bachelor's Thesis)

This project investigates brain-computer interface (BCI) decoding of visual perceptual consciousness during binocular rivalry experiments using non-invasive electroencephalography (EEG).

### Key Architectural Contributions
- **Spatio-Temporal Graph Neural Networks (ST-GNN):** Leveraged Chebyshev spectral graph convolutions over electrode spatial adjacency matrices.
- **Spatio-Temporal Transformers (ST-EEGFormer):** Introduced Low-Rank Adaptation (LoRA) modules to parameter-efficiently fine-tune attention layers.
- **Foundation Model Transfer Learning:** Evaluated pre-trained large brain models (**LaBraM**) on domain-specific cognitive classification tasks.
- **Statistical Rigor & Explainability:** Full permutation testing, Wilcoxon signed-rank tests with Benjamini-Hochberg FDR correction, alongside Integrated Gradients and SHAP attribution maps.
