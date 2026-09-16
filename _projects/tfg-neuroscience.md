---
layout: project
title: Computational Neuroscience & EEG Decoding (Bachelor's Thesis)
subtitle: Decoding Perceptual Consciousness During Binocular Rivalry Using Spatio-Temporal Deep Learning
category: "Computational Neuroscience & AI"
hero_color_1: "#1e3a8a"
hero_color_2: "#0f172a"
image_format: png
date: 2026-06-26
date_display: "June 2026"
duration: "9 Months Research"
team_size: 1
technologies:
  - PyTorch
  - PyTorch Geometric
  - MNE-Python
  - Riemannian Geometry (OAS)
  - Spatio-Temporal GNNs (ChebConv)
  - Transformers & LoRA
  - Foundation Models (LaBraM)
  - Explainable AI (SHAP & Integrated Gradients)
github_url: "https://github.com/nilsduran/TFG"
index_description: "Bachelor's thesis decoding visual perceptual consciousness from 64-channel EEG epochs using Riemannian geometry, Spatio-Temporal GNNs, LoRA-adapted Transformers, and large brain foundation models."
---

## Executive Summary & Scientific Context

This project represents my **Bachelor's Thesis (Treball de Final de Grau)** in Artificial Intelligence at the **Universitat Politècnica de Catalunya (UPC)**, completed under the academic supervision of **Dr. Adrián F. Tauste Campo** and **Dr. Mireia Torralba Cuello**.

The core objective was to investigate whether non-invasive electroencephalography (EEG) signals contain decodable signatures of visual perceptual consciousness during **binocular rivalry**. In binocular rivalry, incompatible visual stimuli (such as orthogonal red and green gratings) are presented simultaneously to each eye. Rather than seeing a fused image, human perception spontaneously alternates between the two stimuli every few seconds—even though the underlying physical sensory input remains entirely static. This paradigm provides a unique experimental window to isolate neural correlates of conscious perception from purely bottom-up sensory processing.

---

## Technical Methodology & Pipeline

```
64-Channel Raw EEG ──> Preprocessing & Filtering (0.5–45 Hz) ──> Perceptual Epoch Alignment
                                                                         │
                     ┌───────────────────────────────────────────────────┴──────────────────────────────┐
                     ▼                                                   ▼                              ▼
           Riemannian Manifold                                  Spatio-Temporal GNN              ST-EEGFormer + LoRA
      (OAS Covariance + Tangent Space)                          (Chebyshev Spectral)           (Multi-Head Attention)
                     │                                                   │                              │
                     └───────────────────────────────────────────────────┼──────────────────────────────┘
                                                                         ▼
                                                     Statistical Rigor & FDR Control
                                                       (Wilcoxon & Permutation)
                                                                         │
                                                                         ▼
                                                        Feature Attribution & XAI
                                                        (SHAP & Integrated Grads)
```

### 1. Signal Preprocessing & Epoch Extraction
- **Data Acquisition:** 64 scalp electrodes recorded according to the extended International 10-20 system.
- **Filtering & Artifact Rejection:** Zero-phase bandpass filtering (0.5–45 Hz) with notch filtering at 50 Hz to remove European line noise. Epochs were aligned to behavioral transition onsets reported by subjects.
- **Covariance Conditioning:** Empirical covariance estimation suffers in small-sample, high-dimensional regimes ($N \ll C^2$). We deployed **Optimal Approximate Shrinkage (OAS)** to compute well-conditioned covariance matrices:
  $$\Sigma_{\text{OAS}} = (1 - \rho)\Sigma_{\text{sample}} + \rho \frac{\text{Tr}(\Sigma_{\text{sample}})}{C} I$$

### 2. Riemannian Geometry & Tangent Space Projection
Covariance matrices belong to the symmetric positive-definite (SPD) Riemannian manifold $\mathcal{S}_{++}^C$, where standard Euclidean metrics yield distorted geometric distances. We computed the **Fréchet mean** (geometric mean) of covariance matrices on the manifold and projected Riemannian tensors onto the Euclidean tangent space at the reference mean, preserving geodesic Riemannian distances for classification.

### 3. Spatio-Temporal Graph Neural Networks (ST-GNN)
To exploit both the physical layout of the scalp and the temporal dynamics of neural oscillations:
- Electrode graphs were constructed where nodes represent channels and edge weights are determined by 3D physical geodesic distances over the scalp.
- **Chebyshev Spectral Convolutions (ChebConv)** were applied across spatial neighborhoods to approximate fast localized spectral filters:
  $$Z = \sum_{k=0}^{K-1} \theta_k T_k(\tilde{L}) X$$
  where $\tilde{L}$ is the scaled graph Laplacian and $T_k$ are Chebyshev polynomials.

### 4. Attention Mechanisms & Foundation Model Transfer
- **ST-EEGFormer with LoRA:** Implemented multi-head self-attention operating over time-channel token representations. To enable parameter-efficient fine-tuning across heterogeneous subject recordings without catastrophic forgetting, we integrated **Low-Rank Adaptation (LoRA)** modules into the projection weights.
- **Large Brain Model (LaBraM):** Evaluated transfer learning capabilities of pre-trained foundation models on cognitive transition decoding.

---

## Experimental Benchmarks & Validation

The models were evaluated under rigorous inter-subject cross-validation schemes to ensure generalization across individual brain morphologies and cognitive variance.

![Inter-Subject Model Comparison](/images/projects/tfg-neuroscience/comparison.png)
*Figure 1: Comparative evaluation across subjects comparing Riemannian baselines, GNN architectures, and Transformer models.*

![Temporal Onset Profile](/images/projects/tfg-neuroscience/onset.png)
*Figure 2: Time-resolved decoding accuracy relative to perceptual transition onset ($t = 0$), identifying peak discriminative predictive windows in parietal-occipital electrodes.*

### Statistical Rigor & Interpretability
- **Hypothesis Testing:** Non-parametric permutation testing (10,000 permutations) and Wilcoxon signed-rank tests across subjects.
- **FDR Correction:** P-values across electrode channels and temporal bins were corrected using the **Benjamini-Hochberg False Discovery Rate (FDR)** procedure ($\alpha = 0.05$).
- **Explainable AI (XAI):** Integrated Gradients and SHAP attribution confirmed that neural discriminability concentrated predominantly in posterior parietal and occipital electrode clusters, aligning closely with established visual cortex literature on conscious state shifts.

---

## Key Takeaways

1. **Geometry vs. Depth:** Riemannian manifold projection with regularized linear classifiers provides an extraordinarily strong, parameter-free baseline for multi-channel covariance decoding.
2. **Topology Matters:** Spatio-temporal graph convolutions naturally respect the spherical geometry of scalp montages, significantly accelerating learning convergence.
3. **Parameter-Efficient Adaptation:** LoRA offers an ideal paradigm for cross-subject neuroimaging models where subject-specific variance can be accommodated in rank-4 adapters without retraining backbone representations.
