import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const AnimatedTimeline = () => {
  // This would normally be passed as a prop, but for demo purposes we'll use internal state
  // that can be controlled with buttons
  const [currentStep, setCurrentStep] = useState(0);
  
  
  // Timeline steps data
  const steps = [
    { id: 0, title: "Step 1", description: "Select Question Set For Test" },
    { id: 1, title: "Step 2", description: "Configure The Settings For Test" },
    { id: 2, title: "Step 3", description: "Add Participants For The Test" }
  ];

const location = useLocation();

useEffect(() => {
    const path = location.pathname.split('/').pop();
    switch (path) {
        case 'testQuestions':
            setCurrentStep(0);
            break;
        case 'testSettings':
            setCurrentStep(1);
            break;
        case 'testParticipants':
            setCurrentStep(2);
            break;
        default:
            setCurrentStep(1);
    }
}, [location]);
  
  return (
    <div className="w-full mx-auto px-4 py-8">
      
      {/* Timeline component */}
      <div className="relative">
        {/* Background track */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
        
        {/* Progress track - this shows completed progress */}
        <div 
          className="absolute top-5 left-0 h-1 bg-green-500 transition-all duration-700 ease-in-out"
          style={{
            width: currentStep === 0 ? '0%' : currentStep === 1 ? '50%' : '100%'
          }}
        ></div>
        
        {/* Steps container */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center relative z-10"
              style={{
                transition: 'all 0.5s ease-in-out',
                transform: currentStep === index ? 'translateY(0)' : 'translateY(0)'
              }}
            >
              {/* Circle indicator */}
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-500 ease-in-out ${
                  index < currentStep 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : index === currentStep 
                      ? 'bg-black border-black text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                }`}
              >
                {index < currentStep ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Title and description */}
              <div 
                className={`mt-3 text-center transition-all duration-500 ease-in-out ${
                  index === currentStep ? 'text-black font-medium' : index < currentStep ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                <div className="font-semibold">{step.title}</div>
                <div className="text-sm max-w-xs mt-1">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTimeline;