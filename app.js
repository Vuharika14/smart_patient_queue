// ── STATE ──────────────────────────────────────
let curFilter = 'all', curCity = '', curDept = '';
let selHosp = null, selDoctor = null;
let selDate = '', selTime = '';
let payMethod = 'card';
let curRole = 'patient';
let tokenCounter = Math.floor(800 + Math.random() * 100);

// ── ROUTING ──────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(id);
  if (pg) { pg.classList.add('active'); window.scrollTo(0, 0); }
  if (id === 'hospitals') renderHospitals();
  if (id === 'admin') renderAdmin('overview');
}
function goHome() {
  curCity = ''; curDept = '';
  document.getElementById('cityInput').value = '';
  showPage('home');
}

// ── SEARCH / SUGGESTIONS ──────────────────────────────────────
const CITIES = ['Mumbai','Delhi','Bangalore','Chennai','Hyderabad','Gurgaon','Pune','Kolkata','Ahmedabad','Jaipur','Lucknow','Chandigarh','Noida','Indore','Kochi'];

function showSugg(v) {
  const b = document.getElementById('suggBox');
  if (!v.trim()) { b.style.display = 'none'; return; }
  const f = CITIES.filter(c => c.toLowerCase().startsWith(v.toLowerCase()));
  if (!f.length) { b.style.display = 'none'; return; }
  b.innerHTML = f.map(c => `<li style="list-style:none;padding:10px 15px;font-size:.89rem;color:var(--ink2);cursor:pointer;transition:background .15s;" onmouseenter="this.style.background='var(--surface2)'" onmouseleave="this.style.background=''" onclick="selectCity('${c}')">${c}</li>`).join('');
  b.style.display = 'block';
}
function selectCity(c) {
  document.getElementById('cityInput').value = c;
  document.getElementById('suggBox').style.display = 'none';
  filterCity(c);
}
function searchCity() {
  const v = document.getElementById('cityInput').value.trim();
  if (v) filterCity(v); else showPage('hospitals');
}
function filterCity(c) {
  curCity = c; curDept = '';
  document.getElementById('suggBox').style.display = 'none';
  showPage('hospitals');
  document.getElementById('hospTitle').textContent = 'Hospitals in ' + c;
  document.getElementById('hospSub').textContent = 'Top-rated hospitals in ' + c;
}
function filterDept(d) {
  curDept = d; curCity = '';
  showPage('hospitals');
  document.getElementById('hospTitle').textContent = d + ' Hospitals';
  document.getElementById('hospSub').textContent = 'Best hospitals for ' + d + ' across India';
}

// ── HOSPITALS LIST ──────────────────────────────────────
function setFilter(f, btn) {
  curFilter = f;
  document.querySelectorAll('.flt').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  renderHospitals();
}
function renderHospitals() {
  const q = (document.getElementById('hospQ')?.value || '').toLowerCase();
  const list = HOSPITALS.filter(h => {
    const cm = !curCity || h.city.toLowerCase() === curCity.toLowerCase();
    const dm = !curDept || h.depts.some(d => d.toLowerCase().includes(curDept.toLowerCase()));
    const tm = curFilter === 'all' || curFilter === 'top' || h.type.toLowerCase() === curFilter.toLowerCase();
    const rm = curFilter !== 'top' || h.rating >= 4.7;
    const sm = !q || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || h.depts.some(d => d.toLowerCase().includes(q));
    return cm && dm && tm && rm && sm;
  });
  const g = document.getElementById('hospGrid');
  if (!g) return;
  if (!list.length) {
    g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--ink3);">No hospitals found. Try a different filter.</div>`;
    return;
  }
  const typeClass = { Govt: 'type-govt', Private: 'type-pvt', Multi: 'type-multi' };
  g.innerHTML = list.map(h => `
    <div class="hosp-card" onclick="openHospital(${h.id})">
      <div class="hcard-thumb">
        <span>${h.emoji}</span>
        <span class="hcard-type ${typeClass[h.type] || 'type-multi'}">${h.type === 'Govt' ? 'Government' : h.type === 'Private' ? 'Private' : 'Multi-specialty'}</span>
      </div>
      <div class="hcard-body">
        <div class="hcard-top">
          <div class="hcard-name">${h.name}</div>
          <div class="rating-tag">⭐ ${h.rating}</div>
        </div>
        <div class="hcard-city">📍 ${h.city}</div>
        <div class="hcard-desc">${h.desc.substring(0, 110)}…</div>
        <div class="dept-tags">${h.depts.slice(0, 4).map(d => `<span class="dtag">${d}</span>`).join('')}</div>
        <button class="btn-primary" style="width:100%;padding:10px;">View & Book →</button>
      </div>
    </div>`).join('');
}

// ── HOSPITAL DETAIL ──────────────────────────────────────
function openHospital(id) {
  selHosp = HOSPITALS.find(h => h.id === id);
  if (!selHosp) return;
  const h = selHosp;
  document.getElementById('detailBanner').innerHTML = `<span style="position:relative;z-index:1;font-size:5rem;">${h.emoji}</span>`;
  document.getElementById('detailName').textContent = h.name;
  document.getElementById('detailRating').textContent = h.rating;
  document.getElementById('detailMeta').innerHTML = `
    <span class="meta-chip">📍 ${h.city}</span>
    <span class="meta-chip">🏥 ${h.type === 'Govt' ? 'Government' : h.type === 'Private' ? 'Private' : 'Multi-specialty'}</span>
    <span class="meta-chip">🩺 ${h.depts.length} Departments</span>`;
  document.getElementById('detailGallery').innerHTML = h.gallery.map(g => `<div class="gp">${g}</div>`).join('');
  document.getElementById('detailDesc').textContent = h.desc;
  document.getElementById('detailFac').innerHTML = h.facilities.map(f => `<span class="fac">${f}</span>`).join('');
  document.getElementById('detailContact').innerHTML = `📍 ${h.address}<br>📞 ${h.phone}<br>✉️ ${h.email}`;
  document.getElementById('detailDepts').innerHTML = h.depts.map(d => `<span class="dtag">${d}</span>`).join('');
  document.getElementById('detailInsurance').innerHTML = h.insurance.map(i => `<span class="fac" style="background:#fff5e8;border-color:#e8c870;color:#a07010;">${i}</span>`).join('');
  document.getElementById('detailDoctors').innerHTML = h.doctors.map((d, i) => `
    <div class="doc-card" onclick="selDocDetail(this,${i})">
      <div class="doc-ava">${d.emoji}</div>
      <div>
        <div class="doc-name">${d.name}</div>
        <div class="doc-spec">${d.spec}</div>
        <div class="doc-fee">₹ ${d.fee} / consultation</div>
      </div>
      <div class="avail-dot"></div>
    </div>`).join('');
  document.getElementById('detailReviews').innerHTML = h.reviews.map(r => `
    <div class="review-card">
      <div class="rev-author">${r.a} <span class="stars">${'★'.repeat(r.r)}${'☆'.repeat(5 - r.r)}</span></div>
      <div class="rev-text">${r.t}</div>
    </div>`).join('');
  selDoctor = null;
  showPage('detail');
}

function selDocDetail(btn, idx) {
  document.querySelectorAll('#detailDoctors .doc-card').forEach(c => c.classList.remove('sel'));
  btn.classList.add('sel');
  selDoctor = selHosp.doctors[idx];
}

// ── BOOKING ──────────────────────────────────────
function openBooking() {
  if (!selHosp) return;
  document.getElementById('bkHospName').textContent = selHosp.name;
  document.getElementById('bkDocName').textContent = selDoctor ? `Dr. → ${selDoctor.name}` : 'Select a doctor →';

  document.getElementById('bookDocGrid').innerHTML = selHosp.doctors.map((d, i) => `
    <div class="doc-card" onclick="selBookDoc(this,${i})">
      <div class="doc-ava">${d.emoji}</div>
      <div>
        <div class="doc-name">${d.name}</div>
        <div class="doc-spec">${d.spec}</div>
        <div class="doc-fee">₹ ${d.fee}</div>
      </div>
      <div class="avail-dot"></div>
    </div>`).join('');

  if (selDoctor) {
    const idx = selHosp.doctors.indexOf(selDoctor);
    const cards = document.querySelectorAll('#bookDocGrid .doc-card');
    if (cards[idx]) cards[idx].classList.add('sel');
  }

  buildDates();

  selDate = ''; selTime = '';
  ['step1','step2','step3','step4'].forEach((id, i) => {
    document.getElementById(id).style.display = i === 0 ? 'block' : 'none';
  });
  document.getElementById('tokenPage').classList.remove('show');
  document.getElementById('payProcessing').classList.remove('show');
  document.getElementById('payBtnWrap').style.display = 'flex';
  ['ps1','ps2','ps3','ps4'].forEach((id, i) => {
    const e = document.getElementById(id);
    e.classList.remove('on', 'done');
    if (i === 0) e.classList.add('on');
  });
  showPage('booking');
}

function selBookDoc(btn, idx) {
  document.querySelectorAll('#bookDocGrid .doc-card').forEach(c => c.classList.remove('sel'));
  btn.classList.add('sel');
  selDoctor = selHosp.doctors[idx];
  document.getElementById('bkDocName').textContent = selDoctor.name + ' · ' + selDoctor.spec;
}


function buildDates() {
  const g = document.getElementById('dateGrid');

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // total days in current month
  const totalDays = new Date(year, month + 1, 0).getDate();

  let html = '';

  for (let i = 1; i <= totalDays; i++) {
    const d = new Date(year, month, i);

    // ❌ skip past dates
    if (d < new Date().setHours(0,0,0,0)) continue;

    const dateStr = d.toISOString().split('T')[0];

    html += `<div class="date-btn" onclick="selDate2(this,'${dateStr}','${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}')">
      <div class="day">${days[d.getDay()]}</div>
      <div class="num">${d.getDate()}</div>
    </div>`;
  }

  g.innerHTML = html;

  buildTimeSlots();
}

function selDate2(btn, dateStr, label) {
  document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  selDate = label;
  buildTimeSlots();
}

function buildTimeSlots() {
  const times = ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM'];
  const bookedIndices = [0, 1, 4, 7, 10];
  document.getElementById('timeGrid').innerHTML = times.map((t, i) =>
    `<div class="time-btn${bookedIndices.includes(i) ? ' booked' : ''}" onclick="${bookedIndices.includes(i) ? '' : `selTime2(this,'${t}')`}">${t}</div>`
  ).join('');
  selTime = '';
}

function selTime2(btn, time) {
  document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  selTime = time;
}

// ── STEP NAVIGATION ──────────────────────────────────────
function nextStep(n) {
  if (n === 2 && !selDoctor) { showToast('⚠️ Please select a doctor first!'); return; }
  if (n === 3 && !selDate) { showToast('⚠️ Please select a date!'); return; }
  if (n === 3 && !selTime) { showToast('⚠️ Please select a time slot!'); return; }
  if (n === 4) {
    const name = document.getElementById('pName').value.trim();
    const phone = document.getElementById('pPhone').value.trim();
    const gender = document.getElementById('pGender').value;
    const age = document.getElementById('pAge').value.trim();
    if (!name || !phone || !gender || !age) { showToast('⚠️ Please fill all required fields!'); return; }
    fillSummary();
  }
  document.getElementById('step' + (n - 1)).style.display = 'none';
  document.getElementById('step' + n).style.display = 'block';
  document.getElementById('ps' + (n - 1)).classList.remove('on');
  document.getElementById('ps' + (n - 1)).classList.add('done');
  document.getElementById('ps' + n).classList.add('on');
}
function prevStep(n) {
  document.getElementById('step' + (n + 1)).style.display = 'none';
  document.getElementById('step' + n).style.display = 'block';
  document.getElementById('ps' + (n + 1)).classList.remove('on');
  document.getElementById('ps' + n).classList.remove('done');
  document.getElementById('ps' + n).classList.add('on');
}

// ── PAYMENT SUMMARY ──────────────────────────────────────
function fillSummary() {
  const fee = selDoctor ? selDoctor.fee : 500;
  const reg = 50;
  const gst = Math.round((fee + reg) * 0.18);
  const total = fee + reg + gst;
  document.getElementById('sum-hosp').textContent = selHosp.name;
  document.getElementById('sum-doc').textContent = selDoctor ? selDoctor.name + ' (' + selDoctor.spec + ')' : '—';
  document.getElementById('sum-dt').textContent = (selDate || '—') + (selTime ? ' · ' + selTime : '');
  document.getElementById('sum-patient').textContent = document.getElementById('pName').value || '—';
  document.getElementById('sum-fee').textContent = '₹ ' + fee;
  document.getElementById('sum-gst').textContent = '₹ ' + gst;
  document.getElementById('sum-total').textContent = '₹ ' + total;
  document.getElementById('payBtn').textContent = '🔒 Pay ₹ ' + total + ' & Get Token';
}

function selPayMethod(m, btn) {
  payMethod = m;
  document.querySelectorAll('.pay-method').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  document.getElementById('cardFields').classList.toggle('show', m === 'card');
  document.getElementById('upiField').style.display = m === 'upi' ? 'block' : 'none';
  document.getElementById('netField').style.display = m === 'net' ? 'block' : 'none';
}

function formatCard(el) {
  let v = el.value.replace(/\D/g, '').substring(0, 16);
  v = v.replace(/(.{4})/g, '$1  ').trim();
  el.value = v;
}

// ── PAYMENT PROCESSING ──────────────────────────────────────
function processPayment() {
  document.getElementById('payBtnWrap').style.display = 'none';
  const proc = document.getElementById('payProcessing');
  const msg = document.getElementById('payMsg');
  proc.classList.add('show');

  const messages = ['Connecting to payment gateway…', 'Verifying payment details…', 'Processing transaction…', 'Confirming payment…', 'Generating your token…'];
  let i = 0;
  const interval = setInterval(() => {
    msg.textContent = messages[i] || messages[messages.length - 1];
    i++;
    if (i >= messages.length) {
      clearInterval(interval);
      setTimeout(showToken, 800);
    }
  }, 700);
}

function showToken() {
  document.getElementById('payProcessing').classList.remove('show');
  document.getElementById('step4').style.display = 'none';
  document.getElementById('ps4').classList.remove('on');
  document.getElementById('ps4').classList.add('done');

  tokenCounter++;
  const token = 'T‑' + String(tokenCounter).padStart(4, '0');
  const fee = selDoctor ? selDoctor.fee : 500;
  const total = fee + 50 + Math.round((fee + 50) * 0.18);

  document.getElementById('tokenNum').textContent = token;
  document.getElementById('tokenDept').textContent = selDoctor ? selDoctor.spec : 'General';
  document.getElementById('tokenAmount').textContent = '₹ ' + total;
  document.getElementById('tokenDetails').innerHTML = `
    <div class="appt-row"><span class="k">Hospital</span><span class="v">${selHosp.name}</span></div>
    <div class="appt-row"><span class="k">Doctor</span><span class="v">${selDoctor ? selDoctor.name : '—'}</span></div>
    <div class="appt-row"><span class="k">Department</span><span class="v">${selDoctor ? selDoctor.spec : '—'}</span></div>
    <div class="appt-row"><span class="k">Date</span><span class="v">${selDate || '—'}</span></div>
    <div class="appt-row"><span class="k">Time</span><span class="v">${selTime || '—'}</span></div>
    <div class="appt-row"><span class="k">Patient</span><span class="v">${document.getElementById('pName').value}</span></div>
    <div class="appt-row"><span class="k">Payment via</span><span class="v">${payMethod === 'card' ? '💳 Card' : payMethod === 'upi' ? '📱 UPI' : '🏦 Net Banking'}</span></div>
  `;
  document.getElementById('tokenPage').classList.add('show');
}

function printToken() {
  const tokenNum = document.getElementById('tokenNum').textContent;
  showToast('🖨️ Token ' + tokenNum + ' ready to print!');
  setTimeout(() => window.print(), 500);
}

// ── AUTH ──────────────────────────────────────
function switchAuth(m, btn) {
  document.getElementById('loginForm').style.display = m === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = m === 'register' ? 'block' : 'none';
  document.querySelectorAll('.atab').forEach(t => t.classList.remove('on'));
  if (btn) btn.classList.add('on');
  else document.querySelectorAll('.atab')[m === 'login' ? 0 : 1].classList.add('on');
}
function selRole(btn, r) {
  curRole = r;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
}
function handleLogin() {
  const e = document.getElementById('lEmail').value.trim();
  const p = document.getElementById('lPwd').value.trim();
  if (!e || !p) { showToast('⚠️ Please enter email and password'); return; }
  if (curRole === 'admin') { showToast('🛡️ Welcome, Admin!'); setTimeout(() => showPage('admin'), 600); }
  else { showToast('✅ Welcome back! Logged in successfully.'); setTimeout(() => showPage('hospitals'), 600); }
}
function handleRegister() {
  showToast('🎉 Account created! Please verify your email.');
  setTimeout(() => switchAuth('login'), 1200);
}

// ── ADMIN ──────────────────────────────────────
function aTab(tab, link) {
  document.querySelectorAll('.amenu li a').forEach(a => a.classList.remove('on'));
  if (link) link.classList.add('on');
  renderAdmin(tab);
}
function renderAdmin(tab) {
  const m = document.getElementById('adminMain');
  if (!m) return;
  if (tab === 'overview') {
    m.innerHTML = `
      <div class="admin-title">Dashboard Overview</div>
      <div class="astat-grid">
        <div class="astat"><div class="an">1,284</div><div class="al">Today's Appointments</div><div class="ac">↑ 14% vs yesterday</div></div>
        <div class="astat"><div class="an">6</div><div class="al">Hospitals Active</div><div class="ac">↑ 1 new this week</div></div>
        <div class="astat"><div class="an">24</div><div class="al">Doctors Online</div><div class="ac">↑ 3 this morning</div></div>
        <div class="astat"><div class="an">₹3.2L</div><div class="al">Today's Revenue</div><div class="ac">↑ 8% this month</div></div>
        <div class="astat"><div class="an">47</div><div class="al">Pending Approvals</div><div class="ac" style="color:var(--amber);">↑ 5 today</div></div>
      </div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;margin-bottom:12px;">Recent Appointments & Tokens</div>
      ${appointmentsTable()}`;
  } else if (tab === 'appointments') {
    m.innerHTML = `<div class="admin-title">All Appointments</div>${appointmentsTable()}`;
  } else if (tab === 'hospitals') {
    m.innerHTML = `<div class="admin-title">Manage Hospitals</div>
      <div class="hosp-grid" style="margin-top:14px;">${HOSPITALS.map(h => `
        <div class="hosp-card">
          <div class="hcard-thumb"><span>${h.emoji}</span></div>
          <div class="hcard-body">
            <div class="hcard-top"><div class="hcard-name">${h.name}</div><div class="rating-tag">⭐ ${h.rating}</div></div>
            <div class="hcard-city">📍 ${h.city}</div>
            <button class="btn-primary" style="width:100%;padding:9px;margin-top:8px;" onclick="showToast('✏️ Edit coming soon!')">Edit Hospital</button>
          </div>
        </div>`).join('')}</div>`;
  } else if (tab === 'addhospital') {
    m.innerHTML = `<div class="admin-title">Add New Hospital</div>
      <div style="max-width:580px;">
        <div class="fg"><label>Hospital Name</label><input type="text" placeholder="e.g. Apollo Hospitals"></div>
        <div class="frow"><div class="fg"><label>City</label><input type="text" placeholder="Chennai"></div><div class="fg"><label>Rating</label><input type="number" step="0.1" min="1" max="5" placeholder="4.5"></div></div>
        <div class="fg"><label>Type</label><select><option>Government</option><option>Private</option><option>Multi-specialty</option></select></div>
        <div class="fg"><label>Description</label><textarea rows="3" placeholder="About the hospital…"></textarea></div>
        <div class="fg"><label>Address</label><input type="text" placeholder="Street, City, PIN"></div>
        <div class="frow"><div class="fg"><label>Phone</label><input type="tel" placeholder="+91…"></div><div class="fg"><label>Email</label><input type="email" placeholder="hospital@email.com"></div></div>
        <div class="fg"><label>Departments (comma separated)</label><input type="text" placeholder="Cardiology, Oncology, Neurology…"></div>
        <div class="fg"><label>Facilities (comma separated)</label><input type="text" placeholder="ICU, Blood Bank, 24/7 ER…"></div>
        <button class="btn-primary" style="padding:11px 28px;" onclick="showToast('✅ Hospital added successfully!')">Add Hospital</button>
      </div>`;
  } else if (tab === 'patients') {
    m.innerHTML = `<div class="admin-title">Registered Patients</div>
      <table class="atable" style="margin-top:14px;">
        <thead><tr><th>Name</th><th>Phone</th><th>City</th><th>Last Visit</th><th>Appointments</th></tr></thead>
        <tbody>${['Rahul Sharma','Priya Nair','Arun Kumar','Meena Patel','Suresh Rao'].map((n, i) => `
          <tr><td>${n}</td><td>+91 ${9800000000 + i}</td><td>${['Mumbai','Delhi','Bangalore','Chennai','Hyderabad'][i]}</td><td>${['Today','Yesterday','3 days ago','1 week ago','Today'][i]}</td><td>${[3, 1, 2, 5, 1][i]}</td></tr>`).join('')}
        </tbody>
      </table>`;
  } else if (tab === 'tokens') {
    m.innerHTML = `<div class="admin-title">Token Tracker (Live)</div>
      <table class="atable" style="margin-top:14px;">
        <thead><tr><th>Token</th><th>Patient</th><th>Doctor</th><th>Time</th><th>Status</th></tr></thead>
        <tbody>${[
          ['T‑0847','Rahul Sharma','Dr. P. Venugopal','10:00 AM','sc'],
          ['T‑0848','Priya Nair','Dr. Anita Krishnan','10:30 AM','sc'],
          ['T‑0849','Arun Kumar','Dr. Ravi Shankar','11:00 AM','sp'],
          ['T‑0850','Meena Patel','Dr. Vandana Seth','11:30 AM','sp'],
          ['T‑0851','Suresh Rao','Dr. Nanda Kumar','02:00 PM','sp'],
        ].map(r => `<tr>
          <td style="font-family:'Cormorant Garamond',serif;font-weight:700;font-size:1rem;color:var(--teal);">${r[0]}</td>
          <td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td>
          <td><span class="sbadge ${r[4]}">${r[4]==='sc'?'Consulted':'Waiting'}</span></td>
        </tr>`).join('')}
        </tbody>
      </table>`;
  }
}

function appointmentsTable() {
  const rows = [
    {token:'T‑0844',p:'Kavitha Suresh',h:'Apollo Hospitals',d:'Dr. P. Venugopal',t:'09:00 AM',st:'sc'},
    {token:'T‑0845',p:'Rajan Pillai',h:'AIIMS New Delhi',d:'Dr. Ravi Shankar',t:'09:30 AM',st:'sc'},
    {token:'T‑0846',p:'Anil Mehta',h:'Fortis FMRI',d:'Dr. Atul Kumar',t:'10:00 AM',st:'sp'},
    {token:'T‑0847',p:'Deepa Nair',h:'Manipal Hospitals',d:'Dr. Leela Priya',t:'10:30 AM',st:'sp'},
    {token:'T‑0848',p:'Vikram Rao',h:'Narayana Health',d:'Dr. Devi Shetty',t:'11:00 AM',st:'ss'},
  ];
  const sl = {sc:'sc',sp:'sp',ss:'ss'};
  const sl2 = {sc:'Consulted',sp:'Waiting',ss:'Cancelled'};
  return `<table class="atable"><thead><tr><th>Token</th><th>Patient</th><th>Hospital</th><th>Doctor</th><th>Time</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>${rows.map(r=>`<tr>
      <td style="font-family:'Cormorant Garamond',serif;font-weight:700;color:var(--teal);">${r.token}</td>
      <td>${r.p}</td><td>${r.h}</td><td>${r.d}</td><td>${r.t}</td>
      <td><span class="sbadge ${sl[r.st]}">${sl2[r.st]}</span></td>
      <td><button class="btn-outline" style="font-size:.74rem;padding:4px 10px;" onclick="showToast('✅ Status updated!')">Update</button></td>
    </tr>`).join('')}</tbody></table>`;
}

// ── TOAST ──────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ── Click outside suggestions ──────────────────────────────────────
document.addEventListener('click', e => {
  const b = document.getElementById('suggBox');
  if (b && !e.target.closest('.hero-search') && !e.target.closest('#suggBox')) b.style.display = 'none';
});

// ── Init ──────────────────────────────────────
renderHospitals();
