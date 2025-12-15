import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { EmergencyButton } from '@/components/EmergencyButton';
import { mockBookings, Booking } from '@/data/mockData';
import { Settings, CheckCircle2, Calendar, Clock, Edit, Eye } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DashboardHost = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const [availability, setAvailability] = useState({
    'Lundi': true,
    'Mardi': true,
    'Mercredi': false,
    'Jeudi': true,
    'Vendredi': true,
    'Samedi': true,
    'Dimanche': false,
  });

  const handleAccept = (bookingId: string) => {
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'confirmed' }
        : booking
    ));
    toast.success(t('booking.success') || 'Réservation acceptée');
  };

  const handleRefuse = (bookingId: string) => {
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
    toast.info('Réservation refusée');
  };

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
            <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('hostDashboard.title')}</h2>
          <p className="text-muted-foreground">Bonjour {user?.name || 'Hôte'}!</p>
        </div>

        {/* KYC Status */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`h-8 w-8 ${user?.isKycVerified ? 'text-success' : 'text-muted-foreground'}`} />
                <div>
                  <h3 className="font-semibold">Statut de vérification</h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.isKycVerified ? t('kyc.status.verified') : t('kyc.status.notSent')}
                  </p>
                </div>
              </div>
              {!user?.isKycVerified && (
                <Button onClick={() => navigate('/kyc')}>
                  Compléter la vérification
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('hostDashboard.profile')}</CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Nom: </span>
                  <span className="font-medium">{user?.name || 'Non défini'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email: </span>
                  <span className="font-medium">{user?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>{t('hostDashboard.availability')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(availability).map(([day, isAvailable]) => (
                  <div key={day} className="flex items-center justify-between">
                    <label className="text-sm cursor-pointer" htmlFor={day}>
                      {day}
                    </label>
                    <Checkbox
                      id={day}
                      checked={isAvailable}
                      onCheckedChange={(checked) =>
                        setAvailability({ ...availability, [day]: checked as boolean })
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('hostDashboard.bookings')}</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune réservation reçue</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <Card key={booking.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">Réservation #{booking.id}</h3>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(booking.date).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {booking.time}
                            </div>
                            <div>
                              {booking.guests} personne{booking.guests > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge
                            variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                            className="mb-2"
                          >
                            {booking.status === 'confirmed'
                              ? t('dashboard.status.confirmed')
                              : booking.status === 'cancelled'
                                ? 'Annulée'
                                : t('dashboard.status.pending')}
                          </Badge>
                          <div className="text-lg font-bold text-primary mb-3">
                            {booking.totalPrice} MAD
                          </div>

                          <div className="flex gap-2 justify-end mt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="gap-2">
                                  <Eye className="h-4 w-4" />
                                  Voir détails
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Détails de la réservation #{booking.id}</DialogTitle>
                                  <DialogDescription>
                                    Informations complètes sur la demande de réservation.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 py-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                                    <p>{new Date(booking.date).toLocaleDateString('fr-FR')}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Heure</p>
                                    <p>{booking.time}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Invités</p>
                                    <p>{booking.guests} personne{booking.guests > 1 ? 's' : ''}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Prix Total</p>
                                    <p className="font-bold text-primary">{booking.totalPrice} MAD</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm font-medium text-muted-foreground">Notes / Allergies</p>
                                    <p className="text-sm">{booking.notes || 'Aucune note particulière'}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-success hover:bg-success/90"
                                  onClick={() => handleAccept(booking.id)}
                                >
                                  {t('hostDashboard.accept')}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRefuse(booking.id)}
                                >
                                  {t('hostDashboard.refuse')}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHost;
