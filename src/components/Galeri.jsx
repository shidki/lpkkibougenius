import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

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

// Helper function untuk detect file type
const getFileType = (src) => {
  if (!src) return 'unknown';
  
  const extension = src.split('.').pop()?.toLowerCase();
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico'];
  const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'wmv', 'flv', 'm4v'];
  
  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (videoExtensions.includes(extension)) {
    return 'video';
  }
  
  return 'unknown';
};

// Media component yang render sesuai file type
const MediaRenderer = ({ src, className = "" }) => {
  const fileType = getFileType(src);
  
  if (fileType === 'image') {
    return (
      <img
        src={src}
        alt="Gallery media"
        className={`absolute left-0 top-0 size-full object-cover object-center ${className}`}
      />
    );
  } else if (fileType === 'video') {
    return (
      <video
        src={src}
        loop
        muted
        autoPlay
        className={`absolute left-0 top-0 size-full object-cover object-center ${className}`}
      />
    );
  } else {
    // Fallback jika format tidak dikenali
    return (
      <div className={`absolute left-0 top-0 size-full bg-gray-800 flex items-center justify-center ${className}`}>
        <p className="text-white/50">Unsupported format</p>
      </div>
    );
  }
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
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

  return (
    <div className="relative size-full">
      <MediaRenderer src={src} />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none text-white absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20 text-white" />
            <p className="relative  text-white z-20">LPK KIBOU GENIUS</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Galeri = () => (
  <section className="bg-black pb-52">
    <h1 className="font-bold text-center text-6xl text-blue-50 mb-10">
          GALERI
    </h1>
    <div className="container mx-auto px-3 md:px-10">
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="img/galeri-1.jpeg"
          title={
            <>
              {/* radia<b>n</b>t */}
            </>
          }
        //   description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="img/galeri-2.jpeg"
            title={
              <>
                {/* zig<b>m</b>a */}
              </>
            }
            // description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="img/galeri-3.jpeg"
            title={
              <>
                {/* n<b>e</b>xus */}
              </>
            }
            // description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        {/* <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="images/feature-4.png"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt> */}

        <BentoTilt className="bento-tilt_1">
          <div className="flex size-full flex-col justify-between bg-yellow-600 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              s<b>e</b>gera <b>h</b>adi<b>r</b>.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Galeri;