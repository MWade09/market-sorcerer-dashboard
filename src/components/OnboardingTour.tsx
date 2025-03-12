
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book, Settings, Play, Info, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  setSelectedTab: (tab: string) => void;
}

const OnboardingTour = ({ isOpen, onClose, onComplete, setSelectedTab }: OnboardingTourProps) => {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to Market Sorcerer!",
      content: (
        <div className="space-y-4">
          <p>Thank you for joining Market Sorcerer, your intelligent trading companion. Let's take a quick tour of the key features to help you get started.</p>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Info size={18} className="text-blue-500" />
            <span>This guide will show you the essential controls and sections of the application.</span>
          </div>
        </div>
      )
    },
    {
      title: "Trading Controls",
      content: (
        <div className="space-y-4">
          <p>The main controls for your trading bot are located in the header:</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Play size={18} className="text-green-500" />
              <span>Use the <strong>Start/Stop Bot</strong> button to control your automated trading</span>
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Settings size={18} className="text-gray-500" />
              <span>Configure your <strong>Exchanges</strong>, <strong>Strategies</strong>, and <strong>Risk Management</strong> settings</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Main Sections",
      content: (
        <div className="space-y-4">
          <p>The application is organized into four main sections:</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <span className="font-semibold">Dashboard:</span> Overview of your trading performance and market data
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <span className="font-semibold">Trades:</span> Monitor your active trading positions
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <span className="font-semibold">History:</span> Review your past trades and performance
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg bg-primary/10">
              <Book size={18} className="text-primary" />
              <span className="font-semibold">Guide:</span> Learn how to use the platform effectively
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Let's Get Started!",
      content: (
        <div className="space-y-4">
          <p>We recommend starting with the <strong>Guide section</strong> to learn about:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Setting up your exchange connections</li>
            <li>Configuring your trading strategies</li>
            <li>Managing risk parameters</li>
            <li>Interpreting performance metrics</li>
          </ul>
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg mt-4">
            <ArrowRight size={18} className="text-primary" />
            <span>We'll automatically take you to the Guide section when you're ready!</span>
          </div>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // On final step, complete onboarding
      setSelectedTab("guide");
      onComplete();
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {steps[step].content}
        </div>
        
        <div className="flex items-center justify-center w-full gap-1 my-2">
          {steps.map((_, index) => (
            <span 
              key={index} 
              className={`h-1.5 rounded-full ${
                index === step ? 'w-6 bg-primary' : 'w-2 bg-muted'
              } transition-all duration-300`}
            />
          ))}
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="mt-2 sm:mt-0"
          >
            Skip tour
          </Button>
          <Button onClick={handleNext} className="gap-2">
            {step < steps.length - 1 ? 'Next' : 'Start trading'}
            <ArrowRight size={16} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTour;
