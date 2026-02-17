'use client'

import Header from "../components/Header";
import AnimatedGrid from "../components/AnimatedGrid";
import React from "react";
import Link from "next/link";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";


import { Monitor, Pencil, Cpu, Smartphone, ChevronDown } from "lucide-react";

const ProximityBadge = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      const triggerDistance = 150; 
      
      if (distance < triggerDistance) {
        const angle = Math.atan2(distanceY, distanceX);
        const pushForce = (triggerDistance - distance) * 1.5; 
        
        mouseX.set(-Math.cos(angle) * pushForce);
        mouseY.set(-Math.sin(angle) * pushForce);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div ref={ref} style={{ ...style, x, y }} className={className}>
      {children}
    </motion.div>
  );
};

const PulseLayeredImages = () => {
  return (
    <div className="relative w-full flex justify-center items-center h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-10"
      >
        <Image 
          src="/icon0.svg" 
          alt="Logo" 
          width={600} 
          height={600} 
          className="ml-5 w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-3"
        />
      </motion.div>
    </div>
  );
};

interface AboutValue {
  title: string;
  content: string;
}

export default function Home() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const steps = useMemo(() => [
    {
      id: 1,
      icon: <Monitor size={60} />,
      title: t('process.steps.0.title') as string,
      text: t('process.steps.0.text') as string,
    },
    {
      id: 2,
      icon: <Pencil size={60} />,
      title: t('process.steps.1.title') as string,
      text: t('process.steps.1.text') as string,
    },
    {
      id: 3,
      icon: <Cpu size={60} />,
      title: t('process.steps.2.title') as string,
      text: t('process.steps.2.text') as string,
    },
    {
      id: 4,
      icon: <Smartphone size={60} />,
      title: t('process.steps.3.title') as string,
      text: t('process.steps.3.text') as string,
    },
  ], [t]);

  const services = [
    {
      title: t('services.items.0.title'),
      img: "/canva/card-1.webp", 
    },
    {
      title: t('services.items.1.title'),
      img: "/canva/card-2.webp",
    },
    {
      title: t('services.items.2.title'),
      img: "/canva/card-3.webp",
    },
    {
      title: t('services.items.3.title'),
      img: "/canva/card-4.webp",
    },
  ];

  const portfolio = [
    {
      title: "Helikuju",
      domain: "helikuju.ee",
      url: "https://helikuju.ee",
      description: t('portfolio.items.0.description'),
      backgroundImage: "/helikuju-bg.webp"
    },
    {
      title: "Villaveski",
      domain: "villaveski.ee",
      url: "https://villaveski.ee",
      description: t('portfolio.items.1.description'),
      backgroundImage: "/villaveski-bg.webp"
    },
    {
      title: "Loconuts",
      domain: "loconuts.ee",
      url: "https://loconuts.ee",
      description: t('portfolio.items.2.description'),
      backgroundImage: "/loconuts-bg.webp"
    },
    {
      title: "LRV Sound",
      domain: "lrvsound.com",
      url: "https://lrvsound.com",
      description: t('portfolio.items.3.description'),
      backgroundImage: "/lrvsound.webp"
    },
    {
      title: "Edelstein",
      domain: "edelstein.ee",
      url: "https://edelstein.ee",
      description: t('portfolio.items.4.description'),
      backgroundImage: "/edelstein.webp"
    },
  ];

const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  // Käivitub niipea kui esimesed kaadrid on saadaval
  const handleLoadedData = () => {

    video.play();
  };

  video.addEventListener("loadeddata", handleLoadedData);

  // Ensure video plays when it comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(video);

  return () => {
    video.removeEventListener("loadeddata", handleLoadedData);
    observer.unobserve(video);
  };
}, []);


  const [active, setActive] = useState(1);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);


  // Check if screen is desktop size (lg breakpoint: 1024px)
  useLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Auto-advance steps every 3 seconds on desktop only if no user interaction
  useEffect(() => {
    if (!userInteracted && isDesktop) {
      timerRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setActive(prev => (prev >= steps.length ? 1 : prev + 1));
          setIsTransitioning(false);
        }, 300); // Half of transition duration
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [userInteracted, isDesktop, steps.length]);




  // Handle user click - pause auto-advance and resume after 10 seconds
  const handleStepClick = (stepId: number) => {
    setActive(stepId);
    setUserInteracted(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Resume auto-advance after 10 seconds of inactivity
    setTimeout(() => {
      setUserInteracted(false);
    }, 10000);
  };

  const [formData, setFormData] = useState({
    nimi: "",
    number: "",
    email: "",
    projekt: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  formData,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
)
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          setFormData({ nimi: "", number: "", email: "", projekt: "" }); // puhasta vorm
        },
        () => {
          setLoading(false);
          setError(true);
        }
      );
  };

  return (
    
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
<section id="kodu" className="relative flex items-center justify-center overflow-hidden h-[750px] lg:h-screen min-h-[750px] lg:min-h-screen bg-white">
 {/* Animated Grid Background */}
 <AnimatedGrid />

  {/* Pulsing Logo Layer (Z-5) - Moved behind text */}
  <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center">
    <PulseLayeredImages />
  </div>

  {/* Badges Layer (Z-30) */}
  <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
    <div className="relative w-full h-full max-w-7xl mx-auto">
     <ProximityBadge 
  className="hidden sm:flex absolute top-[10%] left-[2%] md:top-[20%] md:left-[10%] bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-1 rounded-full shadow-sm text-base font-medium text-gray-800 pointer-events-auto items-center gap-2"
>

        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {t('hero.badgeDesign')}
      </ProximityBadge>
     <ProximityBadge 
  className="hidden sm:flex absolute top-[20%] right-[2%] md:top-[15%] md:right-[10%] bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-1 rounded-full shadow-sm text-base font-medium text-gray-800 pointer-events-auto items-center gap-2"
>

        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {t('hero.badgeWeb')}
      </ProximityBadge>
      <ProximityBadge 
        className="hidden sm:flex absolute bottom-[20%] left-[2%] md:bottom-[25%] md:left-[10%] bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-1 rounded-full shadow-sm text-base font-medium text-gray-800 pointer-events-auto items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {t('hero.badgeWordpress')}
      </ProximityBadge>
      <ProximityBadge 
        className="hidden sm:flex absolute bottom-[10%] right-[2%] md:bottom-[20%] md:right-[10%] bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-1 rounded-full shadow-sm text-base font-medium text-gray-800 pointer-events-auto items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {t('hero.badgeAdmin')}
      </ProximityBadge>
    </div>
  </div>

  {/* Content Layer (Z-20) - Above logo, perfectly centered */}
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-4xl text-center pointer-events-auto"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6 font-light"
      >
        {t('hero.titlePart1')}{" "}
        <span className="block">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900"
          >
            {t('hero.titlePart2')}
          </motion.span> {t('hero.titlePart3')}
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg mx-auto"
      >
        {t('hero.description')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="#teenused" scroll={true}>
          <button className="group relative bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden cursor-pointer">
            <span className="relative z-10">{t('hero.cta')}</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </button>
        </Link>
      </motion.div>
    </motion.div>

    {/* Scroll Indicator (Z-10) - Locked to center bottom */}
    <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} className="text-black" />
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>


<section
  id="tehtud-tood"
  className="relative flex items-stretch min-h-[900px] py-20 overflow-hidden bg-[#272324]"
  style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
>
  {/* Background image with overlay */}
  <div className="hidden lg:block absolute inset-0 mx-auto">
    <div className="absolute inset-0 opacity-50"></div>
    <div className="absolute inset-0 bg-center bg-no-repeat bg-cover" />
  </div>

  {/* Background decoration */}
  <div className="absolute top-0 right-0 pointer-events-none z-0">
    <Image
      src="/screen-settings-w.svg"
      alt="Screen Settings"
      width={100}
      height={100}
      className="w-[80px] h-auto lg:w-[100px] lg:h-auto"
    />
  </div>

  <div className="relative w-full max-w-7xl mx-auto px-6 z-10">
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
        {t('portfolio.title')}
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
        {t('portfolio.subtitle')}
      </p>
    </motion.div>

    {/* Portfolio grid */}
    <div className="flex flex-wrap justify-center gap-8 md:gap-6">
      {portfolio.map((project, index) => (
        <a
          key={project.domain}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-white/10 hover:bg-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] aspect-square"
        >
          {/* Background image with brightness adjustment */}
          {project.backgroundImage && (
            <div 
              className="absolute inset-0 pointer-events-none [filter:brightness(0.2)] group-hover:[filter:brightness(1)] transition-all duration-300"
              style={{
                backgroundImage: `url('${project.backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}
          
          {/* Card background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Content */}
          <div className="relative p-8 h-full flex flex-col justify-between">
            {/* Number badge */}
            <div className="flex justify-between items-start mb-6 group-hover:opacity-0 transition-opacity duration-300">
              <span className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
                {t('portfolio.project')} {index + 1}
              </span>
              <span className="text-2xl font-bold text-white">
                ↗
              </span>
            </div>

            {/* Arrow that becomes black on hover */}
            <div className="absolute top-8 right-8 text-2xl font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ↗
            </div>

            {/* Title and domain */}
            <div className="mb-6 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-2xl md:text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-300 font-mono bg-white/10 px-3 py-1 rounded inline-block">
                {project.domain}
              </p>
            </div>

            {/* Description */}
            <div className="group-hover:opacity-0 transition-opacity duration-300">
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              <button className="inline-block px-6 py-2 bg-white text-black rounded-full text-sm font-semibold 
                                 hover:bg-gray-200 transition-colors duration-300">
                {t('portfolio.viewSite')}
              </button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </a>
      ))}
    </div>

    {/* Social Media Section */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="text-center mt-16 pt-12 border-t border-white"
    >
      <p className="text-gray-300 text-lg mb-6">
        {t('portfolio.socialTitle')}
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="https://www.facebook.com/umarendus"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-colors duration-300"
        >
          Facebook
        </a>
        <a
          href="http://linkedin.com/company/umarendus"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-colors duration-300"
        >
          LinkedIn
        </a>
      </div>
    </motion.div>
  </div>
</section>

<section
  id="meist"
  className="w-full text-black relative py-24 bg-[#f8f9fa] overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-12 gap-12 items-start">
      {/* Left side: Image and Quick Bio */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="lg:col-span-5 space-y-8"
      >
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-8 border-white">
          <Image
            src="/Uudo Sepp.webp"
            alt="Uudo Sepp"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Uudo Sepp</h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">{t('about.founderTitle')}</p>
          <p className="text-gray-700 leading-relaxed italic">
            &quot;{t('about.quote')}&quot;
          </p>
        </div>

        {/* Mobile only: Education and Badges moved here */}
        <div className="pt-2 space-y-6 lg:hidden">
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('about.education')}
          </p>
          <div className="flex flex-wrap gap-4">
            {(t('about.badges') as unknown as string[]).map((badge: string) => (
              <span key={badge} className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">{badge}</span>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Right side: Detailed Text and Accordion */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="lg:col-span-7 space-y-10"
      >
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('about.title')}</h2>
          <p className="text-xl text-gray-800 font-medium leading-relaxed">
            {t('about.experience')}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('about.journey')}
          </p>
        </div>

        {/* Meie väärtused */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            {t('about.valuesTitle')}
          </h3>
          
          <div className="grid gap-3">
            {(t('about.values') as unknown as AboutValue[]).map((item, index: number) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 ${isOpen ? 'bg-blue-600' : 'bg-black'} text-white rounded-full flex items-center justify-center text-sm transition-colors duration-300`}>
                        0{index + 1}
                      </span>
                      <span className={`text-lg font-bold ${isOpen ? 'text-blue-600' : ''} transition-colors duration-300`}>{item.title}</span>
                    </div>
                    <motion.span 
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {item.content}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-6 space-y-6 hidden lg:block">
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('about.education')}
          </p>
          <div className="flex flex-wrap gap-4">
            {(t('about.badges') as unknown as string[]).map((badge: string) => (
              <span key={badge} className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200 shadow-sm">{badge}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


<section
  id="teenused"
  className="w-full text-black relative flex items-stretch min-h-[900px] overflow-hidden"
>
  {/* Taustapilt – peidus väiksematel ekraanidel */}
  <div
    className="hidden lg:block absolute inset-0 bg-center bg-no-repeat bg-cover max-w-[1920px] mx-auto"
    style={{
      backgroundImage: `url('/service-background.svg')`,
    }}
  />

  {/* Dekoratiivne SVG – mobiil vasakul, desktop paremal */}
  <div className="absolute top-0 right-0 lg:right-0 pointer-events-none z-0">
    <Image
      src="/screen-settings.svg"
      alt="Screen Settings"
      width={100}
      height={100}
      className="w-[80px] h-auto lg:w-[100px] lg:h-auto"
    />
  </div>

  {/* Grid sisu */}
  <div className="relative w-full max-w-7xl mx-auto px-6 md:grid md:grid-cols-12 gap-10 h-full z-10">
    {/* VASAK POOL */}
    <div className="relative md:col-span-8 flex flex-col justify-center py-20 md:py-0 md:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-center">
          {t('services.title')}
        </h2>

        <p className="text-gray-700 max-w-xl text-lg mb-10 mx-auto text-center">
          {t('services.description')}
        </p>
      </motion.div>

      {/* Kaardid */}
      <div className="flex md:grid md:grid-cols-4 gap-6 md:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory touch-pan-x">
        {services.map((s, index) => (
          <div
            key={s.title}
            className="relative rounded-2xl overflow-hidden shadow-md group 
                       flex-shrink-0 w-[50%] sm:w-[40%] md:w-auto aspect-[2/3] snap-start mx-2 md:mx-0"
          >
            <Image
              src={s.img}
              alt={s.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 40vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 
                            bg-black/80 text-white py-3 rounded-full 
                            text-base font-bold text-center w-[calc(100%-16px)]">
              {s.title}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* PAREM POOL */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative md:col-span-4 flex flex-col justify-center py-10 md:py-0 text-lg pl-6 md:pl-10 md:mt-23"
    >
      <p className="text-gray-700 mb-4">
        <strong>{t('services.goal')}</strong>
      </p>
      <p className="text-gray-700 mb-4 relative">
        {t('services.scope')}
        <span className="absolute -bottom-6 left-0 w-[30%] border-b-1 border-black"></span>
      </p>
      <p className="text-gray-700 mb-6">
        <br />
        {t('services.result')}
      </p>
      <div className="flex justify-start">
        <button className="px-5 py-2 mb-20 md:mb-0 rounded-full border border-black bg-black text-white font-bold 
                           translate-y-8 hover:bg-gray-800 transform hover:translate-y-7
                           transition-all duration-300 ease-in-out">
          <Link href="#kontakt">
            {t('services.cta')} 
          </Link>
        </button>
      </div>
    </motion.div>
  </div>

  {/* Alumine joon */}
 <hr className="hidden lg:block absolute left-0 w-full border-t bottom-[570px] md:bottom-[180px]" />

</section>



 <section
  id="protsess"
  className="w-full text-white relative min-h-[900px] flex items-stretch py-16 text-center bg-[#272324] lg:bg-transparent overflow-hidden"
>
  {/* Background image with overlay */}
  <div className="hidden lg:block absolute inset-0 max-w-[1920px] mx-auto">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="absolute inset-0 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url('/process-background.svg')` }} />
  </div>

  {/* Dekoratiivne SVG */}
  <div className="absolute top-0 right-0 lg:right-0 pointer-events-none z-0">
    <Image
      src="/screen-settings-w.svg"
      alt="Screen Settings"
      width={100}
      height={100}
      className="w-[80px] h-auto lg:w-[100px] lg:h-auto"
    />
  </div>

  {/* Desktop version */}
  <div className="hidden lg:block relative z-10 w-full">
    <h2 className="text-3xl md:text-5xl font-bold md:mt-7 mb-20 text-center">{t('process.title')}</h2>

    {/* Icons row */}
    <div className="flex justify-center gap-25 mb-12">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => handleStepClick(step.id)}
          className="flex flex-col items-center space-y-2"
        >
          <div
            className={`p-4 rounded-full transition-colors ${
              active === step.id ? "text-white" : "text-gray-500"
            }`}
          >
            <div className="relative">
              {step.icon}
              <span
                className={`absolute -top-3 -right-3 text-sm font-bold ${
                  active === step.id ? "text-white" : "text-gray-500"
                }`}
              >
                {step.id}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>

    {/* Active content */}
    {active >= 1 && active <= steps.length && (
      <div className={`max-w-3xl mx-auto relative min-h-[200px] transition-opacity duration-600 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}>
        <h3 className="text-3xl font-medium pb-2 mb-15 w-[80%] border-b mx-auto">
          {steps[active - 1].title}
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed mb-32">
          {steps[active - 1].text}
        </p>
      </div>
    )}

    {/* Dots indicator */}
    <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
      {steps.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            active === index + 1 ? "bg-white" : "bg-gray-500"
          }`}
        ></div>
      ))}
    </div>
  </div>

  {/* Mobile version - accordion style */}
  <div className="lg:hidden relative z-10 w-full px-4">
      <h2 className="text-3xl font-bold mb-8">{t('process.title')}</h2>

      {steps.map((step) => (
        <div key={step.id}>
          <button
            onClick={() => setActive(active === step.id ? 0 : step.id)}
            className="w-full text-left py-2 hover:bg-gray-700 transition-colors border-t border-white"
          >
            <div className="flex items-center gap-2">
              <div className={active === step.id ? "text-white" : "text-gray-400"}>
                {React.cloneElement(step.icon, { size: 32 })}
              </div>
              <h3 className="p-4 text-xl font-semibold">{step.id}. {step.title}</h3>
            </div>
          </button>
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${active === step.id ? 'max-h-96' : 'max-h-0'}`}>
            <p className="p-4 text-gray-300 leading-relaxed">{step.text}</p>
          </div>
        </div>
      ))}
  </div>
</section>


      
<section
  id="hinnapoliitika"
  className="w-full text-black relative flex items-stretch md:min-h-[900px] py-19 overflow-hidden"
>
  {/* Taustapilt – peidus väiksematel ekraanidel */}
  <div className="hidden lg:block absolute inset-0 max-w-[1920px] mx-auto">
    <div className="absolute inset-0  opacity-20"></div> {/* Overlay */}
    <div
      className="absolute inset-0 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('/price-background.svg')` }}
    />
  </div>

  {/* Paremas ülanurgas SVG */}
<div className="absolute top-0 right-0 lg:top-0 lg:right-0 pointer-events-none z-0">
  <Image
    src="/screen-settings.svg"
    alt="Screen Settings"
    width={100}   // väike suurus
    height={100}
    className="w-[80px] h-auto lg:w-[100px] lg:h-auto"
  />
</div>

  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={containerVariants}
    className="max-w-3xl mx-auto px-0 relative z-10 space-y-8"
  >
    <motion.h2 
      variants={itemVariants}
      className="text-3xl md:text-5xl font-bold md:mb-32 text-center"
    >
      {t('pricing.title')}
    </motion.h2>

    <div className="md:space-y-6 space-y-8 px-10 md:px-0 text-gray-800 text-left leading-relaxed text-xl">
      <motion.p variants={itemVariants}>
        <span className="font-bold">{t('pricing.price')}</span><br />
        {t('pricing.priceText')}
      </motion.p>

      <motion.p variants={itemVariants}>
         <span className="font-bold">{t('pricing.dependingOnGoal')}</span><br />
        {t('pricing.goalText')}
      </motion.p>

      <motion.p variants={itemVariants}>
        <span className="font-bold">{t('pricing.maintenance')}</span><br />
        <span dangerouslySetInnerHTML={{ __html: t('pricing.maintenanceText') }} />
      </motion.p>

      <motion.p variants={itemVariants}>
        {t('pricing.summary')}{" "}
        <span className="font-bold">{t('pricing.keepUp')}</span>
      </motion.p>
    </div>
  </motion.div>
</section>


<section
  id="kontakt"
  className="relative min-h-screen md:min-h-[900px] flex items-center justify-center p-6 overflow-hidden"
>
{/* Taustavideo */}

<div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
  {/* Background image */}
  <Image
    src="/see/video-background-pic.jpg"
    alt="Background preview"
    fill
    className="object-cover"
  />

  {/* Video */}
  <video
    ref={videoRef}
    src="/see/bg-video-dark.mp4"
    loop
    muted
    playsInline
    preload="auto"
    poster="/see/video-background-pic.jpg"
 
    className="absolute inset-0 w-full h-full object-cover"
  ></video>

  {/* Blur + helepruun overlay */}
  <div className="absolute inset-0 backdrop-blur-sm bg-[#fafafa]/10 pointer-events-none"></div>
</div>






  {/* Dekoratiivne SVG */}
  <div className="absolute top-0 right-0 lg:right-0 pointer-events-none z-0">
    <Image
      src="/screen-settings-w.svg"
      alt="Screen Settings"
      width={100}
      height={100}
      className="w-[80px] h-auto lg:w-[100px] lg:h-auto"
    />
  </div>

  {/* Tausta SVG */}
  <div className="absolute top-0 left-0 right-0 hidden lg:flex justify-center pointer-events-none z-10">
    <Image
      src="/contact-bg.svg"
      alt="Background"
      width={1000}
      height={1080}
      className="min-w-[1920px]"
    />
  </div>

  {/* Sisu */}
  <div className="relative max-w-4xl w-full grid md:grid-cols-2 gap-12 items-start z-20">
    {/* Vasak pool */}
    <div className="text-white md:mt-20">
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <h1 className="text-7xl font-extrabold leading-tight mb-6 md:mb-0 md:-translate-y-6 uppercase">
            {t('contact.title')}
          </h1>
          <p className="mb-4 font-bold">
            {t('contact.subtitle')}
          </p>
          <a
            href="mailto:umarendus@gmail.com"
            className="inline-block bg-gray-200 text-black px-6 py-2 mb-2 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            umarendus@gmail.com
          </a>
        </div>
        <div className="flex items-center justify-center md:translate-y-0 translate-y-3">
          <Image
            src="/logo-lower.svg"
            alt="Logo"
            width={160}
            height={160}
            className="w-full h-auto max-w-[160px]"
          />
        </div>
      </div>

      <div>
        <p className="mt-4 mb-2 font-bold">
          {t('contact.question')}
        </p>
        <p className="border-t pt-2 border-gray-300 w-[70%]">
          {t('contact.assurance')}
        </p>
      </div>
    </div>

    {/* Parem pool (vorm brauseriakna stiilis) */}
    <div className="bg-white/95 rounded-lg shadow-md overflow-hidden  mb-40 md:mt-20 z-20">
      <div className="flex items-center px-6 py-4 border-b border-gray-600">
        <Image src="/home.svg" alt="Home" width={16} height={16} className="mr-2" />
        <span className="flex-1 text-center text-sm text-gray-600 border border-gray-700 rounded-full px-3 py-0.5 select-none">
          www.sinuleht.ee
        </span>
      </div>

<form onSubmit={handleSubmit} className="p-8 space-y-4 max-w-lg mx-auto">
      <div>
        <input
          type="text"
          name="nimi"
          placeholder={t('contact.placeholderName')}
          value={formData.nimi}
          onChange={handleChange}
          required
          className="w-full border-b border-black outline-none py-2 text-black placeholder-gray-500 text-sm"
        />
      </div>

      <div>
        <input
          type="text"
          name="number"
          placeholder={t('contact.placeholderNumber')}
          value={formData.number}
          onChange={handleChange}
          required
          className="w-full border-b border-black outline-none py-2 text-black placeholder-gray-500 text-sm"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder={t('contact.placeholderEmail')}
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-b border-black outline-none py-2 text-black placeholder-gray-500 text-sm"
        />
      </div>

      <div>
        <textarea
          name="projekt"
          placeholder={t('contact.placeholderProject')}
          value={formData.projekt}
          onChange={handleChange}
          required
          className="w-full border border-black rounded-md p-2 text-black h-28 resize-none placeholder-gray-500 text-sm"
        />
      </div>
<div className="flex flex-col items-center space-y-2">
  <button
    type="submit"
    disabled={loading}
    className="bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer disabled:opacity-50"
  >
    {loading ? t('contact.sending') : t('contact.send')}
  </button>

  {success && (
    <p className="text-gray-800 font-bold text-sm text-center">
      {t('contact.success')}
    </p>
  )}
  {error && (
    <p className="text-red-600 font-bold text-sm text-center">
      {t('contact.error')}
    </p>
  )}
</div>
    </form>
    </div>
  </div>

  <div className="absolute bottom-0 left-0 w-full border-t border-white flex justify-start items-center mb-20 gap-6 py-5 px-10 md:px-20 z-30">
    <a
      href="https://www.facebook.com/umarendus"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-70 transition"
    >
      <Image
        src="/facebook.svg"
        alt="Facebook"
        width={28}
        height={28}
        className="invert"
      />
    </a>
    <a
      href="http://linkedin.com/company/umarendus"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-70 transition"
    >
      <Image
        src="/linkedin.svg"
        alt="LinkedIn"
        width={28}
        height={28}
        className="invert"
      />
    </a>
  </div>
</section>


      


    </div>
  );
}
