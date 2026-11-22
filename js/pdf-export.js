/**
 * PDF Export Utility
 * Handles CV export to PDF with proper formatting and visibility
 */

(function() {
    'use strict';

    /**
     * Method 1: Use print-to-PDF with optimized document
     */
    function printToPdf() {
        try {
            console.log('🖨️  Ouverture du document optimisé pour PDF...');
            const pdfWindow = window.open('CV_PRINT_OPTIMAL.html', '_blank');
            
            if (!pdfWindow) {
                throw new Error('Impossible d\'ouvrir la fenêtre d\'impression');
            }
            
            pdfWindow.onload = function() {
                setTimeout(() => {
                    console.log('✅ Document chargé, ouverture du dialogue d\'impression');
                    pdfWindow.print();
                }, 500);
            };
            
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert(error.message);
        }
    }

    /**
     * Method 2: Use html2pdf library with optimized settings
     */
    async function generatePdfWithHtml2Pdf() {
        try {
            console.log('📄 Génération du PDF avec html2pdf...');
            
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
            
            // PDF configuration
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
            
            // Generate PDF
            await html2pdf().set(pdfConfig).from(bodyContent).save();
            
            console.log('✅ PDF généré avec succès!');
            
            // Cleanup
            document.body.removeChild(tempDiv);
            
        } catch (error) {
            console.error('❌ Erreur lors de la génération du PDF:', error);
            console.log('💡 Basculement sur la méthode print-to-PDF...');
            printToPdf();
        }
    }

    /**
     * Method 3: Generate PDF from current resume page
     */
    async function generatePdfFromCurrent() {
        try {
            console.log('📄 Génération du PDF à partir de la page actuelle...');
            
            if (typeof html2pdf === 'undefined') {
                throw new Error('html2pdf non disponible');
            }
            
            const element = document.getElementById('experience-content');
            if (!element) {
                throw new Error('Contenu du CV non trouvé');
            }
            
            // Clone the element to avoid modifying the original
            const clonedElement = element.cloneNode(true);
            
            // Hide unnecessary elements
            clonedElement.querySelectorAll('.navbar, footer, .btn, .dropdown').forEach(el => {
                el.style.display = 'none';
            });
            
            const pdfConfig = {
                margin: 10,
                filename: 'CV_Alexis_NGUEFACK.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { 
                    orientation: 'portrait', 
                    unit: 'mm', 
                    format: 'a4'
                }
            };
            
            await html2pdf().set(pdfConfig).from(clonedElement).save();
            
            console.log('✅ PDF généré avec succès!');
            
        } catch (error) {
            console.error('❌ Erreur:', error);
            alert(`Erreur: ${error.message}`);
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
                console.log('🔵 Clic sur PDF détecté');
                
                // Show loading feedback
                const originalText = downloadPdfBtn.textContent;
                downloadPdfBtn.textContent = '⏳ Génération...';
                downloadPdfBtn.disabled = true;
                
                // Try html2pdf first, fallback to print
                if (typeof html2pdf !== 'undefined') {
                    generatePdfWithHtml2Pdf().finally(() => {
                        downloadPdfBtn.textContent = originalText;
                        downloadPdfBtn.disabled = false;
                    });
                } else {
                    console.warn('html2pdf non disponible, utilisation de l\'impression...');
                    printToPdf();
                    downloadPdfBtn.textContent = originalText;
                    downloadPdfBtn.disabled = false;
                }
            });
            
            console.log('✅ Handler PDF initialisé');
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
        generatePdf: generatePdfWithHtml2Pdf,
        printToPdf: printToPdf,
        generateFromCurrent: generatePdfFromCurrent
    };

})();
