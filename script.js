const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})
if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}
window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})
const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})


// Calendar Modal Logic
document.getElementById('openCalendar').onclick = function() {
    document.getElementById('calendarModal').style.display = 'block';
    renderCalendar();
};
document.getElementById('closeCalendar').onclick = function() {
    document.getElementById('calendarModal').style.display = 'none';
};
window.onclick = function(event) {
    if (event.target == document.getElementById('calendarModal')) {
        document.getElementById('calendarModal').style.display = 'none';
    }
};

// Simple Calendar Renderer
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let d of days) {
        const dayElem = document.createElement('div');
        dayElem.className = 'day';
        dayElem.textContent = d;
        calendar.appendChild(dayElem);
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        calendar.appendChild(empty);
    }
    for (let date = 1; date <= lastDate; date++) {
        const dateElem = document.createElement('div');
        dateElem.className = 'date';
        dateElem.textContent = date;
        dateElem.onclick = function() {
            alert('Selected date: ' + year + '-' + (month + 1) + '-' + date);
        };
        calendar.appendChild(dateElem);
    }
}


// Profile Modal Logic
document.querySelector('.profile img').onclick = function() {
    document.getElementById('profileModal').style.display = 'block';
    document.getElementById('editProfileForm').style.display = 'none';
};
document.getElementById('closeProfile').onclick = function() {
    document.getElementById('profileModal').style.display = 'none';
};
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('profileModal')) {
        document.getElementById('profileModal').style.display = 'none';
    }
});

// Edit Profile Button
document.getElementById('editProfileBtn').onclick = function() {
    document.getElementById('editProfileForm').style.display = 'block';
};
// Cancel Edit Button
document.getElementById('cancelEdit').onclick = function() {
    document.getElementById('editProfileForm').style.display = 'none';
};
// Settings Button (example: alert)
document.getElementById('settingsBtn').onclick = function() {
    document.getElementById('settingsModal').style.display = 'block';
};
document.getElementById('closeSettings').onclick = function() {
    document.getElementById('settingsModal').style.display = 'none';
};
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('settingsModal')) {
        document.getElementById('settingsModal').style.display = 'none';
    }
});

// Settings Form Logic
document.getElementById('settingsForm').onsubmit = function(e) {
    e.preventDefault();
    // Theme
    const theme = document.getElementById('themeSelect').value;
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else if (theme === 'light') {
        document.body.classList.remove('dark');
    } else {
        // System default: remove manual override
        document.body.classList.remove('dark');
    }
    // Notifications
    const emailNotify = document.getElementById('emailNotify').checked;
    const smsNotify = document.getElementById('smsNotify').checked;
    // Language
    const lang = document.getElementById('langSelect').value;
    // You can save these to localStorage or use them as needed
    alert('Settings saved!\nTheme: ' + theme + '\nEmail: ' + (emailNotify ? 'On' : 'Off') + '\nSMS: ' + (smsNotify ? 'On' : 'Off') + '\nLanguage: ' + lang);
    document.getElementById('settingsModal').style.display = 'none';
};

// Reset Button Logic
document.getElementById('resetSettings').onclick = function() {
    document.getElementById('themeSelect').value = 'system';
    document.getElementById('emailNotify').checked = false;
    document.getElementById('smsNotify').checked = false;
    document.getElementById('langSelect').value = 'en';
};

// Edit Profile Save Logic
document.querySelector('#editProfileForm form').onsubmit = function(e) {
    e.preventDefault();
    // Get new values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[placeholder="Phone"]').value;

    // Update profile display
    document.querySelector('#profileModal h2').textContent = name;
    const emailTd = document.querySelector('#profileModal table tr:nth-child(2) td:nth-child(2)');
    const phoneTd = document.querySelector('#profileModal table tr:nth-child(3) td:nth-child(2)');
    emailTd.textContent = email;
    phoneTd.textContent = phone;
    // Update profile picture if a new file is selected
    const fileInput = this.querySelector('#profilePicInput');
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('#profileModal img').src = e.target.result;
            document.querySelector('.profile img').src = e.target.result; // Also update sidebar/profile image
        };
        reader.readAsDataURL(fileInput.files[0]);
    }

    // Hide edit form
    document.getElementById('editProfileForm').style.display = 'none';
};


// Assignment Modal Logic
const assignmentBtn = document.querySelector('.side-menu.top li:nth-child(2) a');
const assignmentModal = document.getElementById('assignmentModal');
const closeAssignment = document.getElementById('closeAssignment');
const assignmentForm = document.getElementById('assignmentForm');
const assignmentFile = document.getElementById('assignmentFile');
const assignmentStatus = document.getElementById('assignmentStatus');
const pendingAssignments = document.getElementById('pendingAssignments');
const uploadedAssignments = document.getElementById('uploadedAssignments');
const subjectSelect = document.getElementById('subjectSelect');
const pendingCountSpan = document.getElementById('pendingCount');

// Example assignments by subject
const allAssignments = [
    { name: "COA", id: "math", subject: "COA" },
    { name: "DM", id: "physics", subject: "DM" },
    { name: "OOPs", id: "cs", subject: "OOPs" },
    { name: "EVS Essay", id: "evs", subject: "EVS" },
    { name: "DAA", id: "os", subject: "DAA" }
];
let uploaded = [];

function updatePendingCount() {
    const pending = allAssignments.filter(a => !uploaded.includes(a.id)).length;
    pendingCountSpan.textContent = pending;
}

// Update count whenever assignments change
function renderAssignments() {
    pendingAssignments.innerHTML = '';
    uploadedAssignments.innerHTML = '';
    allAssignments.forEach(a => {
        if (uploaded.includes(a.id)) {
            uploadedAssignments.innerHTML += `<li style="background:var(--light-blue);margin-bottom:8px;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
                <span>${a.subject}: ${a.name}</span>
                <span style="color:var(--blue);font-size:14px;">&#10003; Uploaded</span>
            </li>`;
        } else {
            pendingAssignments.innerHTML += `<li style="background:var(--grey);margin-bottom:8px;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
                <span>${a.subject}: ${a.name}</span>
                <span style="color:var(--red);font-size:14px;">&#10007; Pending</span>
            </li>`;
        }
    });
    updatePendingCount();
}

assignmentBtn.onclick = function() {
    assignmentModal.style.display = 'block';
    renderAssignments();
    assignmentStatus.textContent = '';
};
closeAssignment.onclick = function() {
    assignmentModal.style.display = 'none';
};
window.addEventListener('click', function(event) {
    if (event.target == assignmentModal) {
        assignmentModal.style.display = 'none';
    }
});

assignmentForm.onsubmit = function(e) {
    e.preventDefault();
    const file = assignmentFile.files[0];
    const subject = subjectSelect.value;
    if (!subject) {
        assignmentStatus.textContent = "Please select a subject.";
        assignmentStatus.style.color = "var(--red)";
        return;
    }
    if (!file) {
        assignmentStatus.textContent = "Please select a file to upload.";
        assignmentStatus.style.color = "var(--red)";
        return;
    }
    // Simulate upload: mark assignment for selected subject as uploaded
    const assignment = allAssignments.find(a => a.id === subject);
    if (assignment && !uploaded.includes(assignment.id)) {
        uploaded.push(assignment.id);
        assignmentStatus.textContent = `Uploaded: ${assignment.subject} - ${assignment.name}`;
        assignmentStatus.style.color = "var(--blue)";
        renderAssignments();
        assignmentFile.value = '';
        subjectSelect.value = '';
    } else if (assignment && uploaded.includes(assignment.id)) {
        assignmentStatus.textContent = "You have already uploaded this assignment.";
        assignmentStatus.style.color = "var(--red)";
    } else {
        assignmentStatus.textContent = "Assignment not found.";
        assignmentStatus.style.color = "var(--red)";
    }
};

// Attendance Data Example
const attendanceData = {
    total: 87,
    subjects: [
        { name: "COA", percent: 90 },
        { name: "DAA", percent: 80 },
        { name: "DM", percent: 85 },
        { name: "EVS", percent: 95 },
        { name: "OOPs", percent: 75 }
    ]
};

const attendanceBtn = document.querySelector('.side-menu.top li:nth-child(3) a');
const attendanceModal = document.getElementById('attendanceModal');
const closeAttendance = document.getElementById('closeAttendance');

// Example: Subject icons (Boxicons)
const subjectIcons = {
    "COA": "<i class='bx bx-chip' style='color:var(--blue);font-size:1.3em;vertical-align:middle;'></i>",
    "DAA": "<i class='bx bx-bar-chart-alt' style='color:var(--blue);font-size:1.3em;vertical-align:middle;'></i>",
    "DM": "<i class='bx bx-calculator' style='color:var(--blue);font-size:1.3em;vertical-align:middle;'></i>",
    "EVS": "<i class='bx bx-leaf' style='color:var(--blue);font-size:1.3em;vertical-align:middle;'></i>",
    "OOPs": "<i class='bx bx-code-alt' style='color:var(--blue);font-size:1.3em;vertical-align:middle;'></i>"
};

// Example: Attendance data by date
const attendanceRecords = {
    // Format: 'YYYY-MM-DD': [{ subject, attended }]
    [getTodayDate()]: [
        { subject: "COA", attended: true },
        { subject: "DAA", attended: false },
        { subject: "DM", attended: true },
        { subject: "EVS", attended: true },
        { subject: "OOPs", attended: false }
    ],
    // Add more dates if needed
};

function getTodayDate() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

function renderAttendanceTodayTable(date = getTodayDate()) {
    const tbody = document.getElementById('attendanceTodayTable');
    tbody.innerHTML = '';
    const records = attendanceRecords[date] || attendanceRecords[getTodayDate()] || [];
    records.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding:10px 12px;display:flex;align-items:center;gap:10px;">
                ${subjectIcons[item.subject] || ''}
                <span>${item.subject}</span>
            </td>
            <td style="padding:10px 12px;">
                <span style="
                    display:inline-block;
                    padding:6px 18px;
                    border-radius:16px;
                    background:${item.attended ? 'var(--blue)' : 'var(--red)'};
                    color:#fff;
                    font-weight:500;
                    font-size:1em;
                    box-shadow:0 1px 4px rgba(0,0,0,0.07);
                ">
                    ${item.attended ? 'Present' : 'Absent'}
                </span>
            </td>
            <td style="padding:10px 12px;">
                <input type="checkbox" ${item.attended ? 'checked' : ''} ${date !== getTodayDate() ? 'disabled' : ''} 
                    data-idx="${idx}" style="width:20px;height:20px;cursor:pointer;">
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Add event listeners for checkboxes (only for today)
    if (date === getTodayDate()) {
        tbody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.onchange = function() {
                const i = parseInt(this.getAttribute('data-idx'));
                records[i].attended = this.checked;
                renderAttendanceTodayTable(date); // Re-render for badge update
            };
        });
    }
}

// Date picker logic
const attendanceDatePicker = document.getElementById('attendanceDatePicker');
attendanceDatePicker.value = getTodayDate();
attendanceDatePicker.onchange = function() {
    renderAttendanceTodayTable(this.value);
};

// Show modal and render everything
attendanceBtn.onclick = function() {
    attendanceModal.style.display = 'block';
    renderAttendanceCircle();
    renderAttendanceBars();
    renderAttendanceTodayTable(attendanceDatePicker.value);
};

closeAttendance.onclick = function() {
    attendanceModal.style.display = 'none';
};
window.addEventListener('click', function(event) {
    if (event.target == attendanceModal) {
        attendanceModal.style.display = 'none';
    }
});

function renderAttendanceCircle() {
    const percent = attendanceData.total;
    const canvas = document.getElementById('attendanceCircle');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(90, 90, 80, 0, 2 * Math.PI);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--grey');
    ctx.lineWidth = 18;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(90, 90, 80, -0.5 * Math.PI, (2 * Math.PI * percent / 100) - 0.5 * Math.PI);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--blue');
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.stroke();

    document.getElementById('attendancePercentText').textContent = percent + "%";
}

function renderAttendanceBars() {
    const barsContainer = document.getElementById('attendanceBars');
    barsContainer.innerHTML = '';
    attendanceData.subjects.forEach(subj => {
        const barWrapper = document.createElement('div');
        barWrapper.style.marginBottom = '22px';

        const label = document.createElement('div');
        label.textContent = subj.name + " (" + subj.percent + "%)";
        label.style.fontWeight = '500';
        label.style.color = 'var(--dark)';
        label.style.marginBottom = '6px';

        const barBg = document.createElement('div');
        barBg.style.background = 'var(--grey)';
        barBg.style.borderRadius = '12px';
        barBg.style.height = '22px';
        barBg.style.width = '100%';
        barBg.style.position = 'relative';
        barBg.style.overflow = 'hidden';

        const barFill = document.createElement('div');
        barFill.style.background = 'linear-gradient(90deg, var(--blue) 70%, var(--light-blue) 100%)';
        barFill.style.height = '100%';
        barFill.style.width = '0%';
        barFill.style.borderRadius = '12px';
        barFill.style.transition = 'width 1.2s cubic-bezier(.4,2,.3,1)';
        barFill.style.position = 'absolute';
        barFill.style.left = '0';
        barFill.style.top = '0';

        barBg.appendChild(barFill);
        barWrapper.appendChild(label);
        barWrapper.appendChild(barBg);
        barsContainer.appendChild(barWrapper);

        setTimeout(() => {
            barFill.style.width = subj.percent + '%';
        }, 100);
    });
}

// Example: Today's attendance status

const todayAttendance = [
    { subject: "COA", attended: true, color: "var(--dark)" },
    { subject: "DAA", attended: false, color: "var(--dark)" },
    { subject: "DM", attended: true, color: "var(--dark)" },
    { subject: "EVS", attended: true, color: "var(--dark)" },
    { subject: "OOPs", attended: false, color: "var(--dark)" }
];

function renderAttendanceTodayTable() {
    const tbody = document.getElementById('attendanceTodayTable');
    tbody.innerHTML = '';
    todayAttendance.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding:10px 12px;">${item.subject}</td>
            <td style="padding:10px 12px;">
                <span style="
                    display:inline-block;
                    padding:6px 18px;
                    border-radius:16px;
                    background:${item.attended ? 'var(--blue)' : 'var(--red)'};
                    color:#fff;
                    font-weight:500;
                ">
                    ${item.attended ? 'Present' : 'Absent'}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Call these after DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('attendanceCircle')) renderAttendanceCircle();
    if (document.getElementById('attendanceBar')) renderAttendanceBar();
});
document.getElementById('sidebarSettings').onclick = function(e) {
    e.preventDefault();
    document.getElementById('settingsModal').style.display = 'block';
};

// Login Modal Logic
const validUser = "Himanshu";
const validPass = "dashboard123";

function setBlur(active) {
    document.getElementById('sidebar').classList.toggle('blur-bg', active);
    document.getElementById('content').classList.toggle('blur-bg', active);
}

document.getElementById('loginModal').style.display = 'flex';
setBlur(true);

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const errorDiv = document.getElementById('loginError');
    if (user === validUser && pass === validPass) {
        document.getElementById('loginModal').style.display = 'none';
        setBlur(false);
    } else {
        errorDiv.textContent = "Invalid username or password!";
        errorDiv.style.display = 'block';
    }
};
document.getElementById('logoutBtn').onclick = function(e) {
    e.preventDefault();
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('sidebar').classList.add('blur-bg');
    document.getElementById('content').classList.add('blur-bg');
};