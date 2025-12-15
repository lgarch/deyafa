import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Phone, 
  ArrowLeft, 
  Shield, 
  MapPin, 
  Building2,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

const Emergency = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPoliceConfirm, setShowPoliceConfirm] = useState(false);
  const [selectedEmbassy, setSelectedEmbassy] = useState<string>('');
  const [locationShared, setLocationShared] = useState(false);

  const embassies = [
    { country: 'France', phone: '+212537689700' },
    { country: 'United Kingdom', phone: '+212537633333' },
    { country: 'United States', phone: '+212537637200' },
    { country: 'Germany', phone: '+212537218600' },
    { country: 'Spain', phone: '+212537633900' },
    { country: 'Italy', phone: '+212537706596' },
    { country: 'Canada', phone: '+212537687400' },
  ];

  const handlePoliceCall = () => {
    window.location.href = 'tel:190';
    setShowPoliceConfirm(false);
  };

  const handleDyafaSupport = () => {
    toast.success('Connexion avec l\'assistance Dyafa...');
    // Mock: Dans la vraie version, ceci déclencherait un appel
    setTimeout(() => {
      window.location.href = 'tel:+212500000000';
    }, 1000);
  };

  const handleEmbassyCall = () => {
    if (!selectedEmbassy) {
      toast.error('Veuillez sélectionner votre ambassade');
      return;
    }
    const embassy = embassies.find(e => e.country === selectedEmbassy);
    if (embassy) {
      window.location.href = `tel:${embassy.phone}`;
    }
  };

  const handleShareLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock: Dans la vraie version, ceci enverrait la position au backend
          console.log('Position:', position.coords.latitude, position.coords.longitude);
          setLocationShared(true);
          toast.success('Localisation envoyée à nos équipes de sécurité');
        },
        (error) => {
          toast.error('Impossible d\'obtenir votre position');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      toast.error('Géolocalisation non disponible');
    }
  };

  const handleSilentAlert = () => {
    // Mock: Dans la vraie version, ceci enverrait une alerte silencieuse au backend
    toast.success('Alerte discrète envoyée au support Dyafa', {
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <Shield className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Numéros d'urgence</h1>
          <p className="text-muted-foreground">
            Assistance disponible 24h/24 et 7j/7
          </p>
        </div>

        <div className="space-y-4">
          {/* Police Button */}
          <Card className="border-destructive/50 shadow-lg">
            <CardContent className="pt-6">
              <Button
                size="lg"
                className="w-full h-20 text-lg bg-destructive hover:bg-destructive/90"
                onClick={() => setShowPoliceConfirm(true)}
              >
                <Phone className="h-6 w-6 mr-3" />
                Appeler la Police (190)
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-3">
                En cas d'urgence grave ou de danger immédiat
              </p>
            </CardContent>
          </Card>

          {/* Dyafa Support Button */}
          <Card className="border-orange-500/50 shadow-lg">
            <CardContent className="pt-6">
              <Button
                size="lg"
                className="w-full h-20 text-lg bg-orange-600 hover:bg-orange-700"
                onClick={handleDyafaSupport}
              >
                <Shield className="h-6 w-6 mr-3" />
                Assistance Dyafa 24/7
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-3">
                Support multilingue • Signalement d'incident • Aide immédiate
              </p>
            </CardContent>
          </Card>

          {/* Embassy Contact */}
          <Card className="border-blue-500/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Contacter mon ambassade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedEmbassy} onValueChange={setSelectedEmbassy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent>
                  {embassies.map((embassy) => (
                    <SelectItem key={embassy.country} value={embassy.country}>
                      {embassy.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleEmbassyCall}
                disabled={!selectedEmbassy}
              >
                <Phone className="h-5 w-5 mr-2" />
                Appeler
              </Button>
            </CardContent>
          </Card>

          {/* Location Sharing */}
          <Card>
            <CardContent className="pt-6">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-16"
                onClick={handleShareLocation}
                disabled={locationShared}
              >
                {locationShared ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 mr-2 text-success" />
                    Position partagée avec Dyafa
                  </>
                ) : (
                  <>
                    <MapPin className="h-5 w-5 mr-2" />
                    Partager ma position avec Dyafa
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Additional Emergency Numbers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Autres numéros utiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">Sapeurs-pompiers</p>
                  <p className="text-sm text-muted-foreground">Incendie, accident</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = 'tel:150'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  150
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">Gendarmerie Royale</p>
                  <p className="text-sm text-muted-foreground">Zones rurales</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = 'tel:177'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  177
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">SAMU</p>
                  <p className="text-sm text-muted-foreground">Urgences médicales</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = 'tel:141'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  141
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Silent Alert Button - Discrete */}
        <div className="mt-12 pt-8 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={handleSilentAlert}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Envoyer une alerte discrète au support
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Notification silencieuse sans appel ni sonnerie
          </p>
        </div>
      </div>

      {/* Police Confirmation Dialog */}
      <AlertDialog open={showPoliceConfirm} onOpenChange={setShowPoliceConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Appeler la police ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point d'appeler le 190 (Police au Maroc). 
              Utilisez ce numéro uniquement en cas d'urgence grave.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePoliceCall}
              className="bg-destructive hover:bg-destructive/90"
            >
              Appeler maintenant
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Emergency;
