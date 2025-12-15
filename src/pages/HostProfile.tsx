import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { EmergencyButton } from '@/components/EmergencyButton';
import { mockHosts, mockReviews } from '@/data/mockData';
import { ArrowLeft, Star, MapPin, CheckCircle2, Calendar, MessageCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const HostProfile = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const host = mockHosts.find(h => h.id === id);

  if (!host) {
    return <div>Hôte non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate('/search')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <div className="flex gap-3 items-center">
            <EmergencyButton />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Photos Carousel */}
        <Carousel className="mb-8">
          <CarouselContent>
            {host.photos.map((photo, index) => (
              <CarouselItem key={index}>
                <div className="h-[400px] rounded-xl overflow-hidden">
                  <img
                    src={photo}
                    alt={`${host.familyName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{host.familyName}</h1>
                  <div className="flex items-center text-muted-foreground gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {host.city}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      {host.rating} ({host.reviewCount} avis)
                    </div>
                  </div>
                </div>
                {host.isVerified && (
                  <Badge className="bg-success text-success-foreground gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {t('common.verified')}
                  </Badge>
                )}
              </div>

              <p className="text-lg leading-relaxed">{host.description}</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">{t('hostProfile.languages')}</h3>
                <div className="flex flex-wrap gap-2">
                  {host.languages.map(lang => (
                    <Badge key={lang} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">{t('hostProfile.availability')}</h3>
                <div className="flex flex-wrap gap-2">
                  {host.availability.map(date => (
                    <Badge key={date} variant="outline" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(date).toLocaleDateString('fr-FR')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('hostProfile.reviews')}</h3>
              <div className="space-y-4">
                {mockReviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{review.authorName}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          {review.rating}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(review.date).toLocaleDateString('fr-FR')}
                      </p>
                      <p>{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {host.pricePerPerson} MAD
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('common.perPerson')}
                  </div>
                </div>

                <Button 
                  className="w-full mb-3" 
                  size="lg"
                  onClick={() => navigate(`/booking/${host.id}`)}
                >
                  {t('hostProfile.book')}
                </Button>

                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contacter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
