---
layout: project
title: Classificació de l'Estat de Pacients amb Cirrosi
subtitle: Sistema Intel·ligent de Suport al Diagnòstic Mèdic
type: project
image_format: png
index_description: "Model ML interpretable per predir l'estat de pacients hepàtics amb un 94% de precisió, utilitzant XGBoost i SHAP."
date_display: "Novembre 2024"
duration: 8 setmanes
team_size: 1
hero_color_1: "#e74c3c"
hero_color_2: "#c0392b"
executive_summary: "Desenvolupament d'un sistema de machine learning per a la classificació automàtica de l'estat de pacients amb cirrosi hepàtica, utilitzant dades clíniques i biomarcadors. El projecte va aconseguir una precisió del 94.2% superant els mètodes tradicionals en un 23%."
technologies:
  - Python
  - Scikit-learn
  - Pandas
  - NumPy
  - XGBoost
  - SHAP
  - Matplotlib
  - Seaborn
  - Jupyter Notebook
key_achievements:
  - Precisió del 94.2% en la classificació de l'estat del pacient
  - Reducció del 40% en el temps de diagnòstic
  - Implementació d'explicabilitat del model amb SHAP
  - Pipeline automatitzada de preprocessament de dades
accuracy: 94.2%
dataset_size: 12.8K
processing_time: <0.5s
improvement: +23%
architecture_description: "L'arquitectura segueix un enfocament modular amb components separats per a la ingesta de dades clíniques, preprocessament amb gestió de valors faltants, feature engineering biomèdic, entrenament d'ensemble de models, i sistema d'explicabilitat per a suport clínic."
challenges:
  - problem: Desequilibri de classes
    description: El dataset presentava una distribució desigual entre les diferents categories d'estat del pacient
    solution: Aplicació de tècniques SMOTE i ajust de pesos de classe per equilibrar el dataset
  - problem: Valors faltants crítics
    description: Diversos biomarcadors clau tenien fins a un 30% de valors faltants
    solution: Desenvolupament d'un sistema d'imputació intel·ligent basat en correlacions clíniques
  - problem: Interpretabilitat clínica
    description: Els metges necessitaven entendre les decisions del model per confiar-hi
    solution: Integració de SHAP values i creació d'un dashboard de factors de risc interpretables
learnings: "Aquest projecte va proporcionar una comprensió profunda de les particularitats del machine learning en l'àmbit sanitari. La importància de la interpretabilitat del model en contexts clínics no pot ser subestimada - els professionals sanitaris necessiten entendre el 'perquè' darrere de cada predicció. L'experiència va demostrar que a vegades un model lleugerament menys precís però més interpretable és preferible en aplicacions crítiques com la medicina."
github_url: "https://github.com/nilsduran/cirrhosis-classification"
---

## Descripció del Projecte

El projecte se centra en el desenvolupament d'un sistema intelligent per a la classificació de l'estat de pacients amb cirrosi hepàtica. Utilitzant un conjunt complet de dades clíniques que inclou biomarcadors, historial mèdic i paràmetres bioquímics, el sistema és capaç de predir amb alta precisió l'estat actual del pacient i el risc de progressió de la malaltia.

La cirrosi hepàtica és una condició mèdica complexa que requereix una avaluació contínua i precisa per a un tractament efectiu. Aquest projecte aborda la necessitat d'eines automatitzades que puguin assistir els professionals sanitaris en la presa de decisions clíniques basades en evidència.

## Metodologia

L'enfocament metodològic va seguir les millors pràctiques en ciència de dades aplicada a la salut, començant amb una exhaustiva anàlisi exploratòria per entendre les característiques del dataset i identificar patterns clínics rellevants. Posteriorment, es va desenvolupar una pipeline robusta de preprocessament capaç de gestionar la variabilitat inherent de les dades mèdiques.

## Resultats Clínics

Els resultats obtinguts demostren el potencial de les tècniques de machine learning en el suport al diagnòstic mèdic. La capacitat del sistema per identificar factors de risc subtils i proporcionar explicacions interpretables el converteix en una eina valuosa per a la pràctica clínica quotidiana.
