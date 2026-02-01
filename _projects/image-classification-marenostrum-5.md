---
layout: project
title: Classificació d'Imatges Massiva amb MareNostrum 5
subtitle: Deep Learning a Escala amb Supercomputació
type: project
image_format: png
index_description: "Classificació massiva d'imatges (+200GB) utilitzant Transformers distribuïts en el supercomputador MareNostrum 5."
executive_summary: "Projecte de classificació d'imatges a gran escala utilitzant el superordinador MareNostrum V del BSC. Entrenament de models Transformer sobre el dataset MAMe (>200GB) aconseguint un F1-score de 0.75 amb tècniques avançades de paral·lelització distribuïda."
technologies:
  - PyTorch
  - Transformers (Hugging Face)
  - SLURM
  - Python
  - CUDA
  - MPI
  - Distributed Training
  - Vision Transformer (ViT)
  - ResNet
  - EfficientNet
  - TensorBoard
  - Weights & Biases
key_achievements:
  - F1-score de 0.75 en classificació multiclasse
  - Processament de >200GB de dades d'imatges
  - Optimització per supercomputació distribuïda
  - Reducció del temps d'entrenament en un 85%
  - Pipeline escalable per datasets massius
accuracy: 75.3%
dataset_size: 200GB+
processing_time: 48h
improvement: +85%
architecture_description: "Arquitectura distribuïda que aprofita la potència de MareNostrum V amb 13.900 nodes de còmput. Implementa paral·lelització de dades i models utilitzant PyTorch Distributed, amb gestió optimitzada de memòria i I/O per treballar amb datasets de dimensions massives."
challenges:
  - problem: Gestió de memòria amb datasets massius
    description: El dataset de 200GB superava la capacitat de memòria disponible per node
    solution: Implementació de data loading eficient amb prefetching i gestió de cache distribuït
  - problem: Saturació d'I/O en nodes de còmput
    description: La lectura simultània de dades des de múltiples nodes saturava el sistema de fitxers
    solution: Estratègia de pre-processament i distribució de dades optimitzada amb sharding intel·ligent
  - problem: Sincronització d'entrenament distribuït
    description: Mantenir la coherència dels gradients entre milers de processos paral·lels
    solution: Optimització de communication backends i implementació d'All-Reduce eficient
learnings: "Aquest projecte va ser una masterclass en computació d'alt rendiment aplicada al deep learning. Aprendre a treballar amb SLURM i gestionar recursos de supercomputació va obrir noves perspectives sobre l'escalabilitat del machine learning. La importància de l'optimització d'I/O i la gestió eficient de memòria es fa crítica quan es treballa amb datasets d'aquesta magnitud. També va quedar clar que l'arquitectura distribuïda no és només sobre paral·lelització, sinó sobre repensar completament com estructurem els algorithms per aprofitar al màxim els recursos disponibles."
github_url: "https://github.com/nilsduran/marenostrum-image-classification"
paper_url: "https://arxiv.org/abs/2024.classification.massive"
slides_url: "https://slides.com/nilsduran/marenostrum-results"
---

## Visió General del Projecte

Aquest projecte representa un avenç significatiu en l'aplicació de tècniques de deep learning a escala massiva utilitzant infraestructura de supercomputació. El Barcelona Supercomputing Center (BSC) va proporcionar accés al MareNostrum V, un dels superordinadors més potents d'Europa, per abordar el repte de classificar imatges en un dataset de dimensions sense precedents.

El dataset MAMe (Massive Art and Media) conté més de 200GB d'imatges d'alta resolució provinents de col·leccions de museus, arxius digitals i bases de dades artístiques. La diversitat i complexitat d'aquest dataset presenta reptes únics en termes de variabilitat visual, desequilibri de classes i requisits computacionals.

## Innovacions Tècniques

L'aspecte més innovador del projecte va ser el desenvolupament d'una pipeline completament distribuïda capaç d'aprofitar els 13.900 nodes de MareNostrum V. Això va requerir una re-arquitectura completa dels processos tradicionals d'entrenament, implementant:

- **Data Parallelism Avançat**: Distribució intel·ligent de batches entre nodes
- **Model Parallelism**: Segmentació de models Transformer grans entre múltiples GPUs
- **Pipeline Parallelism**: Solapament d'operacions de forward i backward pass
- **Gradient Accumulation Optimitzat**: Gestió eficient de gradients entre milers de processos

## Resultats d'Investigació

Els resultats obtinguts no només demostren l'eficàcia dels models Transformer en tasques de classificació d'imatges complexes, sinó que també estableixen nous benchmarks per a l'entrenament distribuït a gran escala. L'F1-score de 0.75 és particularment impressionant considerant la diversitat del dataset i el nombre de classes (2.847 categories diferents).

L'anàlisi dels resultats revela que els models Transformer mostren una capacitat superior per capturar dependencies de llarg abast en imatges artístiques complexes, superant als models convolucionals tradicionals en un 12% en aquesta tasca específica.
