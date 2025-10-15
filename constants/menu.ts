// Define types for the menu data for type safety
export interface MenuItem {
    name_es: string;
    name_en: string;
    price: number;
    notes_es?: string;
    notes_en?: string;
}

export interface MenuSection {
    title_es: string;
    title_en: string;
    items: MenuItem[];
}

export interface MenuData {
    menu_sections: MenuSection[];
}

export const menuData: MenuData = {
  "menu_sections": [
    {
      "title_es": "Entradas",
      "title_en": "Starters/Appetizers",
      "items": [
        {"name_es": "Glándulas de Timo", "name_en": "Thymus Glands", "price": 255, "notes_es": "Mollejas salteadas con limón, sal y salsa de aguacate.", "notes_en": "Sautéed thymus glands with lemon, salt, and avocado sauce."},
        {"name_es": "La Tablita", "name_en": "The Board", "price": 385, "notes_es": "Tortillas fritas, frijoles molidos, carne picada y pico de gallo.", "notes_en": "Fried tortillas, refried beans, minced meat, and pico de gallo."},
        {"name_es": "Tuétano", "name_en": "Bone Marrow", "price": 265, "notes_es": "Sorprendentemente delicioso y nutritivo.", "notes_en": "Surprisingly delicious and nutritious."},
        {"name_es": "Ceviche La Flaca", "name_en": "La Flaca Ceviche", "price": 305, "notes_es": "Camarón, cebolla morada, culantro, chile jalapeño y limón.", "notes_en": "Shrimp, red onion, cilantro, jalapeño pepper, and lime."},
        {"name_es": "Canasta de Plátanos", "name_en": "Plantain Baskets", "price": 425, "notes_es": "9 canastas rellenas de cerdo desmechado al BBQ.", "notes_en": "9 baskets filled with BBQ pulled pork."},
        {"name_es": "Fajita de Pollo", "name_en": "Chicken Fajita", "price": 425, "notes_es": "Pollo salteado, cebolla, pimentones, acompañado de tortillas, pico de gallo, crema y guacamole.", "notes_en": "Sautéed chicken, onion, bell peppers, served with tortillas, pico de gallo, cream, and guacamole."},
        {"name_es": "Papas Rellenas", "name_en": "Stuffed Potatoes", "price": 345, "notes_es": "5 unidades rellenas con carne picada y ensalada de cebolla morada.", "notes_en": "5 units filled with minced meat and red onion salad."},
        {"name_es": "Albóndigas de Ternera", "name_en": "Veal Meatballs", "price": 345, "notes_es": "5 albóndigas cocinadas a fuego lento con salsa de pitaya.", "notes_en": "5 meatballs slow-cooked with dragon fruit sauce."},
        {"name_es": "Sliders", "name_en": "Beef Sliders", "price": 385, "notes_es": "3 mini hamburguesas de res.", "notes_en": "3 mini beef burgers."},
        {"name_es": "Chicharrón Colombiano", "name_en": "Colombian Pork Belly", "price": 505, "notes_es": "1 lb de panceta frita, tortilla, pico de gallo, chifrijo casero.", "notes_en": "1 lb of fried pork belly, tortilla, pico de gallo, homemade chifrijo."},
        {"name_es": "Tacos de Res", "name_en": "Beef Tacos", "price": 505, "notes_es": "4 unidades acompañados de nuestras tres salsas.", "notes_en": "4 units served with our three sauces."},
        {"name_es": "Chorizo Parrillero", "name_en": "Grilled Sausage", "price": 435, "notes_es": "4 unidades acompañadas de salsa cúrcuma de Agroamigos.", "notes_en": "4 units served with turmeric sauce from Agroamigos."},
        {"name_es": "Anticucho", "name_en": "Grilled Skewers", "price": 355, "notes_es": "6 unidades de corazón asado y papa a la mantequilla.", "notes_en": "6 units of grilled heart and buttered potato."},
        {"name_es": "Quesadilla de Pollo", "name_en": "Chicken Quesadilla", "price": 455, "notes_es": "Tortilla de harina rellena de pollo, queso parmesano y pimentones.", "notes_en": "Flour tortilla filled with chicken, parmesan cheese, and bell peppers."},
        {"name_es": "Carpaccio de Res", "name_en": "Beef Carpaccio", "price": 555, "notes_es": "Láminas muy finas de carne cruda, aderezada.", "notes_en": "Very thin slices of raw, seasoned beef."},
        {"name_es": "Brocheta de Res", "name_en": "Beef Skewer", "price": 535, "notes_es": "2 unidades de brocheta de res con cebolla, chiltoma y papa asada.", "notes_en": "2 units of beef skewer with onion, sweet pepper, and roasted potato."},
        {"name_es": "Mary Tacos", "name_en": "Mary Tacos", "price": 345, "notes_es": "4 tacos tostados rellenos de carne picada.", "notes_en": "4 toasted tacos filled with minced meat."},
        {"name_es": "Enchiladas de Res", "name_en": "Beef Enchiladas", "price": 355, "notes_es": "6 tortillas fritas acompañada de ensalada criolla y chilero.", "notes_en": "6 fried tortillas served with creole salad and chili sauce."},
        {"name_es": "Enchiladas de Pollo", "name_en": "Chicken Enchiladas", "price": 335, "notes_es": "6 tortillas fritas rellenas de pollo.", "notes_en": "6 fried tortillas filled with chicken."},
        {"name_es": "Repochetas", "name_en": "Cheese Repochetas", "price": 215, "notes_es": "6 tortillas fritas rellenas de queso.", "notes_en": "6 fried tortillas filled with cheese."},
        {"name_es": "Sopa de Res (Grande)", "name_en": "Beef Soup (Large)", "price": 395},
        {"name_es": "Sopa de Res (Pequeña)", "name_en": "Beef Soup (Small)", "price": 255},
        {"name_es": "Sopa de Albóndigas", "name_en": "Meatball Soup", "price": 305, "notes_es": "Solo Miércoles.", "notes_en": "Wednesdays only."},
        {"name_es": "Sopa de Mondongo", "name_en": "Tripe Soup", "price": 305, "notes_es": "Solo Viernes.", "notes_en": "Fridays only."},
        {"name_es": "Arroz Aguado", "name_en": "Watery Rice", "price": 575, "notes_es": "Clásico con cerdo y maduro.", "notes_en": "Classic Nicaraguan with pork and sweet plantain."},
        {"name_es": "Ensalada Nando", "name_en": "Nando Salad", "price": 385, "notes_es": "Lechuga, espinaca, camarón, cebolla, aceitunas, tocino, palmitos, queso y vinagreta.", "notes_en": "Lettuce, spinach, shrimp, onion, olives, bacon, hearts of palm, cheese and vinaigrette."},
        {"name_es": "Extra de Pollo (para ensalada)", "name_en": "Extra Chicken (for salad)", "price": 185}
      ]
    },
    {
      "title_es": "Platos Principales",
      "title_en": "Main Dishes (Beef/Mixed)",
      "items": [
        {"name_es": "Short Rib", "name_en": "Short Rib", "price": 685, "notes_es": "Corte de carne con marmoleado abundante, jugoso.", "notes_en": "A cut of meat with abundant, juicy marbling."},
        {"name_es": "Entraña", "name_en": "Skirt Steak", "price": 875, "notes_es": "Uno de los cortes más populares, gran sabor.", "notes_en": "One of the most popular cuts, great flavor."},
        {"name_es": "Puyazo", "name_en": "Sirloin Cap", "price": 925, "notes_es": "Tierno, con sabor jugoso, se recomienda término 1/2 o 3/4.", "notes_en": "Tender, with a juicy flavor, medium or medium-well is recommended."},
        {"name_es": "Lomo Salteado", "name_en": "Sautéed Loin", "price": 605, "notes_es": "Trozos de carne salteados, cebolla morada, tomate y culantro.", "notes_en": "Sautéed beef pieces, red onion, tomato, and cilantro."},
        {"name_es": "Hamburguesa Nando", "name_en": "Nando Burger", "price": 705, "notes_es": "Doble torta de carne, pan artesanal, jamón, huevo, queso, y vegetales.", "notes_en": "Double meat patty, artisanal bread, ham, egg, cheese, and vegetables."},
        {"name_es": "Hamburguesa La Preferida", "name_en": "The Favorite Burger", "price": 535, "notes_es": "Una torta de carne, pan artesanal, queso americano, y vegetales.", "notes_en": "A single meat patty, artisanal bread, American cheese, and vegetables."},
        {"name_es": "Medallones de Ternera", "name_en": "Veal Medallions", "price": 705, "notes_es": "Carne envuelta en tocino, salsa de hongos, sobre puré de papa.", "notes_en": "Meat wrapped in bacon, mushroom sauce, over mashed potatoes."},
        {"name_es": "Churrasco Box", "name_en": "Churrasco Box", "price": 805, "notes_es": "Filete de res con salsa chimichurri o salsa jalapeña.", "notes_en": "Beef fillet with chimichurri sauce or jalapeño sauce."},
        {"name_es": "Churrasco 16oz", "name_en": "Churrasco 16oz", "price": 1485, "notes_es": "Filete de res con salsa chimichurri o salsa jalapeña.", "notes_en": "Beef fillet with chimichurri sauce or jalapeño sauce."},
        {"name_es": "Lomo Nando", "name_en": "Nando Loin", "price": 905, "notes_es": "Delicioso lomo de costilla de res.", "notes_en": "Delicious beef rib loin."},
        {"name_es": "El Nando", "name_en": "The Nando", "price": 1895, "notes_es": "2 lb de carne de res, tierna y jugosa.", "notes_en": "2 lbs of tender and juicy beef."},
        {"name_es": "El Grill (Mezcla de sabores)", "name_en": "The Grill (Flavor Mix)", "price": 2105, "notes_es": "Res, pollo y cerdo con tuétano, chorrizo, tomate, cebollines asados.", "notes_en": "Beef, chicken, and pork with bone marrow, sausage, tomato, and grilled scallions."}
      ]
    },
    {
      "title_es": "Cortes Especiales",
      "title_en": "Special Cuts (Premium)",
      "items": [
        {"name_es": "Tomahawk", "name_en": "Tomahawk", "price": 1815, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "Porterhouse", "name_en": "Porterhouse", "price": 1425, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "Cow Boy", "name_en": "Cow Boy", "price": 1105, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "Ribeye Steak", "name_en": "Ribeye Steak", "price": 1145, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "New York Steak", "name_en": "New York Steak", "price": 1145, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "Tenderloin", "name_en": "Tenderloin", "price": 1495, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "Flat Iron", "name_en": "Flat Iron", "price": 1245, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "Prime Rib", "name_en": "Prime Rib", "price": 1665, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "Lomo al Trapo", "name_en": "Loin in Cloth", "price": 1655, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "California Steak", "name_en": "California Steak", "price": 1005, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."},
        {"name_es": "Lengua Asada", "name_en": "Grilled Tongue", "price": 1375, "notes_es": "Incluye dos guarniciones.", "notes_en": "Includes two side dishes."}
      ]
    },
    {
      "title_es": "Para Compartir",
      "title_en": "To Share",
      "items": [
        {"name_es": "Picada Donde Nando", "name_en": "Donde Nando Platter", "price": 580, "notes_es": "Tabla mixta con carne, pollo, salchicha, queso y tostones.", "notes_en": "Mixed platter with meat, chicken, sausage, cheese, and plantains."},
        {"name_es": "Fajitas de Pollo (o Carne)", "name_en": "Chicken (or Beef) Fajitas", "price": 425, "notes_es": "Fajitas salteadas, servidas con tortillas, pico de gallo, crema y guacamole.", "notes_en": "Sautéed fajitas, served with tortillas, pico de gallo, cream, and guacamole."},
        {"name_es": "Marynando", "name_en": "Marynando Platter", "price": 1245, "notes_es": "Carne de res, pollo y cerdo, tortilla, frijoles, queso, crema, ensalada.", "notes_en": "Beef, chicken, and pork, with tortilla, beans, cheese, cream, and salad."}
      ]
    },
    {
      "title_es": "Pollo Y Cerdo",
      "title_en": "Chicken & Pork Mains",
      "items": [
        {"name_es": "Cochinita", "name_en": "Marinated Pork", "price": 775, "notes_es": "Trozos de cerdo marinados, acompañados de frijoles y tortilla.", "notes_en": "Marinated pork pieces, served with beans and tortilla."},
        {"name_es": "Filete de Pollo", "name_en": "Chicken Fillet", "price": 685, "notes_es": "A la parrilla con salsa de ajo y limón.", "notes_en": "Grilled with garlic and lime sauce."},
        {"name_es": "Pollo Asado sin Hueso", "name_en": "Boneless Roasted Chicken", "price": 715, "notes_es": "1/2 pollo a la parrilla.", "notes_en": "1/2 grilled chicken."},
        {"name_es": "Hamburguesa de Pollo", "name_en": "Chicken Burger", "price": 485, "notes_es": "Filete de pollo a la parrilla, pan artesanal y papas fritas.", "notes_en": "Grilled chicken fillet, artisanal bread, and french fries."},
        {"name_es": "Lomo de Cerdo", "name_en": "Pork Loin", "price": 765, "notes_es": "Delicioso cerdo preparado al achiote.", "notes_en": "Delicious pork prepared with achiote."},
        {"name_es": "Costilla de Cerdo", "name_en": "Pork Rib", "price": 875, "notes_es": "Bañadas en nuestra salsa original BBQ.", "notes_en": "Covered in our original BBQ sauce."},
        {"name_es": "Sándwich de Cerdo Desmechado", "name_en": "Pulled Pork Sandwich", "price": 575, "notes_es": "Cerdo desmechado en salsa BBQ, cebolla, ensalada y papas campesinas.", "notes_en": "Pulled pork in BBQ sauce, onion, salad, and country-style potatoes."}
      ]
    },
    {
      "title_es": "Guarniciones",
      "title_en": "Side Dishes",
      "items": [
        {"name_es": "Ensalada de Lechuga", "name_en": "Lettuce Salad", "price": 145},
        {"name_es": "Ensalada Criolla", "name_en": "Creole Salad", "price": 145},
        {"name_es": "Ensalada de Pepino", "name_en": "Cucumber Salad", "price": 145},
        {"name_es": "Ensalada de Remolacha", "name_en": "Beet Salad", "price": 145},
        {"name_es": "Puré de Quequisque", "name_en": "Quequisque Mash", "price": 145},
        {"name_es": "Puré de Calabaza", "name_en": "Squash Mash", "price": 145},
        {"name_es": "Puré de Papa", "name_en": "Mashed Potatoes", "price": 145},
        {"name_es": "Vegetales Salteados", "name_en": "Sautéed Vegetables", "price": 145},
        {"name_es": "Cebollines Asados", "name_en": "Grilled Scallions", "price": 145},
        {"name_es": "Tomate Asado", "name_en": "Grilled Tomato", "price": 145},
        {"name_es": "Jalapeños Toreados", "name_en": "Sautéed Jalapeños", "price": 145},
        {"name_es": "Papas Campesinas", "name_en": "Country Style Potatoes", "price": 145},
        {"name_es": "Papas Fritas", "name_en": "French Fries", "price": 145},
        {"name_es": "Papas Asadas", "name_en": "Roasted Potatoes", "price": 145},
        {"name_es": "Tostones", "name_en": "Fried Plantains", "price": 145},
        {"name_es": "Tajadas de Plátano", "name_en": "Plantain Slices", "price": 145},
        {"name_es": "Patacón de Banano", "name_en": "Banana Patacón", "price": 145},
        {"name_es": "Maduros Piscosos", "name_en": "Piscosos Sweet Plantains", "price": 145},
        {"name_es": "Empanadas de Maduro", "name_en": "Sweet Plantain Empanadas", "price": 145},
        {"name_es": "Canoa de Maduro Rellena", "name_en": "Stuffed Sweet Plantain Canoe", "price": 145},
        {"name_es": "Arroz Blanco", "name_en": "White Rice", "price": 145},
        {"name_es": "Gallo Pinto", "name_en": "Rice and Beans", "price": 145},
        {"name_es": "Frijoles Molidos", "name_en": "Refried Beans", "price": 145},
        {"name_es": "Yuca Frita al Mojo de Ajo", "name_en": "Fried Yuca with Garlic Mojo", "price": 145},
        {"name_es": "Chicharrones de Puerco", "name_en": "Pork Rinds", "price": 145},
        {"name_es": "Tortilla de Maíz", "name_en": "Corn Tortilla", "price": 145},
        {"name_es": "Queso Asado", "name_en": "Grilled Cheese", "price": 145}
      ]
    },
    {
      "title_es": "Bebidas",
      "title_en": "Drinks",
      "items": [
        {"name_es": "Aguas (Simple, Gaseosas, Club Soda)", "name_en": "Water & Sodas", "price": 45, "notes_es": "Precios varían hasta C$65.", "notes_en": "Prices vary up to C$65."},
        {"name_es": "Jugo de naranja", "name_en": "Orange Juice", "price": 105},
        {"name_es": "Refrescos naturales", "name_en": "Natural Soft Drinks", "price": 95},
        {"name_es": "Café", "name_en": "Coffee", "price": 35},
        {"name_es": "Cervezas Nacionales", "name_en": "Local Beers", "price": 55, "notes_es": "Toña, Victoria Clásica, Toña Ultra, Toña Lite, etc. Precios varían.", "notes_en": "Toña, Victoria Clásica, Toña Ultra, Toña Lite, etc. Prices vary."},
        {"name_es": "Cervezas Importadas", "name_en": "Imported Beers", "price": 95, "notes_es": "Heineken, Miller Lite, Smirnoff, Sol. Precios varían.", "notes_en": "Heineken, Miller Lite, Smirnoff, Sol. Prices vary."},
        {"name_es": "Hard Seltzer Spark", "name_en": "Hard Seltzer Spark", "price": 75},
        {"name_es": "Vinos (Copa/Botella)", "name_en": "Wines (Glass/Bottle)", "price": 95, "notes_es": "Varios tipos, precios hasta C$1,915.", "notes_en": "Various types, prices up to C$1,915."},
        {"name_es": "Sangría Copa", "name_en": "Sangria Glass", "price": 165},
        {"name_es": "Michelada Mix Don Señor", "name_en": "Michelada Mix", "price": 65},
        {"name_es": "Licores (1/2 Botella)", "name_en": "Spirits (1/2 Bottle)", "price": 265, "notes_es": "Ron, Tequila, Whiskey, Vodka. Precios varían de C$265 a C$1,895.", "notes_en": "Rum, Tequila, Whiskey, Vodka. Prices vary from C$265 to C$1,895."}
      ]
    }
  ]
}