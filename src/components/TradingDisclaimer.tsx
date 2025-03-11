
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const TradingDisclaimer = () => {
  return (
    <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/50">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <AlertTitle className="text-yellow-800 dark:text-yellow-400">Trading Risk Warning</AlertTitle>
      <AlertDescription className="text-yellow-700 dark:text-yellow-300/80 text-sm">
        Cryptocurrency trading involves significant risk. The value of your investment may fluctuate, and you may lose all 
        or a substantial part of your investment. Past performance is not indicative of future results. This application 
        is provided "as is" with no warranty. Always use test mode first and start with small positions.
      </AlertDescription>
    </Alert>
  );
};

export default TradingDisclaimer;
