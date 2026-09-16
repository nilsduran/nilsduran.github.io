---
layout: project
priority: 7
title: Large-Scale Data Engineering & Knowledge Graphs
subtitle: Distributed Graph Processing, Semantic Web Modeling, and Scalable Analytical Workflows
category: "Big Data & Distributed Systems"
hero_color_1: "#7e22ce"
hero_color_2: "#0f172a"
image_format: png
date: 2025-06-10
date_display: "Spring 2025"
duration: "Academic Project (BDA)"
team_size: 3
technologies:
  - Apache Spark
  - RDF / RDFS / OWL
  - SPARQL
  - GraphDB
  - Python
  - Distributed Storage (DFS)
github_url: "https://github.com/nilsduran"
index_description: "Architected distributed data pipelines integrating heterogeneous datasources into semantic knowledge graphs with GraphDB and high-throughput SPARQL queries."
---

## Project Overview

Developed as the core project for **Big Data Analytics (BDA)** at UPC, this engineering project addressed the architectural challenges common to large-scale industrial data pipelines—such as data silos, heterogeneous schemas, and uncoordinated processing workflows.

Working in a team of three (with Ramon Andreu and Daniel Lopez), we architected an enterprise-grade distributed data pipeline integrating heterogeneous data sources into unified **Knowledge Graphs** managed with **GraphDB**, querying complex relational patterns via **SPARQL**, and running distributed processing with **Apache Spark**.

![Distributed Data Pipeline & Knowledge Graph Architecture](/images/projects/bda-distributed-data-engineering/bda-distributed-data-engineering.png)
*Figure 1: Distributed data lifecycle architecture linking Apache Spark processing nodes, NoSQL Cassandra clusters, and 3D RDF Knowledge Graph triplestores.*

---

## System Architecture & Data Lifecycle

- **1. Distributed Ingestion & Processing:** Automated ETL pipelines cleaning raw sensor, commercial, and operational records using Apache Spark and distributed workers.
- **2. Semantic Modeling (RDF/S & OWL):** Formal ontology design linking domain concepts, hierarchical classifications, and relational constraints using RDFS standards.
- **3. High-Throughput SPARQL:** Optimized graph query execution across millions of triples in GraphDB, extracting real-time analytical indicators.

---

## Key Technical Contributions

- **Ontological Triplification:** Transformed raw tabular and semi-structured datasets into linked RDF triplestores adhering to standard semantic ontologies.
- **Analytical Graph Querying:** Formulated complex federated SPARQL queries incorporating property paths, aggregation filters, and semantic inference rules.
- **Resilient Data Architecture:** Designed storage and processing layers preventing unshared local data traps, ensuring reproducible and verifiable analytics across the distributed cluster.
