---
layout: post
title: "Hauries de tenir avaluacions privades"
date: 2025-05-03
categories: genai llm career
summary: Tothom hauria de tenir un conjunt personal de proves per provar els LLMs.
permalink: /blog/private-evals
---

<figure style="margin: 0; margin-bottom: 1em; position: relative;">
  <img
    src="/images/blog/private-evals/private-evals-hero.webp"
    alt="Text Lorem Ipsum amb redacció i colors vermell/verd."
    width="100%"
    height="auto"
    style="aspect-ratio: 16/9; object-fit: cover; border-radius: 0.4em; filter: brightness(0.9);"
  >
  <div class="redaction-bars" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
    <!-- Les barres de redacció s'afegiran dinàmicament -->
  </div>
</figure>

<style>
  .redaction-bar {
    position: absolute;
    height: 12px;
    background-color: #222;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.2s ease-out;
    z-index: 2;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const redactionContainer = document.querySelector('.redaction-bars');
    const barPositions = [
      { top: '17%', left: '10%', width: '40%' },
      { top: '30%', left: '15%', width: '60%' },
      { top: '48%', left: '5%', width: '30%' },
      { top: '48%', left: '25%', width: '30%' },
      { top: '55%', left: '50%', width: '10%' },
      { top: '64%', left: '80%', width: '15%' },
      { top: '74%', left: '65%', width: '25%' },
      { top: '90%', left: '90%', width: '5%' },
    ];
    barPositions.forEach(pos => {
      const bar = document.createElement('div');
      bar.className = 'redaction-bar';
      bar.style.top = pos.top;
      bar.style.left = pos.left;
      bar.style.width = pos.width;
      redactionContainer.appendChild(bar);
    });

    /* Add scroll effect for shadow movement */
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      const bars = document.querySelectorAll('.redaction-bar');
      bars.forEach(bar => {
        const offsetY = scrollY * 0.05;
        bar.style.boxShadow = `0px ${2 + offsetY}px 4px rgba(0, 0, 0, 0.3)`;
      });
    });
  });
</script>

<div id="toc" style="background: #f8f9fa; padding: 1em; border-radius: 0.4em; position: absolute; right: calc(50% - 45em); top: 54em; width: 15em; max-height: 80vh; overflow-y: auto; display: none;">
  <div id="toc-content"></div>
</div>

<script>document.addEventListener('DOMContentLoaded', function() {
  const toc = document.getElementById('toc');
  function updateTocVisibility() {
    toc.style.display = window.innerWidth < 768 ? 'none' : 'block';
  }
  
  updateTocVisibility();
  
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
  window.addEventListener('resize', updateTocVisibility);
});</script>

Si utilitzeu LLMs de manera consistent en qualsevol tasca no trivial, hauríeu de crear les vostres pròpies 'avaluacions' privades (també conegudes com a proves). Dediqueu un parell d'hores, comenceu de manera senzilla i passeu del consum passiu de l'eufòria de la IA a un ús actiu i crític de l'eina. Vaig començar després de notar que diversos enginyers de personal que segueixo i admiro compartien que tenien avaluacions privades ([1](https://blog.ezyang.com/2025/04/why-you-should-maintain-a-personal-llm-coding-benchmark/), [2](https://www.notion.so/211-A-how-to-post-about-setting-up-private-LLM-evals-1db99ea4b26f802181def9c9632e332a?pvs=21), [3](https://x.com/GrantSlatton/status/1874900859462856977)). Tant els enginyers júnior com els de personal utilitzen intensament els LLMs, però aquests últims s'impliquen amb la tecnologia emergent d'una manera sorprenentment diferent i més productiva. Els júniors 'proben sort', sorpresos per la velocitat i la capacitat d'aquests sistemes. Els enginyers sèniors, en canvi, apliquen judici, escepticisme i bon gust a la sortida dels LLM, actuant com un filtre essencial en el flux de tokens. Les avaluacions privades formen part d'aquesta activitat de filtratge.

En cedir l'obertura i el control, el treball de coneixement impulsat per LLM s'assembla més al Magisteri Catòlic. La tasca de crear i jutjar models de frontera recau únicament en els nostres bisbes, aquells investigadors brillants i en procés de ser-ho d'OpenAI, Anthropic, Gemini.

Us diuen que és un geni. Diuen que [hauria d'escriure gairebé tot el codi](https://x.com/ludwigABAP/status/1918286533775237245). La propera vegada que llancin un model, uniu-vos a altres per clavar les vostres avaluacions privades a la seva porta.

<figure style="margin: 0; margin-bottom: 1em;">
  <a href="/images/blog/private-evals/private-evals-results.png" target="_blank" title="Feu clic per veure ampliat">
    <img
      src="/images/blog/private-evals/private-evals-results.png"
      alt="Resultats del 17 d'abril de les meves avaluacions privades."
      width="100%"
      height="auto"
      style="width: 100%; height: auto; border-radius: 0.4em;"
    >
  </a>
  <figcaption style="color: #777;">Resultats del 17 d'abril de les meves avaluacions privades.</figcaption>
</figure>

## Com fer-ho: escollir avaluacions

Com que els LLMs són generadors de tokens fabulosament flexibles, el panorama de possibles proves de rendiment és impossiblement gran. Teniu temps limitat i probablement voleu dedicar aquest temps a explotar els LLMs, no a avaluar-los. Així que sigueu exigents amb el que avalueu.

El lloc obvi i correcte per començar és el vostre historial de xat. Ja heu tingut LLMs que us han ajudat en centenars de problemes. Trieu alguns dels més importants i interessants per formar part de la vostra avaluació privada.

Ara, tenint una font d'avaluacions potencials, la següent pregunta és com automatitzar. L'automatització és important, però pel que he vist entre la gent que fa avaluacions privades, hi ha massa èmfasi en escriure scripts i construir frameworks per automatitzar les avaluacions de pass/fail. Espereu que aproximadament la meitat de les vostres avaluacions no siguin adequades per a l'automatització.

Simon Eskildsen [aparentment no té cap automatització, fent un seguiment de les seves avaluacions privades a Notion.](https://x.com/Sirupsen/status/1913943250068455526) Això funciona bé. No us compliqueu la vida.

<figure style="margin: 0 auto; margin-bottom: 1em; text-align: center;">
  <img
    src="/images/blog/private-evals/private-evals-automation-xkcd.png"
    alt="Quant de temps pots dedicar a fer una tasca rutinària més eficient abans de dedicar-hi més temps del que estalviaries. https://xkcd.com/1205"
    height="auto"
    style="width:75%; height: auto; border-radius: 0.4em;"
  >
  <figcaption style="color: #777;">Quant de temps pots dedicar a fer una tasca rutinària més eficient abans de dedicar-hi més temps del que estalviaries. https://xkcd.com/1205</figcaption>
</figure>

Un cop tractada la qüestió de l'automatització, tinc altres consells. Les avaluacions haurien de ser:

-   **Quelcom que coneixeu molt bé.** Si sou un avaluador poc fiable, us confondereu i no obtindreu senyal sobre el rendiment dels LLM de frontera. Per exemple, els benchmarks mostren que els LLM superen el Test d'Admissió a la Facultat de Dret (LSAT). Si sou advocat, per descomptat, tingueu avaluacions de dret privades. En cas contrari, no.
-   **Quelcom que us importi molt.** Si els LLM són tan transformadors de la vida i del món com afirmen els CEOs, proto-AGIs, haurien de ajudar-vos amb el que us importa. Si és cultivar varietats rares de te en climes desfavorables, pregunteu sobre això. 🍵.
-   **Hauria de ser difícil per als LLM, hauria de ser difícil per a vosaltres.** En altres paraules, apunteu a un alt ROI. Si una avaluació és fàcil per als LLM actuals, esteu perdent temps i diners executant l'avaluació. Si no és difícil per a vosaltres, no importa tant que un LLM pugui fer-ho.
-   **Diverses**. Els LLM són òbviament útils per a la programació, però si seran una revolució tecnològica a l'escala de l'electricitat, la impremta o Internet, haurien de començar a ser-vos útils en la majoria dels aspectes de la vostra vida.

<figure style="margin: 0 auto; margin-bottom: 1em; text-align: center;">
  <img
    src="/images/blog/private-evals/private-evals-irobot.webp"
    alt="Pot un robot escriure una simfonia?"
    height="auto"
    style="width: 75%; height: auto; border-radius: 0.4em;"
  >
  <figcaption style="color: #777;">Tu pots?</figcaption>
</figure>

## Com fer-ho: exemples

Quan la gent parla de les seves avaluacions privades, té un aire de burla. Són *privades* al cap i a la fi. "No puc dir-t'ho, estrany d'Internet, sense dir-ho als LLMs." Sempre estan rastrejant.

Però puc ser prou concret i específic per ajudar-vos a iniciar un conjunt d'avaluacions.

Agrupo les meves avaluacions en categories. Escolliré un exemple de cada categoria: recomanació, revisió, codi, disseny, escriptura.

### Recomanació:

Una bona recomanació és difícil i valuosa. Tots som conscients de com l'índex de cerca de Google i els productes de revisió estan patint, però poden els LLM substituir-los? Poden els LLM, havent-se empassat Reddit, substituir-lo també?

Una avaluació de recomanació que tinc és demanar als LLM que recomanin la millor cafeteria de la meva zona, basant-me en alguns paràmetres. Un local amb coneixement pot encertar aquesta pregunta. Jo puc respondre aquesta pregunta. Els LLM actualment ho fan *malament*. No al·lucinen tant, però recomanen llocs tancats o fora de domini ("aquí hi ha alguna cosa tancada a Bushwick. És genial!").

Serà interessant per a mi si alguna vegada milloren en això. Si ho fan, els confiaré més amb llocs que no conec íntimament. Per ara, Reddit és l'opció en línia "simplement bé". Els companys locals són els millors.

### Revisió:

Els humans són revisors essencials, [fal·libles](https://thundergolfer.com/pr-self-review) i cars. Cada vegada que detecto un error no trivial en un conjunt de canvis, és un candidat obvi per a una avaluació de revisió privada.

Si aconseguiu que l'LLM seleccioni una línia específica amb l'error en un fragment de més de 100 línies, això és automàticament comprovable i després podeu fer un seguiment avaluant manualment l'explicació.

Emocionantment, he descobert que els LLM són bons en la revisió. Tinc una avaluació que implica aritmètica per a un limitador de cub de fuita i els LLM de frontera poden trobar de manera consistent l'error de cas límit introduït per l'LLM que el va expulsar originalment (Claude 3.5).

### Codi:

Les avaluacions automatitzades per a la codificació haurien de ser òbviament per a qualsevol programador. Escriviu una sol·licitud, escriviu una prova. L'LLM llegeix la sol·licitud, expulsa una mica de codi i executeu la prova.

Hi ha dues coses interessants, però. Primer, hauríeu de posar en quarantena l'execució del codi. Segon, com automatitzeu l'avaluació del codi que produeix una sortida *visual*.

L'execució de codi en quarantena la tractaré més endavant. Per a l'avaluació visual, [Nicholas Carlini](https://github.com/carlini/yet-another-applied-llm-benchmark) té un gran exemple d'ús de LLM visuals com a jutges:

```bash
"Write a C program that draws an american flag to stdout." >> LLMRun() >> CRun() >> \
    LLMRun("What flag is shown in this image?") >> \
        (SubstringEvaluator("United States") |
         SubstringEvaluator("USA") |
         SubstringEvaluator("America"))
```

Hi ha límits a les capacitats actuals de raonament visual dels models de frontera, però crec que això és bastant genial!

### Disseny:

> **Problema:** esbrinar l'estratègia de col·locació òptima per emmagatzemar fitxers en un disc dur donada una predicció de la popularitat futura del fitxer, tenint en compte que esteu minimitzant i maximitzant certes coses
>
>
> **Resultats:** Guanyador clar: o1
>

Admeto que no he dedicat temps a fer una avaluació en aquesta categoria. Em remeto a la descripció de Grant Slatton de la seva avaluació privada de disseny de programari: [x.com/GrantSlatton/status/1874900859462856977](https://x.com/GrantSlatton/status/1874900859462856977).

**Escriptura:**

Abans de dedicar temps a les avaluacions privades, no estava convençut que els LLM fossin escriptors o editors eficaços. Després d'afegir avaluacions d'escriptura privades, ara crec que poden ser editors eficaços.

Un exemple d'avaluació aquí és agafar un esborrany d'una publicació de blog d'enginyeria de [Modal.com](http://Modal.com) que vaig editar jo mateix i després reescriure'l completament i donar-lo a l'LLM per criticar-lo. He de revisar manualment el treball de l'LLM, però 3 de cada 5 van proporcionar un feedback de valor net.

## Com fer-ho: codi d'inici

<figure style="margin: 0 auto; margin-bottom: 1em; text-align: center;">
  <img
    src="/images/blog/private-evals/private-evals-system-overview.png"
    alt="Visió general de la definició i l'execució de l'avaluació. Crèdit: Nicholas Carlini per al DSL original."
    height="auto"
    style="width: 100%; height: auto; border-radius: 0.4em;"
  >
  <figcaption style="color: #777;">Visió general de la definició i execució de l'avaluació. Crèdit: Nicholas Carlini per al DSL original.</figcaption>
</figure>

El meu sistema bàsic d'avaluació privada és, [com el d'Edward Yang](https://blog.ezyang.com/2025/04/why-you-should-maintain-a-personal-llm-coding-benchmark/), basat en el [YAALLMB](https://github.com/carlini/yet-another-applied-llm-benchmark/) de Nicholas Carlini. Però no recomano bifurcar YALLMB per diverses raons.

1.  Ha acumulat molta complexitat per donar suport a les nombroses i sofisticades avaluacions (públiques) de Carlini.
2.  Gran part del codi que conté és generat per LLM i, francament, és inestable.
3.  Depèn d'un shim fràgil a un motor Docker o Podman local.

En canvi, podeu fer una ullada al meu repositori significativament simplificat: [github.com/**thundergolfer/private-llm-bench**](http://github.com/thundergolfer/private-llm-bench).

Consulteu el `README` per obtenir instruccions completes i actualitzades, però ara mateix només depèn de `uv`, [`modal`](https://modal.com/use-cases/sandboxes) i una clau API per a tots els proveïdors de LLM de frontera que espereu.

El cost d'executar això és insignificant. En una dotzena de proves, executant-se en un cron setmanal, he gastat 48 *cèntims* a OpenAI.

<figure style="margin: 0 auto; margin-bottom: 1em; text-align: center;">
  <img
    src="/images/blog/private-evals/private-evals-modal.png"
    alt="Executo les meves avaluacions privades setmanalment utilitzant un cron de Modal."
    height="auto"
    style="width: 75%; height: auto; border-radius: 0.4em;"
  >
  <figcaption style="color: #777;">Executo les meves avaluacions privades setmanalment utilitzant un cron de Modal.</figcaption>
</figure>

<figure style="margin: 0 auto; margin-bottom: 1em; text-align: center;">
  <img
    src="/images/blog/private-evals/private-evals-manual-review.png"
    alt="Utilitzo una eina de revisió manual molt senzilla per a aquelles avaluacions que ho necessiten."
    height="auto"
    style="width: 100%; height: auto; border-radius: 0.4em;"
  >
  <figcaption style="color: #777;">Utilitzo una eina de revisió manual molt senzilla per a aquelles avaluacions que ho necessiten.</figcaption>
</figure>


## Acabar al principi, sabent per primera vegada.

Un comportament clau dels enginyers forts és 'mirar sota el capó' i aprendre com funcionen les eines per poder-les explotar millor. Mirar sota el capó també és com veieu les eines *com a eines*, i no com a màgia negra. Les imatges de Docker no són màgia, només són [una pila de tarballs](https://fly.io/blog/docker-without-docker/).

Donat l'estat del programari LLM de frontera —molt privat, molt complicat, estocàstic, poc entès—, malauradament no podeu gestionar-los com la resta del vostre conjunt d'eines. Però amb les avaluacions privades podeu fer alguna cosa que s'assembla més a un treball de clau anglesa adequat. I això és un començament.
