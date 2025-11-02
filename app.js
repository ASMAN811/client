// アプリケーションの状態管理
const AppState = {
    clients: [],
    selectedClient: null,
    viewMode: 'list',
    isClientFormOpen: false,
    isSessionFormOpen: false,
    editingClientId: null,
    searchTerm: '',
    showDetailStats: false,
    showMonthlyRevenue: false,
    showStaffRevenue: false,
    clientForm: {
        clientId: '',
        name: '',
        kana: '',
        birthDate: '',
        gender: '男性',
        phone: '',
        area: '',
        bloodType: '',
        referrer: '',
        assignedStaff: '',
        sessionPrice: ''
    },
    sessionForm: {
        date: new Date().toISOString().split('T')[0],
        staff: '',
        duration: '',
        content: '',
        topic: '',
        rootEmotion: '',
        notes: '',
        jurisdiction: '',
        nextSession: '',
        remarks: ''
    }
};

// ローカルストレージからデータを読み込む
function loadFromLocalStorage() {
    const savedClients = localStorage.getItem('clientManagementData');
    if (savedClients) {
        try {
            AppState.clients = JSON.parse(savedClients);
        } catch (e) {
            AppState.clients = getDefaultClient();
        }
    } else {
        AppState.clients = getDefaultClient();
    }
}

// デフォルトクライアントデータ
function getDefaultClient() {
    return [{
        id: 1,
        clientId: 'C2024001',
        name: '山田太郎',
        kana: 'ヤマダタロウ',
        birthDate: '1980-05-15',
        age: 44,
        gender: '男性',
        phone: '090-1234-5678',
        area: '東京都渋谷区',
        bloodType: 'A型',
        referrer: '田中様からのご紹介',
        assignedStaff: '佐藤担当者',
        sessionPrice: 10000,
        sessions: [{
            id: 1,
            date: '2024-11-01',
            staff: '佐藤担当者',
            duration: '60分',
            content: 'キャリアに関する相談、今後の方向性について',
            topic: '仕事とプライベートのバランス',
            rootEmotion: '不安、焦燥感',
            notes: '最近の業務過多により疲労が蓄積',
            jurisdiction: '東京オフィス',
            nextSession: '次回は具体的なアクションプランを策定予定',
            remarks: '定期的なフォローアップが必要'
        }]
    }];
}

// ローカルストレージに保存
function saveToLocalStorage() {
    localStorage.setItem('clientManagementData', JSON.stringify(AppState.clients));
}

// 年齢計算
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

// スピリチュアルナンバー計算
function calculateSpiritualNumber(birthDate) {
    if (!birthDate) return null;
    const [year, month, day] = birthDate.split('-').map(Number);
    let sum = month + day;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = String(sum).split('').reduce((acc, digit) => acc + Number(digit), 0);
    }
    return sum;
}

// スピリチュアル情報取得
function getSpiritualInfo(number) {
    const spiritualMap = {
        1: { name: '進化', color: 'white', bgColor: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-300' },
        2: { name: '調和', color: 'black', bgColor: 'bg-gray-800', textColor: 'text-white', borderColor: 'border-gray-900' },
        3: { name: '勇気', color: 'blue', bgColor: 'bg-blue-500', textColor: 'text-white', borderColor: 'border-blue-600' },
        4: { name: '愛', color: 'green', bgColor: 'bg-green-500', textColor: 'text-white', borderColor: 'border-green-600' },
        5: { name: '吾', color: 'yellow', bgColor: 'bg-yellow-400', textColor: 'text-gray-800', borderColor: 'border-yellow-500' },
        6: { name: '創造', color: 'white', bgColor: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-300' },
        7: { name: '信念', color: 'red', bgColor: 'bg-red-500', textColor: 'text-white', borderColor: 'border-red-600' },
        8: { name: '希望', color: 'white', bgColor: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-300' },
        9: { name: '純正', color: 'purple', bgColor: 'bg-purple-500', textColor: 'text-white', borderColor: 'border-purple-600' },
        11: { name: '進化', color: 'white', bgColor: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-300' },
        22: { name: '調和', color: 'black', bgColor: 'bg-gray-800', textColor: 'text-white', borderColor: 'border-gray-900' },
        33: { name: '勇気', color: 'blue', bgColor: 'bg-blue-500', textColor: 'text-white', borderColor: 'border-blue-600' }
    };
    return spiritualMap[number] || null;
}

// フォームリセット
function resetClientForm() {
    AppState.clientForm = {
        clientId: '',
        name: '',
        kana: '',
        birthDate: '',
        gender: '男性',
        phone: '',
        area: '',
        bloodType: '',
        referrer: '',
        assignedStaff: '',
        sessionPrice: ''
    };
    AppState.isClientFormOpen = false;
    AppState.editingClientId = null;
}

function resetSessionForm() {
    AppState.sessionForm = {
        date: new Date().toISOString().split('T')[0],
        staff: '',
        duration: '',
        content: '',
        topic: '',
        rootEmotion: '',
        notes: '',
        jurisdiction: '',
        nextSession: '',
        remarks: ''
    };
    AppState.isSessionFormOpen = false;
}

// クライアント送信
function handleClientSubmit(e) {
    e.preventDefault();
    const age = calculateAge(AppState.clientForm.birthDate);
    
    if (AppState.editingClientId) {
        AppState.clients = AppState.clients.map(c => 
            c.id === AppState.editingClientId 
                ? { ...AppState.clientForm, id: AppState.editingClientId, age, sessions: c.sessions }
                : c
        );
    } else {
        AppState.clients.push({
            ...AppState.clientForm,
            id: Date.now(),
            age,
            sessions: []
        });
    }
    
    saveToLocalStorage();
    resetClientForm();
    render();
}

// セッション送信
function handleSessionSubmit(e) {
    e.preventDefault();
    const newSession = { ...AppState.sessionForm, id: Date.now() };
    
    AppState.clients = AppState.clients.map(c =>
        c.id === AppState.selectedClient.id
            ? { ...c, sessions: [...c.sessions, newSession] }
            : c
    );
    
    AppState.selectedClient = {
        ...AppState.selectedClient,
        sessions: [...AppState.selectedClient.sessions, newSession]
    };
    
    saveToLocalStorage();
    resetSessionForm();
    render();
}

// クライアント編集
function handleEditClient(client) {
    AppState.clientForm = { ...client };
    AppState.editingClientId = client.id;
    AppState.isClientFormOpen = true;
    render();
}

// クライアント削除
function handleDeleteClient(id) {
    if (confirm('このクライアント情報を削除しますか？')) {
        AppState.clients = AppState.clients.filter(c => c.id !== id);
        if (AppState.selectedClient && AppState.selectedClient.id === id) {
            AppState.selectedClient = null;
            AppState.viewMode = 'list';
        }
        saveToLocalStorage();
        render();
    }
}

// セッション削除
function handleDeleteSession(clientId, sessionId) {
    if (confirm('このセッション記録を削除しますか？')) {
        AppState.clients = AppState.clients.map(c =>
            c.id === clientId
                ? { ...c, sessions: c.sessions.filter(s => s.id !== sessionId) }
                : c
        );
        
        if (AppState.selectedClient && AppState.selectedClient.id === clientId) {
            AppState.selectedClient = {
                ...AppState.selectedClient,
                sessions: AppState.selectedClient.sessions.filter(s => s.id !== sessionId)
            };
        }
        
        saveToLocalStorage();
        render();
    }
}

// クライアントフィルタリング
function getFilteredClients() {
    return AppState.clients.filter(c =>
        c.name.toLowerCase().includes(AppState.searchTerm.toLowerCase()) ||
        c.kana.toLowerCase().includes(AppState.searchTerm.toLowerCase()) ||
        c.clientId.toLowerCase().includes(AppState.searchTerm.toLowerCase())
    );
}

// CSVエクスポート（クライアント）
function exportClientsCSV() {
    let csvContent = 'クライアントID,氏名,カナ,生年月日,年齢,性別,電話番号,地域,血液型,紹介者,担当者,セッション金額\n';
    AppState.clients.forEach(client => {
        const row = [
            client.clientId,
            client.name,
            client.kana,
            client.birthDate,
            client.age,
            client.gender,
            client.phone,
            client.area,
            client.bloodType,
            client.referrer || '',
            client.assignedStaff,
            client.sessionPrice || ''
        ].map(cell => `"${cell}"`).join(',');
        csvContent += row + '\n';
    });
    
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `クライアント情報_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

// CSVエクスポート（セッション）
function exportSessionsCSV() {
    let csvContent = 'クライアントID,クライアント名,セッション日,担当者,所要時間,お題,内容,根本感情,特記事項,所管,次回への申し送り事項,備考\n';
    AppState.clients.forEach(client => {
        client.sessions.forEach(session => {
            const row = [
                client.clientId,
                client.name,
                session.date,
                session.staff,
                session.duration,
                session.topic,
                session.content,
                session.rootEmotion,
                session.notes || '',
                session.jurisdiction,
                session.nextSession || '',
                session.remarks || ''
            ].map(cell => `"${cell}"`).join(',');
            csvContent += row + '\n';
        });
    });
    
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `セッション記録_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

// JSONバックアップ
function exportBackup() {
    const dataStr = JSON.stringify(AppState.clients, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `全データバックアップ_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// JSONインポート
function importBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    if (confirm('データをインポートしますか？現在のデータは上書きされます。')) {
                        AppState.clients = importedData;
                        saveToLocalStorage();
                        render();
                        alert('データをインポートしました！');
                    }
                } catch (error) {
                    alert('ファイルの読み込みに失敗しました。');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}
