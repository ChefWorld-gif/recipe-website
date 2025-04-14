// تسجيل الدخول والنقر على زر تسجيل الدخول
document.querySelector('.login-btn').addEventListener('click', function() {
    window.location.href = 'login.html';
});

// حالة المصادقة
auth.onAuthStateChanged(user => {
    if (user) {
        // المستخدم مسجل الدخول
        console.log('User logged in:', user);
    } else {
        // لا يوجد مستخدم مسجل الدخول
        console.log('No user logged in');
    }
});
