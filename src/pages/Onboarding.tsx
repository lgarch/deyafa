import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

const Onboarding = () => {
  const { t } = useLanguage();
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    familyName: '',
    city: '',
    languages: [] as string[],
    description: '',
    pricePerPerson: '',
    photos: [] as File[],
    availability: [] as string[],
  });

  const languageOptions = ['Français', 'Anglais', 'Arabe', 'Espagnol', 'Allemand'];
  const dayOptions = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const handleLanguageToggle = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.photos.length + files.length > 3) {
      toast.error('Maximum 3 photos');
      return;
    }
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleSubmit = () => {
    if (!formData.familyName || !formData.city || formData.languages.length === 0) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    updateUser({ name: formData.familyName });
    toast.success('Profil créé avec succès!');
    navigate('/kyc');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-3xl py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('onboarding.title')}</h1>
          <LanguageSwitcher />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="familyName">{t('onboarding.familyName')} *</Label>
              <Input
                id="familyName"
                value={formData.familyName}
                onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t('onboarding.city')} *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>{t('onboarding.languages')} *</Label>
              <div className="grid grid-cols-2 gap-3">
                {languageOptions.map(lang => (
                  <div key={lang} className="flex items-center space-x-2">
                    <Checkbox
                      id={lang}
                      checked={formData.languages.includes(lang)}
                      onCheckedChange={() => handleLanguageToggle(lang)}
                    />
                    <label htmlFor={lang} className="text-sm cursor-pointer">
                      {lang}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('onboarding.description')} *</Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Parlez de votre famille, votre cuisine, votre maison..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">{t('onboarding.price')} (MAD) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.pricePerPerson}
                onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>{t('onboarding.photos')}</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {formData.photos.length} / 3 photos
                  </p>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('onboarding.availability')}</Label>
              <div className="grid grid-cols-2 gap-3">
                {dayOptions.map(day => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={formData.availability.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
                    />
                    <label htmlFor={day} className="text-sm cursor-pointer">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleSubmit}>
              {t('common.next')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
