import React, { useState } from 'react';
import { Shield, AlertCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidence: number;
}

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getConfidenceLevel = (value: number) => {
    if (value >= 0.85) {
      return {
        label: 'High Confidence',
        shortLabel: 'High',
        icon: Shield,
        className: 'bg-risk-safe/20 text-risk-safe border-risk-safe/30',
        description: 'Our AI is highly confident in this assessment based on clear legal precedents and statutes.'
      };
    }
    if (value >= 0.7) {
      return {
        label: 'Medium Confidence',
        shortLabel: 'Medium',
        icon: AlertCircle,
        className: 'bg-risk-caution/20 text-risk-caution border-risk-caution/30',
        description: 'Assessment is based on interpretable legal principles, but edge cases may apply.'
      };
    }
    return {
      label: 'Low Confidence',
      shortLabel: 'Low',
      icon: AlertTriangle,
      className: 'bg-risk-warning/20 text-risk-warning border-risk-warning/30',
      description: 'This assessment requires human legal review. The clause may have unusual or ambiguous terms.'
    };
  };

  const confidenceInfo = getConfidenceLevel(confidence);
  const Icon = confidenceInfo.icon;
  const percentage = Math.round(confidence * 100);

  return (
    <div className="relative inline-flex">
      <button
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover:shadow-sm ${confidenceInfo.className}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{confidenceInfo.shortLabel}</span>
        <span className="opacity-60">({percentage}%)</span>
        <HelpCircle className="w-3 h-3 opacity-50" />
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 animate-fade-in">
          <div className="bg-popover text-popover-foreground rounded-lg p-3 text-xs max-w-[240px] shadow-lg border border-border">
            <p className="font-medium mb-1">{confidenceInfo.label}</p>
            <p className="opacity-80 leading-relaxed">{confidenceInfo.description}</p>
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="opacity-60">Confidence Score</span>
                <span className="font-medium">{percentage}%</span>
              </div>
              <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="w-3 h-3 bg-popover border-l border-b border-border rotate-[-45deg] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
};

export default ConfidenceBadge;
