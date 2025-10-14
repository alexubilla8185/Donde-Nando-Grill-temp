// FIX: Replaced placeholder with a complete content object to resolve module errors.
type LocalizedString = {
  es: string;
  en: string;
};

interface Content {
  appUrl: string;
  nav: Record<'home' | 'menu' | 'reservations' | 'contact', LocalizedString>;
  hero: Record<'headline' | 'subheadline' | 'ctaMenu' | 'ctaReserve', LocalizedString>;
  about: Record<'title' | 'text', LocalizedString>;
  mediaGallery: Record<'title' | 'subtitle', LocalizedString>;
  menu: {
    title: LocalizedString;
    subtitle: LocalizedString;
    viewOriginalMenu: LocalizedString;
    featuredTitle: LocalizedString;
    sidesNote: LocalizedString;
    menuImages: string[];
  };
  reservations: {
    title: LocalizedString;
    form: {
      name: LocalizedString;
      contact: LocalizedString;
      partySize: LocalizedString;
      date: LocalizedString;
      time: LocalizedString;
      reservationType: LocalizedString;
      dineIn: LocalizedString;
      takeout: LocalizedString;
      submit: LocalizedString;
      success: LocalizedString;
      successTypeDineIn: LocalizedString;
      successTypeTakeout: LocalizedString;
    };
  };
  contact: {
    title: LocalizedString;
    subtitle: LocalizedString;
    address: string;
    phone: string;
    email: string;
    googleMapsUrl: string;
    facebook: string;
    instagram: string;
  };
  footer: {
    address: LocalizedString;
    hours: LocalizedString;
    openingHours: LocalizedString;
  };
  shareModal: {
    title: LocalizedString;
    subTitle: LocalizedString;
    shareMessage: LocalizedString;
    copyLabel: LocalizedString;
    copyButton: LocalizedString;
    copiedButton: LocalizedString;
  };
  chatbot: {
      greeting: LocalizedString;
      placeholder: LocalizedString;
      tooltip: LocalizedString;
      title: LocalizedString;
      suggestions: {
          hours: LocalizedString;
          menu: LocalizedString;
          reservation: LocalizedString;
          specials: LocalizedString;
      };
  };
}


export const content: Content = {
  appUrl: 'https://donde-nando-grill.netlify.app',
  nav: {
    home: { es: 'Inicio', en: 'Home' },
    menu: { es: 'Menú', en: 'Menu' },
    reservations: { es: 'Reservas', en: 'Reservations' },
    contact: { es: 'Contacto', en: 'Contact' },
  },
  hero: {
    headline: { es: 'Sabor que Enciende', en: 'Flavor that Ignites' },
    subheadline: { es: 'Experimente el arte de la parrilla con los mejores cortes y un ambiente inolvidable. Donde cada bocado es una celebración.', en: 'Experience the art of the grill with the finest cuts and an unforgettable atmosphere. Where every bite is a celebration.' },
    ctaMenu: { es: 'Ver Menú', en: 'View Menu' },
    ctaReserve: { es: 'Reservar Ahora', en: 'Reserve Now' },
  },
  about: {
    title: { es: 'Nuestra Pasión por la Parrilla', en: 'Our Passion for the Grill' },
    text: { es: 'Donde Nando Grill nació del amor por el fuego y la carne de calidad. Somos un restaurante familiar dedicado a servir los cortes más finos, asados a la perfección, en un ambiente cálido y acogedor. Nuestra misión es crear momentos memorables alrededor de buena comida y buena compañía.', en: 'Donde Nando Grill was born from a love for fire and quality meat. We are a family-owned restaurant dedicated to serving the finest cuts, grilled to perfection, in a warm and welcoming atmosphere. Our mission is to create memorable moments around good food and good company.' },
  },
  mediaGallery: {
    title: { es: 'Una Experiencia Visual', en: 'A Visual Experience' },
    subtitle: { es: 'Deje que nuestros platos hablen por sí mismos. Una muestra de lo que le espera en Donde Nando Grill.', en: 'Let our dishes speak for themselves. A glimpse of what awaits you at Donde Nando Grill.' },
  },
  menu: {
    title: { es: 'Nuestro Menú', en: 'Our Menu' },
    subtitle: { es: 'Cortes selectos y sabores auténticos, preparados con los ingredientes más frescos.', en: 'Select cuts and authentic flavors, prepared with the freshest ingredients.' },
    viewOriginalMenu: { es: 'Ver Menú Original', en: 'View Original Menu' },
    featuredTitle: { es: 'Platos Destacados', en: 'Featured Dishes' },
    sidesNote: { es: 'Todos los platos principales incluyen dos guarniciones a su elección.', en: 'All main courses include two side dishes of your choice.' },
    menuImages: [
        'https://i.ibb.co/JRSqQ2Wv/Entradas.jpg',
        'https://i.ibb.co/39jFsRK4/Platos-Principales.jpg',
        'https://i.ibb.co/wNPhGz3W/Para-Compartir.jpg',
        'https://i.ibb.co/PsH0BvYQ/Bebidas.jpg'
    ],
  },
  reservations: {
    title: { es: 'Haga su Reservación', en: 'Make a Reservation' },
    form: {
      name: { es: 'Nombre completo', en: 'Full Name' },
      contact: { es: 'Teléfono o Email de Contacto', en: 'Contact Phone or Email' },
      partySize: { es: 'Número de Personas', en: 'Number of Guests' },
      date: { es: 'Fecha', en: 'Date' },
      time: { es: 'Hora', en: 'Time' },
      reservationType: { es: 'Tipo de Reservación', en: 'Reservation Type' },
      dineIn: { es: 'Para comer aquí', en: 'Dine-In' },
      takeout: { es: 'Para llevar', en: 'Take-out' },
      submit: { es: 'Confirmar Reserva', en: 'Confirm Reservation' },
      success: { es: '¡Gracias! Hemos recibido su solicitud para {{type}}. Le contactaremos pronto para confirmar.', en: 'Thank you! We have received your request for {{type}}. We will contact you shortly to confirm.' },
      successTypeDineIn: { es: 'una reservación', en: 'a dine-in reservation' },
      successTypeTakeout: { es: 'un pedido para llevar', en: 'a take-out order' }
    }
  },
  contact: {
    title: { es: 'Póngase en Contacto', en: 'Get in Touch' },
    subtitle: { es: 'Estamos aquí para servirle. Llámenos, escríbanos o visítenos.', en: 'We are here to serve you. Call us, write to us, or visit us.' },
    address: 'Rotonda Los Encuentros, 50 metros al Este, Chinandega, Nicaragua',
    phone: '+505 8888 5555',
    email: 'reservas@dondenandogrill.com',
    googleMapsUrl: 'https://maps.app.goo.gl/VAPF3j9D6aYm5BqM7',
    facebook: 'https://www.facebook.com/dondenandogrill',
    instagram: 'https://www.instagram.com/dondenandogrill',
  },
  footer: {
    address: { es: 'Dirección', en: 'Address' },
    hours: { es: 'Horario', en: 'Hours' },
    openingHours: { es: 'Mar - Dom: 12:00 PM - 10:00 PM', en: 'Tue - Sun: 12:00 PM - 10:00 PM' },
  },
  shareModal: {
    title: { es: 'Compartir', en: 'Share' },
    subTitle: { es: '¡Comparta la experiencia con sus amigos!', en: 'Share the experience with your friends!' },
    shareMessage: { es: '¡Te recomiendo Donde Nando Grill! Echa un vistazo a su web:', en: 'I recommend Donde Nando Grill! Check out their website:' },
    copyLabel: { es: 'O copie el enlace', en: 'Or copy the link' },
    copyButton: { es: 'Copiar', en: 'Copy' },
    copiedButton: { es: 'Copiado', en: 'Copied' },
  },
  chatbot: {
      greeting: { es: '¡Hola! Soy el asistente de Donde Nando Grill. ¿Cómo puedo ayudarte hoy? Puedes preguntarme sobre el menú, horarios o hacer una reservación.', en: 'Hi! I am the assistant for Donde Nando Grill. How can I help you today? You can ask me about the menu, hours, or make a reservation.' },
      placeholder: { es: 'Escriba su pregunta...', en: 'Type your question...' },
      tooltip: { es: 'Chatea con nosotros', en: 'Chat with us' },
      title: { es: 'Asistente Virtual', en: 'Virtual Assistant' },
      suggestions: {
          hours: { es: '¿Cuál es su horario?', en: 'What are your hours?' },
          menu: { es: 'Muéstrame el menú', en: 'Show me the menu' },
          reservation: { es: '¿Cómo puedo reservar?', en: 'How can I make a reservation?' },
          specials: { es: '¿Cuáles son los especiales?', en: 'What are the specials?' }
      }
  }
};