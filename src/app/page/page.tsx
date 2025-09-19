import Header from "../../components/Header";
import React from "react";
import Link from "next/link";

const services = [
  { title: "Disain", img: "/canva/card-1.jpg" },
  { title: "Veebiarendus", img: "/canva/card-2.jpg" },
  { title: "Wordpress arendus", img: "/canva/card-3.jpg" },
  { title: "Kodulehe Haldus", img: "/canva/card-4.jpg" },
];
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
<section id="meist" className="relative h-screen flex items-center">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-left bg-no-repeat"
    style={{
      backgroundImage: `url('/section1-bg.png')`
    }}
  />

  {/* Content Overlay */}
  <div className="relative z-10 w-full px-6 pt-0">
    <div className="max-w-2xl hero-content text-left ml-0 lg:ml-12 -mt-90">
      <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg text-left font-light">
  Aitame väikeettevõtetel{" "}
  <span className="block">
    <span className="font-bold">nähtavaks</span> saada
  </span>
</h1>


      <p className="text-lg md:text-xl text-white/95 mb-10 max-w-lg drop-shadow-md text-left">
        Loome AI-toega kaasaegseid veebilehti, 
        mis aitavad sul jõuda klientideni soodsama hinnaga.
      </p>

      <div className="text-left">
       <Link href="#teenused" scroll={true}>
  <button className="bg-white/85 hover:bg-white text-gray-900 px-10 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
    Vaata lähemalt
  </button>
</Link>
      </div>
    </div>
  </div>
</section>


      {/* Services Section */}
    <section id="teenused" className="w-full bg-white text-black py-20">
      <div className="max-w-7xl mx-auto px-6 md:grid md:grid-cols-2 gap-10 relative">
        {/* Vertikaalne joon läbi kogu sektsiooni */}
        <div className="hidden md:block absolute left-1/2 -top-20 -bottom-20 w-px bg-black transform -translate-x-1/2"></div>
        
        {/* VASAK POOL */}
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-center md:text-left">
            TEENUSED
          </h2>

          <p className="text-gray-700 max-w-xl mb-10 mx-auto md:mx-0 text-center md:text-left">
            Pakume terviklikke veebilahendusi, mis katavad kogu protsessi alates
            disainist kuni lõpliku veebileheni. Loome kasutajasõbraliku ja
            kaasaegset UX/UI disaini, arendame nii kohandatud veebilehti kui ka
            WordPressi lahendusi ning pakume veebilehe haldust, et sinu sait
            oleks alati ajakohane ja toimiv.
          </p>

          {/* Kaardid */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden shadow-md"
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-48 object-cover block"
                  />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {s.title}
                  </div>
                </div>
              ))}
            </div>

            {/* HORIZONTAALNE Joon + vertikaalsed ühendusjooned kaartide all */}
            <div className="absolute left-0 right-0 -bottom-8 flex justify-center pointer-events-none">
              <div className="relative w-full max-w-6xl">
         
               

              </div>
            </div>
          </div>

     
        </div>

        {/* PAREM POOL */}
        <div className="pl-6 md:pl-10">
          <h3 className="font-semibold text-lg mb-2 mt-6 md:mt-16">Meie eesmärk</h3>
          <p className="text-gray-700 mb-4">
            on teha veebilahendus sinu jaoks lihtsalt kiirelt ja odavalt.
          </p>
          <p className="text-gray-700 mb-4">
            Olgu see uue veebilehe kavandamine, olemasoleva täiustamine või
            täisfunktsionaalse e-poe rajamine
          </p>
          <p className="text-gray-700 mb-6">
            Viime projekti lõpuni nii, et tulemus oleks kasutajasõbralik,
            kaasaegne ja sinu ärile kasulik.
          </p>
          <button className="px-6 py-3 rounded-full border border-black bg-black text-white font-medium hover:bg-gray-800 transition">
            Kirjuta meile
          </button>
        </div>
      </div>
    </section>

      {/* Flow Line from Services to Process */}
      <div className="border-t relative h-32 overflow-hidden">
        
      </div>

      {/* Process Section */}
      <section id="protsess" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            PROTSESS
          </h2>
          
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-white mb-4">Kaaretamine</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-white text-sm">
                Räägime koos läbi sinu ettevõtte vajadused ja otsustame, 
                mida tuleb teha, et sinu idee ellu viia.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <p className="text-white text-sm">
                Teeme kogu sinu veebilehe ja süsteemi kavanduse ning loome sisu 
                ja visuaalse disaini koos kasutajaliidesega.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white text-sm">
                Käivitame testimise ja arenduse faasi - teostame kasutajatestimise, 
                et tagada sujuv ja ühilduv tulemus.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-white text-sm">
                Viime projekti lõpule sinu ootustele vastavalt, 
                pakkudes täielikku toe ja klienditeenindust ka peale käivitamist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Line from Process to Pricing */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-b from-gray-900 to-white">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 64C200 108, 400 20, 600 64C800 108, 1000 20, 1200 64"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8,8"
            className="flow-path"
            style={{animationDelay: "0.5s"}}
          />
          <circle
            cx="1150"
            cy="64"
            r="6"
            fill="#3B82F6"
            className="flow-indicator"
            style={{animationDelay: "0.5s"}}
          />
        </svg>
      </div>

      {/* Pricing Section */}
      <section id="hinnapoliitika" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            HINNAPOLIITIKA
          </h2>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">HINNAD</h3>
              <p className="text-gray-600">
                arvestame sinu vajaduste ja eesmärkide põhjal - meie konsultatsioon selgitab 
                täpselt, mille järgi saame pakkuda sobiva lahenduse.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">OLENEVALT EESMÄRGIST</h3>
              <p className="text-gray-600">
                võime luua lihtsa esitluslehe, mis jagab infot ja kujundab kliendi suhtlust, või 
                funktsionaalse veebikeskkonna, mis aitab sul teenida raha praktiliselt.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">HALDUSTEENUS</h3>
              <p className="text-gray-600">
                pakume kogu hoolduse operatiivse teenusena, mis tagab, 
                et veebileht püsib alati ajakohane ja toimiv.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic">
                Lõppkokkuvõttes on see investeering sinu ettevõtte nähtavusse ja usaldusväärusse - 
                veebileht on funktsionaalne konkurentsieelis tänapäeval!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Line from Pricing to Contact */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-b from-white to-blue-900">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 64C200 20, 400 108, 600 64C800 20, 1000 108, 1200 64"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8,8"
            className="flow-path"
            style={{animationDelay: "1s"}}
          />
          <circle
            cx="1150"
            cy="64"
            r="8"
            fill="#FBBF24"
            className="flow-indicator"
            style={{animationDelay: "1s"}}
          />
          {/* Arrow pointing to contact */}
          <path
            d="M1140 58L1150 64L1140 70"
            stroke="#FBBF24"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flow-indicator"
            style={{animationDelay: "1.2s"}}
          />
        </svg>
      </div>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                KIRJUTA MEILE
              </h2>
              <p className="text-blue-100 mb-6">
                Võta julgelt meiega ühendust
              </p>
              <p className="text-blue-100 text-sm mb-8">
                Tasuta konsultatsioon
              </p>

              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-white text-sm">
                  Vastame kõikidele päringutele 24 tunni jooksul. 
                  Meie konsultatsioon on alati tasuta ja kohustusevaba.
                  Räägime läbi sinu vajadused ja pakume sobiva lahenduse.
                </p>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                    Nimi
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Sinu nimi"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    E-post
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="sinu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                    Kirjelda oma projekti
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                    placeholder="Räägi meile oma projektist..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                >
                  Saada sõnum
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
