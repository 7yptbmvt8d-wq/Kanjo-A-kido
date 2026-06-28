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

## À compléter avant publication

Les contenus entre `[ … ]` sont des placeholders :

- **Logos** : déposer les vrais visuels dans `assets/` (voir `assets/README.md`).
  Les fichiers actuels sont des **placeholders SVG**.
- **Coordonnées** : email, téléphone, adresse, ville (`dojo.html`, `contact.html`).
- **Horaires & tarifs** : `dojo.html`.
- **Dates de stages** : `stages.html`.
- **Photos** : `galerie.html`, portraits (`histoire.html`, `enseignant.html`),
  visuels équipement (`equiper.html`).
- **Carte** : remplacer le placeholder de `contact.html` par un embed Google Maps.
- **Liens sociaux** : Facebook / WhatsApp (`#` actuellement) dans le footer.
- **Formulaire de contact** : connecter à un service d'envoi ou ajuster le `mailto:`.
- **Villes partenaires** : footer (`[ VILLE A/B/C ]`).

## ⚠️ Incohérence géographique à trancher

La marque « Isulanu » / « Isula di Corsica » suggère un ancrage corse, mais la
bio de l'enseignant mentionne une fondation du dojo au **Lion-d'Angers
(Maine-et-Loire)**. Vérifier l'adresse réelle et harmoniser (adresse, mention
« © Isula di Corsica », ancrage géographique) avant mise en ligne.
