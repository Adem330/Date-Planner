/* ════════════════════════════════════════════════
   DATE PLANNER — COMPLETE SCRIPT
   All features: Music, Images, Movies (TMDB),
   All activity flows → Final Date Page
   ════════════════════════════════════════════════ */

'use strict';

// ─── STATE ────────────────────────────────────────
let selectedDate   = null;
let selectedAct    = null;   // { type, name, place, image, timeline, desc, budget, rating }
let calDate        = new Date();
let musicOn        = false;
let tmdbGenres     = {};
let trendingMovies = [];
let activeMovie    = null;   // movie chosen in modal

// ─── TMDB ─────────────────────────────────────────
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODhhZjM5YzU2YWE5ZWFmOTk2NDQ5MzJmZjA0ZDk4YiIsIm5iZiI6MTcwNDcwNDYyNi45MDcsInN1YiI6IjY1YzhkYjQyMDM1YjU2MDBlYmM0MjNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3TqfxBzhc7Y0C9L_0Nl2X1f-BEcZDBL5A7YNXekIIZc';
const TMDB_BASE  = 'https://api.themoviedb.org/3';
const TMDB_IMG   = 'https://image.tmdb.org/t/p/w342';
const TMDB_HDIMG = 'https://image.tmdb.org/t/p/w500';
const TMDB_HDRS  = { accept: 'application/json', Authorization: `Bearer ${TMDB_TOKEN}` };

// ─── ACTIVITY DATA ────────────────────────────────
const DATA = {
    dinner: [
        {
            id:1, name:'Romantic Italian Dinner',
            sub:'La Dolce Vita · Tunis',
            place:'La Dolce Vita, Tunis',
            desc:'Authentic Italian cuisine in an intimate candlelit setting with soft music and wine selection. Perfect for a first or hundredth date.',
            rating:4.9, budget:'80-120 TND',
            timeline:['18:00 Meet at the restaurant','18:30 Aperitif & menu selection','19:00 Candlelit dinner','20:30 Dessert & coffee','21:30 Evening stroll'],
            img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
            emoji:'🍽️'
        },
        {
            id:2, name:'Rooftop Dinner',
            sub:'Sky Garden · Sidi Bou Said',
            place:'Sky Garden, Sidi Bou Said',
            desc:'Dine under the stars with panoramic views of the Mediterranean. The blue-and-white town looks magical at night.',
            rating:4.8, budget:'70-110 TND',
            timeline:['18:00 Meet','18:30 Watch the sunset','19:30 Dinner begins','21:00 Night view & dessert'],
            img:'https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&w=800&q=80',
            emoji:'🌃'
        },
        {
            id:3, name:'Seafood Dinner',
            sub:'Le Fisherman · La Marsa',
            place:'Le Fisherman, La Marsa',
            desc:'Fresh Mediterranean seafood prepared with traditional Tunisian spices in a beachside setting. The catch of the day is always exceptional.',
            rating:4.7, budget:'90-130 TND',
            timeline:['18:00 Meet','18:30 Beach walk','19:30 Dinner','21:00 Dessert on the beach'],
            img:'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=800&q=80',
            emoji:'🦞'
        },
        {
            id:4, name:'Traditional Tunisian Dinner',
            sub:'Dar Barmakia · Medina',
            place:'Dar Barmakia, Medina Tunis',
            desc:'Authentic Tunisian couscous and slow-cooked dishes in a historic riad with mosaic tiles and traditional music.',
            rating:4.6, budget:'50-80 TND',
            timeline:['18:00 Meet at Medina gate','18:30 Dinner','20:00 Traditional music show','20:30 Mint tea & pastries'],
            img:'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=800&q=80',
            emoji:'🫕'
        },
        {
            id:5, name:'Luxury Fine Dining',
            sub:'Abracadabra · Lac de Tunis',
            place:'Abracadabra Restaurant, Lac',
            desc:'Multi-course fine dining experience with wine pairing and French-inspired cuisine. The most elegant evening in Tunis.',
            rating:5.0, budget:'150-200 TND',
            timeline:['18:00 Arrival & welcome drink','18:30 Amuse-bouche','19:00 Full tasting menu','21:30 Dessert & petit fours','22:00 Departure'],
            img:'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=80',
            emoji:'🥂'
        }
    ],
    coffee: [
        {
            id:1, name:'Cozy Café Date',
            sub:'Café Delices · Tunis Centre',
            place:'Café Delices, Tunis Centre',
            desc:'Warm and intimate café with artisanal coffee and home-baked pastries. Perfect for long meaningful conversations.',
            rating:4.8, budget:'15-25 TND',
            timeline:['10:00 Meet','10:15 Order coffee & pastries','11:00 Deep conversation','12:00 Stroll nearby'],
            img:'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
            emoji:'☕'
        },
        {
            id:2, name:'Vintage Coffee House',
            sub:'The Old Brew · Sidi Bou Said',
            place:'The Old Brew, Sidi Bou Said',
            desc:'Charming vintage-style café in the famous blue-and-white hill town. Specialty coffee and handmade sweets.',
            rating:4.7, budget:'20-30 TND',
            timeline:['09:30 Drive to Sidi Bou Said','10:00 Explore the streets','10:30 Coffee & cake','12:00 Photo walk'],
            img:'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
            emoji:'🎨'
        },
        {
            id:3, name:'Seaside Coffee Lounge',
            sub:'Wave Café · La Marsa Beach',
            place:'Wave Café, La Marsa',
            desc:'Relaxing seaside café with views of the Mediterranean. Best at sunset with their cold brew and ocean breeze.',
            rating:4.9, budget:'18-28 TND',
            timeline:['17:00 Arrive at La Marsa','17:30 Coffee & snacks','18:30 Watch the sunset','19:00 Evening walk'],
            img:'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
            emoji:'🌊'
        },
        {
            id:4, name:'Modern Coffee Bar',
            sub:'Urban Brew · Berges du Lac',
            place:'Urban Brew, Berges du Lac',
            desc:'Contemporary third-wave coffee bar with single-origin roasts, matcha lattes, and a sleek modern ambiance.',
            rating:4.6, budget:'25-35 TND',
            timeline:['11:00 Meet','11:15 Try the pour-over','12:00 Brunch menu','13:00 Walk around the lake'],
            img:'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80',
            emoji:'🎯'
        },
        {
            id:5, name:'Garden Café',
            sub:'Bloom Café · Ariana',
            place:'Bloom Café, Ariana',
            desc:'Beautiful garden café surrounded by fresh flowers and plants. Their lavender latte and rose tea are legendary.',
            rating:4.8, budget:'20-30 TND',
            timeline:['10:00 Morning coffee','10:30 Explore the garden','11:30 Second coffee & pastry','12:30 Relaxed chat'],
            img:'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=800&q=80',
            emoji:'🌸'
        }
    ],
    beach: [
        {
            id:1, name:'Sidi Bou Said',
            sub:'The Blue & White Town · 20km from Tunis',
            place:'Sidi Bou Said Beach',
            desc:'The most romantic spot in Tunisia. White-and-blue architecture perched above the Mediterranean, beautiful at golden hour.',
            rating:4.9, budget:'Free (transport only)',
            timeline:['16:00 Arrive','16:30 Explore the village','17:30 Walk down to the beach','18:30 Watch the sunset','19:30 Dinner in the village'],
            img:'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=80',
            emoji:'🏛️'
        },
        {
            id:2, name:'La Marsa Beach',
            sub:'Pristine Sandy Shore · Northern Tunis',
            place:'La Marsa Beach Promenade',
            desc:'Pristine sandy beach with calm blue waters. The promenade is lined with cafés and restaurants for after the swim.',
            rating:4.8, budget:'Free entry',
            timeline:['17:00 Arrive at beach','17:30 Walk along the shore','18:30 Swim & relax','19:30 Sunset watch','20:00 Dinner at La Marsa'],
            img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            emoji:'🏖️'
        },
        {
            id:3, name:'Hammamet Beach',
            sub:'Day Trip Paradise · 60km from Tunis',
            place:'Hammamet Beach',
            desc:'Wide sandy beach with crystal-clear waters, beach clubs, and a charming medina. Great for a full-day date adventure.',
            rating:4.7, budget:'Transport + lunch ~60 TND',
            timeline:['09:00 Drive to Hammamet','10:30 Beach time','13:00 Lunch at beach restaurant','15:00 Medina exploration','18:00 Drive back'],
            img:'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
            emoji:'🌴'
        },
        {
            id:4, name:'Monastir Beach',
            sub:'Historic Coastal Town · 160km from Tunis',
            place:'Monastir Corniche',
            desc:'Beautiful beach town with a historic ribat (fortress), lighthouse, and a romantic promenade perfect for evening walks.',
            rating:4.8, budget:'Transport + lunch ~80 TND',
            timeline:['09:00 Drive to Monastir','11:00 Visit the ribat','13:00 Lunch by the sea','15:00 Beach walk','18:00 Sunset at the lighthouse'],
            img:'https://images.unsplash.com/photo-1565362222-f9813e8a92a0?auto=format&fit=crop&w=800&q=80',
            emoji:'⚓'
        },
        {
            id:5, name:'Mahdia Beach',
            sub:'Hidden Gem · 200km south of Tunis',
            place:'Mahdia Beach',
            desc:'Less-crowded golden sand beach with traditional fishing boats. The old medina by the sea is breathtaking and photogenic.',
            rating:4.6, budget:'Transport + lunch ~90 TND',
            timeline:['08:00 Early drive','11:00 Arrive & settle in','12:00 Beach walk','14:00 Seafood lunch','17:00 Old medina tour','19:30 Drive back'],
            img:'https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?auto=format&fit=crop&w=800&q=80',
            emoji:'🐟'
        }
    ],
    icecream: [
        {
            id:1, name:'Gelato Fantastico',
            sub:'Gelato Fantastico · Downtown Tunis',
            place:'Gelato Fantastico, Downtown Tunis',
            desc:'Authentic Italian-style gelato with 40+ unique flavours. The pistachio and stracciatella are legendary. Always a queue — worth it.',
            rating:4.9, budget:'12-18 TND',
            timeline:['15:00 Meet up','15:15 Choose your flavours','15:30 Walk & eat','16:30 Explore downtown'],
            img:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
            emoji:'🍨'
        },
        {
            id:2, name:'Sweet Dreams',
            sub:'Sweet Dreams Ice Cream · Lac',
            place:'Sweet Dreams Ice Cream, Lac de Tunis',
            desc:'Homemade ice cream with natural Tunisian ingredients. Try the jasmine and fig flavours — you won\'t find them anywhere else.',
            rating:4.8, budget:'10-15 TND',
            timeline:['16:00 Arrive','16:15 Try 3 samples each','16:30 Walk by the lake','17:30 Sit and chat'],
            img:'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=800&q=80',
            emoji:'🍦'
        },
        {
            id:3, name:'Tropical Paradise',
            sub:'Tropical Ice · La Marsa',
            place:'Tropical Ice, La Marsa',
            desc:'Exotic tropical ice creams and sorbets made with real fresh fruit. Mango, passion fruit, and guava are standout flavours.',
            rating:4.7, budget:'12-18 TND',
            timeline:['17:00 Arrive at La Marsa','17:15 Get tropical ice cream','17:30 Walk along beach promenade','18:30 Watch the sunset'],
            img:'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80',
            emoji:'🥭'
        },
        {
            id:4, name:'Classic Creamery',
            sub:'Vanilla Dreams · Sidi Bou Said',
            place:'Vanilla Dreams, Sidi Bou Said',
            desc:'Traditional creamery using century-old recipes and premium Sicilian vanilla. Timeless flavours done perfectly.',
            rating:4.6, budget:'10-16 TND',
            timeline:['15:30 Arrive in Sidi Bou Said','16:00 Ice cream time','16:30 Explore the village','18:00 Sunset at the café'],
            img:'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80',
            emoji:'🍧'
        },
        {
            id:5, name:'Choco Heaven',
            sub:'Chocolate Palace · La Marsa',
            place:'Chocolate Palace, La Marsa',
            desc:'A chocolate lover\'s dream. Dark, milk, and white chocolate gelato, plus hot chocolate fondue and brownie ice cream sandwiches.',
            rating:4.9, budget:'15-20 TND',
            timeline:['16:00 Arrive','16:15 Order indulgent treats','17:00 Walk & enjoy','17:45 Coffee & chocolate dessert'],
            img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
            emoji:'🍫'
        }
    ]
};

const SURPRISES = [
    { title:'Dinner + Sunset Walk', emoji:'🍽️🌅', combos:['dinner','beach'] },
    { title:'Coffee + Beach Walk',  emoji:'☕🏖️',  combos:['coffee','beach'] },
    { title:'Movie + Dinner',       emoji:'🎬🍽️', combos:['movie','dinner'] },
    { title:'Beach + Ice Cream',    emoji:'🏖️🍦',  combos:['beach','icecream'] },
    { title:'Coffee + Sunset',      emoji:'☕🌅',  combos:['coffee','beach'] },
    { title:'Ice Cream + Movie',    emoji:'🍦🎬',  combos:['icecream','movie'] },
    { title:'Dinner + Movie',       emoji:'🍽️🎬',  combos:['dinner','movie'] },
    { title:'Coffee + Ice Cream',   emoji:'☕🍦',   combos:['coffee','icecream'] }
];

// ─── INIT ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initIntro();
    initMusic();
    renderCalendar();
    buildGrids();
    fetchGenres();
});

// ─── INTRO ─────────────────────────────────────────
function initIntro() {
    const screen  = document.getElementById('introScreen');
    const main    = document.getElementById('mainSite');
    const btnYes  = document.getElementById('introYes');
    const btnNo   = document.getElementById('introNo');

    // Make "No" button run away
    const makeEscape = () => {
        const pad  = 20;
        const bw   = btnNo.offsetWidth  || 120;
        const bh   = btnNo.offsetHeight || 48;
        const maxX = window.innerWidth  - bw  - pad;
        const maxY = window.innerHeight - bh  - pad;
        const x = Math.random() * (maxX - pad) + pad;
        const y = Math.random() * (maxY - pad) + pad;
        btnNo.style.position  = 'fixed';
        btnNo.style.zIndex    = '9999';
        btnNo.style.left      = x + 'px';
        btnNo.style.top       = y + 'px';
        btnNo.style.transform = `rotate(${(Math.random()*16-8).toFixed(1)}deg)`;
    };

    btnNo.addEventListener('mouseenter', makeEscape);
    btnNo.addEventListener('click', e => { e.preventDefault(); makeEscape(); });

    document.addEventListener('mousemove', e => {
        const r = btnNo.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        if (Math.hypot(e.clientX - cx, e.clientY - cy) < 200) makeEscape();
    });

    btnYes.addEventListener('click', () => {
        screen.classList.add('fade-out');
        setTimeout(() => { screen.style.display = 'none'; }, 500);
        main.classList.remove('hidden');
        requestAnimationFrame(() => main.classList.add('visible'));
        generateHeartsBackground();
        tryAutoPlay();
    });
}

// ─── MUSIC ─────────────────────────────────────────
function initMusic() {
    const btn    = document.getElementById('musicBtn');
    const slider = document.getElementById('volSlider');
    const audio  = document.getElementById('bgMusic');

    // Reliable royalty-free romantic tracks (fallback chain)
    const tracks = [
        'https://cdn.pixabay.com/download/audio/2022/03/10/audio_f87b58da2c.mp3',
        'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d1718ab41b.mp3',
        'https://cdn.pixabay.com/download/audio/2021/11/25/audio_5f1869e4fe.mp3'
    ];
    let trackIdx = 0;
    audio.src = tracks[0];
    audio.volume = slider.value / 100;

    audio.addEventListener('error', () => {
        trackIdx = (trackIdx + 1) % tracks.length;
        audio.src = tracks[trackIdx];
        if (musicOn) audio.play().catch(() => {});
    });

    btn.addEventListener('click', () => {
        if (musicOn) {
            audio.pause();
            musicOn = false;
            btn.textContent = '🔇';
            btn.classList.add('muted');
        } else {
            audio.play().then(() => {
                musicOn = true;
                btn.textContent = '🔊';
                btn.classList.remove('muted');
            }).catch(() => {
                btn.textContent = '🔇';
            });
        }
    });

    slider.addEventListener('input', () => { audio.volume = slider.value / 100; });
}

function tryAutoPlay() {
    const audio  = document.getElementById('bgMusic');
    const btn    = document.getElementById('musicBtn');
    audio.play().then(() => {
        musicOn = true;
        btn.textContent = '🔊';
        btn.classList.remove('muted');
    }).catch(() => {
        btn.textContent = '🔇';
        btn.classList.add('muted');
    });
}

// ─── FLOATING HEARTS BACKGROUND ───────────────────
function generateHeartsBackground() {
    const container = document.getElementById('heartsBg');
    const hearts = ['💕','💗','💖','💝','💓'];
    for (let i = 0; i < 18; i++) {
        const h = document.createElement('div');
        h.className = 'heart-particle';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left   = Math.random() * 100 + '%';
        h.style.top    = Math.random() * 100 + '%';
        h.style.fontSize   = (Math.random() * 1.4 + .9) + 'rem';
        h.style.opacity    = (Math.random() * .2 + .05).toFixed(2);
        h.style.animationDuration  = (Math.random() * 5 + 7) + 's';
        h.style.animationDelay     = (Math.random() * 3) + 's';
        container.appendChild(h);
    }
}

// ─── CALENDAR ─────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function renderCalendar() {
    const y = calDate.getFullYear();
    const m = calDate.getMonth();
    document.getElementById('calMonthYear').textContent = MONTHS[m] + ' ' + y;

    const firstDay   = new Date(y, m, 1).getDay();
    const daysInMon  = new Date(y, m+1, 0).getDate();
    const daysInPrev = new Date(y, m, 0).getDate();
    const today      = new Date(); today.setHours(0,0,0,0);

    const grid = document.getElementById('calGrid');
    grid.innerHTML = '';

    // prev month filler
    for (let i = firstDay - 1; i >= 0; i--) {
        const d = document.createElement('div');
        d.className = 'cal-day other';
        d.textContent = daysInPrev - i;
        grid.appendChild(d);
    }

    // current month
    for (let i = 1; i <= daysInMon; i++) {
        const dateObj = new Date(y, m, i);
        dateObj.setHours(0,0,0,0);
        const d = document.createElement('div');
        d.textContent = i;

        if (dateObj < today) {
            d.className = 'cal-day past';
        } else {
            d.className = 'cal-day pick';
            const isSelected = selectedDate &&
                selectedDate.getFullYear() === y &&
                selectedDate.getMonth()    === m &&
                selectedDate.getDate()     === i;
            if (isSelected) d.classList.add('selected');
            d.addEventListener('click', () => pickDate(new Date(y, m, i)));
        }
        grid.appendChild(d);
    }

    // next month filler
    const total = grid.children.length;
    const fill  = total <= 35 ? 35 - total : 42 - total;
    for (let i = 1; i <= fill; i++) {
        const d = document.createElement('div');
        d.className = 'cal-day other';
        d.textContent = i;
        grid.appendChild(d);
    }
}

function pickDate(d) {
    selectedDate = d;
    renderCalendar();
    const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
    document.getElementById('selDateText').textContent = d.toLocaleDateString('en-US', opts);
}

function prevMonth() { calDate.setMonth(calDate.getMonth() - 1); renderCalendar(); }
function nextMonth() { calDate.setMonth(calDate.getMonth() + 1); renderCalendar(); }

function confirmDate() {
    if (!selectedDate) { alert('Please click a date on the calendar first! 💕'); return; }
    const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
    document.getElementById('confirmDateText').textContent = selectedDate.toLocaleDateString('en-US', opts);
    document.getElementById('confirmModal').classList.remove('hidden');
}
function closeConfirmModal() { document.getElementById('confirmModal').classList.add('hidden'); }

// ─── NAVIGATION ────────────────────────────────────
function smoothScroll(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function goPage(page) {
    // hide home
    document.getElementById('homeSections').style.display = 'none';
    // hide all pages
    document.querySelectorAll('.act-page').forEach(p => p.classList.add('hidden'));
    // show target
    const target = document.getElementById('page-' + page);
    if (target) { target.classList.remove('hidden'); window.scrollTo(0,0); }

    if (page === 'movie') loadMovies();
    if (page === 'surprise') {
        document.getElementById('surpriseResult').classList.add('hidden');
        document.getElementById('surpriseResult').innerHTML = '';
    }
}

function goHome() {
    document.getElementById('homeSections').style.display = '';
    document.querySelectorAll('.act-page').forEach(p => p.classList.add('hidden'));
    window.scrollTo({ top:0, behavior:'smooth' });
}

// ─── BUILD GRIDS ────────────────────────────────────
function buildGrids() {
    buildGrid('dinnerGrid',   DATA.dinner,   'dinner');
    buildGrid('coffeeGrid',   DATA.coffee,   'coffee');
    buildGrid('beachGrid',    DATA.beach,    'beach');
    buildGrid('icecreamGrid', DATA.icecream, 'icecream');
}

function buildGrid(gridId, items, type) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = items.map(item => `
        <div class="opt-card">
            <div class="opt-img">
                <img src="${item.img}" alt="${item.name}"
                     loading="lazy"
                     onerror="this.parentElement.innerHTML='<div class=\\'img-fallback\\'>${item.emoji}</div>'">
            </div>
            <div class="opt-body">
                <p class="opt-title">${item.name}</p>
                <p class="opt-sub">${item.sub}</p>
                <p class="opt-desc">${item.desc}</p>
                <p class="opt-rating">⭐ ${item.rating} &nbsp;·&nbsp; ${item.budget}</p>
            </div>
            <div class="opt-footer">
                <button class="select-btn" onclick="selectActivity('${type}',${item.id})">
                    Select This 💕
                </button>
            </div>
        </div>
    `).join('');
}

// ─── ACTIVITY SELECTION ─────────────────────────────
function selectActivity(type, id) {
    if (!selectedDate) {
        alert('Please select a date first! 💕\n\nScroll up to the "When Shall I Pick You Up?" section and click a date on the calendar.');
        return;
    }
    const pool = DATA[type];
    const item = pool.find(x => x.id === id);
    if (!item) return;

    selectedAct = {
        type,
        activityLabel: { dinner:'Dinner Date', coffee:'Coffee Date', beach:'Beach Walk', icecream:'Ice Cream Date' }[type] || type,
        name:   item.name,
        place:  item.place,
        image:  item.img,
        emoji:  item.emoji,
        timeline: item.timeline,
        desc:   item.desc,
        budget: item.budget,
        rating: item.rating
    };

    showFinalPage();
}

// ─── MOVIE SYSTEM ──────────────────────────────────
async function fetchGenres() {
    try {
        const r = await fetch(`${TMDB_BASE}/genre/movie/list?language=en-US`, { headers: TMDB_HDRS });
        const d = await r.json();
        tmdbGenres = Object.fromEntries((d.genres || []).map(g => [g.id, g.name]));
    } catch(e) { /* silent */ }
}

async function loadMovies() {
    const loading = document.getElementById('movieLoading');
    const grid    = document.getElementById('movieGrid');
    loading.classList.remove('hidden');
    grid.innerHTML = '';

    try {
        const r = await fetch(`${TMDB_BASE}/trending/movie/week?language=en-US`, { headers: TMDB_HDRS });
        if (!r.ok) throw new Error('TMDB fetch failed');
        const d = await r.json();
        trendingMovies = (d.results || []).slice(0, 10);

        loading.classList.add('hidden');

        if (!trendingMovies.length) {
            grid.innerHTML = '<p style="color:#888;text-align:center;padding:3rem;">No movies found. Please try again.</p>';
            return;
        }

        grid.innerHTML = trendingMovies.map((mv, idx) => {
            const genres  = (mv.genre_ids || []).map(id => tmdbGenres[id]).filter(Boolean).join(', ') || 'Film';
            const poster  = mv.poster_path ? `${TMDB_IMG}${mv.poster_path}` : '';
            const rating  = mv.vote_average ? mv.vote_average.toFixed(1) : 'N/A';
            const release = mv.release_date ? mv.release_date.slice(0,4) : '—';
            return `
                <div class="movie-card" onclick="openMovieModal(${idx})">
                    <div class="mc-poster">
                        ${poster
                            ? `<img src="${poster}" alt="${escHtml(mv.title)}" loading="lazy">`
                            : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;">🎬</div>`
                        }
                    </div>
                    <div class="mc-body">
                        <p class="mc-title">${escHtml(mv.title)}</p>
                        <p class="mc-genre">${escHtml(genres)}</p>
                        <div class="mc-row">
                            <span>📅 ${release}</span>
                            <span class="mc-rating">⭐ ${rating}</span>
                        </div>
                    </div>
                </div>`;
        }).join('');

    } catch(err) {
        loading.innerHTML = `<p style="color:#e91e8c;">Failed to load movies. Please check your connection and try again.</p>`;
        console.error(err);
    }
}

async function openMovieModal(idx) {
    const mv = trendingMovies[idx];
    if (!mv) return;
    activeMovie = mv;

    const modal = document.getElementById('movieModal');
    modal.classList.remove('hidden');

    // Fill basic info immediately
    document.getElementById('mmTitle').textContent    = mv.title;
    document.getElementById('mmRelease').textContent  = mv.release_date || 'TBA';
    document.getElementById('mmDuration').textContent = '…';
    document.getElementById('mmGenre').textContent    = (mv.genre_ids||[]).map(id=>tmdbGenres[id]).filter(Boolean).join(', ') || '—';
    document.getElementById('mmRating').textContent   = mv.vote_average ? mv.vote_average.toFixed(1) : 'N/A';
    document.getElementById('mmSynopsis').textContent = mv.overview || 'A film worth watching together.';
    document.getElementById('mmTrailer').innerHTML    = '<p style="color:#aaa;font-size:.9rem;">Loading trailer…</p>';

    const posterSrc = mv.poster_path ? `${TMDB_HDIMG}${mv.poster_path}` : '';
    document.getElementById('mmPoster').innerHTML = posterSrc
        ? `<img src="${posterSrc}" alt="${escHtml(mv.title)}">`
        : `<div style="display:flex;align-items:center;justify-content:center;height:300px;font-size:5rem;background:var(--grad2)">🎬</div>`;

    // Fetch full details + trailer in parallel
    try {
        const [detailRes, videoRes] = await Promise.all([
            fetch(`${TMDB_BASE}/movie/${mv.id}?language=en-US`, { headers: TMDB_HDRS }),
            fetch(`${TMDB_BASE}/movie/${mv.id}/videos?language=en-US`, { headers: TMDB_HDRS })
        ]);
        const detail = await detailRes.json();
        const videos = await videoRes.json();

        document.getElementById('mmDuration').textContent = detail.runtime || '120';
        if (detail.genres?.length) {
            document.getElementById('mmGenre').textContent = detail.genres.map(g=>g.name).join(', ');
        }

        const trailer = (videos.results||[]).find(v => v.type==='Trailer' && v.site==='YouTube');
        document.getElementById('mmTrailer').innerHTML = trailer
            ? `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen style="width:100%;height:220px;border:none;border-radius:12px;margin-top:.5rem;"></iframe>`
            : '<p style="color:#aaa;font-size:.9rem;">Trailer not available.</p>';
    } catch(e) {
        document.getElementById('mmDuration').textContent = '120';
        document.getElementById('mmTrailer').innerHTML = '';
    }
}

function closeMovieModal() {
    document.getElementById('movieModal').classList.add('hidden');
    // stop iframe audio
    const mmT = document.getElementById('mmTrailer');
    mmT.innerHTML = '';
}

function pickMovie() {
    if (!selectedDate) {
        alert('Please select a date first! 💕\n\nGo back home and pick a date on the calendar.');
        return;
    }
    if (!activeMovie) return;

    const mv = activeMovie;
    const genres = (mv.genre_ids||[]).map(id=>tmdbGenres[id]).filter(Boolean).join(', ') || 'Film';
    const poster = mv.poster_path ? `${TMDB_HDIMG}${mv.poster_path}` : null;

    selectedAct = {
        type: 'movie',
        activityLabel: 'Movie Night',
        name:   mv.title,
        place:  `Cinema — ${mv.title}`,
        image:  poster,
        emoji:  '🎬',
        timeline: ['17:30 Meet for dinner','18:30 Walk to cinema','19:00 Movie starts','21:30 Chat about the film','22:00 Late night dessert'],
        desc:   mv.overview || 'A thrilling film to enjoy together on the big screen.',
        budget: '50-70 TND',
        rating: mv.vote_average ? mv.vote_average.toFixed(1) : '—'
    };

    closeMovieModal();
    showFinalPage();
}

// ─── SURPRISE DATE ─────────────────────────────────
function genSurprise() {
    if (!selectedDate) {
        alert('Please select a date first! 💕\n\nGo back home and pick a date on the calendar.');
        return;
    }
    const pick = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
    const resultEl = document.getElementById('surpriseResult');
    resultEl.classList.remove('hidden');

    const itemsHtml = pick.combos.map(type => {
        const pool = DATA[type];
        if (!pool) {
            return `<div class="sur-item"><strong>${type.toUpperCase()}:</strong> A special ${type} experience in Tunisia</div>`;
        }
        const item = pool[Math.floor(Math.random() * pool.length)];
        return `<div class="sur-item"><strong>${type.toUpperCase()}:</strong> ${item.name} — ${item.place}</div>`;
    }).join('');

    resultEl.innerHTML = `
        <p class="sur-title">${pick.emoji} ${pick.title}</p>
        <div class="sur-items">${itemsHtml}</div>
        <div class="sur-btns">
            <button class="pill-btn" onclick="acceptSurprise('${escHtml(pick.title)}','${escHtml(pick.emoji)}')">✅ Accept This Plan</button>
            <button class="pill-btn pill-sec" onclick="genSurprise()">🎲 Try Another</button>
        </div>`;
}

function acceptSurprise(title, emoji) {
    selectedAct = {
        type: 'surprise',
        activityLabel: 'Surprise Date',
        name:   title,
        place:  'Multiple Magical Locations',
        image:  null,
        emoji:  emoji || '🎁',
        timeline: ['17:00 First surprise activity','18:30 Walk & transit','19:00 Second surprise activity','20:30 Sweet ending'],
        desc:   'A carefully curated surprise date combining the best of Tunisia — romantic, spontaneous, and absolutely unforgettable.',
        budget: '80-180 TND',
        rating: '5.0'
    };
    showFinalPage();
}

// ─── FINAL DATE PAGE ────────────────────────────────
function showFinalPage() {
    if (!selectedDate || !selectedAct) return;

    const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
    const dateStr = selectedDate.toLocaleDateString('en-US', opts);

    document.getElementById('fDate').textContent     = dateStr;
    document.getElementById('fActivity').textContent = selectedAct.activityLabel;
    document.getElementById('fPlace').textContent    = selectedAct.place;

    // Place label per type
    const placeLabels = { dinner:'🍽️ Restaurant', coffee:'☕ Café', beach:'🌊 Beach Location', icecream:'🍦 Ice Cream Spot', movie:'🎬 Movie', surprise:'🎁 Surprise Plan' };
    document.getElementById('fPlaceLabel').textContent = placeLabels[selectedAct.type] || '📍 Place';

    // Hero image
    const heroEl = document.getElementById('finalHero');
    if (selectedAct.image) {
        heroEl.innerHTML = `<img src="${selectedAct.image}" alt="${escHtml(selectedAct.name)}" onerror="this.parentElement.innerHTML='<div class=\\'fh-emoji\\'>${selectedAct.emoji}</div>'">`;
    } else {
        heroEl.innerHTML = `<div class="fh-emoji">${selectedAct.emoji}</div>`;
    }

    // Timeline
    const tlEl = document.getElementById('fTimeline');
    tlEl.innerHTML = selectedAct.timeline.map(entry => {
        const spaceIdx = entry.indexOf(' ');
        const time = spaceIdx > 0 ? entry.slice(0, spaceIdx) : entry;
        const act  = spaceIdx > 0 ? entry.slice(spaceIdx + 1) : '';
        return `<div class="tl-item"><span class="tl-time">${time}</span><span class="tl-act">${act}</span></div>`;
    }).join('');

    // Description
    document.getElementById('fDesc').textContent = selectedAct.desc;

    // Navigate to final page
    goPage('final');
}

function finishDate() {
    selectedAct = null;
    goHome();
}

// ─── CONFETTI ──────────────────────────────────────
function confettiBurst() {
    const emojis = ['💕','💗','💖','💝','✨','🌹','💓'];
    for (let i = 0; i < 35; i++) {
        const c = document.createElement('div');
        c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        Object.assign(c.style, {
            position: 'fixed',
            left:     Math.random() * 100 + 'vw',
            top:      '-5vh',
            fontSize: (Math.random() * 1.2 + 1) + 'rem',
            zIndex:   '9999',
            pointerEvents: 'none',
            animation: `confettiFall ${(Math.random()*2+2).toFixed(1)}s linear ${(Math.random()*.4).toFixed(2)}s forwards`
        });
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4500);
    }
}

// Add confetti keyframe dynamically
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `@keyframes confettiFall { to { transform: translateY(110vh) rotate(360deg); opacity: 0; } }`;
document.head.appendChild(confettiStyle);

// ─── CLOSE MODALS ON BACKDROP CLICK ───────────────
document.addEventListener('click', e => {
    if (e.target.id === 'movieModal')  closeMovieModal();
    if (e.target.id === 'confirmModal') closeConfirmModal();
});

// ─── KEYBOARD CALENDAR NAV ─────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  prevMonth();
    if (e.key === 'ArrowRight') nextMonth();
    if (e.key === 'Escape') {
        closeMovieModal();
        closeConfirmModal();
    }
});

// ─── HELPER ────────────────────────────────────────
function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}