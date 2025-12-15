import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { EmergencyButton } from '@/components/EmergencyButton';
import { mockBookings } from '@/data/mockData';
import { Search, Settings, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';

const DashboardTourist = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

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
            <Button variant="ghost" onClick={() => navigate('/search')}>
              <Search className="h-5 w-5 mr-2" />
              Rechercher
            </Button>
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bonjour {user?.name || 'Voyageur'}!</h2>
          <p className="text-muted-foreground">Gérez vos réservations</p>
        </div>

        {/* Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.myBookings')}</CardTitle>
          </CardHeader>
          <CardContent>
            {mockBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Aucune réservation</p>
                <Button onClick={() => navigate('/search')}>
                  Trouver une famille
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockBookings.map(booking => (
                  <Card key={booking.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{booking.hostName}</h3>
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
                              : t('dashboard.status.pending')}
                          </Badge>
                          <div className="text-lg font-bold text-primary">
                            {booking.totalPrice} MAD
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/host/${booking.hostId}`)}
                            >
                              {t('dashboard.viewDetails')}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => toast.success('Réservation annulée avec succès')}
                            >
                              {t('dashboard.cancelBooking')}
                            </Button>
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

export default DashboardTourist;
