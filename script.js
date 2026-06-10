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
let activeMovie    = null;   // movie chosen in modal
let activeGenreKey = null;   // currently selected genre key

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
    buildGenreGrid();
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

    if (page === 'movie') resetMoviePage();
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

// ─── LOCAL MOVIE DATABASE (offline — no API) ───────

const GENRES = [
    { key:'action',    label:'Action',    emoji:'🔥', color:'#ff4d4d' },
    { key:'romance',   label:'Romance',   emoji:'❤️', color:'#ff69b4' },
    { key:'comedy',    label:'Comedy',    emoji:'😂', color:'#ffd700' },
    { key:'horror',    label:'Horror',    emoji:'👻', color:'#8b00ff' },
    { key:'scifi',     label:'Sci-Fi',    emoji:'🚀', color:'#00bfff' },
    { key:'adventure', label:'Adventure', emoji:'🗺️', color:'#3cb371' },
    { key:'animation', label:'Animation', emoji:'🎨', color:'#ff8c00' },
    { key:'thriller',  label:'Thriller',  emoji:'😱', color:'#2f4f4f' }
];

const MOVIES = {
    action: [
        { title:'Mission: Impossible – Fallout', year:'2018', duration:'2h 27m', director:'Christopher McQuarrie', cast:'Tom Cruise, Henry Cavill, Rebecca Ferguson', rating:'⭐ 7.7/10', desc:'Ethan Hunt and his IMF team race to retrieve stolen plutonium before a global catastrophe — a relentless, breathtaking action masterpiece.', emoji:'💥', img:'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=400&q=80' },
        { title:'John Wick', year:'2014', duration:'1h 41m', director:'Chad Stahelski', cast:'Keanu Reeves, Michael Nyqvist, Alfie Allen', rating:'⭐ 7.4/10', desc:'A legendary assassin comes out of retirement to seek revenge after his puppy is killed. One of the greatest action movies ever made.', emoji:'🐶', img:'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&w=400&q=80' },
        { title:'Mad Max: Fury Road', year:'2015', duration:'2h 0m', director:'George Miller', cast:'Tom Hardy, Charlize Theron', rating:'⭐ 8.1/10', desc:'In a post-apocalyptic wasteland, Max joins forces with rebel warrior Furiosa to escape a tyrant. A visual, adrenaline-fuelled triumph.', emoji:'🚗', img:'https://images.unsplash.com/photo-1553861215-14786a921b8a?auto=format&fit=crop&w=400&q=80' },
        { title:'The Dark Knight', year:'2008', duration:'2h 32m', director:'Christopher Nolan', cast:'Christian Bale, Heath Ledger, Aaron Eckhart', rating:'⭐ 9.0/10', desc:'Batman faces his greatest threat yet: the Joker, a criminal mastermind who delights in chaos. A genre-defining superhero film.', emoji:'🦇', img:'https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?auto=format&fit=crop&w=400&q=80' },
        { title:'Gladiator', year:'2000', duration:'2h 35m', director:'Ridley Scott', cast:'Russell Crowe, Joaquin Phoenix, Connie Nielsen', rating:'⭐ 8.5/10', desc:'A betrayed Roman general becomes a slave, then a gladiator, seeking justice against the corrupt emperor who murdered his family.', emoji:'⚔️', img:'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80' }
    ],
    romance: [
        { title:'The Notebook', year:'2004', duration:'2h 3m', director:'Nick Cassavetes', cast:'Ryan Gosling, Rachel McAdams', rating:'⭐ 7.8/10', desc:'A poor and passionate young man falls for a rich young woman in 1940s South Carolina — a timeless love story that will make you cry.', emoji:'📖', img:'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=400&q=80' },
        { title:'Titanic', year:'1997', duration:'3h 14m', director:'James Cameron', cast:'Leonardo DiCaprio, Kate Winslet', rating:'⭐ 7.9/10', desc:'Two strangers fall madly in love aboard the doomed RMS Titanic. One of cinema\'s greatest epic love stories of all time.', emoji:'🚢', img:'https://images.unsplash.com/photo-1519455953755-af066f52f1a6?auto=format&fit=crop&w=400&q=80' },
        { title:'Me Before You', year:'2016', duration:'1h 50m', director:'Thea Sharrock', cast:'Emilia Clarke, Sam Claflin', rating:'⭐ 7.4/10', desc:'A small-town girl takes a job as caretaker for a quadriplegic man. What starts as a job becomes an extraordinary love story.', emoji:'🌸', img:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
        { title:'La La Land', year:'2016', duration:'2h 8m', director:'Damien Chazelle', cast:'Ryan Gosling, Emma Stone', rating:'⭐ 8.0/10', desc:'A jazz pianist and an aspiring actress fall in love in Los Angeles, but as their dreams take shape, their relationship faces a difficult reality.', emoji:'🎶', img:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80' },
        { title:'Pride & Prejudice', year:'2005', duration:'2h 9m', director:'Joe Wright', cast:'Keira Knightley, Matthew Macfadyen', rating:'⭐ 7.8/10', desc:'Spirited Elizabeth Bennet navigates issues of manners, education, and marriage in the British Regency era — a gorgeous adaptation.', emoji:'🏡', img:'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=400&q=80' }
    ],
    comedy: [
        { title:'The Mask', year:'1994', duration:'1h 41m', director:'Chuck Russell', cast:'Jim Carrey, Cameron Diaz', rating:'⭐ 6.9/10', desc:'A timid banker discovers a magical mask that transforms him into a wacky, larger-than-life character. Jim Carrey at his most gloriously unhinged.', emoji:'🎭', img:'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80' },
        { title:'Home Alone', year:'1990', duration:'1h 43m', director:'Chris Columbus', cast:'Macaulay Culkin, Joe Pesci, Daniel Stern', rating:'⭐ 7.7/10', desc:'An 8-year-old boy is accidentally left behind while his family flies to Paris. He must defend his home against two bumbling burglars.', emoji:'🏠', img:'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80' },
        { title:"Mr. Bean's Holiday", year:'2007', duration:'1h 29m', director:'Steve Bendelack', cast:'Rowan Atkinson, Emma de Caunes', rating:'⭐ 6.6/10', desc:'Mr. Bean wins a trip to Cannes and causes mayhem throughout France. A charming, laugh-out-loud silent comedy road trip.', emoji:'🧳', img:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80' },
        { title:'Dumb and Dumber', year:'1994', duration:'1h 47m', director:'Farrelly Brothers', cast:'Jim Carrey, Jeff Daniels', rating:'⭐ 7.3/10', desc:'Two clueless best friends embark on a cross-country road trip to return a briefcase to a woman one of them has a crush on.', emoji:'🚌', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title:'The Hangover', year:'2009', duration:'1h 40m', director:'Todd Phillips', cast:'Bradley Cooper, Zach Galifianakis, Ed Helms', rating:'⭐ 7.7/10', desc:'Three friends must piece together the previous night after a wild Las Vegas bachelor party goes spectacularly, hilariously wrong.', emoji:'🎰', img:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=400&q=80' }
    ],
    horror: [
        { title:'The Conjuring', year:'2013', duration:'1h 52m', director:'James Wan', cast:'Vera Farmiga, Patrick Wilson', rating:'⭐ 7.5/10', desc:'Paranormal investigators Ed and Lorraine Warren are called to help a family terrorized by a dark presence in their farmhouse. Based on true events.', emoji:'👁️', img:'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80' },
        { title:'Insidious', year:'2010', duration:'1h 43m', director:'James Wan', cast:'Patrick Wilson, Rose Byrne', rating:'⭐ 6.8/10', desc:'A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further. Atmospheric, genuinely frightening horror.', emoji:'🕯️', img:'https://images.unsplash.com/photo-1515630278258-407f994731fe?auto=format&fit=crop&w=400&q=80' },
        { title:'The Nun', year:'2018', duration:'1h 36m', director:'Corin Hardy', cast:'Taissa Farmiga, Demián Bichir', rating:'⭐ 5.3/10', desc:'A priest and a novitiate are sent by the Vatican to investigate a mysterious death at a remote Romanian abbey haunted by a demonic nun.', emoji:'⛪', img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
        { title:'IT', year:'2017', duration:'2h 15m', director:'Andy Muschietti', cast:'Jaeden Martell, Bill Skarsgård', rating:'⭐ 7.3/10', desc:'Seven young outcasts in Derry, Maine face Pennywise, an ancient shape-shifting evil that emerges from the sewers every 27 years.', emoji:'🎈', img:'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=400&q=80' },
        { title:'Annabelle', year:'2014', duration:'1h 39m', director:'John R. Leonetti', cast:'Annabelle Wallis, Ward Horton', rating:'⭐ 5.4/10', desc:'A couple begin to experience terrifying supernatural occurrences after a vintage doll named Annabelle enters their home.', emoji:'🪆', img:'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80' }
    ],
    scifi: [
        { title:'Interstellar', year:'2014', duration:'2h 49m', director:'Christopher Nolan', cast:'Matthew McConaughey, Anne Hathaway, Jessica Chastain', rating:'⭐ 8.7/10', desc:'A team of explorers travel through a wormhole in space to ensure humanity\'s survival. A breathtaking, emotionally devastating masterpiece.', emoji:'🌌', img:'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80' },
        { title:'Inception', year:'2010', duration:'2h 28m', director:'Christopher Nolan', cast:'Leonardo DiCaprio, Ellen Page, Tom Hardy', rating:'⭐ 8.8/10', desc:'A thief enters the dreams of others to steal their secrets, but is given a chance to have his criminal record erased if he can implant an idea.', emoji:'🌀', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' },
        { title:'Avatar', year:'2009', duration:'2h 42m', director:'James Cameron', cast:'Sam Worthington, Zoe Saldana, Sigourney Weaver', rating:'⭐ 7.9/10', desc:'A paraplegic marine on the alien world Pandora falls in love with a Na\'vi native. A visual revolution and a stunning cinematic event.', emoji:'💙', img:'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=400&q=80' },
        { title:'The Matrix', year:'1999', duration:'2h 16m', director:'Wachowski Sisters', cast:'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', rating:'⭐ 8.7/10', desc:'A hacker discovers reality as he knows it is a simulation, and joins a rebellion against the machines that created it. A genre-defining film.', emoji:'💊', img:'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80' },
        { title:'Dune', year:'2021', duration:'2h 35m', director:'Denis Villeneuve', cast:'Timothée Chalamet, Zendaya, Oscar Isaac', rating:'⭐ 8.0/10', desc:'A noble family becomes embroiled in a war for control over the most valuable substance in the universe on a desert planet. Epic sci-fi cinema.', emoji:'🏜️', img:'https://images.unsplash.com/photo-1532188363366-3a1b2ac4a338?auto=format&fit=crop&w=400&q=80' }
    ],
    adventure: [
        { title:'Indiana Jones: Raiders', year:'1981', duration:'1h 55m', director:'Steven Spielberg', cast:'Harrison Ford, Karen Allen', rating:'⭐ 8.4/10', desc:'Archaeologist Indiana Jones races against Nazi agents to find the mythical Ark of the Covenant before they can use its power.', emoji:'🪖', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80' },
        { title:'Pirates of the Caribbean', year:'2003', duration:'2h 23m', director:'Gore Verbinski', cast:'Johnny Depp, Orlando Bloom, Keira Knightley', rating:'⭐ 8.1/10', desc:'The swashbuckling Captain Jack Sparrow teams with a young blacksmith to rescue a governor\'s daughter from cursed pirates.', emoji:'🏴‍☠️', img:'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=400&q=80' },
        { title:'Jumanji: Welcome to the Jungle', year:'2017', duration:'1h 59m', director:'Jake Kasdan', cast:'Dwayne Johnson, Jack Black, Kevin Hart', rating:'⭐ 6.9/10', desc:'Four teenagers are sucked into a magical video game and must work together to survive and escape. Hilarious, thrilling adventure fun.', emoji:'🎮', img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
        { title:'Uncharted', year:'2022', duration:'1h 56m', director:'Ruben Fleischer', cast:'Tom Holland, Mark Wahlberg', rating:'⭐ 6.3/10', desc:'Treasure hunter Nathan Drake sets off on a globe-trotting expedition to find a $5 billion fortune lost by Magellan 500 years ago.', emoji:'🗺️', img:'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=400&q=80' },
        { title:'Jungle Cruise', year:'2021', duration:'2h 7m', director:'Jaume Collet-Serra', cast:'Dwayne Johnson, Emily Blunt', rating:'⭐ 6.6/10', desc:'A wisecracking riverboat captain takes a scientist on a quest through the Amazon to find the legendary Tree of Life — wild adventure awaits.', emoji:'🌿', img:'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80' }
    ],
    animation: [
        { title:'Toy Story', year:'1995', duration:'1h 21m', director:'John Lasseter', cast:'Tom Hanks, Tim Allen', rating:'⭐ 8.3/10', desc:'A cowboy toy is threatened when a new spaceman toy arrives and takes his place as top toy. Pixar\'s landmark masterpiece about friendship.', emoji:'🤠', img:'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80' },
        { title:'Frozen', year:'2013', duration:'1h 42m', director:'Jennifer Lee & Chris Buck', cast:'Idina Menzel, Kristen Bell', rating:'⭐ 7.4/10', desc:'When the kingdom of Arendelle is plunged into eternal winter by Queen Elsa\'s powers, her sister Anna embarks on an extraordinary journey.', emoji:'❄️', img:'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&q=80' },
        { title:'Coco', year:'2017', duration:'1h 45m', director:'Lee Unkrich', cast:'Anthony Gonzalez, Gael García Bernal', rating:'⭐ 8.4/10', desc:'A young boy travels to the Land of the Dead to find his great-great-grandfather and bring his music back to his family. Stunningly beautiful.', emoji:'💀', img:'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&w=400&q=80' },
        { title:'Moana', year:'2016', duration:'1h 53m', director:'John Musker & Ron Clements', cast:'Auli\'i Cravalho, Dwayne Johnson', rating:'⭐ 7.6/10', desc:'A spirited teenager sails across the ocean to find a fabled demigod and save her people. A gorgeous, inspiring Polynesian adventure.', emoji:'🌊', img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
        { title:'Inside Out', year:'2015', duration:'1h 35m', director:'Pete Docter', cast:'Amy Poehler, Mindy Kaling, Bill Hader', rating:'⭐ 8.1/10', desc:'The emotions inside a young girl\'s mind clash as she adjusts to a new life in San Francisco. Pixar\'s most emotionally intelligent film.', emoji:'🧠', img:'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80' }
    ],
    thriller: [
        { title:'Se7en', year:'1995', duration:'2h 7m', director:'David Fincher', cast:'Brad Pitt, Morgan Freeman, Kevin Spacey', rating:'⭐ 8.6/10', desc:'Two detectives hunt a serial killer who uses the seven deadly sins as his motives. A dark, unforgettable psychological thriller.', emoji:'🔍', img:'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=400&q=80' },
        { title:'Shutter Island', year:'2010', duration:'2h 18m', director:'Martin Scorsese', cast:'Leonardo DiCaprio, Mark Ruffalo', rating:'⭐ 8.1/10', desc:'A U.S. Marshal investigates the disappearance of a patient from a Boston mental institution. Nothing is what it seems in this mind-bending thriller.', emoji:'🏝️', img:'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80' },
        { title:'Gone Girl', year:'2014', duration:'2h 29m', director:'David Fincher', cast:'Ben Affleck, Rosamund Pike', rating:'⭐ 8.1/10', desc:'When a man\'s wife suddenly disappears on their fifth wedding anniversary, he becomes the prime suspect. A razor-sharp psychological masterpiece.', emoji:'👰', img:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80' },
        { title:'Prisoners', year:'2013', duration:'2h 33m', director:'Denis Villeneuve', cast:'Hugh Jackman, Jake Gyllenhaal', rating:'⭐ 8.1/10', desc:'When two girls go missing on Thanksgiving, a desperate father takes matters into his own hands while a detective races to find the children.', emoji:'🚪', img:'https://images.unsplash.com/photo-1519098901909-b1553a1190af?auto=format&fit=crop&w=400&q=80' },
        { title:'Zodiac', year:'2007', duration:'2h 37m', director:'David Fincher', cast:'Jake Gyllenhaal, Mark Ruffalo, Robert Downey Jr.', rating:'⭐ 7.7/10', desc:'A cartoonist becomes obsessed with tracking down the Zodiac killer — the elusive serial killer who sent cryptic letters to the press in 1970s California.', emoji:'♑', img:'https://images.unsplash.com/photo-1533477359076-5f8ac4f9c8d3?auto=format&fit=crop&w=400&q=80' }
    ]
};

// shuffle array helper
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ─── BUILD GENRE GRID ──────────────────────────────
function buildGenreGrid() {
    const grid = document.getElementById('genreGrid');
    if (!grid) return;
    grid.innerHTML = GENRES.map(g => `
        <div class="genre-card" onclick="selectGenre('${g.key}')" id="gc-${g.key}">
            <span class="genre-icon">${g.emoji}</span>
            <p class="genre-name">${g.label}</p>
            <p class="genre-count">${MOVIES[g.key].length} films</p>
        </div>
    `).join('');
}

// ─── SELECT GENRE → SHOW MOVIES ───────────────────
function selectGenre(key) {
    activeGenreKey = key;
    const genre = GENRES.find(g => g.key === key);

    // highlight selected genre card
    document.querySelectorAll('.genre-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('gc-' + key)?.classList.add('selected');

    // update label
    document.getElementById('chosenGenreLabel').textContent = `${genre.emoji} ${genre.label}`;

    // shuffle and render movies — store shuffled order for modal
    window._currentMovies = shuffle(MOVIES[key]);
    window._currentGenreKey = key;
    const movies = window._currentMovies;

    const grid = document.getElementById('movieGrid');
    grid.innerHTML = movies.map((mv, idx) => {
        const hasImg = mv.img && mv.img.length > 0;
        const safePfEmoji = mv.emoji;
        const safePfTitle = escHtml(mv.title);
        const posterHtml = hasImg
            ? `<img src="${mv.img}" alt="${escHtml(mv.title)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;mc-poster-fallback&quot;><span class=&quot;pf-emoji&quot;>${safePfEmoji}</span><span class=&quot;pf-title&quot;>${safePfTitle}</span></div>'">`
            : `<div class="mc-poster-fallback"><span class="pf-emoji">${mv.emoji}</span><span class="pf-title">${escHtml(mv.title)}</span></div>`;
        return `
        <div class="movie-card" onclick="openMovieModal(${idx})" style="animation-delay:${idx * 0.06}s">
            <div class="mc-poster">
                ${posterHtml}
                <span class="mc-genre-ribbon">${genre.label}</span>
            </div>
            <div class="mc-body">
                <p class="mc-title">${escHtml(mv.title)}</p>
                <p class="mc-year">${mv.year} · ${mv.duration}</p>
                <p class="mc-desc">${mv.desc.slice(0,80)}…</p>
                <div class="mc-row">
                    <span>🎬 ${escHtml(mv.director.split(',')[0])}</span>
                    <span class="mc-rating">${mv.rating}</span>
                </div>
            </div>
        </div>`;
    }).join('');

    // switch steps
    document.getElementById('genreStep').classList.add('hidden');
    document.getElementById('movieStep').classList.remove('hidden');
}

// ─── BACK TO GENRES ────────────────────────────────
function backToGenres() {
    document.getElementById('genreStep').classList.remove('hidden');
    document.getElementById('movieStep').classList.add('hidden');
    activeGenreKey = null;
}

// ─── RESET MOVIE PAGE (called when entering page) ──
function resetMoviePage() {
    document.getElementById('genreStep').classList.remove('hidden');
    document.getElementById('movieStep').classList.add('hidden');
    document.getElementById('movieGrid').innerHTML = '';
    activeGenreKey = null;
    // re-render genre grid (fresh shuffle next time)
    buildGenreGrid();
}

// ─── OPEN MOVIE MODAL ──────────────────────────────
function openMovieModal(idx) {
    const genreKey = window._currentGenreKey;
    const mv = window._currentMovies?.[idx];
    if (!mv || !genreKey) return;
    activeMovie = { ...mv, genreKey };

    const genre = GENRES.find(g => g.key === genreKey);

    document.getElementById('mmGenreBadge').textContent = `${genre.emoji} ${genre.label}`;
    document.getElementById('mmTitle').textContent      = mv.title;
    document.getElementById('mmRelease').textContent    = mv.year;
    document.getElementById('mmDuration').textContent   = mv.duration;
    document.getElementById('mmDirector').textContent   = mv.director;
    document.getElementById('mmRating').textContent     = mv.rating;
    document.getElementById('mmSynopsis').textContent   = mv.desc;
    document.getElementById('mmCast').textContent       = mv.cast;

    const posterEl = document.getElementById('mmPoster');
    if (mv.img) {
        posterEl.innerHTML = `<img src="${mv.img}" alt="${escHtml(mv.title)}" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:320px;font-size:5rem;background:var(--grad2)\\'>${mv.emoji}</div>'">`;
    } else {
        posterEl.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:320px;font-size:5rem;background:var(--grad2)">${mv.emoji}</div>`;
    }

    document.getElementById('movieModal').classList.remove('hidden');
}

function closeMovieModal() {
    document.getElementById('movieModal').classList.add('hidden');
}

function pickMovie() {
    if (!selectedDate) {
        alert('Please select a date first! 💕\n\nGo back home and pick a date on the calendar.');
        return;
    }
    if (!activeMovie) return;

    const mv = activeMovie;
    selectedAct = {
        type: 'movie',
        activityLabel: 'Movie Night',
        name:   mv.title,
        place:  `Cinema — ${mv.title}`,
        image:  mv.img || null,
        emoji:  mv.emoji || '🎬',
        timeline: ['17:30 Meet for dinner','18:30 Walk to the cinema','19:00 Movie starts','21:30 Chat about the film','22:00 Late night dessert'],
        desc:   mv.desc,
        budget: '50-70 TND',
        rating: mv.rating
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