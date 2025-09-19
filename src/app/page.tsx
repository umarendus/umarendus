import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), 
                             url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23D4C5A9'/%3E%3Ctext x='400' y='300' font-size='48' text-anchor='middle' fill='%23A0907A'%3EWorkspace Background%3C/text%3E%3C/svg%3E")`
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl hero-content">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Aitame väikeettevõtetel{" "}
              <span className="block">nähtavaks saada</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg">
              Loome AI-toega kaasaegseid veebilehti, 
              mis aitavad sul jõuda klientideni soodsama hinnaga.
            </p>
            
            <button className="bg-gray-900/80 hover:bg-gray-900 text-white px-10 py-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-white/20">
              Vaata lähemalt
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
