import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Download, RefreshCw, AlertOctagon } from 'lucide-react';
import { analyzeTextToxicity } from '../services/huggingFaceService';
import { AnalysisResult } from '../types';

const HateSpeechAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const data = await analyzeTextToxicity(inputText);
      setResults(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateReport = () => {
    if (!results) return;

    const timestamp = new Date().toLocaleString();
    const reportContent = `
SAFEGUARD TOXICITY REPORT
Generated: ${timestamp}
-------------------------
INPUT TEXT:
"${inputText}"
-------------------------
ANALYSIS RESULTS:
${results.map(r => `${r.label}: ${(r.score * 100).toFixed(2)}%`).join('\n')}
-------------------------
Note: This is an automated analysis using AI models and should not be used as sole legal evidence.
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `safeguard_report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (score: number) => {
    if (score > 0.8) return 'bg-red-500';
    if (score > 0.5) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Enter text to analyze for harassment or toxicity
        </label>
        <textarea
          className="w-full h-32 p-4 rounded-xl border border-slate-200 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition-all resize-none text-gray-900 dark:text-white bg-white dark:bg-slate-900 placeholder-gray-500 dark:placeholder-slate-500 font-medium"
          placeholder="Paste a tweet, message, or email here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputText.trim()}
            className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 disabled:opacity-50 transition-all shadow-sm shadow-indigo-200 dark:shadow-none"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <AlertOctagon className="w-4 h-4 mr-2" /> Analyze Text
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 animate-in slide-in-from-bottom-4 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
              Analysis Results
              <span className="ml-3 text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                Model: unbiased-toxic-roberta
              </span>
            </h3>
            <button
              onClick={generateReport}
              className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
            >
              <Download className="w-4 h-4 mr-1" /> Download Report
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="capitalize font-semibold text-slate-700 dark:text-slate-200">{result.label}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${getSeverityColor(result.score)}`}>
                    {(result.score * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${getSeverityColor(result.score)}`}
                    style={{ width: `${result.score * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-start space-x-3 border border-blue-100 dark:border-blue-800/50">
             <div className="mt-0.5">
               <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
             </div>
             <div>
               <h4 className="font-medium text-blue-900 dark:text-blue-300">Safety Recommendation</h4>
               <p className="text-sm text-blue-800 dark:text-blue-400 mt-1">
                 {results[0]?.score > 0.7 
                   ? "This content has a high probability of being toxic. Consider blocking the sender and documenting this evidence using the 'Download Report' button." 
                   : "This content appears to have low toxicity. However, trust your instincts. If you feel unsafe, use the Resources tab."}
               </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HateSpeechAnalyzer;