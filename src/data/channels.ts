import { Channel, CategoryInfo } from '../types';

export const INITIAL_CATEGORIES: CategoryInfo[] = [
  {
    name: "Todos",
    icon: "https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png"
  },
  {
    name: "La Liga",
    icon: "https://i.postimg.cc/VsF4nL28/La-Liga.png"
  },
  {
    name: "Champions League",
    icon: "https://i.postimg.cc/HxpVrP34/Champions-League.png"
  },
  {
    name: "Liga ACB",
    icon: "https://i.postimg.cc/HscGzrMV/Liga-ACB.png"
  },
  {
    name: "Euroliga",
    icon: "https://basketpasion.es/wp-content/uploads/2022/06/euroleague-basketball-1300.webp"
  },
  {
    name: "Zona Dazn",
    icon: "https://i.postimg.cc/bJt15wh9/Zona-Dazn.png"
  },
  {
    name: "Canales Latinos",
    icon: "https://i.postimg.cc/cCWt57Td/Canales-Latinoamerica.png"
  }
];

export const INITIAL_CHANNELS_DATA: Channel[] = [
  // LA LIGA
  {
    id: "laliga-dazn",
    title: "LaLiga / Dazn",
    category: "La Liga",
    logo: "https://i.postimg.cc/nr8tQ8cX/La-Liga-Tv-Dazn-La-Liga.png",
    sources: [
      { name: "SportzOnline", url: "https://sportzonline.click/channels/hd/hd6.php", type: "embed" }
    ]
  },
  {
    id: "m-laliga",
    title: "M. LaLiga",
    category: "La Liga",
    logo: "https://i.postimg.cc/0Q5CtMNJ/La-Liga-TV-Logo.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-84.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/laliga/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/49", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/49", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/movistar-la-liga-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "dazn-laliga",
    title: "Dazn LaLiga",
    category: "La Liga",
    logo: "https://i.postimg.cc/9M5NptRX/DAZN-La-Liga-Logo.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-538.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/dazn-laliga/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/51", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/51", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/dazn-la-liga-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "espn-deportes",
    title: "ESPN Deportes",
    category: "La Liga",
    logo: "https://i.postimg.cc/4dPchzfK/Espn-deportes.png",
    sources: [
      { name: "M3U8 Directo", url: "https://tx3.nexgen.bz:4000/ESPN_DEPORTES/index.m3u8", type: "m3u8" },
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-375.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/espn-deportes/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/71", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/71", type: "embed" }
    ]
  },
  {
    id: "sky-sports-laliga",
    title: "Sky S. LaLiga",
    category: "La Liga",
    logo: "https://i.postimg.cc/9F8LhgZN/Sky-Sports-La-Liga-Logo.png",
    sources: [
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/sky-sports-la-liga-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "web-laliga",
    title: "Web LaLiga",
    category: "La Liga",
    logo: "https://i.postimg.cc/FRTD23wN/Pagina-Web-La-Liga.png",
    sources: [
      { name: "LiveTV", url: "https://livetv.sx/es/competitions/15/", type: "embed" }
    ]
  },

  // CHAMPIONS LEAGUE
  {
    id: "l-campeones",
    title: "Liga de Campeones",
    category: "Champions League",
    logo: "https://i.postimg.cc/5tWWqrXR/Liga-de-Campeones-Logo.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-435.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/campeones/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/61", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/61", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/movistar-liga-de-campeones-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "tudn",
    title: "TUDN",
    category: "Champions League",
    logo: "https://i.postimg.cc/QtMLX404/TUDN-Logo.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-66.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/tudn/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/68", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/68", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/tudn-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "web-champions",
    title: "Web Champions",
    category: "Champions League",
    logo: "https://i.postimg.cc/Hs0V3LQk/P-gina-Web-Champions-League.png",
    sources: [
      { name: "LiveTV", url: "https://livetv.sx/es/competitions/7/", type: "embed" }
    ]
  },

  // LIGA ACB
  {
    id: "acb-dazn-1",
    title: "ACB Dazn 1",
    category: "Liga ACB",
    logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg",
    sources: [
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/155", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/155", type: "embed" }
    ]
  },
  {
    id: "acb-dazn-2",
    title: "ACB Dazn 2",
    category: "Liga ACB",
    logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg",
    sources: [
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/156", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/156", type: "embed" }
    ]
  },
  {
    id: "acb-dazn-3",
    title: "ACB Dazn 3",
    category: "Liga ACB",
    logo: "https://cdn.gigantes.com/wp-content/uploads/sites/4/2025/09/acb-dazn-liga-endesa-2526.jpg",
    sources: [
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/157", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/157", type: "embed" }
    ]
  },
  {
    id: "tvc-deportes",
    title: "TVC Deportes",
    category: "Liga ACB",
    logo: "https://s3.superluchas.com/wp-content/uploads/20190320114903/tvc_deportes.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-932.php", type: "embed" }
    ]
  },
  {
    id: "web-acb",
    title: "Web Liga ACB",
    category: "Liga ACB",
    logo: "https://i.postimg.cc/hGNDKF9Y/P-gina-Web-Liga-ACB.png",
    sources: [
      { name: "LiveTV", url: "https://livetv.sx/es/competitions/215/", type: "embed" }
    ]
  },

  // EUROLIGA
  {
    id: "movistar-plus",
    title: "Movistar+",
    category: "Euroliga",
    logo: "https://i.postimg.cc/Gtd7zdzm/movistar.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-437.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/canal-0/", type: "embed" }
    ]
  },
  {
    id: "m-deportes-1",
    title: "M. Deportes 1",
    category: "Euroliga",
    logo: "https://i.postimg.cc/HxZp22D8/movistar-deportes-Logo.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-436.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/deportes/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/62", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/62", type: "embed" }
    ]
  },
  {
    id: "m-deportes-2",
    title: "M. Deportes 2",
    category: "Euroliga",
    logo: "https://i.postimg.cc/GhvMnHS2/movistar-deportes-2-Logo.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-438.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/deportes2/", type: "embed" }
    ]
  },
  {
    id: "vamos",
    title: "Vamos",
    category: "Euroliga",
    logo: "https://i.postimg.cc/mg44mdVP/Vamos-Logo.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-521.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/vamos/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/55", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/55", type: "embed" }
    ]
  },
  {
    id: "web-euroliga",
    title: "Web Euroliga",
    category: "Euroliga",
    logo: "https://i.postimg.cc/ry1V2Pzh/P-gina-Web-Euroliga.png",
    sources: [
      { name: "LiveTV", url: "https://livetv.sx/es/competitions/41/", type: "embed" }
    ]
  },

  // ZONA DAZN
  {
    id: "dazn-1",
    title: "Dazn 1",
    category: "Zona Dazn",
    logo: "https://i.ibb.co/BNcPbdV/1-0-1-76-A4-416-1-C00000-0-0-0.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-445.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/dazn1/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/56", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/56", type: "embed" }
    ]
  },
  {
    id: "dazn-2",
    title: "Dazn 2",
    category: "Zona Dazn",
    logo: "https://i.ibb.co/C7RpvcF/1-0-1-772-A-416-1-C00000-0-0-0.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-446.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/dazn2/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/57", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/57", type: "embed" }
    ]
  },
  {
    id: "dazn-3",
    title: "Dazn 3",
    category: "Zona Dazn",
    logo: "https://i.ibb.co/3NQ78Sx/1-0-1-77-BE-40-A-1-C00000-0-0-0.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-447.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/dazn3/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/58", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/58", type: "embed" }
    ]
  },
  {
    id: "dazn-4",
    title: "Dazn 4",
    category: "Zona Dazn",
    logo: "https://i.ibb.co/2Mm09qs/1-0-1-77-C0-40-A-1-C00000-0-0-0.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-448.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/dazn4/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/59", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/59", type: "embed" }
    ]
  },
  {
    id: "dazn-f1",
    title: "Dazn F1",
    category: "Zona Dazn",
    logo: "https://i.postimg.cc/j2Z3Y01j/DAZN-F1-Logo.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-537.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/formula1/", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/60", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/60", type: "embed" }
    ]
  },

  // CANALES LATINOS
  {
    id: "dsports-1",
    title: "DSports 1",
    category: "Canales Latinos",
    logo: "https://i.postimg.cc/43NYNsBZ/DSports.png",
    sources: [
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/94", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/94", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/directv-sports-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "dsports-2",
    title: "DSports 2",
    category: "Canales Latinos",
    logo: "https://i.postimg.cc/fyFcYkqx/DSports2.png",
    sources: [
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/95", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/95", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/directv-sports-2-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "espn-1",
    title: "ESPN 1",
    category: "Canales Latinos",
    logo: "https://i.postimg.cc/pXY3gZTy/ESPN1.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-149.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/espn/op2.php", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/87", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/87", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/espn-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "espn-2",
    title: "ESPN 2",
    category: "Canales Latinos",
    logo: "https://i.postimg.cc/43kY0sFz/ESPN2.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-150.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/espn2/op2.php", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/88", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/88", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/espn-2-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "espn-3",
    title: "ESPN 3",
    category: "Canales Latinos",
    logo: "https://i.postimg.cc/fyf4Mjwz/ESPN3.png",
    sources: [
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/89", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/89", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/espn-3-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "fox-sports-1",
    title: "Fox Sports 1",
    category: "Canales Latinos",
    logo: "https://i.postimg.cc/15jNWQjC/foxsport-AR.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-767.php", type: "embed" },
      { name: "ZonaTV", url: "https://gollibre.com/total/stream-767.php", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/78", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/78", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/fox-sports-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "fox-sports-2",
    title: "Fox Sports 2",
    category: "Canales Latinos",
    logo: "https://i.postimg.cc/Y0mwMQtm/foxsport2-AR.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-788.php", type: "embed" },
      { name: "ZonaTV", url: "https://zonatv.space/canales/fox-sports2/op2.php", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/79", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/79", type: "embed" },
      { name: "TVporInternet", url: "https://www.tvporinternet2.com/fox-sports-2-en-vivo-por-internet.html", type: "embed" }
    ]
  },
  {
    id: "fox-sports-3",
    title: "Fox Sports 3",
    category: "Canales Latinos",
    logo: "https://i.postimg.cc/RVdz9CBd/foxsport3-AR.png",
    sources: [
      { name: "DaddyLive", url: "https://dlhd.st/watch/stream-789.php", type: "embed" },
      { name: "TVCStreams", url: "https://tvcstreams.shop/player1/sTL2/80", type: "embed" },
      { name: "BolaLoca", url: "https://bolaloca.my/player/capo/80", type: "embed" }
    ]
  }
];
