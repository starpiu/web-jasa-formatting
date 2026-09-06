/**
 * FormatIlmiah - Application Logic & Interactive Features
 * Modern, High Performance, Vanilla JavaScript ES6+
 */

// KONFIGURASI UTAMA
const CONFIG = {
    // Ganti nomor di bawah ini dengan nomor WhatsApp Anda (format: 628xxxxxxxx)
    WHATSAPP_NUMBER: '6281234567890'
};

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileDrawer();
    initBeforeAfterSlider();
    initStatCounters();
    initScrollSpy();
    updateCalcTotal();
});

/* ==========================================================================
   1. Navigation & Mobile Drawer
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

function initMobileDrawer() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* ==========================================================================
   2. Interactive Before-After Document Slider
   ========================================================================== */
const sampleData = {
    toc: {
        before: `
            <div class="doc-mockup-sheet messy" style="font-family: Arial, sans-serif; font-size: 0.85rem;">
                <h4 style="text-align: center; margin-bottom: 1rem; color: #dc2626; font-size: 1rem;">DAFTAR ISI (Manual Berantakan)</h4>
                <div style="line-height: 2;">
                    <div>Halaman Judul ......................................... i</div>
                    <div>Lembar Pengesahan ............................ ii</div>
                    <div>Abstrak .................................................. iii</div>
                    <div>BAB I PENDAHULUAN .................. 1</div>
                    <div style="padding-left: 15px;">1.1 Latar Belakang Masalah .......... 1</div>
                    <div style="padding-left: 15px;">1.2 Rumusan Masalah .................... 4</div>
                    <div>BAB II TINJAUAN PUSTAKA ......... 6</div>
                    <div style="padding-left: 15px;">2.1 Landasan Teori .......................... 6</div>
                    <div style="padding-left: 15px;">2.2 Penelitian Terdahulu ................ 12</div>
                    <div>BAB III METODE PENELITIAN .... 18</div>
                    <div>DAFTAR PUSTAKA ......................... 25</div>
                </div>
                <div style="margin-top: 1rem; color: #dc2626; font-size: 0.75rem; background: #fee2e2; padding: 4px 8px; border-radius: 4px;">
                    ⚠️ Titik-titik diketik spasi manual, nomor halaman tidak sejajar, tidak auto-update saat halaman bertambah.
                </div>
            </div>
        `,
        after: `
            <div class="doc-mockup-sheet clean" style="font-family: 'Times New Roman', Times, serif; font-size: 0.9rem;">
                <h4 style="text-align: center; margin-bottom: 1rem; font-weight: bold; font-size: 1.05rem;">DAFTAR ISI</h4>
                <div style="line-height: 1.8;">
                    <div style="display: flex; justify-content: space-between;"><span><strong>HALAMAN JUDUL</strong></span><span><strong>i</strong></span></div>
                    <div style="display: flex; justify-content: space-between;"><span><strong>LEMBAR PENGESAHAN</strong></span><span><strong>ii</strong></span></div>
                    <div style="display: flex; justify-content: space-between;"><span><strong>ABSTRAK</strong></span><span><strong>iii</strong></span></div>
                    <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;"><span><strong>BAB I PENDAHULUAN</strong></span><span><strong>1</strong></span></div>
                    <div style="display: flex; justify-content: space-between; padding-left: 20px;"><span>1.1 Latar Belakang Masalah ................................................................</span><span>1</span></div>
                    <div style="display: flex; justify-content: space-between; padding-left: 20px;"><span>1.2 Rumusan Masalah .........................................................................</span><span>4</span></div>
                    <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;"><span><strong>BAB II TINJAUAN PUSTAKA</strong></span><span><strong>6</strong></span></div>
                    <div style="display: flex; justify-content: space-between; padding-left: 20px;"><span>2.1 Landasan Teori ............................................................................</span><span>6</span></div>
                    <div style="display: flex; justify-content: space-between; padding-left: 20px;"><span>2.2 Penelitian Terdahulu ..................................................................</span><span>12</span></div>
                    <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;"><span><strong>BAB III METODOLOGI PENELITIAN</strong></span><span><strong>18</strong></span></div>
                    <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;"><span><strong>DAFTAR PUSTAKA</strong></span><span><strong>25</strong></span></div>
                </div>
                <div style="margin-top: 0.75rem; color: #16a34a; font-size: 0.75rem; background: #dcfce7; padding: 4px 8px; border-radius: 4px;">
                    ✅ Otomatis terhubung dengan Heading Navigation Word, titik-titik tabulasi presisi, halaman auto-update.
                </div>
            </div>
        `
    },
    margin: {
        before: `
            <div class="doc-mockup-sheet messy" style="padding: 10px; border: 2px dashed #ef4444; border-radius: 4px;">
                <div style="color: #dc2626; font-size: 0.75rem; font-weight: bold; margin-bottom: 0.5rem;">❌ Margin Standar Default (2.54 cm Campur Baur)</div>
                <h4 style="text-align: left; font-size: 0.95rem;">1. LATAR BELAKANG</h4>
                <p style="font-size: 0.82rem; text-align: left; margin-bottom: 0.5rem; line-height: 1.2;">
                    Pendidikan tinggi di era digital saat ini menuntut penyusunan karya ilmiah yang berkualitas dan taat format baku. Namun seringkali mahasiswa mengalami kendala format...
                </p>
                <div style="text-align: center; margin-top: 2rem; font-size: 0.8rem; color: #dc2626;">Halaman 1 (Posisi Tengah - Salah Format Bab)</div>
            </div>
        `,
        after: `
            <div class="doc-mockup-sheet clean" style="padding: 10px 20px; border: 2px solid #10b981; border-radius: 4px;">
                <div style="color: #059669; font-size: 0.75rem; font-weight: bold; margin-bottom: 0.5rem;">✅ Margin Standar Skripsi Nasional (Kiri: 4cm, Atas: 4cm, Kanan: 3cm, Bawah: 3cm)</div>
                <h4 style="text-align: center; font-size: 1rem; font-weight: bold; margin-bottom: 0.75rem;">BAB I<br>PENDAHULUAN</h4>
                <h5 style="font-size: 0.9rem; font-weight: bold; margin-bottom: 0.5rem;">1.1 Latar Belakang Masalah</h5>
                <p style="font-size: 0.85rem; text-align: justify; text-indent: 1.27cm; line-height: 1.5;">
                    Pendidikan tinggi di era transformasi digital menuntut penyusunan karya ilmiah yang taat terhadap pedoman baku penulisan akademik institusi. Penerapan tata letak yang presisi mencerminkan integritas ilmiah...
                </p>
                <div style="text-align: center; margin-top: 1rem; font-size: 0.85rem; font-weight: bold; color: #1e3a5f;">1 (Bawah Tengah untuk Awal Bab)</div>
            </div>
        `
    },
    table: {
        before: `
            <div class="doc-mockup-sheet messy">
                <div style="color: #dc2626; font-size: 0.75rem; font-weight: bold; margin-bottom: 0.5rem;">❌ Tabel Tertutup & Caption Salah Posisi</div>
                <table style="width: 100%; border: 2px solid #333; font-size: 0.75rem; border-collapse: collapse; text-align: left;">
                    <tr style="background: #e2e8f0;">
                        <th style="border: 1px solid #333; padding: 4px;">No</th>
                        <th style="border: 1px solid #333; padding: 4px;">Variabel Penelitian</th>
                        <th style="border: 1px solid #333; padding: 4px;">Skor Mean</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #333; padding: 4px;">1</td>
                        <td style="border: 1px solid #333; padding: 4px;">Kualitas Format</td>
                        <td style="border: 1px solid #333; padding: 4px;">88.5</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #333; padding: 4px;">2</td>
                        <td style="border: 1px solid #333; padding: 4px;">Kesesuaian Pedoman</td>
                        <td style="border: 1px solid #333; padding: 4px;">92.0</td>
                    </tr>
                </table>
                <div style="font-size: 0.75rem; color: #dc2626; margin-top: 4px;">Tabel 1: Hasil Pengujian Variabel (Posisi Caption di Bawah Salah)</div>
            </div>
        `,
        after: `
            <div class="doc-mockup-sheet clean">
                <div style="color: #059669; font-size: 0.75rem; font-weight: bold; margin-bottom: 0.5rem;">✅ Standar Tabel Terbuka (APA / Pedoman Dikti)</div>
                <div style="font-size: 0.82rem; font-weight: bold; margin-bottom: 0.35rem; color: #000;">Tabel 2.1 Matriks Evaluasi Variabel Penelitian</div>
                <table style="width: 100%; font-size: 0.8rem; border-collapse: collapse; text-align: left; border-top: 2px solid #000; border-bottom: 2px solid #000;">
                    <thead>
                        <tr style="border-bottom: 1px solid #000;">
                            <th style="padding: 6px 8px; font-weight: bold;">No</th>
                            <th style="padding: 6px 8px; font-weight: bold;">Variabel Penelitian</th>
                            <th style="padding: 6px 8px; font-weight: bold; text-align: right;">Skor Mean</th>
                            <th style="padding: 6px 8px; font-weight: bold; text-align: center;">Status Kepatuhan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 5px 8px;">1</td>
                            <td style="padding: 5px 8px;">Presisi Batas Margin (4-4-3-3)</td>
                            <td style="padding: 5px 8px; text-align: right;">98.4</td>
                            <td style="padding: 5px 8px; text-align: center; color: #16a34a; font-weight: bold;">Sesuai</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 8px;">2</td>
                            <td style="padding: 5px 8px;">Penomoran Romawi & Arab</td>
                            <td style="padding: 5px 8px; text-align: right;">100.0</td>
                            <td style="padding: 5px 8px; text-align: center; color: #16a34a; font-weight: bold;">Sesuai</td>
                        </tr>
                    </tbody>
                </table>
                <div style="font-size: 0.72rem; color: #475569; margin-top: 4px; font-style: italic;">Sumber: Data Olahan Peneliti (2024)</div>
            </div>
        `
    }
};

let currentSampleKey = 'toc';

function initBeforeAfterSlider() {
    renderSampleContent(currentSampleKey);

    const container = document.getElementById('baContainer');
    const beforeLayer = document.getElementById('baBeforeLayer');
    const handle = document.getElementById('baHandle');

    if (!container || !beforeLayer || !handle) return;

    let isDragging = false;

    function setPosition(xPos) {
        const rect = container.getBoundingClientRect();
        let offsetX = xPos - rect.left;
        if (offsetX < 20) offsetX = 20;
        if (offsetX > rect.width - 20) offsetX = rect.width - 20;

        const percentage = (offsetX / rect.width) * 100;
        beforeLayer.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    }

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        setPosition(e.clientX);
    });

    // Touch Support for mobile
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        setPosition(e.touches[0].clientX);
    }, { passive: true });
}

function renderSampleContent(key) {
    const beforeBox = document.getElementById('sampleBeforeContent');
    const afterBox = document.getElementById('sampleAfterContent');

    if (beforeBox && afterBox && sampleData[key]) {
        beforeBox.innerHTML = sampleData[key].before;
        afterBox.innerHTML = sampleData[key].after;
    }
}

window.switchSample = function(key) {
    currentSampleKey = key;
    renderSampleContent(key);

    const buttons = document.querySelectorAll('.sample-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(key));
    if (activeBtn) activeBtn.classList.add('active');
};

/* ==========================================================================
   3. Cost Estimator / Pricing Calculator
   ========================================================================== */
let selectedCalcType = 'package';
let selectedPackageCost = 45000;
let selectedPackageName = 'Standard';

window.handleCalcTypeChange = function() {
    const radios = document.getElementsByName('calcType');
    for (const r of radios) {
        if (r.checked) {
            selectedCalcType = r.value;
            break;
        }
    }

    const pkgGroup = document.getElementById('calcPackageGroup');
    const addonsLabel = document.getElementById('addonsLabel');

    if (selectedCalcType === 'alacarte') {
        pkgGroup.style.display = 'none';
        addonsLabel.textContent = '2. Pilih Layanan Satuan Yang Anda Butuhkan:';
        selectedPackageCost = 0;
        selectedPackageName = 'A La Carte Satuan';
    } else {
        pkgGroup.style.display = 'block';
        addonsLabel.textContent = '3. Tambahan Layanan Satuan (Opsional):';
        // restore selected pkg
        const activePkgRadio = document.querySelector('input[name="calcPkgRadio"]:checked');
        if (activePkgRadio) {
            selectedPackageCost = parseInt(activePkgRadio.value, 10);
        }
    }

    updateCalcTotal();
};

window.selectCalcPkg = function(name, cost) {
    selectedPackageName = name;
    selectedPackageCost = cost;

    const items = document.querySelectorAll('.calc-pkg-item');
    items.forEach(item => item.classList.remove('selected'));

    const radio = document.querySelector(`input[name="calcPkgRadio"][value="${cost}"]`);
    if (radio) {
        radio.checked = true;
        radio.closest('.calc-pkg-item').classList.add('selected');
    }

    updateCalcTotal();
};

window.updateCalcTotal = function() {
    let total = selectedPackageCost;
    const checkboxes = document.querySelectorAll('.calc-addons-grid input[type="checkbox"]:checked');

    checkboxes.forEach(cb => {
        total += parseInt(cb.value, 10);
    });

    const display = document.getElementById('calcTotalDisplay');
    if (display) {
        display.textContent = formatRupiah(total);
    }
};

function formatRupiah(number) {
    return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

window.applyCalcToOrder = function() {
    const pkgSelect = document.getElementById('packageSelect');
    const orderNotes = document.getElementById('orderNotes');

    const selectedAddons = [];
    document.querySelectorAll('.calc-addons-grid input[type="checkbox"]:checked').forEach(cb => {
        selectedAddons.push(cb.getAttribute('data-name'));
    });

    if (pkgSelect) {
        if (selectedCalcType === 'package') {
            if (selectedPackageName === 'Basic') pkgSelect.value = 'Basic (Rp 35.000)';
            else if (selectedPackageName === 'Standard') pkgSelect.value = 'Standard (Rp 45.000)';
            else if (selectedPackageName === 'Premium') pkgSelect.value = 'Premium (Rp 65.000)';
        } else {
            pkgSelect.value = 'Layanan Satuan (A La Carte)';
        }
    }

    if (orderNotes && selectedAddons.length > 0) {
        orderNotes.value = `Tambahan Add-on: ${selectedAddons.join(', ')}`;
    }

    // Smooth scroll to contact form
    const contactSection = document.getElementById('kontak');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast('Estimasi kalkulator berhasil diterapkan ke form pemesanan!', 'success');
};

window.selectPackage = function(packageName, price) {
    const pkgSelect = document.getElementById('packageSelect');
    if (pkgSelect) {
        if (packageName === 'Basic') pkgSelect.value = 'Basic (Rp 35.000)';
        else if (packageName === 'Standard') pkgSelect.value = 'Standard (Rp 45.000)';
        else if (packageName === 'Premium') pkgSelect.value = 'Premium (Rp 65.000)';
    }

    const contactSection = document.getElementById('kontak');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
};

window.scrollToCalculator = function(e) {
    e.preventDefault();
    const calcSection = document.getElementById('kalkulator-section');
    if (calcSection) {
        calcSection.scrollIntoView({ behavior: 'smooth' });
    }
};

window.syncPackageSelection = function() {
    // Sync if needed
};

/* ==========================================================================
   4. Form Submission & Smart WhatsApp Generator
   ========================================================================== */
window.handleFormSubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const campus = document.getElementById('clientCampus').value.trim();
    const docType = document.getElementById('docType').value;
    const pkg = document.getElementById('packageSelect').value;
    const deadline = document.getElementById('deadlineDate').value.trim() || 'Fleksibel / Sesuai Antrean';
    const notes = document.getElementById('orderNotes').value.trim() || 'Tidak ada catatan khusus';

    if (!name || !phone || !campus) {
        showToast('Mohon lengkapi data Nama, No WhatsApp, dan Asal Kampus.', 'error');
        return;
    }

    const waText = `Halo Admin FormatIlmiah,%0A%0ASaya ingin memesan *Jasa Formatting Karya Ilmiah*:%0A%0A` +
        `📝 *Nama:* ${encodeURIComponent(name)}%0A` +
        `📱 *No. WhatsApp:* ${encodeURIComponent(phone)}%0A` +
        `🏛️ *Asal Kampus / Instansi:* ${encodeURIComponent(campus)}%0A` +
        `📄 *Jenis Dokumen:* ${encodeURIComponent(docType)}%0A` +
        `📦 *Pilihan Paket:* ${encodeURIComponent(pkg)}%0A` +
        `⏱️ *Target Deadline:* ${encodeURIComponent(deadline)}%0A` +
        `📌 *Catatan / Pedoman:* ${encodeURIComponent(notes)}%0A%0A` +
        `Mohon informasi estimasi pengerjaan dan langkah pengiriman file dokumen saya. Terima kasih!`;

    const adminWhatsAppUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waText}`;

    showToast('Membuka WhatsApp untuk mengirim rincian pesanan Anda...', 'success');

    setTimeout(() => {
        window.open(adminWhatsAppUrl, '_blank');
    }, 600);
};

/* ==========================================================================
   5. Animated Stat Counters
   ========================================================================== */
function initStatCounters() {
    const statCards = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statCards.forEach(card => {
                    const target = parseInt(card.getAttribute('data-target'), 10);
                    animateCounter(card, target, 1800);
                });
            }
        });
    }, { threshold: 0.4 });

    const statsSection = document.querySelector('.stats-counter-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element, target, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = Math.floor(progress * target);
        element.textContent = currentVal;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = target;
        }
    };
    window.requestAnimationFrame(step);
}

/* ==========================================================================
   6. FAQ Search & Accordion
   ========================================================================== */
window.toggleFaq = function(btn) {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all FAQs if you want single-item open, or toggle independently
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

    if (!isActive) {
        item.classList.add('active');
    }
};

window.filterFaqs = function() {
    const query = document.getElementById('faqSearchInput').value.toLowerCase().trim();
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};

/* ==========================================================================
   7. Modals & Toast Notifications
   ========================================================================== */
window.openModal = function(modalId, e) {
    if (e) e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
};

// Close modal when clicking outside dialog
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

window.closeWaTooltip = function(e) {
    if (e) e.stopPropagation();
    const tooltip = document.getElementById('waTooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
};

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
