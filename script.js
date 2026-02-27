// =========================================
// 1. إعداد السحابة (Firebase Configuration)
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

// تهيئة المشروع
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

let currentUser = null;
let subjectsMeta = {};
let allData = {};
let userProgress = {};
let currentSubjectKey = '', currentSubjectName = '', currentLectureName = '', currentQIndex = 0, editingQuestionIndex = -1; 
let isExamMode = false, examScore = 0, examTimeLeft = 0, examTimerInterval;

// =========================================
// 2. نظام تسجيل الدخول والمزامنة
// =========================================
function loginWithGoogle() {
    showToast("جاري تسجيل الدخول...");
    auth.signInWithPopup(provider).catch(err => alert("خطأ في الدخول: " + err.message));
}

function logout() {
    auth.signOut().then(() => {
        subjectsMeta = {}; allData = {}; userProgress = {};
        location.reload();
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
        
        loadDataFromCloud();
    } else {
        currentUser = null;
        document.getElementById('loginBtn').classList.remove('hidden');
        document.getElementById('userProfile').classList.add('hidden');
        
        // عرض تجريبي للزوار
        document.getElementById('mainContent').classList.remove('hidden');
        subjectsMeta = {
            'demo1': { name: 'تحليل وتصميم النظم', icon: '📊' },
            'demo2': { name: 'هياكل البيانات والخوارزميات', icon: '💻' },
            'demo3': { name: 'تفاعل الحاسب والإنسان', icon: '🖱️' }
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
            showToast("تم مزامنة بياناتك بنجاح ✅");
            
            if (!data.college) setTimeout(askForCollege, 1500);
        } else {
            subjectsMeta = {}; allData = {}; userProgress = {};
            saveDataToCloud();
            setTimeout(askForCollege, 1500);
        }
        renderSubjects();
        if(currentSubjectKey) updateDashboardUI();
    } catch (err) {
        console.error(err);
        alert("خطأ في جلب البيانات من السيرفر!");
    }
}

function askForCollege() {
    customPrompt("أهلاً بيك يا بطل في ذاكر! إنت بتدرس في كلية/تخصص إيه؟", "مثال: نظم معلومات، حاسبات...", function(collegeName) {
        if (collegeName && collegeName.trim() !== "") {
            db.collection('users').doc(currentUser.uid).set({
                college: sanitizeInput(collegeName.trim())
            }, { merge: true }).then(() => showToast("عاش! تم حفظ بياناتك 🎓"));
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
    }, { merge: true }).catch(err => console.error("Error saving:", err));
}

function sanitizeInput(str) {
    if (!str) return '';
    let temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML; 
}

// =========================================
// 3. إدارة المواد 
// =========================================
function renderSubjects() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;
    container.innerHTML = '';
    if (Object.keys(subjectsMeta).length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%; opacity:0.7;">مفيش مواد لسه.. ضيف مادة جديدة عشان تبدأ رحلتك!</p>';
        return;
    }
    for (let key in subjectsMeta) {
        const meta = subjectsMeta[key];
        container.innerHTML += `
            <div class="card" style="position: relative;">
                <div style="position: absolute; top: 10px; left: 10px; z-index: 10;">
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
    if (!currentUser) return showToast("سجل دخول بحساب جوجل الأول عشان تضيف موادك! 🔒", "error");
    customPrompt("اكتب اسم المادة الجديدة:", "", function(subName) {
        if (!subName || subName.trim() === "") return;
        let subKey = 'subj_' + Date.now(); 
        subjectsMeta[subKey] = { name: sanitizeInput(subName.trim()), icon: '📚' };
        allData[subKey] = {};
        saveDataToCloud(); 
        renderSubjects();
        showToast('تم إضافة المادة وحفظها سحابياً ☁️');
    });
}

function editSubjectMeta(key, event) {
    event.stopPropagation();
    if (!currentUser) return showToast("نسخة تجريبية! سجل دخول للتعديل.", "error");
    customPrompt("اكتب الاسم الجديد للمادة:", subjectsMeta[key].name, function(newName) {
        if (newName && newName.trim() !== "") {
            subjectsMeta[key].name = sanitizeInput(newName.trim());
            saveDataToCloud(); renderSubjects();
            if(currentSubjectKey === key) document.getElementById('subjectTitle').innerText = subjectsMeta[key].name;
        }
    });
}

function deleteSubjectMeta(key, event) {
    event.stopPropagation();
    if (!currentUser) return showToast("نسخة تجريبية! سجل دخول للتعديل.", "error");
    customConfirm(`متأكد إنك عايز تمسح مادة "${subjectsMeta[key].name}"؟`, function() {
        delete subjectsMeta[key]; delete allData[key]; delete userProgress[key];
        saveDataToCloud(); renderSubjects(); showToast('تم المسح بنجاح 🗑️');
    });
}

function openSubject(subKey, subName) { 
    if (!currentUser) return showToast("دي نسخة عرض 👀.. سجل دخول عشان تفتح المحاضرات! 🔒", "error");
    currentSubjectKey = subKey; currentSubjectName = subName; 
    document.getElementById('subjectTitle').innerText = subName; 
    updateDashboardUI(); renderLectures(); showScreen('subjectScreen'); 
}

// =========================================
// 4. المحاضرات والإحصائيات
// =========================================
function renderLectures() {
    const container = document.getElementById('lecturesList'); container.innerHTML = ''; const lectures = allData[currentSubjectKey];
    if (!lectures || Object.keys(lectures).length === 0) return container.innerHTML = '<p style="text-align:center; width: 100%; opacity: 0.7;">مفيش محاضرات لسه..</p>';
    for(let lecName in lectures) {
        container.innerHTML += `<div class="card" onclick="openLecture('${lecName}')" style="position: relative;">
            <div style="position: absolute; top: 10px; left: 10px;"><button onclick="editLecture('${lecName}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">✏️</button><button onclick="deleteLecture('${lecName}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">🗑️</button></div>
            <h3>📁 ${lecName}</h3><p style="font-size: 1.1rem; font-weight: bold; margin-top: 10px; color: var(--text-color);">أسئلة: ${lectures[lecName].length}</p></div>`;
    }
}

function addLecture() { 
    customPrompt("اكتب اسم المحاضرة:", "", function(lecName) {
        if(lecName && lecName.trim() !== "") { 
            lecName = sanitizeInput(lecName.trim()); 
            if(allData[currentSubjectKey][lecName]) return alert("المحاضرة موجودة!"); 
            allData[currentSubjectKey][lecName] = []; 
            saveDataToCloud(); renderLectures(); 
        }
    });
}

function editLecture(oldName, event) { 
    event.stopPropagation(); 
    customPrompt("اكتب الاسم الجديد للمحاضرة:", oldName, function(newName) {
        if (newName && newName.trim() !== "" && newName !== oldName) { 
            newName = sanitizeInput(newName.trim()); 
            if(allData[currentSubjectKey][newName]) return alert("الاسم موجود!"); 
            allData[currentSubjectKey][newName] = allData[currentSubjectKey][oldName]; 
            delete allData[currentSubjectKey][oldName]; 
            saveDataToCloud(); renderLectures(); 
        }
    }); 
}

function deleteLecture(lecName, event) { event.stopPropagation(); customConfirm(`متأكد من مسح "${lecName}"؟`, function() { delete allData[currentSubjectKey][lecName]; saveDataToCloud(); renderLectures(); showToast("تم مسح المحاضرة 🗑️"); }); }

function openLecture(lecName) { currentLectureName = lecName; document.getElementById('lectureTitle').innerText = `${currentSubjectName} - ${lecName}`; document.getElementById('addQSubjectName').innerText = `(${lecName})`; let count = allData[currentSubjectKey][lecName].length; document.getElementById('lectureQCount1').innerText = `إجمالي الأسئلة: ${count}`; document.getElementById('lectureQCount2').innerText = `الوقت: ${count} دقيقة`; showScreen('lectureScreen'); }

function initSubjectProgress(subjectKey) { if (!userProgress[subjectKey]) userProgress[subjectKey] = { total: 0, correct: 0, wrong: 0 }; }
function updateDashboardUI() {
    if (!currentSubjectKey) return;
    initSubjectProgress(currentSubjectKey); let prog = userProgress[currentSubjectKey];
    const tEl = document.getElementById('statTotal'), cEl = document.getElementById('statCorrect'), wEl = document.getElementById('statWrong'), pEl = document.getElementById('statPercent');
    if(tEl) tEl.innerText = prog.total; if(cEl) cEl.innerText = prog.correct; if(wEl) wEl.innerText = prog.wrong;
    if(pEl) pEl.innerText = (prog.total === 0 ? 0 : Math.round((prog.correct / prog.total) * 100)) + '%';
}
function resetProgress() { customConfirm('متأكد إنك عايز تصفر إحصائيات المادة دي؟', function() { userProgress[currentSubjectKey] = { total: 0, correct: 0, wrong: 0 }; saveDataToCloud(); updateDashboardUI(); showToast('تم التصفير بنجاح 🔄'); }); }

// =========================================
// 5. إدارة الأسئلة 
// =========================================
function toggleFormFields() { 
    const type = document.getElementById('qType').value; const mcqFields = document.getElementById('mcqFields'); const qAns = document.getElementById('qAnswer'); qAns.innerHTML = ''; 
    if (type === 'mcq') { mcqFields.classList.remove('hidden'); qAns.innerHTML = `<option value="1">الاختيار الأول (1)</option><option value="2">الاختيار الثاني (2)</option><option value="3">الاختيار الثالث (3)</option><option value="4">الاختيار الرابع (4)</option>`; } 
    else { mcqFields.classList.add('hidden'); qAns.innerHTML = `<option value="صح">صح</option><option value="غلط">غلط</option>`; } 
}

function openAddQuestion() { 
    editingQuestionIndex = -1; document.getElementById('qType').value = 'tf'; toggleFormFields(); 
    document.getElementById('qText').value = ''; document.getElementById('qExplanation').value = ''; 
    document.getElementById('opt1').value = ''; document.getElementById('opt2').value = ''; document.getElementById('opt3').value = ''; document.getElementById('opt4').value = ''; 
    document.getElementById('addQSubjectName').innerText = `(إضافة سؤال)`; toggleAddMode('single'); showScreen('addQuestionScreen'); 
}

function toggleAddMode(mode) {
    if(mode === 'single') { document.getElementById('singleAddMode').classList.remove('hidden'); document.getElementById('bulkAddMode').classList.add('hidden'); document.getElementById('btnSingleMode').style.backgroundColor = 'var(--primary-color)'; document.getElementById('btnBulkMode').style.backgroundColor = 'var(--secondary-color)'; } 
    else { document.getElementById('singleAddMode').classList.add('hidden'); document.getElementById('bulkAddMode').classList.remove('hidden'); document.getElementById('btnSingleMode').style.backgroundColor = 'var(--secondary-color)'; document.getElementById('btnBulkMode').style.backgroundColor = 'var(--primary-color)'; }
}

function saveQuestion() {
    const type = document.getElementById('qType').value; const q = sanitizeInput(document.getElementById('qText').value.trim()); const exp = sanitizeInput(document.getElementById('qExplanation').value.trim());
    if(!q) return alert("اكتب السؤال!"); 
    let newQ = { type, q, explanation: exp }; let correctAns = "";
    if (type === 'mcq') { 
        const o1 = sanitizeInput(document.getElementById('opt1').value.trim()); const o2 = sanitizeInput(document.getElementById('opt2').value.trim()); const o3 = sanitizeInput(document.getElementById('opt3').value.trim()); const o4 = sanitizeInput(document.getElementById('opt4').value.trim());
        if(!o1 || !o2) return alert("لازم تكتب اختيارين على الأقل!"); 
        newQ.options = [o1, o2]; if(o3) newQ.options.push(o3); if(o4) newQ.options.push(o4); 
        const ansIndex = document.getElementById('qAnswer').value;
        if (ansIndex === '1') correctAns = o1; else if (ansIndex === '2') correctAns = o2; else if (ansIndex === '3' && o3) correctAns = o3; else if (ansIndex === '4' && o4) correctAns = o4; else return alert("الاختيار الصحيح اللي حددته فاضي!");
        newQ.a = correctAns;
    } else { newQ.a = document.getElementById('qAnswer').value; }

    if (editingQuestionIndex > -1) { allData[currentSubjectKey][currentLectureName][editingQuestionIndex] = newQ; showToast("تم التعديل ✏️"); } 
    else { allData[currentSubjectKey][currentLectureName].push(newQ); showToast("تم الحفظ في السحابة 🚀"); }

    saveDataToCloud(); let count = allData[currentSubjectKey][currentLectureName].length; document.getElementById('lectureQCount1').innerText = `الأسئلة: ${count}`; document.getElementById('lectureQCount2').innerText = `الوقت: ${count} دقيقة`; history.back();
}

function saveBulkQuestions() {
    const text = document.getElementById('bulkText').value.trim(); if(!text) return alert("المربع فاضي يا هندسة! انسخ الأسئلة الأول.");
    const blocks = text.split(/\n\s*\n/); let added = 0;
    blocks.forEach(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l !== '');
        if(lines.length < 2) return; 
        const q = sanitizeInput(lines[0]); let a = sanitizeInput(lines[lines.length - 1]);
        if(lines.length === 2) { if(a === 'صح' || a === 'غلط') { allData[currentSubjectKey][currentLectureName].push({ type: 'tf', q: q, a: a, explanation: '' }); added++; } } 
        else if (lines.length > 2) { const options = lines.slice(1, lines.length - 1).map(opt => sanitizeInput(opt)); allData[currentSubjectKey][currentLectureName].push({ type: 'mcq', q: q, options: options, a: a, explanation: '' }); added++; }
    });

    if(added > 0) { saveDataToCloud(); let count = allData[currentSubjectKey][currentLectureName].length; document.getElementById('lectureQCount1').innerText = `إجمالي الأسئلة: ${count}`; document.getElementById('lectureQCount2').innerText = `الوقت: ${count} دقيقة`; showToast(`عاش! تم حفظ ${added} سؤال سحابياً 🚀`); document.getElementById('bulkText').value = ''; history.back(); } 
    else { alert("مفيش أسئلة اتضافت! تأكد من الصيغة."); }
}

function openManageQuestions() { renderManageQuestions(); showScreen('manageQuestionsScreen'); }
function renderManageQuestions() {
    const container = document.getElementById('questionsListContainer'); container.innerHTML = ''; const questions = allData[currentSubjectKey][currentLectureName];
    if(questions.length === 0) return container.innerHTML = '<p style="text-align:center;">مفيش أسئلة لسه.</p>';
    questions.forEach((q, index) => {
        let optsHtml = q.type === 'mcq' ? `<div style="font-size: 0.9rem; color: #7f8c8d; margin-top: 5px;">${q.options.join(' | ')}</div>` : '';
        container.innerHTML += `<div style="background: var(--input-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--input-border); position: relative; direction: ltr; text-align: left;"><div style="position: absolute; top: 10px; right: 10px; direction: rtl;"><button onclick="editQuestion(${index})" class="btn" style="padding: 5px 10px; font-size: 14px;">✏️</button><button onclick="deleteQuestion(${index})" class="btn btn-danger" style="padding: 5px 10px; font-size: 14px;">🗑️</button></div><div style="padding-right: 150px;"><strong>Q${index + 1}:</strong> ${q.q}<div style="color: var(--success-color); margin-top: 5px;"><strong>Answer:</strong> ${q.a}</div>${optsHtml}</div></div>`;
    });
}
function deleteQuestion(index) { customConfirm("متأكد هتمسح السؤال؟", function() { allData[currentSubjectKey][currentLectureName].splice(index, 1); saveDataToCloud(); renderManageQuestions(); showToast("تم المسح 🗑️"); }); }
function editQuestion(index) { 
    editingQuestionIndex = index; const qToEdit = allData[currentSubjectKey][currentLectureName][index]; 
    document.getElementById('qType').value = qToEdit.type; toggleFormFields(); 
    document.getElementById('qText').value = qToEdit.q; document.getElementById('qExplanation').value = qToEdit.explanation || ''; 
    if (qToEdit.type === 'mcq') { 
        document.getElementById('opt1').value = qToEdit.options[0] || ''; document.getElementById('opt2').value = qToEdit.options[1] || ''; document.getElementById('opt3').value = qToEdit.options[2] || ''; document.getElementById('opt4').value = qToEdit.options[3] || ''; 
        let matchIndex = '1'; if (qToEdit.options[1] === qToEdit.a) matchIndex = '2'; else if (qToEdit.options[2] === qToEdit.a) matchIndex = '3'; else if (qToEdit.options[3] === qToEdit.a) matchIndex = '4';
        document.getElementById('qAnswer').value = matchIndex;
    } else { document.getElementById('opt1').value = ''; document.getElementById('opt2').value = ''; document.getElementById('opt3').value = ''; document.getElementById('opt4').value = ''; document.getElementById('qAnswer').value = qToEdit.a; } 
    toggleAddMode('single'); showScreen('addQuestionScreen'); 
}

// =========================================
// 6. نظام الامتحان والمذاكرة
// =========================================
function startQuiz(isExam) {
    const questions = allData[currentSubjectKey][currentLectureName]; if(questions.length === 0) return alert("ضيف أسئلة الأول!");
    isExamMode = isExam; currentQIndex = 0; examScore = 0; clearInterval(examTimerInterval);
    if (isExamMode) { 
        if(document.getElementById('normalNavControls')) document.getElementById('normalNavControls').style.display = 'none'; 
        if(document.getElementById('externalAiControls')) document.getElementById('externalAiControls').style.display = 'none'; 
        if(document.getElementById('examTimerContainer')) document.getElementById('examTimerContainer').classList.remove('hidden'); 
        examTimeLeft = questions.length * 60; updateTimerDisplay(); examTimerInterval = setInterval(timerTick, 1000); 
    } else { 
        if(document.getElementById('normalNavControls')) document.getElementById('normalNavControls').style.display = 'flex'; 
        if(document.getElementById('externalAiControls')) document.getElementById('externalAiControls').style.display = 'block'; 
        if(document.getElementById('examTimerContainer')) document.getElementById('examTimerContainer').classList.add('hidden'); 
    }
    showScreen('quizScreen'); loadQuestion();
}

function askExternalAI(platform) {
    const currentQ = allData[currentSubjectKey][currentLectureName][currentQIndex];
    const promptText = `أنا بذاكر ومحتاجك تشرحلي وتبسطلي إجابة السؤال ده وتفهمهوني بالتفصيل:\n\nالسؤال:\n${currentQ.q}\n\nالإجابة الصحيحة هي:\n${currentQ.a}`;
    navigator.clipboard.writeText(promptText).then(() => {
        showToast('تم نسخ السؤال! 📋 اعمل (Paste) في المحادثة', 'success');
        setTimeout(() => { if(platform === 'chatgpt') window.open('https://chatgpt.com/', '_blank'); if(platform === 'gemini') window.open('https://gemini.google.com/app', '_blank'); }, 1200);
    }).catch(err => alert('المتصفح بتاعك مانع النسخ التلقائي.'));
}

function timerTick() { examTimeLeft--; updateTimerDisplay(); if (examTimeLeft <= 0) { clearInterval(examTimerInterval); alert("انتهى وقت الامتحان! ⏰"); endExam(); } }
function updateTimerDisplay() { let m = Math.floor(examTimeLeft / 60); let s = examTimeLeft % 60; let el = document.getElementById('examTimerText'); if(el) el.innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`; }
function cancelExam() { clearInterval(examTimerInterval); history.back(); }

function loadQuestion() {
    try {
        if(document.getElementById('feedback')) document.getElementById('feedback').style.display = 'none'; 
        if(document.getElementById('controls')) document.getElementById('controls').style.display = 'none'; 
        const optionsDiv = document.getElementById('options'); optionsDiv.style.display = 'block'; optionsDiv.innerHTML = ''; 
        const questionsList = allData[currentSubjectKey][currentLectureName];
        
        if(currentQIndex < questionsList.length) {
            if (!isExamMode && document.getElementById('questionSelect')) { 
                const qSelect = document.getElementById('questionSelect'); qSelect.innerHTML = ''; 
                questionsList.forEach((q, i) => { let opt = document.createElement('option'); opt.value = i; opt.text = `سؤال ${i + 1}`; if (i === currentQIndex) opt.selected = true; qSelect.appendChild(opt); }); 
            }
            if(document.getElementById('quizProgress')) document.getElementById('quizProgress').innerText = `Question ${currentQIndex + 1} of ${questionsList.length}`; 
            
            const currentQ = questionsList[currentQIndex]; 
            if(document.getElementById('questionText')) document.getElementById('questionText').innerText = currentQ.q;
            
            if (currentQ.type === "tf") { optionsDiv.innerHTML += `<button class="btn btn-option" onclick="checkAnswer('صح')">True (صح)</button><button class="btn btn-option" onclick="checkAnswer('غلط')">False (غلط)</button>`; } 
            else if (currentQ.type === "mcq") { currentQ.options.forEach(opt => { let safeOpt = opt.replace(/'/g, "\\'").replace(/"/g, '&quot;'); optionsDiv.innerHTML += `<button class="btn btn-option" onclick="checkAnswer('${safeOpt}')">${opt}</button>`; }); }
        } else { isExamMode ? endExam() : (document.getElementById('quizProgress').innerText = "تم الانتهاء", document.getElementById('questionText').innerText = "🎉 عاش يا بطل!", optionsDiv.style.display = 'none', document.getElementById('normalNavControls').style.display = 'none', document.getElementById('externalAiControls').style.display = 'none'); }
    } catch(err) {}
}

function checkAnswer(userAnswer) {
    const currentQ = allData[currentSubjectKey][currentLectureName][currentQIndex]; initSubjectProgress(currentSubjectKey); userProgress[currentSubjectKey].total++;
    if (isExamMode) { userAnswer === currentQ.a ? (examScore++, userProgress[currentSubjectKey].correct++, playSound('correct')) : (userProgress[currentSubjectKey].wrong++, playSound('wrong')); saveDataToCloud(); updateDashboardUI(); currentQIndex++; loadQuestion(); return; }
    
    const feedbackDiv = document.getElementById('feedback'), controlsDiv = document.getElementById('controls'); 
    document.getElementById('options').style.display = 'none'; feedbackDiv.style.display = 'block'; controlsDiv.style.display = 'flex'; controlsDiv.style.gap = '10px';
    if (userAnswer === currentQ.a) { 
        userProgress[currentSubjectKey].correct++; playSound('correct'); 
        feedbackDiv.className = 'feedback correct'; feedbackDiv.innerHTML = `✅ <strong>Correct!</strong> <br><br> ${currentQ.explanation ? 'Explanation: ' + currentQ.explanation : ''}`; 
        document.getElementById('tryAgainBtn').style.display = 'none'; document.getElementById('nextBtn').style.display = 'inline-block'; 
    } else { 
        userProgress[currentSubjectKey].wrong++; playSound('wrong'); 
        feedbackDiv.className = 'feedback wrong'; feedbackDiv.innerHTML = `❌ <strong>Wrong!</strong> <br><br> ${currentQ.explanation ? 'Explanation: ' + currentQ.explanation : ''}`; 
        document.getElementById('tryAgainBtn').style.display = 'inline-block'; document.getElementById('nextBtn').style.display = 'none'; 
    }
    saveDataToCloud(); updateDashboardUI();
}

function endExam() {
    clearInterval(examTimerInterval); const totalQs = allData[currentSubjectKey][currentLectureName].length; const percent = Math.round((examScore / totalQs) * 100);
    let msg = percent >= 90 ? "🔥 أسطورة! درجتك ممتازة." : percent >= 75 ? "👏 عاش جداً! مستواك قوي." : percent >= 50 ? "👍 نجاح! بس محتاج تراجع المادة." : "💔 مش مشكلة، راجع وجرب تاني!";
    if (percent === 100) triggerConfetti();
    document.getElementById('finalScoreText').innerText = `${percent}%`; document.getElementById('examResultMessage').innerText = msg; 
    showScreen('examResultScreen', false); history.replaceState({ screen: 'examResultScreen', subjectKey: currentSubjectKey, subjectName: currentSubjectName, lectureName: currentLectureName, qIndex: currentQIndex, isExam: isExamMode }, '', '#examResultScreen');
}
function tryAgain() { document.getElementById('feedback').style.display = 'none'; document.getElementById('controls').style.display = 'none'; document.getElementById('options').style.display = 'block'; }
function nextQuestion() { currentQIndex++; loadQuestion(); }
function prevQuestion() { if (currentQIndex > 0) { currentQIndex--; loadQuestion(); } }
function nextQuestionNav() { const qList = allData[currentSubjectKey][currentLectureName]; if (currentQIndex < qList.length - 1) { currentQIndex++; loadQuestion(); } }
function jumpToQuestion(index) { currentQIndex = parseInt(index); loadQuestion(); }

// =========================================
// 7. المشاركة، الإشعارات، والتوجيه
// =========================================
function exportData() {
    if(!currentUser) return alert("سجل دخول عشان تقدر تنزل أسئلتك!");
    const fullBackup = { meta: subjectsMeta, data: allData, progress: userProgress };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url;
    a.download = `Zaker_Questions_${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    showToast('تم تنزيل الأسئلة للمشاركة 💾');
}

// دالة دمج البيانات الجديدة 
function importData(event) {
    if(!currentUser) return alert("سجل دخول الأول عشان تقدر ترفع بيانات لحسابك!");
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            let impMeta = imported.meta || {};
            let impData = imported.data || imported;
            
            let addedCount = 0;
            // دمج المواد الجديدة بدون مسح القديم
            for (let key in impMeta) {
                let newKey = 'subj_' + Date.now() + Math.floor(Math.random() * 1000);
                subjectsMeta[newKey] = impMeta[key];
                subjectsMeta[newKey].name = subjectsMeta[newKey].name + ' (من الدفعة)'; // إضافة علامة مميزة
                allData[newKey] = impData[key] || {};
                userProgress[newKey] = { total: 0, correct: 0, wrong: 0 };
                addedCount++;
            }
            
            if (addedCount > 0) {
                saveDataToCloud(); 
                renderSubjects();
                showToast('عاش! تم دمج أسئلة زمايلك لأسئلتك بنجاح 🚀'); 
            } else {
                alert("الملف فاضي أو غير صالح!");
            }
        } catch (err) { alert('⚠️ حصل خطأ في الملف! تأكد إنه ملف خاص بالمنصة.'); }
    }; 
    reader.readAsText(file); event.target.value = ''; 
}

function showToast(message, type = 'success') { const container = document.getElementById('toast-container'); if(!container) return; const toast = document.createElement('div'); toast.className = `toast ${type}`; toast.innerText = message; container.appendChild(toast); setTimeout(() => { toast.remove(); }, 3000); }
window.alert = function(message) { showToast(message, (message.includes('خطأ') || message.includes('لازم')) ? 'error' : 'success'); };

let confirmCallback = null; function customConfirm(message, callback) { const msgEl = document.getElementById('confirmMessage'), modalEl = document.getElementById('confirmModal'); if(!msgEl || !modalEl) return window.confirm(message) && callback(); msgEl.innerText = message; modalEl.style.display = 'flex'; confirmCallback = callback; } function closeConfirm() { document.getElementById('confirmModal').style.display = 'none'; confirmCallback = null; } document.getElementById('confirmBtnYes').onclick = function() { if (confirmCallback) confirmCallback(); closeConfirm(); };
let promptCallback = null; function customPrompt(message, defaultValue, callback) { const modalEl = document.getElementById('promptModal'); if(!modalEl) { let res = prompt(message, defaultValue); if(res !== null) callback(res); return; } document.getElementById('promptMessage').innerText = message; const inputEl = document.getElementById('promptInput'); inputEl.value = defaultValue || ''; modalEl.style.display = 'flex'; inputEl.focus(); promptCallback = callback; } function closePrompt() { document.getElementById('promptModal').style.display = 'none'; promptCallback = null; } document.getElementById('promptBtnYes').onclick = function() { if(promptCallback) promptCallback(document.getElementById('promptInput').value); closePrompt(); };

function toggleTheme() { document.body.getAttribute('data-theme') === 'dark' ? document.body.removeAttribute('data-theme') : document.body.setAttribute('data-theme', 'dark'); }
function showScreen(screenId, pushToHistory = true) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(screenId).classList.add('active'); window.scrollTo(0, 0); if (pushToHistory) history.pushState({ screen: screenId, subjectKey: currentSubjectKey, subjectName: currentSubjectName, lectureName: currentLectureName, qIndex: currentQIndex, isExam: isExamMode }, '', `#${screenId}`); }
window.addEventListener('popstate', (event) => { if (event.state) { currentSubjectKey = event.state.subjectKey; currentSubjectName = event.state.subjectName; currentLectureName = event.state.lectureName; currentQIndex = event.state.qIndex; isExamMode = event.state.isExam; if (event.state.screen === 'subjectScreen' && currentSubjectKey) { document.getElementById('subjectTitle').innerText = currentSubjectName; updateDashboardUI(); renderLectures(); } else if (event.state.screen === 'lectureScreen' && currentLectureName) { document.getElementById('lectureTitle').innerText = `${currentSubjectName} - ${currentLectureName}`; let count = allData[currentSubjectKey][currentLectureName].length; document.getElementById('lectureQCount1').innerText = `إجمالي الأسئلة: ${count}`; document.getElementById('lectureQCount2').innerText = `الوقت: ${count} دقيقة`; } else if (event.state.screen === 'manageQuestionsScreen') { renderManageQuestions(); } else if (event.state.screen === 'quizScreen') { loadQuestion(); } showScreen(event.state.screen, false); } else showScreen('homeScreen', false); });

let audioCtx = null; let isSoundEnabled = localStorage.getItem('myUniversityApp_sound') !== 'disabled'; 
function updateSoundBtn() { const btn = document.getElementById('soundToggleBtn'); if(btn) { btn.innerHTML = isSoundEnabled ? '🔊' : '🔇'; btn.title = isSoundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'; } }
function toggleSound() { isSoundEnabled = !isSoundEnabled; localStorage.setItem('myUniversityApp_sound', isSoundEnabled ? 'enabled' : 'disabled'); updateSoundBtn(); showToast(isSoundEnabled ? 'تم تشغيل الصوت 🔊' : 'تم كتم الصوت 🔇'); }
function playSound(type) { if (!isSoundEnabled) return; try { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.state === 'suspended') audioCtx.resume(); const osc = audioCtx.createOscillator(); const gainNode = audioCtx.createGain(); osc.connect(gainNode); gainNode.connect(audioCtx.destination); if (type === 'correct') { osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1); osc.start(); osc.stop(audioCtx.currentTime + 0.15); } else if (type === 'wrong') { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2); gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2); osc.start(); osc.stop(audioCtx.currentTime + 0.25); } } catch(e) {} }
function triggerConfetti() { try { if (typeof confetti === 'function') { var duration = 3000; var end = Date.now() + duration; (function frame() { confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#6C63FF', '#4CAF50', '#FF6584'] }); confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#6C63FF', '#4CAF50', '#FF6584'] }); if (Date.now() < end) requestAnimationFrame(frame); }()); } } catch(e) {} }

// إصلاح الاقتباسات لتعمل دائماً
const motivationalQuotes = ["وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ", "إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا", "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", "بِقَدْرِ الكَدِّ تُكْتَسَبُ المَعَالِي", "النجاح ليس نهائياً، والفشل ليس قاتلاً"];
let lastQuoteIndex = -1; 
function changeQuote() {
    const frame = document.getElementById('quoteFrame'), textEl = document.getElementById('quoteText'); 
    if(!frame || !textEl) return; 
    frame.style.opacity = 0; frame.style.transform = 'translateY(10px)';
    setTimeout(() => {
        let randomIndex; do { randomIndex = Math.floor(Math.random() * motivationalQuotes.length); } while (randomIndex === lastQuoteIndex && motivationalQuotes.length > 1);
        lastQuoteIndex = randomIndex; textEl.innerText = motivationalQuotes[randomIndex];
        frame.style.opacity = 1; frame.style.transform = 'translateY(0)';
    }, 800); 
}

window.onload = function() { 
    updateSoundBtn(); 
    setInterval(changeQuote, 12000); // التشغيل المستمر
    history.replaceState({ screen: 'homeScreen', subjectKey: '', subjectName: '', lectureName: '' }, '', '#homeScreen');
};

// =========================================
// مولد أوامر الذكاء الاصطناعي (AI Prompt Generator)
// =========================================
function generateAIPrompt() {
    const sourceText = document.getElementById('aiSourceText').value.trim();
    const qCount = document.getElementById('aiQCount').value;
    const qType = document.getElementById('aiQType').value;

    if (!sourceText) {
        return alert("يا هندسة حط المادة العلمية الأول عشان الذكاء الاصطناعي يلاقي حاجة يقرأها!");
    }

    let typeInstruction = "";
    if (qType === "mcq") {
        typeInstruction = "كل الأسئلة تكون اختياري (MCQ). الصيغة المطلوبة لكل سؤال:\n[السؤال]\n[الاختيار الأول]\n[الاختيار الثاني]\n[الاختيار الثالث]\n[الاختيار الرابع]\n[الإجابة الصحيحة بالظبط كما هي مكتوبة في الاختيارات]";
    } else if (qType === "tf") {
        typeInstruction = "كل الأسئلة تكون صح وخطأ. الصيغة المطلوبة لكل سؤال:\n[السؤال]\n[صح أو غلط] (اكتب كلمة 'صح' أو 'غلط' فقط في السطر الثاني)";
    } else {
        typeInstruction = "نص الأسئلة اختياري (MCQ) والنص التاني صح وخطأ.\nصيغة الاختياري:\n[السؤال]\n[الاختيار الأول]\n[الاختيار الثاني]\n[الاختيار الثالث]\n[الاختيار الرابع]\n[الإجابة الصحيحة]\n\nصيغة الصح والخطأ:\n[السؤال]\n[صح أو غلط]";
    }

    const prompt = `أنت الآن أستاذ جامعي محترف. بناءً على النص العلمي التالي، قم بإنشاء ${qCount} أسئلة لاختبار فهم الطالب.

التعليمات الصارمة للصيغة (يجب الالتزام بها حرفياً برمجياً):
${typeInstruction}

- يجب ترك سطر فارغ تماماً بين كل سؤال والذي يليه.
- لا تقم بإضافة أي أرقام للأسئلة أو الاختيارات (مثل 1. أو أ-).
- لا تقم بكتابة أي مقدمات أو خاتمات، فقط الأسئلة بالصيغة المطلوبة مباشرة.

النص العلمي:
"""
${sourceText}
"""`;

    navigator.clipboard.writeText(prompt).then(() => {
        showToast('تم نسخ الأمر بنجاح! 📋', 'success');
        // إظهار زراير فتح الذكاء الاصطناعي
        document.getElementById('aiActionButtons').style.display = 'flex';
        
        // تفريغ مربع النص عشان يكون جاهز للصق الأسئلة بعدين
        document.getElementById('aiSourceText').value = '';
    }).catch(err => {
        alert('المتصفح بتاعك مانع النسخ التلقائي، حاول تنسخه بنفسك.');
    });
}