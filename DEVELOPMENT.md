## Development Documentation

This information is only really useful for the site owner.

### Build, Test, Local-Dev
Initial modifications from the thundergolfer GitHub page have been vibe-coded with the gemini cli: `gemini` (default gemini-2.5-pro) or `gemini -m gemini-2.5-flash`

#### Install

`bundle install`

#### Run Locally

`bundle exec jekyll server`

#### Clean directory

`bundle exec jekyll clean`

### Idees blog
- [x] Blog que prediu quan moriràs (fent servir dades estadístiques i suposant que la medicina i esperança de vida continuarà avançant a un ritme derivada segona constant, acceleració constant). Fer servir sexe, edat (dia de naixement per més precisió), país, nivell econòmic (en categories del percentil de cobrar), hàbits alimentaris o esportius. I que l'usuari pugui anar actualitzant les seves dades per mirar de millorar la seva expectativa de vida.
- [ ] Blog filosòfic
- [ ] Blog primers principis de la IA o ABCs de la IA (backpropagation, transformers)
- [ ] M'agradaria fer el blog més interactiu i original, perquè els lectors aprenguin backpropagation intuïtivament amb una demo interactiva que inclogui algunes explicacions i widgets interactius.
fes una UI de la xarxa similar a la de 3blue1brown (però no facis servir manim, que és molt lent). Però m'agradaria que no hi hagués un sol pas que faci el forward pass, el càlcul de l'error, la retropropagació a la capa oculta i l'actualització dels pesos en un sol pas, sinó que digui en quin pas està, i hi hagi una petita animació que mostri què s'està fent pas per pas. I només es vegi allò (difuminar la resta i no mostrar els nombres de les neurones que no s'estan actualitzant ni els pesos de les connexions). L'animació hauria de ser visualment atractiva, i semblar gairebé un vídeo (smooth), les equacions han d'aparèixer a la mateixa pantalla i resoldre's pas per pas allà també, no a una pantalla separada i posar primer la notació i després canviar-la pels nombres de l'exemple i fer l'operació. La notació sovint és de les parts més obfuscadores; per tant, m'agradaria que sortís del diagrama de la xarxa neuronal sempre que sigui possible, i quan no ho sigui (learning rate, funció d'activació, funció de pèrdua) que s'expliqui a sota. Els títols dels passos haurien de ser més prominents dins de la pantalla.

### TODO
- [ ] Poblar el blog
- [ ] Afegir més interessos a la pàgina d'interessos (ciutats, països, destins per visitar, restaurants, recentment (llegit The Storygraph, vist Letterboxd, escoltat Spotify, visitat manualment), artistes)
- [ ] Que interessos s'actualitzin automàticament (API de letterboxd)
- [ ] Traduir la pàgina web a l'anglès
- [ ] Millorar l'accessibilitat i l'experiència d'usuari
- [ ] Revisar i actualitzar el contingut existent
- [ ] Millorar l'optimització per a motors de cerca (SEO)
- [ ] Fer servir Google Analytics o Google Tag Manager per fer un seguiment del trànsit i el comportament dels usuaris
- [ ] Afegir més imatges i vídeos per enriquir el contingut
- [ ] Implementar un sistema de comentaris