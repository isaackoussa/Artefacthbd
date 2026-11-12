# 🤍 Site d'anniversaire

Page animée pour souhaiter un joyeux anniversaire à une amie battante, courageuse et inspirante.

## ✏️ Personnaliser
Ouvre `script.js` et modifie le bloc `CONFIG` tout en haut :
- `prenom` : le prénom de ton amie
- `message` : le texte de la lettre (les `\n` font des retours à la ligne)

Astuce : tu peux aussi mettre le prénom dans le lien → `https://ton-site.netlify.app/?prenom=Sarah`

## 🚀 Mettre en ligne sur Netlify
**Option 1 — Glisser-déposer (le plus simple)**
1. Va sur https://app.netlify.com/drop
2. Glisse le dossier contenant `index.html`, `style.css`, `script.js`, `favicon.svg`, `netlify.toml`, `_redirects`
3. C'est en ligne ! Tu peux changer le nom du site dans *Site configuration → Change site name*

**Option 2 — Depuis GitHub**
1. Netlify → *Add new site → Import an existing project → GitHub*
2. Choisis ce dépôt
3. Build command : *(vide)* — Publish directory : `.`
4. *Deploy* 🎉

## 📁 Fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `style.css` | Couleurs et animations |
| `script.js` | Confettis, emojis flottants, lettre, bougies + **personnalisation** |
| `netlify.toml` / `_redirects` | Configuration Netlify |
| `favicon.svg` | Petite icône 🤍 de l'onglet |
