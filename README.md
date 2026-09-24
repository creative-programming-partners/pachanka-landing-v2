# Pachanka Restaurant — Landing page (edición editorial)

Segunda propuesta de diseño web para **Pachanka Restaurant**, cocina criolla con fusión en Jesús María, Lima.

**Ver en vivo:** https://creative-programming-partners.github.io/pachanka-landing-v2/

> Maqueta de presentación para el cliente. La carta y los precios son los de su carta vigente
> (*CARTA PACHANKA ACTUALIZADA*). Las fotos de los platos son del archivo del restaurante
> (carpeta *PLATOS*); las del local y las celebraciones vienen de sus canales públicos.

Esta versión toma como referencia la estructura de sitios de restaurantes de autor (como [Maido](https://maido.pe/?lang=es)): portada oscura a pantalla completa, paneles divididos foto / carta. Los textos, fotos y colores son de Pachanka: carbón y amarillo mostaza de su carta de piqueos, papel kraft de su carta impresa y las letras del logo como acentos.

La primera propuesta está en [pachanka-landing](https://github.com/creative-programming-partners/pachanka-landing),
y la carta digital en [pachanka-carta-digital](https://github.com/creative-programming-partners/pachanka-carta-digital)
([verla](https://creative-programming-partners.github.io/pachanka-carta-digital/)).

## Secciones

- Pantalla de carga con el logotipo del restaurante, que entra letra por letra
- Portada con tres fotos a pantalla completa
- Un día en Pachanka: la sección se fija al hacer scroll y recorre el día por horas (almuerzo, entradas, after office y música en vivo). Mientras está fija avisa que la página sigue
- Carta en paneles: nuestros clásicos, del mar a tu plato y criollo fusión
- Carta completa en un panel lateral, con las 10 categorías de su carta vigente
- Los platos en video: cinta que corre sola y, al tocar un video, se expande sobre la página con el nombre, la descripción y el precio del plato
- Reseñas: la calificación y los temas de Google Maps, y seis reseñas reales que van pasando, con su nombre y sus estrellas
- Reservas con formulario que abre WhatsApp con el mensaje listo
- Eventos y celebraciones
- Ubicación con mapa y horarios

## Funciones

- **Abierto ahora / Cerrado** según la hora de Lima (lunes a sábado 12–23 h, domingo 12–18 h)
- **Formulario de reserva**: solo ofrece horarios válidos para el día elegido y arma el mensaje de WhatsApp. Si el comensal llega en vehículo propio, lo avisa en el mensaje y la web le dice que el estacionamiento se confirma por el chat
- **Español / inglés**, con la preferencia guardada en el navegador
- **Videos**: los seis clips se descargan solo cuando la sección entra en pantalla y se detienen al salir. Las tarjetas avisan que el video se abre en grande y hay flechas a los lados para que se note que la cinta sigue
- **Avisos de scroll**: donde el scroll puede confundir (la sección fija, la carta completa y las categorías) hay una flecha o un degradado que indica que queda contenido
- **Ficha para Google** (datos estructurados de restaurante) e imagen para compartir en redes

## Estructura

```
index.html          Página
css/styles.css      Estilos
js/menu-data.js     Carta completa (español e inglés) — mismo archivo que la carta digital
js/i18n.js          Traducciones al inglés
js/main.js          Menú, carta, reservas, estado de apertura, idioma y animaciones
assets/img/         Fotos del local y de la portada, logotipo e imagen para compartir (og-image.jpg)
assets/img/logo/    El logotipo en piezas: una imagen por letra, para que entre letra por letra
assets/platos/      Una foto por plato, con el mismo id que en menu-data.js (aún sin usar en esta página)
assets/video/       Videos de los platos (8 s, 720 px) con su miniatura, para la cinta de videos
assets/sketch/      Ilustraciones a tinta de la carta (sin usar desde que los paneles llevan foto)
```

## Tecnología

HTML, CSS y JavaScript sin paso de compilación. Usa [GSAP](https://gsap.com/) con ScrollTrigger para las animaciones ligadas al scroll y [Lenis](https://lenis.darkroom.engineering/) para el scroll suave, cargados desde CDN.

## Verlo en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8000
```
