# Portail des membres — ASC LATDIOR

Un mini-portail membre : connexion, tableau de bord, suivi des cotisations et des présences, panneau bureau. Construit en HTML/JS pur avec Firebase comme backend (gratuit).

## Fichiers

- `index.html` — page de connexion / création de compte
- `dashboard.html` — espace membre (statut cotisation, présences, messages)
- `admin.html` — panneau réservé au bureau (liste des membres, cotisations, présences)
- `firebase-config.js` — tes identifiants Firebase (à remplir, voir ci-dessous)
- `style.css` — le design

## Étape 1 — Créer le projet Firebase (10 min, gratuit)

1. Va sur [console.firebase.google.com](https://console.firebase.google.com)
2. Clique **"Ajouter un projet"**, nomme-le par exemple `asc-latdior`
3. Une fois créé, clique l'icône **`</>`** (Web) pour ajouter une app web
4. Donne-lui un nom (ex: "Portail membres"), pas besoin de cocher "Hosting"
5. Firebase t'affiche un bloc `firebaseConfig = {...}` — **copie ces valeurs**
6. Colle-les dans `firebase-config.js` à la place de `"REMPLACE_MOI"`

## Étape 2 — Activer l'authentification

1. Dans le menu de gauche : **Build → Authentication**
2. Onglet **Sign-in method** → active **"E-mail/Mot de passe"**

## Étape 3 — Activer la base de données

1. Menu de gauche : **Build → Firestore Database**
2. **Créer une base de données** → mode **production**
3. Une fois créée, va dans l'onglet **Règles** et remplace par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /membres/{memberId} {
      allow read, write: if request.auth != null && request.auth.uid == memberId;
      allow read: if request.auth != null; // le bureau doit pouvoir lister tout le monde
      match /presences/{presenceId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null;
      }
    }
  }
}
```

(Ces règles sont volontairement simples pour démarrer. Une fois que le site tourne bien, on pourra les resserrer pour que seul le bureau puisse écrire.)

## Étape 4 — Créer ton premier compte admin

1. Ouvre `index.html` dans ton navigateur, crée un compte normalement
2. Dans Firebase Console → **Firestore Database**, trouve ta fiche dans la collection `membres`
3. Change manuellement le champ `role` de `"membre"` à `"admin"`
4. Reconnecte-toi : tu verras apparaître le lien vers le panneau du bureau

## Étape 5 — Héberger le site

Le plus simple pour toi, vu ton expérience avec Safar/GitHub Pages :

1. Crée un nouveau dépôt GitHub (ex: `asc-latdior-portail`)
2. Mets-y ces 5 fichiers
3. Dans les paramètres du dépôt → **Pages** → active GitHub Pages sur la branche `main`
4. Ton site sera accessible à `https://tonpseudo.github.io/asc-latdior-portail/`

## Ce qui manque encore (à faire évoluer plus tard)

- Un vrai système pour que le bureau **ajoute** un nouveau membre directement (pour l'instant, chaque membre crée son propre compte)
- Un montant de cotisation configurable (pour l'instant c'est juste "payé / pas payé")
- Des vraies notifications/messages envoyés par le bureau
- Export des données en Excel pour tes archives ASC LATDIOR
