import { AlertCircle, CheckCircle, Clock, CloudRain } from 'lucide-react';

export type ParkStatus = 'open' | 'closed' | 'weather-delay' | 'opening-soon' | 'season-closed';

interface StatusBannerProps {
  status: ParkStatus;
  message?: string;
}

export function StatusBanner({ status, message }: StatusBannerProps) {
  const statusConfig = {
    'open': {
      icon: CheckCircle,
      bgColor: 'bg-green-500',
      textColor: 'text-green-50',
      label: 'Open Today',
      defaultMessage: 'The park is open and ready for adventure!'
    },
    'closed': {
      icon: AlertCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-red-50',
      label: 'Closed',
      defaultMessage: 'The park is closed today. Check back tomorrow!'
    },
    'weather-delay': {
      icon: CloudRain,
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-50',
      label: 'Weather Delay',
      defaultMessage: 'Weather may impact park operations today.'
    },
    'opening-soon': {
      icon: Clock,
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-50',
      label: 'Opening Soon',
      defaultMessage: 'The crew returns Memorial Day weekend!'
    },
    'season-closed': {
      icon: AlertCircle,
      bgColor: 'bg-gray-600',
      textColor: 'text-gray-50',
      label: 'Season Closed',
      defaultMessage: 'See you next season!'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.textColor} py-3 px-4`}>
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Icon className="w-5 h-5" />
        <div className="text-center">
          <span className="font-medium">{config.label}</span>
          {message && <span className="ml-2">- {message}</span>}
          {!message && <span className="ml-2 opacity-90">{config.defaultMessage}</span>}
        </div>
      </div>
    </div>
  );
}
