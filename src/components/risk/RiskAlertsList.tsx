
import React from 'react';
import { RiskAlert } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Bell, BellOff } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface RiskAlertsListProps {
  alerts: RiskAlert[];
}

export const RiskAlertsList: React.FC<RiskAlertsListProps> = ({ alerts }) => {
  const getSeverityColor = (severity: RiskAlert['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20';
      case 'high':
        return 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20';
      case 'critical':
        return 'bg-red-500/10 text-red-600 hover:bg-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20';
    }
  };

  const getAlertIcon = (type: RiskAlert['type']) => {
    switch (type) {
      case 'exposure':
        return <AlertTriangle className="h-4 w-4" />;
      case 'volatility':
        return <AlertTriangle className="h-4 w-4" />;
      case 'drawdown':
        return <AlertTriangle className="h-4 w-4" />;
      case 'correlation':
        return <AlertTriangle className="h-4 w-4" />;
      case 'concentration':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const acknowledgeAlert = (id: string) => {
    toast.success('Alert acknowledged', {
      description: 'This alert has been marked as acknowledged.'
    });
  };

  const dismissAlert = (id: string) => {
    toast.info('Alert dismissed', {
      description: 'This alert has been dismissed and won\'t appear again.'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Risk Alerts</h3>
          <p className="text-sm text-muted-foreground">
            Notifications about potential risk issues in your portfolio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BellOff className="h-4 w-4 mr-2" />
            Mute All
          </Button>
          <Button variant="outline" size="sm">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Acknowledge All
          </Button>
        </div>
      </div>

      {alerts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <Bell className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-center text-muted-foreground">
              No risk alerts to display. All systems normal.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => (
            <Card key={alert.id} className={alert.isAcknowledged ? 'opacity-60' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium">{alert.message}</h4>
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Affected strategies: {alert.affectedStrategies.join(', ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!alert.isAcknowledged && (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => acknowledgeAlert(alert.id)}>
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => dismissAlert(alert.id)}>
                          Dismiss
                        </Button>
                      </>
                    )}
                    {alert.isAcknowledged && (
                      <Badge variant="outline">Acknowledged</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
