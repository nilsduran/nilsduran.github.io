---
layout: project
priority: 8
title: Deep Reinforcement Learning in Gymnasium Environments
subtitle: Model-Free Control Algorithms for Classic Control & Atari
type: project
image_format: gif
index_description: "Implementation and comparative benchmarking of deep RL algorithms (DQN, DDPG, TD3, SAC, PPO) across discrete and continuous Gymnasium environments."
date_display: "2024"
duration: "Reinforcement Learning Coursework"
team_size: 1
hero_color_1: "#9b59b6"
hero_color_2: "#8e44ad"
executive_summary: "Comprehensive implementation and benchmarking of model-free reinforcement learning paradigms from scratch. Evaluated Value-based (DQN), Policy Gradient (DDPG, TD3, SAC), and Actor-Critic (PPO) architectures on classic control and game environments using Gymnasium."
technologies:
  - Python
  - PyTorch
  - Gymnasium
  - NumPy
  - CUDA
key_achievements:
  - "Implemented deep RL algorithms from scratch using PyTorch"
  - "Benchmarked Value-based and Actor-Critic paradigms"
  - "Integrated Experience Replay, Target Networks, and gradient clipping for training stability"
  - "Analyzed sample efficiency and exploration vs. exploitation dynamics"
architecture_description: "Modular PyTorch reinforcement learning codebase separating agent policies, replay memory buffers, neural network Q/policy functions, and environment wrappers."
challenges:
  - problem: Training Instability
    description: High variance in gradient estimates and bootstrapping errors inherent to off-policy value iteration.
    solution: Implemented target network polyak averaging, double Q-learning loss formulations, and normalized reward scalings.
learnings: "Reinforcement learning requires meticulous attention to stability dynamics. Small variations in learning rates, replay buffer size, or exploration decay rates significantly influence convergence."
---

## Project Overview

Reinforcement learning provides a mathematical framework for agents learning optimal policy mappings through direct environmental interaction. This project explored both discrete and continuous control tasks using the **Gymnasium** API.

### Implemented Algorithms

- **Value-Based:** Deep Q-Network (DQN) with experience replay and target networks.
- **Deterministic Policy Gradients:** Deep Deterministic Policy Gradient (DDPG) and Twin Delayed DDPG (TD3) for continuous action spaces.
- **Stochastic Policy Optimization:** Soft Actor-Critic (SAC) utilizing entropy regularization, alongside Proximal Policy Optimization (PPO).
