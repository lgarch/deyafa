import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Upload, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';

type KycStatus = 'not_sent' | 'pending' | 'verified';

const KYC = () => {
  const { t } = useLanguage();
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState<KycStatus>('not_sent');
  const [documents, setDocuments] = useState({
    idFront: null as File | null,
    idBack: null as File | null,
    selfie: null as File | null,
  });

  const handleFileUpload = (type: keyof typeof documents, file: File) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
    toast.success('Document ajouté');
  };

  const handleSubmit = () => {
    if (!documents.idFront || !documents.idBack || !documents.selfie) {
      toast.error('Veuillez télécharger tous les documents');
      return;
    }

    setStatus('pending');
    toast.success('Documents envoyés pour vérification');
    
    // Simulate verification after 2 seconds
    setTimeout(() => {
      setStatus('verified');
      updateUser({ isKycVerified: true });
      toast.success('Identité vérifiée!');
    }, 2000);
  };

  const handleFinish = () => {
    navigate('/dashboard-host');
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'not_sent':
        return (
          <Badge variant="outline" className="gap-1">
            <XCircle className="h-3 w-3" />
            {t('kyc.status.notSent')}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="gap-1 bg-accent text-accent-foreground">
            <Clock className="h-3 w-3" />
            {t('kyc.status.pending')}
          </Badge>
        );
      case 'verified':
        return (
          <Badge className="gap-1 bg-success text-success-foreground">
            <CheckCircle2 className="h-3 w-3" />
            {t('kyc.status.verified')}
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('kyc.title')}</h1>
            {getStatusBadge()}
          </div>
          <LanguageSwitcher />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documents requis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DocumentUpload
              label={t('kyc.idFront')}
              file={documents.idFront}
              onUpload={(file) => handleFileUpload('idFront', file)}
              disabled={status === 'verified'}
            />

            <DocumentUpload
              label={t('kyc.idBack')}
              file={documents.idBack}
              onUpload={(file) => handleFileUpload('idBack', file)}
              disabled={status === 'verified'}
            />

            <DocumentUpload
              label={t('kyc.selfie')}
              file={documents.selfie}
              onUpload={(file) => handleFileUpload('selfie', file)}
              disabled={status === 'verified'}
            />

            {status === 'not_sent' && (
              <Button className="w-full" size="lg" onClick={handleSubmit}>
                Envoyer pour vérification
              </Button>
            )}

            {status === 'verified' && (
              <Button className="w-full" size="lg" onClick={handleFinish}>
                {t('kyc.finish')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DocumentUpload = ({ 
  label, 
  file, 
  onUpload, 
  disabled 
}: { 
  label: string; 
  file: File | null; 
  onUpload: (file: File) => void;
  disabled?: boolean;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className={`border-2 border-dashed rounded-lg p-6 text-center ${disabled ? 'opacity-50' : ''}`}>
        {file ? (
          <div className="flex items-center justify-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm">{file.name}</span>
          </div>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id={`upload-${label}`}
              disabled={disabled}
            />
            <label htmlFor={`upload-${label}`} className={disabled ? '' : 'cursor-pointer'}>
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Cliquer pour télécharger</p>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default KYC;
