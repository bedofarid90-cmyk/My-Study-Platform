// =========================================
// 1. قاموس اللغات (i18n Dictionary)
// =========================================
const translations = {
    ar: {
        appName: "ذاكر", loginBtn: "تسجيل دخول 🚀", loginPrompt: '"يرجى تسجيل الدخول لعرض موادك ومزامنتها..."',
        chooseSubject: "اختار المادة:", addSubjectBtn: "➕ إضافة مادة جديدة", shareTitle: "🤝 شارك الدحيحة (بنك الأسئلة)",
        shareDesc: "تقدر تنزل أسئلتك في ملف وتبعته لزمايلك في الدفعة يذاكروا منه، أو ترفع ملف أسئلة جاهز بتاع حد من صحابك والمنصة هتبرمجهولك أوتوماتيك وتدمجه مع أسئلتك!",
        exportBtn: "⬇️ تنزيل أسئلتي للمشاركة", importBtn: "⬆️ رفع أسئلة زمايلي", aboutTitle: "💡 ليه تستخدم المنصة دي؟",
        aboutText: "واحدة من أقوى طرق الفهم والحفظ والمراجعة للمواد عالمياً هي طريقة <strong>(Active Recall)</strong>.. يعني إنك تحل وتختبر نفسك بدل ما تقرأ بعينك بس! <br><br>هنا هتقدر تبني بنك أسئلة لكل محاضرة بأسلوبك، وكل ما ترجع تحلها كل فترة بطريقة <strong>(التكرار المتباعد)</strong>، المعلومة هتتحفر في دماغك زي الحجر. ليلة الامتحان مش هتحتاج تتوتر، هتدخل تراجع الأسئلة، وتدخل الفاينال وإنت أسطورة ومقفل المادة! 🚀<br><br>☁️ <strong>المزامنة السحابية:</strong> المنصة متصلة بسيرفرات آمنة، بمجرد تسجيل الدخول بحساب جوجل، أسئلتك وموادك هتتحفظ أوتوماتيك وتقدر تفتحها من موبايلك أو لابتوبك في أي وقت.",
        addLectureBtn: "➕ إضافة محاضرة جديدة", statsTitle: "📊 إحصائيات حلك في المادة دي", statTotal: "الأسئلة المٌجابة",
        statCorrect: "إجابات صحيحة ✅", statWrong: "إجابات خاطئة ❌", statPercent: "نسبة النجاح 🎯", resetStatsBtn: "🔄 تصفير الإحصائيات",
        manageQsBtn: "⚙️ إدارة الأسئلة", addQsBtn: "➕ ضيف سؤال جديد", openStudyTitle: "📝 المذاكرة المفتوحة", openStudyDesc: "حل براحتك وشوف الإجابات والشرح فوراً",
        examModeTitle: "⏱️ امتحان الفاينال", examModeDesc: "دقيقة لكل سؤال، والنتيجة بتظهر في الآخر", manageQsTitle: "إدارة الأسئلة",
        addQsTitle: "إضافة سؤال", singleModeBtn: "إضافة مفرد ✏️", bulkModeBtn: "إضافة بالجملة والـ AI 🚀", qTypeLabel: "النوع:",
        tfOption: "صح وخطأ", mcqOption: "اختياري", mixedOption: "ميكس (النوعين)", qTextLabel: "السؤال:", opt1Label: "الاختيار الأول (1):",
        opt2Label: "الاختيار الثاني (2):", opt3Label: "الاختيار الثالث (3):", opt4Label: "الاختيار الرابع (4):", correctAnswerLabel: "الإجابة الصحيحة:",
        explanationLabel: "الشرح (اختياري):", 
        saveBtnOnly: "💾 حفظ السؤال", 
        aiTitle: "🤖 المولد الذكي (AI Prompt Generator)",
        aiDesc: "حط المادة العلمية (أو ملخص المحاضرة) هنا، حدد طلبك، وهنعملك 'أمر برمجي' تديه للذكاء الاصطناعي عشان يطلعلك الأسئلة بالصيغة المظبوطة!",
        aiPlaceholder: "انسخ النص أو اسحب وأفلت الملف هنا (PDF, Word, TXT)", aiCountLabel: "عدد الأسئلة:", aiTypeLabel: "نوع الأسئلة:", aiGenBtn: "🪄 توليد ونسخ الأمر السري", pasteTitle: "📥 لصق الأسئلة الجاهزة",
        pasteDesc: "بعد ما الذكاء الاصطناعي يكتبلك الأسئلة، انسخها كلها وارميها هنا ودوس حفظ.", saveBulkBtn: "⚡ معالجة وحفظ الأسئلة في المحاضرة",
        endExamBtn: "✖️ إنهاء المذاكرة", timeLabel: "⏱️ الوقت:", finalResultTitle: "🎯 النتيجة النهائية", backToLectureBtn: "🔙 رجوع للمحاضرة",
        confirmMsg: "هل أنت متأكد؟", confirmLogout: "هل أنت متأكد من تسجيل الخروج؟", cancelBtn: "إلغاء", agreeBtn: "موافق ✅", saveBtn: "حفظ 💾",
        js_demo: "سجل دخول لعرض موادك الحقيقية ومزامنتها...", js_loginReq: "سجل دخول بحساب جوجل الأول! 🔒",
        js_demoReq: "دي نسخة عرض 👀.. سجل دخول عشان تفتحها! 🔒", js_saved: "تم الحفظ بنجاح ✅", js_deleted: "تم المسح بنجاح 🗑️",
        js_qReq: "ضيف أسئلة الأول يا بطل عشان تمتحن!", js_timeUp: "انتهى وقت الامتحان! ⏰", js_copied: "تم نسخ الأمر بنجاح! 📋"
    },
    en: {
        appName: "Zaker", loginBtn: "Login 🚀", loginPrompt: '"Please login to view and sync your subjects..."',
        chooseSubject: "Choose Subject:", addSubjectBtn: "➕ Add New Subject", shareTitle: "🤝 Share with Peers (Q-Bank)",
        shareDesc: "You can download your questions to share with classmates, or import a ready-made question bank file and the platform will automatically merge it!",
        exportBtn: "⬇️ Export My Questions", importBtn: "⬆️ Import Peer Questions", aboutTitle: "💡 Why use this platform?",
        aboutText: "One of the most powerful study methods globally is <strong>Active Recall</strong>.. testing yourself instead of just reading!<br><br>Here you can build a question bank for each lecture. By practicing via <strong>Spaced Repetition</strong>, information will stick like stone. Before finals, just review your questions and ace the exam! 🚀<br><br>☁️ <strong>Cloud Sync:</strong> Connected to secure servers. Once logged in with Google, your data is auto-saved and accessible from any device.",
        addLectureBtn: "➕ Add New Lecture", statsTitle: "📊 Your Stats in this Subject", statTotal: "Answered Questions",
        statCorrect: "Correct Answers ✅", statWrong: "Wrong Answers ❌", statPercent: "Success Rate 🎯", resetStatsBtn: "🔄 Reset Statistics",
        manageQsBtn: "⚙️ Manage Questions", addQsBtn: "➕ Add Question", openStudyTitle: "📝 Open Study", openStudyDesc: "Solve freely and see answers instantly",
        examModeTitle: "⏱️ Final Exam", examModeDesc: "1 min per question, results at the end", manageQsTitle: "Manage Questions",
        addQsTitle: "Add Question", singleModeBtn: "Single Add ✏️", bulkModeBtn: "Bulk & AI 🚀", qTypeLabel: "Type:",
        tfOption: "True / False", mcqOption: "Multiple Choice", mixedOption: "Mixed (Both)", qTextLabel: "Question:", opt1Label: "Option (1):",
        opt2Label: "Option (2):", opt3Label: "Option (3):", opt4Label: "Option (4):", correctAnswerLabel: "Correct Answer:",
        explanationLabel: "Explanation (Optional):", 
        saveBtnOnly: "💾 Save Question", 
        aiTitle: "🤖 AI Prompt Generator",
        aiDesc: "Paste the scientific material here, specify your request, and we'll generate a 'prompt' for the AI to output questions in the exact format needed!",
        aiPlaceholder: "Paste text or Drag & Drop (PDF, Word, TXT) here...", aiCountLabel: "Question Count:", aiTypeLabel: "Question Type:", aiGenBtn: "🪄 Generate & Copy Prompt", pasteTitle: "📥 Paste Ready Questions",
        pasteDesc: "After the AI generates your questions, paste them all here and click save.", saveBulkBtn: "⚡ Process & Save Questions",
        endExamBtn: "✖️ End Study", timeLabel: "⏱️ Time:", finalResultTitle: "🎯 Final Result", backToLectureBtn: "🔙 Back to Lecture",
        confirmMsg: "Are you sure?", confirmLogout: "Are you sure you want to logout?", cancelBtn: "Cancel", agreeBtn: "Confirm ✅", saveBtn: "Save 💾",
        js_demo: "Login to view and sync your real subjects...", js_loginReq: "Login with Google first! 🔒",
        js_demoReq: "Demo mode 👀.. Login to access! 🔒", js_saved: "Saved successfully ✅", js_deleted: "Deleted successfully 🗑️",
        js_qReq: "Add questions first!", js_timeUp: "Time is up! ⏰", js_copied: "Prompt copied successfully! 📋"
    }
};

let currentLang = localStorage.getItem('zaker_lang') || 'ar';

function t(key) { 
    return translations[currentLang][key] || key; 
}

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
    if (currentSubjectKey && document.getElementById('subjectTitle')) {
        document.getElementById('subjectTitle').innerText = currentSubjectName;
    }
    if (currentLectureName && document.getElementById('lectureTitle')) {
        document.getElementById('lectureTitle').innerText = `${currentSubjectName} - ${currentLectureName}`;
    }
    updateSoundBtn();
}

function toggleLanguage() { 
    currentLang = currentLang === 'ar' ? 'en' : 'ar'; 
    localStorage.setItem('zaker_lang', currentLang); 
    applyLanguage(); 
}

// =========================================
// 2. إعداد السحابة (Firebase)
// =========================================
const firebaseConfig = {
    apiKey: "AIzaSyBmQqHCyzeScuxLfRyB9KdSvM0817zML1s",
    authDomain: "zaker-app-161bf.firebaseapp.com",
    projectId: "zaker-app-161bf",
    storageBucket: "zaker-app-161bf.firebasestorage.app",
    messagingSenderId: "627429782820",
    appId: "1:627429782820:web:1727160f5d27abc6eeefb1",
    measurementId: "G-8WSSW3Q4QJ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 
const db = firebase.firestore(); 
const provider = new firebase.auth.GoogleAuthProvider();

let currentUser = null;
let subjectsMeta = {};
let allData = {};
let userProgress = {};

let currentSubjectKey = '';
let currentSubjectName = '';
let currentLectureName = '';
let currentQIndex = 0;
let editingQuestionIndex = -1; 
let isExamMode = false;
let examScore = 0;
let examTimeLeft = 0;
let examTimerInterval;

// =========================================
// 3. نظام تسجيل الدخول والمزامنة
// =========================================
function loginWithGoogle() { 
    auth.signInWithPopup(provider).catch(err => alert("Error: " + err.message)); 
}

function logout() {
    customConfirm(t('confirmLogout'), function() {
        auth.signOut().then(() => { 
            subjectsMeta = {}; 
            allData = {}; 
            userProgress = {}; 
            location.reload(); 
        });
    });
}

auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        document.getElementById('loginBtn').classList.add('hidden');
        document.getElementById('userProfile').classList.remove('hidden');
        document.getElementById('userImg').src = user.photoURL;
        document.getElementById('userName').innerText = user.displayName.split(' ')[0];
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('quoteText').style.display = 'none'; 
        
        changeQuote();
        loadDataFromCloud();
    } else {
        currentUser = null;
        document.getElementById('loginBtn').classList.remove('hidden');
        document.getElementById('userProfile').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('quoteText').style.display = 'block';
        document.getElementById('quoteText').innerText = t('js_demo');
        
        subjectsMeta = { 
            'demo1': { name: currentLang === 'ar' ? 'تحليل وتصميم النظم' : 'Systems Analysis', icon: '📊' }, 
            'demo2': { name: currentLang === 'ar' ? 'هياكل البيانات' : 'Data Structures', icon: '💻' } 
        };
        renderSubjects();
    }
});

async function loadDataFromCloud() {
    if (!currentUser) return;
    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        if (doc.exists) {
            const data = doc.data(); 
            subjectsMeta = data.subjectsMeta || {}; 
            allData = data.allData || {}; 
            userProgress = data.userProgress || {};
            
            if (!data.college) setTimeout(askForCollege, 1500);
        } else { 
            subjectsMeta = {}; 
            allData = {}; 
            userProgress = {}; 
            saveDataToCloud(); 
            setTimeout(askForCollege, 1500); 
        }
        renderSubjects(); 
        if(currentSubjectKey) updateDashboardUI();
    } catch (err) { 
        console.error("Cloud Error", err); 
    }
}

function askForCollege() { 
    customPrompt(currentLang==='ar' ? "إنت بتدرس في كلية/تخصص إيه؟" : "What is your college/major?", currentLang==='ar' ? "مثال: حاسبات ومعلومات" : "e.g., Computer Science", function(collegeName) { 
        if (collegeName && collegeName.trim() !== "") { 
            db.collection('users').doc(currentUser.uid).set({ college: sanitizeInput(collegeName.trim()) }, { merge: true }).then(() => showToast(t('js_saved'))); 
        } 
    }); 
}

function saveDataToCloud() { 
    if (!currentUser) return; 
    db.collection('users').doc(currentUser.uid).set({ 
        subjectsMeta: subjectsMeta, 
        allData: allData, 
        userProgress: userProgress, 
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp() 
    }, { merge: true }).catch(err => console.error(err)); 
}

function sanitizeInput(str) { 
    if (!str) return ''; 
    let temp = document.createElement('div'); 
    temp.textContent = str; 
    return temp.innerHTML; 
}

// =========================================
// 4. إدارة المواد والمحاضرات
// =========================================
function renderSubjects() {
    const container = document.getElementById('subjectsContainer'); 
    if (!container) return; 
    container.innerHTML = '';
    
    if (Object.keys(subjectsMeta).length === 0) {
        container.innerHTML = `<p style="text-align:center; width:100%; opacity:0.7;">${currentLang === 'ar' ? 'مفيش مواد لسه..' : 'No subjects yet..'}</p>`;
        return;
    }
    
    for (let key in subjectsMeta) {
        const meta = subjectsMeta[key];
        container.innerHTML += `
            <div class="card" style="position: relative;">
                <div style="position: absolute; top: 10px; ${currentLang === 'ar' ? 'left: 10px;' : 'right: 10px;'} z-index: 10;">
                    <button onclick="editSubjectMeta('${key}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">✏️</button>
                    <button onclick="deleteSubjectMeta('${key}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">🗑️</button>
                </div>
                <div onclick="openSubject('${key}', '${meta.name}')" style="height: 100%; display:flex; flex-direction:column; justify-content:center;">
                    <h3>${meta.icon} ${meta.name}</h3>
                </div>
            </div>`;
    }
}

function addNewSubject() { 
    if (!currentUser) return showToast(t('js_loginReq'), "error"); 
    customPrompt(currentLang==='ar'?"اسم المادة الجديدة:":"New Subject Name:", "", function(subName) { 
        if (!subName || subName.trim() === "") return; 
        let subKey = 'subj_' + Date.now(); 
        subjectsMeta[subKey] = { name: sanitizeInput(subName.trim()), icon: '📚' }; 
        allData[subKey] = {}; 
        saveDataToCloud(); 
        renderSubjects(); 
        showToast(t('js_saved')); 
    }); 
}

function editSubjectMeta(key, event) { 
    event.stopPropagation(); 
    if (!currentUser) return showToast(t('js_demoReq'), "error"); 
    customPrompt(currentLang==='ar'?"الاسم الجديد:":"New Name:", subjectsMeta[key].name, function(newName) { 
        if (newName && newName.trim() !== "") { 
            subjectsMeta[key].name = sanitizeInput(newName.trim()); 
            saveDataToCloud(); 
            renderSubjects(); 
            if(currentSubjectKey === key) document.getElementById('subjectTitle').innerText = subjectsMeta[key].name; 
        } 
    }); 
}

function deleteSubjectMeta(key, event) { 
    event.stopPropagation(); 
    if (!currentUser) return showToast(t('js_demoReq'), "error"); 
    customConfirm(t('confirmMsg'), function() { 
        delete subjectsMeta[key]; 
        delete allData[key]; 
        delete userProgress[key]; 
        saveDataToCloud(); 
        renderSubjects(); 
        showToast(t('js_deleted')); 
    }); 
}

function openSubject(subKey, subName) { 
    if (!currentUser) return showToast(t('js_demoReq'), "error"); 
    currentSubjectKey = subKey; 
    currentSubjectName = subName; 
    document.getElementById('subjectTitle').innerText = subName; 
    updateDashboardUI(); 
    renderLectures(); 
    showScreen('subjectScreen'); 
}

function renderLectures() {
    const container = document.getElementById('lecturesList'); 
    container.innerHTML = ''; 
    const lectures = allData[currentSubjectKey];
    
    if (!lectures || Object.keys(lectures).length === 0) {
        container.innerHTML = `<p style="text-align:center; width:100%; opacity:0.7;">${currentLang === 'ar' ? 'مفيش محاضرات لسه..' : 'No lectures yet..'}</p>`;
        return;
    }
    
    for(let lecName in lectures) { 
        container.innerHTML += `
        <div class="card" onclick="openLecture('${lecName}')" style="position: relative;">
            <div style="position: absolute; top: 10px; ${currentLang === 'ar' ? 'left: 10px;' : 'right: 10px;'}">
                <button onclick="editLecture('${lecName}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">✏️</button>
                <button onclick="deleteLecture('${lecName}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">🗑️</button>
            </div>
            <h3>📁 ${lecName}</h3>
            <p style="font-size: 1.1rem; font-weight: bold; margin-top: 10px; color: var(--text-color);">${currentLang==='ar'?'أسئلة:':'Qs:'} ${lectures[lecName].length}</p>
        </div>`; 
    }
}

function addLecture() { 
    customPrompt(currentLang==='ar'?"اسم المحاضرة:":"Lecture Name:", "", function(lecName) { 
        if(lecName && lecName.trim() !== "") { 
            lecName = sanitizeInput(lecName.trim()); 
            if(!allData[currentSubjectKey][lecName]) { 
                allData[currentSubjectKey][lecName] = []; 
                saveDataToCloud(); 
                renderLectures(); 
            } 
        } 
    }); 
}

function editLecture(oldName, event) { 
    event.stopPropagation(); 
    customPrompt(currentLang==='ar'?"الاسم الجديد:":"New Name:", oldName, function(newName) { 
        if (newName && newName.trim() !== "" && newName !== oldName) { 
            newName = sanitizeInput(newName.trim()); 
            allData[currentSubjectKey][newName] = allData[currentSubjectKey][oldName]; 
            delete allData[currentSubjectKey][oldName]; 
            saveDataToCloud(); 
            renderLectures(); 
        } 
    }); 
}

function deleteLecture(lecName, event) { 
    event.stopPropagation(); 
    customConfirm(t('confirmMsg'), function() { 
        delete allData[currentSubjectKey][lecName]; 
        saveDataToCloud(); 
        renderLectures(); 
        showToast(t('js_deleted')); 
    }); 
}

function openLecture(lecName) { 
    currentLectureName = lecName; 
    document.getElementById('lectureTitle').innerText = `${currentSubjectName} - ${lecName}`; 
    document.getElementById('addQSubjectName').innerText = `(${lecName})`; 
    
    let count = allData[currentSubjectKey][lecName].length; 
    document.getElementById('lectureQCount1').innerText = `${currentLang==='ar'?'الأسئلة:':'Total:'} ${count}`; 
    document.getElementById('lectureQCount2').innerText = `${t('timeLabel')} ${count} ${currentLang==='ar'?'دقيقة':'min'}`; 
    
    showScreen('lectureScreen'); 
}

function initSubjectProgress(subjectKey) { 
    if (!userProgress[subjectKey]) {
        userProgress[subjectKey] = { total: 0, correct: 0, wrong: 0 }; 
    }
}

function updateDashboardUI() { 
    if (!currentSubjectKey) return; 
    initSubjectProgress(currentSubjectKey); 
    let prog = userProgress[currentSubjectKey]; 
    
    document.getElementById('statTotal').innerText = prog.total; 
    document.getElementById('statCorrect').innerText = prog.correct; 
    document.getElementById('statWrong').innerText = prog.wrong; 
    document.getElementById('statPercent').innerText = (prog.total === 0 ? 0 : Math.round((prog.correct / prog.total) * 100)) + '%'; 
}

function resetProgress() { 
    customConfirm(t('confirmMsg'), function() { 
        userProgress[currentSubjectKey] = { total: 0, correct: 0, wrong: 0 }; 
        saveDataToCloud(); 
        updateDashboardUI(); 
    }); 
}

// =========================================
// 5. إدارة الأسئلة والسحب والإفلات
// =========================================
function toggleFormFields() { 
    const type = document.getElementById('qType').value; 
    const mcqFields = document.getElementById('mcqFields'); 
    const qAns = document.getElementById('qAnswer'); 
    qAns.innerHTML = ''; 
    
    if (type === 'mcq') { 
        mcqFields.classList.remove('hidden'); 
        qAns.innerHTML = `<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>`; 
    } else { 
        mcqFields.classList.add('hidden'); 
        qAns.innerHTML = `<option value="صح">${currentLang==='ar'?'صح':'True'}</option><option value="غلط">${currentLang==='ar'?'غلط':'False'}</option>`; 
    } 
}

function openAddQuestion() { 
    editingQuestionIndex = -1; 
    document.getElementById('qType').value = 'tf'; 
    toggleFormFields(); 
    document.getElementById('qText').value = ''; 
    document.getElementById('qExplanation').value = ''; 
    document.getElementById('opt1').value = ''; 
    document.getElementById('opt2').value = ''; 
    document.getElementById('opt3').value = ''; 
    document.getElementById('opt4').value = ''; 
    toggleAddMode('single'); 
    showScreen('addQuestionScreen'); 
}

function toggleAddMode(mode) { 
    if(mode === 'single') { 
        document.getElementById('singleAddMode').classList.remove('hidden'); 
        document.getElementById('bulkAddMode').classList.add('hidden'); 
        document.getElementById('btnSingleMode').style.backgroundColor = 'var(--primary-color)'; 
        document.getElementById('btnBulkMode').style.backgroundColor = 'var(--secondary-color)'; 
    } else { 
        document.getElementById('singleAddMode').classList.add('hidden'); 
        document.getElementById('bulkAddMode').classList.remove('hidden'); 
        document.getElementById('btnSingleMode').style.backgroundColor = 'var(--secondary-color)'; 
        document.getElementById('btnBulkMode').style.backgroundColor = 'var(--primary-color)'; 
    } 
}

function saveQuestion() {
    const type = document.getElementById('qType').value; 
    const q = sanitizeInput(document.getElementById('qText').value.trim()); 
    const exp = sanitizeInput(document.getElementById('qExplanation').value.trim());
    
    if(!q) return alert("الرجاء كتابة السؤال"); 
    
    let newQ = { type, q, explanation: exp }; 
    let correctAns = "";
    
    if (type === 'mcq') { 
        const o1 = sanitizeInput(document.getElementById('opt1').value.trim()); 
        const o2 = sanitizeInput(document.getElementById('opt2').value.trim()); 
        const o3 = sanitizeInput(document.getElementById('opt3').value.trim()); 
        const o4 = sanitizeInput(document.getElementById('opt4').value.trim()); 
        
        newQ.options = [o1, o2]; 
        if(o3) newQ.options.push(o3); 
        if(o4) newQ.options.push(o4); 
        
        const ansIndex = document.getElementById('qAnswer').value; 
        if (ansIndex === '1') correctAns = o1; 
        else if (ansIndex === '2') correctAns = o2; 
        else if (ansIndex === '3' && o3) correctAns = o3; 
        else if (ansIndex === '4' && o4) correctAns = o4; 
        
        newQ.a = correctAns; 
    } else { 
        newQ.a = document.getElementById('qAnswer').value; 
    }
    
    if (editingQuestionIndex > -1) { 
        allData[currentSubjectKey][currentLectureName][editingQuestionIndex] = newQ; 
    } else { 
        allData[currentSubjectKey][currentLectureName].push(newQ); 
    }
    
    saveDataToCloud(); 
    showToast(t('js_saved')); 
    
    // الحل الجذري لمشكلة الخروج من الموقع
    openLecture(currentLectureName);
}

function generateAIPrompt() {
    const sourceText = document.getElementById('aiSourceText').value.trim(); 
    const qCount = document.getElementById('aiQCount').value; 
    const qType = document.getElementById('aiQType').value;
    
    if (!sourceText) return alert(currentLang==='ar'?"حط المادة العلمية الأول!":"Paste material first!");
    
    let typeInstruction = "";
    if (qType === "mcq") { 
        typeInstruction = currentLang==='ar'?"كل الأسئلة تكون اختياري (MCQ). الصيغة:\n[السؤال]\n[الاختيار 1]\n[الاختيار 2]\n[الاختيار 3]\n[الاختيار 4]\n[الإجابة الصحيحة بالظبط]":"All questions MCQ. Format:\n[Question]\n[Opt 1]\n[Opt 2]\n[Opt 3]\n[Opt 4]\n[Exact Correct Answer]"; 
    } else if (qType === "tf") { 
        typeInstruction = currentLang==='ar'?"كل الأسئلة صح وخطأ. الصيغة:\n[السؤال]\n[صح أو غلط] (اكتب كلمة 'صح' أو 'غلط')":"All questions True/False. Format:\n[Question]\n[صح or غلط] (Use exact Arabic words 'صح' or 'غلط')"; 
    } else { 
        typeInstruction = currentLang==='ar'?"نص الأسئلة اختياري والنص صح وخطأ بنفس الصيغ المذكورة.":"Half MCQ, Half T/F using the exact formats."; 
    }
    
    const prompt = `${currentLang==='ar'?'أنت أستاذ جامعي. بناءً على النص قم بإنشاء':'You are a professor. Based on the text create'} ${qCount} ${currentLang==='ar'?'أسئلة. التعليمات الصارمة للصيغة:':'questions. Strict format rules:'}\n${typeInstruction}\n\n- ${currentLang==='ar'?'سطر فارغ بين كل سؤال والثاني.':'Empty line between questions.'}\n- ${currentLang==='ar'?'بدون أرقام للأسئلة أو الاختيارات.':'No numbers for questions or options.'}\n\n${currentLang==='ar'?'النص العلمي:':'Material:'}\n"""\n${sourceText}\n"""`;
    
    navigator.clipboard.writeText(prompt).then(() => { 
        showToast(t('js_copied')); 
        document.getElementById('aiActionButtons').style.display = 'flex'; 
        document.getElementById('aiSourceText').value = ''; 
    }).catch(err => alert('Copy failed!'));
}

function saveBulkQuestions() {
    const text = document.getElementById('bulkText').value.trim(); 
    if(!text) return;
    
    const blocks = text.split(/\n\s*\n/); 
    let added = 0;
    
    blocks.forEach(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l !== ''); 
        if(lines.length < 2) return; 
        
        const q = sanitizeInput(lines[0]); 
        let a = sanitizeInput(lines[lines.length - 1]);
        
        if(lines.length === 2) { 
            if(a === 'صح' || a === 'غلط' || a === 'True' || a === 'False') { 
                allData[currentSubjectKey][currentLectureName].push({ type: 'tf', q: q, a: (a==='True'?'صح':(a==='False'?'غلط':a)), explanation: '' }); 
                added++; 
            } 
        } else if (lines.length > 2) { 
            const options = lines.slice(1, lines.length - 1).map(opt => sanitizeInput(opt)); 
            allData[currentSubjectKey][currentLectureName].push({ type: 'mcq', q: q, options: options, a: a, explanation: '' }); 
            added++; 
        }
    });
    
    if(added > 0) { 
        saveDataToCloud(); 
        showToast(t('js_saved')); 
        document.getElementById('bulkText').value = ''; 
        openLecture(currentLectureName); 
    } 
}

function openManageQuestions() { 
    renderManageQuestions(); 
    showScreen('manageQuestionsScreen'); 
}

function renderManageQuestions() {
    const container = document.getElementById('questionsListContainer'); 
    container.innerHTML = ''; 
    const questions = allData[currentSubjectKey][currentLectureName];
    
    questions.forEach((q, index) => {
        let optsHtml = q.type === 'mcq' ? `<div style="font-size: 0.9rem; color: #7f8c8d; margin-top: 5px;">${q.options.join(' | ')}</div>` : '';
        container.innerHTML += `
        <div style="background: var(--input-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--input-border); position: relative; direction: ${currentLang==='ar'?'rtl':'ltr'}; text-align: ${currentLang==='ar'?'right':'left'};">
            <div style="position: absolute; top: 10px; ${currentLang==='ar'?'left: 10px;':'right: 10px;'} direction: ltr;">
                <button onclick="editQuestion(${index})" class="btn" style="padding: 5px 10px; font-size: 14px;">✏️</button>
                <button onclick="deleteQuestion(${index})" class="btn btn-danger" style="padding: 5px 10px; font-size: 14px;">🗑️</button>
            </div>
            <div style="${currentLang==='ar'?'padding-left':'padding-right'}: 150px;">
                <strong>Q${index + 1}:</strong> ${q.q}
                <div style="color: var(--success-color); margin-top: 5px;"><strong>Answer:</strong> ${q.a}</div>
                ${optsHtml}
            </div>
        </div>`;
    });
}

function deleteQuestion(index) { 
    customConfirm(t('confirmMsg'), function() { 
        allData[currentSubjectKey][currentLectureName].splice(index, 1); 
        saveDataToCloud(); 
        renderManageQuestions(); 
    }); 
}

function editQuestion(index) { 
    editingQuestionIndex = index; 
    const qToEdit = allData[currentSubjectKey][currentLectureName][index]; 
    document.getElementById('qType').value = qToEdit.type; 
    toggleFormFields(); 
    document.getElementById('qText').value = qToEdit.q; 
    document.getElementById('qExplanation').value = qToEdit.explanation || ''; 
    
    if (qToEdit.type === 'mcq') { 
        document.getElementById('opt1').value = qToEdit.options[0] || ''; 
        document.getElementById('opt2').value = qToEdit.options[1] || ''; 
        document.getElementById('opt3').value = qToEdit.options[2] || ''; 
        document.getElementById('opt4').value = qToEdit.options[3] || ''; 
        
        let matchIndex = '1'; 
        if (qToEdit.options[1] === qToEdit.a) matchIndex = '2'; 
        else if (qToEdit.options[2] === qToEdit.a) matchIndex = '3'; 
        else if (qToEdit.options[3] === qToEdit.a) matchIndex = '4';
        
        document.getElementById('qAnswer').value = matchIndex;
    } else { 
        document.getElementById('opt1').value = ''; 
        document.getElementById('opt2').value = ''; 
        document.getElementById('opt3').value = ''; 
        document.getElementById('opt4').value = ''; 
        document.getElementById('qAnswer').value = qToEdit.a; 
    } 
    toggleAddMode('single'); 
    showScreen('addQuestionScreen'); 
}

// =========================================
// السحب والإفلات المطور (TXT, PDF, Word)
// =========================================
function setupDragAndDrop() {
    const aiTextarea = document.getElementById('aiSourceText');
    if (!aiTextarea) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        aiTextarea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) { 
        e.preventDefault(); 
        e.stopPropagation(); 
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        aiTextarea.addEventListener(eventName, () => {
            aiTextarea.style.border = '2px dashed var(--success-color)';
            aiTextarea.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        aiTextarea.addEventListener(eventName, () => {
            aiTextarea.style.border = '2px dashed var(--primary-color)';
            aiTextarea.style.backgroundColor = 'transparent';
        }, false);
    });

    aiTextarea.addEventListener('drop', (e) => {
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]; 
            const fileName = file.name.toLowerCase();
            showToast(currentLang === 'ar' ? 'جاري استخراج النص... ⏳' : 'Extracting text... ⏳');
            
            if (fileName.endsWith('.txt')) {
                const reader = new FileReader();
                reader.onload = function(event) { 
                    aiTextarea.value = event.target.result; 
                    showToast(currentLang === 'ar' ? 'تم! ✅' : 'Done! ✅'); 
                };
                reader.readAsText(file);
            } 
            else if (fileName.endsWith('.pdf')) {
                const reader = new FileReader();
                reader.onload = async function() {
                    try {
                        const typedarray = new Uint8Array(this.result);
                        const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
                        let fullText = '';
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const textContent = await page.getTextContent();
                            fullText += textContent.items.map(item => item.str).join(' ') + '\n';
                        }
                        aiTextarea.value = fullText;
                        showToast(currentLang === 'ar' ? 'تم استخراج النص من الـ PDF! ✅' : 'PDF extracted! ✅');
                    } catch(err) { 
                        alert("Error reading PDF"); 
                    }
                };
                reader.readAsArrayBuffer(file);
            }
            else if (fileName.endsWith('.docx')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    mammoth.extractRawText({arrayBuffer: event.target.result})
                        .then(function(result){ 
                            aiTextarea.value = result.value; 
                            showToast(currentLang === 'ar' ? 'تم استخراج النص من الوورد! ✅' : 'Word extracted! ✅'); 
                        })
                        .catch(function(err) { 
                            alert("Error reading Word file"); 
                        });
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert(currentLang === 'ar' ? 'صيغة غير مدعومة! ارفع TXT, PDF أو DOCX' : 'Unsupported format! Use TXT, PDF, or DOCX');
            }
        }
    });
}

// =========================================
// 6. نظام الامتحان والمذاكرة (النسخة السليمة)
// =========================================
function startQuiz(isExam) {
    if(!currentSubjectKey || !currentLectureName || !allData[currentSubjectKey] || !allData[currentSubjectKey][currentLectureName]) {
        return;
    }
    
    const questions = allData[currentSubjectKey][currentLectureName]; 
    if(!questions || questions.length === 0) {
        return alert(t('js_qReq'));
    }
    
    isExamMode = isExam; 
    currentQIndex = 0; 
    examScore = 0; 
    clearInterval(examTimerInterval);
    
    if (isExamMode) { 
        document.getElementById('normalNavControls').style.display = 'none'; 
        document.getElementById('externalAiControls').style.display = 'none'; 
        document.getElementById('examTimerContainer').classList.remove('hidden'); 
        examTimeLeft = questions.length * 60; 
        updateTimerDisplay(); 
        examTimerInterval = setInterval(timerTick, 1000); 
    } else { 
        document.getElementById('normalNavControls').style.display = 'flex'; 
        document.getElementById('externalAiControls').style.display = 'block'; 
        document.getElementById('examTimerContainer').classList.add('hidden'); 
    }
    
    showScreen('quizScreen'); 
    loadQuestion();
}

function askExternalAI(platform) { 
    if(!allData[currentSubjectKey] || !allData[currentSubjectKey][currentLectureName]) return;
    const currentQ = allData[currentSubjectKey][currentLectureName][currentQIndex]; 
    if(!currentQ) return;
    
    const promptText = currentLang==='ar' ? `اشرحلي إجابة السؤال ده بالتفصيل:\n\nالسؤال:\n${currentQ.q}\n\nالإجابة الصحيحة:\n${currentQ.a}` : `Explain the answer to this question in detail:\n\nQuestion:\n${currentQ.q}\n\nCorrect Answer:\n${currentQ.a}`; 
    
    navigator.clipboard.writeText(promptText).then(() => { 
        showToast(t('js_copied')); 
        setTimeout(() => { 
            if(platform === 'chatgpt') window.open('https://chatgpt.com/', '_blank'); 
            if(platform === 'gemini') window.open('https://gemini.google.com/app', '_blank'); 
        }, 1200); 
    }); 
}

function timerTick() { 
    examTimeLeft--; 
    updateTimerDisplay(); 
    if (examTimeLeft <= 0) { 
        clearInterval(examTimerInterval); 
        alert(t('js_timeUp')); 
        endExam(); 
    } 
}

function updateTimerDisplay() { 
    let m = Math.floor(examTimeLeft / 60); 
    let s = examTimeLeft % 60; 
    document.getElementById('examTimerText').innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`; 
}

function cancelExam() { 
    clearInterval(examTimerInterval); 
    openLecture(currentLectureName); 
}

function loadQuestion() {
    document.getElementById('feedback').style.display = 'none'; 
    document.getElementById('controls').style.display = 'none'; 
    const optionsDiv = document.getElementById('options'); 
    optionsDiv.style.display = 'block'; 
    optionsDiv.innerHTML = ''; 
    
    const questionsList = allData[currentSubjectKey][currentLectureName];
    
    if(currentQIndex < questionsList.length) {
        if (!isExamMode && document.getElementById('questionSelect')) { 
            const qSelect = document.getElementById('questionSelect'); 
            qSelect.innerHTML = ''; 
            questionsList.forEach((q, i) => { 
                let opt = document.createElement('option'); 
                opt.value = i; 
                opt.text = `Q ${i + 1}`; 
                if (i === currentQIndex) opt.selected = true; 
                qSelect.appendChild(opt); 
            }); 
        }
        
        document.getElementById('quizProgress').innerText = `Question ${currentQIndex + 1} of ${questionsList.length}`; 
        const currentQ = questionsList[currentQIndex]; 
        document.getElementById('questionText').innerText = currentQ.q;
        
        if (currentQ.type === "tf") { 
            optionsDiv.innerHTML += `<button class="btn btn-option" onclick="checkAnswer('صح')">${currentLang==='ar'?'صح':'True'}</button><button class="btn btn-option" onclick="checkAnswer('غلط')">${currentLang==='ar'?'غلط':'False'}</button>`; 
        } else if (currentQ.type === "mcq") { 
            currentQ.options.forEach(opt => { 
                let safeOpt = opt.replace(/'/g, "\\'").replace(/"/g, '&quot;'); 
                optionsDiv.innerHTML += `<button class="btn btn-option" onclick="checkAnswer('${safeOpt}')">${opt}</button>`; 
            }); 
        }
    } else { 
        if (isExamMode) {
            endExam();
        } else {
            document.getElementById('quizProgress').innerText = currentLang==='ar'?"تم الانتهاء":"Finished"; 
            document.getElementById('questionText').innerText = "🎉"; 
            optionsDiv.style.display = 'none'; 
            document.getElementById('normalNavControls').style.display = 'none'; 
            document.getElementById('externalAiControls').style.display = 'none';
        }
    }
}

function checkAnswer(userAnswer) {
    const currentQ = allData[currentSubjectKey][currentLectureName][currentQIndex]; 
    initSubjectProgress(currentSubjectKey); 
    userProgress[currentSubjectKey].total++;
    
    if (isExamMode) { 
        if (userAnswer === currentQ.a) {
            examScore++; 
            userProgress[currentSubjectKey].correct++; 
            playSound('correct');
        } else {
            userProgress[currentSubjectKey].wrong++; 
            playSound('wrong');
        }
        saveDataToCloud(); 
        updateDashboardUI(); 
        currentQIndex++; 
        loadQuestion(); 
        return; 
    }
    
    const feedbackDiv = document.getElementById('feedback');
    const controlsDiv = document.getElementById('controls'); 
    
    document.getElementById('options').style.display = 'none'; 
    feedbackDiv.style.display = 'block'; 
    controlsDiv.style.display = 'flex'; 
    controlsDiv.style.gap = '10px';
    
    if (userAnswer === currentQ.a) { 
        userProgress[currentSubjectKey].correct++; 
        playSound('correct'); 
        feedbackDiv.className = 'feedback correct'; 
        feedbackDiv.innerHTML = `✅ <strong>Correct!</strong> <br><br> ${currentQ.explanation || ''}`; 
        document.getElementById('tryAgainBtn').style.display = 'none'; 
        document.getElementById('nextBtn').style.display = 'inline-block'; 
    } else { 
        userProgress[currentSubjectKey].wrong++; 
        playSound('wrong'); 
        feedbackDiv.className = 'feedback wrong'; 
        feedbackDiv.innerHTML = `❌ <strong>Wrong!</strong> <br><br> ${currentQ.explanation || ''}`; 
        document.getElementById('tryAgainBtn').style.display = 'inline-block'; 
        document.getElementById('nextBtn').style.display = 'none'; 
    }
    
    saveDataToCloud(); 
    updateDashboardUI();
}

function endExam() { 
    clearInterval(examTimerInterval); 
    const totalQs = allData[currentSubjectKey][currentLectureName].length; 
    const percent = Math.round((examScore / totalQs) * 100); 
    
    if (percent === 100) triggerConfetti(); 
    document.getElementById('finalScoreText').innerText = `${percent}%`; 
    showScreen('examResultScreen'); 
}

function backToLectureFromExam() {
    openLecture(currentLectureName);
}

function tryAgain() { 
    document.getElementById('feedback').style.display = 'none'; 
    document.getElementById('controls').style.display = 'none'; 
    document.getElementById('options').style.display = 'block'; 
}

function nextQuestion() { 
    currentQIndex++; 
    loadQuestion(); 
}

function prevQuestion() { 
    if (currentQIndex > 0) { 
        currentQIndex--; 
        loadQuestion(); 
    } 
}

function nextQuestionNav() { 
    const qList = allData[currentSubjectKey][currentLectureName]; 
    if (currentQIndex < qList.length - 1) { 
        currentQIndex++; 
        loadQuestion(); 
    } 
}

function jumpToQuestion(index) { 
    currentQIndex = parseInt(index); 
    loadQuestion(); 
}

// =========================================
// 7. أدوات التصدير والواجهة
// =========================================
function exportData() { 
    if(!currentUser) return alert(t('js_loginReq')); 
    const fullBackup = { meta: subjectsMeta, data: allData, progress: userProgress }; 
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" }); 
    const url = URL.createObjectURL(blob); 
    const a = document.createElement('a'); 
    a.href = url; 
    a.download = `Zaker_Questions_${new Date().toISOString().slice(0, 10)}.json`; 
    document.body.appendChild(a); 
    a.click(); 
    document.body.removeChild(a); 
    URL.revokeObjectURL(url); 
}

function importData(event) { 
    if(!currentUser) return alert(t('js_loginReq')); 
    const file = event.target.files[0]; 
    if (!file) return; 
    
    const reader = new FileReader(); 
    reader.onload = function(e) { 
        try { 
            const imported = JSON.parse(e.target.result); 
            let impMeta = imported.meta || {}; 
            let impData = imported.data || imported; 
            let addedCount = 0; 
            
            for (let key in impMeta) { 
                let newKey = 'subj_' + Date.now() + Math.floor(Math.random() * 1000); 
                subjectsMeta[newKey] = impMeta[key]; 
                subjectsMeta[newKey].name = subjectsMeta[newKey].name + (currentLang==='ar'?' (من الدفعة)':' (Imported)'); 
                allData[newKey] = impData[key] || {}; 
                userProgress[newKey] = { total: 0, correct: 0, wrong: 0 }; 
                addedCount++; 
            } 
            
            if (addedCount > 0) { 
                saveDataToCloud(); 
                renderSubjects(); 
                showToast(t('js_saved')); 
            } 
        } catch (err) { 
            alert('Error reading file!'); 
        } 
    }; 
    reader.readAsText(file); 
    event.target.value = ''; 
}

function showToast(message, type = 'success') { 
    const container = document.getElementById('toast-container'); 
    if(!container) return; 
    const toast = document.createElement('div'); 
    toast.className = `toast ${type}`; 
    toast.innerText = message; 
    container.appendChild(toast); 
    setTimeout(() => { toast.remove(); }, 3000); 
}

window.alert = function(message) { 
    showToast(message, (message.includes('خطأ') || message.toLowerCase().includes('error')) ? 'error' : 'success'); 
};

let confirmCallback = null; 
function customConfirm(message, callback) { 
    document.getElementById('confirmMessage').innerText = message; 
    document.getElementById('confirmModal').style.display = 'flex'; 
    confirmCallback = callback; 
} 

function closeConfirm() { 
    document.getElementById('confirmModal').style.display = 'none'; 
    confirmCallback = null; 
} 

document.getElementById('confirmBtnYes').onclick = function() { 
    if (confirmCallback) confirmCallback(); 
    closeConfirm(); 
};

let promptCallback = null; 
function customPrompt(message, defaultValue, callback) { 
    document.getElementById('promptMessage').innerText = message; 
    const inputEl = document.getElementById('promptInput'); 
    inputEl.value = defaultValue || ''; 
    document.getElementById('promptModal').style.display = 'flex'; 
    inputEl.focus(); 
    promptCallback = callback; 
} 

function closePrompt() { 
    document.getElementById('promptModal').style.display = 'none'; 
    promptCallback = null; 
} 

document.getElementById('promptBtnYes').onclick = function() { 
    if(promptCallback) promptCallback(document.getElementById('promptInput').value); 
    closePrompt(); 
};

function toggleTheme() { 
    document.body.getAttribute('data-theme') === 'dark' ? document.body.removeAttribute('data-theme') : document.body.setAttribute('data-theme', 'dark'); 
}

function showScreen(screenId) { 
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); 
    document.getElementById(screenId).classList.add('active'); 
    window.scrollTo(0, 0); 
}

let audioCtx = null; 
let isSoundEnabled = localStorage.getItem('myUniversityApp_sound') !== 'disabled'; 

function updateSoundBtn() { 
    const btn = document.getElementById('soundToggleBtn'); 
    if(btn) { 
        btn.innerHTML = isSoundEnabled ? (currentLang==='ar'?'🔊 الصوت شغال':'🔊 Sound On') : (currentLang==='ar'?'🔇 الصوت مكتوم':'🔇 Sound Off'); 
    } 
}

function toggleSound() { 
    isSoundEnabled = !isSoundEnabled; 
    localStorage.setItem('myUniversityApp_sound', isSoundEnabled ? 'enabled' : 'disabled'); 
    updateSoundBtn(); 
    showToast(isSoundEnabled ? (currentLang==='ar'?'تم تشغيل الصوت 🔊':'Sound On 🔊') : (currentLang==='ar'?'تم كتم الصوت 🔇':'Sound Off 🔇')); 
}

function playSound(type) { 
    if (!isSoundEnabled) return; 
    try { 
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); 
        if (audioCtx.state === 'suspended') audioCtx.resume(); 
        
        const osc = audioCtx.createOscillator(); 
        const gainNode = audioCtx.createGain(); 
        osc.connect(gainNode); 
        gainNode.connect(audioCtx.destination); 
        
        if (type === 'correct') { 
            osc.type = 'sine'; 
            osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
            osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); 
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); 
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1); 
            osc.start(); 
            osc.stop(audioCtx.currentTime + 0.15); 
        } else if (type === 'wrong') { 
            osc.type = 'sawtooth'; 
            osc.frequency.setValueAtTime(150, audioCtx.currentTime); 
            osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2); 
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); 
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2); 
            osc.start(); 
            osc.stop(audioCtx.currentTime + 0.25); 
        } 
    } catch(e) {} 
}

const motivationalQuotes = ["وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ", "إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا", "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", "بِقَدْرِ الكَدِّ تُكْتَسَبُ المَعَالِي", "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ"];
let lastQuoteIndex = -1; 

function changeQuote() {
    const textEl = document.getElementById('quoteText'); 
    if(!textEl || currentUser) return; 
    
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

window.onload = function() { 
    applyLanguage();
    setupDragAndDrop(); 
    setInterval(changeQuote, 12000);
    showScreen('homeScreen');
};