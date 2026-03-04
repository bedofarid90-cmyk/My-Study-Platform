// =========================================
// 1. القاموس واللغات الشامل 
// =========================================
const translations = {
    ar: {
        appName: "ذاكر", loginBtn: "تسجيل دخول 🚀", loginPrompt: '"يرجى تسجيل الدخول لعرض موادك ومزامنتها..."',
        chooseSubject: "اختار المادة:", addSubjectBtn: "➕ إضافة مادة جديدة",
        shareTitle: "🤝 شارك الدحيحة (بنك الأسئلة)",
        shareDesc: "تقدر تنزل أسئلتك في ملف وتبعته لزمايلك يذاكروا منه، أو ترفع ملف أسئلة جاهز بتاع حد من صحابك والمنصة هتبرمجهولك أوتوماتيك!",
        exportBtn: "📦 تصدير الداتا لزمايلي", importBtn: "⬆️ رفع أسئلة زمايلي", exportPdfBtn: "📄 تنزيل أسئلتي كـ PDF",
        aboutTitle: "💡 ليه تستخدم المنصة دي؟",
        aboutText: "أقوى طرق الفهم والحفظ للمواد عالمياً هي طريقة <strong>(Active Recall)</strong>.. يعني إنك تختبر نفسك بدل ما تقرأ بعينك بس!<br><br>هتقدر تبني بنك أسئلة لكل محاضرة بأسلوبك، وكل ما ترجع تحلها بطريقة <strong>(التكرار المتباعد)</strong>، المعلومة هتتحفر في دماغك. ليلة الامتحان هتدخل تراجع الأسئلة وتدخل الفاينال وإنت مقفل المادة! 🚀<br><br>☁️ <strong>المزامنة السحابية:</strong> بمجرد تسجيل الدخول بحساب جوجل، موادك بتتحفظ أوتوماتيك وتقدر تفتحها من موبايلك أو لابتوبك.",
        confirmMsg: "هل أنت متأكد؟", confirmLogout: "هل أنت متأكد من تسجيل الخروج؟", cancelBtn: "إلغاء", agreeBtn: "موافق ✅", saveBtn: "حفظ 💾",
        js_loginReq: "سجل دخول بحساب جوجل الأول! 🔒", js_saved: "تم الحفظ بنجاح ✅", js_deleted: "تم المسح بنجاح 🗑️",
        demoAlert: "دي نسخة عرض 👀.. سجل دخول عشان تفتحها وتضيف موادك!", emptySubject: "لا يوجد مواد مسجلة.", noQsInLec: "لا توجد أسئلة لتحميلها."
    },
    en: {
        appName: "Zaker", loginBtn: "Login 🚀", loginPrompt: '"Please login to view and sync your subjects..."',
        chooseSubject: "Choose Subject:", addSubjectBtn: "➕ Add New Subject",
        shareTitle: "🤝 Share with Peers",
        shareDesc: "You can download your questions to share with classmates, or import a ready-made question bank file!",
        exportBtn: "📦 Export Data File", importBtn: "⬆️ Import Peer Questions", exportPdfBtn: "📄 Download as PDF",
        aboutTitle: "💡 Why use this platform?",
        aboutText: "The most powerful study method globally is <strong>Active Recall</strong>.. testing yourself instead of just reading!<br><br>Build a question bank for each lecture. By practicing via <strong>Spaced Repetition</strong>, information will stick like a stone. Before finals, just review your questions and ace the exam! 🚀<br><br>☁️ <strong>Cloud Sync:</strong> Once logged in with Google, your data is auto-saved and accessible from any device.",
        confirmMsg: "Are you sure?", confirmLogout: "Are you sure you want to logout?", cancelBtn: "Cancel", agreeBtn: "Confirm ✅", saveBtn: "Save 💾",
        js_loginReq: "Login with Google first! 🔒", js_saved: "Saved successfully ✅", js_deleted: "Deleted successfully 🗑️",
        demoAlert: "Demo Mode 👀.. Login to access and add your subjects!", emptySubject: "No subjects to export.", noQsInLec: "No questions available to export."
    }
};

let currentLang = localStorage.getItem('zaker_lang') || 'ar';
function t(key) { return translations[currentLang][key] || key; }

function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
    });
}

function toggleLanguage() { 
    currentLang = currentLang === 'ar' ? 'en' : 'ar'; 
    localStorage.setItem('zaker_lang', currentLang); 
    applyLanguage(); 
    location.reload(); 
}

// =========================================
// 2. نظام الدارك مود 
// =========================================
let currentTheme = localStorage.getItem('zaker_theme') || 'dark';
document.body.setAttribute('data-theme', currentTheme);

function toggleTheme() { 
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('zaker_theme', currentTheme);
}

// =========================================
// 3. إعدادات السحابة (Firebase)
// =========================================
const firebaseConfig = {
    apiKey: "AIzaSyBmQqHCyzeScuxLfRyB9KdSvM0817zML1s",
    authDomain: "zaker-app-161bf.firebaseapp.com",
    projectId: "zaker-app-161bf",
    storageBucket: "zaker-app-161bf.firebasestorage.app",
    messagingSenderId: "627429782820",
    appId: "1:627429782820:web:1727160f5d27abc6eeefb1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 
const db = firebase.firestore(); 
const provider = new firebase.auth.GoogleAuthProvider();

let currentUser = null;
let globalData = { subjectsMeta: {}, allData: {}, userProgress: {} };

function loginWithGoogle() { auth.signInWithPopup(provider).catch(err => alert("Error: " + err.message)); }
function logout() { customConfirm(t('confirmLogout'), () => { auth.signOut().then(() => location.reload()); }); }

// =========================================
// 4. التصدير (PDF + Data) والاستيراد
// =========================================

// تصدير داتا المنصة للمشاركة
function exportData() {
    if(!currentUser) return showToast(t('js_loginReq'), 'error');
    if(Object.keys(globalData.subjectsMeta).length === 0) return showToast(t('emptySubject'), 'error');

    const blob = new Blob([JSON.stringify(globalData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Zaker_Data_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// تصدير ملف PDF شيك للقراءة
function exportToPDF() {
    if(!currentUser) return showToast(t('js_loginReq'), 'error');
    if(Object.keys(globalData.allData || {}).length === 0) return showToast(t('emptySubject'), 'error');

    let printContent = `<html dir="${currentLang==='ar'?'rtl':'ltr'}"><head><title>${currentLang==='ar'?'أسئلتي - ذاكر':'Zaker - Questions'}</title><style>
        body { font-family: 'Cairo', sans-serif; padding: 40px; color: #334155; line-height: 1.8; }
        h1 { color: #6366f1; text-align: center; border-bottom: 2px dashed #e2e8f0; padding-bottom: 15px; font-size: 2.5rem; }
        h2 { color: #f43f5e; margin-top: 40px; background: #f1f5f9; padding: 10px 20px; border-radius: 10px; }
        .question { background: #ffffff; padding: 20px; margin-bottom: 20px; border-radius: 12px; border: 1px solid #e2e8f0; border-right: 5px solid #10b981; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .options { color: #64748b; font-size: 1rem; margin-top: 12px; padding: 10px; background: #f8fafc; border-radius: 8px; }
        .answer { color: #10b981; font-weight: bold; margin-top: 15px; font-size: 1.1rem; }
    </style></head><body>`;
    
    printContent += `<h1>${currentLang==='ar'?'📚 بنك أسئلة منصة ذاكر':'📚 Zaker Question Bank'}</h1>`;
    
    let hasQuestions = false;
    for(let subj in globalData.allData) {
        let subjName = globalData.subjectsMeta[subj]?.name || '';
        let subjQuestions = globalData.allData[subj];
        
        for(let lec in subjQuestions) {
            let qs = subjQuestions[lec];
            if(qs && qs.length > 0) {
                hasQuestions = true;
                printContent += `<h2>📁 ${subjName} - ${lec}</h2>`;
                qs.forEach((q, i) => {
                    let opts = q.type === 'mcq' ? `<div class="options"><strong>${currentLang==='ar'?'الاختيارات:':'Options:'}</strong> ${q.options.join(' | ')}</div>` : '';
                    printContent += `<div class="question">
                        <strong>${currentLang==='ar'?'سؤال':'Q'}${i+1}:</strong> ${q.q}
                        ${opts}
                        <div class="answer">✅ ${currentLang==='ar'?'الإجابة:':'Answer:'} ${q.a}</div>
                    </div>`;
                });
            }
        }
    }
    
    printContent += `</body></html>`;
    
    if(!hasQuestions) return showToast(t('noQsInLec'), 'error');
    
    // فتح نافذة الطباعة (أفضل طريقة للـ PDF في المتصفح)
    let printWin = window.open('', '', 'width=900,height=700');
    printWin.document.write(printContent);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => { printWin.print(); printWin.close(); }, 800);
}

function importData(event) {
    if(!currentUser) return showToast(t('js_loginReq'), 'error');
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            let impMeta = imported.subjectsMeta || {};
            let impData = imported.allData || {};
            let addedCount = 0;

            for (let key in impMeta) {
                let newKey = 'subj_' + Date.now() + Math.floor(Math.random() * 1000);
                globalData.subjectsMeta[newKey] = impMeta[key];
                globalData.subjectsMeta[newKey].name += (currentLang === 'ar' ? ' (من الدفعة)' : ' (Imported)');
                globalData.allData[newKey] = impData[key] || {};
                globalData.userProgress[newKey] = { total: 0, correct: 0, wrong: 0 };
                addedCount++;
            }

            if (addedCount > 0) {
                await db.collection('users').doc(currentUser.uid).set(globalData, { merge: true });
                showToast(currentLang === 'ar' ? `تم رفع ${addedCount} مواد بنجاح!` : `Imported ${addedCount} subjects!`);
                if(typeof renderSubjects === 'function') renderSubjects(false);
            }
        } catch (err) {
            alert(currentLang === 'ar' ? 'يوجد خطأ، تأكد أنه ملف الداتا الخاص بالمنصة.' : 'Error. Ensure it is a valid Zaker data file.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// =========================================
// 5. العبارات التحفيزية (عربي + إنجليزي)
// =========================================
const motivationalQuotes = {
    ar: [
        "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ", 
        "إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا", 
        "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", 
        "بِقَدْرِ الكَدِّ تُكْتَسَبُ المَعَالِي", 
        "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ"
    ],
    en: [
        "Success is the sum of small efforts.",
        "Believe you can and you're halfway there.",
        "Don't stop until you're proud.",
        "Every expert was once a beginner.",
        "The future depends on what you do today."
    ]
};
let lastQuoteIndex = -1; 

function changeQuote() {
    const textEl = document.getElementById('quoteText'); 
    if(!textEl) return;
    
    textEl.style.opacity = 0; 
    textEl.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        let currentArray = motivationalQuotes[currentLang] || motivationalQuotes['ar'];
        let randomIndex; 
        do { 
            randomIndex = Math.floor(Math.random() * currentArray.length); 
        } while (randomIndex === lastQuoteIndex && currentArray.length > 1);
        
        lastQuoteIndex = randomIndex; 
        textEl.innerText = currentArray[randomIndex];
        textEl.style.opacity = 1; 
        textEl.style.transform = 'translateY(0)';
    }, 800); 
}

// =========================================
// 6. أدوات الواجهة العامة
// =========================================
function showToast(message, type = 'success') { 
    const container = document.getElementById('toast-container'); 
    if(!container) return; 
    const toast = document.createElement('div'); 
    toast.className = `toast ${type}`; 
    toast.innerText = message; 
    container.appendChild(toast); 
    setTimeout(() => toast.remove(), 3000); 
}

let confirmCallback = null; 
function customConfirm(message, callback) { 
    document.getElementById('confirmMessage').innerText = message; 
    document.getElementById('confirmModal').style.display = 'flex'; 
    confirmCallback = callback; 
} 
function closeConfirm() { document.getElementById('confirmModal').style.display = 'none'; confirmCallback = null; } 
document.getElementById('confirmBtnYes').onclick = function() { if (confirmCallback) confirmCallback(); closeConfirm(); };

let promptCallback = null; 
function customPrompt(message, defaultValue, callback) { 
    document.getElementById('promptMessage').innerText = message; 
    const inputEl = document.getElementById('promptInput'); 
    inputEl.value = defaultValue || ''; 
    document.getElementById('promptModal').style.display = 'flex'; 
    inputEl.focus(); 
    promptCallback = callback; 
} 
function closePrompt() { document.getElementById('promptModal').style.display = 'none'; promptCallback = null; } 
document.getElementById('promptBtnYes').onclick = function() { if(promptCallback) promptCallback(document.getElementById('promptInput').value); closePrompt(); };

function sanitizeInput(str) { if (!str) return ''; let temp = document.createElement('div'); temp.textContent = str; return temp.innerHTML; }

// بدء التشغيل
window.addEventListener('DOMContentLoaded', () => {
    applyLanguage();
    if(document.getElementById('quoteText')) {
        setInterval(changeQuote, 12000);
    }
});