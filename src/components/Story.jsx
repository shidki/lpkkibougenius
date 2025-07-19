import { useState, useRef, useEffect } from "react";

const AnimatedTitle = ({ title, containerClass = "" }) => {
  const [fontSize, setFontSize] = useState('20px');

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setFontSize('24px'); // mobile
      } else if (width < 1024) {
        setFontSize('32px'); // tablet
      } else if (width < 1280) {
        setFontSize('40px'); // desktop
      } else {
        setFontSize('48px'); // xl
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  return (
    <div className={containerClass}>
      <h1 
        className="special-font hero-heading text-blue-50 font-bold text-center"
        style={{ 
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', 
          fontSize: fontSize,
          transition: 'font-size 0.3s ease'
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
};

const BookPage = ({ content, isLeft = false, isEmpty = false, style = {} }) => {
  const clipPath = isLeft 
    ? 'polygon(0 0%, 100% 15%, 100% 100%, 0 100%)' // Left page - trapezoid kiri
    : 'polygon(0 15%, 100% 0%, 100% 100%, 0 100%)'; // Right page - trapezoid kanan

  return (
    <div 
      className="absolute top-0 w-1/2 h-full"
      style={{
        left: isLeft ? '0%' : '50%',
        transformStyle: 'preserve-3d',
        transform: isLeft ? 'rotateY(-2deg) translateZ(5px)' : 'rotateY(2deg) translateZ(5px)',
        ...style
      }}
    >
      <div 
        className="w-full h-full backdrop-blur-sm border border-white/30 relative overflow-hidden"
        style={{ 
          clipPath,
          background: isLeft 
            ? 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)',
          boxShadow: isLeft 
            ? 'inset 5px 0 15px rgba(0,0,0,0.3), 0 5px 25px rgba(0,0,0,0.4), -10px 0 30px rgba(0,0,0,0.2)'
            : 'inset -5px 0 15px rgba(0,0,0,0.3), 0 5px 25px rgba(0,0,0,0.4), 10px 0 30px rgba(0,0,0,0.2)'
        }}
      >
        {/* 3D Page Depth Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: isLeft 
              ? 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.1) 100%)'
              : 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.1) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Page Content - Only show if not empty and not left page */}
        {!isEmpty && !isLeft && (
          <>
            <div className="p-3 md:p-4 lg:p-6 h-full flex flex-col justify-center items-center text-center relative z-10"
                 style={{ transform: 'translateZ(10px)' }}>
              <div className="mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-sm md:text-lg lg:text-2xl font-bold text-black mb-2 md:mb-3 relative"
                     style={{
                       boxShadow: '0 8px 20px rgba(234, 179, 8, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                       transform: 'translateZ(15px)'
                     }}>
                  {content?.icon}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20" />
                </div>
              </div>
              
              <h3 className="text-sm md:text-lg lg:text-2xl xl:text-3xl font-bold text-white mb-2 md:mb-3"
                  style={{ 
                    textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
                    transform: 'translateZ(8px)'
                  }}>
                {content?.title}
              </h3>
              
              <p className="text-blue-100 text-xs md:text-sm lg:text-base leading-relaxed max-w-[80%]"
                 style={{ 
                   textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                   transform: 'translateZ(5px)'
                 }}>
                {content?.description}
              </p>
              
              {content?.features && (
                <ul className="mt-3 md:mt-4 lg:mt-6 space-y-1 md:space-y-2 text-left"
                    style={{ transform: 'translateZ(5px)' }}>
                  {content.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-white text-xs md:text-sm"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-2"
                            style={{ 
                              boxShadow: '0 2px 4px rgba(234, 179, 8, 0.5)',
                              transform: 'translateZ(3px)'
                            }}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Enhanced Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-white/40 to-yellow-400/60 rounded-full animate-pulse"
                  style={{
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + i * 0.3}s`,
                    transform: `translateZ(${Math.random() * 10 + 5}px)`,
                    boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Enhanced empty left page decoration */}
        {isLeft && (
          <div className="absolute inset-0 flex items-center justify-center"
               style={{ transform: 'translateZ(5px)' }}>
            <div className="text-4xl md:text-6xl lg:text-7xl opacity-10"
                 style={{ 
                   textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                   filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))'
                 }}>📖</div>
          </div>
        )}

        {/* Enhanced page binding effect with 3D depth */}
        <div 
          className={`absolute top-0 w-2 md:w-3 h-full pointer-events-none ${
            isLeft ? 'right-0' : 'left-0'
          }`}
          style={{
            background: isLeft 
              ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)'
              : 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
            transform: 'translateZ(2px)',
            boxShadow: isLeft 
              ? 'inset -2px 0 4px rgba(0,0,0,0.4)' 
              : 'inset 2px 0 4px rgba(0,0,0,0.4)'
          }} 
        />

        {/* 3D Page edge highlight */}
        <div 
          className={`absolute top-0 w-1 h-full pointer-events-none ${
            isLeft ? 'right-0' : 'left-0'
          }`}
          style={{
            background: isLeft 
              ? 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
            transform: 'translateZ(3px)'
          }} 
        />
      </div>
    </div>
  );
};

const BookPageCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' or 'prev'
  const containerRef = useRef(null);

  const pages = [
    {
      title: "Bumpo",
      description: "Mempelajari tata bahasa jepang mencakup aturan mengenai cara menyusun kata dan kalimat yang benar dalam bahasa Jepang.",
      features: [
        "Memahami struktur dasar kalimat bahasa Jepang (SPO / SOP / etc.).",
        "Mampu menggunakan partikel dengan tepat (seperti wa, ga, o, ni, de, dll).",
        "Mengaplikasikan pola-pola kalimat umum dalam percakapan dan penulisan.",
      ]
    },
    {
      title: "Kotoba",
      description: "berfokus pada penguasaan kosakata dalam bahasa Jepang yang digunakan dalam kehidupan sehari-hari, dunia kerja, dan sesuai bidang industri peserta ",
      features: [
        "Menambah jumlah kosakata dasar dan tematik",
        "Meningkatkan kemampuan memahami bacaan dan percakapan.",
        "Mempersiapkan siswa untuk tes kemampuan bahasa seperti JLPT atau JFT-Basic.",
      ]
    },
    {
      title: "Wawancara",
      description: "latihan simulasi wawancara kerja dalam bahasa Jepang, untuk mempersiapkan peserta menghadapi proses seleksi kerja baik secara langsung maupun daring.",
      features: [
        "Melatih kepercayaan diri dalam menjawab pertanyaan wawancara.",
        "Mempelajari etika dan sopan santun Jepang saat wawancara.",
        "Menguasai jawaban-jawaban umum dan personalisasi jawaban sesuai profil diri.",
      ]
    },
    {
      title: "Fisik",
      description: "Melatih fisik agar siswa memiliki kebugaran dan ketahanan tubuh untuk lingkungan kerja yang seringkali menuntut kondisi fisik prima.",
      features: [
        "Meningkatkan stamina dan kekuatan otot.",
        "Mempersiapkan tubuh untuk pekerjaan yang melibatkan aktivitas fisik.",
        "Menanamkan disiplin dan gaya hidup sehat seperti yang diterapkan dalam budaya kerja Jepang.",
      ]
    }
  ];

  const flipToPage = (newPage, direction = 'next') => {
    if (isFlipping || newPage === currentPage) return;
    
    setFlipDirection(direction);
    setIsFlipping(true);
    setAutoPlay(false);
    
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsFlipping(false);
    }, 800); // Increased duration for smoother animation
    
    // Resume autoplay after 3 seconds
    setTimeout(() => {
      setAutoPlay(true);
    }, 3000);
  };

  const nextPage = () => {
    const newPage = (currentPage + 1) % pages.length;
    flipToPage(newPage, 'next');
  };

  const prevPage = () => {
    const newPage = (currentPage - 1 + pages.length) % pages.length;
    flipToPage(newPage, 'prev');
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || isFlipping) return;

    const { clientX, clientY } = e;
    const element = containerRef.current;
    const rect = element.getBoundingClientRect();
    
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -8;  // Increased from -2
    const rotateY = ((xPos - centerX) / centerX) * 8;   // Increased from 2
    const translateZ = Math.abs(rotateX) + Math.abs(rotateY); // Dynamic Z based on rotation

    element.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    element.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = 'perspective(2000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    containerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
  };

  // Auto flip pages
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      if (!isFlipping && autoPlay) {
        nextPage();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isFlipping, autoPlay, currentPage]);

  const currentRightContent = pages[currentPage];
  
  const nextRightContent = flipDirection === 'next'
    ? pages[(currentPage + 1) % pages.length] 
    : pages[(currentPage - 1 + pages.length) % pages.length];

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-6 md:py-10 pb-16 md:pb-24">
        <div className="relative size-full">
          <AnimatedTitle
            title="Ma<b>teri</b> <br>Pembelajaran"
            containerClass="mt-3 md:mt-5 pointer-events-none mix-blend-difference relative z-10 text-center px-4"
          />

          {/* Book Container */}
          <div 
            className="story-img-container flex justify-center items-center px-4 md:px-8"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <div 
              ref={containerRef}
              className="relative w-full max-w-lg h-[400px] md:max-w-2xl md:h-[500px] lg:max-w-4xl lg:h-[600px] transition-transform duration-300 ease-out"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '2000px',
                filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))'
              }}
            >
              {/* Book Base/Background with enhanced 3D */}
              <div className="absolute inset-0 rounded-lg shadow-2xl"
                   style={{
                     background: 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)',
                     transform: 'translateZ(-10px)',
                     boxShadow: `
                       0 0 0 2px rgba(255,255,255,0.1),
                       0 10px 30px rgba(0,0,0,0.3),
                       0 20px 60px rgba(0,0,0,0.2),
                       inset 0 1px 0 rgba(255,255,255,0.1)
                     `
                   }} />
              
              {/* Current Pages (Static during non-flip) */}
              <div 
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: isFlipping ? 0 : 1
                }}
              >
                <BookPage content={null} isLeft={true} isEmpty={true} />
                <BookPage content={currentRightContent} isLeft={false} />
              </div>

              {/* Flipping Pages */}
              <div 
                className="absolute inset-0"
                style={{
                  opacity: isFlipping ? 1 : 0
                }}
              >
                {/* Static new left page - tetep kosong */}
                <BookPage content={null} isLeft={true} isEmpty={true} />
                
                {/* Static new right page - konten baru */}
                <BookPage content={nextRightContent} isLeft={false} />
                
                {/* Right page yang lagi di-flip ke kiri */}
                <div
                  className="absolute top-0 right-0 w-1/2 h-full origin-left"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipping 
                      ? 'perspective(2000px) rotateY(-180deg) translateZ(5px)' 
                      : 'perspective(2000px) rotateY(0deg) translateZ(5px)',
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    zIndex: 20,
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
                  }}
                >
                  {/* Front of flipping page (konten lama) */}
                  <div className="absolute inset-0 backface-hidden">
                    <BookPage content={currentRightContent} isLeft={false} />
                  </div>
                  {/* Back of flipping page (kosong/belakang kertas) */}
                  <div 
                    className="absolute inset-0 backface-hidden"
                    style={{ 
                      transform: 'rotateY(180deg)',
                      backgroundColor: '#1f2937'
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10" />
                  </div>
                </div>
              </div>

              {/* Enhanced Book Spine with 3D depth */}
              <div className="absolute left-1/2 top-0 w-2 md:w-3 h-full transform -translate-x-1/2 z-30"
                   style={{
                     background: 'linear-gradient(180deg, #4b5563 0%, #374151 50%, #1f2937 100%)',
                     boxShadow: `
                       inset 2px 0 4px rgba(0,0,0,0.3),
                       inset -2px 0 4px rgba(0,0,0,0.3),
                       0 0 10px rgba(0,0,0,0.5)
                     `,
                     transform: 'translateX(-50%) translateZ(15px)',
                     borderRadius: '1px'
                   }} />
              
              {/* Enhanced Book Shadow with multiple layers */}
              <div className="absolute -bottom-6 left-1/2 w-4/5 h-12 transform -translate-x-1/2 pointer-events-none">
                <div className="absolute inset-0 bg-black/30 rounded-full blur-xl" 
                     style={{ transform: 'translateZ(-15px)' }} />
                <div className="absolute inset-0 bg-black/20 rounded-full blur-2xl scale-110" 
                     style={{ transform: 'translateZ(-20px)' }} />
                <div className="absolute inset-0 bg-black/10 rounded-full blur-3xl scale-125" 
                     style={{ transform: 'translateZ(-25px)' }} />
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevPage}
              disabled={isFlipping}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 md:p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-40 hover:scale-105"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextPage}
              disabled={isFlipping}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 md:p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-40 hover:scale-105"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center mt-4 md:mt-6 pb-6 space-x-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => flipToPage(index, index > currentPage ? 'next' : 'prev')}
                disabled={isFlipping}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  index === currentPage 
                    ? 'bg-yellow-400 scale-110' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPageCarousel;