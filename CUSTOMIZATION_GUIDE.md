# 🎨 Guide de Personnalisation du Design

## 📝 Comment Personnaliser Votre Portfolio

Le nouveau système CSS utilise des **variables CSS** pour faciliter la personnalisation. Vous pouvez maintenant changer l'apparence de tout votre portfolio en modifiant simplement quelques lignes de code !

---

## 🎯 Modifier les Couleurs Principales

Ouvrez le fichier `css/styles-enhanced.css` et cherchez la section `:root { ... }` au début du fichier.

### Exemple : Changer la couleur primaire

**Avant :**
```css
:root {
  --primary-color: #0f3460;      /* Bleu marine actuel */
  ...
}
```

**Après :**
```css
:root {
  --primary-color: #2c3e50;      /* Un bleu plus foncé */
  ...
}
```

### Couleurs recommandées par style :

#### 🔵 Style Bleu Professionnel (défaut)
```css
--primary-color: #0f3460;
--secondary-color: #e94560;
--accent-color: #16c784;
```

#### 🟣 Style Violet Premium
```css
--primary-color: #5e3fb5;
--secondary-color: #ff6b6b;
--accent-color: #a78bfa;
```

#### 🟢 Style Vert Écologique
```css
--primary-color: #047857;
--secondary-color: #dc2626;
--accent-color: #10b981;
```

#### 🟠 Style Orange Chaleureux
```css
--primary-color: #d97706;
--secondary-color: #0ea5e9;
--accent-color: #f59e0b;
```

#### 🔴 Style Rouge Dynamique
```css
--primary-color: #991b1b;
--secondary-color: #3b82f6;
--accent-color: #ef4444;
```

---

## 🌈 Modifier les Dégradés

Les dégradés sont définis comme suit :

```css
--gradient-primary: linear-gradient(135deg, #0f3460 0%, #533483 100%);
--gradient-accent: linear-gradient(135deg, #16c784 0%, #0f3460 100%);
```

Vous pouvez les personnaliser :

**Dégradé de gauche à droite :**
```css
--gradient-primary: linear-gradient(90deg, #0f3460 0%, #533483 100%);
```

**Dégradé radial (circulaire) :**
```css
--gradient-accent: radial-gradient(circle, #16c784 0%, #0f3460 100%);
```

---

## 📏 Modifier les Espacements

Les variables d'espacement contrôlent les marges et le padding :

```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-2xl: 3rem;
```

Pour augmenter tous les espacements :

```css
--spacing-md: 1.5rem;    /* Au lieu de 1rem */
--spacing-lg: 2rem;      /* Au lieu de 1.5rem */
```

---

## 🌙 Modifier les Ombres

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
--shadow-hover: 0 12px 32px rgba(0, 0, 0, 0.20);
```

**Pour des ombres plus légères :**
```css
--shadow-md: 0 2px 6px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.1);
```

**Pour des ombres plus prononcées :**
```css
--shadow-md: 0 8px 20px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 12px 30px rgba(0, 0, 0, 0.2);
```

---

## 🎲 Modifier les Rayons des Coins

Les cartes utilisent `border-radius: 15px`. Vous pouvez le changer :

**Pour des coins plus arrondis :**
```css
.card {
  border-radius: 25px !important;    /* Au lieu de 15px */
}
```

**Pour des coins plus aigus :**
```css
.card {
  border-radius: 8px !important;     /* Au lieu de 15px */
}
```

---

## ⚡ Modifier les Animations

### Animation d'entrée de la photo de profil

```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);  /* Modifier la distance */
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Plus d'entrée (90px au lieu de 50px) :**
```css
transform: translateX(-90px);
```

### Animation de survol des cartes

La vitesse est contrôlée par `.card:hover { animation: ... 0.3s ... }`. Modifiez `0.3s` pour ralentir/accélérer :

```css
.card:hover {
  transform: translateY(-8px);
  /* 0.3s est la durée - 0.5s pour ralentir, 0.1s pour accélérer */
}
```

---

## 🖼️ Modifier la Navbar

### Couleur de fond de la navbar
```css
.navbar {
  background: white !important;    /* Changer le fond */
  box-shadow: var(--shadow-md);
}
```

**Pour un fond de couleur :**
```css
.navbar {
  background: #0f3460 !important;  /* Bleu foncé */
  box-shadow: var(--shadow-lg);
}
```

**Pour un dégradé :**
```css
.navbar {
  background: var(--gradient-primary) !important;
}
```

---

## 🏷️ Modifier les Badges

### Augmenter la taille des badges

```css
.badge {
  font-size: 0.95rem !important;    /* Au lieu de 0.85rem */
  padding: 0.65rem 1.2rem !important;  /* Au lieu de 0.5rem 1rem */
}
```

### Changer la forme (moins arrondie)

```css
.badge {
  border-radius: 25px !important;   /* Au lieu de 50px */
}
```

---

## 🔘 Modifier les Boutons

### Augmenter la taille des boutons

```css
.btn {
  padding: 1rem 2.5rem !important;  /* Au lieu de 0.75rem 2rem */
  font-size: 1rem;                   /* Au lieu de 0.9rem */
}
```

### Changer la couleur du bouton primaire

```css
.btn-primary {
  background: #2c3e50 !important;   /* Nouvelle couleur */
}
```

---

## 🎨 Ajouter Rapidement une Nouvelle Couleur d'Accent

Si vous voulez ajouter une quatrième couleur d'accent :

1. Ouvrez `css/styles-enhanced.css`
2. Dans la section `:root`, ajoutez :

```css
:root {
  /* ... couleurs existantes ... */
  --accent-color-2: #ff6b35;        /* Nouvelle couleur */
}
```

3. Utilisez-la dans vos styles :

```css
.mon-element {
  color: var(--accent-color-2);
  background: var(--accent-color-2);
}
```

---

## 📱 Responsive Design (Mobile/Tablette)

Le CSS amélioré inclut déjà des media queries. Vous pouvez les modifier :

```css
@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem !important;    /* Réduire le padding sur mobile */
  }
  
  h2 {
    font-size: 1.5rem !important;  /* Réduire la taille du titre */
  }
}
```

---

## 🌙 Activer Complètement le Mode Sombre

Le CSS inclut une section mode sombre. Pour le rendre obligatoire au lieu d'optionnel :

Remplacez :
```css
@media (prefers-color-scheme: dark) {
```

Par :
```css
/* Activer le mode sombre pour tout le monde */
html.dark-mode {
```

Puis ajoutez une classe `dark-mode` à l'élément `<html>` dans vos fichiers HTML.

---

## 💾 Exporter Votre Thème Personnalisé

Après personnalisation, vous pouvez créer un fichier de thème séparé :

1. Créez `css/theme-custom.css`
2. Copiez uniquement vos variables CSS personnalisées :

```css
/* Ma personnalisation de thème */
:root {
  --primary-color: #5e3fb5;
  --secondary-color: #ff6b6b;
  --accent-color: #a78bfa;
  --gradient-primary: linear-gradient(135deg, #5e3fb5 0%, #a78bfa 100%);
  --gradient-accent: linear-gradient(135deg, #a78bfa 0%, #5e3fb5 100%);
}
```

3. Incluez-le après `styles-enhanced.css` dans vos fichiers HTML :

```html
<link href="css/styles.css" rel="stylesheet" />
<link href="css/styles-enhanced.css" rel="stylesheet" />
<link href="css/theme-custom.css" rel="stylesheet" />
```

---

## 🚀 Conseils Avancés

### 1. Utiliser les Dégradés de Texte

```css
.mon-titre {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 2. Créer un Effet "Glow" (Lueur)

```css
.mon-element {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);  /* Vert avec lueur */
}
```

### 3. Animer une Transition de Couleur

```css
.mon-element {
  background: var(--primary-color);
  transition: background 0.5s ease;
}

.mon-element:hover {
  background: var(--secondary-color);
}
```

---

## ✅ Checklist de Personnalisation

- [ ] Modifier les couleurs principales
- [ ] Ajuster les dégradés
- [ ] Personnaliser les ombres
- [ ] Modifier les animations
- [ ] Tester sur mobile
- [ ] Vérifier le contraste des couleurs (accessibilité)
- [ ] Exporter le thème personnalisé
- [ ] Partager le portfolio avec le nouveau design !

---

## 🆘 Besoin d'Aide ?

Si quelque chose ne fonctionne pas :

1. Vérifiez que vous modifiez le bon fichier : `css/styles-enhanced.css`
2. Assurez-vous que le fichier HTML inclut le lien CSS
3. Rafraîchissez le navigateur (Ctrl+Shift+R pour vider le cache)
4. Vérifiez la syntaxe CSS (pas de point-virgule oublié)
5. Ouvrez les outils de développement (F12) pour voir les erreurs

---

**Bon design ! 🎨**
