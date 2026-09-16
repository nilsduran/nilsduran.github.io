---
layout: project
title: Large-Scale Transformer Training on MareNostrum 5
subtitle: Distributed Deep Learning on BSC Supercomputing Infrastructure
type: project
image_format: png
index_description: "Distributed Vision Transformer training on the 200 GB+ MAMe dataset using the MareNostrum 5 supercomputer at BSC."
executive_summary: "Deep learning project scaling Transformer-based vision architectures on the full MAMe dataset (>200 GB) using MareNostrum 5 at the Barcelona Supercomputing Center (BSC). Configured distributed PyTorch pipelines with Slurm to achieve an F1-score of 0.75 across hundreds of fine-grained classes."
technologies:
  - PyTorch
  - Slurm Workload Manager
  - MareNostrum 5 (BSC)
  - Vision Transformers (ViT)
  - CUDA / Multi-GPU
  - Python
  - Bash Scripting
key_achievements:
  - "Distributed training across high-performance GPU nodes on MareNostrum 5"
  - "Trained on the complete MAMe art dataset (>200 GB)"
  - "Achieved a verified 0.75 F1-score on ultra-fine-grained classification"
  - "Optimized Slurm submission scripts and PyTorch parallel data loading"
accuracy: "75.0% F1"
dataset_size: ">200 GB"
improvement: "HPC Scaling"
architecture_description: "Leveraged the GPU partitions of the MareNostrum 5 supercomputer. Orchestrated training workloads using Slurm batch scripts, optimizing distributed data loading and multi-GPU memory utilization to avoid node I/O bottlenecks."
challenges:
  - problem: Large Dataset I/O Bottlenecks
    description: High-resolution images on shared supercomputing filesystems can bottleneck GPU compute if not loaded efficiently.
    solution: Implemented optimized batching, worker prefetching, and multi-node sharding with PyTorch DataLoader and Slurm environment configs.
learnings: "Working directly with Slurm and HPC infrastructure provided deep hands-on understanding of the operational realities of training large models at scale, where I/O throughput and distributed batching matter as much as model architecture."
github_url: "https://github.com/nilsduran/XNDL"
---

## Project Overview

As part of the Advanced Neural Networks and Deep Learning coursework at UPC, this project focused on scaling vision model training to supercomputing infrastructure. Access to the **MareNostrum 5** supercomputer was provided by the **Barcelona Supercomputing Center (BSC)**.

The **MAMe (Massive Art and Media)** dataset consists of over 200 GB of high-resolution museum art images across hundreds of fine-grained categories, characterized by heavy visual nuance and class imbalance.

### Technical Highlights

- **Workload Management:** Authored and tuned automated Slurm batch scripts (`launcher.sh`) for job dispatching, resource monitoring, and checkpoint resumption.
- **Model Architectures:** Evaluated Transformer backbones against convolutional baselines, tracking convergence curves and validation F1-scores.
- **Results:** Achieved a top micro/macro F1-score of 0.75 on the test set, demonstrating the scaling capability of attention mechanisms on complex visual feature spaces.
