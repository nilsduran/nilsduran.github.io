---
layout: post
title: "Backpropagation: Una història visual"
date: 2025-09-03
categories: deep-learning, python, matemàtiques, ai, xarxes-neuronals, teoria, first-principles, interactive
summary: Una guia visual i interactiva sobre com funciona el backpropagation, amb animacions pas a pas i equacions que s'expliquen intuïtivament.
mathjax: true
permalink: /blog/backpropagation
backprop_demo: true
---

## Introducció

El *backpropagation* o retropropagació sovint es descriu com un mètode eficient de càlcul de gradients que aplica programació dinàmica al mètode de la cadena per estalviar càlculs redundants.

Però en el fons, hi ha una idea molt senzilla i humana: aprendre dels errors. Ja ho deia Agustí d'Hipona:
> Errare humanum est, perseverare autem diabolicum — <span style="color: #777;">Errar és humà, perseverar en l'error és diabòlic.</span>

El gradient de la _loss_ és una veueta que ens diu "ep, t’has desviat una mica; prova de tirar per aquí". I aquesta veueta no és pas nova: ja al segle XVII, Leibniz va formular el mètode de la cadena, que és la pedra angular de com propaguem errors enrere. Dos segles més tard, el 1962, Frank Rosenblatt va descriure com una xarxa de perceptrons podria ajustar-se si sabíem de quina manera els errors havien de tornar enrere per corregir-se. Més tard, Seppo Linnainmaa va donar la forma matemàtica definitiva amb el que avui coneixem com a "diferenciació automàtica". Però no va ser fins el 1986 que en Rumelhart, Hinton i Williams van demostrar la seva utilitat pràctica a l'article [Learning Representations by Back-Propagating Errors](https://www.iro.umontreal.ca/~vincentp/ift3395/lectures/backprop_old.pdf).

---

Dos nens juguen a tirar a cistella.

El primer falla un tir. El seu entrenador li diu: "Massa curt. Torna-ho a provar. Massa fort. Torna-ho a provar". És un bucle senzill: error, petit feedback, ajust.

L’altre nen falla… i el seu entrenador diu: "D’acord, primer necessitem parlar de la trajectòria parabòlica, la gravetat, la rotació de la pilota…". I de sobte hi ha un projector, gràfics en 3D i un PowerPoint titulat ‘Introducció a la mecànica de fluids per a nens de 8 anys que només volien jugar a bàsquet’. Quan el nen torna a tirar, ja és de nit i el pavelló està tancat.

La retropropagació és com el primer cas: instruccions simples, locals i immediates. No calen gaires romanços: només repetir, ajustar, repetir.

Ah, i per cert: el primer era en Steph Curry. El segon… encara està buscant el compàs i l'escaire.

---

## Intuïció bàsica

Podem veure una xarxa neuronal com una **composició de funcions**. Les entrades passen per capes, cada capa fa una transformació lineal (`Wx + b`) i aplica una funció d’activació. Al final, obtenim una sortida i mesurem l’error amb una funció de pèrdua (*loss*).

L’objectiu és **ajustar els pesos i biaixos** perquè la sortida de la xarxa s’apropi el màxim possible al valor real. Per fer-ho, necessitem el gradient de la funció de pèrdua respecte cada paràmetre, i això és exactament el que fa el backpropagation.

### Experimenta-ho tu mateix

Mira la demo interactiva més avall: juga amb les entrades, pesos i taxa d’aprenentatge i observa com canvien la *loss* i les activacions.

---

## Matemàtiques del backpropagation

Imaginem una xarxa senzilla de **dues capes**:

- Entrada: $\mathbf{x}$
- Capa oculta: $z^{[1]} = W^{[1]} \mathbf{x} + b^{[1]}$, $a^{[1]} = \sigma(z^{[1]})$
- Sortida: $z^{[2]} = W^{[2]} a^{[1]} + b^{[2]}$, $\hat{y} = a^{[2]} = \sigma(z^{[2]})$

Amb una funció de pèrdua $L(\hat{y}, y)$.

### Pas 1: Derivades a la sortida
Calculem l’error de la sortida:
$$
\delta^{[2]} = \frac{\partial L}{\partial z^{[2]}}
= (\hat{y} - y) \cdot \sigma'(z^{[2]})
$$

### Pas 2: Retropropagació a la capa oculta
L’error es propaga enrere:
$$
\delta^{[1]} = \left( (W^{[2]})^T \delta^{[2]} \right) \cdot \sigma'(z^{[1]})
$$

### Pas 3: Gradients dels pesos i biaixos
Un cop tenim els $\delta$, els gradients són directes:
$$
\frac{\partial L}{\partial W^{[2]}} = \delta^{[2]} (a^{[1]})^T
$$

$$
\frac{\partial L}{\partial b^{[2]}} = \delta^{[2]}
$$

$$
\frac{\partial L}{\partial W^{[1]}} = \delta^{[1]} \mathbf{x}^T
$$

$$
\frac{\partial L}{\partial b^{[1]}} = \delta^{[1]}
$$

### Pas 4: Actualització dels pesos
Amb gradient descent:
$$
W^{[l]} \leftarrow W^{[l]} - \eta \frac{\partial L}{\partial W^{[l]}}
$$
$$
b^{[l]} \leftarrow b^{[l]} - \eta \frac{\partial L}{\partial b^{[l]}}
$$

on $\eta$ és la taxa d’aprenentatge (*learning rate*).

---

## Implementació en Python

Aquí tens una implementació mínima d’una xarxa de 2 capes amb `numpy`:

```python
import numpy as np

# Funcions d'activació i derivades
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def sigmoid_deriv(z):
    return sigmoid(z) * (1 - sigmoid(z))

# Inicialització de pesos
np.random.seed(42)
W1 = np.random.randn(2, 2)
b1 = np.zeros((2, 1))
W2 = np.random.randn(1, 2)
b2 = np.zeros((1, 1))

# Dades d'entrenament (XOR)
X = np.array([[0,0,1,1],[0,1,0,1]])  # entrades
Y = np.array([[0,1,1,0]])            # sortides reals

# Paràmetres
lr = 0.1
epochs = 10000

# Entrenament
for i in range(epochs):
    # Forward pass
    Z1 = np.dot(W1, X) + b1
    A1 = sigmoid(Z1)
    Z2 = np.dot(W2, A1) + b2
    A2 = sigmoid(Z2)

    # Càlcul de l'error
    m = X.shape[1]
    loss = np.mean((A2 - Y) ** 2)

    # Backpropagation
    dZ2 = (A2 - Y) * sigmoid_deriv(Z2)
    dW2 = (1/m) * np.dot(dZ2, A1.T)
    db2 = (1/m) * np.sum(dZ2, axis=1, keepdims=True)

    dZ1 = np.dot(W2.T, dZ2) * sigmoid_deriv(Z1)
    dW1 = (1/m) * np.dot(dZ1, X.T)
    db1 = (1/m) * np.sum(dZ1, axis=1, keepdims=True)

    # Actualització
    W1 -= lr * dW1
    b1 -= lr * db1
    W2 -= lr * dW2
    b2 -= lr * db2

    if i % 1000 == 0:
        print(f"Epoch {i}, Loss: {loss:.4f}")

# Resultats finals
print("Sortida final:")
print(A2)
```

## Conclusions
- El backpropagation és simplement **càlcul de gradients mitjançant la regla de la cadena**.
- Un cop entès en una xarxa petita, es pot generalitzar fàcilment a moltes capes.
- Hi ha molts frameworks que abstrauen el backpropagation, com TensorFlow o PyTorch, facilitant la implementació de xarxes neuronals complexes.