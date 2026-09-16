---
layout: project
title: Clinical Survival Prediction in Cirrhosis Patients
subtitle: Comparative Machine Learning & Explainable AI on Biomedical Data
type: project
image_format: png
index_description: "Multiclass clinical status and prognostic prediction on cirrhosis patients evaluating SVM, KNN, Decision Trees, and Explainable Boosting Machines (EBM)."
date_display: "Spring 2024"
duration: "Coursework Project"
team_size: 1
hero_color_1: "#e74c3c"
hero_color_2: "#c0392b"
executive_summary: "Biomedical machine learning project predicting survival outcomes and disease progression stages in cirrhosis patients using tabular clinical biomarkers. Benchmarked classical classifiers and Explainable Boosting Machines (EBM) with calibrated cross-validation."
technologies:
  - Python
  - Scikit-learn
  - Explainable Boosting Machines (InterpretML)
  - Support Vector Machines (SVM)
  - Pandas / NumPy
  - Matplotlib / Seaborn
key_achievements:
  - "Built an end-to-end clinical tabular preprocessing and imputation pipeline"
  - "Trained and benchmarked KNN, Decision Trees, SVM, and EBM classifiers"
  - "Evaluated feature importance curves and clinical risk factor attributions"
  - "Addressed multi-class imbalance through calibrated stratified cross-validation"
accuracy: "Cross-Validated"
dataset_size: "Clinical Cohort"
improvement: "XAI Transparency"
architecture_description: "Modular tabular ML workflow incorporating automated missing-value handling, outlier detection, feature standardization, and hyperparameter tuning with cross-validation."
challenges:
  - problem: Clinical Interpretability
    description: Medical practitioners require transparent rationales behind risk predictions rather than opaque black-box outputs.
    solution: Deployed Explainable Boosting Machines (EBMs) providing exact generalized additive feature contribution scores for each clinical variable.
learnings: "Deepened practical appreciation for the trade-offs between raw predictive accuracy and clinical interpretability, where transparent models like EBMs provide critical decision support."
---

## Project Overview

Cirrhosis of the liver is a progressive clinical condition where timely prognostic stratification is vital for therapeutic prioritization. This project developed and evaluated predictive models for classifying clinical patient outcomes from complex biomarker panels.

### Methodology

- **Data Preprocessing:** Implemented clinical biomarker normalization, handled missing clinical observations, and applied stratified partitioning to maintain class ratios.
- **Model Benchmarking:** Systematically evaluated k-Nearest Neighbors (k-NN), Support Vector Classifiers (SVC), Decision Trees, and Generalized Additive Models with interactions (Explainable Boosting Machines).
- **Interpretability Analysis:** Analyzed individual feature contribution curves to identify key physiological markers driving high-risk prognostic classifications.
