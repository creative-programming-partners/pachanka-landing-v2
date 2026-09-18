# Pachanka Restaurant — Landing page (edición editorial)

Segunda propuesta de diseño web para **Pachanka Restaurant**, cocina criolla con fusión en Jesús María, Lima.

**Ver en vivo:** https://creative-programming-partners.github.io/pachanka-landing-v2/

> Maqueta de presentación para el cliente. Las fotos, la carta y los precios provienen de los canales públicos del restaurante y se usan solo para esta propuesta.

Esta versión toma como referencia la estructura de sitios de restaurantes de autor (como [Maido](https://maido.pe/?lang=es)): portada oscura a pantalla completa, paneles divididos foto / carta y un único color de acento. Los textos, fotos y colores son de Pachanka.

La primera propuesta está en [pachanka-landing](https://github.com/creative-programming-partners/pachanka-landing).

## Secciones

- Pantalla de carga con el logo animado
- Portada con tres fotos a pantalla completa
- Un día en Pachanka: la sección se fija al hacer scroll y recorre el día por horas (almuerzo, piqueos, after office y música en vivo)
- Carta en paneles: criollo fusión, piqueos y la barra
- Reservas y delivery
- Eventos y celebraciones
- Ubicación con mapa y horarios

## Estructura

```
index.html        Página
css/styles.css    Estilos
js/intro.js       Pantalla de carga
js/main.js        Menú lateral, scroll suave, animaciones y mapa
assets/img/       Fotos
assets/sketch/    Ilustraciones a tinta de la carta
```

## Tecnología

HTML, CSS y JavaScript sin paso de compilación. Usa [GSAP](https://gsap.com/) con ScrollTrigger para las animaciones ligadas al scroll y [Lenis](https://lenis.darkroom.engineering/) para el scroll suave, cargados desde CDN.

## Verlo en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8000
```
