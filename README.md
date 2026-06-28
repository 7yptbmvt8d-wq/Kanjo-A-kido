# Kanjo Aïkido Isulanu — Site vitrine

Site statique multipage (HTML + CSS, zéro dépendance de build) recréant les
maquettes du handoff. Identité « noir & or », fidèle au logo Kanjo.

## Lancer le site

C'est du HTML statique : ouvrez `index.html` dans un navigateur, ou servez le
dossier pour des chemins propres :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Structure

```
.
├── index.html        # Accueil — hero, esprit Kanjo (感/情), citation, 3 cartes
├── histoire.html     # O-Senseï, les 3 kanji (合·気·道), Tamura Senseï, frise
├── dojo.html         # Pratique, horaires, adresse, adhésion (3 formules)
├── enseignant.html   # Portrait, bio, chiffres-clés, frise parcours, citation
├── stages.html       # Calendrier de la saison
├── equiper.html      # Keikogi / Hakama / Armes
├── galerie.html      # Mosaïque photos
├── contact.html      # Coordonnées, formulaire, carte, CTA essai
├── css/style.css     # Design system + tous les composants
├── js/nav.js         # Menu burger (mobile)
└── assets/           # Logos (voir assets/README.md)
```

Le **header** (nav collante) et le **footer** (dojos partenaires + barre) sont
répétés dans chaque page. La page courante est surlignée via `class="active"`
sur le lien correspondant (et son équivalent dans le menu mobile).

## Design tokens

Tout est centralisé dans `css/style.css` (variables `:root`) :

| Token | Valeur |
|---|---|
| Or principal | `#c9a24d` |
| Fond | `#131009` · alt `#1a1610` · footer `#0f0c07` |
| Titres | Cinzel · Corps Cormorant Garamond · Labels Space Grotesk |
| Conteneur | `1180px`, padding latéral `32px` |

Polices chargées via Google Fonts dans le `<head>` de chaque page.

## Contenu réel intégré

Les textes, coordonnées, tarifs, enseignant (Sébastien De Raedt, 3ᵉ Dan),
dojos partenaires et liens sociaux proviennent du site existant
(sites.google.com/view/kanjoakido) et sont en place.

## À compléter / fournir

Il reste quelques `[ … ]` et éléments à fournir :

- **Logo** : déposer le vrai logo dans `assets/` (voir `assets/README.md`).
  Les fichiers actuels sont des **placeholders SVG** (le vrai logo est le rond
  noir & or « KANJO AÏKIDO / ISULANU »).
- **Horaires** : jours et heures des cours ados/adultes et enfants (`dojo.html`)
  — non renseignés sur le site source.
- **Photos** : galerie (`galerie.html`), portraits O-Senseï / Tamura
  (`histoire.html`), portrait enseignant (`enseignant.html`), visuels
  équipement (`equiper.html`).
- **Carte** : remplacer le placeholder de `contact.html` par un embed Google Maps
  (adresse : Rue Henri et Robert de Cholet, 49220 Le Lion-d'Angers).
- **Formulaire de contact** : connecter à un service d'envoi ou garder le
  `mailto:kanjo.aikido@gmail.com`.
- **Stages** : le calendrier est indicatif (issu de la maquette) ; ajuster avec
  les vraies dates.

## ⚠️ Identité géographique à confirmer

Le logo porte « ISULANU / Isula di Corsica » (ancrage corse), mais le dojo est
établi au **Lion-d'Angers (Maine-et-Loire)** — l'enseignant a des racines
corses et plusieurs dojos partenaires y sont. L'adresse réelle est utilisée
partout ; à confirmer si la mention « Isula di Corsica » (hero, footer) doit
être conservée telle quelle ou nuancée.
