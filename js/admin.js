// ============= تهيئة النظام الإداري =============
const auth = firebase.auth();
const db = firebase.firestore();

// تحقق من صلاحيات المدير
async function verifyAdmin() {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = '../login.html';
        return false;
    }
    
    // تحقق من أن المستخدم مدير (هنا نستخدم البريد الإلكتروني كمثال)
    const isAdmin = user.email === 'admin@example.com'; // استبدل ببريدك الإداري
    if (!isAdmin) {
        alert('الوصول مقصور على المديرين فقط!');
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// ============= وظائف إدارة الطهاة =============
async function loadAllChefs() {
    const snapshot = await db.collection('chefs').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getChefStats(chefId) {
    const [recipesCount, earnings] = await Promise.all([
        db.collection('recipes').where('chefId', '==', chefId).get().then(snap => snap.size),
        db.collection('earnings').where('chefId', '==', chefId).get()
            .then(snap => snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0))
    ]);
    return { recipesCount, earnings };
}

// ============= وظائف الإحصائيات العامة =============
async function getGlobalStats() {
    const [chefsCount, recipesCount, totalEarnings] = await Promise.all([
        db.collection('chefs').get().then(snap => snap.size),
        db.collection('recipes').get().then(snap => snap.size),
        db.collection('earnings').get().then(snap => 
            snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0)
        )
    ]);
    return { chefsCount, recipesCount, totalEarnings };
}

// ============= عرض البيانات في الواجهة =============
function renderChefsTable(chefs) {
    const table = document.getElementById('chefs-table');
    table.innerHTML = `
        <tr>
            <th>اسم الشيف</th>
            <th>البريد الإلكتروني</th>
            <th>عدد الوصفات</th>
            <th>الأرباح</th>
            <th>حساب الدفع</th>
        </tr>
    `;

    chefs.forEach(async chef => {
        const stats = await getChefStats(chef.id);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${chef.name || 'غير معروف'}</td>
            <td>${chef.email || 'غير مضبوط'}</td>
            <td>${stats.recipesCount}</td>
            <td>${stats.earnings} ريال</td>
            <td>${chef.paymentDetails || 'غير مضبوط'}</td>
        `;
        table.appendChild(row);
    });
}

function updateGlobalStats(stats) {
    document.getElementById('total-chefs').textContent = stats.chefsCount;
    document.getElementById('total-recipes').textContent = stats.recipesCount;
    document.getElementById('total-earnings').textContent = `${stats.totalEarnings} ريال`;
}

// ============= تصدير البيانات =============
document.getElementById('export-data').addEventListener('click', async () => {
    const chefs = await loadAllChefs();
    const data = {
        chefs: chefs,
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chefs-data-${new Date().toLocaleDateString()}.json`;
    a.click();
});

// ============= تهيئة الصفحة عند التحميل =============
window.addEventListener('DOMContentLoaded', async () => {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) return;
    
    const [chefs, globalStats] = await Promise.all([
        loadAllChefs(),
        getGlobalStats()
    ]);
    
    renderChefsTable(chefs);
    updateGlobalStats(globalStats);
});
