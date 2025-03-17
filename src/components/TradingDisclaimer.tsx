
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const TradingDisclaimer = () => {
  return (
    <Alert 
      variant="destructive" 
      className="bg-blue-50/10 border-blue-400/30 dark:bg-blue-900/20 dark:border-blue-800/50 shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
    >
      <AlertTriangle className="h-4 w-4 text-blue-500 dark:text-blue-400" />
      <AlertTitle className="text-blue-600 dark:text-blue-300">Trading Risk Warning</AlertTitle>
      <AlertDescription className="text-blue-600/90 dark:text-blue-300/90 text-sm">
        Cryptocurrency trading involves significant risk. The value of your investment may fluctuate, and you may lose all 
        or a substantial part of your investment. Past performance is not indicative of future results. This application 
        is provided "as is" with no warranty. Always use test mode first and start with small positions.
      </AlertDescription>
    </Alert>
  );
};

export default TradingDisclaimer;
