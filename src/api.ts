import axios, { AxiosInstance, AxiosError } from 'axios';

// API Response Types
export interface ContractIssue {
  clause: string;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  law_cited: string;
  eli5: string;
  confidence: number;
}

export interface AnalysisResponse {
  risk_score: number;
  issues: ContractIssue[];
}

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 60000, // 60 seconds for large file uploads
  headers: {
    'Accept': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API] Response:`, response.status);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('[API] Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('[API] No Response:', error.message);
    } else {
      console.error('[API] Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Analyze a contract file using the AI Legal Sentinel API
 * @param file - PDF or DOCX file to analyze
 * @returns Analysis response with risk score and issues
 */
export const analyzeContract = async (file: File): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<AnalysisResponse>('/analyze-contract', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Mock function for demo purposes when API is not available
export const analyzeContractMock = async (_file: File): Promise<AnalysisResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return {
    risk_score: 87,
    issues: [
      {
        clause: "The Employee agrees not to engage in any business or employment that competes with the Company for a period of 5 years after termination, across all of India.",
        risk_level: "HIGH",
        law_cited: "Indian Contract Act, 1872 – Section 27",
        eli5: "This non-compete clause is likely unenforceable in India. Section 27 of the Indian Contract Act makes agreements that restrain trade void. Courts have consistently ruled against such broad restrictions.",
        confidence: 0.94
      },
      {
        clause: "Any disputes shall be resolved exclusively under the jurisdiction of courts in Singapore, and Singapore law shall apply.",
        risk_level: "HIGH",
        law_cited: "Consumer Protection Act, 2019 – Section 2(7)",
        eli5: "For consumer contracts, Indian courts have jurisdiction. This foreign jurisdiction clause may be challenged if it causes undue hardship to an Indian party.",
        confidence: 0.88
      },
      {
        clause: "The Company reserves the right to modify the terms of this agreement at any time without prior notice to the Employee.",
        risk_level: "MEDIUM",
        law_cited: "Indian Contract Act, 1872 – Section 14",
        eli5: "Unilateral modification clauses may be considered unfair. Valid contracts require 'free consent' from all parties. Changes should be mutually agreed upon.",
        confidence: 0.82
      },
      {
        clause: "The Employee shall forfeit all pending dues and bonuses if they resign before completing 2 years of service.",
        risk_level: "MEDIUM",
        law_cited: "Payment of Wages Act, 1936 – Section 7",
        eli5: "Earned wages cannot be forfeited. While notice period clauses are valid, withholding already-earned compensation may violate labour laws.",
        confidence: 0.79
      },
      {
        clause: "Employee agrees to maintain confidentiality of company information during and after employment.",
        risk_level: "LOW",
        law_cited: "Information Technology Act, 2000 – Section 72A",
        eli5: "This is a standard and reasonable confidentiality clause. It protects legitimate business interests without unduly restricting the employee.",
        confidence: 0.95
      }
    ]
  };
};

export default apiClient;
