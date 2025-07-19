import { useState, useRef, useEffect } from "react";
// Manual Arrow Icon Component
const ArrowRight = ({ className = "" }) => (
  <svg 
    className={className} 
    width="16" 
    height="16" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
  </svg>
);

// Snow Animation Component
const SnowAnimation = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      const flakes = [];
      for (let i = 0; i < 50; i++) {
        flakes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * -100,
          size: Math.random() * 3 + 2,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          drift: Math.random() * 2 - 1
        });
      }
      setSnowflakes(flakes);
    };

    generateSnowflakes();
  }, []);

  useEffect(() => {
    const animateSnow = () => {
      setSnowflakes(prevFlakes => 
        prevFlakes.map(flake => ({
          ...flake,
          y: flake.y > 110 ? -10 : flake.y + flake.speed * 1.2,
          x: flake.x > 105 ? -5 : flake.x + flake.speed * 0.9
        }))
      );
    };

    const interval = setInterval(animateSnow, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </div>
  );
};

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ title, sections, isComingSoon, gradientFrom = "from-blue-900", gradientTo = "to-purple-900" }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return (
        <p className="text-xs md:text-sm lg:text-base opacity-80 text-justify leading-relaxed">
          {content}
        </p>
      );
    } else if (Array.isArray(content)) {
      return (
        <ul className="text-xs md:text-sm lg:text-base opacity-80 space-y-1">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-white mr-2 mt-1 text-xs">•</span>
              <span className="text-justify leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="relative size-full">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-90`} />
      
      {/* Snow Animation */}
      <SnowAnimation />
      
      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-3 md:p-5 text-white">
        <div className="flex-1 overflow-hidden">
          <h1 className="bento-title text-center font-bold text-lg md:text-2xl lg:text-3xl mb-4 md:mb-6 lg:mb-8">{title}</h1>
          
          {/* Multiple Sections Container */}
          {sections && sections.length > 0 && (
            <div className="flex flex-col lg:flex-row justify-between gap-3 md:gap-4 lg:gap-6 h-full overflow-y-auto">
              {sections.map((section, index) => (
                <div key={index} className="flex-1 min-w-0 px-2 md:px-4 lg:px-6">
                  {section.subtitle && (
                    <h3 className="font-semibold text-sm md:text-lg lg:text-xl mb-2 md:mb-3 text-white">
                      {section.subtitle}
                    </h3>
                  )}
                  <div className="overflow-y-auto max-h-48 md:max-h-64 lg:max-h-full">
                    {renderContent(section.content)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProgramCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const programs = [
    {
      title: (
        <>
          TOKUTEI GINOU <b>( TG )</b>
        </>
      ),
      sections: [
        {
          subtitle: "Deskripsi",
          content: "program visa kerja resmi dari pemerintah Jepang yang ditujukan untuk tenaga kerja asing yang memiliki keterampilan khusus dalam bidang tertentu. Program ini bukan magang, melainkan status kerja penuh dengan gaji dan hak-hak seperti pekerja Jepang lainnya."
        },
        {
          subtitle: "Alur Pembelajaran",
          content: [
            "Pelatihan Bahasa , Skill, dan Wawancara",
            "Test Skill ( SSW ) dan Test Bahasa ( JLPT )",
            "Pencarian JOB ( Job Order )",
            "Wawancara dengan Perusahaan Jepang",
            "Pengurusan COE",
            "Pengurusan Visa",
            "Keberangkatan ke Jepang"
          ]
        },
      ],
      gradientFrom: "from-gray-800",
      gradientTo: "to-white-400"
    },
    {
      title: (
        <>
          PROGRAM <b>MAGANG</b> SWASTA
        </>
      ),
      sections: [
        {
          subtitle: "Deskripsi",
          content: `Program magang kerja ke Jepang melalui jalur kerja sama dengan LPK resmi yang telah memiliki lisensi sebagai Sending Organization (SO). Peserta akan menjalani pelatihan bahasa dan keterampilan kerja sebelum diberangkatkan ke perusahaan Jepang dalam berbagai sektor industri . Program ini bertujuan untuk memberikan pengalaman kerja internasional dan transfer teknologi, sekaligus meningkatkan kedisiplinan dan kemandirian peserta.`
        },
        {
          subtitle: "Kewajiban Peserta",
          content: [
            "Kontrak Kerja selama 1 - 3 tahun",
            "Menaati peraturan yang ditetapkan oleh LPK dan perusahaan Jepang",
            "Kembali ke Indonesia setelah masa kontrak berakhir",
          ]
        },
      ],
      gradientFrom: "from-gray-800",
      gradientTo: "to-white-400"
    },
    {
      title: (
        <>
          PROGRAM MAGANG NEGERI
        </>
      ),
      sections: [
        {
          subtitle: "Deskripsi",
          content: `Program magang ke Jepang melalui kerja sama resmi dengan pemerintah Indonesia dan IM Japan. Peserta akan mengikuti proses seleksi ketat dan pelatihan komprehensif sebelum diberangkatkan. Tujuan utama program ini adalah untuk menciptakan tenaga kerja yang terampil, mandiri, dan siap bersaing secara global melalui pengalaman kerja nyata di Jepang.`
        },
        {
          subtitle: "Layanan & Fasilitas",
          content: [
            "Seleksi dan pelatihan yang difasilitasi langsung oleh pemerintah Indonesia",
            "Biaya pemberangkatan sangat ringan hingga gratis",
            "Pelatihan intensif bahasa, budaya kerja, dan fisik selama masa pra-pemberangkatan",
            "Sertifikat pengalaman kerja dan peluang wirausaha setelah kembali ke Indonesia"
          ]
        },
      ],
      gradientFrom: "from-gray-800",
      gradientTo: "to-white-400"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlay]);

  return (
    <div className="relative w-full">
      {/* Main Carousel */}
      <div 
        className="relative h-[700px] md:h-[800px] lg:h-[70vh] overflow-hidden rounded-md"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {programs.map((program, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <BentoTilt className="border-hsla relative h-full w-full overflow-hidden rounded-md border border-white/10">
                <BentoCard
                  title={program.title}
                  sections={program.sections}
                  gradientFrom={program.gradientFrom}
                  gradientTo={program.gradientTo}
                  isComingSoon
                />
              </BentoTilt>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {programs.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-blue-500 scale-110' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Program Counter */}
      <div className="text-center mt-4 text-blue-50/70 text-sm">
        {currentSlide + 1} / {programs.length}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-10 py-32">
        <h1 className="font-bold text-center text-6xl text-blue-50 mb-10">
          TENTANG KAMI
        </h1>
        <p className="mt-6 w-auto text-lg text-white opacity-85">
          LPK KIBOU adalah Lembaga Pelatihan Kerja yang berdiri sejak 2023 
          sebagai Lembaga resmi yang menyediakan layanan untuk pendidikan bahasa jepang dan pengiriman tenaga kerja
          ke Jepang. Kami menyediakan 
          pelatihan bahasa Jepang intensif dan penempatan kerja di berbagai 
          bidang seperti manufaktur, konstruksi, kaigo (perawat lansia), 
          cleaning service, dan industri otomotif di perusahaan 
          terpercaya di seluruh Jepang.
        </p>
        <div className="flex flex-col items-start gap-10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:w-auto">
            <h1 className="mt-7 text-lg text-white">
              VISI
            </h1>
            <p className="mt-6 max-w-md text-justify text-lg text-white opacity-85">
              Menjadi lembaga pelatihan keterampilan unggulan dalam pengembangan Bahasa Jepang, yang profesional dan adaptif terhadap perkembangan global serta teknologi, demi mencetak sumber daya manusia yang siap bersaing di tingkat internasional
            </p>
          </div>
          
          <div className="w-full lg:w-auto">
            <h1 className="mt-7 text-lg text-white">
              MISI
            </h1>
            <ul>
              <li className="mt-6 max-w-md text-justify text-lg text-white opacity-85">
                Menyiapkan peserta didik untuk siap mengikuti program magang kerja di luar negeri, khususnya di Jepang, dengan keterampilan dan sikap profesional.
              </li>
              <li className="mt-6 max-w-md text-justify text-lg text-white opacity-85">
                Memberikan layanan pendidikan dan pelatihan yang berkualitas, berorientasi pada kebutuhan masyarakat serta perkembangan dunia kerja global.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Program Section */}
      <div className="mt-20">
        <h1 className="font-bold text-center text-6xl text-blue-50 mb-10">
          PROGRAM
        </h1>
        <ProgramCarousel />
      </div>
    </div>
  </section>
);

export default Features;