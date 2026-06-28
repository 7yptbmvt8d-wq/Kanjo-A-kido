# Kanjo Aïkido Isulanu — Site + administration

Site vitrine du dojo (Vescovato, Haute-Corse), construit avec **Eleventy**
(générateur de site statique) et éditable via **Decap CMS** (espace `/admin`
avec connexion). Identité « noir & or », fidèle au logo Kanjo.

## Développer en local

```bash
npm install
npm start          # aperçu live sur http://localhost:8080
# ou
npm run build      # génère le site dans _site/
```

## Structure

```
.
├── src/
│   ├── *.njk              # les 8 pages (gabarits)
│   ├── _includes/         # base.njk, nav.njk, footer.njk (partagés)
│   ├── _data/
│   │   ├── site.json      # coordonnées, réseaux, horaires, tarifs, partenaires
│   │   ├── galerie.json   # photos de la galerie
│   │   └── pages/*.json   # textes éditables de chaque page
│   ├── css/ js/ assets/   # statiques (logo, styles, script)
│   └── admin/             # Decap CMS (index.html + config.yml)
├── .eleventy.js           # config du build
├── netlify.toml           # build Netlify (publie _site/)
└── package.json
```

Les **textes, photos et coordonnées** vivent dans `src/_data/` : ce sont eux
que l'éditeur modifie. Les gabarits `.njk` ne changent pas quand on édite le
contenu.

## Administration / édition (Decap CMS)

Une fois le site déployé et la connexion activée, l'édition se fait sur
`https://VOTRE-SITE/admin` :

- **Réglages du site** — coordonnées, réseaux, horaires, tarifs, partenaires.
- **Galerie photos** — ajouter / retirer des photos (téléversement).
- **Textes des pages** — titres, accroches et paragraphes de chaque page.

Les images téléversées vont dans `src/assets/uploads/`.

### Mise en ligne (à faire une fois)

Voir le guide pas à pas fourni séparément. En résumé :
1. Déployer le dépôt sur **Netlify** (build `npm run build`, dossier `_site`).
2. Activer **Netlify Identity** + **Git Gateway** (la connexion de l'admin).
3. S'inviter par email, définir un mot de passe, se connecter sur `/admin`.

> La branche éditée par le CMS est définie dans `src/admin/config.yml`
> (`backend.branch`) — par défaut `main`. Elle doit correspondre à la branche
> déployée sur Netlify.

## À compléter / fournir
- **Logo** : `src/assets/kanji-kanjo.svg` et `logo-square.svg` sont une
  recréation vectorielle fidèle. Pour l'original exact, le téléverser via
  l'admin ou le déposer dans `src/assets/`.
- **Horaires** : à renseigner (Réglages du site).
- **Adresse précise** : la rue du dojo à Vescovato.
- **Photos** : galerie + portraits (O-Senseï, Tamura, enseignant).
- **Carte** : remplacer le placeholder de `contact.njk` par un embed Google Maps.

## Ancrage géographique

Dojo en **Corse, à Vescovato (20215, Haute-Corse)** — cohérent avec la marque
« ISULANU / Isula di Corsica ».
