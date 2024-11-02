# Trellow - Clone de Trello pour Mobile

## Description
Trellow est une application mobile développée avec React Native et Expo qui permet de gérer des projets de manière visuelle, inspirée de Trello. L'application offre une interface intuitive pour organiser des tâches en tableaux et colonnes.

## Fonctionnalités Principales

### Authentification
- Inscription et connexion avec email/mot de passe
- Confirmation du compte par email
- Protection des données sensibles
- Gestion des erreurs d'authentification

### Gestion des Tableaux
- Création de nouveaux tableaux
- Visualisation de la liste des tableaux
- Modification du nom et de la description
- Suppression des tableaux

### Gestion des Colonnes
- Création de colonnes dans les tableaux
- Réorganisation par glisser-déposer
- Modification du nom
- Suppression des colonnes

### Gestion des Tâches
- Création de tâches avec titre et description
- Ajout d'images multiples
- Définition de priorités et dates limites
- Étiquettes colorées personnalisables
- Déplacement entre colonnes
- Modification et suppression

### Navigation
- Navigation par onglets (Accueil, Tableaux, Profil, Paramètres)
- Navigation par pile pour les détails des tâches
- Navigation fluide entre les tableaux

### Design et Animations
- Interface utilisateur moderne et intuitive
- Animations de glisser-déposer
- Transitions fluides
- Thème cohérent et personnalisé

## Installation
### Cloner le repo ou télécharger le zip
```bash
git clone https://github.com/Nelo0o/trellow.git
```
### Installer les dépendances
```bash
npm install
```
### Lancer l'application
```bash
npm run start
```

## Configuration Requise
- Node.js >= 14
- Expo CLI
- Un appareil mobile ou un émulateur

## Technologies Utilisées
- React Native
- Expo
- Firebase (Authentication, Firestore, Storage)
- React Navigation
- React Native Elements

## Structure du Projet
Le projet suit une architecture modulaire avec séparation des préoccupations :
- `/src/components` : Composants réutilisables
- `/src/screens` : Écrans principaux
- `/src/hooks` : Hooks personnalisés
- `/src/styles` : Styles et thème
- `/src/config` : Configuration de l'application

## Auteur
- Léon Gallet - [@Nelo0o](https://github.com/Nelo0o)
