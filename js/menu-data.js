/* Carta completa de Pachanka (de sus cartas en PDF: "Carta Pachanka" y "Piqueos y bebidas").
   Cada plato: [nombre, precio, descripción ES, descripción EN, nombre EN opcional].
   Los nombres de platos peruanos se mantienen en español también en inglés. */
window.PK_MENU = [
  { id: 'entradas', es: 'Pá empezar', en: 'To start', groups: [{ items: [
    ['Ceviche Pachanka', 33, 'Dados de pescado, láminas de pulpo y daditos de palta.', 'Diced fish, thin octopus slices and avocado.'],
    ['Causa acevichada', 28, 'Papa amarilla sobre huancaína, coronada con ceviche al rocoto.', 'Yellow potato over huancaína sauce, topped with rocoto ceviche.'],
    ['Causa con lomo saltado', 29, 'Papa amarilla rellena de palta, con lomo fino salteado al wok.', 'Yellow potato filled with avocado, topped with wok-tossed beef.'],
    ['Leche de tigre', 22, 'Pescado y langostinos en salsa acevichada, con brocheta de chicharrón.', 'Fish and prawns in ceviche sauce, with a crispy pork skewer.'],
    ['Tiradito chalaco', 28, 'Pescado y conchitas en salsa chalaca al ají amarillo, mousse de palta y camote.', 'Fish and scallops in ají amarillo chalaca sauce, avocado mousse and sweet potato.'],
    ['Maki causa furay', 30, 'Roll de causa al panko, relleno de palta y langostinos, en salsa acevichada.', 'Panko causa roll with avocado and prawns, in ceviche sauce.'],
    ['Langostinos al panko', 30, '8 langostinos crujientes con salsa de maracuyá.', '8 crispy prawns with passion fruit sauce.'],
    ['Chicharrón de pollo', 38, 'Tiras de pollo al panko con papas fritas, ensalada y salsa tártara.', 'Panko chicken strips with fries, salad and tartar sauce.']
  ]}]},
  { id: 'fusion', es: 'Criollo fusión', en: 'Criollo fusion', groups: [{ items: [
    ['Arroz cremoso con lomo saltado', 35, 'Arroz en crema de ají amarillo y parmesano, con lomo saltado al wok.', 'Creamy ají amarillo and parmesan rice with wok-tossed beef.'],
    ['Asado de tira de la abuela', 35, 'Tres horas de cocción, con puré rústico y vegetales salteados.', 'Short ribs slow-cooked for three hours, with rustic mash and sautéed vegetables.'],
    ['Fetuccini huancaíno con lomo strogonoff', 35, 'Fetuccini a la huancaína con lomo fino y champiñones en salsa strogonoff.', 'Fettuccine in huancaína sauce with beef tenderloin and mushroom stroganoff.'],
    ['Chaufa de chancho al cilindro', 23, 'Chanchito con especias y verduras chinas, al wok con arroz.', 'Spiced pork with Chinese vegetables, wok-fried with rice.'],
    ['Fetuccini a la crema con milanesa', 29, 'En salsa bechamel, con suprema de pollo, jamón y queso.', 'In béchamel sauce, with breaded chicken, ham and cheese.'],
    ['Chaufa amazónico', 28, 'Cecina, chorizo amazónico, costras de pollo, plátano y ajicito de cocona.', 'Amazonian cured pork and sausage, crispy chicken, plantain and cocona chili.'],
    ['Arroz nikkei', 28, 'Pollo y vegetales en mantequilla de ajos, arroz frito en salsa de ostión y tortilla.', 'Chicken and vegetables in garlic butter, oyster-sauce fried rice and omelette.'],
    ['Milanesa strogonoff', 30, 'Pechuga al panko con champiñones en salsa strogonoff y papas peruanitas.', 'Panko chicken breast with mushroom stroganoff and Peruvian potatoes.']
  ]}]},
  { id: 'clasicos', es: 'Nuestros clásicos', en: 'Our classics', groups: [{ items: [
    ['Lomo saltado', 37, 'Lomo fino al wok, papas amarillas crujientes y arroz con choclo.', 'Wok-tossed beef tenderloin, crispy yellow potatoes and corn rice.'],
    ['Pollo saltado', 28, 'Pechuga salteada con cebolla, tomate y sillao, papas fritas y arroz con choclo.', 'Chicken stir-fried with onion, tomato and soy sauce, fries and corn rice.'],
    ['Tallarín saltado carretillero', 27, 'Spaghetti salteado con lomo fino y vegetales en salsa carretillera.', 'Spaghetti stir-fried with beef and vegetables in carretillera sauce.'],
    ['Tallarín saltado carretillero con pollo', 25, 'Spaghetti salteado con pollo y vegetales en salsa carretillera.', 'Spaghetti stir-fried with chicken and vegetables in carretillera sauce.'],
    ['Chaufa de carne o pollo', 22, 'Arroz frito con verduras y omelette montado.', 'Fried rice with vegetables, topped with an omelette.'],
    ['Spaguetti al pesto con churrasco', 28, 'Con churrasco de res a la parrilla o milanesa de pollo.', 'With grilled beef steak or breaded chicken.'],
    ['Pechuga a la plancha', 28, 'Con papas fritas, arroz y ensalada mixta.', 'With fries, rice and mixed salad.'],
    ['Bisteck a lo pobre', 28, 'Con papas crujientes, plátano frito y huevo al gusto.', 'With crispy potatoes, fried plantain and an egg your way.'],
    ['Tacu tacu a lo pobre', 34, 'Frejoles y arroz en costra crujiente, lomo al wok, huevo y plátano.', 'Crispy bean-and-rice cake with wok-tossed beef, egg and plantain.']
  ]}]},
  { id: 'mar', es: 'Del mar', en: 'From the sea', groups: [{ items: [
    ['Trío Pachankero', 38, 'Arroz cremoso de mariscos, cevichito de la casa y aros de calamar.', 'Creamy seafood rice, house ceviche and calamari rings.'],
    ['Arroz con mariscos', 30, 'Arroz cremoso salteado con frutos del mar y toque chalaco.', 'Creamy rice sautéed with seafood, Callao style.'],
    ['Tacu tacu a lo macho', 34, 'Tacu tacu crocante con filete de pescado en salsa de mariscos.', 'Crispy tacu tacu with fish fillet in seafood sauce.'],
    ['Tacu tacu mar y tierra', 36, 'Tacu tacu con lomo fino al wok y salsa cremosa de mariscos.', 'Tacu tacu with wok-tossed beef and creamy seafood sauce.'],
    ['Dúo marino', 34, 'Arroz cremoso con mariscos y ceviche al rocoto.', 'Creamy seafood rice with rocoto ceviche.'],
    ['Fettuccine frutti di mare', 32, 'Mariscos en mantequilla y vino blanco, con filete de pescado al grill.', 'Seafood in butter and white wine, with grilled fish fillet.']
  ]}]},
  { id: 'finde', es: 'Fin de semana', en: 'Weekends', groups: [{ es: 'Especiales de fin de semana', en: 'Weekend specials', items: [
    ['Arroz con pato', 55, 'Arroz meloso con loche, cerveza negra y chicha de jora, magret y pierna confitada, con causitas en huancaína.', 'Creamy rice with loche squash, dark beer and chicha de jora, duck breast and confit leg, with huancaína causitas.'],
    ['Chanchito a la caja china', 38, 'Chanchito crocante con papitas cocktail a las finas hierbas y vegetales frescos.', 'Crispy pork with herbed baby potatoes and fresh vegetables.'],
    ['Carapulcra con sopa seca', 35, 'Guiso del sur con tallarines y panceta crocante.', 'Southern Peruvian stew with noodles and crispy pork belly.']
  ]}]},
  { id: 'piqueos', es: 'Piqueos', en: 'Bar bites', groups: [
    { es: 'Para compartir', en: 'To share', items: [
      ['Piqueo Pachanka', 38, 'Alitas BBQ, papitas, tequeños de lomo saltado y ají de gallina, y maki causas de lomo.', 'BBQ wings, fries, lomo saltado and ají de gallina tequeños, and beef causa maki.'],
      ['Tequeños criollos', 22, 'Rellenos de lomo saltado y ají de gallina. 8 unidades.', 'Filled with lomo saltado and ají de gallina. 8 pieces.'],
      ['Tequeños de queso', 18, 'Rellenos de queso fresco, con guacamole.', 'Filled with fresh cheese, with guacamole.'],
      ['Salchipapa Pachanka', 19, 'Papas, chorizo a las finas hierbas, chorizo clásico, salchicha y huevo frito.', 'Fries, herbed and classic chorizo, sausage and a fried egg.'],
      ['Salchipapa crispy', 19, 'Papas con chicharroncitos de pollo y salchicha.', 'Fries with crispy chicken bites and sausage.']
    ]},
    { es: 'Alitas · 8 unidades con papas fritas', en: 'Wings · 8 pieces with fries', items: [
      ['Alitas BBQ', 24, 'En salsa BBQ.', 'In BBQ sauce.'],
      ['Alitas búfalo', 23, 'En salsa búfalo.', 'In buffalo sauce.'],
      ['Alitas broaster', 23, 'Marinadas en salsa de la casa.', 'Marinated in the house sauce.'],
      ['Alitas acevichadas', 25, 'En salsa acevichada.', 'In ceviche sauce.']
    ]},
    { es: 'Hamburguesas', en: 'Burgers', items: [
      ['Hamburguesa francesa', 22, '120 g de carne, doble queso edam, champiñones strogonoff, tocino y cebolla caramelizada.', '120 g patty, double edam, mushroom stroganoff, bacon and caramelized onion.'],
      ['Cheese burger', 18, '150 g de carne, queso cheddar, lechuga y tomate.', '150 g patty, cheddar, lettuce and tomato.'],
      ['Hamburguesa royal', 20, '150 g de carne, cheddar, huevo, lechuga y tomate.', '150 g patty, cheddar, egg, lettuce and tomato.']
    ]},
    { es: 'Pizzas', en: 'Pizzas', items: [
      ['Pizza Pachanka', 34, 'Jamón ahumado, chorizo, champiñones, aceitunas, pimiento y cebolla caramelizada.', 'Smoked ham, chorizo, mushrooms, olives, peppers and caramelized onion.'],
      ['Pizza americana', 32, 'Pomodoro, mozzarella y jamón.', 'Tomato, mozzarella and ham.'],
      ['Pizza hawaiana', 33, 'Pomodoro, mozzarella, piña y jamón.', 'Tomato, mozzarella, pineapple and ham.'],
      ['Pizza pepperoni', 33, 'Pomodoro, mozzarella y pepperoni.', 'Tomato, mozzarella and pepperoni.'],
      ['Pizza full meat', 35, 'Carne, chorizo, tocino y pepperoni.', 'Beef, chorizo, bacon and pepperoni.'],
      ['Pizza chicken BBQ', 35, 'Pollo a la parrilla, tocino, cebolla y salsa BBQ.', 'Grilled chicken, bacon, onion and BBQ sauce.'],
      ['Pizza vegetariana', 30, 'Champiñones, cebolla, aceitunas y pimiento.', 'Mushrooms, onion, olives and peppers.']
    ]}
  ]},
  { id: 'mas', es: 'Ensaladas y más', en: 'Salads & more', groups: [
    { es: 'Ensaladas', en: 'Salads', items: [
      ['Ensalada Pachanka', 22, 'Lechugas, tomates cherry, jamón ahumado, palta, rabanito y wantán crocante.', 'Lettuce, cherry tomatoes, smoked ham, avocado, radish and crispy wonton.'],
      ['Ensalada parrillera', 24, 'Pollo al grill, lechugas, tomates cherry y aceitunas, con aderezo de mostaza y miel.', 'Grilled chicken, lettuce, cherry tomatoes and olives, with honey mustard dressing.'],
      ['Ensalada César', 22, 'Lechuga romana, crutones, pollo a la plancha y parmesano.', 'Romaine, croutons, grilled chicken and parmesan.']
    ]},
    { es: 'Para los peques · incluye bebida', en: 'For kids · drink included', items: [
      ['Milanesa con papas', 24, 'Pollo al panko con papitas crujientes.', 'Panko chicken with crispy fries.', 'Breaded chicken with fries'],
      ['Spaguetti al alfredo', 23, 'Receta clásica con jamón.', 'Classic recipe with ham.']
    ]},
    { es: 'Guarniciones', en: 'Sides', items: [
      ['Porción de arroz', 8, '', '', 'Rice'],
      ['Papas fritas', 8, '', '', 'Fries'],
      ['Puré de papas', 9, '', '', 'Mashed potatoes'],
      ['Ensalada mixta', 6, '', '', 'Mixed salad'],
      ['Plátano frito', 5, '', '', 'Fried plantain'],
      ['Huevo frito', 3.5, '', '', 'Fried egg'],
      ['Pechuga de pollo (80 g)', 12, '', '', 'Chicken breast (80 g)']
    ]}
  ]},
  { id: 'postres', es: 'Postres', en: 'Desserts', groups: [{ items: [
    ['Picarones Pachanka', 16, 'Bañados en miel, con una bola de helado.', 'Drizzled with syrup, with a scoop of ice cream.'],
    ['Pie de manzana con helado', 17, 'Hojaldre con compota de manzanas acarameladas.', 'Puff pastry with caramelized apple compote.', 'Apple pie with ice cream'],
    ['Brownie con helado', 17, 'Con helado de temporada y fudge.', 'With seasonal ice cream and fudge.', 'Brownie with ice cream'],
    ['Cheesecake de fresa', 16, 'Base de galleta y reducción de fresas.', 'Cookie crust with strawberry reduction.', 'Strawberry cheesecake'],
    ['Cheesecake de maracuyá', 16, 'Base de galleta, queso crema y maracuyá.', 'Cookie crust, cream cheese and passion fruit.', 'Passion fruit cheesecake']
  ]}]},
  { id: 'bebidas', es: 'Bebidas', en: 'Drinks', groups: [
    { es: 'Limonadas y jugos', en: 'Lemonades & juices', items: [
      ['Pachanka Fresh', 10, 'La limonada de la casa.', 'The house lemonade.'],
      ['Limonada clásica', 5, '', '', 'Classic lemonade'],
      ['Limonada de frutos rojos', 10, '', '', 'Red berry lemonade'],
      ['Limonada de hierba buena', 6, '', '', 'Mint lemonade'],
      ['Limonada de hierba luisa', 6, '', '', 'Lemongrass lemonade'],
      ['Jugo de maracuyá', 5, '', '', 'Passion fruit juice'],
      ['Limonada clásica (1 L)', 17, '', '', 'Classic lemonade (1 L)'],
      ['Limonada de hierbas (1 L)', 18, '', '', 'Herb lemonade (1 L)'],
      ['Jugo de maracuyá (1 L)', 18, '', '', 'Passion fruit juice (1 L)']
    ]},
    { es: 'Infusiones', en: 'Herbal teas', items: [
      ['Hierba luisa', 5, '', '', 'Lemongrass'],
      ['Manzanilla', 5, '', '', 'Chamomile'],
      ['Menta', 5, '', '', 'Mint']
    ]},
    { es: 'Gaseosas y agua', en: 'Soft drinks & water', items: [
      ['Coca-Cola / Coca-Cola Zero', 5, '', ''],
      ['Inca Kola / Inca Kola Zero', 5, '', ''],
      ['Fanta', 5, '', ''],
      ['Agua San Mateo', 5, 'Con o sin gas.', 'Still or sparkling.']
    ]}
  ]},
  { id: 'tragos', es: 'Tragos', en: 'Bar', groups: [
    { es: 'Lo nuestro', en: 'House cocktails', items: [
      ['Pachanka Citrius', 19, 'Pisco macerado en flor de jamaica, con fresa y frutas cítricas.', 'Hibiscus-infused pisco with strawberry and citrus.'],
      ['Pachanka Punch', 19, 'Pisco Hualcará macerado en canela, con zumo de piña.', 'Cinnamon-infused Hualcará pisco with pineapple juice.'],
      ['Pachanka Pasión', 19, 'Ron rubio, naranja y maracuyá, huacatay y un toque de Raymi de trigo.', 'Golden rum, orange and passion fruit, huacatay and a dash of Raymi wheat beer.']
    ]},
    { es: 'Piscos', en: 'Pisco', items: [
      ['Pisco sour', 19, 'Clásico, maracuyá, hoja de coca, flor de Jamaica, eucalipto, maíz morado o canela.', 'Classic, passion fruit, coca leaf, hibiscus, eucalyptus, purple corn or cinnamon.'],
      ['Chilcano', 18, 'En los mismos siete sabores.', 'In the same seven flavors.']
    ]},
    { es: 'Gin', en: 'Gin', items: [
      ['Bombay tonic', 25, '', ''],
      ['Beefeater tonic', 25, '', ''],
      ['Citadelle tonic', 25, '', '']
    ]},
    { es: 'Cervezas', en: 'Beer', items: [
      ['Pilsen', 10, '', ''],
      ['Raymi dorada o de trigo', 10, '', '', 'Raymi golden or wheat'],
      ['Cusqueña dorada o roja', 10, '', '', 'Cusqueña golden or red'],
      ['Corona', 10, '', '']
    ]},
    { es: 'Ron', en: 'Rum', items: [
      ['Mojito', 18, 'Hierba buena, albahaca o menta.', 'Spearmint, basil or mint.'],
      ['Cuba libre', 18, '', ''],
      ['Santa Teresa', 18, 'Con o sin Coca-Cola.', 'With or without Coca-Cola.'],
      ['Flor de Caña 12 años', 18, 'Con o sin Coca-Cola.', 'With or without Coca-Cola.', 'Flor de Caña 12 years'],
      ['Zacapa 12 años', 18, 'Con o sin Coca-Cola.', 'With or without Coca-Cola.', 'Zacapa 12 years']
    ]},
    { es: 'Vodka y whisky', en: 'Vodka & whisky', items: [
      ['Smirnoff con jugo de naranja', 18, '', '', 'Smirnoff with orange juice'],
      ['Absolut con jugo de naranja', 20, '', '', 'Absolut with orange juice'],
      ['Johnnie Walker', 20, 'Con o sin Coca-Cola, o con agua.', 'With or without Coca-Cola, or with water.'],
      ["Jack Daniel's", 20, 'Con o sin Coca-Cola, o con agua.', 'With or without Coca-Cola, or with water.'],
      ["Jack Daniel's Honey", 20, '', '']
    ]},
    { es: 'Vinos y otros', en: 'Wine & others', items: [
      ['Sangría por copa', 12, '', '', 'Sangria by the glass'],
      ['Sangría (½ litro)', 18, '', '', 'Sangria (½ liter)'],
      ['Sangría (1 litro)', 34, '', '', 'Sangria (1 liter)'],
      ['José Cuervo (shot)', 12, '', ''],
      ['Anís Nájar (shot)', 11, '', ''],
      ['Jägermeister', 25, 'Con o sin jugo de naranja.', 'With or without orange juice.']
    ]}
  ]}
];
