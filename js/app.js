// ========================================
// VISITA SEGURA - APP PRINCIPAL
// ========================================

const app = {
    state: {
        currentScreen: 'splash',
        role: null,
        user: null,
        activeTab: 'home',
        visitaFilter: null,
        visitaPage: 0,
        homeHojePage: 0,
        visitas: [],
        corretores: [],
        porteiros: [],
        predios: [],
        blocosUnidades: [],
        visitantes: [],
        acompanhantes: []
    },

    init() {
        this.loadData();
        this.initTheme();
        this.showScreen('splash');

        // Auto avança do splash após 2.5s
        setTimeout(() => {
            this.showScreen('role');
        }, 2500);
    },

    // ─── Theme management ──────────────────────────────────────

    _themeLabels: {
        original: 'Original 🌙',
        claro:    'Claro ☀️',
        escuro:   'Escuro 🌑',
        verde:    'Verde 🌿',
        roxo:     'Roxo 💜'
    },

    initTheme() {
        const saved = localStorage.getItem('vsTheme') || 'original';
        this._applyTheme(saved, false);
    },

    setTheme(name) {
        this._applyTheme(name, true);
    },

    _applyTheme(name, showFeedback) {
        document.documentElement.setAttribute('data-theme', name);
        localStorage.setItem('vsTheme', name);

        document.querySelectorAll('.theme-swatch').forEach(s => {
            s.classList.toggle('active', s.dataset.theme === name);
        });

        const versionEl = document.getElementById('version-text');
        if (versionEl) versionEl.textContent = `v1.2.0 — ${this._themeLabels[name] || name}`;

        if (showFeedback) this.showToast(`Tema ${this._themeLabels[name] || name} aplicado`);
    },

    // ───────────────────────────────────────────────────────────

    loadData() {
        const DATA_VERSION = '7';
        const stored = localStorage.getItem('visitaSeguraData');
        const storedVersion = localStorage.getItem('visitaSeguraVersion');

        if (stored && storedVersion === DATA_VERSION) {
            const data = JSON.parse(stored);
            this.state.visitas = data.visitas || MOCK_DATA.visitas;
            this.state.corretores = data.corretores || MOCK_DATA.corretores;
            // Prédios são dados de sistema — sempre carrega do código para garantir blocos atualizados
            this.state.predios = MOCK_DATA.predios;
            const storedPorteiros = data.porteiros || [];
            const mockIds = MOCK_DATA.porteiros.map(p => p.id);
            const extraPorteiros = storedPorteiros.filter(p => !mockIds.includes(p.id));
            this.state.porteiros = [...MOCK_DATA.porteiros, ...extraPorteiros];
        } else {
            this.state.visitas = [...MOCK_DATA.visitas];
            this.state.corretores = [...MOCK_DATA.corretores];
            this.state.porteiros = [...MOCK_DATA.porteiros];
            this.state.predios = [...MOCK_DATA.predios];
            this.saveData();
            localStorage.setItem('visitaSeguraVersion', DATA_VERSION);
        }
    },

    saveData() {
        localStorage.setItem('visitaSeguraData', JSON.stringify({
            visitas: this.state.visitas,
            corretores: this.state.corretores,
            porteiros: this.state.porteiros,
            predios: this.state.predios
        }));
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId + '-screen').classList.add('active');
        this.state.currentScreen = screenId;
    },

    selectRole(role) {
        this.state.role = role;
        document.getElementById('login-role-title').textContent = role === 'corretor' ? 'Acesso Corretor' : 'Acesso Porteiro';
        document.getElementById('login-role-subtitle').textContent = role === 'corretor' ? 'Digite seu número de registro' : 'Informe seu e-mail de acesso';
        this.renderLoginUsers();
        this.showScreen('login');
    },

    goToRole() {
        this.state.role = null;
        this.showScreen('role');
    },

    renderLoginUsers() {
        if (this.state.role === 'corretor') {
            this.renderCorretorLoginForm();
        } else {
            this.renderPorteiroLoginForm();
        }
    },

    renderCorretorLoginForm() {
        const container = document.getElementById('login-users');
        container.innerHTML = `
            <div class="login-form-container animate-in">
                <div class="login-form-icon corretor">
                    <i class="fas fa-id-badge"></i>
                </div>
                <p class="login-form-desc">Digite seu número de registro CRECI para acessar o sistema</p>
                <div class="form-group">
                    <label class="form-label">Número de Registro</label>
                    <input
                        type="text"
                        class="form-control login-input"
                        id="registro-input"
                        placeholder="000000-F"
                        maxlength="8"
                        autocomplete="off"
                        oninput="app.formatRegistro(this)"
                        onkeypress="if(event.key==='Enter') app.loginCorretor()"
                    >
                    <small class="form-hint"><i class="fas fa-circle-info"></i> Formato: 6 dígitos seguidos de -F &nbsp;•&nbsp; Teste: <strong>123456-F</strong></small>
                </div>
                <button class="btn btn-primary" onclick="app.loginCorretor()">
                    <i class="fas fa-sign-in-alt"></i> Acessar Sistema
                </button>
            </div>
        `;
        setTimeout(() => { const i = document.getElementById('registro-input'); if (i) i.focus(); }, 400);
    },

    renderPorteiroLoginForm() {
        const container = document.getElementById('login-users');
        container.innerHTML = `
            <div class="login-form-container animate-in">
                <div class="login-form-icon porteiro">
                    <i class="fas fa-envelope-open-text"></i>
                </div>
                <p class="login-form-desc">Informe seu e-mail cadastrado para acessar a portaria</p>
                <div class="form-group">
                    <label class="form-label">E-mail</label>
                    <input
                        type="email"
                        class="form-control login-input"
                        id="email-porteiro-input"
                        placeholder="seu@email.com"
                        autocomplete="email"
                        onkeypress="if(event.key==='Enter') app.loginPorteiro()"
                    >
                    <small class="form-hint"><i class="fas fa-circle-info"></i> Teste: <strong>joao.silva@solaris.com.br</strong></small>
                </div>
                <button class="btn btn-primary" onclick="app.loginPorteiro()">
                    <i class="fas fa-sign-in-alt"></i> Acessar Sistema
                </button>
                <p class="register-link">
                    Primeira vez? <a href="#" onclick="app.goToRegisterPorteiro(); return false;">Registrar nova conta</a>
                </p>
            </div>
        `;
        setTimeout(() => { const i = document.getElementById('email-porteiro-input'); if (i) i.focus(); }, 400);
    },

    formatRegistro(input) {
        const digits = input.value.replace(/\D/g, '').slice(0, 6);
        input.value = digits.length === 6 ? digits + '-F' : digits;
        input.classList.remove('input-error');
    },

    loginCorretor() {
        const input = document.getElementById('registro-input');
        let val = input ? input.value.trim().toUpperCase() : '';
        if (/^\d{6}$/.test(val)) val += '-F';
        if (!/^\d{6}-F$/.test(val)) {
            this.showToast('Formato inválido. Use: 000000-F');
            if (input) { input.classList.add('input-error'); input.focus(); }
            return;
        }
        const numero = val.substring(0, 6);
        const corretor = this.state.corretores.find(c => c.creci.substring(0, 6) === numero);
        if (!corretor) {
            this.showToast('Registro não encontrado no sistema');
            if (input) { input.classList.add('input-error'); input.focus(); }
            return;
        }
        this.state.role = 'corretor';
        this.login(corretor.id);
    },

    loginPorteiro() {
        const input = document.getElementById('email-porteiro-input');
        const email = input ? input.value.trim().toLowerCase() : '';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.showToast('Informe um e-mail válido');
            if (input) { input.classList.add('input-error'); input.focus(); }
            return;
        }
        const porteiro = this.state.porteiros.find(p => p.email && p.email.toLowerCase() === email);
        if (!porteiro) {
            this.showToast('E-mail não encontrado. Verifique ou registre uma conta');
            if (input) { input.classList.add('input-error'); input.focus(); }
            return;
        }
        this.state.role = 'porteiro';
        this.login(porteiro.id);
    },

    goToTutorials() {
        this.showScreen('tutorials');
        this.switchTutorialTab('corretor', document.querySelector('.tutorial-tab'));
    },

    switchTutorialTab(role, btn) {
        document.querySelectorAll('.tutorial-tab').forEach(t => t.classList.remove('active'));
        if (btn) btn.classList.add('active');
        const content = document.getElementById('tutorials-content');
        if (!content) return;
        if (role === 'corretor') {
            content.innerHTML = `
                <div class="tutorial-hero animate-in">
                    <div class="role-icon corretor" style="margin: 0 auto 1rem; width:56px; height:56px;">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <h3>Para Corretores</h3>
                    <p>Agende visitas e gere códigos de acesso facilmente</p>
                </div>
                <div class="tutorial-steps">
                    <div class="tutorial-step animate-in stagger-1">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4><i class="fas fa-sign-in-alt"></i> Faça seu login</h4>
                            <p>Selecione "Sou Corretor" e informe seu registro no formato <strong>000000-F</strong>.</p>
                            <div class="step-example"><span>Exemplo de teste:</span><code>123456-F</code></div>
                        </div>
                    </div>
                    <div class="tutorial-step animate-in stagger-2">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4><i class="fas fa-calendar-plus"></i> Agende uma visita</h4>
                            <p>No painel, toque no botão <strong>+</strong> e selecione o prédio, data e horário desejados.</p>
                        </div>
                    </div>
                    <div class="tutorial-step animate-in stagger-3">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4><i class="fas fa-qrcode"></i> Receba o código</h4>
                            <p>Um código exclusivo de 6 dígitos é gerado automaticamente para a visita agendada.</p>
                        </div>
                    </div>
                    <div class="tutorial-step animate-in stagger-4">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4><i class="fas fa-door-open"></i> Apresente ao porteiro</h4>
                            <p>Na portaria, mostre o código ou QR Code para o porteiro validar sua entrada.</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            content.innerHTML = `
                <div class="tutorial-hero animate-in">
                    <div class="role-icon porteiro" style="margin: 0 auto 1rem; width:56px; height:56px;">
                        <i class="fas fa-id-card-clip"></i>
                    </div>
                    <h3>Para Porteiros</h3>
                    <p>Controle e valide o acesso de corretores ao condomínio</p>
                </div>
                <div class="tutorial-steps">
                    <div class="tutorial-step animate-in stagger-1">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4><i class="fas fa-envelope"></i> Faça seu login</h4>
                            <p>Selecione "Sou Porteiro" e informe seu <strong>e-mail cadastrado</strong>.</p>
                            <div class="step-example"><span>Exemplo de teste:</span><code>joao.silva@solaris.com.br</code></div>
                        </div>
                    </div>
                    <div class="tutorial-step animate-in stagger-2">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4><i class="fas fa-list-check"></i> Veja as visitas do dia</h4>
                            <p>No painel, visualize todas as visitas agendadas para o seu condomínio.</p>
                        </div>
                    </div>
                    <div class="tutorial-step animate-in stagger-3">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4><i class="fas fa-shield-halved"></i> Valide o código</h4>
                            <p>Acesse a aba "Validar" e digite o código de 6 dígitos do corretor.</p>
                        </div>
                    </div>
                    <div class="tutorial-step animate-in stagger-4">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4><i class="fas fa-check-circle"></i> Libere ou negue o acesso</h4>
                            <p>Confirme os dados do corretor e decida se libera ou nega a entrada.</p>
                        </div>
                    </div>
                </div>
                <div class="tutorial-tip animate-in">
                    <i class="fas fa-lightbulb"></i>
                    <p>Não tem conta? Registre-se na tela de login da portaria.</p>
                </div>
            `;
        }
    },

    goToRegisterPorteiro() {
        const select = document.getElementById('reg-predio');
        this.showScreen('register-porteiro');
        setTimeout(() => {
            const sel = document.getElementById('reg-predio');
            if (sel && sel.options.length <= 1) {
                this.state.predios.forEach(p => {
                    const opt = document.createElement('option');
                    opt.value = p.id;
                    opt.textContent = p.nome + ' — ' + p.endereco;
                    sel.appendChild(opt);
                });
            }
        }, 100);
    },

    backToPorteiroLogin() {
        this.showScreen('login');
    },

    submitRegisterPorteiro(e) {
        e.preventDefault();
        const nome  = document.getElementById('reg-nome').value.trim();
        const email = document.getElementById('reg-email').value.trim().toLowerCase();
        const predioId = parseInt(document.getElementById('reg-predio').value);
        const turno = document.getElementById('reg-turno').value;
        if (!nome || !email || !predioId || !turno) { this.showToast('Preencha todos os campos'); return; }
        if (this.state.porteiros.find(p => p.email && p.email.toLowerCase() === email)) {
            this.showToast('Este e-mail já está cadastrado'); return;
        }
        const predio = this.state.predios.find(p => p.id === predioId);
        const novo = {
            id: Date.now(),
            nome, email, predioId,
            predioNome: predio.nome,
            turno,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=0a192f&color=d4af37&size=256&font-size=0.4&bold=true`
        };
        this.state.porteiros.push(novo);
        this.saveData();
        this.showToast('Conta criada com sucesso!');
        this.state.role = 'porteiro';
        document.getElementById('login-role-title').textContent = 'Acesso Porteiro';
        document.getElementById('login-role-subtitle').textContent = 'Informe seu e-mail de acesso';
        this.renderPorteiroLoginForm();
        this.showScreen('login');
        setTimeout(() => { const i = document.getElementById('email-porteiro-input'); if (i) i.value = email; }, 500);
    },

    login(userId) {
        const users = this.state.role === 'corretor' ? this.state.corretores : this.state.porteiros;
        this.state.user = users.find(u => u.id === userId);
        this.state.activeTab = 'home';
        
        // Atualiza header
        document.getElementById('header-avatar').src = this.state.user.avatar;
        document.getElementById('header-name').textContent = this.state.user.nome;
        document.getElementById('header-role').textContent = this.state.role === 'corretor' ? this.state.user.creci : this.state.user.predioNome;
        document.getElementById('menu-avatar').src = this.state.user.avatar;
        document.getElementById('menu-name').textContent = this.state.user.nome;
        document.getElementById('menu-detail').textContent = this.state.role === 'corretor' ? this.state.user.empresa : this.state.user.predioNome;
        
        this.renderBottomNav();
        this.renderContent();
        this.showScreen('main');
    },

    logout() {
        this.state.user = null;
        this.state.role = null;
        this.state.activeTab = 'home';
        this.closeMenu();
        this.showScreen('role');
    },

    toggleMenu() {
        document.getElementById('user-menu').classList.toggle('active');
        document.getElementById('overlay').classList.toggle('active');
    },

    closeMenu() {
        document.getElementById('user-menu').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    },

    renderBottomNav() {
        const nav = document.getElementById('bottom-nav');
        if (this.state.role === 'corretor') {
            nav.innerHTML = `
                <button class="bottom-nav-item ${this.state.activeTab === 'home' ? 'active' : ''}" onclick="app.setTab('home')">
                    <i class="fas fa-house"></i>
                    <span>Início</span>
                </button>
                <button class="bottom-nav-item ${this.state.activeTab === 'visitas' ? 'active' : ''}" onclick="app.setTab('visitas')">
                    <i class="fas fa-calendar-days"></i>
                    <span>Visitas</span>
                </button>
            `;
        } else {
            nav.innerHTML = `
                <button class="bottom-nav-item ${this.state.activeTab === 'home' ? 'active' : ''}" onclick="app.setTab('home')">
                    <i class="fas fa-house"></i>
                    <span>Início</span>
                </button>
                <button class="bottom-nav-item ${this.state.activeTab === 'validar' ? 'active' : ''}" onclick="app.setTab('validar')">
                    <i class="fas fa-shield-halved"></i>
                    <span>Liberar Entrada</span>
                </button>
                <button class="bottom-nav-item ${this.state.activeTab === 'historico' ? 'active' : ''}" onclick="app.setTab('historico')">
                    <i class="fas fa-clock-rotate-left"></i>
                    <span>Visitas</span>
                </button>
            `;
        }
    },

    setTab(tab, filter = null) {
        if (tab === 'nova-visita') {
            this.state.stepperStep = null;
            this.state.stepperData = {};
            this.state.blocosUnidades = [];
            this.state.visitantes = [];
            this.state.acompanhantes = [];
        }
        this.state.activeTab = tab;
        this.state.visitaFilter = filter;
        this.state.visitaPage = 0;
        this.state.homeHojePage = 0;
        this.renderBottomNav();
        this.renderContent();
    },

    goToPage(page) {
        this.state.visitaPage = page;
        this.renderContent();
    },

    goToHomeHojePage(page) {
        this.state.homeHojePage = page;
        this.renderContent();
    },

    renderContent() {
        const content = document.getElementById('app-content');
        
        if (this.state.role === 'corretor') {
            if (this.state.activeTab === 'home') this.renderCorretorHome(content);
            else if (this.state.activeTab === 'visitas') this.renderCorretorVisitas(content);
            else if (this.state.activeTab === 'nova-visita') this.renderNovaVisita(content);
            else if (this.state.activeTab === 'codigo') this.renderCodigo(content);
        } else {
            if (this.state.activeTab === 'home') this.renderPorteiroHome(content);
            else if (this.state.activeTab === 'validar') this.renderPorteiroValidar(content);
            else if (this.state.activeTab === 'historico') this.renderPorteiroHistorico(content);
            else if (this.state.activeTab === 'validar-resultado') this.renderValidarResultado(content);
        }
    },

    // ========================================
    // CORRETOR - HOME
    // ========================================
    renderCorretorHome(content) {
        const mv = this.state.visitas.filter(v => v.corretorId === this.state.user.id);
        const hoje = new Date().toISOString().split('T')[0];

        const counts = {
            hoje:      mv.filter(v => v.data === hoje && v.status === 'agendada').length,
            agendada:  mv.filter(v => v.status === 'agendada').length,
            andamento: mv.filter(v => v.status === 'andamento').length,
            cancelada: mv.filter(v => v.status === 'cancelada').length,
            recusada:  mv.filter(v => v.status === 'recusada').length,
            concluida: mv.filter(v => v.status === 'concluida').length
        };

        const card = (filter, icon, colorClass, label, count, stagger) => `
            <button class="stat-card stat-clickable animate-in stagger-${stagger}" onclick="app.setTab('visitas', '${filter}')">
                <div class="stat-icon ${colorClass}"><i class="fas ${icon}"></i></div>
                <div class="stat-value">${count}</div>
                <div class="stat-label">${label}</div>
                <i class="fas fa-chevron-right stat-arrow"></i>
            </button>`;

        content.innerHTML = `
            <div class="welcome-section animate-in">
                <h1>Olá, ${this.state.user.nome.split(' ')[0]}!</h1>
                <p>Toque em um card para ver as visitas</p>
            </div>

            <div class="stats-grid stats-grid-6">
                ${card('hoje',      'fa-calendar-day',    'blue',   'Visitas Hoje',  counts.hoje,      1)}
                ${card('agendada',  'fa-hourglass-half',  'gold',   'Agendadas',     counts.agendada,  2)}
                ${card('andamento', 'fa-person-walking',  'orange', 'Em Andamento',  counts.andamento, 3)}
                ${card('cancelada', 'fa-circle-xmark',    'red',    'Canceladas',    counts.cancelada, 4)}
                ${card('recusada',  'fa-ban',             'purple', 'Recusadas',     counts.recusada,  1)}
                ${card('concluida', 'fa-check-double',    'green',  'Concluídas',    counts.concluida, 2)}
            </div>

            <button class="btn-fab" onclick="app.setTab('nova-visita')" title="Nova Visita">
                <i class="fas fa-plus"></i>
            </button>
        `;
    },

    // ========================================
    // CORRETOR - VISITAS
    // ========================================
    renderCorretorVisitas(content) {
        const filter = this.state.visitaFilter;
        const hojeStr = new Date().toISOString().split('T')[0];

        let lista = this.state.visitas.filter(v => v.corretorId === this.state.user.id);

        if (filter === 'hoje') {
            lista = lista.filter(v => v.data === hojeStr && v.status === 'agendada');
        } else if (filter) {
            lista = lista.filter(v => v.status === filter);
        }

        const statusPriority = { andamento: 0, agendada: 1 };
        const descOrder = filter === 'cancelada' || filter === 'recusada' || filter === 'concluida';
        lista.sort((a, b) => {
            if (!filter) {
                const pa = statusPriority[a.status] ?? 2;
                const pb = statusPriority[b.status] ?? 2;
                if (pa !== pb) return pa - pb;
            }
            const da = new Date(a.data + 'T' + a.hora), db = new Date(b.data + 'T' + b.hora);
            return descOrder ? db - da : da - db;
        });

        const titulos = {
            hoje: 'Visitas de Hoje', agendada: 'Agendadas', andamento: 'Em Andamento',
            cancelada: 'Canceladas', recusada: 'Recusadas', concluida: 'Concluídas'
        };
        const isFiltered = filter !== null;
        const titulo = isFiltered ? (titulos[filter] || 'Visitas') : 'Todas as Visitas';

        const PER_PAGE = 5;
        const page = this.state.visitaPage || 0;
        const totalPages = Math.ceil(lista.length / PER_PAGE);
        const visivel = isFiltered ? lista : lista.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

        const paginacao = !isFiltered && totalPages > 1 ? `
            <div class="pagination animate-in">
                <button class="page-btn" onclick="app.goToPage(${page - 1})" ${page === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span class="page-info">Página ${page + 1} de ${totalPages}</span>
                <button class="page-btn" onclick="app.goToPage(${page + 1})" ${page >= totalPages - 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>` : '';

        const visitCards = visivel.map((v, i) => `
            <div class="card animate-in stagger-${(i % 4) + 1}">
                <div class="card-header">
                    <div>
                        <div class="card-title">${v.predioNome}</div>
                        <div class="card-subtitle">${v.predioEndereco}</div>
                    </div>
                    <span class="status-badge ${v.status}">
                        <i class="fas ${getStatusIcon(v.status)}"></i>
                        ${getStatusLabel(v.status)}
                    </span>
                </div>
                <div class="card-body">
                    <div class="card-row">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDateRelative(v.data)} às ${v.hora}</span>
                    </div>
                    <div class="card-row">
                        <i class="fas fa-hashtag"></i>
                        <span>Código: <strong style="color: var(--accent); letter-spacing: 2px;">${v.codigo}</strong></span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm" onclick="app.viewCodigo(${v.id})">
                        <i class="fas fa-eye"></i> Ver Visita
                    </button>
                    ${v.status === 'agendada' ? `
                        <button class="btn btn-secondary btn-sm" onclick="app.cancelarVisita(${v.id})">
                            <i class="fas fa-xmark"></i> Cancelar
                        </button>` : ''}
                </div>
            </div>`).join('');

        content.innerHTML = `
            <div class="welcome-section animate-in">
                ${isFiltered ? `
                    <button class="btn-back" onclick="app.setTab('home')" style="margin-bottom: 1rem;">
                        <i class="fas fa-arrow-left"></i>
                    </button>` : ''}
                <h1>${titulo}</h1>
                <p>${lista.length} visita${lista.length !== 1 ? 's' : ''}</p>
            </div>

            ${visivel.length === 0 ? `
                <div class="empty-state animate-in">
                    <i class="fas fa-calendar-plus"></i>
                    <h3>Nenhuma visita</h3>
                    <p>${isFiltered ? 'Nenhuma visita com este status' : 'Você não possui visitas cadastradas'}</p>
                    ${!isFiltered ? `<button class="btn btn-primary" style="width:auto;padding:.75rem 2rem;" onclick="app.setTab('nova-visita')">
                        <i class="fas fa-plus"></i> Agendar Visita
                    </button>` : ''}
                </div>
            ` : visitCards + paginacao}

            <button class="btn-fab" onclick="app.setTab('nova-visita')" title="Nova Visita">
                <i class="fas fa-plus"></i>
            </button>
        `;
    },

    // ========================================
    // CORRETOR - HISTÓRICO
    // ========================================
    renderCorretorHistorico(content) {
        const historico = this.state.visitas
            .filter(v => v.corretorId === this.state.user.id && (v.status === 'concluida' || v.status === 'cancelada'))
            .sort((a, b) => new Date(b.data + 'T' + b.hora) - new Date(a.data + 'T' + a.hora));

        content.innerHTML = `
            <div class="welcome-section animate-in">
                <h1>Histórico</h1>
                <p>Suas visitas concluídas e canceladas</p>
            </div>

            ${historico.length === 0 ? `
                <div class="empty-state animate-in">
                    <i class="fas fa-clock-rotate-left"></i>
                    <h3>Sem histórico</h3>
                    <p>Você ainda não possui visitas finalizadas</p>
                </div>
            ` : historico.map((v, i) => `
                <div class="card animate-in stagger-${(i % 4) + 1}">
                    <div class="card-header">
                        <div>
                            <div class="card-title">${v.predioNome}</div>
                            <div class="card-subtitle">${v.predioEndereco}</div>
                        </div>
                        <span class="status-badge ${v.status}">
                            <i class="fas ${getStatusIcon(v.status)}"></i>
                            ${getStatusLabel(v.status)}
                        </span>
                    </div>
                    <div class="card-body">
                        <div class="card-row">
                            <i class="fas fa-calendar"></i>
                            <span>${formatDate(v.data)} às ${v.hora}</span>
                        </div>
                        ${v.validadoPor ? `
                            <div class="card-row">
                                <i class="fas fa-user-check"></i>
                                <span>Validado por: ${v.validadoPor}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        `;
    },

    // ========================================
    // CORRETOR - NOVA VISITA
    // ========================================
    renderNovaVisita(content) {
        if (!this.state.stepperStep) this.state.stepperStep = 1;
        const step = this.state.stepperStep;
        const today = new Date().toISOString().split('T')[0];
        const maxDate = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

        const stepDefs = [
            { label: 'Local',       icon: 'fa-building' },
            { label: 'Data e Hora', icon: 'fa-calendar-days' },
            { label: 'Quem vai',    icon: 'fa-users' }
        ];
        const stepperHTML = `
            <div class="stepper-header animate-in">
                ${stepDefs.map((s, i) => {
                    const n = i + 1;
                    const cls = n < step ? 'completed' : n === step ? 'active' : '';
                    return `
                        ${i > 0 ? `<div class="stepper-line${n <= step ? ' done' : ''}"></div>` : ''}
                        <div class="stepper-step ${cls}">
                            <div class="stepper-circle">${n < step ? '<i class="fas fa-check"></i>' : n}</div>
                            <span class="stepper-label">${s.label}</span>
                        </div>`;
                }).join('')}
            </div>`;

        let stepContent = '';
        if (step === 1) {
            stepContent = `
                <div class="form-group">
                    <label class="form-label">Prédio / Condomínio</label>
                    <div class="predio-search-wrapper">
                        <div class="predio-search-input-wrap">
                            <i class="fas fa-magnifying-glass predio-search-icon"></i>
                            <input type="text" class="form-control predio-search-input" id="visita-predio-search"
                                placeholder="Buscar pelo nome ou endereço..." autocomplete="off"
                                oninput="app.filtrarPredios(this.value)" onfocus="app.filtrarPredios(this.value)">
                            <button type="button" class="predio-clear-btn" id="predio-clear" onclick="app.limparPredioBusca()" style="display:none;">
                                <i class="fas fa-xmark"></i>
                            </button>
                        </div>
                        <input type="hidden" id="visita-predio">
                        <div class="predio-dropdown" id="predio-dropdown"></div>
                    </div>
                </div>
                <div class="blocos-section" id="blocos-torres-section" style="display:none;">
                    <div class="blocos-section-title">
                        <i class="fas fa-building-columns"></i>
                        Blocos / Torres
                    </div>
                    <div class="blocos-input-row">
                        <select class="form-control blocos-select" id="bloco-select">
                            <option value="">Torre / Bloco *</option>
                        </select>
                        <input type="text" class="form-control blocos-unidade-input" id="bloco-unidade"
                            placeholder="ex.: apto 45, sala 10"
                            onkeypress="if(event.key==='Enter'){event.preventDefault();app.adicionarBlocoUnidade();}">
                        <button type="button" class="btn-add-bloco" onclick="app.adicionarBlocoUnidade()" title="Adicionar bloco/unidade">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                    <p class="blocos-hint">
                        <i class="fas fa-circle-info"></i>
                        Selecione torre/bloco, informe a unidade e clique em
                        <span class="hint-check-icon"><i class="fas fa-check"></i></span>
                        para adicionar
                    </p>
                    <div id="blocos-lista" class="blocos-lista"></div>
                </div>
                <div class="stepper-nav">
                    <button type="button" class="btn btn-primary" onclick="app.stepperNext()" style="flex:1;">
                        Próximo <i class="fas fa-arrow-right"></i>
                    </button>
                </div>`;
        } else if (step === 2) {
            stepContent = `
                <div class="form-group">
                    <label class="form-label">Data da Visita</label>
                    <input type="date" class="form-control" id="visita-data" min="${today}" max="${maxDate}"
                        onchange="app.atualizarHorariosStep2()">
                </div>
                <div class="form-group">
                    <label class="form-label">Horário</label>
                    <select class="form-control" id="visita-hora">
                        <option value="">Selecione primeiro a data</option>
                    </select>
                    <div id="janela-horario-info"></div>
                </div>
                <div class="stepper-nav">
                    <button type="button" class="btn btn-secondary" onclick="app.stepperPrev()" style="flex:1;">
                        <i class="fas fa-arrow-left"></i> Voltar
                    </button>
                    <button type="button" class="btn btn-primary" onclick="app.stepperNext()" style="flex:1;">
                        Próximo <i class="fas fa-arrow-right"></i>
                    </button>
                </div>`;
        } else {
            const obsVal = (this.state.stepperData.obs || '').replace(/"/g, '&quot;');
            stepContent = `
                <div class="quem-visita-section">
                    <h3 class="quem-visita-title"><i class="fas fa-users"></i> Quem irá na visita?</h3>
                    <p class="quem-visita-desc">Desmarque a opção caso queira incluir documentos e nomes de outras pessoas.</p>
                    <label class="checkbox-somente-eu">
                        <input type="checkbox" id="somente-eu" onchange="app.toggleSomenteEu()">
                        <span class="checkbox-box"></span>
                        <span>Somente eu</span>
                    </label>
                    <div id="visitantes-section" class="quem-sub-section">
                        <div class="quem-sub-header">
                            <h4 class="quem-sub-title"><i class="fas fa-user-group"></i> Visitantes <span class="quem-sub-badge">Clientes</span></h4>
                            <p class="quem-sub-desc">Adicione os dados de <strong>CLIENTES</strong> que irão acompanhar na visita.</p>
                        </div>
                        <div class="pessoa-input-row">
                            <input type="text" class="form-control pessoa-cpf-input" id="visitante-cpf" placeholder="CPF *" maxlength="14" inputmode="numeric"
                                oninput="app.formatCPF(this)"
                                onkeypress="if(event.key==='Enter'){event.preventDefault();app.adicionarVisitante();}">
                            <input type="text" class="form-control pessoa-nome-input" id="visitante-nome" placeholder="Nome Completo"
                                onkeypress="if(event.key==='Enter'){event.preventDefault();app.adicionarVisitante();}">
                            <button type="button" class="btn-add-pessoa" onclick="app.adicionarVisitante()" title="Adicionar visitante">
                                <i class="fas fa-check"></i>
                            </button>
                        </div>
                        <div id="visitantes-lista" class="pessoas-lista"></div>
                    </div>
                    <div id="acompanhantes-section" class="quem-sub-section">
                        <div class="quem-sub-header">
                            <h4 class="quem-sub-title"><i class="fas fa-id-badge"></i> Acompanhantes <span class="quem-sub-badge acomp">Corretores / Estagiários</span></h4>
                            <p class="quem-sub-desc">Adicione os dados de <strong>CORRETORES</strong> ou <strong>ESTAGIÁRIOS(AS)</strong> que irão acompanhar.</p>
                        </div>
                        <div class="pessoa-input-row">
                            <input type="text" class="form-control pessoa-cpf-input" id="acompanhante-cpf" placeholder="CPF *" maxlength="14" inputmode="numeric"
                                oninput="app.formatCPF(this)"
                                onkeypress="if(event.key==='Enter'){event.preventDefault();app.adicionarAcompanhante();}">
                            <input type="text" class="form-control pessoa-nome-input" id="acompanhante-nome" placeholder="Nome Completo"
                                onkeypress="if(event.key==='Enter'){event.preventDefault();app.adicionarAcompanhante();}">
                            <button type="button" class="btn-add-pessoa" onclick="app.adicionarAcompanhante()" title="Adicionar acompanhante">
                                <i class="fas fa-check"></i>
                            </button>
                        </div>
                        <div id="acompanhantes-lista" class="pessoas-lista"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Observações (opcional)</label>
                    <input type="text" class="form-control" id="visita-obs" placeholder="Ex: Visita ao apartamento 42" value="${obsVal}">
                </div>
                <div class="stepper-nav">
                    <button type="button" class="btn btn-secondary" onclick="app.stepperPrev()" style="flex:1;">
                        <i class="fas fa-arrow-left"></i> Voltar
                    </button>
                    <button type="button" class="btn btn-primary" onclick="app.submitVisita()" style="flex:1;">
                        <i class="fas fa-calendar-plus"></i> Agendar
                    </button>
                </div>`;
        }

        content.innerHTML = `
            <div class="welcome-section animate-in">
                <button class="btn-back" onclick="app.cancelarNovaVisita()" style="margin-bottom: 1rem;">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>Agendar Visita</h1>
            </div>
            ${stepperHTML}
            <div class="animate-in stagger-1">${stepContent}</div>
        `;

        if (step === 1 && this.state.stepperData.predioId) {
            const predio = this.state.predios.find(p => p.id === this.state.stepperData.predioId);
            if (predio) {
                const si = document.getElementById('visita-predio-search');
                const pi = document.getElementById('visita-predio');
                const cb = document.getElementById('predio-clear');
                if (si) si.value = `${predio.nome} — ${predio.endereco}`;
                if (pi) pi.value = predio.id;
                if (cb) cb.style.display = 'flex';
                this.popularBlocosSelect(predio);
            }
        }
        if (step === 2) {
            const dataEl = document.getElementById('visita-data');
            if (dataEl && this.state.stepperData.data) {
                dataEl.value = this.state.stepperData.data;
                this.atualizarHorariosStep2();
                if (this.state.stepperData.hora) {
                    setTimeout(() => {
                        const sel = document.getElementById('visita-hora');
                        if (sel) sel.value = this.state.stepperData.hora;
                    }, 0);
                }
            }
        }
        if (step === 3) {
            this.renderPessoasLista('visitantes-lista', this.state.visitantes, 'removerVisitante');
            this.renderPessoasLista('acompanhantes-lista', this.state.acompanhantes, 'removerAcompanhante');
            if (this.state.stepperData.somenteEu === true) {
                const el = document.getElementById('somente-eu');
                if (el) { el.checked = true; this.toggleSomenteEu(); }
            }
        }
    },

    cancelarNovaVisita() {
        this.state.stepperStep = null;
        this.state.stepperData = {};
        this.setTab('home');
    },

    stepperNext() {
        const step = this.state.stepperStep;
        if (step === 1) {
            const predioId = parseInt(document.getElementById('visita-predio')?.value);
            if (!predioId) { this.showToast('Selecione um prédio/condomínio'); return; }
            const predio = this.state.predios.find(p => p.id === predioId);
            if (predio?.blocos?.length > 0 && this.state.blocosUnidades.length === 0) {
                this.showToast('Adicione pelo menos uma torre/bloco antes de prosseguir');
                return;
            }
            this.state.stepperData.predioId = predioId;
            this.state.stepperStep = 2;
            this.renderNovaVisita(document.getElementById('app-content'));
        } else if (step === 2) {
            const data = document.getElementById('visita-data')?.value;
            if (!data) { this.showToast('Selecione a data da visita'); return; }
            const hora = document.getElementById('visita-hora')?.value;
            if (!hora) { this.showToast('Selecione o horário da visita'); return; }

            const predioId = this.state.stepperData.predioId;
            const predio = this.state.predios.find(p => p.id === predioId);
            if (this.state.blocosUnidades.length > 0 && predio) {
                const [ano, mes, dia] = data.split('-').map(Number);
                const diaSemana = new Date(ano, mes - 1, dia).getDay();
                const nomeDiaSemana = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'][diaSemana];
                const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
                const visitaMin = toMin(hora);
                for (const item of this.state.blocosUnidades) {
                    const bloco = predio.blocos.find(b => b.nome === item.bloco);
                    if (!bloco) continue;
                    const janela = bloco.horarios.find(h => h.diasNum.includes(diaSemana));
                    if (!janela) {
                        const disponiveis = bloco.horarios.map(h => `${h.dias}: ${h.abertura} – ${h.fechamento}`).join('<br>');
                        this.openModal('Bloco indisponível neste dia', `
                            <div class="aviso-horario">
                                <div class="aviso-icone fechado"><i class="fas fa-ban"></i></div>
                                <p class="aviso-titulo">Visita não permitida</p>
                                <p class="aviso-desc">A <strong>${item.bloco}</strong> não aceita visitas às <strong>${nomeDiaSemana}s</strong>.</p>
                                <div class="aviso-janela">
                                    <p class="aviso-janela-label"><i class="fas fa-calendar-check"></i> Dias disponíveis:</p>
                                    <div class="aviso-janela-lista">${disponiveis}</div>
                                </div>
                                <p class="aviso-sugestao"><i class="fas fa-lightbulb"></i> Escolha uma data em um dia disponível ou selecione outro bloco.</p>
                            </div>`);
                        return;
                    }
                    if (visitaMin < toMin(janela.abertura) || visitaMin > toMin(janela.fechamento)) {
                        this.openModal('Horário fora da janela permitida', `
                            <div class="aviso-horario">
                                <div class="aviso-icone"><i class="fas fa-clock-rotate-left"></i></div>
                                <p class="aviso-titulo">Horário incompatível</p>
                                <p class="aviso-desc">O horário <strong class="aviso-hora">${hora}</strong> não está dentro da janela aceita pela <strong>${item.bloco}</strong>.</p>
                                <div class="aviso-janela">
                                    <p class="aviso-janela-label"><i class="fas fa-calendar-day"></i> Janela para <strong>${janela.dias}</strong>:</p>
                                    <div class="aviso-range">
                                        <span class="aviso-time open"><i class="fas fa-door-open"></i> ${janela.abertura}</span>
                                        <i class="fas fa-arrows-left-right" style="color:var(--text-secondary);font-size:.75rem;"></i>
                                        <span class="aviso-time close"><i class="fas fa-door-closed"></i> ${janela.fechamento}</span>
                                    </div>
                                </div>
                                <p class="aviso-sugestao"><i class="fas fa-lightbulb"></i> Ajuste o horário para dentro desta janela e tente novamente.</p>
                            </div>`);
                        return;
                    }
                }
            }
            this.state.stepperData.data = data;
            this.state.stepperData.hora = hora;
            this.state.stepperStep = 3;
            this.renderNovaVisita(document.getElementById('app-content'));
        }
    },

    stepperPrev() {
        const step = this.state.stepperStep;
        if (step === 3) {
            this.state.stepperData.somenteEu = document.getElementById('somente-eu')?.checked ?? false;
            this.state.stepperData.obs = document.getElementById('visita-obs')?.value.trim() || '';
        }
        if (step > 1) {
            this.state.stepperStep = step - 1;
            this.renderNovaVisita(document.getElementById('app-content'));
        }
    },

    atualizarHorariosStep2() {
        const dataEl = document.getElementById('visita-data');
        const horaSel = document.getElementById('visita-hora');
        const janelaInfo = document.getElementById('janela-horario-info');
        if (!dataEl || !horaSel) return;
        const data = dataEl.value;
        if (!data) return;

        const [ano, mes, dia] = data.split('-').map(Number);
        const diaSemana = new Date(ano, mes - 1, dia).getDay();
        const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
        const toTime = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

        let aberturaMin = 8 * 60;
        let fechamentoMin = 18 * 60;
        let janelaHTML = '';

        const predioId = this.state.stepperData.predioId;
        const predio = this.state.predios.find(p => p.id === predioId);
        if (predio && this.state.blocosUnidades.length > 0) {
            for (const item of this.state.blocosUnidades) {
                const bloco = predio.blocos.find(b => b.nome === item.bloco);
                if (!bloco) continue;
                const janela = bloco.horarios.find(h => h.diasNum.includes(diaSemana));
                if (!janela) {
                    const nomeDias = ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'];
                    if (janelaInfo) janelaInfo.innerHTML = `<div class="janela-aviso-fechado"><i class="fas fa-ban"></i> ${item.bloco} fechado neste dia da semana</div>`;
                    horaSel.innerHTML = '<option value="">Não disponível neste dia</option>';
                    return;
                }
                aberturaMin = Math.max(aberturaMin, toMin(janela.abertura));
                fechamentoMin = Math.min(fechamentoMin, toMin(janela.fechamento));
            }
            janelaHTML = `<div class="janela-info-box"><i class="fas fa-clock"></i> Janela permitida: <strong>${toTime(aberturaMin)}</strong> – <strong>${toTime(fechamentoMin)}</strong></div>`;
        }

        const slots = [];
        for (let m = aberturaMin; m <= fechamentoMin; m += 30) slots.push(toTime(m));
        horaSel.innerHTML = '<option value="">Selecione o horário</option>' +
            slots.map(h => `<option value="${h}">${h}</option>`).join('');
        if (janelaInfo) janelaInfo.innerHTML = janelaHTML;
    },

    filtrarPredios(query) {
        const dropdown = document.getElementById('predio-dropdown');
        const clearBtn = document.getElementById('predio-clear');
        if (!dropdown) return;

        if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';

        const q = query.toLowerCase().trim();
        const todos = this.state.predios;
        const filtrados = q
            ? todos.filter(p =>
                p.nome.toLowerCase().includes(q) ||
                p.endereco.toLowerCase().includes(q) ||
                (p.bairro && p.bairro.toLowerCase().includes(q))
              )
            : todos.slice(0, 8);

        const visiveis = filtrados.slice(0, 8);
        const extras = filtrados.length - visiveis.length;

        if (visiveis.length === 0) {
            dropdown.innerHTML = `
                <div class="predio-dropdown-empty">
                    <i class="fas fa-building-circle-xmark"></i>
                    <span>Nenhum condomínio encontrado</span>
                </div>`;
        } else {
            const highlight = (text) => q
                ? text.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                    '<mark>$1</mark>')
                : text;

            dropdown.innerHTML = visiveis.map(p => `
                <div class="predio-dropdown-item" onclick="app.selecionarPredio(${p.id})">
                    <div class="predio-item-icon"><i class="fas fa-building"></i></div>
                    <div class="predio-item-info">
                        <span class="predio-item-nome">${highlight(p.nome)}</span>
                        <span class="predio-item-end">${highlight(p.endereco)}${p.bairro ? ' — ' + p.bairro : ''}</span>
                    </div>
                </div>`).join('')
                + (extras > 0 ? `
                <div class="predio-dropdown-more">
                    <i class="fas fa-ellipsis"></i> Mais ${extras} resultado${extras > 1 ? 's' : ''} — refine a busca
                </div>` : '');
        }

        dropdown.classList.add('active');

        const closeHandler = (e) => {
            if (!e.target.closest('.predio-search-wrapper')) {
                dropdown.classList.remove('active');
                document.removeEventListener('click', closeHandler);
            }
        };
        setTimeout(() => document.addEventListener('click', closeHandler), 50);
    },

    selecionarPredio(id) {
        const predio = this.state.predios.find(p => p.id === id);
        if (!predio) return;
        document.getElementById('visita-predio-search').value = `${predio.nome} — ${predio.endereco}`;
        document.getElementById('visita-predio').value = id;
        document.getElementById('predio-dropdown').classList.remove('active');
        const cb = document.getElementById('predio-clear');
        if (cb) cb.style.display = 'flex';
        this.state.blocosUnidades = [];
        this.popularBlocosSelect(predio);
    },

    limparPredioBusca() {
        document.getElementById('visita-predio-search').value = '';
        document.getElementById('visita-predio').value = '';
        document.getElementById('predio-dropdown').classList.remove('active');
        const cb = document.getElementById('predio-clear');
        if (cb) cb.style.display = 'none';
        const sec = document.getElementById('blocos-torres-section');
        if (sec) sec.style.display = 'none';
        this.state.blocosUnidades = [];
        document.getElementById('visita-predio-search').focus();
    },

    popularBlocosSelect(predio) {
        const section = document.getElementById('blocos-torres-section');
        if (!section) return;
        if (!predio.blocos || predio.blocos.length === 0) {
            section.style.display = 'none';
            return;
        }
        const select = document.getElementById('bloco-select');
        if (select) {
            select.innerHTML = '<option value="">Torre / Bloco *</option>' +
                predio.blocos.map(b => `<option value="${b.nome}">${b.nome}</option>`).join('');
        }
        this.renderBlocosLista();
        section.style.display = 'block';
    },

    adicionarBlocoUnidade() {
        const blocoEl = document.getElementById('bloco-select');
        const unidadeEl = document.getElementById('bloco-unidade');
        const bloco = blocoEl ? blocoEl.value : '';
        const unidade = unidadeEl ? unidadeEl.value.trim() : '';
        if (!bloco) { this.showToast('Selecione a torre/bloco'); return; }
        if (!unidade) { this.showToast('Informe a unidade'); return; }
        this.state.blocosUnidades.push({ bloco, unidade });
        if (unidadeEl) unidadeEl.value = '';
        this.renderBlocosLista();
        if (unidadeEl) unidadeEl.focus();
    },

    removerBlocoUnidade(idx) {
        this.state.blocosUnidades.splice(idx, 1);
        this.renderBlocosLista();
    },

    renderBlocosLista() {
        const container = document.getElementById('blocos-lista');
        if (!container) return;
        if (this.state.blocosUnidades.length === 0) {
            container.innerHTML = '';
            return;
        }
        container.innerHTML = this.state.blocosUnidades.map((item, i) => `
            <div class="bloco-item">
                <span class="bloco-num">${i + 1}</span>
                <div class="bloco-info">
                    <div class="bloco-top-row">
                        <span class="bloco-nome">${item.bloco}</span>
                        <button type="button" class="btn-ver-horarios" onclick="app.verHorariosBloco('${item.bloco}')">
                            <i class="fas fa-clock"></i> Ver horários
                        </button>
                    </div>
                    <span class="bloco-unidade-text">${item.unidade}</span>
                </div>
                <button type="button" class="btn-remove-bloco" onclick="app.removerBlocoUnidade(${i})" title="Remover">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
        `).join('');
    },

    verHorariosBloco(blocoNome) {
        const predioId = parseInt(document.getElementById('visita-predio').value);
        const predio = this.state.predios.find(p => p.id === predioId);
        if (!predio) return;
        const bloco = predio.blocos.find(b => b.nome === blocoNome);
        if (!bloco) return;

        const diaIcone = (diasNum) => {
            if (diasNum.includes(0)) return 'fa-sun';
            if (diasNum.includes(6) && !diasNum.includes(1)) return 'fa-umbrella-beach';
            return 'fa-briefcase';
        };

        const entradasHTML = bloco.horarios.map(h => `
            <div class="horario-entry">
                <div class="horario-dias">
                    <i class="fas ${diaIcone(h.diasNum)}"></i>
                    <span>${h.dias}</span>
                </div>
                <div class="horario-range">
                    <span class="h-time h-open"><i class="fas fa-door-open"></i> ${h.abertura}</span>
                    <i class="fas fa-arrow-right h-arrow"></i>
                    <span class="h-time h-close"><i class="fas fa-door-closed"></i> ${h.fechamento}</span>
                </div>
            </div>
        `).join('');

        const todosDias = [1,2,3,4,5,6,0];
        const diasCobertos = bloco.horarios.flatMap(h => h.diasNum);
        const diasFechados = todosDias.filter(d => !diasCobertos.includes(d));
        const nomeDias = ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'];
        const fechadoHTML = diasFechados.length > 0 ? `
            <div class="horario-fechado">
                <i class="fas fa-lock"></i>
                Fechado: ${diasFechados.map(d => nomeDias[d]).join(', ')}
            </div>` : '';

        this.openModal(`Horários — ${blocoNome}`, `
            <div class="horarios-modal-content">
                <div class="horarios-bloco-header">
                    <div class="horarios-bloco-icon"><i class="fas fa-building-columns"></i></div>
                    <div>
                        <div class="horarios-bloco-nome">${blocoNome}</div>
                        <div class="horarios-predio-nome">${predio.nome}</div>
                    </div>
                </div>
                <p class="horarios-label">
                    <i class="fas fa-calendar-check"></i>
                    Horários Permitidos
                </p>
                <div class="horarios-entries">${entradasHTML}</div>
                ${fechadoHTML}
                <div class="horarios-tip">
                    <i class="fas fa-circle-info"></i>
                    Certifique-se de que o horário da visita está dentro desta janela.
                    Agendamentos fora do período serão recusados pela portaria.
                </div>
            </div>
        `);
    },

    toggleSomenteEu() {
        const checked = document.getElementById('somente-eu').checked;
        const vis   = document.getElementById('visitantes-section');
        const acomp = document.getElementById('acompanhantes-section');
        if (vis)   vis.style.display   = checked ? 'none' : 'block';
        if (acomp) acomp.style.display = checked ? 'none' : 'block';
        if (checked) {
            this.state.visitantes    = [];
            this.state.acompanhantes = [];
        }
    },

    formatCPF(input) {
        let v = input.value.replace(/\D/g, '').slice(0, 11);
        if      (v.length > 9) v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})$/, '$1.$2.$3-$4');
        else if (v.length > 6) v = v.replace(/^(\d{3})(\d{3})(\d{0,3})$/, '$1.$2.$3');
        else if (v.length > 3) v = v.replace(/^(\d{3})(\d{0,3})$/, '$1.$2');
        input.value = v;
        input.classList.remove('input-error');
    },

    adicionarVisitante() {
        const cpfEl  = document.getElementById('visitante-cpf');
        const nomeEl = document.getElementById('visitante-nome');
        const cpf  = cpfEl  ? cpfEl.value.trim()  : '';
        const nome = nomeEl ? nomeEl.value.trim() : '';
        if (cpf.replace(/\D/g,'').length < 11) {
            this.showToast('Informe um CPF válido (11 dígitos)');
            if (cpfEl) { cpfEl.classList.add('input-error'); cpfEl.focus(); } return;
        }
        if (!nome) {
            this.showToast('Informe o nome completo');
            if (nomeEl) { nomeEl.classList.add('input-error'); nomeEl.focus(); } return;
        }
        this.state.visitantes.push({ cpf, nome });
        if (cpfEl)  cpfEl.value  = '';
        if (nomeEl) nomeEl.value = '';
        this.renderPessoasLista('visitantes-lista', this.state.visitantes, 'removerVisitante');
        if (cpfEl) cpfEl.focus();
    },

    removerVisitante(idx) {
        this.state.visitantes.splice(idx, 1);
        this.renderPessoasLista('visitantes-lista', this.state.visitantes, 'removerVisitante');
    },

    adicionarAcompanhante() {
        const cpfEl  = document.getElementById('acompanhante-cpf');
        const nomeEl = document.getElementById('acompanhante-nome');
        const cpf  = cpfEl  ? cpfEl.value.trim()  : '';
        const nome = nomeEl ? nomeEl.value.trim() : '';
        if (cpf.replace(/\D/g,'').length < 11) {
            this.showToast('Informe um CPF válido (11 dígitos)');
            if (cpfEl) { cpfEl.classList.add('input-error'); cpfEl.focus(); } return;
        }
        if (!nome) {
            this.showToast('Informe o nome completo');
            if (nomeEl) { nomeEl.classList.add('input-error'); nomeEl.focus(); } return;
        }
        this.state.acompanhantes.push({ cpf, nome });
        if (cpfEl)  cpfEl.value  = '';
        if (nomeEl) nomeEl.value = '';
        this.renderPessoasLista('acompanhantes-lista', this.state.acompanhantes, 'removerAcompanhante');
        if (cpfEl) cpfEl.focus();
    },

    removerAcompanhante(idx) {
        this.state.acompanhantes.splice(idx, 1);
        this.renderPessoasLista('acompanhantes-lista', this.state.acompanhantes, 'removerAcompanhante');
    },

    renderPessoasLista(containerId, lista, removeFn) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (lista.length === 0) { container.innerHTML = ''; return; }
        container.innerHTML = lista.map((p, i) => `
            <div class="pessoa-item">
                <span class="pessoa-num">${i + 1}</span>
                <div class="pessoa-info">
                    <span class="pessoa-cpf-text">${p.cpf}</span>
                    <span class="pessoa-nome-text">${p.nome}</span>
                </div>
                <button type="button" class="btn-remove-pessoa" onclick="app.${removeFn}(${i})" title="Remover">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
        `).join('');
    },

    gerarHorarios() {
        const horarios = [];
        for (let h = 8; h <= 18; h++) {
            horarios.push(`${h.toString().padStart(2, '0')}:00`);
            if (h < 18) horarios.push(`${h.toString().padStart(2, '0')}:30`);
        }
        return horarios;
    },

    submitVisita() {
        const somenteEu = document.getElementById('somente-eu')?.checked ?? false;
        if (!somenteEu && this.state.visitantes.length === 0 && this.state.acompanhantes.length === 0) {
            this.showToast('Adicione pelo menos um visitante ou acompanhante, ou marque "Somente eu"');
            return;
        }

        const { predioId, data, hora } = this.state.stepperData;
        const predio = this.state.predios.find(p => p.id === predioId);
        const obs = document.getElementById('visita-obs')?.value.trim() || '';
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();

        const novaVisita = {
            id: Date.now(),
            corretorId: this.state.user.id,
            corretorNome: this.state.user.nome,
            corretorAvatar: this.state.user.avatar,
            corretorCreci: this.state.user.creci,
            corretorEmpresa: this.state.user.empresa,
            corretorTelefone: this.state.user.telefone,
            predioId: predio.id,
            predioNome: predio.nome,
            predioEndereco: predio.endereco,
            data,
            hora,
            obs: obs || null,
            blocosUnidades: [...this.state.blocosUnidades],
            somenteEu,
            visitantes: somenteEu ? [] : [...this.state.visitantes],
            acompanhantes: somenteEu ? [] : [...this.state.acompanhantes],
            corretorEmail: this.state.user.email || '',
            codigo,
            status: 'agendada',
            createdAt: new Date().toISOString(),
            historico: [{
                dataHora: new Date().toISOString(),
                usuario: this.state.user.email || this.state.user.nome,
                status: 'agendada'
            }]
        };

        this.state.visitas.push(novaVisita);
        this.saveData();

        this.state.stepperStep = null;
        this.state.stepperData = {};
        this.state.tempVisita = novaVisita;
        this.setTab('codigo');
        this.showToast('Visita agendada com sucesso!');
    },

    viewCodigo(visitaId) {
        const visita = this.state.visitas.find(v => v.id === visitaId);
        this.state.tempVisita = visita;
        this.state.cameFrom = { tab: this.state.activeTab, filter: this.state.visitaFilter };
        this.setTab('codigo');
    },

    goBackFromCodigo() {
        const { tab, filter } = this.state.cameFrom || { tab: 'home', filter: null };
        this.setTab(tab, filter);
    },

    goBackFromValidarResultado() {
        const { tab, filter } = this.state.cameFrom || { tab: 'validar', filter: null };
        this.setTab(tab, filter);
    },

    renderCodigo(content) {
        const v = this.state.tempVisita;
        if (!v) return this.setTab('home');

        const fotoHTML = v.corretorAvatar
            ? `<img
                src="${v.corretorAvatar}"
                alt="${v.corretorNome}"
                class="visit-photo"
                onerror="this.style.display='none';document.getElementById('sem-foto').style.display='flex';"
               >
               <div class="visit-no-photo" id="sem-foto" style="display:none;">
                   <i class="fas fa-user-slash"></i>
                   <span>Sem Foto</span>
               </div>`
            : `<div class="visit-no-photo" id="sem-foto">
                   <i class="fas fa-user-slash"></i>
                   <span>Sem Foto</span>
               </div>`;

        content.innerHTML = `
            <div class="visit-detail-header animate-in">
                <button class="btn-back" onclick="app.goBackFromCodigo()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div style="flex:1; text-align:center;">
                    <h2 style="font-size:1.2rem; font-weight:600; color:var(--white);">Detalhes da Visita</h2>
                </div>
                <span class="status-badge ${v.status}" style="flex-shrink:0;">
                    <i class="fas ${getStatusIcon(v.status)}"></i>
                    ${getStatusLabel(v.status)}
                </span>
            </div>

            <div class="visit-photo-section animate-in stagger-1">
                ${fotoHTML}
                <h3 class="visit-photo-name">${v.corretorNome}</h3>
                <span class="creci">${v.corretorCreci}</span>
                <span class="visit-empresa">${v.corretorEmpresa}</span>
            </div>

            <div class="card animate-in stagger-2">
                <div class="card-body">
                    <div class="card-row">
                        <i class="fas fa-building"></i>
                        <span>${v.predioNome} — ${v.predioEndereco}</span>
                    </div>
                    <div class="card-row">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDateRelative(v.data)} às ${v.hora}</span>
                    </div>
                    <div class="card-row">
                        <i class="fas fa-phone"></i>
                        <span>${v.corretorTelefone}</span>
                    </div>
                </div>
            </div>

            <div class="code-display animate-in stagger-3">
                <div class="code-value">${v.codigo}</div>
                <div class="code-label">Código de acesso</div>
            </div>

            <div class="animate-in stagger-4" style="text-align:center; margin-bottom:1.5rem;">
                <div class="qr-placeholder" style="margin: 0 auto 0.75rem;"></div>
                <p style="color:var(--text-secondary); font-size:0.8rem; margin-bottom:1.25rem;">
                    <i class="fas fa-qrcode"></i> QR Code para leitura
                </p>
                <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;">
                    ${v.status === 'agendada' ? `<button class="btn btn-secondary" onclick="app.shareCodigo()">
                        <i class="fas fa-share-nodes"></i> Compartilhar Código
                    </button>` : ''}
                    <button class="btn btn-secondary" onclick="app.verHistoricoVisita(${v.id})">
                        <i class="fas fa-clock-rotate-left"></i> Histórico
                    </button>
                </div>
                ${!['andamento', 'concluida', 'cancelada', 'recusada'].includes(v.status) ? `
                <div style="margin-top:0.75rem;">
                    <button class="btn btn-danger" style="width:100%;" onclick="app.reportarRecusa(${v.id})">
                        <i class="fas fa-triangle-exclamation"></i> Recusaram minha visita
                    </button>
                </div>` : ''}
            </div>
        `;
    },

    reportarRecusa(visitaId) {
        this.openModal('Recusaram minha visita', `
            <div class="recusa-modal">
                <div class="recusa-icon">
                    <i class="fas fa-triangle-exclamation"></i>
                </div>
                <p class="recusa-desc">
                    Descreva o que aconteceu para que possamos registrar a ocorrência.
                    Sua observação ficará vinculada a esta visita.
                </p>
                <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Observações</label>
                    <textarea
                        id="recusa-obs-input"
                        class="form-control"
                        rows="4"
                        placeholder="Ex.: A portaria negou minha entrada sem justificativa, mesmo com código válido..."
                        style="resize:vertical; min-height:100px;"
                    ></textarea>
                </div>
                <button class="btn btn-danger" style="width:100%;" onclick="app.submitRecusa(${visitaId})">
                    <i class="fas fa-paper-plane"></i> Enviar Relato
                </button>
            </div>
        `);
        setTimeout(() => document.getElementById('recusa-obs-input')?.focus(), 200);
    },

    submitRecusa(visitaId) {
        const obs = document.getElementById('recusa-obs-input')?.value.trim();
        if (!obs) {
            document.getElementById('recusa-obs-input')?.classList.add('input-error');
            this.showToast('Descreva o ocorrido antes de enviar');
            return;
        }
        const visita = this.state.visitas.find(v => v.id === visitaId);
        if (visita) {
            visita.recusaRelato = {
                obs,
                registradoPor: this.state.user.email || this.state.user.nome,
                registradoEm: new Date().toISOString()
            };
            this.saveData();
        }
        this.closeModal();
        this.showToast('Relato registrado com sucesso');
    },

    shareCodigo() {
        const v = this.state.tempVisita;
        const text = `Visita Segura - CRECISP\nCódigo: ${v.codigo}\nPrédio: ${v.predioNome}\nData: ${formatDate(v.data)} às ${v.hora}\nCorretor: ${v.corretorNome} (${v.corretorCreci})`;
        
        if (navigator.share) {
            navigator.share({ title: 'Visita Segura', text });
        } else {
            navigator.clipboard.writeText(text);
            this.showToast('Código copiado para a área de transferência!');
        }
    },

    cancelarVisita(visitaId) {
        this.openModal('Cancelar Visita', `
            <div class="recusa-modal">
                <div class="recusa-icon" style="background: rgba(255,255,255,0.05); color: var(--text-secondary);">
                    <i class="fas fa-circle-xmark"></i>
                </div>
                <p class="recusa-desc">
                    Informe o motivo do cancelamento. Esta informação ficará registrada no histórico da visita.
                </p>
                <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Motivo do cancelamento</label>
                    <textarea
                        id="cancelamento-corretor-input"
                        class="form-control"
                        rows="4"
                        placeholder="Ex.: Cliente desistiu da visita..."
                        style="resize:vertical; min-height:100px;"
                    ></textarea>
                </div>
                <button class="btn btn-secondary" style="width:100%;" onclick="app.submitCancelamentoCorretor(${visitaId})">
                    <i class="fas fa-paper-plane"></i> Confirmar Cancelamento
                </button>
            </div>
        `);
        setTimeout(() => document.getElementById('cancelamento-corretor-input')?.focus(), 200);
    },

    submitCancelamentoCorretor(visitaId) {
        const obs = document.getElementById('cancelamento-corretor-input')?.value.trim();
        if (!obs) {
            document.getElementById('cancelamento-corretor-input')?.classList.add('input-error');
            this.showToast('Informe o motivo do cancelamento');
            return;
        }
        const visita = this.state.visitas.find(v => v.id === visitaId);
        if (visita) {
            visita.status = 'cancelada';
            visita.cancelamentoRelato = {
                obs,
                registradoPor: this.state.user.email || this.state.user.nome,
                registradoEm: new Date().toISOString()
            };
            this._pushHistorico(visita, 'cancelada');
            this.saveData();
        }
        this.closeModal();
        this.showToast('Visita cancelada');
        this.renderContent();
    },

    // ========================================
    // PORTEIRO - HOME
    // ========================================
    renderPorteiroHome(content) {
        const mv = this.state.visitas.filter(v => v.predioId === this.state.user.predioId);
        const hoje = new Date().toISOString().split('T')[0];

        const counts = {
            hoje:      mv.filter(v => v.data === hoje && v.status === 'agendada').length,
            agendada:  mv.filter(v => v.status === 'agendada').length,
            andamento: mv.filter(v => v.status === 'andamento').length,
            cancelada: mv.filter(v => v.status === 'cancelada').length,
            recusada:  mv.filter(v => v.status === 'recusada').length,
            concluida: mv.filter(v => v.status === 'concluida').length
        };

        const card = (filter, icon, colorClass, label, count, stagger) => `
            <button class="stat-card stat-clickable animate-in stagger-${stagger}" onclick="app.setTab('historico', '${filter}')">
                <div class="stat-icon ${colorClass}"><i class="fas ${icon}"></i></div>
                <div class="stat-value">${count}</div>
                <div class="stat-label">${label}</div>
                <i class="fas fa-chevron-right stat-arrow"></i>
            </button>`;

        content.innerHTML = `
            <div class="welcome-section animate-in">
                <h1>Olá, ${this.state.user.nome.split(' ')[0]}!</h1>
                <p>${this.state.user.predioNome} • Turno ${this.state.user.turno}</p>
            </div>

            <div class="stats-grid stats-grid-6">
                ${card('hoje',      'fa-calendar-day',    'blue',   'Visitas Hoje',  counts.hoje,      1)}
                ${card('agendada',  'fa-hourglass-half',  'gold',   'Agendadas',     counts.agendada,  2)}
                ${card('andamento', 'fa-person-walking',  'orange', 'Em Andamento',  counts.andamento, 3)}
                ${card('cancelada', 'fa-circle-xmark',    'red',    'Canceladas',    counts.cancelada, 4)}
                ${card('recusada',  'fa-ban',             'purple', 'Recusadas',     counts.recusada,  1)}
                ${card('concluida', 'fa-check-double',    'green',  'Concluídas',    counts.concluida, 2)}
            </div>
        `;
    },

    // ========================================
    // PORTEIRO - VALIDAR
    // ========================================
    renderPorteiroValidar(content) {
        content.innerHTML = `
            <div class="welcome-section animate-in" style="text-align: center;">
                <h1>Liberar Entrada</h1>
                <p>Digite o código de 6 dígitos informado pelo corretor</p>
            </div>

            <div class="animate-in stagger-1" style="margin: 2rem 0;">
                <div class="form-group">
                    <input 
                        type="text" 
                        class="form-control" 
                        id="codigo-input" 
                        placeholder="______"
                        maxlength="6"
                        inputmode="numeric"
                        style="font-size: 2rem; text-align: center; letter-spacing: 12px; font-family: 'Courier New', monospace; padding: 1.25rem;"
                        oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6)"
                    >
                </div>
                <button class="btn btn-primary" onclick="app.validarCodigo()" style="margin-top: 0.5rem;">
                    <i class="fas fa-shield-halved"></i>
                    Validar Código
                </button>
            </div>

            <div class="animate-in stagger-2" style="text-align: center; margin-top: 2rem;">
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">
                    Ou escaneie o QR Code
                </p>
                <div style="width: 80px; height: 80px; margin: 0 auto; background: rgba(255,255,255,0.05); border: 2px dashed rgba(255,255,255,0.1); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--text-secondary); font-size: 1.5rem;">
                    <i class="fas fa-camera"></i>
                </div>
                <p style="color: var(--gray-500); font-size: 0.75rem; margin-top: 0.5rem;">
                    Câmera não disponível no protótipo
                </p>
            </div>
        `;
        
        // Auto focus
        setTimeout(() => {
            const input = document.getElementById('codigo-input');
            if (input) input.focus();
        }, 400);
    },

    validarCodigo() {
        const input = document.getElementById('codigo-input');
        const codigo = input.value.trim();
        
        if (codigo.length !== 6) {
            this.showToast('Digite um código de 6 dígitos');
            input.focus();
            return;
        }

        const visita = this.state.visitas.find(v => 
            v.codigo === codigo && 
            v.predioId === this.state.user.predioId
        );

        if (!visita) {
            this.showToast('Código não encontrado para este prédio');
            input.value = '';
            input.focus();
            return;
        }

        if (visita.status === 'cancelada') {
            this.showToast('Esta visita foi cancelada');
            return;
        }

        if (visita.status === 'concluida') {
            this.showToast('Esta visita já foi finalizada');
            return;
        }

        this.state.tempVisita = visita;
        this.state.cameFrom = { tab: 'validar', filter: null };
        this.setTab('validar-resultado');
    },

    validarPorId(visitaId) {
        const visita = this.state.visitas.find(v => v.id === visitaId);
        this.state.tempVisita = visita;
        this.state.cameFrom = { tab: this.state.activeTab, filter: this.state.visitaFilter };
        this.setTab('validar-resultado');
    },

    renderValidarResultado(content) {
        const v = this.state.tempVisita;
        if (!v) return this.setTab('home');

        const jaValidada = v.status === 'andamento' || v.status === 'concluida';

        content.innerHTML = `
            <div class="welcome-section animate-in" style="text-align: center;">
                <button class="btn-back" onclick="app.goBackFromValidarResultado()" style="position: absolute; left: 1.5rem;">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h1>${jaValidada ? 'Visita Validada' : 'Detalhes da Visita'}</h1>
                <p>Verifique os dados do corretor</p>
            </div>

            <div class="visit-detail animate-in stagger-1">
                <img src="${v.corretorAvatar}" alt="${v.corretorNome}">
                <h3>${v.corretorNome}</h3>
                <span class="creci">${v.corretorCreci}</span>
                <p class="company">${v.corretorEmpresa}</p>
            </div>

            <div class="visit-info-grid animate-in stagger-2">
                <div class="visit-info-item">
                    <small>Telefone</small>
                    <span>${v.corretorTelefone}</span>
                </div>
                <div class="visit-info-item">
                    <small>Data</small>
                    <span>${formatDateRelative(v.data)}</span>
                </div>
                <div class="visit-info-item">
                    <small>Horário</small>
                    <span>${v.hora}</span>
                </div>
                <div class="visit-info-item">
                    <small>Código</small>
                    <span style="color: var(--accent); font-weight: 700; letter-spacing: 2px;">${v.codigo}</span>
                </div>
            </div>

            <div class="card animate-in stagger-3">
                <div class="card-header">
                    <div>
                        <div class="card-title">${v.predioNome}</div>
                        <div class="card-subtitle">${v.predioEndereco}</div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-row">
                        <i class="fas fa-circle-info"></i>
                        <span>Status: <strong style="color: var(--${v.status === 'agendada' ? 'info' : v.status === 'andamento' ? 'warning' : 'success'});">${getStatusLabel(v.status)}</strong></span>
                    </div>
                    ${v.validadoPor ? `
                        <div class="card-row">
                            <i class="fas fa-user-check"></i>
                            <span>Validado por: ${v.validadoPor} às ${v.validadoAt ? v.validadoAt.split('T')[1].slice(0, 5) : ''}</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="animate-in stagger-4" style="text-align:right; margin-top:0.875rem;">
                <button class="btn-historico" onclick="app.verHistoricoVisita(${v.id})">
                    <i class="fas fa-clock-rotate-left"></i> Histórico
                </button>
            </div>

            ${!jaValidada && !['recusada', 'cancelada'].includes(v.status) ? `
                <div class="animate-in stagger-4" style="display: flex; gap: 0.75rem; margin-top: 1rem;">
                    <button class="btn btn-success" onclick="app.confirmarEntrada()">
                        <i class="fas fa-check"></i> Liberar Entrada
                    </button>
                    <button class="btn btn-danger" onclick="app.negarEntrada()">
                        <i class="fas fa-ban"></i> Recusar Visita
                    </button>
                </div>
            ` : jaValidada ? `
                <div class="animate-in stagger-4" style="margin-top: 1.5rem;">
                    <div class="code-display" style="border-color: var(--success); background: rgba(0, 200, 83, 0.05);">
                        <div class="code-value" style="color: var(--success); font-size: 1.5rem;">
                            <i class="fas fa-circle-check"></i> ACESSO LIBERADO
                        </div>
                        <div class="code-label" style="color: var(--success);">Entrada confirmada às ${v.validadoAt ? v.validadoAt.split('T')[1].slice(0, 5) : ''}</div>
                    </div>
                </div>
            ` : ''}
        `;
    },

    confirmarEntrada() {
        const v = this.state.tempVisita;
        v.status = 'andamento';
        v.validadoPor = this.state.user.nome;
        v.validadoEmail = this.state.user.email || this.state.user.nome;
        v.validadoAt = new Date().toISOString();
        this._pushHistorico(v, 'andamento');
        this.saveData();
        this.showToast('Entrada liberada com sucesso!');
        this.renderContent();
    },

    negarEntrada() {
        if (!confirm('Deseja realmente negar o acesso deste corretor?')) return;
        const v = this.state.tempVisita;
        v.status = 'recusada';
        v.validadoPor = this.state.user.nome;
        v.validadoEmail = this.state.user.email || this.state.user.nome;
        v.validadoAt = new Date().toISOString();
        this._pushHistorico(v, 'recusada');
        this.saveData();
        this.showToast('Acesso negado');
        this.goBackFromValidarResultado();
    },

    // ========================================
    // PORTEIRO - HISTÓRICO
    // ========================================
    renderPorteiroHistorico(content) {
        const filter = this.state.visitaFilter;
        const hojeStr = new Date().toISOString().split('T')[0];

        let lista = this.state.visitas.filter(v => v.predioId === this.state.user.predioId);

        let titulo, subtitulo;
        if (filter === 'hoje') {
            lista = lista.filter(v => v.data === hojeStr && v.status === 'agendada');
            titulo = 'Visitas Hoje';
            subtitulo = 'Visitas agendadas para hoje';
        } else if (filter) {
            lista = lista.filter(v => v.status === filter);
            titulo = getStatusLabel(filter);
            subtitulo = `Visitas com status ${getStatusLabel(filter).toLowerCase()}`;
        } else {
            lista = lista.filter(v => ['andamento', 'concluida', 'cancelada', 'recusada'].includes(v.status));
            titulo = 'Visitas';
            subtitulo = 'Todas as visitas do condomínio';
        }

        const statusOrder = { andamento: 0, concluida: 1, cancelada: 2, recusada: 3 };
        lista = lista.sort((a, b) => {
            if (!filter) {
                const pa = statusOrder[a.status] ?? 9;
                const pb = statusOrder[b.status] ?? 9;
                if (pa !== pb) return pa - pb;
            }
            return new Date(b.validadoAt || b.createdAt) - new Date(a.validadoAt || a.createdAt);
        });

        content.innerHTML = `
            <div class="welcome-section animate-in">
                ${filter ? `
                    <button class="btn-back" onclick="app.setTab('home')" style="margin-bottom: 1rem;">
                        <i class="fas fa-arrow-left"></i>
                    </button>` : ''}
                <h1>${titulo}</h1>
                <p>${subtitulo}</p>
            </div>

            ${lista.length === 0 ? `
                <div class="empty-state animate-in">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Sem registros</h3>
                    <p>Nenhuma visita encontrada para este filtro</p>
                </div>
            ` : lista.map((v, i) => `
                <div class="card animate-in stagger-${(i % 4) + 1}">
                    <div class="card-header">
                        <div style="display: flex; align-items: center; gap: 0.875rem;">
                            <img src="${v.corretorAvatar}" alt="" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(212,175,55,0.3);">
                            <div>
                                <div class="card-title">${v.corretorNome}</div>
                                <div class="card-subtitle">${v.corretorEmpresa}</div>
                            </div>
                        </div>
                        <span class="status-badge ${v.status}">
                            <i class="fas ${getStatusIcon(v.status)}"></i>
                            ${getStatusLabel(v.status)}
                        </span>
                    </div>
                    <div class="card-body">
                        <div class="card-row">
                            <i class="fas fa-id-card"></i>
                            <span>CRECI: ${v.corretorCreci}</span>
                        </div>
                        <div class="card-row">
                            <i class="fas fa-calendar"></i>
                            <span>${formatDate(v.data)} às ${v.hora}</span>
                        </div>
                        ${v.validadoPor ? `
                        <div class="card-row">
                            <i class="fas fa-user-check"></i>
                            <span>Validado por: ${v.validadoPor}</span>
                        </div>` : ''}
                    </div>
                    <div class="card-footer" style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="app.validarPorId(${v.id})">
                            <i class="fas fa-eye"></i> Ver Visita
                        </button>
                        ${v.status === 'agendada' ? `
                        <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="app.cancelarVisitaPorteiro(${v.id})">
                            <i class="fas fa-xmark"></i> Cancelar
                        </button>` : ''}
                        ${v.status === 'andamento' ? `
                        <button class="btn btn-success btn-sm" style="flex: 1;" onclick="app.concluirVisitaPorteiro(${v.id})">
                            <i class="fas fa-check-double"></i> Concluir
                        </button>` : ''}
                    </div>
                </div>
            `).join('')}
        `;
    },

    concluirVisitaPorteiro(visitaId) {
        const v = this.state.visitas.find(vis => vis.id === visitaId);
        if (!v) return;
        if (v.status === 'concluida') { this.showToast('Esta visita já foi concluída'); return; }
        if (v.status === 'cancelada' || v.status === 'recusada') { this.showToast('Não é possível concluir esta visita'); return; }
        v.status = 'concluida';
        if (!v.validadoPor) {
            v.validadoPor = this.state.user.nome;
            v.validadoEmail = this.state.user.email || this.state.user.nome;
            v.validadoAt = new Date().toISOString();
        }
        this._pushHistorico(v, 'concluida');
        this.saveData();
        this.showToast('Visita concluída com sucesso!');
        this.renderContent();
    },

    cancelarVisitaPorteiro(visitaId) {
        this.openModal('Cancelar Visita', `
            <div class="recusa-modal">
                <div class="recusa-icon" style="background: rgba(255,255,255,0.05); color: var(--text-secondary);">
                    <i class="fas fa-circle-xmark"></i>
                </div>
                <p class="recusa-desc">
                    Informe o motivo do cancelamento. Esta informação ficará registrada no histórico da visita.
                </p>
                <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Motivo do cancelamento</label>
                    <textarea
                        id="cancelamento-obs-input"
                        class="form-control"
                        rows="4"
                        placeholder="Ex.: Imóvel não está disponível para visita nesta data..."
                        style="resize:vertical; min-height:100px;"
                    ></textarea>
                </div>
                <button class="btn btn-secondary" style="width:100%;" onclick="app.submitCancelamentoPorteiro(${visitaId})">
                    <i class="fas fa-paper-plane"></i> Confirmar Cancelamento
                </button>
            </div>
        `);
        setTimeout(() => document.getElementById('cancelamento-obs-input')?.focus(), 200);
    },

    submitCancelamentoPorteiro(visitaId) {
        const obs = document.getElementById('cancelamento-obs-input')?.value.trim();
        if (!obs) {
            document.getElementById('cancelamento-obs-input')?.classList.add('input-error');
            this.showToast('Informe o motivo do cancelamento');
            return;
        }
        const v = this.state.visitas.find(vis => vis.id === visitaId);
        if (v) {
            v.status = 'cancelada';
            v.cancelamentoRelato = {
                obs,
                registradoPor: this.state.user.email || this.state.user.nome,
                registradoEm: new Date().toISOString()
            };
            this._pushHistorico(v, 'cancelada');
            this.saveData();
        }
        this.closeModal();
        this.showToast('Visita cancelada');
        this.renderContent();
    },

    // ========================================
    // UTILS
    // ========================================

    _pushHistorico(visita, status) {
        if (!visita.historico) visita.historico = [];
        visita.historico.push({
            dataHora: new Date().toISOString(),
            usuario: this.state.user.email || this.state.user.nome,
            status
        });
    },

    verHistoricoVisita(visitaId) {
        const v = this.state.visitas.find(vis => vis.id === visitaId);
        if (!v) return;

        // Usa historico gravado ou deriva dos campos existentes (mock data legado)
        let hist = (v.historico && v.historico.length > 0) ? v.historico : null;
        if (!hist) {
            const emailCorretor = v.corretorEmail ||
                (this.state.corretores.find(c => c.id === v.corretorId) || {}).email ||
                v.corretorNome;
            const emailPorteiro = v.validadoEmail ||
                (this.state.porteiros.find(p => p.nome === v.validadoPor) || {}).email ||
                v.validadoPor || '—';

            hist = [{ dataHora: v.createdAt, usuario: emailCorretor, status: 'agendada' }];
            if (v.validadoAt && (v.status === 'andamento' || v.status === 'concluida' || v.status === 'recusada')) {
                hist.push({ dataHora: v.validadoAt, usuario: emailPorteiro, status: v.status });
            } else if (v.status === 'cancelada') {
                hist.push({ dataHora: v.createdAt, usuario: emailCorretor, status: 'cancelada' });
            }
        }

        const cfg = {
            agendada:  { icon: 'fa-calendar-check', color: 'var(--info)'    },
            andamento: { icon: 'fa-person-walking',  color: 'var(--warning)' },
            concluida: { icon: 'fa-circle-check',    color: 'var(--success)' },
            cancelada: { icon: 'fa-circle-xmark',    color: 'var(--danger)'  },
            recusada:  { icon: 'fa-ban',             color: 'var(--purple)'  }
        };

        const fmtDT = iso => {
            const d = new Date(iso);
            const dd = String(d.getDate()).padStart(2,'0');
            const mm = String(d.getMonth()+1).padStart(2,'0');
            const yy = d.getFullYear();
            const hh = String(d.getHours()).padStart(2,'0');
            const mi = String(d.getMinutes()).padStart(2,'0');
            return { data: `${dd}/${mm}/${yy}`, hora: `${hh}:${mi}` };
        };

        const entriesHTML = hist.map((entry, i) => {
            const { data, hora } = fmtDT(entry.dataHora);
            const c = cfg[entry.status] || { icon: 'fa-circle', color: 'var(--text-secondary)' };
            const isLast = i === hist.length - 1;
            return `
                <div class="hist-entry${isLast ? ' hist-last' : ''}">
                    <div class="hist-col">
                        <div class="hist-dot" style="color:${c.color};border-color:${c.color};">
                            <i class="fas ${c.icon}"></i>
                        </div>
                        ${!isLast ? '<div class="hist-line"></div>' : ''}
                    </div>
                    <div class="hist-body">
                        <span class="hist-badge" style="color:${c.color};border-color:${c.color};background:${c.color}1a;">
                            ${getStatusLabel(entry.status)}
                        </span>
                        <div class="hist-meta">
                            <span class="hist-meta-row"><i class="fas fa-calendar"></i> ${data} às ${hora}</span>
                            <span class="hist-meta-row"><i class="fas fa-user"></i> ${entry.usuario}</span>
                        </div>
                    </div>
                </div>`;
        }).join('');

        this.openModal('Histórico da Visita', `
            <div class="historico-modal">
                <div class="hist-resumo">
                    <i class="fas fa-building"></i>
                    <span>${v.predioNome} — ${v.predioEndereco}</span>
                </div>
                <div class="hist-timeline">${entriesHTML}</div>
            </div>
        `);
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-message').textContent = message;
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 3000);
    },

    openModal(title, html) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = html;
        document.getElementById('modal').classList.add('active');
    },

    closeModal() {
        document.getElementById('modal').classList.remove('active');
    }
};

// Inicializa o app quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
