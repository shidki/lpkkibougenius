import { useState, useRef } from "react";

const AnimatedTitle = ({ title, className = "" }) => {
  return (
    <h1 
      className={`font-bold text-center ${className}`}
      dangerouslySetInnerHTML={{ __html: title }}
      style={{
        textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'
      }}
    />
  );
};

const Button = ({ title, containerClass = "", onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:translateZ-2 ${containerClass}`}
      style={{
        boxShadow: '0 8px 25px rgba(234, 179, 8, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
        transform: 'translateZ(5px)'
      }}
    >
      {title}
    </button>
  );
};

const ContactCard3D = ({ icon, title, value, link, gradientFrom, gradientTo }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { clientX, clientY } = e;
    const element = cardRef.current;
    const rect = element.getBoundingClientRect();
    
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -15;
    const rotateY = ((xPos - centerX) / centerX) * 15;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    element.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(10px)';
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
  };

  return (
    <div 
      ref={cardRef}
      className="relative p-6 text-center cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(link, '_blank')}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px) translateZ(10px)',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
    >
      {/* 3D Card Background */}
      <div 
        className="absolute inset-0 rounded-2xl backdrop-blur-sm border border-white/20"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.5),
            0 10px 30px rgba(0,0,0,0.3),
            inset 0 2px 4px rgba(255,255,255,0.1),
            inset 0 -2px 4px rgba(0,0,0,0.2)
          `,
          transform: 'translateZ(-5px)'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
              transform: `translateZ(${Math.random() * 15 + 5}px)`,
              boxShadow: '0 0 15px rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
             style={{ 
               filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
               transform: 'translateZ(20px)'
             }}>
          {icon}
        </div>
        <h3 className="text-white font-bold text-xl mb-3"
            style={{ 
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              transform: 'translateZ(10px)'
            }}>
          {title}
        </h3>
        <p className="text-white text-sm font-medium"
           style={{ 
             textShadow: '0 2px 4px rgba(0,0,0,0.6)',
             transform: 'translateZ(5px)'
           }}>
          {value}
        </p>
      </div>

      {/* 3D Edge highlight */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
          transform: 'translateZ(1px)'
        }}
      />
    </div>
  );
};

const Input3D = ({ label, type = "text", name, value, onChange, placeholder, required = false, isTextarea = false }) => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (!inputRef.current) return;
    inputRef.current.style.transform = 'translateZ(8px) rotateX(-2deg)';
    inputRef.current.style.boxShadow = '0 15px 30px rgba(234, 179, 8, 0.3), inset 0 2px 4px rgba(255,255,255,0.1)';
  };

  const handleBlur = () => {
    if (!inputRef.current) return;
    inputRef.current.style.transform = 'translateZ(2px) rotateX(0deg)';
    inputRef.current.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.05)';
  };

  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      <label className="block text-white text-sm font-bold mb-3"
             style={{ 
               textShadow: '0 2px 4px rgba(0,0,0,0.8)',
               transform: 'translateZ(5px)'
             }}>
        {label} {required && <span className="text-yellow-400">*</span>}
      </label>
      <InputComponent
        ref={inputRef}
        type={isTextarea ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={isTextarea ? 5 : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full px-6 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.05)',
          transform: 'translateZ(2px)',
          transformStyle: 'preserve-3d',
          backdropFilter: 'blur(10px)'
        }}
      />
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    alamat: '',
    pesan: ''
  });

  const containerRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.nama || !formData.email || !formData.pesan) {
      alert('Mohon isi nama, email, dan pesan!');
      return;
    }

    const message = `*PESAN BARU DARI WEBSITE*

📝 *Nama:* ${formData.nama}
📧 *Email:* ${formData.email}
📍 *Alamat:* ${formData.alamat || 'Tidak diisi'}

💬 *Pesan:*
${formData.pesan}

---
Dikirim melalui website contact form`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281325835578?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setFormData({
      nama: '',
      email: '',
      alamat: '',
      pesan: ''
    });
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const element = containerRef.current;
    const rect = element.getBoundingClientRect();
    
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -2;
    const rotateY = ((xPos - centerX) / centerX) * 2;

    element.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    element.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = 'perspective(2000px) rotateX(0deg) rotateY(0deg)';
    containerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
  };

  const contactCards = [
    {
      title: "Email",
      value: "lpk.kibougenius@gmail.com",
      gradientFrom: "#393E46",
      gradientTo: "#000000"
    },
    {
      title: "WhatsApp",
      value: "+62 813-2583-5578",
      link: "https://wa.me/6281325835578",
      gradientFrom: "#393E46",
      gradientTo: "#000000"
    },
    {
      title: "Instagram",
      value: "@lpk.kibougenius",
      gradientFrom: "#393E46",
      gradientTo: "#000000"
    },
    {
      title: "TikTok",
      value: "@lpk.kibougenius",
      gradientFrom: "#393E46",
      gradientTo: "#000000"
    }
  ];

  return (
    <div 
      id="contact" 
      className="min-h-screen w-screen bg-black px-4 md:px-10 py-20"
      style={{
        background: 'linear-gradient(135deg, #393E46 0%, #000000 30%, #000000 100%)',
        // background: 'black',
      }}
    >
      <div 
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <AnimatedTitle
            title="Kontak Kami"
            className="text-blue-50 text-2xl md:text-5xl font-black leading-tight mb-10"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Cards */}
          <div style={{ transform: 'translateZ(20px)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {contactCards.map((card, index) => (
                <ContactCard3D key={index} {...card} />
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ transform: 'translateZ(20px)' }}>
            <h3 className="text-white text-3xl font-black mb-12 text-center lg:text-left"
                style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>
              💬 Kirim Pesan
            </h3>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Input3D
                  label="Nama Lengkap"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
                <Input3D
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contoh@email.com"
                  required
                />
              </div>

              <Input3D
                label="Alamat"
                name="alamat"
                required
                value={formData.alamat}
                onChange={handleInputChange}
                placeholder="Masukkan alamat"
              />

              <Input3D
                label="Pesan"
                name="pesan"
                value={formData.pesan}
                onChange={handleInputChange}
                placeholder="Ceritakan kebutuhan atau pertanyaan"
                required
                isTextarea
              />

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button 
                  title="Kirim Pesan via WhatsApp" 
                  containerClass="flex-1 !bg-gradient-to-r !from-gray-500 !to-gray-600 !hover:from-gray-600 !hover:to-gray-700 !text-white font-black text-lg"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;