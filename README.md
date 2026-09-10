<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DEPORTES ERB</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: red;
            background-image: url('https://i.postimg.cc/kXmwrWPN/fondo-web.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            background-attachment: fixed;
            color: white;
            line-height: 1.6;
            padding: 20px;
        }

        /* Encabezado fijo superior */
        header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            padding: 10px 10px;
            text-align: center;
            z-index: 1000;
        }

        header h1 {
            font-size: 1.3rem;
            color: white;
            margin-bottom: 0;
        }

        /* Página de selección inicial (Superpuesta tipo pantalla completa) */
        #pagina-inicio {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(8px);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            padding: 30px 20px;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        #pagina-inicio.hidden-start {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        /* Sección fija del título en la página de inicio */
        .start-header-fixed {
            flex-shrink: 0;
            text-align: center;
            margin-bottom: 25px;
        }

        .welcome-title {
            font-size: 2.2rem;
            color: #fff;
            text-align: center;
            text-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }

        /* Contenedor con scroll independiente para las tarjetas de categorías */
        .start-scroll-container {
            flex-grow: 1;
            overflow-y: auto;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-bottom: 20px;
        }

        /* Contenedor en cuadrícula adaptativo para el menú inicial */
        .start-menu-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 20px;
            width: 110%;
            max-width: 1100px;
        }

        .btn-start-menu {
            background: linear-gradient(135deg, #ff6b6b, #ee5253);
            color: white;
            border: none;
            padding: 20px 15px;
            border-radius: 20px;
            font-size: 22px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            transition: transform 0.2s, background 0.2s;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 140px;
            width: 100%;
        }

        .btn-start-menu:hover {
            transform: scale(1.03);
            background: linear-gradient(135deg, #ee5253, #d63031);
        }

        .categoria-inicio-nombre {
            font-size: 22px;
            font-weight: bold;
            margin-top: 5px;
            line-height: 1.2;
        }

        .btn-start-menu img {
            max-width: 80%;
            height: auto;
            object-fit: contain;
        }

        /* Menú de navegación superior modificado: Izquierda (Logo + Categoría) y Derecha (Botón) */
        .nav-container {
            position: fixed;
            top: 45px;
            left: 0;
            width: 100%;
            background-color: #34495e;
            padding: 8px 15px;
            z-index: 999;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-left-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .nav-logo {
            width: 60px;
            height: 40px;
            object-fit: contain;
            border-radius: 4px;
        }

        .btn-nav {
            background-color: #ff6b6b;
            color: LightBlue;
            border: none;
            text-decoration: none;
            padding: 6px 14px;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            font-size: 18px;
        }

        /* Botón para volver al menú de categorías inicial */
        .btn-volver-menu {
            background-color: #2c3e50;
        }
        .btn-volver-menu:hover {
            background-color: red;
        }

        /* Estilo para mostrar el nombre de la categoría actual */
        .categoria-actual-label {
            font-size: 1.5rem;
            font-weight: bold;
            color: #f1c40f;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Contenedor de Tarjetas */
        .cards-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            padding: 110px 20px 40px; 
            max-width: 1500px;
            margin: 0 auto;
        }

        /* Diseño de cada tarjeta de canal */
        .card {
            border: 2px solid blue;
            background: lightblue;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            width: 150px;
            padding: 8px;
            text-align: center;
            text-decoration: none;
            color: #333;
            transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .card:hover {
            background-color: yellow;
            transform: scale(1.08);
        }

        .card img {
            width: 100px;
            height: auto;
            object-fit: contain;
            margin-bottom: 5px;
        }

        .card .card-title {
            font-size: 14px;
            font-weight: bold;
            color: #333;
        }

        .card p {
            font-size: 13px;
            color: #555;
            word-break: break-all;
            margin-top: 2px;
        }

        /* Pantalla de Reproducción con Marco de Plata pequeño */
        #pantalla-reproduccion {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            z-index: 3000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .marco-reproduccion {
            position: relative;
            width: 100%;
            max-width: 1500px;
            height: 100vh;
            background: #111;
            border: 3px solid #c0c0c0;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.7);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            padding-top: 55px;
        }

        /* Info superior izquierda dentro del marco */
        .info-reproduccion-header {
            position: absolute;
            top: 8px;
            left: 10px;
            padding: 6px 10px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10;
        }

        .info-reproduccion-header img {
            width: 55px;
            height: 45px;
            object-fit: contain;
        }

        .info-texto {
            display: flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
        }

        .info-texto h3 {
            font-size: 20px;
            color: #fff;
            margin: 0;
            line-height: 1.2;
        }

        .info-texto span {
            font-size: 14px;
            color: #ccc;
            margin: 0;
        }

        /* Botón Cerrar arriba a la derecha dentro del marco */
        .btn-cerrar-reproduccion {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 6px 14px;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10;
            font-size: 12px;
        }

        .btn-cerrar-reproduccion:hover {
            background: #ee5253;
        }

        .marco-reproduccion iframe {
            width: 100%;
            height: 100%;
            border: none;
            background: black;
        }

        /* Utilidad para ocultar secciones */
        .hidden {
            display: none !important;
        }

        /* ADAPTACIÓN ESPECÍFICA PARA TABLETS (entre 768px y 1024px) */
        @media (min-width: 768px) and (max-width: 1024px) {
            .start-menu-container {
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 15px;
                width: 100%;
            }
            .btn-start-menu {
                min-height: 120px;
                padding: 15px 10px;
                font-size: 16px;
                border-radius: 15px;
            }
            .categoria-inicio-nombre {
                font-size: 16px;
            }
            .welcome-title {
                font-size: 1.8rem;
            }
        }

        /* Responsividad para móviles modificada */
        @media (max-width: 768px) {
            .info-reproduccion-header {
                padding: 5px 8px;
                gap: 8px;
                max-width: calc(100vw - 50px);
            }

            .info-reproduccion-header img {
                width: 38px;
                height: 38px;
            }

            .info-texto {
                gap: 6px;
            }

            .info-texto h3 {
                font-size: 14px;
            }

            .info-texto span {
                font-size: 12px;
            }

            body {
                padding: 10px;
            }
            header h1 {
                font-size: 0.95rem;
            }
            .nav-container {
                top: 38px;
                padding: 6px 10px;
            }
            .nav-logo {
                width: 24px;
                height: 24px;
            }
            .categoria-actual-label {
                font-size: 0.85rem;
            }
            .cards-container {
                padding-top: 105px;
                gap: 8px;
            }
            .cards-container .card {
                width: calc(50% - 6px);
                max-width: none;
            }
            .start-menu-container {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 10px;
            }
            .btn-start-menu {
                min-height: 110px;
                padding: 12px 8px;
                font-size: 18px;
            }
            .categoria-inicio-nombre {
                font-size: 18px;
            }
            #pantalla-reproduccion {
                padding: 10px 5px;
            }
            .marco-reproduccion {
                height: 75vh;
                max-width: 100%;
                border-width: 2px;
                padding-top: 50px;
            }
            .btn-cerrar-reproduccion {
                padding: 5px 10px;
                font-size: 11px;
            }
        }
    </style>

<style id="ajuste-encabezado-movil">
@media (max-width: 768px) {
    #pagina-inicio header,
    #pagina-inicio .header,
    #pagina-inicio .encabezado {
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        min-height: 0 !important;
    }

    #pagina-inicio h1,
    #pagina-inicio .logo-text,
    #pagina-inicio .titulo,
    #pagina-inicio .brand-title {
        font-size: 24px !important;
        line-height: 1.1 !important;
    }
}
</style>

</head>
<body>

    <div id="pagina-inicio">
        <div class="start-header-fixed">
            <h2 class="welcome-title">DEPORTES ERB</h2>
        </div>
        <div class="start-scroll-container">
            <div class="start-menu-container">
                <button class="btn-start-menu" onclick="seleccionarCategoriaInicio('todos', 'Todos los Canales', 'https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png')"><img src="https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png" alt="Mi Logo" width="230" height="auto"><span class="categoria-inicio-nombre">Todos los Canales</button>
                <button class="btn-start-menu" onclick="seleccionarCategoriaInicio('La Liga', 'La Liga', 'https://i.postimg.cc/VsF4nL28/La-Liga.png')"><img src="https://i.postimg.cc/VsF4nL28/La-Liga.png" alt="Mi Logo" width="230" height="auto"><span class="categoria-inicio-nombre">La Liga</span></button> 
                <button class="btn-start-menu" onclick="seleccionarCategoriaInicio('Champions League', 'Champions League', 'https://i.postimg.cc/HxpVrP34/Champions-League.png')"><img src="https://i.postimg.cc/HxpVrP34/Champions-League.png" alt="Mi Logo" width="230" height="auto"><span class="categoria-inicio-nombre">Champions League</span></button>
                <button class="btn-start-menu" onclick="seleccionarCategoriaInicio('Liga ACB', 'Liga ACB', 'https://i.postimg.cc/HscGzrMV/Liga-ACB.png')"><img src="https://i.postimg.cc/HscGzrMV/Liga-ACB.png" alt="Mi Logo" width="230" height="auto"><span class="categoria-inicio-nombre">Liga ACB</span></button>
                <button class="btn-start-menu" onclick="seleccionarCategoriaInicio('Euroliga', 'Euroliga', 'https://basketpasion.es/wp-content/uploads/2022/06/euroleague-basketball-1300.webp')"><img src="https://basketpasion.es/wp-content/uploads/2022/06/euroleague-basketball-1300.webp" alt="Mi Logo" width="230" height="auto"><span class="categoria-inicio-nombre">Euroliga</span></button>
                <button class="btn-start-menu" onclick="seleccionarCategoriaInicio('Zona Dazn', 'Zona Dazn', 'https://i.postimg.cc/bJt15wh9/Zona-Dazn.png')"><img src="https://i.postimg.cc/bJt15wh9/Zona-Dazn.png" alt="Mi Logo" width="230" height="auto"><span class="categoria-inicio-nombre">Zona Dazn</span></button>
                <button class="btn-start-menu" onclick="seleccionarCategoriaInicio('Canales Latinos', 'Canales Latinos', 'https://i.postimg.cc/cCWt57Td/Canales-Latinoamerica.png')"><img src="https://i.postimg.cc/cCWt57Td/Canales-Latinoamerica.png" alt="Mi Logo" width="230" height="auto"><span class="categoria-inicio-nombre">Canales Latinos</span></button>
            </div>
        </div>
    </div>


    <header>
        <h1>DEPORTES ERB</h1>
    </header>

    <!-- Barra de navegación modificada -->
    <div class="nav-container">
        <div class="nav-left-group">
            <img id="nav-logo-img" src="https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png" alt="Logo Categoría" class="nav-logo">
            <span id="categoria-actual" class="categoria-actual-label">Todos</span>
        </div>
        <button class="btn-nav btn-volver-menu" onclick="mostrarPaginaInicio()">Menú Categorías</button>
    </div>

    <div class="cards-container" id="container-tarjetas">

<a href="https://sportzonline.click/channels/hd/hd6.php" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'LaLiga/Dazn', '(sportzonline)', 'https://i.postimg.cc/nr8tQ8cX/La-Liga-Tv-Dazn-La-Liga.png'); return false;"><img src="https://i.postimg.cc/nr8tQ8cX/La-Liga-Tv-Dazn-La-Liga.png"><div class="card-body"><div class="card-title">LaLiga/Dazn<p>(sportzonline)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-84.php" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'M. LaLiga', '(daddylive)', 'https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png'); return false;"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/laliga/" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'M. LaLiga', '(zonatv)', 'https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png'); return false;"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/4" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'M. LaLiga', '(zicotv)', 'https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png'); return false;"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/49" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'M. LaLiga', '(embedme)', 'https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png'); return false;"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/49" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'M. LaLiga', '(bolaloca)', 'https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png'); return false;"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/movistar-la-liga-en-vivo-por-internet.html" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'M. LaLiga', '(tvporint)', 'https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png'); return false;"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(tvporint)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-538.php" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Dazn LaLiga', '(daddylive)', 'https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png'); return false;"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/dazn-laliga/" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Dazn LaLiga', '(zonatv)', 'https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png'); return false;"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/1" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Dazn LaLiga', '(zicotv)', 'https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png'); return false;"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/51" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Dazn LaLiga', '(embedme)', 'https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png'); return false;"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/51" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Dazn LaLiga', '(bolaloca)', 'https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png'); return false;"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/dazn-la-liga-en-vivo-por-internet.html" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Dazn LaLiga', '(tvporint)', 'https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png'); return false;"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(tvporint)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-375.php" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Espn Deportes', '(daddylive)', 'https://i.postimg.cc/4dPchzfK/Espn-deportes.png'); return false;"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/espn-deportes/" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Espn Deportes', '(zonatv)', 'https://i.postimg.cc/4dPchzfK/Espn-deportes.png'); return false;"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/10" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Espn Deportes', '(zicotv)', 'https://i.postimg.cc/4dPchzfK/Espn-deportes.png'); return false;"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/71" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Espn Deportes', '(embedme)', 'https://i.postimg.cc/4dPchzfK/Espn-deportes.png'); return false;"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(embedme)</p></div></div></a>
<a href="https://asiria.is/espndeportes.php" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Espn Deportes', '(asiria)', 'https://i.postimg.cc/4dPchzfK/Espn-deportes.png'); return false;"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(asiria)</p></div></div></a>
<a href="https://tx3.nexgen.bz:4000/ESPN_DEPORTES/index.m3u8" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Espn Deportes', '(nexgen)', 'https://i.postimg.cc/4dPchzfK/Espn-deportes.png'); return false;"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(nexgen)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/71" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Espn Deportes', '(bolaloca)', 'https://i.postimg.cc/4dPchzfK/Espn-deportes.png'); return false;"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(bolaloca)</p></div></div></a>
<a href="http://45.228.234.30:16000/play/a03h/index.m3u8" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Sky S. LaLiga', '(a03h)', 'https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png'); return false;"><img src="https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Sky S. LaLiga<p>(a03h)</p></div></div></a>
<a href="https://www.tvporinternet.org/sky-sports-la-liga-en-vivo-por-internet.html" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Sky S. LaLiga', '(tvporint)', 'https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png'); return false;"><img src="https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Sky S. LaLiga<p>(tvporint)</p></div></div></a>
<a href="https://livetv.sx/es/competitions/15/" class="card" data-categoria="La Liga" onclick="abrirReproductor(this, this.href, 'Página Web LaLiga', '(livetv)', 'https://i.postimg.cc/FRTD23wN/Pagina-Web-La-Liga.png'); return false;"><img src="https://i.postimg.cc/FRTD23wN/Pagina-Web-La-Liga.png"><div class="card-body"><div class="card-title">Página Web LaLiga<p>(livetv)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-435.php" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'L. Campeones', '(daddylive)', 'https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png'); return false;"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/campeones/" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'L. Campeones', '(zonatv)', 'https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png'); return false;"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/6" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'L. Campeones', '(zicotv)', 'https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png'); return false;"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/61" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'L. Campeones', '(embedme)', 'https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png'); return false;"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/61" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'L. Campeones', '(bolaloca)', 'https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png'); return false;"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/movistar-liga-de-campeones-en-vivo-por-internet.html" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'L. Campeones', '(tvporint)', 'https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png'); return false;"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(tvporint)</p></div></div></a>
<a href="https://latamplay1.click/channel/tudnmx.html" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'Tudn', '(latamplay1)', 'https://i.postimg.cc/QtMLX404/TUDN-Logo.png'); return false;"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(latamplay1)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-66.php" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'Tudn', '(daddylive)', 'https://i.postimg.cc/QtMLX404/TUDN-Logo.png'); return false;"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/tudn/" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'Tudn', '(zonatv)', 'https://i.postimg.cc/QtMLX404/TUDN-Logo.png'); return false;"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(zonatv)</p></div></div></a>
<a href="https://embedme.click/player/3/68" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'Tudn', '(embedme)', 'https://i.postimg.cc/QtMLX404/TUDN-Logo.png'); return false;"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(embedme)</p></div></div></a>
<a href="http://45.5.117.57:8999/play/a04t/index.m3u8" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'Tudn', '(a04t)', 'https://i.postimg.cc/QtMLX404/TUDN-Logo.png'); return false;"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(a04t)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/68" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'Tudn', '(bolaloca)', 'https://i.postimg.cc/QtMLX404/TUDN-Logo.png'); return false;"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/tudn-en-vivo-por-internet.html" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'Tudn', '(tvporint)', 'https://i.postimg.cc/QtMLX404/TUDN-Logo.png'); return false;"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(tvporint)</p></div></div></a>
<a href="https://livetv.sx/es/competitions/7/" class="card" data-categoria="Champions League" onclick="abrirReproductor(this, this.href, 'Página Web Champions League', '(livetv)', 'https://i.postimg.cc/Hs0V3LQk/P-gina-Web-Champions-League.png'); return false;"><img src="https://i.postimg.cc/Hs0V3LQk/P-gina-Web-Champions-League.png"><div class="card-body"><div class="card-title">Página Web Champions League<p>(livetv)</p></div></div></a>
<a href="https://embedme.click/player/3/155" class="card" data-categoria="Liga ACB" onclick="abrirReproductor(this, this.href, 'ACB Dazn 1', '(embedme)', 'https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg'); return false;"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 1<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/155" class="card" data-categoria="Liga ACB" onclick="abrirReproductor(this, this.href, 'ACB Dazn 1', '(bolaloca)', 'https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg'); return false;"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 1<p>(bolaloca)</p></div></div></a>
<a href="https://embedme.click/player/3/156" class="card" data-categoria="Liga ACB" onclick="abrirReproductor(this, this.href, 'ACB Dazn 2', '(embedme)', 'https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg'); return false;"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 2<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/156" class="card" data-categoria="Liga ACB" onclick="abrirReproductor(this, this.href, 'ACB Dazn 2', '(bolaloca)', 'https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg'); return false;"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 2<p>(bolaloca)</p></div></div></a>
<a href="https://embedme.click/player/3/157" class="card" data-categoria="Liga ACB" onclick="abrirReproductor(this, this.href, 'ACB Dazn 3', '(embedme)', 'https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg'); return false;"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 3<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/157" class="card" data-categoria="Liga ACB" onclick="abrirReproductor(this, this.href, 'ACB Dazn 3', '(bolaloca)', 'https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg'); return false;"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 3<p>(bolaloca)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-932.php" class="card" data-categoria="Liga ACB" onclick="abrirReproductor(this, this.href, 'TVC Deportes', '(daddylive)', 'https://s3.superluchas.com/wp-content/uploads/20190320114903/tvc_deportes.png'); return false;"><img src="https://s3.superluchas.com/wp-content/uploads/20190320114903/tvc_deportes.png"><div class="card-body"><div class="card-title">TVC Deportes<p>(daddylive)</p></div></div></a>
<a href="https://livetv.sx/es/competitions/215/" class="card" data-categoria="Liga ACB" onclick="abrirReproductor(this, this.href, 'Página Web Liga ACB', '(livetv)', 'https://i.postimg.cc/hGNDKF9Y/P-gina-Web-Liga-ACB.png'); return false;"><img src="https://i.postimg.cc/hGNDKF9Y/P-gina-Web-Liga-ACB.png"><div class="card-body"><div class="card-title">Página Web Liga ACB<p>(livetv)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-437.php" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Movistar+', '(daddylive)', 'https://i.postimg.cc/Gtd7zdzm/movistar.png'); return false;"><img src="https://i.postimg.cc/Gtd7zdzm/movistar.png"><div class="card-body"><div class="card-title">Movistar+<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/canal-0/" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Movistar+', '(zonatv)', 'https://i.postimg.cc/Gtd7zdzm/movistar.png'); return false;"><img src="https://i.postimg.cc/Gtd7zdzm/movistar.png"><div class="card-body"><div class="card-title">Movistar+<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/28" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Movistar+', '(zicotv)', 'https://i.postimg.cc/Gtd7zdzm/movistar.png'); return false;"><img src="https://i.postimg.cc/Gtd7zdzm/movistar.png"><div class="card-body"><div class="card-title">Movistar+<p>(zicotv)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-436.php" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'M. Deportes 1', '(daddylive)', 'https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png'); return false;"><img src="https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 1<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/deportes/" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'M. Deportes 1', '(zonatv)', 'https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png'); return false;"><img src="https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 1<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/19" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'M. deportes 1', '(zicotv)', 'https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png'); return false;"><img src="https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png"><div class="card-body"><div class="card-title">M. deportes 1<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/62" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'M. Deportes 1', '(embedme)', 'https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png'); return false;"><img src="https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 1<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/62" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'M. Deportes 1', '(bolaloca)', 'https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png'); return false;"><img src="https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 1<p>(bolaloca)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-438.php" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'M. Deportes 2', '(daddylive)', 'https://i.postimg.cc/GhvMnHS2/movistar-deportes-2-Logo.png'); return false;"><img src="https://i.postimg.cc/GhvMnHS2/movistar-deportes-2-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 2<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/deportes2/" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'M. Deportes 2', '(zonatv)', 'https://i.postimg.cc/GhvMnHS2/movistar-deportes-2-Logo.png'); return false;"><img src="https://i.postimg.cc/GhvMnHS2/movistar-deportes-2-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 2<p>(zonatv)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-521.php" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Vamos', '(daddylive)', 'https://i.postimg.cc/mg44mdVP/Vamos-Logo.png'); return false;"><img src="https://i.postimg.cc/mg44mdVP/Vamos-Logo.png"><div class="card-body"><div class="card-title">Vamos<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/vamos/" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Vamos', '(zonatv)', 'https://i.postimg.cc/mg44mdVP/Vamos-Logo.png'); return false;"><img src="https://i.postimg.cc/mg44mdVP/Vamos-Logo.png"><div class="card-body"><div class="card-title">Vamos<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/9" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Vamos', '(zicotv)', 'https://i.postimg.cc/mg44mdVP/Vamos-Logo.png'); return false;"><img src="https://i.postimg.cc/mg44mdVP/Vamos-Logo.png"><div class="card-body"><div class="card-title">Vamos<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/55" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Vamos', '(embedme)', 'https://i.postimg.cc/mg44mdVP/Vamos-Logo.png'); return false;"><img src="https://i.postimg.cc/mg44mdVP/Vamos-Logo.png"><div class="card-body"><div class="card-title">Vamos<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/55" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Vamos', '(bolaloca)', 'https://i.postimg.cc/mg44mdVP/Vamos-Logo.png'); return false;"><img src="https://i.postimg.cc/mg44mdVP/Vamos-Logo.png"><div class="card-body"><div class="card-title">Vamos<p>(bolaloca)</p></div></div></a>
<a href="https://livetv.sx/es/competitions/41/" class="card" data-categoria="Euroliga" onclick="abrirReproductor(this, this.href, 'Página Web Euroliga', '(livetv)', 'https://i.postimg.cc/ry1V2Pzh/P-gina-Web-Euroliga.png'); return false;"><img src="https://i.postimg.cc/ry1V2Pzh/P-gina-Web-Euroliga.png"><div class="card-body"><div class="card-title">Página Web Euroliga<p>(livetv)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-445.php" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 1', '(daddylive)', 'https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/dazn1/" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 1', '(zonatv)', 'https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/2" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 1', '(zicotv)', 'https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/56" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 1', '(embedme)', 'https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/56" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 1', '(bolaloca)', 'https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(bolaloca)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-446.php" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 2', '(daddylive)', 'https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/dazn2/" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 2', '(zonatv)', 'https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/3" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 2', '(zicotv)', 'https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/57" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 2', '(embedme)', 'https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/57" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 2', '(bolaloca)', 'https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(bolaloca)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-447.php" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 3', '(daddylive)', 'https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 3<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/dazn3/" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 3', '(zonatv)', 'https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 3<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/34" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 3', '(zicotv)', 'https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 3<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/58" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 3', '(embedme)', 'https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 3<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/58" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 3', '(bolaloca)', 'https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 3<p>(bolaloca)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-448.php" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 4', '(daddylive)', 'https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 4<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/dazn4/" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 4', '(zonatv)', 'https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 4<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/37" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 4', '(zicotv)', 'https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 4<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/59" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 4', '(embedme)', 'https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 4<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/59" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn 4', '(bolaloca)', 'https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png'); return false;"><img src="https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 4<p>(bolaloca)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-537.php" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn F1', '(daddylive)', 'https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png'); return false;"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/formula1/" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn F1', '(zonatv)', 'https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png'); return false;"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(zonatv)</p></div></div></a>
<a href="https://zicotv.cc/api/player/11" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn F1', '(zicotv)', 'https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png'); return false;"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(zicotv)</p></div></div></a>
<a href="https://embedme.click/player/3/60" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn F1', '(embedme)', 'https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png'); return false;"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/60" class="card" data-categoria="Zona Dazn" onclick="abrirReproductor(this, this.href, 'Dazn F1', '(bolaloca)', 'https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png'); return false;"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(bolaloca)</p></div></div></a>
<a href="https://latamplay1.click/channel/dsports.html" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Dsports 1', '(latamplay1)', 'https://i.postimg.cc/43NYNsBZ/DSports.png'); return false;"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(latamplay1)</p></div></div></a>
<a href="https://embedme.click/player/3/94" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Dsports 1', '(embedme)', 'https://i.postimg.cc/43NYNsBZ/DSports.png'); return false;"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/94" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Dsports 1', '(bolaloca)', 'https://i.postimg.cc/43NYNsBZ/DSports.png'); return false;"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/directv-sports-en-vivo-por-internet.html" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Dsports 1', '(tvporint)', 'https://i.postimg.cc/43NYNsBZ/DSports.png'); return false;"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(tvporint)</p></div></div></a>
<a href="https://embedme.click/player/3/95" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Dsports 2', '(embedme)', 'https://i.postimg.cc/fyFcYkqx/DSports2.png'); return false;"><img src="https://i.postimg.cc/fyFcYkqx/DSports2.png"><div class="card-body"><div class="card-title">Dsports 2<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/95" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Dsports 2', '(bolaloca)', 'https://i.postimg.cc/fyFcYkqx/DSports2.png'); return false;"><img src="https://i.postimg.cc/fyFcYkqx/DSports2.png"><div class="card-body"><div class="card-title">Dsports 2<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/directv-sports-2-en-vivo-por-internet.html" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Dsports 2', '(tvporint)', 'https://i.postimg.cc/fyFcYkqx/DSports2.png'); return false;"><img src="https://i.postimg.cc/fyFcYkqx/DSports2.png"><div class="card-body"><div class="card-title">Dsports 2<p>(tvporint)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-149.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 1', '(daddylive)', 'https://i.postimg.cc/pXY3gZTy/ESPN1.png'); return false;"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/espn/op2.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 1', '(zonatv)', 'https://i.postimg.cc/pXY3gZTy/ESPN1.png'); return false;"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(zonatv)</p></div></div></a>
<a href="https://embedme.click/player/3/87" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 1', '(embedme)', 'https://i.postimg.cc/pXY3gZTy/ESPN1.png'); return false;"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/87" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 1', '(bolaloca)', 'https://i.postimg.cc/pXY3gZTy/ESPN1.png'); return false;"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/espn-en-vivo-por-internet.html" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 1', '(tvporint)', 'https://i.postimg.cc/pXY3gZTy/ESPN1.png'); return false;"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(tvporint)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-150.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 2', '(daddylive)', 'https://i.postimg.cc/43kY0sFz/ESPN2.png'); return false;"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/espn2/op2.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 2', '(zonatv)', 'https://i.postimg.cc/43kY0sFz/ESPN2.png'); return false;"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(zonatv)</p></div></div></a>
<a href="https://embedme.click/player/3/88" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 2', '(embedme)', 'https://i.postimg.cc/43kY0sFz/ESPN2.png'); return false;"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/88" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 2', '(bolaloca)', 'https://i.postimg.cc/43kY0sFz/ESPN2.png'); return false;"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/espn-2-en-vivo-por-internet.html" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 2', '(tvporint)', 'https://i.postimg.cc/43kY0sFz/ESPN2.png'); return false;"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(tvporint)</p></div></div></a>
<a href="https://embedme.click/player/3/89" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 3', '(embedme)', 'https://i.postimg.cc/fyf4Mjwz/ESPN3.png'); return false;"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/89" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 3', '(bolaloca)', 'https://i.postimg.cc/fyf4Mjwz/ESPN3.png'); return false;"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/espn-3-en-vivo-por-internet.html" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Espn 3', '(tvporint)', 'https://i.postimg.cc/fyf4Mjwz/ESPN3.png'); return false;"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(tvporint)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-767.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 1', '(daddylive)', 'https://i.postimg.cc/15jNWQjC/foxsport-AR.png'); return false;"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(daddylive)</p></div></div></a>
<a href="https://gollibre.com/total/stream-767.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 1', '(zonatv)', 'https://i.postimg.cc/15jNWQjC/foxsport-AR.png'); return false;"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(zonatv)</p></div></div></a>
<a href="https://embedme.click/player/3/78" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 1', '(embedme)', 'https://i.postimg.cc/15jNWQjC/foxsport-AR.png'); return false;"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/78" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 1', '(bolaloca)', 'https://i.postimg.cc/15jNWQjC/foxsport-AR.png'); return false;"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/fox-sports-en-vivo-por-internet.html" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 1', '(tvporint)', 'https://i.postimg.cc/15jNWQjC/foxsport-AR.png'); return false;"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(tvporint)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-788.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 2', '(daddylive)', 'https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png'); return false;"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(daddylive)</p></div></div></a>
<a href="https://zonatv.space/canales/fox-sports2/op2.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 2', '(zonatv)', 'https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png'); return false;"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(zonatv)</p></div></div></a>
<a href="https://embedme.click/player/3/79" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 2', '(embedme)', 'https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png'); return false;"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/79" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 2', '(bolaloca)', 'https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png'); return false;"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(bolaloca)</p></div></div></a>
<a href="https://www.tvporinternet.org/fox-sports-2-en-vivo-por-internet.html" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 2', '(tvporint)', 'https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png'); return false;"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(tvporint)</p></div></div></a>
<a href="https://dlhd.st/watch/stream-789.php" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 3', '(daddylive)', 'https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png'); return false;"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(daddylive)</p></div></div></a>
<a href="https://embedme.click/player/3/80" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 3', '(embedme)', 'https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png'); return false;"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(embedme)</p></div></div></a>
<a href="https://bolaloca.my/player/capo/80" class="card" data-categoria="Canales Latinos" onclick="abrirReproductor(this, this.href, 'Fox Sports 3', '(bolaloca)', 'https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png'); return false;"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(bolaloca)</p></div></div></a>

</div>

    <div id="pantalla-reproduccion" class="hidden">
        <div class="marco-reproduccion">
            <div class="info-reproduccion-header">
                <img id="repro-logo" src="" alt="Logo">
                <div class="info-texto">
                    <h3 id="repro-titulo">Nombre Canal</h3>
                    <span id="repro-servidor">Servidor</span>
                </div>
            </div>

            <button class="btn-cerrar-reproduccion" onclick="cerrarReproductor()">CERRAR</button>

            <iframe id="iframe-reproductor" src="" allowfullscreen></iframe>
        </div>
    </div>
	


    <script>
        function filtrarCategoria(categoria, nombreMostrado, logoUrl) {
            const tarjetas = document.querySelectorAll('.card');
            tarjetas.forEach(tarjeta => {
                if (categoria === 'todos' || tarjeta.getAttribute('data-categoria') === categoria) {
                    tarjeta.classList.remove('hidden');
                } else {
                    tarjeta.classList.add('hidden');
                }
            });
            document.getElementById('categoria-actual').textContent = nombreMostrado;
            
            // Actualizar también el logo pequeño de la barra superior si se proporciona
            if (logoUrl) {
                document.getElementById('nav-logo-img').src = logoUrl;
            }
        }

        function seleccionarCategoriaInicio(categoria, nombreMostrado, logoUrl) {
            document.getElementById('pagina-inicio').classList.add('hidden-start');
            filtrarCategoria(categoria, nombreMostrado, logoUrl);
        }

        function mostrarPaginaInicio() {
            document.getElementById('pagina-inicio').classList.remove('hidden-start');
        }

        // Funciones del reproductor integrado
        function abrirReproductor(elemento, url, titulo, servidor, logoUrl) {
            event.preventDefault();

            document.getElementById('repro-titulo').textContent = titulo;
            document.getElementById('repro-servidor').textContent = servidor;
            document.getElementById('repro-logo').src = logoUrl;

            document.getElementById('iframe-reproductor').src = url;

            document.getElementById('pantalla-reproduccion').classList.remove('hidden');
        }

        function cerrarReproductor() {
            document.getElementById('pantalla-reproduccion').classList.add('hidden');
            document.getElementById('iframe-reproductor').src = '';
        }
    </script>
</body>
</html>
