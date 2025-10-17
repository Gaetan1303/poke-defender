# 🎮 PokéDefender

Un jeu Pokémon développé en TypeScript et Canvas HTML5, basé sur le concept de Space Invaders.

## 🚀 Installation

1. Clone ou télécharge le projet
2. Installe les dépendances :
```bash
   npm install
```

3. Compile le TypeScript :
```bash
   npm run build
```

4. Lance le serveur local :
```bash
   npm start
```

5. Ouvre `http://localhost:8000` dans ton navigateur

## 🎮 Contrôles

- **Q / Flèche Gauche** : Bouger à gauche
- **D / Flèche Droite** : Bouger à droite
- **Espace** : Tirer une attaque Pokémon

## 🎯 Objectif

Défends la Base Pokémon contre les Pokémon sauvages. Chaque ennemi qui touche la base réduit ses PV. Élimine le maximum d'ennemis pour augmenter ton score !

## 🏗️ Architecture

- **GameObject** : Classe abstraite pour tous les objets
- **Player** : Le Pokémon du joueur
- **Missile** : Les attaques
- **EnemyPokemon** : Les ennemis
- **Earth** : La base à protéger
- **PokéDefenderGame** : Gestionnaire principal du jeu

## 📚 Concepts POO utilisés

- **Héritage** : Classes qui héritent de GameObject
- **Encapsulation** : Propriétés privées et publiques
- **Polymorphisme** : Méthodes `draw()` et `update()` différentes
- **Abstraction** : Classe abstraite GameObject