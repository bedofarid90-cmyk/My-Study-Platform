// =========================================
// 1. القاموس واللغات الشامل (i18n Dictionary)
// =========================================
const translations = {
    ar: {
        appName: "ذاكر", loginBtn: "تسجيل دخول 🚀", loginPrompt: '"يرجى تسجيل الدخول لعرض موادك ومزامنتها..."',
        chooseSubject: "اختار المادة:", addSubjectBtn: "➕ إضافة مادة جديدة",
        shareTitle: "🤝 شارك الدحيحة (بنك الأسئلة)",
        shareDesc: "تقدر تنزل أسئلتك في ملف وتبعته لزمايلك في الدفعة يذاكروا منه، أو ترفع ملف أسئلة جاهز بتاع حد من صحابك والمنصة هتبرمجهولك أوتوماتيك!",
        exportBtn: "⬇️ تنزيل أسئلتي للمشاركة", importBtn: "⬆️ رفع أسئلة زمايلي",
        aboutTitle: "💡 ليه تستخدم المنصة دي؟",
        aboutText: "واحدة من أقوى طرق الفهم والحفظ والمراجعة للمواد عالمياً هي طريقة <strong>(Active Recall)</strong>.. يعني إنك تحل وتختبر نفسك بدل ما تقرأ بعينك بس! <br><br>هنا هتقدر تبني بنك أسئلة لكل محاضرة بأسلوبك، وكل ما ترجع تحلها كل فترة بطريقة <strong>(التكرار المتباعد)</strong>، المعلومة هتتحفر في دماغك زي الحجر. ليلة الامتحان مش هتحتاج تتوتر، هتدخل تراجع الأسئلة، وتدخل الفاينال وإنت أسطورة ومقفل المادة! 🚀<br><br>☁️ <strong>المزامنة السحابية:</strong> المنصة متصلة بسيرفرات آمنة، بمجرد تسجيل الدخول بحساب جوجل، أسئلتك وموادك هتتحفظ أوتوماتيك وتقدر تفتحها من موبايلك أو لابتوبك في أي وقت.",
        confirmMsg: "هل أنت متأكد؟", confirmLogout: "هل أنت متأكد من تسجيل الخروج؟", cancelBtn: "إلغاء", agreeBtn: "موافق ✅", saveBtn: "حفظ 💾",
        js_loginReq: "سجل دخول بحساب جوجل الأول! 🔒", js_saved: "تم الحفظ بنجاح ✅", js_deleted: "تم المسح بنجاح 🗑️",
        // ترجمات المحاضرات والأسئلة
        backHomeBtn: "🔙 الرئيسية", backToLecsBtn: "🔙 رجوع للمحاضرات", backBtn: "🔙 رجوع",
        addLectureBtn: "➕ إضافة محاضرة جديدة", statsTitle: "📊 إحصائيات حلك في المادة دي",
        statTotal: "الأسئلة المٌجابة", statCorrect: "إجابات صحيحة ✅", statWrong: "إجابات خاطئة ❌", statPercent: "نسبة النجاح 🎯", resetStatsBtn: "🔄 تصفير الإحصائيات",
        openStudyTitle: "📝 المذاكرة المفتوحة", openStudyDesc: "حل براحتك وشوف الإجابات والشرح فوراً",
        examModeTitle: "⏱️ امتحان الفاينال", examModeDesc: "دقيقة لكل سؤال، والنتيجة بتظهر في الآخر",
        addQsBtn: "➕ إضافة أسئلة", addQsDesc: "إضافة أسئلة مفردة أو باستخدام الذكاء الاصطناعي",
        manageQsBtn: "⚙️ إدارة الأسئلة", manageQsDesc: "تعديل وحذف الأسئلة الموجودة", manageQsTitle: "⚙️ إدارة الأسئلة",
        addQsTitle: "إضافة سؤال", singleModeBtn: "إضافة مفرد ✏️", bulkModeBtn: "المولد الذكي AI 🚀",
        qTypeLabel: "النوع:", tfOption: "صح وخطأ", mcqOption: "اختياري", mixedOption: "ميكس (النوعين)",
        qTextLabel: "السؤال:", opt1Label: "الاختيار الأول (1):", opt2Label: "الاختيار الثاني (2):", opt3Label: "الاختيار الثالث (3):", opt4Label: "الاختيار الرابع (4):",
        correctAnswerLabel: "الإجابة الصحيحة:", explanationLabel: "الشرح (اختياري):", saveBtnOnly: "💾 حفظ السؤال",
        aiTitle: "🤖 المولد الذكي (AI Prompt)",
        aiDesc: "حط المادة العلمية هنا، أو <strong>اسحب وارمي ملفك هنا</strong>، أو اختار ملف من جهازك عشان نستخرج نصه.",
        chooseFileBtn: "📂 اختر ملف من الجهاز (PDF, Word, TXT)", aiPlaceholder: "أو انسخ نص المحاضرة هنا مباشرة...",
        aiCountLabel: "عدد الأسئلة:", aiTypeLabel: "نوع الأسئلة:", aiGenBtn: "🪄 توليد ونسخ الأمر السري",
        pasteTitle: "📥 لصق الأسئلة الجاهزة", pasteDesc: "بعد ما الذكاء الاصطناعي يكتبلك الأسئلة، انسخها كلها وارميها هنا ودوس حفظ.",
        saveBulkBtn: "⚡ معالجة وحفظ الأسئلة في المحاضرة",
        // رسائل وإشعارات الجافاسكريبت
        demoAlert: "دي نسخة عرض 👀.. سجل دخول عشان تفتحها وتضيف موادك!",
        emptySubject: "لا يوجد مواد. أضف مادة جديدة!", emptyLecture: "لا يوجد محاضرات.. أضف محاضرة جديدة للبدء.",
        newSubjLabel: "اسم المادة الجديدة:", newLecLabel: "اسم المحاضرة الجديدة:", newNameLabel: "الاسم الجديد:",
        delLecConfirm: "هل أنت متأكد من مسح المحاضرة بكل أسئلتها؟", delQConfirm: "هل أنت متأكد من مسح السؤال؟", resetConfirm: "متأكد إنك عايز تصفر إحصائيات المادة دي؟",
        emptyQAlert: "اكتب السؤال الأول!", emptyBulkAlert: "مربع الأسئلة فارغ!", pasteSourceAlert: "الرجاء وضع المادة العلمية أو رفع ملف أولاً!",
        extractingText: "جاري استخراج النص... ⏳", doneSuccess: "تم بنجاح! ✅", pdfError: "خطأ في قراءة الـ PDF.", wordError: "خطأ في قراءة الوورد.",
        unsupportedFormat: "صيغة غير مدعومة! (ارفع TXT, PDF, DOCX)", copySuccess: "تم نسخ الأمر السري بنجاح! 📋", copyFail: "فشل النسخ التلقائي، حاول نسخه يدوياً.",
        noQsExtracted: "لم يتم التعرف على أي أسئلة. تأكد أن الصيغة صحيحة بدون أرقام.", noQsInLec: "لا توجد أسئلة في هذه المحاضرة. أضف أسئلة أولاً!"
    },
    en: {
        appName: "Zaker", loginBtn: "Login 🚀", loginPrompt: '"Please login to view and sync your subjects..."',
        chooseSubject: "Choose Subject:", addSubjectBtn: "➕ Add New Subject",
        shareTitle: "🤝 Share with Peers",
        shareDesc: "You can download your questions to share with classmates, or import a ready-made question bank file!",
        exportBtn: "⬇️ Export My Questions", importBtn: "⬆️ Import Peer Questions",
        aboutTitle: "💡 Why use this platform?",
        aboutText: "One of the most powerful study methods globally is <strong>Active Recall</strong>.. testing yourself instead of just reading!<br><br>Here you can build a question bank for each lecture. By practicing via <strong>Spaced Repetition</strong>, information will stick like stone. Before finals, just review your questions and ace the exam! 🚀<br><br>☁️ <strong>Cloud Sync:</strong> Connected to secure servers. Once logged in with Google, your data is auto-saved and accessible from any device.",
        confirmMsg: "Are you sure?", confirmLogout: "Are you sure you want to logout?", cancelBtn: "Cancel", agreeBtn: "Confirm ✅", saveBtn: "Save 💾",
        js_loginReq: "Login with Google first! 🔒", js_saved: "Saved successfully ✅", js_deleted: "Deleted successfully 🗑️",
        backHomeBtn: "🔙 Home", backToLecsBtn: "🔙 Back to Lectures", backBtn: "🔙 Back",
        addLectureBtn: "➕ Add New Lecture", statsTitle: "📊 Your Stats in this Subject",
        statTotal: "Answered Qs", statCorrect: "Correct ✅", statWrong: "Wrong ❌", statPercent: "Success Rate 🎯", resetStatsBtn: "🔄 Reset Stats",
        openStudyTitle: "📝 Open Study", openStudyDesc: "Solve freely and see answers instantly",
        examModeTitle: "⏱️ Final Exam", examModeDesc: "1 min per question, results at the end",
        addQsBtn: "➕ Add Questions", addQsDesc: "Add single questions or use AI",
        manageQsBtn: "⚙️ Manage Questions", manageQsDesc: "Edit and delete existing questions", manageQsTitle: "⚙️ Manage Questions",
        addQsTitle: "Add Question", singleModeBtn: "Single Add ✏️", bulkModeBtn: "AI Generator 🚀",
        qTypeLabel: "Type:", tfOption: "True/False", mcqOption: "Multiple Choice", mixedOption: "Mixed (Both)",
        qTextLabel: "Question:", opt1Label: "Option 1:", opt2Label: "Option 2:", opt3Label: "Option 3:", opt4Label: "Option 4:",
        correctAnswerLabel: "Correct Answer:", explanationLabel: "Explanation (Optional):", saveBtnOnly: "💾 Save Question",
        aiTitle: "🤖 AI Generator", aiDesc: "Paste material, <strong>drag and drop a file</strong>, or select a file to extract text.",
        chooseFileBtn: "📂 Select File (PDF, Word, TXT)", aiPlaceholder: "Or paste lecture text here directly...",
        aiCountLabel: "Question Count:", aiTypeLabel: "Question Type:", aiGenBtn: "🪄 Generate & Copy Prompt",
        pasteTitle: "📥 Paste Ready Questions", pasteDesc: "After AI generates the questions, paste them all here and click save.",
        saveBulkBtn: "⚡ Process & Save Questions",
        demoAlert: "Demo Mode 👀.. Login to access and add your subjects!",
        emptySubject: "No subjects yet. Add a new one!", emptyLecture: "No lectures.. Add a new lecture to start.",
        newSubjLabel: "New Subject Name:", newLecLabel: "New Lecture Name:", newNameLabel: "New Name:",
        delLecConfirm: "Are you sure you want to delete the lecture and all its questions?", delQConfirm: "Are you sure you want to delete this question?", resetConfirm: "Are you sure you want to reset stats?",
        emptyQAlert: "Write the question first!", emptyBulkAlert: "Questions box is empty!", pasteSourceAlert: "Please paste material or upload a file first!",
        extractingText: "Extracting text... ⏳", doneSuccess: "Done successfully! ✅", pdfError: "Error reading PDF.", wordError: "Error reading Word.",
        unsupportedFormat: "Unsupported format! (Upload TXT, PDF, DOCX)", copySuccess: "Prompt copied successfully! 📋", copyFail: "Auto-copy failed, please copy manually.",
        noQsExtracted: "No questions recognized. Make sure the format is correct without numbers.", noQsInLec: "No questions in this lecture. Add questions first!"
    }
};

let currentLang = localStorage.getItem('zaker_lang') || 'ar';
function t(key) { return translations[currentLang][key] || key; }

function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[currentLang][key];
            } else {
                el.innerHTML = translations[currentLang][key];
            }
        }
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
// 4. التصدير والاستيراد (مشاركة الأسئلة)
// =========================================
function exportData() {
    if(!currentUser) return showToast(t('js_loginReq'), 'error');
    if(Object.keys(globalData.subjectsMeta).length === 0) return showToast(t('emptySubject'), 'error');

    const blob = new Blob([JSON.stringify(globalData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Zaker_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                showToast(currentLang === 'ar' ? `تم رفع ${addedCount} مواد بنجاح!` : `Imported ${addedCount} subjects successfully!`);
                if(typeof renderSubjects === 'function') renderSubjects(false);
            }
        } catch (err) {
            alert(currentLang === 'ar' ? 'يوجد خطأ في الملف، تأكد أنه ملف أسئلة المنصة.' : 'Error in file. Make sure it is a platform backup file.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// =========================================
// 5. العبارات التحفيزية
// =========================================
const motivationalQuotes = [
    "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ", 
    "إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا", 
    "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", 
    "بِقَدْرِ الكَدِّ تُكْتَسَبُ المَعَالِي", 
    "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ"
];
let lastQuoteIndex = -1; 

function changeQuote() {
    const textEl = document.getElementById('quoteText'); 
    if(!textEl) return;
    
    textEl.style.opacity = 0; 
    textEl.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        let randomIndex; 
        do { 
            randomIndex = Math.floor(Math.random() * motivationalQuotes.length); 
        } while (randomIndex === lastQuoteIndex && motivationalQuotes.length > 1);
        
        lastQuoteIndex = randomIndex; 
        textEl.innerText = motivationalQuotes[randomIndex];
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