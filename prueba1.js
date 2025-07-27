document.addEventListener('DOMContentLoaded', () => {
    // Datos de ejemplo de los comunicados. En una aplicación real, esto vendría de un servidor.
    const announcements = [
        {
            date: '2025-06-05',
            title: 'Inicio de Matrículas Segundo Semestre 2025',
            content: 'Se informa a la comunidad estudiantil que el proceso de matrículas para el segundo semestre de 2025 iniciará el próximo 15 de junio.'
            
        },
        {
            date: '2025-05-20',
            title: 'Resultados de Becas y Ayudas Financieras',
            content: 'Ya se encuentran disponibles los resultados de la asignación de becas y ayudas financieras para el próximo período académico.'
        },
        {
            date: '2025-05-10',
            title: 'Convocatoria para Proyectos de Investigación',
            content: 'Se abre la convocatoria para la presentación de proyectos de investigación en todas las áreas del conocimiento. Fecha límite: 30 de mayo.'
        },
        {
            date: '2024-11-15',
            title: 'Ceremonia de Graduación 2024',
            content: 'La ceremonia de graduación para la promoción 2024 se llevará a cabo el día 10 de diciembre en el auditorio principal.'
        },
        {
            date: '2024-10-01',
            title: 'Inicio de Clases - Período 2024-2',
            content: 'Les damos la bienvenida al segundo período académico de 2024. Las clases inician el lunes 7 de octubre.'
        },
        {
            date: '2023-08-25',
            title: 'Actualización de Plataforma Virtual',
            content: 'Informamos que la plataforma virtual estará en mantenimiento el día 1 de septiembre de 2:00 a.m. a 5:00 a.m. por actualizaciones de seguridad.'
        }
    ];

    const yearSelect = document.getElementById('year-select');
    const monthList = document.getElementById('month-list');
    const announcementsContainer = document.getElementById('announcements-container');

    let selectedYear = new Date().getFullYear();
    let selectedMonth = 'todos';

    function populateYears() {
        const years = [...new Set(announcements.map(a => new Date(a.date).getFullYear()))];
        years.sort((a, b) => b - a);
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            if (year === selectedYear) {
                option.selected = true;
            }
            yearSelect.appendChild(option);
        });
    }

    function displayAnnouncements() {
        announcementsContainer.innerHTML = '';
        const filteredAnnouncements = announcements
            .filter(announcement => {
                const announcementDate = new Date(announcement.date);
                const yearMatches = announcementDate.getFullYear() == selectedYear;
                const monthMatches = selectedMonth === 'todos' || (announcementDate.getMonth() + 1) == selectedMonth;
                return yearMatches && monthMatches;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filteredAnnouncements.length > 0) {
            filteredAnnouncements.forEach(announcement => {
                const announcementElement = document.createElement('div');
                announcementElement.classList.add('announcement');

                const announcementDate = new Date(announcement.date);
                const formattedDate = announcementDate.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                announcementElement.innerHTML = `
                    <h2>${announcement.title}</h2>
                    <p class="date">${formattedDate}</p>
                    <p>${announcement.content}</p>
                `;
                announcementsContainer.appendChild(announcementElement);
            });
        } else {
            announcementsContainer.innerHTML = '<p>No hay comunicados para el período seleccionado.</p>';
        }
    }

    yearSelect.addEventListener('change', (e) => {
        selectedYear = parseInt(e.target.value);
        displayAnnouncements();
    });

    monthList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            document.querySelector('#month-list li.active').classList.remove('active');
            e.target.classList.add('active');
            selectedMonth = e.target.dataset.month;
            displayAnnouncements();
        }
    });

    populateYears();
    displayAnnouncements();
});