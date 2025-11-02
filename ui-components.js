// UIコンポーネント生成関数

// アイコン生成ヘルパー
function createIcon(name, size = 20) {
    const i = document.createElement('i');
    i.setAttribute('data-lucide', name);
    i.setAttribute('width', size);
    i.setAttribute('height', size);
    return i;
}

// ヘッダー部分の生成
function renderHeader() {
    return `
        <div class="border-b-4 border-yellow-400 pb-3 md:pb-4 mb-4 md:mb-6">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                    <h1 class="text-xl md:text-3xl font-bold text-yellow-800">クライアント管理システム</h1>
                    <p class="text-xs md:text-sm text-yellow-700 mt-1">Client Management System</p>
                </div>
                <div class="flex flex-wrap gap-2 items-center">
                    <button onclick="exportClientsCSV()" class="text-sm bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium">
                        クライアントエクスポート
                    </button>
                    <button onclick="exportSessionsCSV()" class="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium">
                        セッションエクスポート
                    </button>
                    <button onclick="exportBackup()" class="text-xs bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition">
                        バックアップ
                    </button>
                    <button onclick="importBackup()" class="text-xs bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition">
                        復元
                    </button>
                </div>
            </div>
        </div>
    `;
}

// クライアント詳細ビューの生成
function renderClientDetail() {
    const client = AppState.selectedClient;
    const spiritualNum = calculateSpiritualNumber(client.birthDate);
    const spiritualInfo = getSpiritualInfo(spiritualNum);
    
    return `
        <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 p-3 md:p-6">
            <div class="max-w-7xl mx-auto">
                <div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
                    <button onclick="backToList()" class="mb-4 text-yellow-700 hover:text-yellow-900 font-medium flex items-center gap-2">
                        ← クライアント一覧に戻る
                    </button>
                    
                    <div class="border-b-2 border-yellow-300 pb-4 mb-6">
                        <h2 class="text-2xl md:text-3xl font-bold text-yellow-800 mb-2">${client.name}</h2>
                        <p class="text-sm text-gray-600">クライアントID: ${client.clientId}</p>
                    </div>
                    
                    <div class="flex gap-2 mb-6">
                        <button onclick="editClientFromDetail()" class="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition shadow-md font-semibold">
                            クライアント情報編集
                        </button>
                        <button onclick="deleteClientFromDetail()" class="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md">
                            削除
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">生年月日</p>
                            <p class="text-lg font-semibold">${client.birthDate} (${client.age}歳)</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">スピリチュアルNo.</p>
                            ${spiritualInfo ? `
                                <div class="flex items-center gap-2">
                                    <span class="px-4 py-2 rounded-lg ${spiritualInfo.bgColor} ${spiritualInfo.textColor} ${spiritualInfo.borderColor} border-2 font-bold text-lg">
                                        ${spiritualNum}
                                    </span>
                                    <span class="text-lg font-semibold">${spiritualInfo.name}（${spiritualInfo.color}）</span>
                                </div>
                            ` : '<p class="text-lg">—</p>'}
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">性別</p>
                            <p class="text-lg font-semibold">${client.gender}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">血液型</p>
                            <p class="text-lg font-semibold">${client.bloodType}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">電話番号</p>
                            <p class="text-lg font-semibold">${client.phone}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">地域</p>
                            <p class="text-lg font-semibold">${client.area}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">セッション金額</p>
                            <p class="text-lg font-semibold">¥${client.sessionPrice ? Number(client.sessionPrice).toLocaleString() : '—'}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">紹介者</p>
                            <p class="text-lg font-semibold">${client.referrer || '—'}</p>
                        </div>
                        <div class="md:col-span-2">
                            <p class="text-sm text-gray-600 mb-1">担当者</p>
                            <p class="text-lg font-semibold text-yellow-800">${client.assignedStaff}</p>
                        </div>
                    </div>
                    
                    <div class="border-t-2 border-yellow-200 pt-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-bold text-yellow-800">セッション記録</h3>
                            <button onclick="openSessionForm()" class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md">
                                新規セッション追加
                            </button>
                        </div>
                        
                        ${AppState.isSessionFormOpen ? renderSessionForm() : ''}
                        
                        <div class="space-y-4">
                            ${client.sessions.length === 0 
                                ? '<p class="text-center text-gray-500 py-8">セッション記録がありません</p>'
                                : client.sessions.slice().reverse().map(session => renderSessionCard(session, client.id)).join('')
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// セッションカード生成
function renderSessionCard(session, clientId) {
    return `
        <div class="border rounded-lg p-4 hover:shadow-md">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <p class="text-lg font-bold">${session.date}</p>
                    <p class="text-sm text-gray-600">担当者: ${session.staff} | 所要時間: ${session.duration} | 所管: ${session.jurisdiction}</p>
                </div>
                <button onclick="deleteSession(${clientId}, ${session.id})" class="text-red-600 hover:text-red-800">
                    <i data-lucide="trash-2" width="18" height="18"></i>
                </button>
            </div>
            <div class="space-y-2">
                <div><span class="text-sm font-semibold">お題: </span><span class="text-sm text-blue-700 font-medium">${session.topic}</span></div>
                <div><span class="text-sm font-semibold">内容: </span><span class="text-sm">${session.content}</span></div>
                <div class="bg-purple-50 p-2 rounded">
                    <span class="text-sm font-semibold">根本感情: </span><span class="text-sm">${session.rootEmotion}</span>
                </div>
                ${session.notes ? `<div><span class="text-sm font-semibold">特記事項: </span><span class="text-sm">${session.notes}</span></div>` : ''}
                ${session.nextSession ? `
                    <div class="bg-yellow-50 p-2 rounded">
                        <span class="text-sm font-semibold">次回への申し送り事項: </span><span class="text-sm">${session.nextSession}</span>
                    </div>
                ` : ''}
                ${session.remarks ? `<div><span class="text-sm font-semibold">備考: </span><span class="text-sm text-gray-600">${session.remarks}</span></div>` : ''}
            </div>
        </div>
    `;
}

// セッションフォーム生成
function renderSessionForm() {
    return `
        <div class="bg-green-50 p-6 rounded-lg mb-6 border border-green-200">
            <h3 class="text-lg font-bold mb-4 text-green-800">新規セッション記録</h3>
            <form onsubmit="submitSessionForm(event)" id="sessionForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">セッション日</label>
                        <input type="date" name="date" class="w-full px-3 py-2 border rounded-lg" value="${AppState.sessionForm.date}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">担当者</label>
                        <input type="text" name="staff" class="w-full px-3 py-2 border rounded-lg" value="${AppState.sessionForm.staff}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">所要時間</label>
                        <input type="text" name="duration" placeholder="例: 60分" class="w-full px-3 py-2 border rounded-lg" value="${AppState.sessionForm.duration}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">所管</label>
                        <input type="text" name="jurisdiction" class="w-full px-3 py-2 border rounded-lg" value="${AppState.sessionForm.jurisdiction}" required>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium mb-1">お題</label>
                        <input type="text" name="topic" class="w-full px-3 py-2 border rounded-lg" value="${AppState.sessionForm.topic}" required>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium mb-1">内容</label>
                        <textarea name="content" rows="3" class="w-full px-3 py-2 border rounded-lg" required>${AppState.sessionForm.content}</textarea>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium mb-1">根本感情</label>
                        <input type="text" name="rootEmotion" placeholder="例: 不安、焦燥感" class="w-full px-3 py-2 border rounded-lg" value="${AppState.sessionForm.rootEmotion}">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium mb-1">特記事項</label>
                        <textarea name="notes" rows="3" class="w-full px-3 py-2 border rounded-lg">${AppState.sessionForm.notes}</textarea>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium mb-1">次回への申し送り事項</label>
                        <textarea name="nextSession" rows="2" class="w-full px-3 py-2 border rounded-lg">${AppState.sessionForm.nextSession}</textarea>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium mb-1">備考</label>
                        <textarea name="remarks" rows="2" class="w-full px-3 py-2 border rounded-lg">${AppState.sessionForm.remarks}</textarea>
                    </div>
                </div>
                <div class="flex gap-3 mt-4">
                    <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">記録を保存</button>
                    <button type="button" onclick="closeSessionForm()" class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">キャンセル</button>
                </div>
            </form>
        </div>
    `;
}
