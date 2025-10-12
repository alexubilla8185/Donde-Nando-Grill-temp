// FIX: Provided full content for the constants file to resolve module not found errors.
export const content = {
  appUrl: 'https://donde-nando-grill.netlify.app',
  nav: {
    home: { es: 'Inicio', en: 'Home' },
    menu: { es: 'Menú', en: 'Menu' },
    reservations: { es: 'Reservaciones', en: 'Reservations' },
    contact: { es: 'Contacto', en: 'Contact' },
  },
  hero: {
    headline: { es: 'Donde Nando Grill', en: 'Donde Nando Grill' },
    subheadline: { es: 'El auténtico sabor de la parrilla nicaragüense. Carnes de primera, ambiente familiar y momentos inolvidables.', en: 'The authentic taste of Nicaraguan grill. Premium meats, family atmosphere, and unforgettable moments.' },
    ctaMenu: { es: 'Ver Menú', en: 'View Menu' },
    ctaReserve: { es: 'Reservar Mesa', en: 'Book a Table' },
  },
  about: {
    title: { es: 'Nuestra Historia', en: 'Our Story' },
    text: { es: 'Desde 2005, Donde Nando Grill ha sido el rincón preferido para los amantes de la buena carne. Nuestra pasión es ofrecer cortes de la más alta calidad, preparados con el sazón tradicional que nos caracteriza. Somos un negocio familiar dedicado a crear experiencias únicas para cada uno de nuestros clientes.', en: 'Since 2005, Donde Nando Grill has been the favorite corner for lovers of good meat. Our passion is to offer the highest quality cuts, prepared with the traditional seasoning that characterizes us. We are a family business dedicated to creating unique experiences for each of our clients.' },
  },
  mediaGallery: {
    title: { es: 'Galería de Sabores', en: 'Gallery of Flavors' },
    subtitle: { es: 'Un vistazo a nuestros platillos y el ambiente que te espera.', en: 'A glimpse of our dishes and the atmosphere that awaits you.' },
  },
  reservations: {
    title: { es: 'Haz tu Reservación', en: 'Make a Reservation' },
    form: {
      name: { es: 'Nombre Completo', en: 'Full Name' },
      contact: { es: 'Teléfono o Email', en: 'Phone or Email' },
      partySize: { es: 'Personas', en: 'Party Size' },
      date: { es: 'Fecha', en: 'Date' },
      time: { es: 'Hora', en: 'Time' },
      submit: { es: 'Confirmar Reservación', en: 'Confirm Reservation' },
      success: { es: '¡Gracias! Hemos recibido tu solicitud para {{type}}. Te contactaremos pronto para confirmar.', en: 'Thank you! We have received your request for {{type}}. We will contact you soon to confirm.' },
      reservationType: { es: 'Tipo de Pedido', en: 'Order Type' },
      dineIn: { es: 'Para Comer Aquí', en: 'Dine-In' },
      takeout: { es: 'Para Llevar', en: 'Takeout' },
      successTypeDineIn: { es: 'una reservación', en: 'a reservation' },
      successTypeTakeout: { es: 'un pedido para llevar', en: 'a takeout order' },
    },
  },
  footer: {
    address: { es: 'Dirección', en: 'Address' },
    hours: { es: 'Horarios', en: 'Hours' },
    openingHours: { es: 'Mar - Dom: 12pm - 10pm', en: 'Tue - Sun: 12pm - 10pm' },
  },
  contact: {
    title: { es: 'Contáctanos', en: 'Contact Us' },
    subtitle: { es: 'Estamos para servirte. ¡Visítanos o llámanos!', en: 'We are here to serve you. Visit or call us!' },
    address: 'A 700 metros al norte de la Rotonda Los Encuentros, Chinandega, Nicaragua',
    googleMapsUrl: 'https://www.google.com/maps/place/Donde+Nando+Grill/@12.6392078,-87.1354388,17z/data=!3m1!4b1!4m6!3m5!1s0x8f0d8a9b233a788b:0xd411802e88a0b503!8m2!3d12.6392078!4d-87.1328639!16s%2Fg%2F11b6x_k8n5?entry=ttu',
    phone: '+505 8470 9484',
    email: 'dondenando@gmail.com',
    facebook: 'https://www.facebook.com/dondenandogrill',
    instagram: 'https://www.instagram.com/dondenandogrill',
  },
  menu: {
    title: { es: 'Nuestro Menú', en: 'Our Menu' },
    subtitle: { es: 'Calidad y sabor en cada corte.', en: 'Quality and flavor in every cut.' },
    viewOriginalMenu: { es: 'Ver Menú Original', en: 'View Original Menu' },
    featuredTitle: { es: 'Platillos Estrella', en: 'Featured Dishes' },
    sidesNote: { es: 'Todos nuestros platos fuertes incluyen dos acompañamientos a su elección.', en: 'All our main courses include two side dishes of your choice.' },
    dishes: {
      churrasco_nica: {
        name: { es: 'Churrasco Nica', en: 'Nica Churrasco' },
        description: { es: 'El clásico corte nicaragüense, jugoso y lleno de sabor, servido con gallo pinto, tajadas y ensalada.', en: 'The classic Nicaraguan cut, juicy and full of flavor, served with gallo pinto, fried plantains, and salad.' },
      },
      tomahawk: {
        name: { es: 'Tomahawk Steak', en: 'Tomahawk Steak' },
        description: { es: 'Un impresionante corte con hueso de 32oz, perfecto para compartir. Madurado a la perfección y asado a la parrilla.', en: 'An impressive 32oz bone-in cut, perfect for sharing. Aged to perfection and grilled.' },
      },
    },
    categories: [
      {
        name: { es: 'Carnes a la Parrilla', en: 'Grilled Meats' },
        items: [
          { name: { es: 'Churrasco de Res (8oz)', en: 'Beef Churrasco (8oz)' }, price: 'C$350' },
          { name: { es: 'Puyazo Importado (10oz)', en: 'Imported Sirloin (10oz)' }, price: 'C$450' },
          { name: { es: 'Filete de Pollo', en: 'Chicken Fillet' }, price: 'C$280' },
          { name: { es: 'Costillas de Cerdo BBQ', en: 'BBQ Pork Ribs' }, price: 'C$380' },
          { name: { es: 'Lomo de Cerdo', en: 'Pork Loin' }, price: 'C$320' },
        ],
      },
      {
        name: { es: 'Entradas', en: 'Appetizers' },
        items: [
          { name: { es: 'Chorizo Criollo', en: 'Creole Sausage' }, price: 'C$150' },
          { name: { es: 'Queso Frito', en: 'Fried Cheese' }, price: 'C$180' },
          { name: { es: 'Tacos de Res (3)', en: 'Beef Tacos (3)' }, price: 'C$200' },
        ],
      },
      {
        name: { es: 'Bebidas', en: 'Drinks' },
        items: [
          { name: { es: 'Gaseosa', en: 'Soda' }, price: 'C$40' },
          { name: { es: 'Cerveza Nacional', en: 'National Beer' }, price: 'C$50' },
          { name: { es: 'Jugo Natural', en: 'Natural Juice' }, price: 'C$60' },
        ],
      },
    ],
    menuImages: [
      'https://images.unsplash.com/photo-1565299585323-15d11e3835e4?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop',
    ],
  },
  shareModal: {
    title: { es: 'Compartir', en: 'Share' },
    subTitle: { es: '¡Comparte el sabor de Donde Nando Grill con tus amigos!', en: 'Share the taste of Donde Nando Grill with your friends!' },
    shareMessage: { es: '¡Te recomiendo este restaurante!', en: 'I recommend this restaurant!' },
    copyLabel: { es: 'O copia el enlace', en: 'Or copy the link' },
    copyButton: { es: 'Copiar', en: 'Copy' },
    copiedButton: { es: 'Copiado', en: 'Copied' },
  },
  chatbot: {
    headerTitle: { es: 'Asistente Nando', en: 'Nando\'s Assistant' },
    greeting: { es: '¡Hola! Soy el asistente virtual de Donde Nando Grill. Puedo ayudarte con el menú, reservaciones o nuestra información de contacto.', en: 'Hi! I\'m the virtual assistant for Donde Nando Grill. I can help with the menu, reservations, or our contact info.' },
    inputPlaceholder: { es: 'Escribe tu pregunta...', en: 'Type your question...' },
    suggestions: {
      menu: { es: 'Ver Menú', en: 'View Menu' },
      reservations: { es: 'Hacer una Reservación', en: 'Make a Reservation' },
      contact: { es: 'Info de Contacto', en: 'Contact Info' },
    },
    contactInfoResponse: { es: '¡Claro! Nuestra dirección es De la rotonda universitaria, 2km al sur, Managua. Y nuestro teléfono es +505 8888 8888.', en: 'Of course! Our address is De la rotonda universitaria, 2km al sur, Managua. And our phone number is +505 8888 8888.' },
    errorMessage: { es: 'Lo siento, tengo problemas para conectarme en este momento. Por favor, intenta de nuevo más tarde.', en: 'Sorry, I\'m having trouble connecting right now. Please try again later.'}
  }
};