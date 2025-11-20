import React from 'react';
import { Phone, Shield, Globe, HeartHandshake } from 'lucide-react';

const Resources: React.FC = () => {
  const resources = [
    {
      title: "Emergency Services (Kenya)",
      description: "Police, Ambulance, and Fire services. Available 24/7.",
      contact: "999 / 112 / 911",
      icon: <Phone className="w-6 h-6 text-red-500 dark:text-red-400" />,
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-slate-100 dark:border-red-900/30"
    },
    {
      title: "National GBV Helpline",
      description: "Toll-free hotline for Gender-Based Violence and sexual assault support (HAK).",
      contact: "1195",
      icon: <HeartHandshake className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-slate-100 dark:border-purple-900/30"
    },
    {
      title: "FIDA Kenya",
      description: "Legal aid and advice for women facing discrimination or violence.",
      contact: "0800 720 501",
      icon: <Globe className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-slate-100 dark:border-blue-900/30"
    },
    {
      title: "DCI Cyber Crime Unit",
      description: "Report online harassment, stalking, and cyberbullying to the DCI.",
      contact: "0800 722 203",
      icon: <Shield className="w-6 h-6 text-green-500 dark:text-green-400" />,
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-slate-100 dark:border-green-900/30"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Kenya Safety Resources</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          You are not alone. Here are specialized organizations in Kenya and steps you can take to protect yourself.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((res, idx) => (
            <div key={idx} className={`${res.bg} p-5 rounded-xl border ${res.border} hover:shadow-md transition-all`}>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                  {res.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{res.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 mb-2">{res.description}</p>
                  <span className="inline-block px-3 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm font-medium rounded-full border border-slate-200 dark:border-slate-600">
                    {res.contact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 transition-colors">
        <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Reporting Online Harassment in Kenya</h3>
        <ul className="list-disc list-inside text-indigo-800 dark:text-indigo-300 text-sm space-y-1">
          <li>Do not delete messages or posts; take clear screenshots.</li>
          <li>Report the account directly to the social media platform (Instagram/Twitter/TikTok).</li>
          <li>Visit the nearest Police Station or DCI office to file a report.</li>
          <li>Contact <strong>1195</strong> for psychological support and guidance.</li>
        </ul>
      </div>
    </div>
  );
};

export default Resources;