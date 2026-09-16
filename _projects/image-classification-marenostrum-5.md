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

As part of the Advanced Neural Networks and Deep Learning coursework at UPC, this project focused on scaling vision model training to supercomputing infrastructure. Access to the **MareNostrum 5** supercomputer was provided by the **Barcelona Supercomputing Center (BSC)**, ranked among the top 10 most powerful public supercomputers in the world.

The **MAMe (Massive Art and Media)** dataset consists of over 200 GB of high-resolution museum art images across hundreds of fine-grained categories, characterized by complex artistic textures, stylistic nuance, and heavy class imbalance.

---

## Technical Highlights & Distributed Infrastructure

### 1. HPC Cluster & Workload Management
- **Slurm Automation:** Authored and tuned multi-GPU Slurm submission scripts (`launcher.sh`) managing job dispatching, resource allocation, environment isolation, and automated checkpoint recovery on failure.
- **Distributed Data Loading:** Designed efficient PyTorch data sharding and asynchronous prefetching to eliminate disk I/O bottlenecks across shared supercomputing storage nodes.

### 2. Vision Transformer Architecture & Fine-Tuning
- **Model Backbones:** Evaluated Vision Transformer (ViT) architectures against modern convolutional baselines (ResNet, ConvNeXt), analyzing self-attention receptive fields on fine-grained stylistic patterns.
- **Optimization Strategy:** Trained using AdamW with cosine learning rate scheduling, mixed-precision FP16 computing, and aggressive data augmentations (RandAugment, CutMix) to prevent overfitting on fine art categories.

---

## Benchmark Results

- **Classification Performance:** Achieved a top test F1-score of **0.75** across fine-grained art classes, outperforming classical CNN baselines by +6% absolute.
- **Scalability:** Demonstrated linear speedups across distributed multi-GPU partitions with minimal inter-node synchronization overhead.
