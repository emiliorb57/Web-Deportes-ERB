<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deportes ERB</title>
    <style>
        :root {
            --bg-color: #0f172a;
            --card-bg: #1e293b;
            --text-color: #f8fafc;
            --accent-color: #3b82f6;
            --accent-hover: #2563eb;
            --border-color: #334155;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 0;
        }

        /* Control de vistas (Página principal / Categorías vs Canales) */
        .vista {
            display: none;
        }

        .vista.activa {
            display: block;
        }

        /* Contenedor de la Página Principal (Categorías) */
        .home-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 15px 10px;
            text-align: center;
        }

        .home-container header {
            margin-bottom: 30px;
        }

        .home-container header h1 {
            font-size: 2.5rem;
            color: #60a5fa;
            margin: 0;
        }

        .home-container header p {
            color: #94a3b8;
            font-size: 1.1rem;
            margin-top: 10px;
        }

        /* Grid de categorías para la página principal */
        .grid-categorias-inicio {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            justify-content: center;
        }

        .btn-categoria-home {
            background-color: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: 12px;
            padding: 20px 15px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.2s, border-color 0.2s, background-color 0.2s;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .btn-categoria-home:hover {
            transform: translateY(-5px);
            border-color: var(--accent-color);
            background-color: #1e3a8a;
        }

        .btn-categoria-home img {
            border-radius: 6px;
            object-fit: contain;
            height: 80px;
            width: auto;
            margin-bottom: 12px;
        }

        .btn-categoria-home span {
            font-size: 1rem;
            font-weight: bold;
            color: var(--text-color);
        }

        /* Contenedor Superior Fijo (Vista de Canales) */
        .header-sticky-container {
            position: sticky;
            top: 0;
            background-color: black;
            z-index: 1000;
            padding: 10px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid var(--border-color);
        }

        .header-canales-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
        }

        .btn-volver {
            background-color: var(--card-bg);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            padding: 5px 10px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.2s, border-color 0.2s;
        }

        .btn-volver:hover {
            background-color: var(--accent-color);
            border-color: var(--accent-color);
        }

        .header-canales-top h2 {
            margin: 0;
            font-size: 1.5rem;
            color: #60a5fa;
        }

        /* Sección Informativa de la Categoría Filtrada */
        .seccion-titulo-container {
            max-width: 1200px;
            margin: 5px auto 0 auto;
            padding: 0 20px;
        }

        .seccion-titulo {
            font-size: 1.25rem;
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0;
        }

        #filtro-activo-txt {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60px;
        }

        #filtro-activo-txt img {
            height: 40px;
            width: auto;
            max-width: 180px;
            object-fit: contain;
            display: block;
        }

        /* Contenido Principal / Canales */
        .main-content {
            padding: 15px;
        }

        .contenedor-canales {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 10px;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* En móviles: tarjetas de la página principal en 2 columnas */
        @media (max-width: 768px) {
            .grid-categorias-inicio {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 12px;
            }

            .btn-categoria-home {
                padding: 14px 10px;
            }

            .btn-categoria-home img {
                height: 65px;
                max-width: 100%;
            }

            .btn-categoria-home span {
                font-size: 0.9rem;
            }
        }

        @media (max-width: 768px) {
            .contenedor-canales {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        .tarjeta-canal-link {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }

        .tarjeta-canal-link:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            border-color: var(--accent-color);
        }

        .tarjeta-canal-link img {
            width: 100%;
            height: 70px;
            object-fit: contain;
            background-color: #0f172a;
            padding: 6px 0;
        }

        .card-body {
            padding: 6px;
            background-color: var(--card-bg);
            border-top: 1px solid var(--border-color);
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }

        .card-title {        /*Texto del canal de las tarjetas*/
            font-size: 1rem;
            font-weight: normal;
            color: #f1f5f9;
        }

        .card-title p {       /*Texto del servidor de las tarjetas*/
            margin: 2px 0 0 0;
            font-size: 1rem;
            color: #94a3b8;
            font-weight: bold;
        }

        /* ESTILOS PARA LA PANTALLA DE REPRODUCTOR FLOTANTE */
        #reproductor-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;
        }

        #reproductor-overlay.activo {
            display: flex;
        }

        .reproductor-wrapper {
            position: relative;
            width: 100%;
            max-width: 1200px;
            height: 85vh;
            border: 1px solid silver; /* Marco de color plata fino */
            border-radius: 6px;
            background: #000;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(192, 192, 192, 0.2);
            display: flex;
            flex-direction: column;
        }

        .reproductor-wrapper iframe {
            width: 100%;
            height: 100%;
            border: none;
            flex-grow: 1;
        }

        /* Barra superior de controles del reproductor flotante */
        .reproductor-barra-superior {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            box-sizing: border-box;
            background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0));
            z-index: 10;
			margin-top: 40px;
            pointer-events: none; /* Permite clics solo en los elementos hijos interactivos */
        }

        .reproductor-barra-superior > * {
            pointer-events: auto;
        }

        /* Botones flotantes mejorados */
        .btn-flotante-info {
            background-color: rgba(0, 0, 0, 0.6);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            backdrop-filter: blur(4px);
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }

        .controles-derecha {
            display: flex;
            gap: 8px;
        }

        .btn-flotante-externo, .btn-flotante-cerrar {
            background-color: rgba(0, 0, 0, 0.6);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            cursor: pointer;
            backdrop-filter: blur(4px);
            transition: background-color 0.2s, border-color 0.2s;
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
        }

        .btn-flotante-externo:hover {
            background-color: rgba(59, 130, 246, 0.6);
            border-color: rgba(255, 255, 255, 0.6);
        }

        .btn-flotante-cerrar:hover {
            background-color: rgba(220, 38, 38, 0.6);
            border-color: rgba(255, 255, 255, 0.6);
        }
    </style>

<style id="ajuste-categoria-filtrada">
#filtro-activo-txt {
    gap: 14px;
}
#filtro-activo-txt .nombre-categoria {
    font-size: 1.7rem;
    font-weight: bold;
}
</style>

</head>
<body>

    <!-- ================= VISTA 1: PÁGINA PRINCIPAL (CATEGORÍAS) ================= -->
    <div id="vistaHome" class="vista activa">
        <div class="home-container">
            <header>
                <h1>Deportes ERB</h1>
                <p>Portal de Deportes en Directo</p>
            </header>

            <div class="grid-categorias-inicio">
                <button class="btn-categoria-home" onclick="cambiarVistaACanales('todos', 'Todos los Canales')">
                    <img src="https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png" alt="Todos los Canales">
                    <span>Todos los Canales</span>
                </button>
                <button class="btn-categoria-home" onclick="cambiarVistaACanales('La Liga', 'La Liga')">
                    <img src="https://i.postimg.cc/VsF4nL28/La-Liga.png" alt="La Liga">
                    <span>La Liga</span>
                </button> 
                <button class="btn-categoria-home" onclick="cambiarVistaACanales('Champions League', 'Champions League')">
                    <img src="https://i.postimg.cc/HxpVrP34/Champions-League.png" alt="Champions League">
                    <span>Champions League</span>
                </button>
                <button class="btn-categoria-home" onclick="cambiarVistaACanales('Liga ACB', 'Liga ACB')">
                    <img src="https://i.postimg.cc/HscGzrMV/Liga-ACB.png" alt="Liga ACB">
                    <span>Liga ACB</span>
                </button>
                <button class="btn-categoria-home" onclick="cambiarVistaACanales('Euroliga', 'Euroliga')">
                    <img src="https://basketpasion.es/wp-content/uploads/2022/06/euroleague-basketball-1300.webp" alt="Euroliga">
                    <span>Euroliga</span>
                </button>
                <button class="btn-categoria-home" onclick="cambiarVistaACanales('Zona Dazn', 'Zona Dazn')">
                    <img src="https://i.postimg.cc/bJt15wh9/Zona-Dazn.png" alt="Zona Dazn">
                    <span>Zona Dazn</span>
                </button>
                <button class="btn-categoria-home" onclick="cambiarVistaACanales('Canales Latinos', 'Canales Latinos')">
                    <img src="https://i.postimg.cc/cCWt57Td/Canales-Latinoamerica.png" alt="Canales Latinos">
                    <span>Canales Latinos</span>
                </button>
            </div>
        </div>
    </div>
	
    <!-- ================= VISTA 2: SECCIÓN DE CANALES Y ENLACES ================= -->
    <div id="vistaCanales" class="vista">
        <!-- CONTENEDOR FIJO SUPERIOR -->
        <div class="header-sticky-container">
            <div class="header-canales-top">
             <p style="text-align: center;"></p>  
                <h2>Deportes ERB</h2>
                <div style="width: 70px; text-align: center;"></div>
            </div>

            <!-- SECCION INFORMATIVA / TITULO DE FILTRADO -->
            <div class="seccion-titulo-container">
                <div class="seccion-titulo">
                    <span id="filtro-activo-txt"><img src="https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png" alt="Todos los Canales"><span>Todos los Canales</span></span>
					 <button class="btn-volver" onclick="volverAHome()">⬅Volver</button>
                </div>
            </div>
        </div>

        <!-- SECCION DE CANALES -->
        <div class="main-content">
            <div class="contenedor-canales" id="contenedorCanales">
                <!-- CANALES DENTRO DE TARJETAS -->
				
<!-- LA LIGA -->
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://sportzonline.click/channels/hd/hd6.php', 'LaLiga/Dazn', '(sportzonline)');"><img src="https://i.postimg.cc/nr8tQ8cX/La-Liga-Tv-Dazn-La-Liga.png"><div class="card-body"><div class="card-title">LaLiga/Dazn<p>(sportzonline)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=mlaliga', 'M. LaLiga', '(streamxhd)');"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=mlaliga', 'M. LaLiga', '(streamx305)');"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=laligatvbar', 'M. LaLiga', '(la18hd)');"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=84', 'M. LaLiga', '(daddylive)');"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://embedme.click/player/3/49', 'M. LaLiga', '(embedme)');"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/49', 'M. LaLiga', '(quellefrappe)');"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/movistarlaliga.php', 'M. LaLiga', '(latam)');"><img src="https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png"><div class="card-body"><div class="card-title">M. LaLiga<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=daznlaliga', 'Dazn Laliga', '(streamxhd)');"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn Laliga<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=daznlaliga', 'Dazn Laliga', '(streamx305)');"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn Laliga<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=dazn_laliga', 'Dazn Laliga', '(la18hd)');"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn Laliga<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=538', 'Dazn LaLiga', '(daddylive)');"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://embedme.click/player/3/51', 'Dazn LaLiga', '(embedme)');"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/51', 'Dazn LaLiga', '(quellefrappe)');"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/daznlaliga.php', 'Dazn LaLiga', '(latam)');"><img src="https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Dazn LaLiga<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=espndeportes', 'Espn Deportes', '(streamxhd)');"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=espndeportes', 'Espn Deportes', '(streamx305)');"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=espndeportes', 'Espn Deportes', '(la18hd)');"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=375', 'Espn Deportes', '(daddylive)');"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://embedme.click/player/3/71', 'Espn Deportes', '(embedme)');"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/71', 'Espn Deportes', '(quellefrappe)');"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://asiria.is/espndeportes.php', 'Espn Deportes', '(asiria)');"><img src="https://i.postimg.cc/4dPchzfK/Espn-deportes.png"><div class="card-body"><div class="card-title">Espn Deportes<p>(asiria)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://stream-xhd.com/live1.php?stream=sky_sports_laliga', 'Sky S. LaLiga', '(streamxhd)');"><img src="https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Sky S. LaLiga<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=sky_sports_laliga', 'Sky S. LaLiga', '(la18hd)');"><img src="https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png"><div class="card-body"><div class="card-title">Sky S. LaLiga<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="La Liga" onclick="abrirReproductor(event, 'https://livetv.sx/es/competitions/15/', 'Página Web LaLiga', '(livetv)');"><img src="https://i.postimg.cc/FRTD23wN/Pagina-Web-La-Liga.png"><div class="card-body"><div class="card-title">Página Web LaLiga<p>(livetv)</p></div></div></a>
<!-- CHAMPIONS LEAGUE -->
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=ligadecampeones1', 'L. Campeones', '(la18hd)');"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=435', 'L. Campeones', '(daddylive)');"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://embedme.click/player/3/61', 'L. Campeones', '(embedme)');"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/61', 'L. Campeones', '(quellefrappe)');"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/movistarligadecampeones.php', 'L. Campeones', '(latam)');"><img src="https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png"><div class="card-body"><div class="card-title">L. Campeones<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://latamplay1.click/channel/tudnmx.html', 'Tudn', '(latamplay1)');"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(latamplay1)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://stream-xhd.com/live1.php?stream=tudn_usa', 'Tudn', '(streamxhd)');"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=tudnus', 'Tudn', '(streamx305)');"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=tudn', 'Tudn', '(la18hd)');"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=66', 'Tudn', '(daddylive)');"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://embedme.click/player/3/68', 'Tudn', '(embedme)');"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/68', 'Tudn', '(quellefrappe)');"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/tudn.php', 'Tudn', '(latam)');"><img src="https://i.postimg.cc/QtMLX404/TUDN-Logo.png"><div class="card-body"><div class="card-title">Tudn<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Champions League" onclick="abrirReproductor(event, 'https://livetv.sx/es/competitions/7/', 'Página Web Champions League', '(livetv)');"><img src="https://i.postimg.cc/Hs0V3LQk/P-gina-Web-Champions-League.png"><div class="card-body"><div class="card-title">Página Web Champions League<p>(livetv)</p></div></div></a>
<!-- LIGA ACB -->
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://embedme.click/player/3/155', 'ACB Dazn 1', '(embedme)');"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 1<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/155', 'ACB Dazn 1', '(quellefrappe)');"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 1<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://embedme.click/player/3/156', 'ACB Dazn 2', '(embedme)');"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 2<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/156', 'ACB Dazn 2', '(quellefrappe)');"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 2<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://embedme.click/player/3/157', 'ACB Dazn 3', '(embedme)');"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 3<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/157', 'ACB Dazn 3', '(quellefrappe)');"><img src="https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg"><div class="card-body"><div class="card-title">ACB Dazn 3<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=tvc_deportes', 'TVC Deportes', '(la18hd)');"><img src="https://s3.superluchas.com/wp-content/uploads/20190320114903/tvc_deportes.png"><div class="card-body"><div class="card-title">TVC Deportes<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=932', 'TVC Deportes', '(daddylive)');"><img src="https://s3.superluchas.com/wp-content/uploads/20190320114903/tvc_deportes.png"><div class="card-body"><div class="card-title">TVC Deportes<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Liga ACB" onclick="abrirReproductor(event, 'https://livetv.sx/es/competitions/215/', 'Página Web Liga ACB', '(livetv)');"><img src="https://i.postimg.cc/hGNDKF9Y/P-gina-Web-Liga-ACB.png"><div class="card-body"><div class="card-title">Página Web Liga ACB<p>(livetv)</p></div></div></a>
<!-- EUROLIGA -->
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=437', 'Movistar+', '(daddylive)');"><img src="https://i.postimg.cc/Gtd7zdzm/movistar.png"><div class="card-body"><div class="card-title">Movistar+<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=436', 'M. Deportes 1', '(daddylive)');"><img src="https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 1<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://embedme.click/player/3/62', 'M. Deportes 1', '(embedme)');"><img src="https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 1<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/62', 'M. Deportes 1', '(quellefrappe)');"><img src="https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 1<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=438', 'M. Deportes 2', '(daddylive)');"><img src="https://i.postimg.cc/GhvMnHS2/movistar-deportes-2-Logo.png"><div class="card-body"><div class="card-title">M. Deportes 2<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=521', 'Vamos', '(daddylive)');"><img src="https://i.postimg.cc/mg44mdVP/Vamos-Logo.png"><div class="card-body"><div class="card-title">Vamos<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://embedme.click/player/3/55', 'Vamos', '(embedme)');"><img src="https://i.postimg.cc/mg44mdVP/Vamos-Logo.png"><div class="card-body"><div class="card-title">Vamos<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/55', 'Vamos', '(quellefrappe)');"><img src="https://i.postimg.cc/mg44mdVP/Vamos-Logo.png"><div class="card-body"><div class="card-title">Vamos<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Euroliga" onclick="abrirReproductor(event, 'https://livetv.sx/es/competitions/41/', 'Página Web Euroliga', '(livetv)');"><img src="https://i.postimg.cc/ry1V2Pzh/P-gina-Web-Euroliga.png"><div class="card-body"><div class="card-title">Página Web Euroliga<p>(livetv)</p></div></div></a>
<!-- ZONA DAZN -->
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=dazn1', 'Dazn 1', '(la18hd)');"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=445', 'Dazn 1', '(daddylive)');"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://embedme.click/player/3/56', 'Dazn 1', '(embedme)');"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/56', 'Dazn 1', '(quellefrappe)');"><img src="https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 1<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=dazn2', 'Dazn 2', '(la18hd)');"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=446', 'Dazn 2', '(daddylive)');"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://embedme.click/player/3/57', 'Dazn 2', '(embedme)');"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/57', 'Dazn 2', '(quellefrappe)');"><img src="https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 2<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=447', 'Dazn 3', '(daddylive)');"><img src="https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 3<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://embedme.click/player/3/58', 'Dazn 3', '(embedme)');"><img src="https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 3<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/58', 'Dazn 3', '(quellefrappe)');"><img src="https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 3<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=448', 'Dazn 4', '(daddylive)');"><img src="https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 4<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://embedme.click/player/3/59', 'Dazn 4', '(embedme)');"><img src="https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 4<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/59', 'Dazn 4', '(quellefrappe)');"><img src="https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png"><div class="card-body"><div class="card-title">Dazn 4<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=daznf1', 'Dazn F1', '(streamxhd)');"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=daznf1', 'Dazn F1', '(streamx305)');"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=537', 'Dazn F1', '(daddylive)');"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://embedme.click/player/3/60', 'Dazn F1', '(embedme)');"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/60', 'Dazn F1', '(quellefrappe)');"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Zona Dazn" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/daznf1.php', 'Dazn F1', '(latam)');"><img src="https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png"><div class="card-body"><div class="card-title">Dazn F1<p>(latam)</p></div></div></a>
<!-- CANALES LATINOS -->
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://latamplay1.click/channel/dsports.html', 'Dsports 1', '(latamplay1)');"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(latamplay1)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=dsports', 'Dsports 1', '(streamxhd)');"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=dsports', 'Dsports 1', '(streamx305)');"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=dsports', 'Dsports 1', '(la18hd)');"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embedme.click/player/3/94', 'Dsports 1', '(embedme)');"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/94', 'Dsports 1', '(quellefrappe)');"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/directvsports.php', 'Dsports 1', '(latam)');"><img src="https://i.postimg.cc/43NYNsBZ/DSports.png"><div class="card-body"><div class="card-title">Dsports 1<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=dsports2', 'Dsports 2', '(la18hd)');"><img src="https://i.postimg.cc/fyFcYkqx/DSports2.png"><div class="card-body"><div class="card-title">Dsports 2<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embedme.click/player/3/95', 'Dsports 2', '(embedme)');"><img src="https://i.postimg.cc/fyFcYkqx/DSports2.png"><div class="card-body"><div class="card-title">Dsports 2<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/95', 'Dsports 2', '(quellefrappe)');"><img src="https://i.postimg.cc/fyFcYkqx/DSports2.png"><div class="card-body"><div class="card-title">Dsports 2<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/directvsports2.php', 'Dsports 2', '(latam)');"><img src="https://i.postimg.cc/fyFcYkqx/DSports2.png"><div class="card-body"><div class="card-title">Dsports 2<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=espn', 'Espn 1', '(streamxhd)');"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=espn', 'Espn 1', '(streamx305)');"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=espn', 'Espn 1', '(la18hd)');"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=149', 'Espn 1', '(daddylive)');"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embedme.click/player/3/87', 'Espn 1', '(embedme)');"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/87', 'Espn 1', '(quellefrappe)');"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/espn.php', 'Espn 1', '(latam)');"><img src="https://i.postimg.cc/pXY3gZTy/ESPN1.png"><div class="card-body"><div class="card-title">Espn 1<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=espn2', 'Espn 2', '(streamxhd)');"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=espn2', 'Espn 2', '(streamx305)');"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=espn2', 'Espn 2', '(la18hd)');"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=150', 'Espn 2', '(daddylive)');"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embedme.click/player/3/88', 'Espn 2', '(embedme)');"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/88', 'Espn 2', '(quellefrappe)');"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/espn2.php', 'Espn 2', '(latam)');"><img src="https://i.postimg.cc/43kY0sFz/ESPN2.png"><div class="card-body"><div class="card-title">Espn 2<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=espn3', 'Espn 3', '(streamxhd)');"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=espn3', 'Espn 3', '(streamx305)');"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=espn3', 'Espn 3', '(la18hd)');"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embedme.click/player/3/89', 'Espn 3', '(embedme)');"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/89', 'Espn 3', '(quellefrappe)');"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embed.ksdjugfsddeports.com/embed/espn3.php', 'Espn 3', '(latam)');"><img src="https://i.postimg.cc/fyf4Mjwz/ESPN3.png"><div class="card-body"><div class="card-title">Espn 3<p>(latam)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=fox1ar', 'Fox Sports 1', '(streamxhd)');"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=fox1ar', 'Fox Sports 1', '(streamx305)');"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=foxsports', 'Fox Sports 1', '(la18hd)');"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=767', 'Fox Sports 1', '(daddylive)');"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embedme.click/player/3/78', 'Fox Sports 1', '(embedme)');"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/78', 'Fox Sports 1', '(quellefrappe)');"><img src="https://i.postimg.cc/15jNWQjC/foxsport-AR.png"><div class="card-body"><div class="card-title">Fox Sports 1<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=fox2ar', 'Fox Sports 2', '(streamxhd)');"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=fox2ar', 'Fox Sports 2', '(streamx305)');"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=foxsports2', 'Fox Sports 2', '(la18hd)');"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=788', 'Fox Sports 2', '(daddylive)');"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embedme.click/player/3/79', 'Fox Sports 2', '(embedme)');"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/79', 'Fox Sports 2', '(quellefrappe)');"><img src="https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png"><div class="card-body"><div class="card-title">Fox Sports 2<p>(quellefrappe)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamxhd.com/live1.php?stream=fox3ar', 'Fox Sports 3', '(streamxhd)');"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(streamxhd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://streamx305.sbs/global1.php?channel=fox3ar', 'Fox Sports 3', '(streamx305)');"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(streamx305)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://la18hd.su/vivo/canales.php?stream=foxsports3', 'Fox Sports 3', '(la18hd)');"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(la18hd)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://dlive.sx/watch.php?id=789', 'Fox Sports 3', '(daddylive)');"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(daddylive)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://embedme.click/player/3/80', 'Fox Sports 3', '(embedme)');"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(embedme)</p></div></div></a>
<a class="tarjeta-canal-link" data-categoria="Canales Latinos" onclick="abrirReproductor(event, 'https://quellefrappe.click/ty/1/80', 'Fox Sports 3', '(quellefrappe)');"><img src="https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png"><div class="card-body"><div class="card-title">Fox Sports 3<p>(quellefrappe)</p></div></div></a>


    <!-- ================= PANTALLA / OVERLAY DE REPRODUCCIÓN ================= -->
    <div id="reproductor-overlay">
        <div class="reproductor-wrapper">
	<p style="text-align: center; font-size: 0.9rem; margin-top: 1px;">Si la pagina sale en blanco, pulsar en Nueva Pestaña</p>		
            <!-- Barra superior con controles integrados -->
            <div class="reproductor-barra-superior">
                <div class="btn-flotante-info" id="infoReproductor">Canal - Servidor</div>            
                <div class="controles-derecha">
                    <!-- Botón para abrir directamente el enlace bloqueado en una pestaña nueva -->
                    <a id="btnAbrirExterno" href="" target="_blank" class="btn-flotante-externo">Nueva Pestaña↗</a>
                    <!-- Botón Cerrar -->
                    <button class="btn-flotante-cerrar" onclick="cerrarReproductor()">Cerrar</button>
                </div>
            </div>
        	  
            <!-- Iframe donde se cargará el stream -->
            <iframe id="iframeStream" src="" allowfullscreen></iframe>
        </div>
    </div>

    <script>
        function cambiarVistaACanales(categoriaKey, nombreCat) {
            document.getElementById('vistaHome').classList.remove('activa');
            document.getElementById('vistaCanales').classList.add('activa');
            filtrarCanales(categoriaKey, nombreCat);
            window.scrollTo(0, 0);
        }

        function volverAHome() {
            document.getElementById('vistaCanales').classList.remove('activa');
            document.getElementById('vistaHome').classList.add('activa');
            window.scrollTo(0, 0);
        }

        function filtrarCanales(categoriaKey, nombreCat) {
            const tarjetas = document.querySelectorAll('.tarjeta-canal-link');
            const textoFiltro = document.getElementById('filtro-activo-txt');
            
            if(textoFiltro) {
                const logosCategorias = {
                    'todos': 'https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png',
                    'La Liga': 'https://i.postimg.cc/VsF4nL28/La-Liga.png',
                    'Champions League': 'https://i.postimg.cc/HxpVrP34/Champions-League.png',
                    'Liga ACB': 'https://i.postimg.cc/HscGzrMV/Liga-ACB.png',
                    'Euroliga': 'https://basketpasion.es/wp-content/uploads/2022/06/euroleague-basketball-1300.webp',
                    'Zona Dazn': 'https://i.postimg.cc/bJt15wh9/Zona-Dazn.png',
                    'Canales Latinos': 'https://i.postimg.cc/cCWt57Td/Canales-Latinoamerica.png'
                };

                const logo = logosCategorias[categoriaKey] || logosCategorias['todos'];
                textoFiltro.innerHTML = `<img src="${logo}" alt="${nombreCat}"><span>${nombreCat}</span>`;
            }

            tarjetas.evals = tarjetas.forEach(tarjeta => {
                const catCanal = tarjeta.getAttribute('data-categoria');
                if (categoriaKey === 'todos' || catCanal === categoriaKey) {
                    tarjeta.style.display = 'flex';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        }
		
        function abrirReproductor(event, url, nombre, servidor) {
            event.preventDefault();
            
            const overlay = document.getElementById('reproductor-overlay');
            const iframe = document.getElementById('iframeStream');
            const info = document.getElementById('infoReproductor');
            const btnExterno = document.getElementById('btnAbrirExterno');
            
            // Asignar el nombre del canal y actualizar el enlace externo por si el servidor bloquea el iframe
            info.textContent = `${nombre} ${servidor}`;
            btnExterno.href = url;
            
            iframe.src = '';
            
            setTimeout(() => {
                iframe.src = url;
            }, 50);
            
            overlay.classList.add('activo');
        }
		
        function cerrarReproductor() {
            const overlay = document.getElementById('reproductor-overlay');
            const iframe = document.getElementById('iframeStream');
            
            overlay.classList.remove('activo');
            iframe.src = '';
        }
    </script>
</body>
</html>
