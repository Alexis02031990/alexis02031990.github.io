/**
 * PDF Export Utility - Direct Download Version
 * Handles CV export to PDF with guaranteed file download
 */

(function() {
    'use strict';

    /**
     * Method 1: Use html2pdf library to generate and download PDF directly
     * This is the MAIN METHOD - should download PDF automatically
     */
    async function generatePdfDirectDownload() {
        try {
            console.log('📄 Génération du PDF et téléchargement en cours...');
            
            if (typeof html2pdf === 'undefined') {
                throw new Error('html2pdf non disponible');
            }
            
            // Fetch the optimized CV
            const response = await fetch('CV_PRINT_OPTIMAL.html');
            if (!response.ok) {
                throw new Error('Impossible de charger le CV optimisé');
            }
            
            const htmlContent = await response.text();
            
            // Create a temporary div to hold the content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            tempDiv.style.display = 'none';
            document.body.appendChild(tempDiv);
            
            // Extract just the body content
            const bodyContent = tempDiv.querySelector('body');
            if (!bodyContent) {
                throw new Error('Impossible de extraire le contenu du CV');
            }
            
            // PDF configuration optimized for direct download
            const pdfConfig = {
                margin: 10,
                filename: 'CV_Alexis_NGUEFACK.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    logging: false,
                    letterRendering: true,
                    allowTaint: true,
                    foreignObjectRendering: true,
                    windowHeight: 1200
                },
                jsPDF: { 
                    orientation: 'portrait', 
                    unit: 'mm', 
                    format: 'a4',
                    compress: true
                },
                pagebreak: { 
                    mode: ['avoid-all', 'css', 'legacy'],
                    before: '.page-break-before',
                    after: '.page-break-after',
                    avoid: ['tr', 'td', '.no-break'],
                    margin: [0, 0, 0, 0]
                }
            };
            
            console.log('⏳ Rendu du PDF en cours (cela peut prendre quelques secondes)...');
            
            // Generate and download PDF
            // .save() triggers automatic download in browser
            await html2pdf().set(pdfConfig).from(bodyContent).save();
            
            console.log('✅ PDF téléchargé avec succès!');
            
            // Cleanup
            setTimeout(() => {
                document.body.removeChild(tempDiv);
            }, 500);
            
            return true;
            
        } catch (error) {
            console.error('❌ Erreur lors de la génération du PDF:', error.message);
            console.log('💡 Essai de la méthode de secours...');
            return false;
        }
    }

    /**
     * Method 2: Fallback - Create a downloadable PDF via print-to-PDF
     * Opens the CV in a new window for user to print/save as PDF
     */
    async function downloadViaFallback() {
        try {
            console.log('🖨️  Ouverture du CV pour téléchargement/impression...');
            
            const pdfWindow = window.open('CV_PRINT_OPTIMAL.html', '_blank');
            
            if (!pdfWindow) {
                throw new Error('Impossible d\'ouvrir le CV');
            }
            
            pdfWindow.onload = function() {
                setTimeout(() => {
                    // Show alert with instructions
                    pdfWindow.alert(
                        '📋 Le CV s\'est ouvert dans une nouvelle fenêtre\n\n' +
                        '👉 Pour télécharger le PDF:\n' +
                        '1. Appuyez sur Ctrl+P (ou ⌘+P sur Mac)\n' +
                        '2. Sélectionnez "Enregistrer en PDF"\n' +
                        '3. Cliquez sur "Enregistrer"\n\n' +
                        '✅ Votre CV sera téléchargé!'
                    );
                }, 500);
            };
            
            console.log('✅ CV ouvert pour téléchargement');
            return true;
            
        } catch (error) {
            console.error('❌ Erreur fallback:', error.message);
            return false;
        }
    }

    /**
     * Main export handler with fallback chain
     */
    async function handlePdfExport() {
        const downloadPdfBtn = document.getElementById('download-pdf');
        
        if (!downloadPdfBtn) {
            console.error('❌ Bouton PDF non trouvé');
            return;
        }
        
        // Show loading state
        const originalText = downloadPdfBtn.textContent;
        const originalHTML = downloadPdfBtn.innerHTML;
        downloadPdfBtn.disabled = true;
        downloadPdfBtn.innerHTML = '<i class="bi bi-download me-2"></i>⏳ Téléchargement...';
        
        try {
            console.log('🔵 Export PDF lancé');
            
            // Method 1: Try direct PDF download with html2pdf
            if (typeof html2pdf !== 'undefined') {
                console.log('✅ html2pdf disponible, tentative de téléchargement direct...');
                const success = await generatePdfDirectDownload();
                
                if (success) {
                    downloadPdfBtn.innerHTML = '<i class="bi bi-download me-2"></i>✅ Téléchargé!';
                    setTimeout(() => {
                        downloadPdfBtn.innerHTML = originalHTML;
                        downloadPdfBtn.disabled = false;
                    }, 2000);
                    return;
                }
            }
            
            // Fallback: Use print method
            console.log('💾 Basculement sur la méthode de fallback...');
            await downloadViaFallback();
            
            downloadPdfBtn.innerHTML = '<i class="bi bi-download me-2"></i>📋 Vérifiez votre navigateur';
            setTimeout(() => {
                downloadPdfBtn.innerHTML = originalHTML;
                downloadPdfBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert('⚠️ Erreur lors du téléchargement du PDF.\n\nUtilisez plutôt la version Word qui est garantie de fonctionner!');
            downloadPdfBtn.innerHTML = originalHTML;
            downloadPdfBtn.disabled = false;
        }
    }

    /**
     * Initialize PDF export handlers
     */
    function init() {
        const downloadPdfBtn = document.getElementById('download-pdf');
        
        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handlePdfExport();
            });
            
            console.log('✅ Handler PDF initialisé et prêt');
        } else {
            console.error('❌ Bouton PDF non trouvé');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose functions for external access
    window.pdfExport = {
        downloadPdf: generatePdfDirectDownload,
        downloadFallback: downloadViaFallback
    };

})();
