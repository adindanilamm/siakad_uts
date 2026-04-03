// Data mata kuliah dan rincian nilainya
const courseData = {
    'MOBILE PROGRAMMING': {
        name: 'Mobile Programming',
        grade: 'A',
        score: '89.45',
        assignments: '87.5',
        uts: '88',
        uas: '92',
        rows: [
            { type: 'blue', component: 'Assignments (Average)', desc: 'Tugas 1: 85, Tugas 2: 90', weight: '30%', score: '87.50', weighted: '26.25' },
            { type: 'orange', component: 'Ujian Tengah Semester (UTS)', desc: 'Mid-term evaluation', weight: '30%', score: '88', weighted: '26.40' },
            { type: 'red', component: 'Ujian Akhir Semester (UAS)', desc: 'Final evaluation', weight: '40%', score: '92', weighted: '36.80' }
        ]
    },
    'DATA STRUCTURES': {
        name: 'Data Structures',
        grade: 'A',
        score: '81.85',
        assignments: '77.5',
        uts: '82',
        uas: '85',
        rows: [
            { type: 'blue', component: 'Assignments (Average)', desc: 'Tugas 1: 75, Tugas 2: 80', weight: '30%', score: '77.50', weighted: '23.25' },
            { type: 'orange', component: 'Ujian Tengah Semester (UTS)', desc: 'Mid-term evaluation', weight: '30%', score: '82', weighted: '24.60' },
            { type: 'red', component: 'Ujian Akhir Semester (UAS)', desc: 'Final evaluation', weight: '40%', score: '85', weighted: '34.00' }
        ]
    },
    'SOFTWARE ENGINEERING': {
        name: 'Software Engineering',
        grade: 'A',
        score: '92.35',
        assignments: '93.5',
        uts: '89',
        uas: '94',
        rows: [
            { type: 'blue', component: 'Assignments (Average)', desc: 'Tugas 1: 92, Tugas 2: 95', weight: '30%', score: '93.50', weighted: '28.05' },
            { type: 'orange', component: 'Ujian Tengah Semester (UTS)', desc: 'Mid-term evaluation', weight: '30%', score: '89', weighted: '26.70' },
            { type: 'red', component: 'Ujian Akhir Semester (UAS)', desc: 'Final evaluation', weight: '40%', score: '94', weighted: '37.60' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // LOGIN LOGIC
    // ----------------------------------------------------
    const roleBtns = document.querySelectorAll('.role-btn');
    roleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            roleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const loginForm = document.getElementById('login-form');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('login-view').style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'block';
            switchMenu('grade-report'); // Default view
        });
    }

    // Auto-login jika datang dari portal utama
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autologin') === '1') {
        const loginView = document.getElementById('login-view');
        const dashboardView = document.getElementById('dashboard-view');
        if (loginView) loginView.style.display = 'none';
        if (dashboardView) dashboardView.style.display = 'block';
        switchMenu('grade-report');
    }

    const signOutBtn = document.getElementById('sign-out-btn');
    if(signOutBtn) {
        signOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('dashboard-view').style.display = 'none';
            document.getElementById('login-view').style.display = 'flex';
        });
    }

    // ----------------------------------------------------
    // MENUS NAVIGATION (Sidebar)
    // ----------------------------------------------------
    document.querySelectorAll('[data-menu]').forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.preventDefault();
            const targetMenu = menu.getAttribute('data-menu');
            switchMenu(targetMenu);
        });
    });

    // ----------------------------------------------------
    // TABS NAVIGATION (Grade Report)
    // ----------------------------------------------------
    document.querySelectorAll('[data-tab]').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(tab.getAttribute('data-tab'));
        });
    });

    // View Rincian action buttons on KHS / Courses
    window.viewRincian = function(courseId) {
        switchMenu('grade-report');
        switchTab('rincian');
        renderRincianData(courseId);
    };
});

function switchMenu(menuId) {
    // Update sidebar active classes
    document.querySelectorAll('[data-menu]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`[data-menu="${menuId}"]`).forEach(el => el.classList.add('active'));

    // Toggle content sections
    document.querySelectorAll('.content-section').forEach(el => el.style.display = 'none');
    document.getElementById(`${menuId}-section`).style.display = 'block';

    // Update Page Header texts dynamically
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');

    if (menuId === 'grade-report') {
        title.textContent = 'Grade Report';
        subtitle.textContent = 'Welcome back, Alice Smith (1012001). Here is your academic performance overview.';
        // reset to KHS tab by default
        switchTab('khs');
    } else if (menuId === 'my-courses') {
        title.textContent = 'My Enrolled Courses';
        subtitle.textContent = 'View the courses you are taking this semester.';
    } else if (menuId === 'settings') {
        title.textContent = 'Settings';
        subtitle.textContent = 'Manage your student profile and preferences.';
    }
}

function switchTab(tabId) {
    // Update active tab styles
    document.querySelectorAll('[data-tab]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(el => el.classList.add('active'));

    // Toggle subviews
    document.querySelectorAll('.tab-pane').forEach(el => el.style.display = 'none');
    document.getElementById(`tab-${tabId}`).style.display = 'block';
}

function renderRincianData(courseId) {
    const data = courseData[courseId];
    if (!data) return;

    document.getElementById('rincian-course-name').textContent = data.name;
    document.getElementById('rincian-final-grade').textContent = data.grade;
    document.getElementById('rincian-final-score').innerHTML = `${data.score} <span class="score-max">/100</span>`;
    document.getElementById('rincian-val-assignments').textContent = data.assignments;
    document.getElementById('rincian-val-uts').textContent = data.uts;
    document.getElementById('rincian-val-uas').textContent = data.uas;

    const tbody = document.getElementById('rincian-tbody');
    tbody.innerHTML = '';

    data.rows.forEach(row => {
        let svgIcon = '';
        if (row.type === 'blue') {
            svgIcon = `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>`;
        } else if (row.type === 'orange') {
            svgIcon = `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>`;
        } else {
            svgIcon = `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14l2 2 4-4"></path>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="component-cell">
                    <div class="icon-box ${row.type}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            ${svgIcon}
                        </svg>
                    </div>
                    <div>
                        <div class="comp-title">${row.component}</div>
                        <div class="comp-desc">${row.desc}</div>
                    </div>
                </div>
            </td>
            <td class="text-right"><span class="val-text">${row.weight}</span></td>
            <td class="text-right"><span class="val-text">${row.score}</span></td>
            <td class="text-right"><span class="weighted-val">${row.weighted}</span></td>
        `;
        tbody.appendChild(tr);
    });
}
