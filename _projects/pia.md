---
layout: project
title: SinergIA - La Unió en la Diversitat
subtitle: Sistema Multi-Agent per a Question-Answering Mèdic (PIA + Telefónica)
date_display: "Primavera 2025"
duration: "Projecte PIA"
team_size: 4
hero_color_1: "#0ea5e9"
hero_color_2: "#0f172a"
streamlit_url: "https://pia-demo.streamlit.app"
demo_video: "/images/projects/pia/demo.mov"
architecture_image: "/images/projects/pia/architecture.png"
image_format: png
index_description: "Sistema Multi-Agent que combina diversos LLMs experts per millorar el diagnòstic mèdic, reduint al·lucinacions i augmentant la precisió."
executive_summary: "SinergIA és un sistema multi-agent avançat dissenyat per millorar la precisió en tasques de raonament mèdic. El projecte integra diversos 'agents experts' (models de llenguatge fine-tuned amb LoRA per a especialitats clíniques concretes) coordinats per un supervisor. L'objectiu és superar les limitacions d'un sol model generalista mitjançant la diversitat cognitiva i el debat estructurat, validat amb el benchmark MedQA."
technologies:
  - Python
  - LangGraph
  - Google Gemini API
  - LoRA (PEFT)
  - Streamlit
  - Pandas
  - MedQA Benchmark
key_achievements:
  - Fine-tuning de múltiples models experts (LoRA)
  - Orquestració d'agents amb LangGraph
  - Millora significativa en el benchmark MedQA (+15%)
  - Interfície interactiva completa amb modes de Batalla i Consulta
  - Sistema de rànquing Elo per avaluar el rendiment relatiu dels agents
accuracy: 89.8%
improvement: "+3% (Diversitat)"
architecture_description: "El sistema utilitza una arquitectura en estrella on un 'Agent Supervisor' rep la consulta i selecciona dinàmicament quins 'Agents Experts' són més rellevants. Aquests experts, entrenats específicament en subdominis mèdics (Cirurgia, Farmacologia, etc.) generen respostes que són posteriorment sintetitzades i criticades. Aquest cicle de generació-crítica-refinament permet reduir al·lucinacions, augmentar la precisió global i millorar la completesa de la resposta mèdica."
challenges:
  - problem: Disponibilitat de Dades
    description: "Accedir a corpus mèdics de qualitat per a l'entrenament dels experts."
    solution: "Utilització de llibres de text mèdics i datasets acadèmics filtrats per especialitat."
  - problem: Coordinació d'Agents
    description: "Evitar que els agents es contradiguin o generin soroll en el debat."
    solution: "Implementació d'un flux LangGraph estricte amb un supervisor que pondera les opinions segons la confiança."
  - problem: Dependència d'API
    description: "Els models base van ser discontinuats durant el desenvolupament."
    solution: "Adaptació ràpida de l'arquitectura i documentació exhaustiva dels resultats previs."
learnings: "Aquest projecte ha demostrat el poder de l'especialització en IA. Un conjunt de models petits però experts sovint supera un sol model gegant en tasques de nínxol. També ha posat de manifest la fragilitat de construir sobre APIs experimentals, reforçant la importància de tenir backups locals o codi agnòstic del model."
github_url: "https://github.com/nilsduran/PIA"
demo_url: "https://pia-demo.streamlit.app"
---

> [!WARNING]
> **Projecte Arxivat**: Aquest projecte depenia de models experimentals (Gemini 1.5 Finetuned) que ja no estan disponibles via API. La demostració interactiva mostra errors de connexió, però s'ha mantingut el vídeo del funcionament original per documentació.

## ℹ️ Sobre el Projecte

**SinergIA** neix de la necessitat de millorar la fiabilitat dels LLMs en entorns crítics com la medicina. En lloc de confiar en una sola 'caixa negra', el sistema desglossa el problema simulant una interconsulta mèdica real.

### Problema i Solució

Els LLMs generalistes sovint pateixen d'al·lucinacions o falta de profunditat en temes molt específics. SinergIA proposa una arquitectura **Mixture of Agents (MoA)** on:
1.  Es creen diferents "experts" entrenant models base (*Google Gemini*) amb dades específiques de camps mèdics (Cardiologia, Pediatria, etc.) utilitzant **LoRA**.
2.  Un orquestrador (**LangGraph**) rep la pregunta i decideix quins experts cridar.
3.  Es genera un debat on els experts proposen solucions i es critiquen mútuament per arribar a un consens.

### Resultats Destacats

L'avaluació amb **MedQA** (un dataset d'exàmens de llicència mèdica dels EUA) va mostrar que la col·laboració entre agents millorava la precisió final respecte a l'ús dels models per separat. Els gràfics de rànquing Elo il·lustren com certs experts dominaven clarament en les seves àrees d'especialització, però la combinació d'ells superava a qualsevol expert individual.

La mètrica de "Diversitat" (+3%) fa referència a la millora específica aconseguida en augmentar la varietat de punts de vista en el debat, demostrant que la disparitat d'opinions (ben gestionada) condueix a millors diagnòstics.
