// تهيئة الرسم البياني
const ctx = document.getElementById('performance-chart').getContext('2d');
const performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [{
            label: 'مشاهدات الوصفات',
            data: [120, 190, 300, 500, 200, 300],
            backgroundColor: 'rgba(230, 126, 34, 0.2)',
            borderColor: 'rgba(230, 126, 34, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// إضافة وصفة جديدة
document.getElementById('add-recipe-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const recipeData = {
        name: document.getElementById('recipe-name').value,
        ingredients: document.getElementById('recipe-ingredients').value.split(','),
        instructions: document.getElementById('recipe-instructions').value,
        category: document.getElementById('recipe-category').value,
        cuisine: document.getElementById('recipe-cuisine').value,
        imageUrl: document.getElementById('recipe-image').value,
        videoUrl: document.getElementById('recipe-video').value || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        chefId: auth.currentUser.uid
    };
    
    try {
        await db.collection('recipes').add(recipeData);
        alert('تم نشر الوصفة بنجاح!');
        e.target.reset();
    } catch (error) {
        console.error('Error adding recipe: ', error);
        alert('حدث خطأ أثناء نشر الوصفة');
    }
});

// تسجيل الخروج
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    });
});
