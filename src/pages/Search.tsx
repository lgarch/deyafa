import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { EmergencyButton } from '@/components/EmergencyButton';
import { HostCard } from '@/components/HostCard';
import { mockHosts } from '@/data/mockData';
import { Search as SearchIcon, SlidersHorizontal, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const Search = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const languageOptions = ['Français', 'Anglais', 'Arabe', 'Espagnol'];

  const filteredHosts = mockHosts.filter(host => {
    const matchesCity = !city || host.city.toLowerCase().includes(city.toLowerCase());
    const matchesPrice = host.pricePerPerson >= priceRange[0] && host.pricePerPerson <= priceRange[1];
    const matchesRating = host.rating >= minRating;
    const matchesLanguage = selectedLanguages.length === 0 || 
      selectedLanguages.some(lang => host.languages.includes(lang));
    
    return matchesCity && matchesPrice && matchesRating && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>
            Dyafa
          </h1>
          <div className="flex gap-3 items-center">
            <EmergencyButton />
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard-tourist')}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="city" className="text-sm mb-2 block">{t('search.city')}</Label>
              <Input
                id="city"
                placeholder="Marrakech, Fès, Casablanca..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="date" className="text-sm mb-2 block">{t('search.date')}</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    {t('search.filters')}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{t('search.filters')}</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label>{t('common.price')} (MAD)</Label>
                      <Slider
                        min={0}
                        max={500}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0]} MAD</span>
                        <span>{priceRange[1]} MAD</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('search.rating')}</Label>
                      <Slider
                        min={0}
                        max={5}
                        step={0.5}
                        value={[minRating]}
                        onValueChange={(v) => setMinRating(v[0])}
                        className="mt-2"
                      />
                      <div className="text-sm text-muted-foreground">
                        Minimum: {minRating} ⭐
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Langues</Label>
                      <div className="space-y-2">
                        {languageOptions.map(lang => (
                          <div key={lang} className="flex items-center space-x-2">
                            <Checkbox
                              id={`filter-${lang}`}
                              checked={selectedLanguages.includes(lang)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedLanguages([...selectedLanguages, lang]);
                                } else {
                                  setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                                }
                              }}
                            />
                            <label htmlFor={`filter-${lang}`} className="text-sm cursor-pointer">
                              {lang}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t('search.title')}</h2>
          <p className="text-muted-foreground">{filteredHosts.length} résultats</p>
        </div>

        {filteredHosts.length === 0 ? (
          <div className="text-center py-16">
            <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">{t('search.noResults')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHosts.map(host => (
              <HostCard
                key={host.id}
                id={host.id}
                familyName={host.familyName}
                city={host.city}
                pricePerPerson={host.pricePerPerson}
                photo={host.photos[0]}
                rating={host.rating}
                reviewCount={host.reviewCount}
                isVerified={host.isVerified}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
