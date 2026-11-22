// CV to Word Export Script
// Utilise docx library pour créer un document Word professionnel

// Données du CV
const cvData = {
    nom: "Alexis NGUEFACK",
    email: "alexis@example.com",
    telephone: "07 50 09 02 35",
    lieu: "Ancenis-Saint-Géréon",
    ouverture: "Ouvert à des missions en freelance ou portage salarial",
    
    experiences: [
        {
            entreprise: "Toyota Material Handling Manufacturing",
            logo: "assets/logo-toyota.jpg",
            poste: "Ingénieur support et développement As/400",
            type: "CDI",
            periode: "Juin 2026 - Présent",
            lieu: "Ancenis-Saint-Géréon",
            contexte: "Développement, maintenance et support applicatif sur environnement IBM i. Participation active aux phases de tests, recettes et mises en production.",
            objectif: "Assurer le développement, la maintenance et le support des applications sur IBM i tout en optimisant les processus et la qualité.",
            mission: "Participer aux tests et à la mise en production des applications sur IBM i/AS400",
            technologies: ["RPG III", "RPG IV", "RPG Free", "CL/CLLE", "DB2 for i", "SQL", "Écrans 5250", "Subfiles"]
        },
        {
            entreprise: "NOTOS",
            logo: "assets/logo-notos.png",
            poste: "Analyste Développeur AS/400 IBM i",
            type: "Stage",
            periode: "Février 2026 - Avril 2026",
            lieu: "Strasbourg",
            contexte: "Formation intensive et pratique en développement sur plateforme IBM i (AS/400), incluant l'apprentissage des technologies RPG, CL, SQL, et les bonnes pratiques.",
            objectif: "Acquérir une expertise en développement AS/400/IBM i et maîtriser les technologies d'entreprise.",
            mission: "Formation en développement AS/400 avec focus sur RPG, CL, et intégration des processus métier",
            technologies: ["RPG", "CL", "SQL", "DB2 for i"]
        },
        {
            entreprise: "Open",
            logo: "assets/logo-open.png",
            poste: "Concepteur Développeur Back-end C#.NET",
            type: "CDI",
            periode: "2023 - 2025",
            lieu: "Strasbourg",
            contexte: "Conception et développement de solutions back-end robustes utilisant C# et .NET",
            objectif: "Concevoir et développer des architectures back-end scalables et performantes",
            mission: "Développement et optimisation des services back-end",
            technologies: ["C#", ".NET", "SQL", "API REST"]
        },
        {
            entreprise: "Orange France",
            logo: "assets/logo-orange.png",
            poste: "Développeur back-end/front-end",
            type: "Stage + CDI",
            periode: "2021 - 2023",
            lieu: "Arcueil",
            contexte: "Réemploi : Application web conçue et développée par la direction Innovation & RSE de Orange Arcueil",
            objectif: "Développer et maintenir des applications web modernes et performantes",
            mission: "Développement full-stack d'applications web",
            technologies: ["JavaScript", "React", "Node.js", "SQL", "MongoDB"]
        }
    ],

    education: [
        {
            ecole: "INEAD",
            logo: "assets/logo-inead.jfif",
            diplome: "Master Européen en Management de Projets Informatiques",
            type: "E-LEARNING",
            periode: "2019 - 2020",
            lieu: "France",
            description: "Programme en ligne développant compétences en gestion de projets informatiques, planification stratégique, gestion de ressources"
        },
        {
            ecole: "Polytechnique de Turin",
            logo: "assets/logo-polito.jfif",
            diplome: "Laurea in Ingegneria Informatica (Licence en Informatique)",
            type: "Diplôme",
            periode: "2014 - 2019",
            lieu: "Turin, Italie",
            description: "Formation d'ingénierie en informatique renforçant compétences en développement logiciel, web, et architecture informatique"
        }
    ],

    formations: [
        {
            titre: "POEI Analyste Développeur AS/400-IBM i",
            ecole: "NOTOS",
            logo: "assets/logo-notos.png",
            periode: "2026",
            lieu: "France",
            description: "Formation intensive AS/400 avec RPG, CL, SQL et outils modernes",
            status: "Terminée le 30 avril"
        }
    ],

    competences: {
        "Langages de Programmation": ["RPG III", "RPG IV", "RPG Free", "C#", "JavaScript", "SQL"],
        "Frameworks & Libraires": [".NET", "React", "Node.js", "Bootstrap"],
        "Bases de Données": ["DB2 for i", "SQL Server", "MongoDB"],
        "Outils & Plateformes": ["IBM i (AS/400)", "Visual Studio", "Git", "Jira"],
        "Compétences Métier": ["Gestion de Projets", "Architecture Logicielle", "Développement Full-Stack"]
    }
};

// Fonction pour télécharger le CV en Word
async function downloadCVAsWord() {
    // Créer un HTML optimisé pour Word
    const htmlContent = generateWordHTML();
    
    // Créer un blob et télécharger
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    
    // Utiliser html2pdf si disponible, sinon créer un document simple
    if (typeof html2pdf !== 'undefined') {
        const opt = {
            margin: 10,
            filename: 'CV_Alexis_NGUEFACK.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };
        html2pdf().set(opt).from(element).save();
    } else {
        // Fallback: télécharger en tant que HTML
        downloadAsHTML();
    }
}

// Générer le HTML pour Word
function generateWordHTML() {
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            * {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            body {
                background: white;
                color: #333;
                line-height: 1.6;
                padding: 20px;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 3px solid #0066cc;
                padding-bottom: 20px;
            }
            .header h1 {
                font-size: 28px;
                color: #0066cc;
                margin-bottom: 5px;
            }
            .contact-info {
                font-size: 12px;
                color: #666;
                margin-top: 10px;
            }
            .contact-info span {
                margin: 0 10px;
            }
            .status-box {
                background: #e8f4f8;
                border-left: 4px solid #0066cc;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .status-box p {
                color: #0066cc;
                font-weight: bold;
                margin: 5px 0;
            }
            section {
                margin-bottom: 25px;
                page-break-inside: avoid;
            }
            section h2 {
                font-size: 18px;
                color: #0066cc;
                border-bottom: 2px solid #0066cc;
                padding-bottom: 10px;
                margin-bottom: 15px;
                margin-top: 20px;
            }
            .entry {
                margin-bottom: 20px;
                page-break-inside: avoid;
                border: 1px solid #e0e0e0;
                padding: 15px;
                border-radius: 4px;
            }
            .entry-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;
            }
            .entry-title {
                font-weight: bold;
                font-size: 14px;
                color: #0066cc;
                margin-bottom: 5px;
            }
            .entry-meta {
                font-size: 12px;
                color: #666;
                margin-bottom: 3px;
            }
            .entry-logo {
                width: 70px;
                height: auto;
                margin-left: 15px;
                text-align: right;
            }
            .entry-logo img {
                max-width: 70px;
                height: auto;
            }
            .entry-content {
                font-size: 12px;
                color: #333;
                line-height: 1.6;
            }
            .entry-content strong {
                color: #0066cc;
            }
            .skills-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-top: 10px;
            }
            .skill-category h4 {
                color: #0066cc;
                font-size: 12px;
                margin-bottom: 8px;
                font-weight: bold;
            }
            .skill-list {
                font-size: 11px;
                color: #333;
                line-height: 1.6;
            }
            .badge {
                display: inline-block;
                background: #f0f0f0;
                color: #333;
                padding: 3px 8px;
                margin: 3px 3px 3px 0;
                border-radius: 3px;
                font-size: 11px;
                border: 1px solid #ddd;
            }
            .page-break {
                page-break-after: always;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${cvData.nom}</h1>
            <div class="contact-info">
                <span>📧 ${cvData.email}</span>
                <span>📱 ${cvData.telephone}</span>
                <span>📍 ${cvData.lieu}</span>
            </div>
        </div>

        <div class="status-box">
            <p>${cvData.ouverture}</p>
        </div>

        <section>
            <h2>Expérience Professionnelle</h2>
    `;

    // Ajouter les expériences
    cvData.experiences.forEach(exp => {
        html += `
            <div class="entry">
                <div class="entry-header">
                    <div style="flex: 1;">
                        <div class="entry-title">${exp.entreprise}</div>
                        <div class="entry-meta">${exp.periode} | ${exp.type}</div>
                        <div class="entry-meta"><strong>${exp.poste}</strong></div>
                        <div class="entry-meta">📍 ${exp.lieu}</div>
                    </div>
                </div>
                <div class="entry-content">
                    <p><strong>Contexte :</strong> ${exp.contexte}</p>
                    <p><strong>Objectif :</strong> ${exp.objectif}</p>
                    <p><strong>Mission :</strong> ${exp.mission}</p>
                    <p><strong>Technologies :</strong></p>
                    <div>
                        ${exp.technologies.map(tech => `<span class="badge">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });

    html += `</section>

        <section>
            <h2>Éducation</h2>
    `;

    // Ajouter l'éducation
    cvData.education.forEach(edu => {
        html += `
            <div class="entry">
                <div class="entry-title">${edu.ecole}</div>
                <div class="entry-meta">${edu.periode} | ${edu.type}</div>
                <div class="entry-meta"><strong>${edu.diplome}</strong></div>
                <div class="entry-meta">📍 ${edu.lieu}</div>
                <div class="entry-content">
                    <p>${edu.description}</p>
                </div>
            </div>
        `;
    });

    html += `</section>

        <section>
            <h2>Formations Complémentaires</h2>
    `;

    // Ajouter les formations
    cvData.formations.forEach(form => {
        html += `
            <div class="entry">
                <div class="entry-title">${form.titre}</div>
                <div class="entry-meta">${form.periode} | ${form.ecole}</div>
                <div class="entry-meta">${form.status}</div>
                <div class="entry-meta">📍 ${form.lieu}</div>
                <div class="entry-content">
                    <p>${form.description}</p>
                </div>
            </div>
        `;
    });

    html += `</section>

        <section>
            <h2>Compétences Techniques</h2>
            <div class="skills-grid">
    `;

    // Ajouter les compétences
    Object.entries(cvData.competences).forEach(([category, skills]) => {
        html += `
            <div class="skill-category">
                <h4>${category}</h4>
                <div class="skill-list">
                    ${skills.map(skill => `<span class="badge">${skill}</span>`).join('')}
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </section>

        <section style="margin-top: 50px; color: #999; font-size: 12px;">
            <p style="text-align: center;">CV généré automatiquement - ${new Date().toLocaleDateString('fr-FR')}</p>
        </section>
    </body>
    </html>
    `;

    return html;
}

// Télécharger en HTML (fallback)
function downloadAsHTML() {
    const htmlContent = generateWordHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_Alexis_NGUEFACK.html';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Initialiser le bouton de téléchargement
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadCVAsWord();
        });
    }
});

// Fonction alternative : Imprimer en PDF
function printCVAsPDF() {
    window.print();
}
