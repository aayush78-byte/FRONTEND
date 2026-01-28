import React, { useState } from 'react';
import { Shield, Scale, FileText, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import UploadBox from '../components/UploadBox';
import RiskMeter from '../components/RiskMeter';
import ClauseCard from '../components/ClauseCard';
import NegotiationBox from '../components/NegotiationBox';
import { AnalysisResponse, ContractIssue } from '../api';

const Dashboard: React.FC = () => {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [clauses, setClauses] = useState<ContractIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalysisComplete = (data: AnalysisResponse) => {
    setRiskScore(data.risk_score);
    setClauses(data.issues);
    setAnalysisComplete(true);
  };

  const stats = {
    high: clauses.filter(c => c.risk_level === 'HIGH').length,
    medium: clauses.filter(c => c.risk_level === 'MEDIUM').length,
    low: clauses.filter(c => c.risk_level === 'LOW').length,
  };

  return (
    <div className="min-h-screen bg-3d relative overflow-hidden">
      {/* 3D Floating Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Hero Header */}
      <header className="gradient-hero relative z-10">
        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center glow-purple">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-gradient">
                  AI Legal Sentinel
                </h1>
                <p className="text-muted-foreground text-sm md:text-base flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Contract Intelligence for India
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <span className="w-2 h-2 rounded-full bg-risk-safe animate-pulse" />
                <span className="text-sm text-foreground/90">AI Ready</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground/90">PDF & DOCX</span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="mt-6 text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">
            Upload your contract and get instant AI-powered analysis of risky clauses, 
            legal citations under Indian law, and ready-to-use negotiation drafts.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Upload Section */}
          <section className="mb-8">
            <UploadBox
              onAnalysisComplete={handleAnalysisComplete}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </section>

          {/* Results Section */}
          {analysisComplete && riskScore !== null && (
            <>
              {/* Stats Bar */}
              <section className="mb-8 animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-foreground">{clauses.length}</p>
                      <p className="text-xs text-muted-foreground">Issues Found</p>
                    </div>
                  </div>
                  
                  <div className="glass-card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-risk-danger/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-risk-danger" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-risk-danger">{stats.high}</p>
                      <p className="text-xs text-muted-foreground">High Risk</p>
                    </div>
                  </div>
                  
                  <div className="glass-card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-risk-caution/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-risk-caution" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-risk-caution">{stats.medium}</p>
                      <p className="text-xs text-muted-foreground">Medium Risk</p>
                    </div>
                  </div>
                  
                  <div className="glass-card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-risk-safe/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-risk-safe" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-risk-safe">{stats.low}</p>
                      <p className="text-xs text-muted-foreground">Low Risk</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Risk Meter & Negotiation */}
                <div className="lg:col-span-1 space-y-8">
                  <RiskMeter score={riskScore} />
                  <NegotiationBox issues={clauses} />
                </div>

                {/* Right Column - Clause Cards */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        Clause Analysis
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Click on any clause to see detailed analysis
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 rounded-full text-xs glass-card text-muted-foreground">
                        Sorted by Risk
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[...clauses]
                      .sort((a, b) => {
                        const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
                        return order[a.risk_level] - order[b.risk_level];
                      })
                      .map((issue, index) => (
                        <ClauseCard
                          key={index}
                          clause={issue.clause}
                          riskLevel={issue.risk_level}
                          lawCited={issue.law_cited}
                          eli5={issue.eli5}
                          confidence={issue.confidence}
                          index={index}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Empty State */}
          {!analysisComplete && !isLoading && (
            <section className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl glass-card flex items-center justify-center glow-purple">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Ready to Analyze
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload a contract above to receive instant AI-powered analysis 
                with legal citations under Indian law.
              </p>
            </section>
          )}

          {/* Loading State */}
          {isLoading && (
            <section className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl glass-card flex items-center justify-center animate-pulse-glow glow-purple">
                <Scale className="w-10 h-10 text-primary animate-float" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Analyzing Contract...
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our AI is reviewing your contract against Indian legal statutes. 
                This typically takes 10-30 seconds.
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border relative z-10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                AI Legal Sentinel for India
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              This tool provides AI-assisted analysis and does not constitute legal advice. 
              Always consult a qualified legal professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
