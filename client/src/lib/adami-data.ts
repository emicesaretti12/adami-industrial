// ADAMI — Datos estructurados del sitio
// Fuente: especificación proporcionada por el cliente

export const empresa = {
  nombre: "ADAMI",
  nombreCompleto: "Grupo Adami",
  eslogan: "",
  pais: "Argentina",
  ciudad: "Córdoba",
  sitioWeb: "https://www.adami.com.ar/es/",
  idiomas: ["Español", "English", "Português"],
  anioCopyright: 2015,
  trayectoria:
    "Más de 30 años de trayectoria y know how al servicio de la creación, implementación y medición de soluciones tecnológicas de calidad.",
  lema: "Nuestra ley de empuje",
  descripcionProcesos:
    "Iniciamos todos nuestros procesos de desarrollo orientando esfuerzo y experiencia a conocer profundamente su realidad tecnológica y productiva, considerando especialmente las variables técnicas y económicas que hacen posible la verdadera optimización de su negocio.",
  quienesSomos:
    "Somos una organización argentina centrada en la integración de tecnologías como recurso para la optimización de procesos productivos, la mejora en la calidad de los productos y servicios de nuestros clientes y, como resultado, la maximización de sus resultados comerciales. Con más de 30 años de experiencia en el sector industrial, nuestra política de gestión busca constantemente objetivos de mejora continua y alto rendimiento, tanto en el desarrollo profesional de nuestros equipos humanos como en la actualización permanente de la tecnología. Destinamos nuestra visión y recursos para cumplir con los compromisos asumidos y lograr la satisfacción total de nuestros clientes.",
  vision:
    "Trabajamos cada día para ser un referente internacional en integración e innovación tecnológica aplicada a procesos productivos.",
  mision:
    "Nos dedicamos a optimizar procesos industriales productivos mediante la implementación de soluciones tecnológicas que promueven el aumento de la rentabilidad y mejoran la calidad final de los productos de nuestros clientes.",
  politicaCalidad: {
    descripcion:
      "ADAMI se enfoca en proporcionar soluciones industriales a sus clientes, cumpliendo con todos los requisitos legales aplicables, nuestros propios requisitos e incentivando la mejora continua del sistema de gestión de calidad. También preservamos el entorno interno y externo de la empresa. ADAMI opera en el contexto industrial brindando apoyo a la dirección estratégica de la empresa para alcanzar nuestros objetivos, contando con personal capacitado y procesos eficientes, con el objetivo de superarnos, tecnificarnos y mantenernos a la vanguardia del progreso.",
    compromiso:
      "Garantizar la satisfacción de nuestros clientes, crecer y mejorar permanentemente.",
    certificaciones: [
      {
        nombre: "ISO 9001:2015",
        entidad: "Bureau Veritas Certification",
      },
    ],
    pilaresCalidad: [
      "HYS (Higiene y Seguridad)",
    ],
  },
  contacto: {
    direccion: "Leopoldo Casavega 2949, Córdoba, Argentina",
    codigoPostal: "X5011CTO",
    telefonoFax: "+54 9 351 8776244",
    email: "info@adami.com.ar",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.957121123024!2d-64.25327818499886!3d-31.442847381395325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a1f3d59576fb%3A0x9a93d351541eecc4!2sLeopoldo+Casavega+2949%2C+X5011CTO+C%C3%B3rdoba%2C+Argentina!5e0!3m2!1sen!2smx!4v1549837474855",
  },
};

export const servicios = {
  descripcionGeneral:
    "Su empresa puede contar con nosotros. Todos los servicios brindados por nuestra empresa se abordan inicialmente en nuestra unidad de innovación tecnológica, donde profesionales idóneos analizan en profundidad sus demandas y realidades productivas, lo que nos permite desarrollar proyecciones y modelados realmente sustentables, a partir de un trabajo siempre conjunto y un diálogo permanente entre las partes. Gracias a las herramientas de trabajo que aseguran el mejor resultado en cada etapa del desarrollo, hacemos posible el diseño progresivo y la previsualización de los proyectos considerados viables, atendiendo a planes para la fabricación y montaje de piezas, las condiciones de una potencial implementación, los cálculos de funcionamiento en cuanto a fallas y correcciones y las proyecciones presupuestarias y financieras. Durante el proceso de implementación, nuestra empresa asume el desafío de garantizar los resultados en el tiempo, realizando mediciones inteligentes, ajustes clave y comprometiéndose con la calidad final de las soluciones entregadas llave en mano.",
  categorias: [
    {
      id: "innovacion",
      nombre: "Innovación Tecnológica",
      descripcionCorta:
        "Nos orientamos al análisis de situaciones productivas que guían luego el diseño, la fabricación y la implementación de soluciones tecnológicas eficientes, innovadoras y a medida.",
      descripcionExtendida:
        "A partir de las necesidades del cliente, proyectamos y modelamos propuestas para solucionar o bien optimizar los procesos industriales. Durante el desarrollo, aportamos previsualizaciones del diseño, su funcionamiento y potenciales fallas, garantizando así el resultado deseado.",
      detalleServicios: [
        "Diseño Industrial 3D y CAD-CAM",
        "Ingeniería de procesos",
        "Gestión de proyectos industriales",
        "Software de medición PolyWorks",
      ],
      imagen: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    },
    {
      id: "metalurgicos",
      nombre: "Desarrollos Metalúrgicos",
      descripcionCorta:
        "Contamos con la experiencia, el equipo de profesionales y las tecnologías para hacer viable la concreción de sus próximos proyectos bajo estrictas condiciones de calidad.",
      descripcionExtendida:
        "Poseemos una amplia cantidad de equipos de mecanizado y precisión de última tecnología, y realizamos un seguimiento exhaustivo del proyecto desde su inicio hasta el fin de su producción, garantizando nuestro compromiso a través de nuestro servicio de post-venta.",
      detalleServicios: [
        "Fabricaciones especiales a medida",
        "Máquinas, equipos y dispositivos",
        "Coquillas, cajas de noyos y modelos",
        "Matricería y moldes especiales",
        "Mesas Rotativas de 4 y 5 ejes",
      ],
      infraestructura: [
        { area: "Mecanizado y armado", superficie: "330 m² cubiertos", detalle: "Layout de asistencia directa desde las máquinas hacia la línea de ensamble" },
        { area: "Soldadura", superficie: "100 m² cubiertos" },
        { area: "Pintura", superficie: "200 m² cubiertos", detalle: "Capacidad para contener grandes proyectos, con horno de secado que permite cumplir los tiempos de entrega independientemente de las condiciones climáticas" },
      ],
      imagen: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80",
    },
    {
      id: "industriales",
      nombre: "Servicios Industriales",
      descripcionCorta:
        "Brindamos servicios de instalación llave en mano, automatización y medición inteligente, involucrándonos responsablemente en cada una de las etapas de los desarrollos que asumimos.",
      descripcionExtendida:
        "Nuestro equipo asume el desafío de garantizar los resultados en el tiempo, realizando mediciones inteligentes, ajustes clave y comprometiéndose con la calidad final de las soluciones entregadas llave en mano.",
      detalleServicios: [
        "Instalaciones llave en mano",
        "Automatización Industrial",
        "Montaje de líneas y robots",
        "Servicio de medición inteligente",
        "Seguimiento post-venta",
        "Software de medición PolyWorks",
      ],
      metrologia: {
        descripcion:
          "Contamos con dos dispositivos de medición inteligente, Brazo FARO Platinum y Laser Tracker FARO, y software de última generación que nos permite brindar un servicio de metrología dimensional de primer orden para la industria.",
        equipos: ["Brazo FARO Platinum", "Laser Tracker FARO"],
        software: ["PolyWorks"],
      },
      imagen: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    },
  ],
};

export const industrias = {
  descripcionGeneral:
    "En la actualidad, estamos a cargo de medianos y grandes desarrollos para empresas de los sectores: aeronáutico, aeroespacial, automotriz, alimenticio, agroindustrial y nuclear. Contamos con una amplia experiencia en desarrollos de piezas simples, grandes dispositivos para la producción y complejos desarrollos tecnológicos industriales.",
  sectores: [
    { nombre: "Aeronáutica", icon: "plane", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727559/adami-industria-aeronautica-galeria-1-220x260_fswnsi.jpg" },
    { nombre: "Automotriz", icon: "car", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727560/adami-industria-automotriz-galeria-1-220x260_ksphlp.jpg" },
    { nombre: "Agroindustria", icon: "tractor", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727929/agro_ddxrha.jpg" },
    { nombre: "Aeroespacial", icon: "rocket", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727559/adami-industria-aeroespacial-galeria-1-220x260_trzjn4.jpg" },
    { nombre: "Nuclear", icon: "atom", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727560/adami-industria-nuclear-galeria-1-220x260_onmrc7.jpg" },
    { nombre: "Alimenticia", icon: "wheat", image: "https://res.cloudinary.com/di9j6zwyz/image/upload/v1786727560/adami-industria-alimenticia-galeria-1-220x260_zyntht.jpg" },
  ],
};

export const clientes = {
  alianzasEstrategicas: ["ASTI", "CYDAK", "Ixibot Robótica"],
  destacados: [
    "Renault", "Volkswagen", "General Motors Argentina", "Ford", "Fiat",
    "PSA Peugeot Citroën", "Iveco", "CNH Industrial", "ABB", "Comau Argentina S.A.",
    "Denso", "Gestamp", "Magna", "NASA / Nucleoeléctrica", "Invap", "Veng S.A.",
    "CONAE", "Fadea", "Arcor", "Coca-Cola",
  ],
  otros: [
    "ASCANELLI S.A.", "AUTONEUM ARGENTINA S.A.", "BARRAX ARGENTINA S.A.",
    "CEAM SRL", "CIBIE ARGENTINA S.A.", "CONVERFLEX S.A.", "CORLOVE SRL",
    "CORRUGADORA CENTRO S.A.", "DISTRIBUIDORA MARASCA S.R.L.", "DMA SOLUCIONES S.R.L.",
    "EDUARDO H. PEREZ Y HNOS. S.A.", "ESTABLECIMIENTO METALURGICO STURAM S.A.",
    "INDUSTRIAS MONTECOR S.R.L.", "IRB SOLUTIONS S.A.", "JOSE MINETTI Y CIA LTDA SACI",
    "KLOCKNER PENTAPLAST DE ARGENTINA S.A.", "L EQUIPE MONTEUR SA",
    "LABORATORIOS PIPERPOL S.R.L.", "LEM", "MAGNETI MARELLI CONJUNTOS DE ESCAPE S.A",
    "MAGNETTO AUTOMOTIVE ARGENTINA S.A.", "MANUFACTURAS INTEGRALES BALDONI SRL",
    "MATPLACOR S.R.L.", "MATRIMET S.R.L.", "MGI COUTIER ARGENTINA S.A.",
    "MR TECHNOLOGIES S.A.", "NUCLEOELECTRICA ARGENTINA S.A. (NA-SA)",
    "PABSA S.A.", "POLIMETAL", "PRODISMO S.R.L.", "PROMEDON S.R.L.",
    "R Y O VALLE SRL", "STARPLASTIC S.A.", "TOYOTA", "VALEO",
    "VENG S.A.", "VENTURI HNOS S.A.C.I. Y F.", "WEATHERFORD INTERNATIONAL DE ARG S.A.",
  ],
};

export const stats = [
  { value: 30, prefix: "+", suffix: "", label: "Años de trayectoria" },
  { value: 60, prefix: "+", suffix: "", label: "Clientes industriales" },
  { value: 6, prefix: "", suffix: "", label: "Sectores atendidos" },
  { value: 1, prefix: "", suffix: "", label: "Planta industrial" },
];
