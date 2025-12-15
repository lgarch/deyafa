import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-dining.jpg';

const Landing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">{t('landing.title')}</h1>
          <div className="flex gap-3 items-center">
            <LanguageSwitcher />
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              {t('landing.login')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              {t('landing.title')}
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-balance text-foreground/90">
              {t('landing.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/auth?role=tourist')}
              >
                {t('landing.tourist')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-secondary/50 shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/auth?role=host')}
              >
                {t('landing.host')}
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏠</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Familles Authentiques</h3>
                <p className="text-muted-foreground">Rencontrez des familles marocaines accueillantes</p>
              </div>
              
              <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🍽️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cuisine Traditionnelle</h3>
                <p className="text-muted-foreground">Savourez des plats faits maison authentiques</p>
              </div>
              
              <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expérience Unique</h3>
                <p className="text-muted-foreground">Vivez l'hospitalité marocaine authentique</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Dyafa. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
