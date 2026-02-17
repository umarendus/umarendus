'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'et' | 'en';

type TranslationValue = string | number | boolean | null | { [key: string]: TranslationValue } | TranslationValue[];

interface Translations {
  [key: string]: {
    [key: string]: TranslationValue;
  };
}

const translations: Translations = {
  et: {
    nav: {
      kodu: 'KODU',
      'tehtud-tood': 'TEHTUD TÖÖD',
      meist: 'MEIST',
      teenused: 'TEENUSED',
      protsess: 'PROTSESS',
      hinnapoliitika: 'HINNAPOLIITIKA',
      kontakt: 'KONTAKT',
      writeToUs: 'KIRJUTA MEILE',
    },
    hero: {
      badgeDesign: 'DISAIN',
      badgeWeb: 'VEEBIARENDUS',
      badgeWordpress: 'WORDPRESS',
      badgeAdmin: 'HALDUS',
      titlePart1: 'Aitame väikeettevõtetel',
      titlePart2: 'nähtavaks',
      titlePart3: 'saada',
      description: 'Loome AI-toega kaasaegseid veebilehti, mis aitavad sul jõuda klientideni soodsama hinnaga.',
      cta: 'Vaata lähemalt',
    },
    portfolio: {
      title: "TEHTUD TÖÖD",
      subtitle: "Vaata meie loodud veebilahendusi, mis aitavad ettevõtetel nähtavaks saada.",
      project: "Projekt",
      viewSite: "Vaata veebilehte",
      socialTitle: "Tahad kursis olla meie töödega? Jälgi meid sotsiaalmeedias!",
      items: [
        { description: "Kaasaegne veebileht heliloominguga seotud teenuste jaoks" },
        { description: "Inspireeriv koduleht traditsioonilist käsitööd väärtustavale ettevõttele" },
        { description: "Professionaalne veebileht bändile, kes tahab muusikamaailmas silma paista" },
        { description: "Marcus Ellervee heliproduktsiooni portfoolio ja teenuste esitlus" },
        { description: "Kvaliteetsete kivipindade valmistamine ja paigaldus eritellimusel" },
      ]
    },
    about: {
      title: "MEIST",
      founderTitle: "Asutaja & Arendaja",
      quote: "UM Arenduse lõin soovist tuua digilahendustesse rohkem isikupära ja loomingulisust. Iga bränd vajab läbimõeldud esitlust, mis loob emotsiooni ja usalduse.",
      education: "Hariduselt olen suhtekorralduse bakalaureus, mis annab mulle tugeva strateegilise ja kommunikatiivse tausta. Minu sügavam soov on jätkata õpinguid tarkvara juhtimise suunal, et ühendada tehniline kompetents süsteemse juhtimise ja suuremate digilahenduste loomisega.",
      badges: ["Vali IT vilistlane", "Suhtekorralduse BA", "UX/UI Disainer"],
      experience: "Olen töötanud arendajana alates 2024. aastast, ühendades tehnilise kompetentsi strateegilise kommunikatsiooniga.",
      journey: "Minu teekond algas Vali IT programmist, mis on tänaseks kasvanud terviklikuks lähenemiseks tarkvaraarendusele, projektijuhtimisele ja disainile. Loone lahendusi alates brändi visuaalsest identiteedist (CVI) kuni toimiva lõpptooteni.",
      valuesTitle: "Meie väärtused",
      values: [
        { 
          title: "Personaalsus", 
          content: "Iga projekt on ainulaadne. Me süveneme sinu ärisse, et luua lahendus, mis peegeldab just sinu brändi olemust." 
        },
        { 
          title: "Kvaliteet", 
          content: "Ei tehta järeleandmisi kvaliteedis. Puhas kood ja läbimõeldud kasutajakogemus on UM arenduse standard." 
        },
        { 
          title: "Innovatsioon", 
          content: "UM arendus kasutab kaasaegseid AI-tööriistu, et pakkuda nutikamaid ja efektiivsemaid lahendusi soodsama hinnaga." 
        }
      ]
    },
    services: {
      title: "TEENUSED",
      description: "Pakume terviklikke veebilahendusi, mis katavad kogu protsessi alates disainist kuni lõpliku veebileheni. Loome kasutajasõbraliku ja kaasaegse UX/UI disaini, arendame nii kohandatud veebilehti kui ka WordPressi lahendusi ning pakume veebilehe haldust, et sinu sait oleks alati ajakohane ja toimiv.",
      goal: "Meie eesmärk on teha veebilahendus sinu jaoks lihtsalt kiirelt ja odavalt.",
      scope: "Olgu see uue veebilehe kavandamine, olemasoleva täiustamine või täisfunktsionaalse e-poe rajamine.",
      result: "Viime projekti lõpuni nii, et tulemus oleks kasutajasõbralik, kaasaegne ja sinu ärile kasulik.",
      cta: "Kirjuta",
      items: [
        { title: "Disain" },
        { title: "Veebiarendus" },
        { title: "Wordpress arendus" },
        { title: "Kodulehe Haldus" },
      ]
    },
    process: {
      title: "PROTSESS",
      description: "Iga projekt on erinev, kuid meie protsess on alati läbimõeldud ja tulemusele orienteeritud.",
      steps: [
        {
          title: "Kaardistamine",
          text: "Räägime koos läbi sinu ettevõtte eesmärgid ja ootused. Uurime, millised on sinu kliendid ja mida nad veebilehelt otsivad. Selle põhjal selgitame välja, millist veebilahendust sul tegelikult vaja on.",
        },
        {
          title: "Disain",
          text: "Loome disainilahenduse, mis toetab sinu brändi ja kõnetab sihtrühma. Kujundus on kaasaegne, kasutajasõbralik ja mobiilisõbralik.",
        },
        {
          title: "AI-ga ehitus",
          text: "Ehitusprotsessis kasutame kaasaegseid tööriistu ja AI lahendusi, et saavutada efektiivne, kiire ja kvaliteetne veebilehe arendus.",
        },
        {
          title: "Testimine ja ülekandmine",
          text: "Testime veebilehte erinevatel seadmetel ja brauseritel, et tagada laitmatu toimivus. Seejärel viime lahenduse live-keskkonda.",
        },
      ]
    },
    pricing: {
      title: "HINNAPOLIITIKA",
      price: "HINNA",
      priceText: "arvutame sinu vajaduste ja disainisoovide põhjal – nende kaardistamisel selgub töömaht, mille järgi saame pakkuda sobiva lahenduse.",
      dependingOnGoal: "OLENEVALT EESMÄRGIST",
      goalText: "võib see olla lihtne veebileht, mis jagab infot ja kuhu kliente suunata, või põhjalikum lahendus, mis aitab sul otsingutes silma paista.",
      maintenance: "HALDUSTEENUSE",
      maintenanceText: "puhul lepime kokku igakuise tasu, mis tagab, <br />et veebileht püsib alati ajakohane ja töökindel.",
      summary: "Kokkuvõttes on see investeering sinu ettevõtte nähtavusse ja usaldusväärsusse – veebinähtavus on tänapäeval hädavajalik, et",
      keepUp: "konkurentidega sammu pidada."
    },
    contact: {
      title: "KIRJUTA MEILE",
      subtitle: "Võta ühendust kasvõi meili kaudu:",
      question: "Kas sul on veebileht, mis ei too kliente, või pole lehte üldse?",
      assurance: "Ära muretse, meie loome AI-toega kaasaegseid veebilehti, mis aitavad sul jõuda klientideni soodsama hinnaga.",
      placeholderName: "*Teie nimi",
      placeholderNumber: "*Teie number",
      placeholderEmail: "*Teie e-mail",
      placeholderProject: "*Kirjeldage oma projekti",
      send: "Kirjuta meile",
      sending: "Saadan...",
      success: "Sõnum saadetud! Võtame peagi ühendust.",
      error: "Midagi läks valesti.",
    }
  },
  en: {
    nav: {
      kodu: 'HOME',
      'tehtud-tood': 'PORTFOLIO',
      meist: 'ABOUT US',
      teenused: 'SERVICES',
      protsess: 'PROCESS',
      hinnapoliitika: 'PRICING',
      kontakt: 'CONTACT',
      writeToUs: 'WRITE TO US',
    },
    hero: {
      badgeDesign: 'DESIGN',
      badgeWeb: 'WEB DEV',
      badgeWordpress: 'WORDPRESS',
      badgeAdmin: 'MAINTENANCE',
      titlePart1: 'Helping small businesses',
      titlePart2: 'become visible',
      titlePart3: '',
      description: 'We create modern websites with AI that help you reach customers at a more affordable price.',
      cta: 'View more',
    },
    portfolio: {
      title: "PORTFOLIO",
      subtitle: "See the web solutions we've created to help businesses become visible.",
      project: "Project",
      viewSite: "Visit website",
      socialTitle: "Want to stay updated with our work? Follow us on social media!",
      items: [
        { description: "Modern website for music composition services" },
        { description: "Inspiring website for a company valuing traditional crafts" },
        { description: "Professional website for a band wanting to stand out in the music world" },
        { description: "Marcus Ellervee's sound production portfolio and service presentation" },
        { description: "Custom manufacturing and installation of high-quality stone surfaces" },
      ]
    },
    about: {
      title: "ABOUT US",
      founderTitle: "Founder & Developer",
      quote: "I created UM Arendus with the desire to bring more personality and creativity to digital solutions. Every brand needs a thoughtful presentation that creates emotion and trust.",
      education: "I have a bachelor's degree in public relations, which gives me a strong strategic and communicative background. My deep desire is to continue my studies in software management to combine technical competence with systemic management and the creation of larger digital solutions.",
      badges: ["Vali IT Alumnus", "Public Relations BA", "UX/UI Designer"],
      experience: "I have been working as a developer since 2024, combining technical competence with strategic communication.",
      journey: "My journey started with the Vali IT program, which has grown into a comprehensive approach to software development, project management, and design. We create solutions from visual brand identity (CVI) to a functional final product.",
      valuesTitle: "Our Values",
      values: [
        { 
          title: "Personalization", 
          content: "Every project is unique. We dive deep into your business to create a solution that reflects exactly your brand essence." 
        },
        { 
          title: "Quality", 
          content: "No compromises in quality. Clean code and a thoughtful user experience are the standards of UM Arendus." 
        },
        { 
          title: "Innovation", 
          content: "UM Arendus uses modern AI tools to offer smarter and more efficient solutions at a more affordable price." 
        }
      ]
    },
    services: {
      title: "SERVICES",
      description: "We offer comprehensive web solutions covering the entire process from design to the final website. We create user-friendly and modern UX/UI designs, develop both custom websites and WordPress solutions, and offer website management so your site is always up-to-date and functional.",
      goal: "Our goal is to make a web solution for you simply, quickly, and affordably.",
      scope: "Whether it's planning a new website, improving an existing one, or building a full-featured e-shop.",
      result: "We see the project through to the end so that the result is user-friendly, modern, and beneficial for your business.",
      cta: "Write to us",
      items: [
        { title: "Design" },
        { title: "Web Development" },
        { title: "Wordpress Development" },
        { title: "Website Management" },
      ]
    },
    process: {
      title: "PROCESS",
      description: "Every project is different, but our process is always thoughtful and results-oriented.",
      steps: [
        {
          title: "Mapping",
          text: "We discuss your company goals and expectations together. We research who your customers are and what they look for on a website. Based on this, we determine what web solution you actually need.",
        },
        {
          title: "Design",
          text: "We create a design solution that supports your brand and speaks to your target audience. The design is modern, user-friendly, and mobile-friendly.",
        },
        {
          title: "AI-powered building",
          text: "In the construction process, we use modern tools and AI solutions to achieve efficient, fast, and high-quality website development.",
        },
        {
          title: "Testing and transfer",
          text: "We test the website on different devices and browsers to ensure flawless performance. Then we move the solution to the live environment.",
        },
      ]
    },
    pricing: {
      title: "PRICING",
      price: "PRICE",
      priceText: "is calculated based on your needs and design wishes – after mapping them, the workload becomes clear, based on which we can offer a suitable solution.",
      dependingOnGoal: "DEPENDING ON THE GOAL",
      goalText: "it can be a simple website that shares info and where to direct customers, or a more thorough solution that helps you stand out in searches.",
      maintenance: "MAINTENANCE SERVICE",
      maintenanceText: "we agree on a monthly fee that ensures <br />the website always remains up-to-date and reliable.",
      summary: "In conclusion, it's an investment in your company's visibility and credibility – web visibility is essential today to",
      keepUp: "keep up with the competition."
    },
    contact: {
      title: "WRITE TO US",
      subtitle: "Get in touch even via email:",
      question: "Do you have a website that doesn't bring customers, or no website at all?",
      assurance: "Don't worry, we create modern websites with AI that help you reach customers at a more affordable price.",
      placeholderName: "*Your name",
      placeholderNumber: "*Your number",
      placeholderEmail: "*Your email",
      placeholderProject: "*Describe your project",
      send: "Write to us",
      sending: "Sending...",
      success: "Message sent! We will contact you soon.",
      error: "Something went wrong.",
    }
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('et');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'et' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let value: TranslationValue = translations[language];
    for (const key of keys) {
      if (value && typeof value === 'object') {
        const obj = value as { [key: string]: TranslationValue };
        if (obj[key] !== undefined) {
          value = obj[key];
        } else {
          return path;
        }
      } else {
        return path;
      }
    }
    return value as unknown as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
