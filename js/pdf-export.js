(function () {
    'use strict';

    const button = document.getElementById('download-pdf');
    const identity = document.getElementById('cv-identity');
    const status = document.getElementById('cv-status');
    const content = document.getElementById('experience-content');

    if (!button || !identity || !status || !content) {
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
        const cvStatus = status.cloneNode(true);
        cvStatus.removeAttribute('id');
        const cvContent = content.cloneNode(true);
        cvContent.removeAttribute('id');
        cv.append(header, cvStatus, cvContent);

        button.disabled = true;
        button.textContent = 'Génération du PDF…';

        try {
            if (typeof html2pdf !== 'function') {
                throw new Error('La bibliothèque de génération PDF n’a pas pu être chargée.');
            }

            await html2pdf().set({
                margin: [10, 10, 10, 10],
                filename: 'CV_Alexis_NGUEFACK.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
                pagebreak: { mode: ['css', 'legacy'], avoid: ['h1', 'h2', 'h3', '.bg-dark', 'p', 'li', '.badge'] }
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
