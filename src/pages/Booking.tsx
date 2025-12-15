import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { EmergencyButton } from '@/components/EmergencyButton';
import { mockHosts } from '@/data/mockData';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Booking = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const host = mockHosts.find(h => h.id === id);

  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    guests: 2,
    notes: '',
  });

  if (!host) {
    return <div>Hôte non trouvé</div>;
  }

  const total = host.pricePerPerson * formData.guests;

  const handleSubmit = () => {
    if (!formData.date) {
      toast.error('Veuillez sélectionner une date');
      return;
    }

    toast.success(t('booking.success'));
    navigate('/dashboard-tourist');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate(`/host/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <div className="flex gap-3 items-center">
            <EmergencyButton />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{t('booking.title')}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Détails de la réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">{t('booking.date')} *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">{t('booking.time')} *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">{t('booking.guests')} *</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">{t('booking.notes')}</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    placeholder="Allergies alimentaires, préférences particulières..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={host.photos[0]}
                    alt={host.familyName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-semibold">{host.familyName}</div>
                    <div className="text-sm text-muted-foreground">{host.city}</div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{host.pricePerPerson} MAD x {formData.guests}</span>
                    <span>{total} MAD</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('booking.total')}</span>
                    <span className="text-primary">{total} MAD</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleSubmit}>
                  {t('booking.confirm')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
