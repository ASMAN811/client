// メインレンダリング関数
function render() {
    const app = document.getElementById('app');
    
    if (AppState.viewMode === 'detail' && AppState.selectedClient) {
        app.innerHTML = renderClientDetail();
    } else {
        app.innerHTML = `
            <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 p-3 md:p-6">
                <div class="max-w-7xl mx-auto">
                    <div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
                        ${renderHeader()}
                        
                        <div class="flex gap-4 mb-6">
                            <div class="flex-1 relative">
                                <i data-lucide="search" class="absolute left-3 top-3 text-gray-400" width="20" height="20"></i>
                                <input type="text" id="searchInput" placeholder="クライアント名、カナ、クライアントIDで検索..."
                                    class="w-full pl-10 pr-4 py-2 border rounded-lg" value="${AppState.searchTerm}">
                            </div>
                            <button onclick="openClientForm()" class="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-6 py-2 rounded-lg hover:bg-yellow-500 transition shadow-md font-semibold">
                                <i data-lucide="plus" width="20" height="20"></i>
                                新規クライアント登録
                            </button>
                        </div>
                        
                        ${AppState.isClientFormOpen ? renderClientForm() : ''}
                        
                        ${renderClientTable()}
                        
                        <div class="mt-4 md:mt-6 space-y-4 md:space-y-6">
                            ${renderBasicStats()}
                            ${renderDetailedStats()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 検索入力のイベントリスナー
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                AppState.searchTerm = e.target.value;
                render();
            });
        }
    }
    
    // Lucideアイコンを初期化
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// イベントハンドラー関数

function openClientForm() {
    AppState.isClientFormOpen = true;
    AppState.editingClientId = null;
    resetClientForm();
    render();
}

function closeClientForm() {
    resetClientForm();
    render();
}

function submitClientForm(e) {
    handleClientSubmit(e);
}

function openSessionForm() {
    AppState.isSessionFormOpen = true;
    render();
}

function closeSessionForm() {
    resetSessionForm();
    render();
}

function submitSessionForm(e) {
    e.preventDefault();
    
    // フォームからデータを取得
    const formData = new FormData(e.target);
    AppState.sessionForm = {
        date: formData.get('date'),
        staff: formData.get('staff'),
        duration: formData.get('duration'),
        content: formData.get('content'),
        topic: formData.get('topic'),
        rootEmotion: formData.get('rootEmotion'),
        notes: formData.get('notes'),
        jurisdiction: formData.get('jurisdiction'),
        nextSession: formData.get('nextSession'),
        remarks: formData.get('remarks')
    };
    
    handleSessionSubmit(e);
}

function viewClientDetail(clientId) {
    const client = AppState.clients.find(c => c.id === clientId);
    if (client) {
        AppState.selectedClient = client;
        AppState.viewMode = 'detail';
        render();
    }
}

function backToList() {
    AppState.viewMode = 'list';
    AppState.selectedClient = null;
    render();
}

function editClientFromDetail() {
    handleEditClient(AppState.selectedClient);
}

function deleteClientFromDetail() {
    if (confirm(`${AppState.selectedClient.name}さんのデータを削除しますか？この操作は取り消せません。`)) {
        handleDeleteClient(AppState.selectedClient.id);
    }
}

function deleteSession(clientId, sessionId) {
    handleDeleteSession(clientId, sessionId);
}

function toggleDetailStats() {
    AppState.showDetailStats = !AppState.showDetailStats;
    render();
}

function toggleMonthlyRevenue() {
    AppState.showMonthlyRevenue = !AppState.showMonthlyRevenue;
    render();
}

function toggleStaffRevenue() {
    AppState.showStaffRevenue = !AppState.showStaffRevenue;
    render();
}

// フォーム送信時の処理を上書き
window.submitClientForm = function(e) {
    e.preventDefault();
    
    // フォームからデータを取得
    const formData = new FormData(e.target);
    AppState.clientForm = {
        clientId: formData.get('clientId'),
        name: formData.get('name'),
        kana: formData.get('kana'),
        birthDate: formData.get('birthDate'),
        gender: formData.get('gender'),
        phone: formData.get('phone'),
        area: formData.get('area'),
        bloodType: formData.get('bloodType'),
        referrer: formData.get('referrer'),
        assignedStaff: formData.get('assignedStaff'),
        sessionPrice: formData.get('sessionPrice')
    };
    
    handleClientSubmit(e);
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    render();
});
