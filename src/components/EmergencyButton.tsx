import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export const EmergencyButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="destructive" 
      size="sm"
      onClick={() => navigate('/emergency')}
      className="gap-2"
    >
      <Shield className="h-4 w-4" />
      <span className="hidden sm:inline">Urgence</span>
    </Button>
  );
};
