<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deportes ERB - Canales y Streaming Deportivo en Directo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        :root {
            --bg-main: #0b0f19;
            --bg-card: rgba(22, 30, 49, 0.85);
            --bg-card-hover: rgba(30, 41, 69, 0.95);
            --bg-header: rgba(11, 15, 25, 0.9);
            --bg-nav: rgba(30, 58, 138, 0.95); /* Modificado a azul marino */
            
            --primary: #00d2ff;
            --primary-glow: rgba(0, 210, 255, 0.4);
            --accent: #3a7bd5;
            --live-red: #ff3366;
            --live-glow: rgba(255, 51, 102, 0.5);
            
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --text-sub: #cbd5e1;
            
            --border-color: rgba(255, 255, 255, 0.08);
            --border-highlight: rgba(0, 210, 255, 0.4);
            
            --server-daddylive: #8b5cf6;
            --server-zonatv: #3b82f6;
            --server-tvcstreams: #f59e0b;
            --server-bolaloca: #10b981;
            --server-tvporint: #ec4899;
            --server-sportz: #06b6d4;
            --server-livetv: #6366f1;
            --server-nexgen: #14b8a6;

            --card-scale: 1;
            --font-scale: 1rem;
        }

        /* Modos de Pantalla */
        body.mode-tv {
            --card-scale: 1.15;
            --font-scale: 1.15rem;
            padding-top: 10px;
        }

        body.mode-mobile {
            --card-scale: 0.9;
            --font-scale: 0.9rem;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--bg-main);
            background-image: 
                radial-gradient(at 0% 0%, rgba(58, 123, 213, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(0, 210, 255, 0.12) 0px, transparent 50%),
                radial-gradient(at 50% 100%, rgba(255, 51, 102, 0.08) 0px, transparent 50%);
            background-attachment: fixed;
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            font-size: var(--font-scale);
        }

        /* 1. Encabezado */
        .site-header {
            position: sticky;
            top: 0;
            z-index: 100;
            background: var(--bg-header);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border-color);
            padding: 12px 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .header-container {
            max-width: 1600px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .brand-section {
            display: flex;
            align-items: center;
            gap: 14px;
            text-decoration: none;
            cursor: pointer;
        }

        .brand-logo {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            object-fit: cover;
            border: 2px solid var(--primary);
            box-shadow: 0 0 15px var(--primary-glow);
            background: #fff;
        }

        .brand-title-wrap {
            display: flex;
            flex-direction: column;
        }

        .brand-title {
            font-size: 1.4rem;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, var(--primary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
            line-height: 1.2;
        }

        .brand-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: uppercase;
            color: #fff;
            letter-spacing: 0.5px;
        }

        .live-dot {
            width: 8px;
            height: 8px;
            background-color: var(--live-red);
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 10px var(--live-glow);
            animation: pulse-live 1.6s infinite ease-in-out;
        }

        @keyframes pulse-live {
            0% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 0 0 var(--live-glow); }
            70% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 0 8px rgba(255, 51, 102, 0); }
            100% { transform: scale(0.95); opacity: 0.8; box-shadow: 0 0 0 0 rgba(255, 51, 102, 0); }
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .action-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border-color);
            color: var(--text-main);
            padding: 8px 14px;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            text-decoration: none;
        }

        .action-btn:hover, .action-btn.active, .action-btn:focus {
            background: rgba(0, 210, 255, 0.15);
            border-color: var(--primary);
            color: var(--primary);
            box-shadow: 0 0 12px var(--primary-glow);
            outline: none;
        }

        /* 2. Menú Desplazable Horizontal y Bloque de Título Fijo Integrado */
        .menu-inferior-wrapper {
            position: sticky;
            top: 69px;
            z-index: 90;
            width: 100%;
            background: var(--bg-nav);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            padding: 10px 0 0 0;
        }

        .nav-controls {
            max-width: 1600px;
            margin: 0 auto;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .desplazable-horizontal {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 14px;
            overflow-x: auto;
            padding: 4px 20px 10px 20px;
            scroll-behavior: smooth;
            width: 100%;
            scrollbar-width: thin;
            scrollbar-color: var(--primary) transparent;
        }

        .desplazable-horizontal::-webkit-scrollbar { height: 4px; }
        .desplazable-horizontal::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 4px; }

        .menu-cat-btn {
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.04);
            border: 2px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 6px 14px 8px;
            cursor: pointer;
            text-decoration: none;
            color: var(--text-muted);
            transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
            min-width: 120px;
        }

        .menu-cat-btn:hover, .menu-cat-btn:focus {
            transform: translateY(-2px);
            background: #93c5fd; /* Azul claro */
            border-color: #ffd700; /* Amarillo oro */
            color: #7f1d1d; /* Rojo oscuro */
            outline: none;
        }

        /* Estado Activo permanente hasta pulsar otro */
        .menu-cat-btn.active {
            transform: translateY(-2px);
            background: #93c5fd !important;
            border-color: #ffd700 !important;
            color: #7f1d1d !important;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
        }

        .menu-cat-logo-wrap {
            width: 130px;
            height: 72px;
            background: #ffffff;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 8px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;
        }

        .menu-cat-btn:hover .menu-cat-logo-wrap,
        .menu-cat-btn.active .menu-cat-logo-wrap { 
            transform: scale(1.05); 
            border-color: #ffd700; 
        }
        
        .menu-cat-logo-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }

        .menu-cat-name {
            font-size: 0.8rem;
            font-weight: 700;
            white-space: nowrap;
            text-align: center;
        }

        /* Sección de Título Fija unida al menú flotante */
        .sticky-section-header-wrapper {
            background: rgba(18, 25, 41, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-top: 1px solid var(--border-color);
            padding: 10px 24px;
            width: 100%;
        }

        .sticky-section-header-container {
            max-width: 1600px;
            margin: 0 auto;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: none;
            padding-bottom: 0;
            flex-wrap: wrap;
            gap: 12px;
        }

        .section-title-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .section-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-title i { color: var(--primary); }

        .channel-counter {
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--text-muted);
            background: rgba(255, 255, 255, 0.06);
            padding: 4px 10px;
            border-radius: 20px;
        }

        /* 3. Área Principal */
        .main-container {
            max-width: 1600px;
            margin: 20px auto;
            padding: 0 24px;
            width: 100%;
            flex: 1;
        }

        /* Cuadrícula de Canales */
        .channels-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(calc(160px * var(--card-scale)), 1fr));
            gap: calc(16px * var(--card-scale));
            transition: all 0.3s ease;
        }

        .channel-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 14px 12px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            text-decoration: none;
            color: var(--text-main);
            position: relative;
            transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }

        .channel-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .channel-card:hover, .channel-card:focus {
            transform: translateY(-6px) scale(1.02);
            background: var(--bg-card-hover);
            border-color: var(--border-highlight);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 210, 255, 0.2);
            outline: none;
        }

        .channel-card:hover::before, .channel-card:focus::before { opacity: 1; }

        .card-logo-container {
            width: 100%;
            height: calc(85px * var(--card-scale));
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border-radius: 12px;
            padding: 8px;
            margin-bottom: 12px;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
            transition: transform 0.25s ease;
        }

        .channel-card:hover .card-logo-container, .channel-card:focus .card-logo-container { transform: scale(1.04); }

        .card-logo {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .card-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .card-channel-name {
            font-size: calc(0.92rem * var(--card-scale));
            font-weight: 700;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.3;
        }

        .card-category-name {
            font-size: calc(0.72rem * var(--card-scale));
            color: var(--text-muted);
            font-weight: 500;
        }

        .server-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: calc(0.7rem * var(--card-scale));
            font-weight: 700;
            margin-top: 6px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            background: rgba(255, 255, 255, 0.08);
            color: var(--text-sub);
            border: 1px solid rgba(255, 255, 255, 0.05);
            width: 100%;
        }

        .server-badge.daddylive { background: rgba(139, 92, 246, 0.15); color: #c4b5fd; border-color: rgba(139, 92, 246, 0.3); }
        .server-badge.zonatv { background: rgba(59, 130, 246, 0.15); color: #93c5fd; border-color: rgba(59, 130, 246, 0.3); }
        .server-badge.tvcstreams { background: rgba(245, 158, 11, 0.15); color: #fde68a; border-color: rgba(245, 158, 11, 0.3); }
        .server-badge.bolaloca { background: rgba(16, 185, 129, 0.15); color: #a7f3d0; border-color: rgba(16, 185, 129, 0.3); }
        .server-badge.tvporint { background: rgba(236, 72, 153, 0.15); color: #fbcfe8; border-color: rgba(236, 72, 153, 0.3); }
        .server-badge.sportz { background: rgba(6, 182, 212, 0.15); color: #a5f3fc; border-color: rgba(6, 182, 212, 0.3); }
        .server-badge.livetv { background: rgba(99, 102, 241, 0.15); color: #c7d2fe; border-color: rgba(99, 102, 241, 0.3); }
        .server-badge.nexgen { background: rgba(20, 184, 166, 0.15); color: #99f6e4; border-color: rgba(20, 184, 166, 0.3); }

        .empty-state {
            grid-column: 1 / -1;
            padding: 60px 20px;
            text-align: center;
            background: var(--bg-card);
            border-radius: 16px;
            border: 1px dashed var(--border-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }

        .empty-state i { font-size: 3rem; color: var(--text-muted); opacity: 0.6; }
        .empty-state h3 { font-size: 1.2rem; color: #fff; }
        .empty-state p { color: var(--text-muted); font-size: 0.9rem; max-width: 400px; }

        @media (max-width: 768px) {
            .site-header { padding: 10px 16px; }
            .brand-title { font-size: 1.1rem; }
            .main-container { padding: 0 14px; margin-top: 14px; }
            .desplazable-horizontal { justify-content: flex-start; padding: 4px 16px 10px 16px; }
            .menu-inferior-wrapper { top: 61px; }
            .sticky-section-header-wrapper { padding: 8px 16px; }

            .channels-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 10px !important;
            }
            .channel-card {
                padding: 10px 8px 8px !important;
            }
            .card-logo-container {
                height: 70px !important;
                margin-bottom: 8px !important;
            }
            .card-channel-name {
                font-size: 0.85rem !important;
            }
            .card-category-name {
                font-size: 0.68rem !important;
            }
            .server-badge {
                font-size: 0.65rem !important;
                padding: 2px 6px !important;
                margin-top: 6px !important;
            }
        }

        @media (max-width: 480px) {
            .action-btn span { display: none; }
        }
    </style>
</head>
<body>

    <header class="site-header">
        <div class="header-container">
            <div class="brand-section" onclick="filterCategory('all')">
                <img src="https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png" alt="Deportes ERB" class="brand-logo">
                <div class="brand-title-wrap">
                    <h1 class="brand-title">Deportes ERB</h1>
                    <div class="brand-badge">
                        <span class="live-dot"></span>
                        <span>Streaming En Directo</span>
                    </div>
                </div>
            </div>

            <div class="header-actions">
                <button class="action-btn" id="deviceModeBtn" onclick="toggleDeviceMode()" title="Cambiar modo de vista">
                    <i class="fa-solid fa-desktop" id="deviceModeIcon"></i>
                    <span id="deviceModeText">Modo: TV</span>
                </button>
                <button class="action-btn" onclick="toggleFullScreen()" title="Pantalla Completa">
                    <i class="fa-solid fa-expand"></i>
                </button>
            </div>
        </div>
    </header>

    <nav class="menu-inferior-wrapper">
        <div class="nav-controls">
            <div class="desplazable-horizontal" id="bottomNavScroll">
                <button class="menu-cat-btn active" data-category="all" onclick="filterCategory('all')">
                    <div class="menu-cat-logo-wrap">
                        <img src="https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png" alt="Todos">
                    </div>
                    <span class="menu-cat-name">Canales</span>
                </button>

                <button class="menu-cat-btn" data-category="La Liga" onclick="filterCategory('La Liga')">
                    <div class="menu-cat-logo-wrap">
                        <img src="https://i.postimg.cc/VsF4nL28/La-Liga.png" alt="La Liga">
                    </div>
                    <span class="menu-cat-name">La Liga</span>
                </button>

                <button class="menu-cat-btn" data-category="Champions League" onclick="filterCategory('Champions League')">
                    <div class="menu-cat-logo-wrap">
                        <img src="https://i.postimg.cc/HxpVrP34/Champions-League.png" alt="Champions League">
                    </div>
                    <span class="menu-cat-name">Champions League</span>
                </button>

                <button class="menu-cat-btn" data-category="Liga ACB" onclick="filterCategory('Liga ACB')">
                    <div class="menu-cat-logo-wrap">
                        <img src="https://i.postimg.cc/HscGzrMV/Liga-ACB.png" alt="Liga ACB">
                    </div>
                    <span class="menu-cat-name">Liga ACB</span>
                </button>

                <button class="menu-cat-btn" data-category="Euroliga" onclick="filterCategory('Euroliga')">
                    <div class="menu-cat-logo-wrap">
                        <img src="https://basketpasion.es/wp-content/uploads/2022/06/euroleague-basketball-1300.webp" alt="Euroliga">
                    </div>
                    <span class="menu-cat-name">Euroliga</span>
                </button>

                <button class="menu-cat-btn" data-category="Zona Dazn" onclick="filterCategory('Zona Dazn')">
                    <div class="menu-cat-logo-wrap">
                        <img src="https://i.postimg.cc/bJt15wh9/Zona-Dazn.png" alt="Zona Dazn">
                    </div>
                    <span class="menu-cat-name">Zona Dazn</span>
                </button>

                <button class="menu-cat-btn" data-category="Canales Latinos" onclick="filterCategory('Canales Latinos')">
                    <div class="menu-cat-logo-wrap">
                        <img src="https://i.postimg.cc/cCWt57Td/Canales-Latinoamerica.png" alt="Canales Latinos">
                    </div>
                    <span class="menu-cat-name">Canales Latinos</span>
                </button>
            </div>
        </div>

        <div class="sticky-section-header-wrapper">
            <div class="sticky-section-header-container">
                <div class="section-header">
                    <div class="section-title-wrap">
                        <h2 class="section-title" id="currentSectionTitle">
                            <i class="fa-solid fa-layer-group"></i>
                            <span>Todos los Canales</span>
                        </h2>
                        <span class="channel-counter" id="visibleCounter">Mostrando 0 canales</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main class="main-container">
        <div class="channels-grid" id="channelsGrid">
            </div>
    </main>

    <script>
        const CHANNELS_DATA = [
		
// LA LIGA
            { id: 1, name: "LaLiga/Dazn", server: "sportzonline", serverKey: "sportzonline", category: "La Liga", categoryLabel: "La Liga", url: "https://sportzonline.click/channels/hd/hd6.php", logo: "https://i.postimg.cc/nr8tQ8cX/La-Liga-Tv-Dazn-La-Liga.png" },
            { id: 2, name: "M. LaLiga", server: "daddylive", serverKey: "daddylive", category: "La Liga", categoryLabel: "La Liga", url: "https://dlhd.st/watch/stream-84.php", logo: "https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png" },
            { id: 3, name: "M. LaLiga", server: "zonatv", serverKey: "zonatv", category: "La Liga", categoryLabel: "La Liga", url: "https://zonatv.space/canales/laliga/", logo: "https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png" },
            { id: 4, name: "M. LaLiga", server: "embedme", serverKey: "embedme", category: "La Liga", categoryLabel: "La Liga", url: "https://embedme.click/player/3/49", logo: "https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png" },
            { id: 5, name: "M. LaLiga", server: "bolaloca", serverKey: "bolaloca", category: "La Liga", categoryLabel: "La Liga", url: "https://bolaloca.my/player/capo/49", logo: "https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png" },
            { id: 6, name: "M. LaLiga", server: "tvporint", serverKey: "tvporint", category: "La Liga", categoryLabel: "La Liga", url: "https://www.tvporinternet2.com/movistar-la-liga-en-vivo-por-internet.html", logo: "https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png" },
            { id: 7, name: "Dazn LaLiga", server: "daddylive", serverKey: "daddylive", category: "La Liga", categoryLabel: "La Liga", url: "https://dlhd.st/watch/stream-538.php", logo: "https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png" },
            { id: 8, name: "Dazn LaLiga", server: "zonatv", serverKey: "zonatv", category: "La Liga", categoryLabel: "La Liga", url: "https://zonatv.space/canales/dazn-laliga/", logo: "https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png" },
            { id: 9, name: "Dazn LaLiga", server: "embedme", serverKey: "embedme", category: "La Liga", categoryLabel: "La Liga", url: "https://embedme.click/player/3/51", logo: "https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png" },
            { id: 10, name: "Dazn LaLiga", server: "bolaloca", serverKey: "bolaloca", category: "La Liga", categoryLabel: "La Liga", url: "https://bolaloca.my/player/capo/51", logo: "https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png" },
            { id: 11, name: "Dazn LaLiga", server: "tvporint", serverKey: "tvporint", category: "La Liga", categoryLabel: "La Liga", url: "https://www.tvporinternet2.com/dazn-la-liga-en-vivo-por-internet.html", logo: "https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png" },
            { id: 12, name: "Espn Deportes", server: "daddylive", serverKey: "daddylive", category: "La Liga", categoryLabel: "La Liga", url: "https://dlhd.st/watch/stream-375.php", logo: "https://i.postimg.cc/4dPchzfK/Espn-deportes.png" },
            { id: 13, name: "Espn Deportes", server: "zonatv", serverKey: "zonatv", category: "La Liga", categoryLabel: "La Liga", url: "https://zonatv.space/canales/espn-deportes/", logo: "https://i.postimg.cc/4dPchzfK/Espn-deportes.png" },
            { id: 14, name: "Espn Deportes", server: "embedme", serverKey: "embedme", category: "La Liga", categoryLabel: "La Liga", url: "https://embedme.click/player/3/71", logo: "https://i.postimg.cc/4dPchzfK/Espn-deportes.png" },
            { id: 15, name: "Espn Deportes", server: "asiria", serverKey: "asiria", category: "La Liga", categoryLabel: "La Liga", url: "https://asiria.is/espndeportes.php", logo: "https://i.postimg.cc/4dPchzfK/Espn-deportes.png" },
            { id: 16, name: "Espn Deportes", server: "nexgen", serverKey: "nexgen", category: "La Liga", categoryLabel: "La Liga", url: "https://tx3.nexgen.bz:4000/ESPN_DEPORTES/index.m3u8", logo: "https://i.postimg.cc/4dPchzfK/Espn-deportes.png" },
            { id: 17, name: "Espn Deportes", server: "bolaloca", serverKey: "bolaloca", category: "La Liga", categoryLabel: "La Liga", url: "https://bolaloca.my/player/capo/71", logo: "https://i.postimg.cc/4dPchzfK/Espn-deportes.png" },
            { id: 18, name: "Sky S. LaLiga", server: "a03h", serverKey: "a03h", category: "La Liga", categoryLabel: "La Liga", url: "http://45.228.234.30:16000/play/a03h/index.m3u8", logo: "https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png" },
            { id: 19, name: "Sky S. LaLiga", server: "tvporint", serverKey: "tvporint", category: "La Liga", categoryLabel: "La Liga", url: "https://www.tvporinternet2.com/sky-sports-la-liga-en-vivo-por-internet.html", logo: "https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png" },
            { id: 20, name: "Página Web LaLiga", server: "livetv", serverKey: "livetv", category: "La Liga", categoryLabel: "La Liga", url: "https://livetv.sx/es/competitions/15/", logo: "https://i.postimg.cc/FRTD23wN/Pagina-Web-La-Liga.png" },
// CHAMPIONS LEAGUE
            { id: 21, name: "L. Campeones", server: "daddylive", serverKey: "daddylive", category: "Champions League", categoryLabel: "Champions League", url: "https://dlhd.st/watch/stream-435.php", logo: "https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png" },
            { id: 22, name: "L. Campeones", server: "zonatv", serverKey: "zonatv", category: "Champions League", categoryLabel: "Champions League", url: "https://zonatv.space/canales/campeones/", logo: "https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png" },
            { id: 23, name: "L. Campeones", server: "embedme", serverKey: "embedme", category: "Champions League", categoryLabel: "Champions League", url: "https://embedme.click/player/3/61", logo: "https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png" },
            { id: 24, name: "L. Campeones", server: "bolaloca", serverKey: "bolaloca", category: "Champions League", categoryLabel: "Champions League", url: "https://bolaloca.my/player/capo/61", logo: "https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png" },
            { id: 25, name: "L. Campeones", server: "tvporint", serverKey: "tvporint", category: "Champions League", categoryLabel: "Champions League", url: "https://www.tvporinternet2.com/movistar-liga-de-campeones-en-vivo-por-internet.html", logo: "https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png" },
            { id: 26, name: "Tudn", server: "latamplay1", serverKey: "latamplay1", category: "Champions League", categoryLabel: "Champions League", url: "https://latamplay1.click/channel/tudnmx.html", logo: "https://i.postimg.cc/QtMLX404/TUDN-Logo.png" },
            { id: 27, name: "Tudn", server: "daddylive", serverKey: "daddylive", category: "Champions League", categoryLabel: "Champions League", url: "https://dlhd.st/watch/stream-66.php", logo: "https://i.postimg.cc/QtMLX404/TUDN-Logo.png" },
            { id: 28, name: "Tudn", server: "zonatv", serverKey: "zonatv", category: "Champions League", categoryLabel: "Champions League", url: "https://zonatv.space/canales/tudn/", logo: "https://i.postimg.cc/QtMLX404/TUDN-Logo.png" },
            { id: 29, name: "Tudn", server: "embedme", serverKey: "embedme", category: "Champions League", categoryLabel: "Champions League", url: "https://embedme.click/player/3/68", logo: "https://i.postimg.cc/QtMLX404/TUDN-Logo.png" },
            { id: 30, name: "Tudn", server: "a04t", serverKey: "a04t", category: "Champions League", categoryLabel: "Champions League", url: "http://45.5.117.57:8999/play/a04t/index.m3u8", logo: "https://i.postimg.cc/QtMLX404/TUDN-Logo.png" },
            { id: 31, name: "Tudn", server: "bolaloca", serverKey: "bolaloca", category: "Champions League", categoryLabel: "Champions League", url: "https://bolaloca.my/player/capo/68", logo: "https://i.postimg.cc/QtMLX404/TUDN-Logo.png" },
            { id: 32, name: "Tudn", server: "tvporint", serverKey: "tvporint", category: "Champions League", categoryLabel: "Champions League", url: "https://www.tvporinternet2.com/tudn-en-vivo-por-internet.html", logo: "https://i.postimg.cc/QtMLX404/TUDN-Logo.png" },
            { id: 33, name: "Página Web Champions League", server: "livetv", serverKey: "livetv", category: "Champions League", categoryLabel: "Champions League", url: "https://livetv.sx/es/competitions/7/", logo: "https://i.postimg.cc/Hs0V3LQk/P-gina-Web-Champions-League.png" },
// LIGA ACB
            { id: 34, name: "ACB Dazn 1", server: "embedme", serverKey: "embedme", category: "Liga ACB", categoryLabel: "Liga ACB", url: "https://embedme.click/player/3/155", logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg" },
            { id: 35, name: "ACB Dazn 1", server: "bolaloca", serverKey: "bolaloca", category: "Liga ACB", categoryLabel: "Liga ACB", url: "https://bolaloca.my/player/capo/155", logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg" },
            { id: 36, name: "ACB Dazn 2", server: "embedme", serverKey: "embedme", category: "Liga ACB", categoryLabel: "Liga ACB", url: "https://embedme.click/player/3/156", logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg" },
            { id: 37, name: "ACB Dazn 2", server: "bolaloca", serverKey: "bolaloca", category: "Liga ACB", categoryLabel: "Liga ACB", url: "https://bolaloca.my/player/capo/156", logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg" },
            { id: 38, name: "ACB Dazn 3", server: "embedme", serverKey: "embedme", category: "Liga ACB", categoryLabel: "Liga ACB", url: "https://embedme.click/player/3/157", logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg" },
            { id: 39, name: "ACB Dazn 3", server: "bolaloca", serverKey: "bolaloca", category: "Liga ACB", categoryLabel: "Liga ACB", url: "https://bolaloca.my/player/capo/157", logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg" },
            { id: 40, name: "TVC Deportes", server: "daddylive", serverKey: "daddylive", category: "Liga ACB", categoryLabel: "Liga ACB", url: "https://dlhd.st/watch/stream-932.php", logo: "https://s3.superluchas.com/wp-content/uploads/20190320114903/tvc_deportes.png" },
            { id: 41, name: "Página Web Liga ACB", server: "livetv", serverKey: "livetv", category: "Liga ACB", categoryLabel: "Liga ACB", url: "https://livetv.sx/es/competitions/215/", logo: "https://i.postimg.cc/hGNDKF9Y/P-gina-Web-Liga-ACB.png" },
// EUROLIGA
            { id: 42, name: "Movistar+", server: "daddylive", serverKey: "daddylive", category: "Euroliga", categoryLabel: "Euroliga", url: "https://dlhd.st/watch/stream-437.php", logo: "https://i.postimg.cc/Gtd7zdzm/movistar.png" },
            { id: 43, name: "Movistar+", server: "zonatv", serverKey: "zonatv", category: "Euroliga", categoryLabel: "Euroliga", url: "https://zonatv.space/canales/canal-0/", logo: "https://i.postimg.cc/Gtd7zdzm/movistar.png" },
            { id: 44, name: "M. Deportes 1", server: "daddylive", serverKey: "daddylive", category: "Euroliga", categoryLabel: "Euroliga", url: "https://dlhd.st/watch/stream-436.php", logo: "https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png" },
            { id: 45, name: "M. Deportes 1", server: "zonatv", serverKey: "zonatv", category: "Euroliga", categoryLabel: "Euroliga", url: "https://zonatv.space/canales/deportes/", logo: "https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png" },
            { id: 46, name: "M. Deportes 1", server: "embedme", serverKey: "embedme", category: "Euroliga", categoryLabel: "Euroliga", url: "https://embedme.click/player/3/62", logo: "https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png" },
            { id: 47, name: "M. Deportes 1", server: "bolaloca", serverKey: "bolaloca", category: "Euroliga", categoryLabel: "Euroliga", url: "https://bolaloca.my/player/capo/62", logo: "https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png" },
            { id: 48, name: "M. Deportes 2", server: "daddylive", serverKey: "daddylive", category: "Euroliga", categoryLabel: "Euroliga", url: "https://dlhd.st/watch/stream-438.php", logo: "https://i.postimg.cc/GhvMnHS2/movistar-deportes-2-Logo.png" },
            { id: 49, name: "M. Deportes 2", server: "zonatv", serverKey: "zonatv", category: "Euroliga", categoryLabel: "Euroliga", url: "https://zonatv.space/canales/deportes2/", logo: "https://i.postimg.cc/GhvMnHS2/movistar-deportes-2-Logo.png" },
            { id: 50, name: "Vamos", server: "daddylive", serverKey: "daddylive", category: "Euroliga", categoryLabel: "Euroliga", url: "https://dlhd.st/watch/stream-521.php", logo: "https://i.postimg.cc/mg44mdVP/Vamos-Logo.png" },
            { id: 51, name: "Vamos", server: "zonatv", serverKey: "zonatv", category: "Euroliga", categoryLabel: "Euroliga", url: "https://zonatv.space/canales/vamos/", logo: "https://i.postimg.cc/mg44mdVP/Vamos-Logo.png" },
            { id: 52, name: "Vamos", server: "embedme", serverKey: "embedme", category: "Euroliga", categoryLabel: "Euroliga", url: "https://embedme.click/player/3/55", logo: "https://i.postimg.cc/mg44mdVP/Vamos-Logo.png" },
            { id: 53, name: "Vamos", server: "bolaloca", serverKey: "bolaloca", category: "Euroliga", categoryLabel: "Euroliga", url: "https://bolaloca.my/player/capo/55", logo: "https://i.postimg.cc/mg44mdVP/Vamos-Logo.png" },
            { id: 54, name: "Página Web Euroliga", server: "livetv", serverKey: "livetv", category: "Euroliga", categoryLabel: "Euroliga", url: "https://livetv.sx/es/competitions/41/", logo: "https://i.postimg.cc/ry1V2Pzh/P-gina-Web-Euroliga.png" },
// ZONA DAZN
            { id: 55, name: "Dazn 1", server: "daddylive", serverKey: "daddylive", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://dlhd.st/watch/stream-445.php", logo: "https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png" },
            { id: 56, name: "Dazn 1", server: "zonatv", serverKey: "zonatv", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://zonatv.space/canales/dazn1/", logo: "https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png" },
            { id: 57, name: "Dazn 1", server: "embedme", serverKey: "embedme", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://embedme.click/player/3/56", logo: "https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png" },
            { id: 58, name: "Dazn 1", server: "bolaloca", serverKey: "bolaloca", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://bolaloca.my/player/capo/56", logo: "https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png" },
            { id: 59, name: "Dazn 2", server: "daddylive", serverKey: "daddylive", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://dlhd.st/watch/stream-446.php", logo: "https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png" },
            { id: 60, name: "Dazn 2", server: "zonatv", serverKey: "zonatv", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://zonatv.space/canales/dazn2/", logo: "https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png" },
            { id: 61, name: "Dazn 2", server: "embedme", serverKey: "embedme", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://embedme.click/player/3/57", logo: "https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png" },
            { id: 62, name: "Dazn 2", server: "bolaloca", serverKey: "bolaloca", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://bolaloca.my/player/capo/57", logo: "https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png" },
            { id: 63, name: "Dazn 3", server: "daddylive", serverKey: "daddylive", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://dlhd.st/watch/stream-447.php", logo: "https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png" },
            { id: 64, name: "Dazn 3", server: "zonatv", serverKey: "zonatv", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://zonatv.space/canales/dazn3/", logo: "https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png" },
            { id: 65, name: "Dazn 3", server: "embedme", serverKey: "embedme", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://embedme.click/player/3/58", logo: "https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png" },
            { id: 66, name: "Dazn 3", server: "bolaloca", serverKey: "bolaloca", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://bolaloca.my/player/capo/58", logo: "https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png" },
            { id: 67, name: "Dazn 4", server: "daddylive", serverKey: "daddylive", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://dlhd.st/watch/stream-448.php", logo: "https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png" },
            { id: 68, name: "Dazn 4", server: "zonatv", serverKey: "zonatv", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://zonatv.space/canales/dazn4/", logo: "https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png" },
            { id: 69, name: "Dazn 4", server: "embedme", serverKey: "embedme", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://embedme.click/player/3/59", logo: "https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png" },
            { id: 70, name: "Dazn 4", server: "bolaloca", serverKey: "bolaloca", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://bolaloca.my/player/capo/59", logo: "https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png" },
            { id: 71, name: "Dazn F1", server: "daddylive", serverKey: "daddylive", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://dlhd.st/watch/stream-537.php", logo: "https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png" },
            { id: 72, name: "Dazn F1", server: "zonatv", serverKey: "zonatv", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://zonatv.space/canales/formula1/", logo: "https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png" },
            { id: 73, name: "Dazn F1", server: "embedme", serverKey: "embedme", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://embedme.click/player/3/60", logo: "https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png" },
            { id: 74, name: "Dazn F1", server: "bolaloca", serverKey: "bolaloca", category: "Zona Dazn", categoryLabel: "Zona Dazn", url: "https://bolaloca.my/player/capo/60", logo: "https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png" },
// CANALES LATINOS
            { id: 75, name: "Dsports 1", server: "latamplay1", serverKey: "latamplay1", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://latamplay1.click/channel/dsports.html", logo: "https://i.postimg.cc/43NYNsBZ/DSports.png" },
            { id: 76, name: "Dsports 1", server: "embedme", serverKey: "embedme", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://embedme.click/player/3/94", logo: "https://i.postimg.cc/43NYNsBZ/DSports.png" },
            { id: 77, name: "Dsports 1", server: "bolaloca", serverKey: "bolaloca", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://bolaloca.my/player/capo/94", logo: "https://i.postimg.cc/43NYNsBZ/DSports.png" },
            { id: 78, name: "Dsports 1", server: "tvporint", serverKey: "tvporint", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://www.tvporinternet2.com/directv-sports-en-vivo-por-internet.html", logo: "https://i.postimg.cc/43NYNsBZ/DSports.png" },
            { id: 79, name: "Dsports 2", server: "embedme", serverKey: "embedme", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://embedme.click/player/3/95", logo: "https://i.postimg.cc/fyFcYkqx/DSports2.png" },
            { id: 80, name: "Dsports 2", server: "bolaloca", serverKey: "bolaloca", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://bolaloca.my/player/capo/95", logo: "https://i.postimg.cc/fyFcYkqx/DSports2.png" },
            { id: 81, name: "Dsports 2", server: "tvporint", serverKey: "tvporint", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://www.tvporinternet2.com/directv-sports-2-en-vivo-por-internet.html", logo: "https://i.postimg.cc/fyFcYkqx/DSports2.png" },
            { id: 82, name: "Espn 1", server: "daddylive", serverKey: "daddylive", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://dlhd.st/watch/stream-149.php", logo: "https://i.postimg.cc/pXY3gZTy/ESPN1.png" },
            { id: 83, name: "Espn 1", server: "zonatv", serverKey: "zonatv", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://zonatv.space/canales/espn/op2.php", logo: "https://i.postimg.cc/pXY3gZTy/ESPN1.png" },
            { id: 84, name: "Espn 1", server: "embedme", serverKey: "embedme", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://embedme.click/player/3/87", logo: "https://i.postimg.cc/pXY3gZTy/ESPN1.png" },
            { id: 85, name: "Espn 1", server: "bolaloca", serverKey: "bolaloca", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://bolaloca.my/player/capo/87", logo: "https://i.postimg.cc/pXY3gZTy/ESPN1.png" },
            { id: 86, name: "Espn 1", server: "tvporint", serverKey: "tvporint", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://www.tvporinternet2.com/espn-en-vivo-por-internet.html", logo: "https://i.postimg.cc/pXY3gZTy/ESPN1.png" },
            { id: 87, name: "Espn 2", server: "daddylive", serverKey: "daddylive", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://dlhd.st/watch/stream-150.php", logo: "https://i.postimg.cc/43kY0sFz/ESPN2.png" },
            { id: 88, name: "Espn 2", server: "zonatv", serverKey: "zonatv", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://zonatv.space/canales/espn2/op2.php", logo: "https://i.postimg.cc/43kY0sFz/ESPN2.png" },
            { id: 89, name: "Espn 2", server: "embedme", serverKey: "embedme", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://embedme.click/player/3/88", logo: "https://i.postimg.cc/43kY0sFz/ESPN2.png" },
            { id: 90, name: "Espn 2", server: "bolaloca", serverKey: "bolaloca", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://bolaloca.my/player/capo/88", logo: "https://i.postimg.cc/43kY0sFz/ESPN2.png" },
            { id: 91, name: "Espn 2", server: "tvporint", serverKey: "tvporint", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://www.tvporinternet2.com/espn-2-en-vivo-por-internet.html", logo: "https://i.postimg.cc/43kY0sFz/ESPN2.png" },
            { id: 92, name: "Espn 3", server: "embedme", serverKey: "embedme", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://embedme.click/player/3/89", logo: "https://i.postimg.cc/fyf4Mjwz/ESPN3.png" },
            { id: 93, name: "Espn 3", server: "bolaloca", serverKey: "bolaloca", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://bolaloca.my/player/capo/89", logo: "https://i.postimg.cc/fyf4Mjwz/ESPN3.png" },
            { id: 94, name: "Espn 3", server: "tvporint", serverKey: "tvporint", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://www.tvporinternet2.com/espn-3-en-vivo-por-internet.html", logo: "https://i.postimg.cc/fyf4Mjwz/ESPN3.png" },
            { id: 95, name: "Fox Sports 1", server: "daddylive", serverKey: "daddylive", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://dlhd.st/watch/stream-767.php", logo: "https://i.postimg.cc/15jNWQjC/foxsport-AR.png" },
            { id: 96, name: "Fox Sports 1", server: "zonatv", serverKey: "zonatv", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://gollibre.com/total/stream-767.php", logo: "https://i.postimg.cc/15jNWQjC/foxsport-AR.png" },
            { id: 97, name: "Fox Sports 1", server: "embedme", serverKey: "embedme", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://embedme.click/player/3/78", logo: "https://i.postimg.cc/15jNWQjC/foxsport-AR.png" },
            { id: 98, name: "Fox Sports 1", server: "bolaloca", serverKey: "bolaloca", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://bolaloca.my/player/capo/78", logo: "https://i.postimg.cc/15jNWQjC/foxsport-AR.png" },
            { id: 99, name: "Fox Sports 1", server: "tvporint", serverKey: "tvporint", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://www.tvporinternet2.com/fox-sports-en-vivo-por-internet.html", logo: "https://i.postimg.cc/15jNWQjC/foxsport-AR.png" },
            { id: 100, name: "Fox Sports 2", server: "daddylive", serverKey: "daddylive", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://dlhd.st/watch/stream-788.php", logo: "https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png" },
            { id: 101, name: "Fox Sports 2", server: "zonatv", serverKey: "zonatv", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://zonatv.space/canales/fox-sports2/op2.php", logo: "https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png" },
            { id: 102, name: "Fox Sports 2", server: "embedme", serverKey: "embedme", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://embedme.click/player/3/79", logo: "https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png" },
            { id: 103, name: "Fox Sports 2", server: "bolaloca", serverKey: "bolaloca", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://bolaloca.my/player/capo/79", logo: "https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png" },
            { id: 104, name: "Fox Sports 2", server: "tvporint", serverKey: "tvporint", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://www.tvporinternet2.com/fox-sports-2-en-vivo-por-internet.html", logo: "https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png" },
            { id: 105, name: "Fox Sports 3", server: "daddylive", serverKey: "daddylive", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://dlhd.st/watch/stream-789.php", logo: "https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png" },
            { id: 106, name: "Fox Sports 3", server: "embedme", serverKey: "embedme", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://embedme.click/player/3/80", logo: "https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png" },
            { id: 107, name: "Fox Sports 3", server: "bolaloca", serverKey: "bolaloca", category: "Canales Latinos", categoryLabel: "Canales Latinos", url: "https://bolaloca.my/player/capo/80", logo: "https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png" }];




        let currentCategory = 'all';

        function renderChannels(category) {
            const grid = document.getElementById('channelsGrid');
            const counter = document.getElementById('visibleCounter');
            const sectionTitle = document.getElementById('currentSectionTitle');
            
            grid.innerHTML = '';

            const filtered = category === 'all' 
                ? CHANNELS_DATA 
                : CHANNELS_DATA.filter(ch => ch.category === category);

            counter.textContent = `Mostrando ${filtered.length} canales`;

            if (category !== 'all') {
                const activeBtn = document.querySelector(`.menu-cat-btn[data-category="${category}"]`);
                const catName = activeBtn ? activeBtn.querySelector('.menu-cat-name').textContent : category;
                sectionTitle.innerHTML = `<i class="fa-solid fa-layer-group"></i><span>${catName}</span>`;
            } else {
                sectionTitle.innerHTML = `<i class="fa-solid fa-layer-group"></i><span>Todos los Canales</span>`;
            }

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state">
                        <i class="fa-solid fa-face-sad-tear"></i>
                        <h3>No hay canales disponibles</h3>
                        <p>Prueba a seleccionar otra categoría desde el menú superior.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(channel => {
                const card = document.createElement('div');
                card.className = 'channel-card';
                card.setAttribute('data-id', channel.id);
                card.setAttribute('tabindex', '0');
                
                card.innerHTML = `
                    <div class="card-logo-container">
                        <img src="${channel.logo}" alt="${channel.name}" class="card-logo" loading="lazy">
                    </div>
                    <div class="card-info">
                        <span class="card-channel-name">${channel.name}</span>
                        <span class="card-category-name">${channel.categoryLabel}</span>
                        <span class="server-badge ${channel.serverKey}">
                            <i class="fa-solid fa-server"></i> ${channel.server}
                        </span>
                    </div>
                `;

                card.addEventListener('click', () => {
                    openChannelInNewPage(channel);
                });

                grid.appendChild(card);
            });
        }

        function openChannelInNewPage(channel) {
            const playerWindow = window.open('', '_blank');
            if (!playerWindow) return;

            const isM3U8 = channel.url.includes('.m3u8') || channel.type === 'm3u8';

            playerWindow.document.write(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${channel.name} - Deportes ERB</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
                    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"><\/script>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body, html {
                            width: 100%;
                            height: 100%;
                            background-color: #0b0f19;
                            font-family: 'Plus Jakarta Sans', sans-serif;
                            color: #f8fafc;
                            display: flex;
                            flex-direction: column;
                            overflow: hidden;
                        }
                        .player-header {
                            background: rgba(11, 15, 25, 0.95);
                            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                            padding: 10px 16px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            gap: 10px;
                            flex-shrink: 0;
                        }
                        .header-left {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            justify-content: flex-start;
                        }
                        .header-right {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        }
                        .channel-logo-wrap {
                            width: 40px;
                            height: 40px;
                            background: #ffffff;
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 4px;
                            flex-shrink: 0;
                        }
                        .channel-logo-wrap img {
                            max-width: 100%;
                            max-height: 100%;
                            object-fit: contain;
                        }
                        .channel-meta {
                            display: flex;
                            flex-direction: column;
                            gap: 2px;
                            align-items: flex-start;
                        }
                        .channel-name {
                            font-size: 0.95rem;
                            font-weight: 700;
                            color: #ffffff;
                            line-height: 1.2;
                        }
                        .server-tag {
                            display: inline-flex;
                            align-items: center;
                            gap: 4px;
                            font-size: 0.7rem;
                            font-weight: 700;
                            text-transform: uppercase;
                            color: #00d2ff;
                            background: rgba(0, 210, 255, 0.1);
                            padding: 2px 6px;
                            border-radius: 4px;
                        }
                        .player-btn {
                            background: rgba(255, 255, 255, 0.06);
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            color: #f8fafc;
                            padding: 6px 12px;
                            border-radius: 8px;
                            font-size: 0.8rem;
                            font-weight: 600;
                            display: inline-flex;
                            align-items: center;
                            gap: 6px;
                            cursor: pointer;
                            text-decoration: none;
                            transition: background 0.2s;
                        }
                        .player-btn:hover {
                            background: rgba(255, 255, 255, 0.12);
                        }
                        
                        /* Marco envolvente adaptable para el reproductor */
                        .player-wrapper-outer {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 15px;
                            background: #0b0f19;
                            width: 100%;
                            height: calc(100vh - 61px);
                            overflow: hidden;
                        }

                        .iframe-container {
                            width: 100%;
                            height: 100%;
                            max-width: 100%;
                            max-height: 100%;
                            background: #000;
                            position: relative;
                            border-radius: 12px;
                            border: 2px solid rgba(0, 210, 255, 0.3);
                            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 210, 255, 0.15);
                            overflow: hidden;
                            display: flex;
                            flex-direction: column;
                        }

                        iframe, video {
                            width: 100%;
                            height: 100%;
                            border: none;
                            flex: 1;
                            object-fit: contain; /* Adapta y escala el video perfectamente */
                            background: #000;
                        }

                        @media (max-width: 768px) {
                            .player-header {
                                flex-direction: column;
                                align-items: stretch;
                                padding: 10px;
                                gap: 8px;
                            }
                            .header-right {
                                width: 100%;
                                display: flex;
                                justify-content: flex-end;
                            }
                            .player-btn {
                                flex: 1;
                                justify-content: center;
                            }
                            .player-wrapper-outer {
                                padding: 5px;
                                height: calc(100vh - 100px);
                            }
                        }
                    </style>
                </head>
                <body>
                    <header class="player-header">
                        <div class="header-left">
                            <div class="channel-logo-wrap">
                                <img src="${channel.logo}" alt="${channel.name}">
                            </div>
                            <div class="channel-meta">
                                <span class="channel-name">${channel.name}</span>
                                <span class="server-tag"><i class="fa-solid fa-server"></i> ${channel.server}</span>
                            </div>
                        </div>
                        <div class="header-right">
                            <a href="javascript:window.close();" class="player-btn">
                                <i class="fa-solid fa-arrow-left"></i> Volver
                            </a>
                        </div>
                    </header>
                    <div class="player-wrapper-outer">
                        <div class="iframe-container" id="iframeContainer">
                            ${isM3U8 
                                ? `<video id="videoPlayer" controls autoplay playsinline></video>` 
                                : `<iframe src="${channel.url}" allowfullscreen allow="encrypted-media; picture-in-picture"></iframe>`
                            }
                        </div>
                    </div>

                    ${isM3U8 ? `
                    <script>
                        const video = document.getElementById('videoPlayer');
                        const videoSrc = "${channel.url}";
                        if (Hls.isSupported()) {
                            const hls = new Hls();
                            hls.loadSource(videoSrc);
                            hls.attachMedia(video);
                            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                video.play().catch(e => console.log("Autoplay bloqueado:", e));
                            });
                        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                            video.src = videoSrc;
                            video.addEventListener('loadedmetadata',function() {
                                video.play().catch(e => console.log("Autoplay bloqueado:", e));
                            });
                        }
                    <\/script>` : ''}
                </body>
                </html>
            `);
            playerWindow.document.close();
        }

        function filterCategory(category) {
            currentCategory = category;
            
            // Remueve la clase active de todas las categorías y la asigna únicamente a la seleccionada
            document.querySelectorAll('.menu-cat-btn').forEach(btn => {
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            renderChannels(category);
        }

        function toggleDeviceMode() {
            const body = document.body;
            const icon = document.getElementById('deviceModeIcon');
            const text = document.getElementById('deviceModeText');
            const btn = document.getElementById('deviceModeBtn');

            if (!body.classList.contains('mode-tv') && !body.classList.contains('mode-mobile')) {
                body.classList.add('mode-tv');
                icon.className = 'fa-solid fa-tv';
                text.textContent = 'Modo: TV';
                btn.classList.add('active');
            } else if (body.classList.contains('mode-tv')) {
                body.classList.remove('mode-tv');
                body.classList.add('mode-mobile');
                icon.className = 'fa-solid fa-mobile-screen-button';
                text.textContent = 'Modo: MÓVIL';
            } else {
                body.classList.remove('mode-mobile');
                icon.className = 'fa-solid fa-desktop';
                text.textContent = 'Modo: PC';
                btn.classList.remove('active');
            }
        }

        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error al activar pantalla completa: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

       document.addEventListener('DOMContentLoaded', () => {
            // Detección automática de dispositivo móvil
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
            
            if (isMobileDevice) {
                const body = document.body;
                const icon = document.getElementById('deviceModeIcon');
                const text = document.getElementById('deviceModeText');
                
                body.classList.add('mode-mobile');
                if (icon && text) {
                    icon.className = 'fa-solid fa-mobile-screen-button';
                    text.textContent = 'Modo: MÓVIL';
                }
            }

            renderChannels('all');
            setupKeyboardNavigation();
        });


	   function setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && document.activeElement.classList.contains('channel-card')) {
                    const id = parseInt(document.activeElement.getAttribute('data-id'));
                    const channel = CHANNELS_DATA.find(ch => ch.id === id);
                    if (channel) openChannelInNewPage(channel);
                }
            });
        }
    </script>
</body>
</html>
