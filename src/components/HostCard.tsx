import { Star, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

type HostCardProps = {
  id: string;
  familyName: string;
  city: string;
  pricePerPerson: number;
  photo: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
};

export const HostCard = ({
  id,
  familyName,
  city,
  pricePerPerson,
  photo,
  rating,
  reviewCount,
  isVerified,
}: HostCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/host/${id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={photo} 
          alt={familyName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {isVerified && (
          <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {t('common.verified')}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg">{familyName}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {city}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary">{pricePerPerson} MAD</div>
            <div className="text-xs text-muted-foreground">{t('common.perPerson')}</div>
          </div>
        </div>
        <div className="flex items-center mt-3">
          <Star className="h-4 w-4 fill-primary text-primary mr-1" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-muted-foreground ml-1">({reviewCount})</span>
        </div>
      </CardContent>
    </Card>
  );
};
