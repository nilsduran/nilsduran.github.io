---
layout: post
title: "El Primer LLM"
date: 2025-03-23
categories: genai llm machine-learning
summary: Jeremy Howard i Sebastian Ruder van crear el primer LLM.
permalink: /blog/the-first-llm
---

<figure style="margin: 0; margin-bottom: 1em;">
  <img
    src="/images/gpt-1-illustration.webp"
    alt="Il·lustració: Ben Barry (il·lustració de portada de l'anunci de GPT-1)"
    style="border-radius: 0.4em;"
    width="100%"
    height="auto"
    style="aspect-ratio: 16/9; object-fit: cover; border-radius: 0.4em;"
  >
  <figcaption style="color: #777;">Il·lustració: Ben Barry</figcaption>
</figure>

<div id="toc" style="background: #f8f9fa; padding: 1em; border-radius: 0.4em; position: absolute; right: calc(50% - 45em); top: 54em; width: 15em; max-height: 80vh; overflow-y: auto;">
  <div id="toc-content"></div>
</div>

<script>document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth < 768) {
    document.getElementById('toc').style.display = 'none';
    return;
  }

  const toc = document.getElementById('toc');
  const headings = document.querySelectorAll('h2, h3');
  const tocContent = document.getElementById('toc-content');
  const lastTwoHeadingIndexes = new Set([headings.length - 1, headings.length - 2]);

  headings.forEach((heading, index) => {
    if (lastTwoHeadingIndexes.has(index)) {
      return;
    }
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.style.color = '#777';
    const div = document.createElement('div');
    div.appendChild(link);
    if (heading.tagName === 'h3') {
      div.style.marginLeft = '1.5em';
    }
    div.style.marginBottom = '0.5em';
    tocContent.appendChild(div);
  });

  /* Update TOC visibility on window resize */
  window.addEventListener('resize', function() {
    document.getElementById('toc').style.display = window.innerWidth < 768 ? 'none' : 'block';
  });
});</script>


Què estaves fent mentre la revolució dels LLM naixia i en pocs anys va refer la indústria de la computació?

Va ser el primer LLM realment fet per un australià, entre sessions de surf?

Aquestes preguntes m'han acompanyat des que vaig revisar, cronològicament, els articles de recerca que van escalar el modelatge del llenguatge i la capitalització de mercat de la nostra indústria gegant en bilions de dòlars més.

'Nosaltres' ho vam fer. El benchmark més famós de la història de la computació, el de Turing, ara és *massa fàcil*. Avui, desenes de nous benchmarks mesuren la frontera en expansió dels èxits de la IA: pot guanyar el Putnam, pot vèncer Pokémon?

El 2016, un any abans que nasqués el 'primer LLM', estava assegut a classes de ciències de la computació sentint professors parlar de la jerarquia de les gramàtiques de Chomsky. En aquestes conferències, utilitzaven la prova de Turing per injectar una mica de meravella, una mica de misticisme en la mecànica seca dels autòmats de pila. Alguna vegada faríem un programa que superés aquesta prova?

Quan va néixer el 'primer LLM', estava acabant unes pràctiques en un equip que construïa un model de llenguatge. No era gran, i no era un transformador, però amb retrospectiva estava relativament a prop de la revolució dels LLM. Però no hi estava prestant gaire atenció. La majoria de nosaltres no ho fèiem.

El gener de 2018, mentre lluitava amb Golang en les meves segones pràctiques, l'australià Jeremy Howard va publicar *ULMFit*, el primer LLM.

<figure style="margin: 0; margin-bottom: 1.4em;">
  <img
    src="/images/gpt-timeline-2.png"
    alt="Cronologia de GPT-1 a GPT-3.5"
    style="border-radius: 0.4em; border: 2px solid #ddd;"
  >
</figure>

Alec Radford va publicar *Improving Language Understanding by Generative Pre-Training* (GPT-1) l'11 de juny de 2018.

GPT-1 (Generative Pre-Train One) és àmpliament acceptat com un LLM.
Segons molts, *és* el primer. Però Jeremy Howard afirma el contrari.
Si hem d'entendre el naixement dels LLM, haurem de definir què fa exactament que un LLM sigui un LLM.

<div style="display: flex; justify-content: center;">
<blockquote class="twitter-tweet" data-lang="en" data-dnt="true"><p lang="en" dir="ltr">What I&#39;ve been working on for the past year! <a href="https://t.co/CAQMYS1rR7">https://t.co/CAQMYS1rR7</a><br><br>Inspired by CoVE, ELMo, and ULMFiT we show that a single transformer language model can be finetuned to a wide variety of NLP tasks and performs very well with little tuning/tweaking.</p>&mdash; Alec Radford (@AlecRad) <a href="https://twitter.com/AlecRad/status/1006247734691545089?ref_src=twsrc%5Etfw">June 11, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

## Què és un LLM?

**LLM** <span style="color: #546E7A;">(*_**substantiu**_*)</span>: un model de llenguatge que ha estat entrenat de manera tan efectiva amb auto-supervisió com a 'predictor de la següent paraula' que es pot adaptar fàcilment i amb èxit a moltes tasques específiques basades en text.

Havent llegit GPT-1, 2, 3 i alguns altres articles, aquesta és la definició que m'agrada. No és una definició trivial, així que desglossem-la:

-   **"és un model de llenguatge"** → les entrades i les sortides predites són components del llenguatge humà escrit (per exemple, anglès). Aquests components no són necessàriament, i no solen ser, paraules. Poden ser caràcters o seqüències de caràcters (tokens).
-   **"entrenat amb auto-supervisió"** → el conjunt de dades és text *sense etiquetar* del qual es produeixen exemples (x,y). Això va ser una sortida important dels conjunts de dades de text etiquetats, cars i específics per a tasques.
-   **"predictor de la següent paraula"** → al model se li dóna una seqüència de paraules/caràcters/tokens i ha de predir què ve a continuació. "El gat al" → "barret".
-   **"fàcilment adaptable"** → no es fan canvis arquitectònics al model; el model té capacitats de pocs trets, fins i tot d'un sol tret.
-   **"adaptat amb èxit"** → aconseguir un rendiment d'última generació
-   **"moltes tasques específiques basades en text"** → el model pot realitzar classificació, resposta a preguntes, anàlisi sintàctic i altres desafiaments de text amb un rendiment d'última generació. Aquest és un salt important més enllà dels models de llenguatge específics per a tasques que són bons en una cosa i dolents en pràcticament tot el demés.

He omès de manera conspícua la part "gran" de la definició de LLM, però està implícita per l'èxit de l'entrenament generatiu auto-supervisat. Abans d'una certa mida de paràmetres, aquesta arquitectura de model de llenguatge no funcionava. Avui dia, els LLM més grans són 1000 vegades més grans que els més petits.

També he deixat de banda qualsevol vinculació de la categoria LLM a l'arquitectura del transformador. Tot i que és l'arquitectura LLM més dominant, n'hi ha d'altres (LSTM, Mamba, [Diffusion](https://x.com/InceptionAILabs/status/1894847919624462794)).

Tot el demés de la definició va ser, crec, clau per a GPT-1 i el 'moment LLM'.

Si llegiu els articles de GPT-2 i GPT-3, procedeixen gairebé directament de l'èxit de GPT-1. Tot i que GPT-1 no inclou les paraules "model de llenguatge gran" en absolut, els articles posteriors sí que ho fan i es refereixen a GPT-1 com a tal. Així que GPT-1 és un LLM primerenc, i potser el primer, si els seus precedents —ULMFit, ELMo i CoVE— no poden fer la reclamació.

## Són algun de CoVE, ELMo i ULMFit LLMs?

<figure style="margin: 0; margin-bottom: 1.4em;">
  <img
    src="/images/gpt-timeline.png"
    alt="Cronologia de GPT-1 mostrant la seva relació amb les referències discutides en aquesta publicació."
    style="border-radius: 0.4em; border: 2px solid #ddd;"
  >
  <figcaption style="color: #777;">Cronologia de GPT-1 mostrant la seva relació amb les referències discutides en aquesta publicació.</figcaption>
</figure>

[Contextualized Word Vectors (CoVE)](https://arxiv.org/pdf/1708.00107) van ser una innovació important en l'aprenentatge per transferència, però no s'assemblen gaire a GPT-1. Els vectors CoVE es van crear amb aprenentatge supervisat (en traducció d'anglès a alemany) no amb aprenentatge auto-supervisat, i els vectors només esdevenen un component inicial en un model més gran específic per a tasques.

<figure style="margin: 0; margin-bottom: 1em;">
  <img
    src="/images/CoVE.png"
    alt="“Figura 1: a) entrenem una LSTM bidireccional de dues capes com a codificador d'un model seqüència-a-seqüència atencional per a la traducció automàtica i b) la utilitzem per proporcionar context a altres models de PNL.”"
    style="border-radius: 0.4em; border: 2px solid #ddd;"
  >
  <figcaption style="color: #777;">"Figura 1: a) entrenem una LSTM bidireccional de dues capes com a codificador d'un model seqüència-a-seqüència atencional per a la traducció automàtica i b) la utilitzem per proporcionar context a altres models de PNL.”</figcaption>
</figure>

[Embeddings From Language Models (ELMo)](https://arxiv.org/pdf/1802.05365) també entrena embeddings de paraules i els acobla a models específics per a tasques. De la secció **Treball relacionat** de GPT-1:

> [ELMo i CoVE] utilitzen representacions ocultes d'un model de llenguatge o traducció automàtica pre-entrenat com a característiques auxiliars mentre s'entrena un model supervisat en la tasca objectiu. Això implica una quantitat substancial de nous paràmetres per a cada tasca objectiu separada, mentre que nosaltres requerim canvis mínims a la nostra arquitectura de model durant la transferència.
>

Cap d'aquests és un LLM segons la meva opinió, tot i que per a Alec Radford van ser clarament trampolins. Passem ara a ULMFit, que els autors de GPT-1 diuen que és la "línia de treball més propera a la nostra".

Universal Language Model Fine-tuning for Text Classification (ULMFit) és un predictor de la següent paraula LSTM entrenat de manera auto-supervisada a WikiText, adaptable de manera econòmica i sense canvis d'arquitectura per realitzar diverses tasques de classificació de text amb un rendiment d'última generació. (Veure com de bé va funcionar ULMFit en el conjunt de dades de ressenyes de pel·lícules d'IMDb va ser un moment 🤯 per al seu autor, Jeremy Howard.)

<figure style="margin: 0; margin-bottom: 1.4em;">
  <img
    src="/images/ulmfit-architecture.png"
    alt="Visió general de l'arquitectura ULMFit, amb les seves 'intricades esquemes d'aprenentatge' al mig i a la dreta."
    style="border-radius: 0.4em; border: 2px solid #ddd;"
  >
  <figcaption style="color: #777;">Visió general de l'arquitectura ULMFit, amb les seves "intricades esquemes d'aprenentatge” al mig i a la dreta.</figcaption>
</figure>

Aquest ULMFit s'assembla molt a GPT-1 i a la definició anterior d'un LLM. Les úniques parts que no són discutiblement semblants a GPT són la facilitat de l'ajust fi i l'amplitud de les tasques aplicades.
L'article de GPT-1 assenyala amb raó la complexitat de les "taxes d'aprenentatge triangulars" i el "descongelament gradual" dels paràmetres.
L'article de GPT-1 també afirma que en substituir l'arquitectura LSTM per la del transformador, desbloquegen una competència més àmplia específica per a tasques que ULMFit, allargant la capacitat de predicció del model pre-entrenat.

Després de remenar el passat, estic satisfet de considerar ULMFit el primer LLM. Això és segurament discutible. No he prestat gaire atenció a l'article de Dai i Le del 2015 *Semi-supervised Sequence Learning* (https://arxiv.org/pdf/1511.01432), que va ser l'altra "línia de treball més propera" esmentada a l'article de GPT-1. També se li dóna més importància que a ULMFit en la [pròpia història de Radford del 2020](https://www.youtube.com/watch?v=BnpB3GrpsfM) del moment GPT.

Importa ser el primer? Crec que sí, una mica. La indústria del programari i l'acadèmia honoren els seus fundadors. Tots formem part d'una cultura que [colonitza la noosfera](https://en.wikipedia.org/wiki/Homesteading_the_Noosphere).


<div style="display: flex; justify-content: center;">
<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">ofc the real reason I&#39;m pushing back on this is that I&#39;m worried some folks might realise I didn&#39;t actually create the first LLM at on my own at <a href="https://t.co/GEOZunWoXj">https://t.co/GEOZunWoXj</a>, but that actually I&#39;m just a token figurehead for a CCP conspiracy that created it &amp; had me take credit</p>&mdash; Jeremy Howard (@jeremyphoward) <a href="https://twitter.com/jeremyphoward/status/1882964239520071926?ref_src=twsrc%5Etfw">January 25, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

A més, entendre el llinatge no-OpenAI dels LLM ajuda a comprendre la dinàmica competitiva de la indústria. Tot i que OpenAI va agafar els seus competidors desprevinguts, la història dels LLM sempre ha estat multipolar, multigeneracional i geogràficament diversa. Amb retrospectiva, podem preguntar-nos: si els australians poden fer avançar l'estat de l'art, per què no la Xina?


## L'últim LLM

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/4017_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"LLM","geo":"US","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"date=today%205-y&geo=US&q=LLM&hl=en","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>

Havent tornat a l'inici de la bogeria dels LLM, m'ha fet preguntar-me quan veurem el final. GPT-4V va ser la introducció de les capacitats de comprensió d'imatges a la família de models anteriorment només de text, i des de llavors els 'laboratoris de frontera' s'han tornat multimodals. Amb ChatGPT, Claude i Gemini afegint processament d'imatges i àudio, ja no sembla adequat anomenar-los models de llenguatge. En lloc de LLM, estem veient un ús creixent (però encara menor) de "model fundacional".

Si hagués d'endevinar, diria que el terme LLM es mantindrà. Es convertirà en com la unitat de processament gràfic (GPU). El públic en general acabarà utilitzant aquests models com a vídeo-entrada vídeo-sortida, i els anomenaran LLM. El que va començar com un terme per a alguna cosa que analitzava ressenyes de pel·lícules d'IMDb es convertirà en un terme per a alguna cosa que fa pel·lícules. Almenys, així és com ho pensaré jo.

El primer LLM va ser una LSTM pre-entrenada a Wikipedia i ajustada a ressenyes de pel·lícules d'IMDb. GPT-1 va substituir crucialment l'arquitectura LSTM per la del transformador, eliminant la complexitat d'ULMFit i oferint a la indústria una rampa d'escalada que s'estendrà [almenys fins al 2030](https://epoch.ai/blog/can-ai-scaling-continue-through-2030). Molts, molts més LLM per venir.

Prepareu-vos i mantingueu l'atenció a la carretera que teniu al davant.


<figure style="margin: 0; margin-top: 1.4em; margin-bottom: 1.4em;" class="magnify-container">
  <img
    src="/images/scaling-till-2030.png"
    alt="Cronologia estesa de LLM fins al 2020, mostrant quant de camí queda per davant."
    style="border-radius: 0.4em; border: 2px solid #ddd;"
    class="magnify-image"
  >
  <div class="magnifying-glass"></div>
  <style>
    @media (hover: hover) {
      .magnify-container {
        position: relative;
        overflow: visible;
      }

      .magnifying-glass {
        display: none;
        position: absolute;
        width: 150px;
        height: 150px;
        border: 2px solid #fff;
        border-radius: 50%;
        pointer-events: none;
        background-repeat: no-repeat;
        box-shadow: 0 0 0 7px rgba(255, 255, 255, 0.85),
                    0 0 7px 7px rgba(0, 0, 0, 0.25),
                    inset 0 0 40px 2px rgba(0, 0, 0, 0.25);
      }

      .magnify-container:hover .magnifying-glass {
        display: block;
      }
    }
  </style>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const containers = document.querySelectorAll('.magnify-container');

      containers.forEach(container => {
        const img = container.querySelector('.magnify-image');
        const glass = container.querySelector('.magnifying-glass');

        container.addEventListener('mousemove', function(e) {
          const bounds = container.getBoundingClientRect();
          const x = e.clientX - bounds.left;
          const y = e.clientY - bounds.top;

          const magnification = 2;
          const glassRadius = glass.offsetWidth / 2;

          glass.style.left = `${x - glassRadius}px`;
          glass.style.top = `${y - glassRadius}px`;

          const bgX = x * magnification - glassRadius;
          const bgY = y * magnification - glassRadius;

          glass.style.backgroundImage = `url(${img.src})`;
          glass.style.backgroundSize = `${img.width * magnification}px ${img.height * magnification}px`;
          glass.style.backgroundPosition = `-${bgX}px -${bgY}px`;
        });
      });
    });
  </script>
</figure>


----

**Actualització:** @levelsio i Jeremy Howard [van discutir sobre aquesta qüestió](https://x.com/jonobelotti_IO/status/1906086472349786595) el 29 de març de 2025. D'això va sorgir el feedback que hauria de prestar més atenció a BERT ("La primera demostració d'ULMFiT va precedir BERT.") i a l'article del 2015 *Semi-supervised Sequence Learning*.
