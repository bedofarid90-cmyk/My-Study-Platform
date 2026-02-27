// =========================================
// 1. القاموس واللغات
// =========================================
const translations = {
    ar: {
        appName: "ذاكر", loginBtn: "تسجيل دخول 🚀", loginPrompt: '"يرجى تسجيل الدخول لعرض موادك ومزامنتها..."',
        chooseSubject: "اختار المادة:", addSubjectBtn: "➕ إضافة مادة جديدة",
        confirmMsg: "هل أنت متأكد؟", confirmLogout: "هل أنت متأكد من تسجيل الخروج؟", cancelBtn: "إلغاء", agreeBtn: "موافق ✅", saveBtn: "حفظ 💾",
        js_demo: "سجل دخول لعرض موادك الحقيقية ومزامنتها...", js_loginReq: "سجل دخول بحساب جوجل الأول! 🔒", js_saved: "تم الحفظ بنجاح ✅", js_deleted: "تم المسح بنجاح 🗑️"
    },
    en: {
        appName: "Zaker", loginBtn: "Login 🚀", loginPrompt: '"Please login to view and sync your subjects..."',
        chooseSubject: "Choose Subject:", addSubjectBtn: "➕ Add New Subject",
        confirmMsg: "Are you sure?", confirmLogout: "Are you sure you want to logout?", cancelBtn: "Cancel", agreeBtn: "Confirm ✅", saveBtn: "Save 💾",
        js_demo: "Login to view and sync your real subjects...", js_loginReq: "Login with Google first! 🔒", js_saved: "Saved successfully ✅", js_deleted: "Deleted successfully 🗑️"
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
    location.reload(); // ريفرش خفيف لتطبيق اللغة على كل الكومبوننت
}

function toggleTheme() { 
    document.body.getAttribute('data-theme') === 'dark' ? document.body.removeAttribute('data-theme') : document.body.setAttribute('data-theme', 'dark'); 
}

// =========================================
// 2. إعدادات السحابة (Firebase) المشتركة
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

// متغيرات عامة لحمل البيانات
let currentUser = null;
let globalData = { subjectsMeta: {}, allData: {}, userProgress: {} };

function loginWithGoogle() { auth.signInWithPopup(provider).catch(err => alert("Error: " + err.message)); }
function logout() { customConfirm(t('confirmLogout'), () => { auth.signOut().then(() => location.reload()); }); }

// =========================================
// 3. أدوات الواجهة (Modals & Toasts)
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

// تحميل اللغة عند الفتح
window.addEventListener('DOMContentLoaded', applyLanguage);