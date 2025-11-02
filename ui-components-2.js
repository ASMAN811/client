// クライアントフォーム生成
function renderClientForm() {
    return `
        <div class="bg-yellow-50 p-6 rounded-lg mb-6 border border-yellow-200">
            <h2 class="text-xl font-bold mb-4 text-yellow-800">${AppState.editingClientId ? 'クライアント情報編集' : '新規クライアント登録'}</h2>
            <form onsubmit="submitClientForm(event)" id="clientForm">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">クライアントID</label>
                        <input type="text" name="clientId" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.clientId}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">氏名</label>
                        <input type="text" name="name" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.name}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">カナ</label>
                        <input type="text" name="kana" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.kana}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">生年月日</label>
                        <input type="date" name="birthDate" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.birthDate}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">性別</label>
                        <select name="gender" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.gender}">
                            <option ${AppState.clientForm.gender === '男性' ? 'selected' : ''}>男性</option>
                            <option ${AppState.clientForm.gender === '女性' ? 'selected' : ''}>女性</option>
                            <option ${AppState.clientForm.gender === 'その他' ? 'selected' : ''}>その他</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">血液型</label>
                        <select name="bloodType" class="w-full px-3 py-2 border rounded-lg">
                            <option value="">選択</option>
                            <option ${AppState.clientForm.bloodType === 'A型' ? 'selected' : ''}>A型</option>
                            <option ${AppState.clientForm.bloodType === 'B型' ? 'selected' : ''}>B型</option>
                            <option ${AppState.clientForm.bloodType === 'O型' ? 'selected' : ''}>O型</option>
                            <option ${AppState.clientForm.bloodType === 'AB型' ? 'selected' : ''}>AB型</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">電話番号</label>
                        <input type="tel" name="phone" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.phone}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">地域</label>
                        <input type="text" name="area" placeholder="例: 東京都渋谷区" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.area}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">紹介者</label>
                        <input type="text" name="referrer" placeholder="例: 田中様からのご紹介" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.referrer}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">担当者</label>
                        <input type="text" name="assignedStaff" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.assignedStaff}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">セッション金額(円)</label>
                        <input type="number" name="sessionPrice" placeholder="例: 10000" class="w-full px-3 py-2 border rounded-lg" value="${AppState.clientForm.sessionPrice}">
                    </div>
                </div>
                <div class="flex gap-3 mt-6">
                    <button type="submit" class="bg-yellow-400 text-yellow-900 px-6 py-2 rounded-lg hover:bg-yellow-500 transition shadow-md font-semibold">
                        ${AppState.editingClientId ? '更新' : '登録'}
                    </button>
                    <button type="button" onclick="closeClientForm()" class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition">キャンセル</button>
                </div>
            </form>
        </div>
    `;
}

// クライアントテーブル生成
function renderClientTable() {
    const filteredClients = getFilteredClients();
    
    return `
        <div class="overflow-x-auto shadow-md rounded-lg -mx-4 md:mx-0">
            <table class="w-full min-w-[640px]">
                <thead class="bg-yellow-400 text-yellow-900">
                    <tr>
                        <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">ID</th>
                        <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">氏名</th>
                        <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden md:table-cell">カナ</th>
                        <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden sm:table-cell">年齢</th>
                        <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden lg:table-cell">性別</th>
                        <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden lg:table-cell">担当者</th>
                        <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">記録</th>
                        <th class="px-2 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-semibold">操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredClients.map((client, index) => `
                        <tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
                            <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">${client.clientId}</td>
                            <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium">
                                <button onclick="viewClientDetail(${client.id})" class="text-blue-600 hover:text-blue-800 hover:underline truncate max-w-[120px] md:max-w-none block">
                                    ${client.name}
                                </button>
                            </td>
                            <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden md:table-cell">${client.kana}</td>
                            <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden sm:table-cell">${client.age}歳</td>
                            <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden lg:table-cell">${client.gender}</td>
                            <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-yellow-800 font-medium hidden lg:table-cell">${client.assignedStaff}</td>
                            <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">
                                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                    ${client.sessions.length}
                                </span>
                            </td>
                            <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">
                                <div class="flex justify-center">
                                    <button onclick="viewClientDetail(${client.id})" class="text-green-600 hover:text-green-800" title="詳細">
                                        <i data-lucide="eye" width="16" height="16"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            ${filteredClients.length === 0 ? '<div class="text-center py-8 text-gray-500">該当するクライアント情報がありません</div>' : ''}
        </div>
    `;
}

// 基本統計カード生成
function renderBasicStats() {
    const totalClients = AppState.clients.length;
    const maleCount = AppState.clients.filter(c => c.gender === '男性').length;
    const femaleCount = AppState.clients.filter(c => c.gender === '女性').length;
    const totalSessions = AppState.clients.reduce((sum, c) => sum + c.sessions.length, 0);
    
    return `
        <div class="bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900 p-4 md:p-6 rounded-lg shadow-lg">
            <h3 class="font-semibold mb-3 md:mb-4 text-base md:text-lg">クライアント統計</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div class="bg-white bg-opacity-60 p-3 md:p-4 rounded-lg backdrop-blur-sm border border-yellow-500 border-opacity-30">
                    <p class="text-xs md:text-sm text-yellow-800">総数</p>
                    <p class="text-xl md:text-3xl font-bold mt-1 md:mt-2">${totalClients}</p>
                </div>
                <div class="bg-white bg-opacity-60 p-3 md:p-4 rounded-lg backdrop-blur-sm border border-yellow-500 border-opacity-30">
                    <p class="text-xs md:text-sm text-yellow-800">男性</p>
                    <p class="text-xl md:text-3xl font-bold mt-1 md:mt-2">${maleCount}</p>
                </div>
                <div class="bg-white bg-opacity-60 p-3 md:p-4 rounded-lg backdrop-blur-sm border border-yellow-500 border-opacity-30">
                    <p class="text-xs md:text-sm text-yellow-800">女性</p>
                    <p class="text-xl md:text-3xl font-bold mt-1 md:mt-2">${femaleCount}</p>
                </div>
                <div class="bg-white bg-opacity-60 p-3 md:p-4 rounded-lg backdrop-blur-sm border border-yellow-500 border-opacity-30">
                    <p class="text-xs md:text-sm text-yellow-800">総セッション数</p>
                    <p class="text-xl md:text-3xl font-bold mt-1 md:mt-2">${totalSessions}</p>
                </div>
            </div>
            <button onclick="toggleDetailStats()" class="mt-3 md:mt-4 w-full bg-white bg-opacity-50 hover:bg-opacity-70 text-yellow-900 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 border border-yellow-500 border-opacity-30 font-semibold text-sm md:text-base">
                <i data-lucide="${AppState.showDetailStats ? 'chevron-up' : 'chevron-down'}" width="18" height="18"></i>
                ${AppState.showDetailStats ? '詳細統計を非表示' : '詳細統計を表示'}
            </button>
        </div>
    `;
}

// 詳細統計生成
function renderDetailedStats() {
    if (!AppState.showDetailStats) return '';
    
    // 担当者別クライアント数
    const staffCount = {};
    AppState.clients.forEach(c => {
        const staff = c.assignedStaff || '未設定';
        staffCount[staff] = (staffCount[staff] || 0) + 1;
    });
    
    // 性別分布
    const genderCount = {};
    AppState.clients.forEach(c => {
        const gender = c.gender || '未設定';
        genderCount[gender] = (genderCount[gender] || 0) + 1;
    });
    
    // 担当者別セッション数
    const staffSessionCount = {};
    AppState.clients.forEach(c => {
        c.sessions.forEach(s => {
            const staff = s.staff || '未設定';
            staffSessionCount[staff] = (staffSessionCount[staff] || 0) + 1;
        });
    });
    
    // 根本感情TOP10
    const emotionCount = {};
    AppState.clients.forEach(c => {
        c.sessions.forEach(s => {
            if (s.rootEmotion) {
                const emotions = s.rootEmotion.split(/[、,，]/).map(e => e.trim()).filter(e => e);
                emotions.forEach(emotion => {
                    emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
                });
            }
        });
    });
    
    return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white border-2 border-yellow-200 rounded-lg p-5 shadow-md">
                <h3 class="font-semibold mb-4 text-yellow-800 text-lg">担当者別クライアント数</h3>
                <div class="space-y-2">
                    ${Object.entries(staffCount).sort((a, b) => b[1] - a[1]).map(([staff, count]) => `
                        <div class="flex justify-between items-center py-3 border-b border-yellow-100">
                            <span class="text-sm font-medium text-gray-700">${staff}</span>
                            <span class="text-lg font-bold text-yellow-700">${count}名</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="bg-white border-2 border-yellow-200 rounded-lg p-5 shadow-md">
                <h3 class="font-semibold mb-4 text-yellow-800 text-lg">性別分布</h3>
                <div class="space-y-2">
                    ${Object.entries(genderCount).sort((a, b) => b[1] - a[1]).map(([gender, count]) => `
                        <div class="flex justify-between items-center py-3 border-b border-yellow-100">
                            <span class="text-sm font-medium text-gray-700">${gender}</span>
                            <span class="text-lg font-bold text-pink-600">${count}名</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="bg-white border-2 border-yellow-200 rounded-lg p-5 shadow-md">
                <h3 class="font-semibold mb-4 text-yellow-800 text-lg">担当者別セッション数</h3>
                <div class="space-y-2">
                    ${Object.entries(staffSessionCount).sort((a, b) => b[1] - a[1]).map(([staff, count]) => `
                        <div class="flex justify-between items-center py-3 border-b border-yellow-100">
                            <span class="text-sm font-medium text-gray-700">${staff}</span>
                            <span class="text-lg font-bold text-green-700">${count}件</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="bg-white border-2 border-yellow-200 rounded-lg p-5 shadow-md">
                <h3 class="font-semibold mb-4 text-yellow-800 text-lg">根本感情TOP10</h3>
                <div class="space-y-2 max-h-64 overflow-y-auto">
                    ${Object.entries(emotionCount).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([emotion, count]) => `
                        <div class="flex justify-between items-center py-3 border-b border-yellow-100">
                            <span class="text-sm font-medium text-gray-700">${emotion}</span>
                            <span class="text-lg font-bold text-purple-700">${count}件</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        ${renderMonthlyRevenue()}
        ${renderStaffRevenue()}
    `;
}

// 月別売上統計
function renderMonthlyRevenue() {
    const monthlyRevenue = {};
    AppState.clients.forEach(c => {
        const price = Number(c.sessionPrice) || 0;
        c.sessions.forEach(s => {
            const date = new Date(s.date);
            const yearMonth = `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, '0')}月`;
            if (!monthlyRevenue[yearMonth]) {
                monthlyRevenue[yearMonth] = { count: 0, revenue: 0 };
            }
            monthlyRevenue[yearMonth].count += 1;
            monthlyRevenue[yearMonth].revenue += price;
        });
    });
    
    const sortedMonths = Object.entries(monthlyRevenue).sort((a, b) => {
        const [yearA, monthA] = a[0].match(/\d+/g).map(Number);
        const [yearB, monthB] = b[0].match(/\d+/g).map(Number);
        return yearB * 12 + monthB - (yearA * 12 + monthA);
    });
    
    return `
        <div class="bg-white border-2 border-yellow-200 rounded-lg p-5 shadow-md">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-yellow-800 text-lg">月別セッション売上統計</h3>
                <button onclick="toggleMonthlyRevenue()" class="text-yellow-700 hover:text-yellow-900 transition">
                    <i data-lucide="${AppState.showMonthlyRevenue ? 'chevron-up' : 'chevron-down'}" width="20" height="20"></i>
                </button>
            </div>
            <div class="space-y-3">
                ${sortedMonths.map(([month, data]) => `
                    <div class="flex justify-between items-center py-3 px-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div>
                            <span class="text-sm font-semibold text-gray-800">${month}</span>
                            <span class="text-xs text-gray-600 ml-3">セッション数: ${data.count}件</span>
                        </div>
                        ${AppState.showMonthlyRevenue ? `<span class="text-xl font-bold text-green-700">¥${data.revenue.toLocaleString()}</span>` : ''}
                    </div>
                `).join('')}
                ${sortedMonths.length === 0 ? '<p class="text-center text-gray-500 py-4">セッションデータがありません</p>' : ''}
            </div>
        </div>
    `;
}

// 担当者別売上統計
function renderStaffRevenue() {
    const staffRevenue = {};
    AppState.clients.forEach(c => {
        const price = Number(c.sessionPrice) || 0;
        c.sessions.forEach(s => {
            const staff = s.staff || '未設定';
            if (!staffRevenue[staff]) {
                staffRevenue[staff] = { count: 0, revenue: 0 };
            }
            staffRevenue[staff].count += 1;
            staffRevenue[staff].revenue += price;
        });
    });
    
    return `
        <div class="bg-white border-2 border-yellow-200 rounded-lg p-5 shadow-md">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-yellow-800 text-lg">担当者別売上統計</h3>
                <button onclick="toggleStaffRevenue()" class="text-yellow-700 hover:text-yellow-900 transition">
                    <i data-lucide="${AppState.showStaffRevenue ? 'chevron-up' : 'chevron-down'}" width="20" height="20"></i>
                </button>
            </div>
            <div class="space-y-3">
                ${Object.entries(staffRevenue).sort((a, b) => b[1].revenue - a[1].revenue).map(([staff, data]) => `
                    <div class="flex justify-between items-center py-3 px-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div>
                            <span class="text-sm font-semibold text-gray-800">${staff}</span>
                            <span class="text-xs text-gray-600 ml-3">セッション数: ${data.count}件</span>
                        </div>
                        ${AppState.showStaffRevenue ? `<span class="text-xl font-bold text-green-700">¥${data.revenue.toLocaleString()}</span>` : ''}
                    </div>
                `).join('')}
                ${Object.keys(staffRevenue).length === 0 ? '<p class="text-center text-gray-500 py-4">セッションデータがありません</p>' : ''}
            </div>
        </div>
    `;
}
