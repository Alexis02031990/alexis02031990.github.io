(function () {
    'use strict';

    const button = document.getElementById('download-word');
    if (!button) {
        console.error('Le bouton de téléchargement Word/HTML est introuvable.');
        return;
    }

    async function embedImage(image) {
        const response = await fetch(image.src);
        if (!response.ok) {
            throw new Error(`Impossible de charger le logo : ${image.alt}`);
        }

        const blob = await response.blob();
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });
        image.src = dataUrl;
        image.setAttribute('width', '80');
    }

    button.addEventListener('click', async function () {
        if (button.disabled) return;

        const originalLabel = button.innerHTML;
        button.disabled = true;
        button.textContent = 'Génération du CV…';

        try {
            if (!window.cvExport || typeof window.cvExport.createContent !== 'function') {
                throw new Error('Le contenu du CV est indisponible.');
            }

            const cv = window.cvExport.createContent();
            await Promise.all(Array.from(cv.querySelectorAll('img'), embedImage));

            const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>CV Alexis NGUEFACK</title>
<style>
body { font-family: Arial, sans-serif; color: #202b3a; line-height: 1.45; }
.pdf-cv > div:first-child { text-align: center; border-bottom: 2px solid #163b64; }
h1 { color: #163b64; font-size: 24pt; margin-bottom: 4pt; }
h2 { color: #163b64; font-size: 16pt; border-bottom: 1px solid #b8c8d8; margin-top: 20pt; }
h3 { color: #163b64; font-size: 13pt; margin-bottom: 4pt; }
.card { margin-bottom: 18pt; }
.bg-dark { background: #edf2f7; padding: 8pt; }
.logo-right { max-width: 80px; max-height: 50px; }
p { margin: 4pt 0 8pt; }
li { margin-bottom: 3pt; }
.badge { display: inline-block; padding: 2pt 5pt; margin: 2pt; border: 1px solid #ccd7e2; }
</style>
</head>
<body>${cv.outerHTML}</body>
</html>`;
            const blob = new Blob(['\ufeff', html], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'CV_Alexis_NGUEFACK.html';
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 60000);
        } catch (error) {
            console.error('Erreur lors de la génération du CV Word/HTML :', error);
            alert('Le CV Word/HTML n’a pas pu être généré. Vérifiez votre connexion et réessayez.');
        } finally {
            button.innerHTML = originalLabel;
            button.disabled = false;
        }
    });
})();
