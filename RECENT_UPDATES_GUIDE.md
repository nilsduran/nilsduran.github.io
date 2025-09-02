# Guia per actualitzar la secció "Recents" d'interessos

Aquesta guia t'explica com funciona el sistema híbrid de la secció "Recents".

## Sistema Híbrid: Manual + Automàtic

### 📚 Llibres (Manual): `js/recent_book.json`
```json
{
  "title": "Títol del llibre",
  "subtitle": "Nom de l'autor",
  "imgSrc": "/images/interests/recent/book.jpg",
  "link": "https://enllaç-al-llibre"
}
```

### ✈️ Viatges (Manual): `js/recent_travel.json`
```json
{
  "title": "Nom del lloc",
  "subtitle": "Descripció • Data",
  "imgSrc": "/images/interests/recent/travel.jpg",
  "link": "#"
}
```

### 🎬 Pel·lícules (Automàtic via API)
S'actualitzen automàticament des del RSS de Letterboxd en temps real. No cal fer res!

### 🎵 Música (Automàtic via API)
S'actualitza automàticament des de l'API de Last.fm en temps real. No cal fer res!

## Imatges

### Manual (has de gestionar-les tu):
- **Llibre**: `images/interests/recent/book.jpg`
- **Viatge**: `images/interests/recent/travel.jpg`

### Automàtiques (es carreguen directament de les APIs):
- **Pel·lícula**: Directament des de Letterboxd
- **Música**: Directament des de Last.fm

## Com actualitzar contingut manual

1. **Per llibres**: Edita `js/recent_book.json` + substitueix `images/interests/recent/book.jpg`
2. **Per viatges**: Edita `js/recent_travel.json` + substitueix `images/interests/recent/travel.jpg`
3. **Commit i push**

## Com funciona el contingut automàtic

- **Pel·lícules**: Cada vegada que algú visita la pàgina, JavaScript consulta el RSS de Letterboxd i mostra l'última pel·lícula
- **Música**: Cada vegada que algú visita la pàgina, JavaScript consulta l'API de Last.fm i mostra l'última cançó

## Avantatges del sistema híbrid

- ✅ **Llibres i viatges**: Control manual (actualitzes quan vols)
- ✅ **Pel·lícules i música**: Sempre actualitzades automàticament en temps real
- ✅ **Millor performance**: Utilitza caché del navegador per evitar crides constants a les APIs
- ✅ **Fiabilitat**: Si una API falla, utilitza l'última versió en caché
