# 🎯 Guide d'Accès aux Améliorations du Portfolio

## 🚀 Démarrer le Serveur Local

```bash
# 1. Ouvrir PowerShell ou Command Prompt
# 2. Accéder au dossier du projet
cd C:\Users\ADMIN\Desktop\alexis02031990.github.io

# 3. Démarrer le serveur Node.js
node server.js

# La console affichera : "Server running at http://localhost:8000/"
```

## 🌐 Accéder aux Pages

### Page d'Accueil
👉 http://localhost:8000/index.html

### Page CV (PRINCIPAL)
👉 http://localhost:8000/resume.html

**À vérifier** :
- ✅ Titre avec gradient "Mon CV"
- ✅ Badge vert "Actuellement en CDI chez Toyota"
- ✅ Noms d'entreprises en couleurs distinctes
- ✅ Logos des entreprises visibles
- ✅ Bordures colorées à gauche des cartes
- ✅ Effets au survol des cartes

### Page Contact
👉 http://localhost:8000/contact.html

**À vérifier** :
- ✅ Formulaire avec tous les champs
- ✅ Champ "Numéro de téléphone"
- ✅ Bouton "Envoyer" fonctionnel

### Projets
👉 http://localhost:8000/projects.html

## 📋 Éléments à Vérifier

### 1️⃣ Badge Statut Professionnel
```
Localisation : resume.html, sous le titre "Mon CV"
Affichage : Badge vert avec icône ✓
Texte : "Actuellement en CDI chez Toyota"
Couleur : Vert (#198754)
```

### 2️⃣ Noms d'Entreprises Colorés

**Toyota Material Handling Manufacturing**
- Couleur : Rouge vif (#eb0a1e)
- Gradient : Rouge → Rouge foncé
- Logo : Toyota
- Bordure gauche : Rouge 5px

**NOTOS**
- Couleur : Bleu profond (#0066cc)
- Gradient : Bleu clair → Bleu foncé
- Logo : NOTOS
- Bordure gauche : Bleu 5px

**OPEN GROUPE**
- Couleur : Orange (#ff6b35)
- Gradient : Orange clair → Orange foncé
- Logo : OPEN
- Bordure gauche : Orange 5px

**ORANGE France**
- Couleur : Orange (#ff6600)
- Gradient : Orange clair → Orange foncé
- Logo : ORANGE
- Bordure gauche : Orange 5px

### 3️⃣ Logos des Entreprises
```
Position : À droite du titre de l'entreprise
Taille : 60px de hauteur
Responsive : 50px sur mobile
Effet : Zoom 1.1x au survol
Ombre : Visible et discrète
```

**Logos présents** :
- ✅ logo-toyota.jpg
- ✅ logo-notos.png
- ✅ logo-open.png
- ✅ logo-orange.png

### 4️⃣ Numéro de Téléphone
```
Localisation : Navbar (en haut à droite)
Affichage : Visible sur desktop (d-none d-lg-flex)
Numéro : 07 50 09 02 35
Icône : Téléphone dans un badge coloré
```

### 5️⃣ Formulaire de Contact Complet
```
Champs :
1. Nom complet (required)
2. Email (required)
3. Numéro de téléphone (required) - NOUVEAU
4. Message (required)

Bouton : "Envoyer"
Feedback : Messages de succès/erreur
```

## 🎨 Vérifications Visuelles

### Desktop View (1280px+)
1. Ouvrir http://localhost:8000/resume.html
2. Vérifier que :
   - Les noms d'entreprises sont colorés
   - Les logos sont visibles et bien positionnés
   - Le numéro de téléphone est dans la navbar
   - Les hover effects fonctionnent (card élévation, logo zoom)
   - Le badge statut est vert

### Mobile View (< 768px)
1. Redimensionner la fenêtre ou utiliser DevTools (F12)
2. Passer en mode mobile (Ctrl+Shift+M)
3. Vérifier que :
   - Les logos sont redimensionnés (50px)
   - Le numéro de téléphone est caché
   - Le navbar collapse fonctionne
   - Pas de débordement horizontal
   - Les couleurs sont toujours visibles

### Formulaire Contact
1. Aller sur http://localhost:8000/contact.html
2. Remplir tous les champs :
   - Nom : "Jean Dupont"
   - Email : "jean@example.com"
   - Téléphone : "0750090235"
   - Message : "Test message"
3. Cliquer sur "Envoyer"
4. Vérifier le feedback (succès ou erreur)

## 🛠️ Outils pour Vérifier

### 1. DevTools (F12)
- **Console** : Vérifier qu'il n'y a pas d'erreurs
- **Network** : Vérifier que les ressources se chargent
- **Elements** : Inspecter les éléments HTML
- **Styles** : Vérifier les CSS appliqués

### 2. Lighthouse (dans DevTools)
- Générer un rapport de performance
- Vérifier l'accessibilité
- Vérifier les bonnes pratiques

### 3. Mobile Responsiveness
- Redimensionner la fenêtre
- Utiliser le mode mobile de DevTools
- Tester sur différentes résolutions

## 📊 Résumé des Changements

| Élément | Avant | Après |
|---------|-------|-------|
| Noms entreprises | Noir/blanc | Couleurs distinctes |
| Logos | Pas visibles | Visibles et interactifs |
| Badge statut | N/A | Vert avec icône ✓ |
| Numéro téléphone | Navbar uniquement | Navbar + Formulaire |
| Hover effects | Basique | Avancés (zoom, ombre) |
| Responsive | Basique | Complet (3 breakpoints) |
| Design | Générique | Professionnel et moderne |

## 🐛 Dépannage Rapide

### "Le serveur ne répond pas"
```powershell
# Vérifier que le port 8000 est libre
netstat -ano | findstr :8000

# Si occupé, terminer le processus
taskkill /PID <PID> /F

# Redémarrer le serveur
node server.js
```

### "Les logos ne s'affichent pas"
```
1. Vérifier que les fichiers existent :
   - C:\Users\ADMIN\Desktop\alexis02031990.github.io\assets\logo-*.{jpg,png}
   
2. Ouvrir DevTools (F12) → Network
   
3. Chercher les requêtes GET pour les logos
   
4. Si 404 erreur, vérifier les chemins HTML
```

### "Les couleurs ne s'affichent pas"
```
1. Ouvrir DevTools (F12) → Console
   
2. Chercher des erreurs de CSS
   
3. Vérifier que company-styles.css est lié dans le <head>
   
4. Faire Ctrl+Maj+R (Hard Refresh)
```

## ✅ Checklist Finale

Avant de déployer, vérifier :
- [ ] Serveur fonctionne (http://localhost:8000)
- [ ] Page CV affiche les couleurs correctement
- [ ] Logos sont visibles et interactifs
- [ ] Badge statut est affiché
- [ ] Numéro de téléphone est dans la navbar
- [ ] Formulaire contact a le champ téléphone
- [ ] Responsive design fonctionne (testez sur mobile)
- [ ] Pas d'erreurs dans la console DevTools
- [ ] Tous les liens de navigation fonctionnent

## 📞 Informations de Contact

- **Téléphone** : 07 50 09 02 35
- **Poste** : Ingénieur support et développement AS/400
- **Entreprise actuelle** : Toyota Material Handling Manufacturing
- **Localisation** : Ancenis-Saint-Géréon

---

**Bon portfolio à vous !** 🎉

Pour toute question, vérifiez la documentation dans les fichiers :
- `PORTFOLIO_IMPROVEMENTS_COMPLETE.md` - Détails complets
- `VERIFICATION_CHECKLIST_FINAL.md` - Checklist de vérification
- `css/company-styles.css` - Code CSS des améliorations
