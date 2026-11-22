(function () {
    'use strict';

    const button = document.getElementById('download-pdf');
    const identity = document.getElementById('cv-identity');
    const content = document.getElementById('experience-content');

    if (!button || !identity || !content) {
        console.error('Les éléments nécessaires à l’export du CV sont introuvables.');
        return;
    }

    button.addEventListener('click', async function () {
        if (button.disabled) return;

        const originalLabel = button.innerHTML;
        const cv = document.createElement('div');
        cv.className = 'pdf-cv';
        const header = identity.cloneNode(true);
        header.removeAttribute('id');
        header.classList.remove('visually-hidden');
        const cvContent = content.cloneNode(true);
        cvContent.removeAttribute('id');
        cv.append(header, cvContent);

        button.disabled = true;
        button.textContent = 'Génération du PDF…';

        try {
            if (typeof html2pdf !== 'function') {
                throw new Error('La bibliothèque de génération PDF n’a pas pu être chargée.');
            }

            const scale = 2;
            await html2pdf().set({
                margin: [10, 10, 10, 10],
                filename: 'CV_Alexis_NGUEFACK.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale, useCORS: true, backgroundColor: '#ffffff' },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
                pagebreak: { mode: ['css', 'legacy'], avoid: ['h1', 'h2', 'h3', '.bg-dark', 'p', 'li', '.section-competences .d-flex'] }
            }).get('pageSize').then(function (pageSize) {
                // Align page-break calculations with the rounded canvas width used by html2pdf.
                const canvasWidth = Math.ceil(pageSize.inner.width * 96 / 25.4) * scale;
                pageSize.inner.px.height = Math.floor(canvasWidth * pageSize.inner.ratio) / scale;
            }).from(cv).save();
        } catch (error) {
            console.error('Erreur lors de la génération du CV PDF :', error);
            alert('Le PDF n’a pas pu être généré. Vérifiez votre connexion et réessayez.');
        } finally {
            button.innerHTML = originalLabel;
            button.disabled = false;
        }
    });
})();
