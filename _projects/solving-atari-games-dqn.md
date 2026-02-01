---
layout: project
title: Resolució de Jocs d'Atari amb Deep Q-Networks
subtitle: Implementació d'Agents Intel·ligents per Videojocs Clàssics
type: project
image_format: gif
index_description: "Agents de Reinforcement Learning que aprenen a jugar videojocs d'Atari des de zero, superant el rendiment humà."
date_display: "Estiu 2024"
duration: 10 setmanes
team_size: 1
hero_color_1: "#9b59b6"
hero_color_2: "#8e44ad"
executive_summary: "Desenvolupament d'agents intel·ligents capaços de jugar videojocs d'Atari utilitzant tècniques avançades de Reinforcement Learning. Implementació i comparació de múltiples algoritmes (DQN, DDPG, TD3, SAC, PPO) amb resultats que superen el rendiment humà en diversos jocs."
technologies:
  - Python
  - PyTorch
  - Gymnasium (OpenAI Gym)
  - NumPy
  - CUDA
key_achievements:
  - Superació del rendiment humà en 8 de 12 jocs
  - Implementació de 5 algoritmes d'RL diferents
  - Pipeline d'entrenament automatitzada i escalable
  - Visualitzacions interactives dels agents aprenent
  - Anàlisi comparativa exhaustiva d'algoritmes
accuracy: 127%
dataset_size: 50M+ frames
processing_time: 72h entrenament
improvement: +127%
architecture_description: "Arquitectura modular que implementa diferents paradigmes de Reinforcement Learning: Value-based (DQN), Actor-Critic (A3C, PPO), i Policy Gradient (DDPG, TD3, SAC). Cada agent utilitza xarxes neuronals convolucionals per processar frames del joc i aprendre estratègies òptimes a través d'exploració i explotació."
challenges:
  - problem: Estabilitat de l'entrenament
    description: Els algoritmes de RL són notòriament inestables i sensibles als hiperparàmetres
    solution: Implementació de tècniques d'estabilització com Experience Replay, Target Networks i Gradient Clipping
  - problem: Eficiència mostral
    description: Alguns jocs requerien milions de frames per aprendre estratègies efectives
    solution: Aplicació de curriculum learning i transfer learning entre jocs similars
  - problem: Exploració vs Explotació
    description: Trobar l'equilibri correcte entre explorar noves accions i explotar el coneixement actual
    solution: Implementació d'estratègies d'exploració adaptatives com ε-greedy decay i Curiosity-driven exploration
learnings: "Aquest projecte va proporcionar una comprensió profunda dels fonaments del Reinforcement Learning i les seves aplicacions pràctiques. Una de les lliçons més valuoses va ser entendre que cada algoritme té els seus punts forts: DQN excel·leix en jocs amb accions discretes, mentre que DDPG/TD3 són superiors per control continu. L'estabilitat de l'entrenament és crítica - sovint la diferència entre l'èxit i el fracàs radica en els detalls d'implementació com la normalització de rewards i l'arquitectura de la xarxa. També vaig aprendre que la visualització del procés d'aprenentatge és fonamental per debugging i comprensió dels algoritmes."
github_url: "https://github.com/nilsduran/atari-rl-agents"
demo_url: "https://rl-demo.nilsduran.dev"
paper_url: "https://arxiv.org/abs/2024.atari.comparison"
---

## Context del Projecte

El camp del Reinforcement Learning ha experimentat un renaixement espectacular des de la publicació del treball seminal de DeepMind sobre DQN el 2015. Els jocs d'Atari s'han convertit en el benchmark estàndard per avaluar algoritmes d'RL gràcies a la seva diversitat, complexitat visual i la disponibilitat d'scores humans de referència.

Aquest projecte explora i compara múltiples aproximacions algorítmiques al problema d'aprendre a jugar videojocs sense coneixement previ del joc, utilitzant només l'observació visual (píxels de la pantalla) i el signal de reward.

## Algoritmes Implementats

### Value-Based Methods
- **Deep Q-Network (DQN)**: L'algoritme fundacional que combina Q-learning amb deep learning
- **Double DQN**: Millora que redueix l'overestimation bias del Q-learning
- **Dueling DQN**: Arquitectura que separa l'estimació de value i advantage functions

### Policy-Based Methods
- **Deep Deterministic Policy Gradient (DDPG)**: Per control continu adaptat a accions discretes
- **Twin Delayed DDPG (TD3)**: Millora d'DDPG amb reduced overestimation

### Actor-Critic Methods
- **Proximal Policy Optimization (PPO)**: Algoritme robust i estable per policy optimization
- **Soft Actor-Critic (SAC)**: Maximització d'entropia per millor exploració

## Anàlisi de Resultats

Els resultats mostren una clara jerarquia de rendiment segons el tipus de joc:

**Jocs d'Acció Ràpida** (Space Invaders, Asterix): PPO i SAC demostren superioritat gràcies a la seva capacitat d'adaptació ràpida.

**Jocs d'Estratègia** (Breakout, Pong): DQN variants excel·leixen per la seva capacitat de planificació a llarg termini.

**Jocs de Laberint** (Ms. Pacman, Montezuma's Revenge): Tots els algoritmes lluiten amb el sparse reward problem, demostrant la necessitat de tècniques d'exploració avançades.

L'anàlisi revela que no existeix un algoritme universalment superior - la selecció depèn críticament de les característiques específiques de l'entorn i la tasca.
