// =========================================
// 1. نظام الأمان (XSS Protection)
// =========================================
function sanitizeInput(str) {
    if (!str) return '';
    let temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML; 
}

// =========================================
// 2. إدارة المواد ديناميكياً
// =========================================
let subjectsMeta = JSON.parse(localStorage.getItem('myUniversityApp_meta_v6')) || {
    'systems': { name: 'تحليل وتصميم النظم', icon: '📊', desc: 'مراجعة شاملة وتصميم النظم' },
    'ds_algo': { name: 'هياكل البيانات والخوارزميات', icon: '💻', desc: 'أساسيات البرمجة والهياكل' },
    'production': { name: 'مبادئ الانتاج', icon: '🏭', desc: 'إدارة وتخطيط الانتاج' },
    'bpm': { name: 'النمذجة وعمليات الاعمال', icon: '🔄', desc: 'تطوير وتحسين العمليات' },
    'hci': { name: 'تفاعل الحاسب والإنسان', icon: '🖱️', desc: 'تصميم الويب وتجربة المستخدم' },
    'english': { name: 'اللغة الإنجليزية', icon: '🔠', desc: 'تطوير المهارات اللغوية' }
};

let allData = JSON.parse(localStorage.getItem('myUniversityApp_v20')) || {};
for (let key in subjectsMeta) { if (!allData[key]) allData[key] = {}; }

let currentSubjectKey = '', currentSubjectName = '', currentLectureName = '', currentQIndex = 0, editingQuestionIndex = -1; 
let isExamMode = false, examScore = 0, examTimeLeft = 0, examTimerInterval;

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
                    <button onclick="editSubjectMeta('${key}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;" title="تعديل اسم المادة">✏️</button>
                    <button onclick="deleteSubjectMeta('${key}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;" title="مسح المادة">🗑️</button>
                </div>
                <div onclick="openSubject('${key}', '${meta.name}')" style="height: 100%; display:flex; flex-direction:column; justify-content:center;">
                    <h3>${meta.icon} ${meta.name}</h3>
                    <p>${meta.desc}</p>
                </div>
            </div>`;
    }
}

function addNewSubject() {
    customPrompt("اكتب اسم المادة الجديدة:", "", function(subName) {
        if (!subName || subName.trim() === "") return;
        subName = sanitizeInput(subName.trim());
        let subKey = 'subj_' + Date.now(); 
        subjectsMeta[subKey] = { name: subName, icon: '📚', desc: 'مادة دراسية جديدة' };
        allData[subKey] = {};
        localStorage.setItem('myUniversityApp_meta_v6', JSON.stringify(subjectsMeta));
        localStorage.setItem('myUniversityApp_v20', JSON.stringify(allData));
        renderSubjects();
        showToast('تمت إضافة المادة بنجاح 📚');
    });
}

function editSubjectMeta(key, event) {
    event.stopPropagation();
    customPrompt("اكتب الاسم الجديد للمادة:", subjectsMeta[key].name, function(newName) {
        if (newName && newName.trim() !== "") {
            subjectsMeta[key].name = sanitizeInput(newName.trim());
            localStorage.setItem('myUniversityApp_meta_v6', JSON.stringify(subjectsMeta));
            renderSubjects();
            showToast('تم تعديل اسم المادة ✏️');
        }
    });
}

function deleteSubjectMeta(key, event) {
    event.stopPropagation();
    customConfirm(`متأكد إنك عايز تمسح مادة "${subjectsMeta[key].name}" بكل محاضراتها وأسئلتها؟`, function() {
        delete subjectsMeta[key];
        delete allData[key];
        localStorage.setItem('myUniversityApp_meta_v6', JSON.stringify(subjectsMeta));
        localStorage.setItem('myUniversityApp_v20', JSON.stringify(allData));
        renderSubjects();
        showToast('تم مسح المادة بنجاح 🗑️');
    });
}

// =========================================
// 3. الصوتيات والاحتفال (مع زرار الكتم)
// =========================================
let audioCtx = null;
let isSoundEnabled = localStorage.getItem('myUniversityApp_sound') !== 'disabled'; // شغال افتراضياً

function updateSoundBtn() {
    const btn = document.getElementById('soundToggleBtn');
    if(btn) btn.innerHTML = isSoundEnabled ? '🔊 الصوت شغال' : '🔇 الصوت مكتوم';
}

function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem('myUniversityApp_sound', isSoundEnabled ? 'enabled' : 'disabled');
    updateSoundBtn();
    showToast(isSoundEnabled ? 'تم تشغيل الصوت 🔊' : 'تم كتم الصوت 🔇');
}

function playSound(type) {
    if (!isSoundEnabled) return; // لو الصوت مكتوم، ميشتغلش
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode); gainNode.connect(audioCtx.destination);
        if (type === 'correct') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); 
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            osc.start(); osc.stop(audioCtx.currentTime + 0.15);
        } else if (type === 'wrong') {
            osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
            osc.start(); osc.stop(audioCtx.currentTime + 0.25);
        }
    } catch(e) {} 
}
function triggerConfetti() {
    try {
        if (typeof confetti === 'function') {
            var duration = 3000; var end = Date.now() + duration;
            (function frame() {
                confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#6C63FF', '#4CAF50', '#FF6584'] });
                confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#6C63FF', '#4CAF50', '#FF6584'] });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        }
    } catch(e) {}
}

// =========================================
// 4. الإشعارات والنوافذ المنبثقة
// =========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container'); if(!container) return;
    const toast = document.createElement('div'); toast.className = `toast ${type}`; toast.innerText = message;
    container.appendChild(toast); setTimeout(() => { toast.remove(); }, 3000);
}
window.alert = function(message) { showToast(message, (message.includes('خطأ') || message.includes('لازم')) ? 'error' : 'success'); };

let confirmCallback = null;
function customConfirm(message, callback) {
    const msgEl = document.getElementById('confirmMessage'), modalEl = document.getElementById('confirmModal');
    if(!msgEl || !modalEl) return window.confirm(message) && callback(); 
    msgEl.innerText = message; modalEl.style.display = 'flex'; confirmCallback = callback;
}
function closeConfirm() { document.getElementById('confirmModal').style.display = 'none'; confirmCallback = null; }
document.getElementById('confirmBtnYes').onclick = function() { if (confirmCallback) confirmCallback(); closeConfirm(); };

let promptCallback = null;
function customPrompt(message, defaultValue, callback) {
    const modalEl = document.getElementById('promptModal');
    if(!modalEl) { 
        let res = prompt(message, defaultValue); 
        if(res !== null) callback(res); 
        return; 
    }
    document.getElementById('promptMessage').innerText = message;
    const inputEl = document.getElementById('promptInput');
    inputEl.value = defaultValue || '';
    modalEl.style.display = 'flex';
    inputEl.focus();
    promptCallback = callback;
}
function closePrompt() { document.getElementById('promptModal').style.display = 'none'; promptCallback = null; }
document.getElementById('promptBtnYes').onclick = function() {
    if(promptCallback) promptCallback(document.getElementById('promptInput').value);
    closePrompt();
};

let userProgress = JSON.parse(localStorage.getItem('myUniversityApp_progress_v5')) || {};
function initSubjectProgress(subjectKey) { if (!userProgress[subjectKey]) userProgress[subjectKey] = { total: 0, correct: 0, wrong: 0 }; }
function updateDashboardUI() {
    if (!currentSubjectKey) return;
    initSubjectProgress(currentSubjectKey); let prog = userProgress[currentSubjectKey];
    const tEl = document.getElementById('statTotal'), cEl = document.getElementById('statCorrect'), wEl = document.getElementById('statWrong'), pEl = document.getElementById('statPercent');
    if(tEl) tEl.innerText = prog.total; if(cEl) cEl.innerText = prog.correct; if(wEl) wEl.innerText = prog.wrong;
    if(pEl) pEl.innerText = (prog.total === 0 ? 0 : Math.round((prog.correct / prog.total) * 100)) + '%';
}
function resetProgress() {
    customConfirm('متأكد إنك عايز تصفر إحصائيات المادة دي؟', function() {
        userProgress[currentSubjectKey] = { total: 0, correct: 0, wrong: 0 };
        localStorage.setItem('myUniversityApp_progress_v5', JSON.stringify(userProgress)); updateDashboardUI(); showToast('تم التصفير بنجاح 🔄');
    });
}

// =========================================
// 5. النسخ الاحتياطي 
// =========================================
function exportData() {
    const fullBackup = { meta: subjectsMeta, data: allData };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url;
    a.download = `MyStudyData_${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    showToast('تم تحميل نسختك الاحتياطية بنجاح 💾');
}
function importData(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.meta && imported.data) { 
                subjectsMeta = imported.meta; allData = imported.data;
            } else { allData = imported; }
            localStorage.setItem('myUniversityApp_meta_v6', JSON.stringify(subjectsMeta));
            localStorage.setItem('myUniversityApp_v20', JSON.stringify(allData));
            alert('تم الاسترجاع بنجاح!'); location.reload(); 
        } catch (err) { alert('⚠️ حصل خطأ في الملف!'); }
    }; reader.readAsText(file); event.target.value = ''; 
}

// =========================================
// 6. التوجيه (History API) والواجهة
// =========================================
function toggleTheme() { document.body.getAttribute('data-theme') === 'dark' ? document.body.removeAttribute('data-theme') : document.body.setAttribute('data-theme', 'dark'); }
function showScreen(screenId, pushToHistory = true) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active'); window.scrollTo(0, 0);
    if (pushToHistory) history.pushState({ screen: screenId, subjectKey: currentSubjectKey, subjectName: currentSubjectName, lectureName: currentLectureName, qIndex: currentQIndex, isExam: isExamMode }, '', `#${screenId}`);
}
window.addEventListener('popstate', (event) => {
    if (event.state) {
        currentSubjectKey = event.state.subjectKey; currentSubjectName = event.state.subjectName; currentLectureName = event.state.lectureName; currentQIndex = event.state.qIndex; isExamMode = event.state.isExam;
        if (event.state.screen === 'subjectScreen' && currentSubjectKey) { document.getElementById('subjectTitle').innerText = currentSubjectName; updateDashboardUI(); renderLectures(); } 
        else if (event.state.screen === 'lectureScreen' && currentLectureName) { document.getElementById('lectureTitle').innerText = `${currentSubjectName} - ${currentLectureName}`; let count = allData[currentSubjectKey][currentLectureName].length; document.getElementById('lectureQCount1').innerText = `إجمالي الأسئلة: ${count}`; document.getElementById('lectureQCount2').innerText = `الوقت: ${count} دقيقة`; } 
        else if (event.state.screen === 'manageQuestionsScreen') { renderManageQuestions(); } 
        else if (event.state.screen === 'quizScreen') { loadQuestion(); }
        showScreen(event.state.screen, false);
    } else showScreen('homeScreen', false);
});

function openSubject(subKey, subName) { currentSubjectKey = subKey; currentSubjectName = subName; document.getElementById('subjectTitle').innerText = subName; updateDashboardUI(); renderLectures(); showScreen('subjectScreen'); }
function renderLectures() {
    const container = document.getElementById('lecturesList'); container.innerHTML = ''; const lectures = allData[currentSubjectKey];
    if (Object.keys(lectures).length === 0) return container.innerHTML = '<p style="text-align:center; width: 100%; opacity: 0.7;">مفيش محاضرات لسه..</p>';
    for(let lecName in lectures) {
        container.innerHTML += `<div class="card" onclick="openLecture('${lecName}')" style="position: relative;">
            <div style="position: absolute; top: 10px; left: 10px;"><button onclick="editLecture('${lecName}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">✏️</button><button onclick="deleteLecture('${lecName}', event)" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">🗑️</button></div>
            <h3>📁 ${lecName}</h3><p style="font-size: 1.1rem; font-weight: bold; margin-top: 10px; color: var(--text-color);">أسئلة: ${lectures[lecName].length}</p></div>`;
    }
}

function editLecture(oldName, event) { 
    event.stopPropagation(); 
    customPrompt("اكتب الاسم الجديد للمحاضرة:", oldName, function(newName) {
        if (newName && newName.trim() !== "" && newName !== oldName) { 
            newName = sanitizeInput(newName.trim()); 
            if(allData[currentSubjectKey][newName]) return alert("الاسم موجود!"); 
            allData[currentSubjectKey][newName] = allData[currentSubjectKey][oldName]; 
            delete allData[currentSubjectKey][oldName]; 
            localStorage.setItem('myUniversityApp_v20', JSON.stringify(allData)); 
            renderLectures(); 
        }
    }); 
}
function deleteLecture(lecName, event) { event.stopPropagation(); customConfirm(`متأكد من مسح "${lecName}"؟`, function() { delete allData[currentSubjectKey][lecName]; localStorage.setItem('myUniversityApp_v20', JSON.stringify(allData)); renderLectures(); showToast("تم مسح المحاضرة 🗑️"); }); }

function addLecture() { 
    customPrompt("اكتب اسم المحاضرة:", "", function(lecName) {
        if(lecName && lecName.trim() !== "") { 
            lecName = sanitizeInput(lecName.trim()); 
            if(allData[currentSubjectKey][lecName]) return alert("المحاضرة موجودة!"); 
            allData[currentSubjectKey][lecName] = []; 
            localStorage.setItem('myUniversityApp_v20', JSON.stringify(allData)); 
            renderLectures(); 
        }
    });
}
function openLecture(lecName) { currentLectureName = lecName; document.getElementById('lectureTitle').innerText = `${currentSubjectName} - ${lecName}`; document.getElementById('addQSubjectName').innerText = `(${lecName})`; let count = allData[currentSubjectKey][lecName].length; document.getElementById('lectureQCount1').innerText = `إجمالي الأسئلة: ${count}`; document.getElementById('lectureQCount2').innerText = `الوقت: ${count} دقيقة`; showScreen('lectureScreen'); }

// =========================================
// 7. إدارة الأسئلة (محدثة لاختيار الإجابة بقائمة منسدلة)
// =========================================
function toggleFormFields() { 
    const type = document.getElementById('qType').value;
    const mcqFields = document.getElementById('mcqFields');
    const qAns = document.getElementById('qAnswer'); 
    
    qAns.innerHTML = ''; // تنظيف القائمة
    
    if (type === 'mcq') { 
        mcqFields.classList.remove('hidden'); 
        // خيارات سؤال اختياري
        qAns.innerHTML = `
            <option value="1">الاختيار الأول (1)</option>
            <option value="2">الاختيار الثاني (2)</option>
            <option value="3">الاختيار الثالث (3)</option>
            <option value="4">الاختيار الرابع (4)</option>
        `;
    } else { 
        mcqFields.classList.add('hidden'); 
        // خيارات سؤال صح وغلط
        qAns.innerHTML = `
            <option value="صح">صح</option>
            <option value="غلط">غلط</option>
        `;
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
    document.getElementById('addQSubjectName').innerText = `(إضافة سؤال)`; 
    showScreen('addQuestionScreen'); 
}

function saveQuestion() {
    const type = document.getElementById('qType').value;
    const q = sanitizeInput(document.getElementById('qText').value.trim());
    const exp = sanitizeInput(document.getElementById('qExplanation').value.trim());
    
    if(!q) return alert("اكتب السؤال!"); 
    
    let newQ = { type, q, explanation: exp };
    let correctAns = "";

    if (type === 'mcq') { 
        const o1 = sanitizeInput(document.getElementById('opt1').value.trim());
        const o2 = sanitizeInput(document.getElementById('opt2').value.trim());
        const o3 = sanitizeInput(document.getElementById('opt3').value.trim());
        const o4 = sanitizeInput(document.getElementById('opt4').value.trim());
        
        if(!o1 || !o2) return alert("لازم تكتب اختيارين على الأقل!"); 
        newQ.options = [o1, o2]; 
        if(o3) newQ.options.push(o3); 
        if(o4) newQ.options.push(o4); 

        // تحديد الإجابة الصح بناءً على القائمة المنسدلة
        const ansIndex = document.getElementById('qAnswer').value;
        if (ansIndex === '1') correctAns = o1;
        else if (ansIndex === '2') correctAns = o2;
        else if (ansIndex === '3' && o3) correctAns = o3;
        else if (ansIndex === '4' && o4) correctAns = o4;
        else return alert("الاختيار الصحيح اللي حددته فاضي! اكتب فيه حاجة الأول.");

        newQ.a = correctAns;
    } else {
        // سؤال صح وغلط بياخد القيمة مباشرة (صح / غلط)
        newQ.a = document.getElementById('qAnswer').value;
    }

    if (editingQuestionIndex > -1) {
        allData[currentSubjectKey][currentLectureName][editingQuestionIndex] = newQ;
        showToast("تم التعديل ✏️");
    } else {
        allData[currentSubjectKey][currentLectureName].push(newQ);
        showToast("تم الحفظ 🚀");
    }

    localStorage.setItem('myUniversityApp_v20', JSON.stringify(allData)); 
    let count = allData[currentSubjectKey][currentLectureName].length; 
    document.getElementById('lectureQCount1').innerText = `الأسئلة: ${count}`; 
    document.getElementById('lectureQCount2').innerText = `الوقت: ${count} دقيقة`;
    
    history.back(); // الرجوع للخلف حقيقي بعد الحفظ
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
function deleteQuestion(index) { customConfirm("متأكد هتمسح السؤال؟", function() { allData[currentSubjectKey][currentLectureName].splice(index, 1); localStorage.setItem('myUniversityApp_v20', JSON.stringify(allData)); renderManageQuestions(); showToast("تم المسح 🗑️"); }); }
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
        
        // محاولة تحديد أي اختيار كان هو الإجابة الصح
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
        
        document.getElementById('qAnswer').value = qToEdit.a; // صح أو غلط
    } 
    showScreen('addQuestionScreen'); 
}

// =========================================
// 8. الامتحان ومساعد الذكاء الاصطناعي السريع
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
    const promptText = `أنا بذاكر ومحتاجك تشرحلي وتبسطلي إجابة السؤال ده وتفهمهوني بالتفصيل عشان أنا طالب جامعي:\n\nالسؤال:\n${currentQ.q}\n\nالإجابة الصحيحة هي:\n${currentQ.a}`;
    
    navigator.clipboard.writeText(promptText).then(() => {
        showToast('تم نسخ السؤال! 📋 اعمل (Paste) في المحادثة عشان يشرحهولك', 'success');
        setTimeout(() => {
            if(platform === 'chatgpt') window.open('https://chatgpt.com/', '_blank');
            if(platform === 'gemini') window.open('https://gemini.google.com/app', '_blank');
        }, 1200);
    }).catch(err => {
        alert('المتصفح بتاعك مانع النسخ التلقائي، انسخ السؤال بنفسك وافتح الموقع.');
        if(platform === 'chatgpt') window.open('https://chatgpt.com/', '_blank');
        if(platform === 'gemini') window.open('https://gemini.google.com/app', '_blank');
    });
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
                if(document.getElementById('prevBtnNav')) document.getElementById('prevBtnNav').style.visibility = currentQIndex > 0 ? 'visible' : 'hidden'; 
                if(document.getElementById('nextBtnNav')) document.getElementById('nextBtnNav').style.visibility = currentQIndex < questionsList.length - 1 ? 'visible' : 'hidden'; 
            }
            if(document.getElementById('quizProgress')) document.getElementById('quizProgress').innerText = `Question ${currentQIndex + 1} of ${questionsList.length}`; 
            
            const currentQ = questionsList[currentQIndex]; 
            if(document.getElementById('questionText')) document.getElementById('questionText').innerText = currentQ.q;
            
            if (currentQ.type === "tf") { 
                optionsDiv.innerHTML += `<button class="btn btn-option" onclick="checkAnswer('صح')">True (صح)</button><button class="btn btn-option" onclick="checkAnswer('غلط')">False (غلط)</button>`; 
            } else if (currentQ.type === "mcq") { 
                currentQ.options.forEach(opt => { 
                    let safeOpt = opt.replace(/'/g, "\\'").replace(/"/g, '&quot;'); 
                    optionsDiv.innerHTML += `<button class="btn btn-option" onclick="checkAnswer('${safeOpt}')">${opt}</button>`; 
                }); 
            }
        } else { 
            isExamMode ? endExam() : (document.getElementById('quizProgress').innerText = "تم الانتهاء", document.getElementById('questionText').innerText = "🎉 عاش يا بطل!", optionsDiv.style.display = 'none', document.getElementById('normalNavControls').style.display = 'none', document.getElementById('externalAiControls').style.display = 'none'); 
        }
    } catch(err) {}
}
function checkAnswer(userAnswer) {
    const currentQ = allData[currentSubjectKey][currentLectureName][currentQIndex]; initSubjectProgress(currentSubjectKey); userProgress[currentSubjectKey].total++;
    if (isExamMode) { userAnswer === currentQ.a ? (examScore++, userProgress[currentSubjectKey].correct++, playSound('correct')) : (userProgress[currentSubjectKey].wrong++, playSound('wrong')); localStorage.setItem('myUniversityApp_progress_v5', JSON.stringify(userProgress)); updateDashboardUI(); currentQIndex++; loadQuestion(); return; }
    
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
    localStorage.setItem('myUniversityApp_progress_v5', JSON.stringify(userProgress)); updateDashboardUI();
}

function endExam() {
    clearInterval(examTimerInterval); const totalQs = allData[currentSubjectKey][currentLectureName].length; const percent = Math.round((examScore / totalQs) * 100);
    let msg = percent >= 90 ? "🔥 أسطورة! درجتك ممتازة." : percent >= 75 ? "👏 عاش جداً! مستواك قوي." : percent >= 50 ? "👍 نجاح! بس محتاج تراجع المادة." : "💔 مش مشكلة، راجع وجرب تاني!";
    if (percent === 100) triggerConfetti();
    document.getElementById('finalScoreText').innerText = `${percent}%`; document.getElementById('examResultMessage').innerText = msg; 
    
    // استبدال الشاشة في ذاكرة المتصفح عشان الرجوع يكون صح
    showScreen('examResultScreen', false);
    history.replaceState({ screen: 'examResultScreen', subjectKey: currentSubjectKey, subjectName: currentSubjectName, lectureName: currentLectureName, qIndex: currentQIndex, isExam: isExamMode }, '', '#examResultScreen');
}

function tryAgain() { document.getElementById('feedback').style.display = 'none'; document.getElementById('controls').style.display = 'none'; document.getElementById('options').style.display = 'block'; }
function nextQuestion() { currentQIndex++; loadQuestion(); }
function prevQuestion() { if (currentQIndex > 0) { currentQIndex--; loadQuestion(); } }
function nextQuestionNav() { const qList = allData[currentSubjectKey][currentLectureName]; if (currentQIndex < qList.length - 1) { currentQIndex++; loadQuestion(); } }
function jumpToQuestion(index) { currentQIndex = parseInt(index); loadQuestion(); }

// =========================================
// 9. نظام الاقتباسات والتشغيل
// =========================================
const motivationalQuotes = [
    "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ ۝ وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ", "إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا", "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا", "يَرْفَعِ اللَّهُ الَّذِينَ آمنوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ", "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ", "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ", "بِقَدْرِ الكَدِّ تُكْتَسَبُ المَعَالِي ... وَمَنْ طَلَبَ العُلا سَهِرَ اللَّيَالِي", "وَمَا نَيْلُ الْمَطَالِبِ بِالتَّمَنِّي ... وَلَكِنْ تُؤْخَذُ الدُّنْيَا غِلَابَا", "تَعَلَّمْ فَلَيْسَ الْمَرْءُ يُولَدُ عَالِمًا ... وَلَيْسَ أَخُو عِلْمٍ كَمَنْ هُوَ جَاهِلُ", "النجاح ليس نهائياً، والفشل ليس قاتلاً: إنها الشجاعة للاستمرار هي ما يهم.", "العبقرية هي 1% إلهام و99% جهد وعرق.", "رحلة الألف ميل تبدأ بخطوة.. استمر يا بطل!"
];
let lastQuoteIndex = -1; 
function changeQuote() {
    const frame = document.getElementById('quoteFrame'), textEl = document.getElementById('quoteText'); if(!frame || !textEl) return;
    frame.style.opacity = 0; frame.style.transform = 'translateY(10px)';
    setTimeout(() => {
        let randomIndex; do { randomIndex = Math.floor(Math.random() * motivationalQuotes.length); } while (randomIndex === lastQuoteIndex && motivationalQuotes.length > 1);
        lastQuoteIndex = randomIndex; textEl.innerText = motivationalQuotes[randomIndex];
        frame.style.opacity = 1; frame.style.transform = 'translateY(0)';
    }, 800); 
}

window.onload = function() { 
    updateSoundBtn(); // تحميل حالة الصوت المحفوظة
    renderSubjects(); 
    updateDashboardUI(); 
    changeQuote(); setInterval(changeQuote, 12000); 
    history.replaceState({ screen: 'homeScreen', subjectKey: '', subjectName: '', lectureName: '' }, '', '#homeScreen');
};