import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Auth = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as 'tourist' | 'host' || 'tourist';

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');

  const handleSendOtp = () => {
    if (!email || !email.includes('@')) {
      toast.error('Veuillez entrer un email valide');
      return;
    }
    toast.success(t('auth.otpSent'));
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast.error('Code OTP invalide');
      return;
    }
    
    login(email, role);
    toast.success('Connexion réussie!');
    
    if (role === 'host') {
      navigate('/onboarding');
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
      </div>
      
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">{t('auth.title')}</CardTitle>
          <CardDescription>
            {role === 'host' ? t('landing.host') : t('landing.tourist')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'email' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                />
              </div>
              <Button className="w-full" onClick={handleSendOtp}>
                {t('auth.sendOtp')}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">{t('auth.otp')}</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              <Button className="w-full" onClick={handleVerifyOtp}>
                {t('auth.verify')}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep('email')}>
                {t('common.back')}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
