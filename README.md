# Pachanka Restaurant — Landing page (edición editorial)

Segunda propuesta de diseño web para **Pachanka Restaurant**, cocina criolla con fusión en Jesús María, Lima.

**Ver en vivo:** https://creative-programming-partners.github.io/pachanka-landing-v2/

> Maqueta de presentación para el cliente. Las fotos, la carta y los precios provienen de los canales públicos del restaurante y se usan solo para esta propuesta.

Esta versión toma como referencia la estructura de sitios de restaurantes de autor (como [Maido](https://maido.pe/?lang=es)): portada oscura a pantalla completa, paneles divididos foto / carta. Los textos, fotos y colores son de Pachanka: carbón y amarillo mostaza de su carta de piqueos, papel kraft de su carta impresa y las letras del logo como acentos.

La primera propuesta está en [pachanka-landing](https://github.com/creative-programming-partners/pachanka-landing).

## Secciones

- Pantalla de carga con el logo animado
- Portada con tres fotos a pantalla completa
- Un día en Pachanka: la sección se fija al hacer scroll y recorre el día por horas (almuerzo, piqueos, after office y música en vivo)
- Carta en paneles: criollo fusión, piqueos y la barra
- Carta completa en un panel lateral, con las 10 categorías de sus cartas en PDF
- Reseñas: calificación y temas reales de Google Maps
- Reservas con formulario que abre WhatsApp con el mensaje listo
- Eventos y celebraciones
- Ubicación con mapa y horarios

## Funciones

- **Abierto ahora / Cerrado** según la hora de Lima (lunes a sábado 12–23 h, domingo 12–18 h)
- **Formulario de reserva**: solo ofrece horarios válidos para el día elegido y arma el mensaje de WhatsApp
- **Español / inglés**, con la preferencia guardada en el navegador
- **Ficha para Google** (datos estructurados de restaurante) e imagen para compartir en redes

## Estructura

```
index.html          Página
css/styles.css      Estilos
js/intro.js         Pantalla de carga
js/menu-data.js     Carta completa (español e inglés)
js/i18n.js          Traducciones al inglés
js/main.js          Menú, carta, reservas, estado de apertura, idioma y animaciones
assets/img/         Fotos e imagen para compartir (og-image.jpg)
assets/sketch/      Ilustraciones a tinta de la carta
```

## Tecnología

HTML, CSS y JavaScript sin paso de compilación. Usa [GSAP](https://gsap.com/) con ScrollTrigger para las animaciones ligadas al scroll y [Lenis](https://lenis.darkroom.engineering/) para el scroll suave, cargados desde CDN.

## Verlo en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8000
```
