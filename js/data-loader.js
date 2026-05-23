/**
 * Data Loader
 * Fetches and renders team rosters, schedules, and coach bios from JSON
 */
async function loadTeamData() {
    try {
        const response = await fetch('data/teams.json');
        if (!response.ok) throw new Error('Failed to load team data');
        const data = await response.json();

        // Determine which page we're on
        const isGirlsPage = window.location.pathname.includes('girls-volleyball.html');
        const isBoysPage = window.location.pathname.includes('boys-volleyball.html');
        
        if (isGirlsPage) {
            renderTeam(data.girls, 'girls');
        } else if (isBoysPage) {
            renderTeam(data.boys, 'boys');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderTeam(teamData, teamType) {
    // Render Record (Boys only usually)
    if (teamData.record) {
        const recordContainer = document.getElementById('record-summary');
        if (recordContainer) {
            recordContainer.innerHTML = `
                <div class="stat"><span style="color: var(--primary-color); font-weight: 800; font-size: 1.2rem;">${teamData.record.overall}</span><br><small>OVERALL</small></div>
                <div class="stat"><span style="color: var(--primary-color); font-weight: 800; font-size: 1.2rem;">${teamData.record.league}</span><br><small>LEAGUE</small></div>
                <div class="stat"><span style="color: var(--primary-color); font-weight: 800; font-size: 1.2rem;">${teamData.record.rank}</span><br><small>RANK</small></div>
            `;
        }
    }

    // Render Rosters
    if (teamData.rosters) {
        const rosterButtons = document.querySelectorAll('.roster-team-button');
        const rosterModal = document.getElementById('roster-modal');
        const rosterGrid = document.getElementById('roster-modal-grid');
        const rosterTitle = document.getElementById('roster-modal-title');
        const closeBtn = rosterModal?.querySelector('.close-modal');

        rosterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const teamKey = button.getAttribute('data-team');
                const players = teamData.rosters[teamKey];
                
                if (players && rosterGrid && rosterTitle) {
                    rosterTitle.textContent = `${teamKey.charAt(0).toUpperCase() + teamKey.slice(1)} Roster`;
                    rosterGrid.innerHTML = players.map(player => `
                        <div class="player-card">
                            ${player.number ? `<span class="player-number">${player.number}</span>` : ''}
                            <span class="player-name">${player.name}</span>
                            <span class="player-position">${player.position}</span>
                        </div>
                    `).join('');
                    
                    rosterModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (rosterModal) {
            closeBtn?.addEventListener('click', () => {
                rosterModal.style.display = 'none';
                document.body.style.overflow = '';
            });

            window.addEventListener('click', (e) => {
                if (e.target === rosterModal) {
                    rosterModal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Render Schedule
    const scheduleContainer = document.getElementById('team-schedule');
    if (scheduleContainer && teamData.schedule) {
        scheduleContainer.innerHTML = teamData.schedule.map(section => `
            <div class="schedule-section-header">
                <h4>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 1.2em; height: 1.2em; vertical-align: middle; margin-right: 8px; color: var(--primary-color);"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/><path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"/><path d="M2 12h20"/></svg>
                    ${section.category} ${section.dates ? `(${section.dates})` : ''}
                </h4>
            </div>
            <div class="schedule-list">
                ${section.games.map(game => `
                    <div class="schedule-row ${game.isHome ? 'home-game' : ''} ${game.highlight ? 'highlight' : ''}">
                        <span class="date">${game.date}</span>
                        ${game.teams ? `<span class="teams">${game.teams}</span>` : ''}
                        ${game.time ? `<span class="time">${game.time}</span>` : ''}
                        <span class="opponent">${game.opponent} ${game.result ? `<span class="varsity-result ${game.isWin ? 'win' : 'loss'}">${game.result}</span>` : ''}</span>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    // Render Coaches
    const coachesGrid = document.getElementById('coaches-grid');
    if (coachesGrid && teamData.coaches) {
        coachesGrid.innerHTML = teamData.coaches.map((coach, index) => `
            <div class="coach-card ${index === 0 ? 'highlight-card' : ''}">
                <div class="coach-image">
                    <img src="${coach.image}" alt="Coach ${coach.name}" loading="lazy">
                </div>
                <div class="coach-details">
                    <h4>${coach.name.replace(' ', '<br>')}</h4>
                    <p class="coach-position">${coach.position}</p>
                    <button class="full-bio-btn" data-coach="${coach.id}">View Full Bio</button>
                </div>
            </div>
        `).join('');
        
        // Setup Coach Modal Logic
        setupCoachModals(teamData.coaches);
    }
}

function setupCoachModals(coaches) {
    const modal = document.getElementById('coachBioModal');
    const content = document.getElementById('coachBioContent');
    const btns = document.querySelectorAll('.full-bio-btn');
    const closeBtn = modal?.querySelector('.close-modal');

    if (!modal || !content) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const coachId = btn.getAttribute('data-coach');
            const coach = coaches.find(c => c.id === coachId);
            if (coach) {
                content.innerHTML = `
                    <div class="coach-modal-header">
                        <h3>${coach.name}</h3>
                        <p class="coach-position-modal">${coach.position}</p>
                    </div>
                    ${coach.motto ? `<p class="coach-motto-modal">${coach.motto}</p>` : ''}
                    <div class="coach-bio-text">
                        ${coach.bio.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                    </div>
                `;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', loadTeamData);