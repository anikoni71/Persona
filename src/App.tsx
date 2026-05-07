import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  ArrowUpRight,
  Printer,
  Upload
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BAR_DATA = [
  { name: 'Digital Marketing', value: 85 },
  { name: 'Bridal Services', value: 92 },
  { name: 'SPA Services', value: 78 },
  { name: 'Hair Treatment', value: 74 },
  { name: 'Customer Retention', value: 88 }
];

const PIE_DATA = [
  { name: 'Marketing', value: 30 },
  { name: 'SPA', value: 20 },
  { name: 'Operations', value: 15 },
  { name: 'CRM', value: 15 },
  { name: 'Premium Services', value: 20 }
];

const COLORS = ['#c00000', '#8b0000', '#ef4444', '#fca5a5', '#7f1d1d'];

import { useState } from 'react';

const FALLBACK_IMAGES = {
  cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200&h=500"
};

function ImgWithFallback({ src, fallback, alt, className, disableMissingUI = false }: { src: string, fallback?: string, alt: string, className?: string, disableMissingUI?: boolean }) {
  const [error, setError] = useState(false);
  const [localUrl, setLocalUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalUrl(URL.createObjectURL(e.target.files[0]));
      setError(false);
    }
  };

  const currentSrc = localUrl || (error && fallback ? fallback : src);
  const isActuallyMissing = error && !fallback && !localUrl;

  return (
    <>
      <img 
        src={currentSrc} 
        alt={alt} 
        className={cn(className, isActuallyMissing && disableMissingUI ? 'hidden' : '')} 
        onError={() => {
          if (!error) setError(true);
        }} 
      />
      {isActuallyMissing && !disableMissingUI && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 border border-dashed border-red-300 text-red-800 p-2 text-center cursor-pointer hover:bg-red-100 transition-colors z-20 overflow-hidden m-2 rounded">
           <Upload className="w-8 h-8 mb-1 opacity-80 text-red-600" />
           <span className="text-sm font-bold leading-tight">Upload {alt}</span>
           <span className="text-xs opacity-80 mt-1 hidden sm:block">Click here</span>
           <input title="Upload image" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
        </div>
      )}
      {(!isActuallyMissing || disableMissingUI) && (
         <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/60 text-white flex flex-col items-center justify-center transition-all duration-300 cursor-pointer z-50 print:hidden m-2 rounded backdrop-blur-sm shadow-xl">
           <Upload className="w-8 h-8 mb-2 text-white shadow-sm" />
           <span className="font-bold text-sm text-center px-4 tracking-wide leading-tight">Replace Image</span>
           <input title="Replace image" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
         </div>
      )}
    </>
  );
}

function PersonaLogo({ className, hideSubtitle = false }: { className?: string, hideSubtitle?: boolean }) {
  return (
    <div className={cn("inline-flex flex-col items-center relative group/logo", className)}>
      <ImgWithFallback 
        src="/persona-logo.png" 
        alt="Persona Logo" 
        className="w-32 md:w-48 h-auto object-contain hidden" // Hidden by default if real logo absent
        disableMissingUI={true}
      />
      <span className="font-script text-4xl md:text-5xl lg:text-6xl text-[#c00000] drop-shadow-sm -mb-2">Persona&reg;</span>
      {!hideSubtitle && <span className="text-gray-500 text-[10px] md:text-xs tracking-widest font-sans ml-2">where beauty has a new name</span>}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#eef2f7] text-[#1f2937] font-sans">
      
      {/* Cover Page */}
      <section className="min-h-[80vh] print:min-h-0 bg-white flex flex-col justify-center py-12 px-8 overflow-hidden relative border-b-8 border-[#8b0000] print:border-none print:py-0 print:mb-8">
        {/* Top Right Logo */}
        <div className="max-w-7xl mx-auto w-full flex justify-end mb-4 print:hidden z-10 relative">
          <PersonaLogo className="scale-75 md:scale-90 origin-right" hideSubtitle={false} />
        </div>

        {/* Cover Collage Banner */}
        <div className="max-w-7xl mx-auto w-full flex-grow mb-12 shadow-[0_20px_50px_-12px_rgba(139,0,0,0.25)] rounded-2xl relative min-h-[40vh] md:min-h-[50vh] bg-white border-4 border-[#c00000]/10 overflow-hidden flex items-center justify-center print:shadow-none print:border-none print:mb-4">
          <ImgWithFallback 
            src="/cover.png" 
            alt="Cover Collage" 
            className="w-full h-auto max-h-[70vh] object-contain object-center absolute inset-0 m-auto mix-blend-multiply" 
          />
        </div>

        {/* Logos & Titles */}
        <div className="max-w-4xl mx-auto w-full flex-col flex items-center md:items-start text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-16 w-full mb-10">
            <PersonaLogo />
            <div className="flex items-center">
              <span className="text-[#88b940] text-4xl md:text-6xl font-light tracking-wide flex items-center">
                <span className="flex gap-1 mr-2 text-xl md:text-2xl">
                  <span>o</span><span className="mt-2">o</span>
                </span>
                Spring spa
              </span>
            </div>
          </div>

          <div className="mb-12 border-l-8 border-[#c00000] pl-6 py-2">
            <h1 className="text-4xl md:text-5xl font-bold text-[#8b0000] mb-3 font-sans tracking-tight">Chittagong Branch</h1>
            <h2 className="text-2xl md:text-4xl font-bold text-[#c00000] font-sans tracking-tight">Managers' Meeting &ndash; May 10, 2026</h2>
          </div>

          <div className="text-lg md:text-2xl text-gray-800 space-y-3 bg-gray-50 p-6 md:p-8 rounded-xl w-full max-w-2xl border border-gray-100 shadow-sm">
            <p className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-500">Presenter Name</span> 
              <span className="font-semibold text-[#8b0000]">Antika Barua</span>
            </p>
            <p className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium text-gray-500">Designation</span> 
              <span className="font-semibold text-gray-800">Dy. Branch In charge</span>
            </p>
            <p className="flex justify-between pt-2">
              <span className="font-medium text-gray-500">Location</span> 
              <span className="text-gray-800 text-right">Conference Room, Corporate Office</span>
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center text-gray-400">
          <span className="text-sm uppercase tracking-widest mb-2 font-medium text-[#c00000]">Scroll to Dashboard</span>
          <ArrowUpRight className="w-6 h-6 rotate-135 text-[#c00000]" />
        </div>
      </section>

      {/* Main Dashboard */}
      <div className="pb-12 space-y-8">
        <header className="bg-gradient-to-br from-[#4a0000] to-[#8b0000] text-white px-8 py-8 md:py-10 md:px-12 shadow-lg relative overflow-hidden flex items-center justify-between print:bg-none print:text-[#8b0000] print:border-b-4 print:border-[#8b0000] print:shadow-none print:px-0 print:py-4">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 print:hidden"></div>
          <div className="relative z-10 max-w-7xl flex items-center gap-6">
            <div className="bg-white p-2 rounded-lg hidden sm:block print:hidden">
              <PersonaLogo hideSubtitle={true} className="scale-75 origin-left" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-1">Executive Dashboard</h2>
              <p className="text-red-200 text-sm md:text-lg max-w-3xl font-light print:text-red-800">Strategic Business Review &bull; May 2026</p>
            </div>
          </div>
          
          {/* Print Button */}
          <button 
            onClick={() => window.print()}
            className="relative z-10 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-5 py-2.5 rounded-xl transition-all font-medium text-white shadow-sm print:hidden group"
          >
            <Printer size={20} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Export to PDF</span>
          </button>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Revenue Growth Target" value="+25%" icon={<TrendingUp className="w-6 h-6 text-[#c00000]" />} imageSrc="/model1.png" />
          <KpiCard title="Customer Reactivation" value="12%" icon={<Users className="w-6 h-6 text-[#c00000]" />} imageSrc="/model2.png" />
          <KpiCard title="SPA Campaign Duration" value="30D" icon={<Clock className="w-6 h-6 text-[#c00000]" />} imageSrc="/model4.png" />
          <KpiCard title="High Value Client Focus" value="VIP" icon={<Star className="w-6 h-6 text-[#c00000]" />} imageSrc="/model3.png" />
        </div>

        {/* Executive Summary */}
        <Section className="relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
            <PersonaLogo className="scale-150" />
          </div>
          <h2 className="text-2xl font-bold text-[#8b0000] border-l-4 border-[#c00000] pl-3 mb-6 relative z-10">Executive Summary</h2>
          <div className="bg-[#fff5f5] border-l-4 border-[#c00000] p-6 rounded-lg text-lg leading-relaxed text-[#1f2937]/90 shadow-sm relative z-10">
            The Chittagong Branch strategy focuses on increasing client engagement, expanding premium services,
            strengthening digital marketing, improving operational efficiency, and reducing unnecessary operational costs.
            The overall objective is to increase customer retention, improve service conversion, and establish the branch
            as the leading premium beauty & wellness destination in Chittagong.
          </div>
        </Section>

        {/* Strategies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ListSection 
            title="Business Growth Strategy" 
            imageSrc="/model1.png"
            items={[
              "Increase social media marketing using transformation videos and service highlights.",
              "Expand bridal make-up packages from BDT 10,000–30,000.",
              "Improve make-up product variety and showroom-style display.",
              "Introduce trendy services like Brazilian Nano Silk, Omega, and Kerashine treatments.",
              "Expand fashion and base hair color portfolio."
            ]}
          />
          <ListSection 
            title="Customer Retention & CRM" 
            imageSrc="/model2.png"
            items={[
              "Launch SMS discount campaigns for inactive members.",
              "Automatic membership reactivation through minimum spending.",
              "Special VIP engagement with top annual clients.",
              "Corporate voucher partnerships to increase customer acquisition."
            ]}
          />
          <ListSection 
            title="SPA Development Strategy"
            imageSrc="/model4.png"
            items={[
              "30-day massage promotional campaign.",
              "Introduce whitening scrub and body wrap packages.",
              "Cross-sell SPA with protein hair treatment services.",
              "Create professional SPA promotional videos."
            ]}
          />
          <ListSection 
            title="Operational Improvement"
            imageSrc="/model3.png"
            items={[
              "Upgrade salon tools and equipment quality.",
              "Improve manicure & pedicure customer experience.",
              "Introduce modern waxing and facial treatments.",
              "Enhance branch ambience and service convenience."
            ]}
          />
        </div>

        {/* Strategic Analysis */}
        <Section className="overflow-hidden">
          <h2 className="text-2xl font-bold text-[#8b0000] border-l-4 border-[#c00000] pl-3 mb-6">Strategic Analysis</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#8b0000] text-white">
                  <th className="p-4 font-semibold whitespace-nowrap rounded-tl-lg">Area</th>
                  <th className="p-4 font-semibold">Current Situation</th>
                  <th className="p-4 font-semibold rounded-tr-lg">Management Opportunity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <TableRow 
                  area="Digital Marketing" 
                  current="Limited promotional visibility" 
                  opportunity="High opportunity for social media conversion growth" 
                />
                <TableRow 
                  area="Premium Services" 
                  current="Strong client demand" 
                  opportunity="Increase high-margin bridal & SPA packages" 
                />
                <TableRow 
                  area="Customer Retention" 
                  current="Inactive membership users" 
                  opportunity="SMS-based retention and loyalty activation" 
                />
                <TableRow 
                  area="Operational Cost" 
                  current="Fuel and generator expenses rising" 
                  opportunity="IPS support and controlled utility usage" 
                />
                <TableRow 
                  area="Brand Positioning" 
                  current="Strong physical infrastructure" 
                  opportunity="Professional digital presentation to attract premium customers" 
                />
              </tbody>
            </table>
          </div>
        </Section>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Section>
            <h2 className="text-2xl font-bold text-[#8b0000] border-l-4 border-[#c00000] pl-3 mb-6">Growth Potential Analysis</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BAR_DATA} margin={{ top: 30, right: 30, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} angle={-15} textAnchor="end" />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <RechartsTooltip 
                    cursor={{fill: '#fff5f5'}}
                    contentStyle={{borderRadius: '8px', border: '1px solid #fca5a5', boxShadow: '0 4px 6px -1px rgb(192 0 0 / 0.1)', color: '#8b0000', fontWeight: 'bold'}}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                  <Bar dataKey="value" fill="#c00000" radius={[4, 4, 0, 0]} maxBarSize={60}>
                    <LabelList dataKey="value" position="top" fill="#8b0000" formatter={(val: number) => `${val}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
           </Section>

           <Section>
            <h2 className="text-2xl font-bold text-[#8b0000] border-l-4 border-[#c00000] pl-3 mb-6">Strategic Priority Focus</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="45%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={true}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{borderRadius: '8px', border: '1px solid #fca5a5', boxShadow: '0 4px 6px -1px rgb(192 0 0 / 0.1)', color: '#8b0000', fontWeight: 'bold'}}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
           </Section>
        </div>

        {/* Management Recommendations */}
        <Section className="overflow-hidden">
          <h2 className="text-2xl font-bold text-[#8b0000] border-l-4 border-[#c00000] pl-3 mb-6">Management Recommendations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#8b0000] text-white">
                  <th className="p-4 font-semibold rounded-tl-lg">Priority</th>
                  <th className="p-4 font-semibold">Recommendation</th>
                  <th className="p-4 font-semibold rounded-tr-lg">Expected Business Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <TableRowRecommendation priority="High" rec="Increase digital marketing investment" impact="Higher client acquisition & visibility" />
                <TableRowRecommendation priority="High" rec="Expand premium bridal and SPA packages" impact="Revenue growth from premium services" />
                <TableRowRecommendation priority="Medium" rec="Implement structured CRM campaigns" impact="Improve customer retention" />
                <TableRowRecommendation priority="Medium" rec="Upgrade operational equipment" impact="Better customer experience" />
                <TableRowRecommendation priority="High" rec="Optimize utility and fuel consumption" impact="Cost minimization" />
              </tbody>
            </table>
          </div>
        </Section>

        {/* Conclusion */}
        <Section>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#8b0000] border-l-4 border-[#c00000] pl-3 mb-6">Conclusion</h2>
              <div className="bg-[#fff5f5] border-l-4 border-[#c00000] p-6 rounded-lg text-lg leading-relaxed text-[#1f2937]/90 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 blur-[1px]">
                  <PersonaLogo className="scale-150 translate-x-12 translate-y-8" />
                </div>
                <p className="relative z-10">
                  The Chittagong Branch has strong potential to become a flagship premium beauty & wellness center through
                  focused digital marketing, premium service expansion, customer retention initiatives, and operational efficiency.
                  Immediate implementation of these strategic actions can significantly improve revenue growth, customer loyalty,
                  and overall branch profitability.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="mt-12 max-w-7xl mx-auto px-4 pb-8 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center mb-4 md:mb-0">
          <PersonaLogo hideSubtitle={true} className="scale-50 origin-left -ml-8 -mr-8 grayscale opacity-70" />
          <span>Executive Strategic Management Dashboard</span>
        </div>
        <div>
           Persona Chittagong Branch &bull; May 2026
        </div>
      </footer>
      </div>
    </div>
  );
}

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-red-50", className)}>
      {children}
    </section>
  );
}

function KpiCard({ title, value, icon, imageSrc }: { title: string; value: string; icon: React.ReactNode; imageSrc?: string }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-red-50 flex border-b-4 border-b-[#c00000] transition-transform hover:-translate-y-1 duration-300 relative group h-32">
      <div className="p-5 flex flex-col justify-center w-2/3 relative z-10 bg-white">
        <div className="flex items-center mb-1">
          <div className="p-1.5 bg-red-50 rounded-lg mr-2">{icon}</div>
          <h3 className="text-[#8b0000] font-medium text-xs lg:text-sm leading-tight">{title}</h3>
        </div>
        <p className="text-2xl lg:text-4xl font-bold text-[#c00000]">{value}</p>
      </div>
      {imageSrc && (
        <div className="w-1/3 h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
          <ImgWithFallback src={imageSrc} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
      )}
    </div>
  );
}

function ListSection({ title, items, imageSrc }: { title: string; items: string[], imageSrc?: string }) {
  return (
    <Section className="h-full flex flex-col relative overflow-hidden group hover:border-red-100 transition-colors">
      {imageSrc && (
        <div className="absolute right-0 top-0 w-32 h-32 md:w-56 md:h-full opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 w-full h-full"></div>
          <ImgWithFallback src={imageSrc} alt="" className="w-full h-full object-cover object-right-top md:object-right" />
        </div>
      )}
      <h2 className="text-xl md:text-2xl font-bold text-[#8b0000] border-l-4 border-[#c00000] pl-3 mb-5 relative z-20">{title}</h2>
      <ul className="space-y-4 flex-1 relative z-20">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <ArrowUpRight className="w-5 h-5 text-[#c00000] mr-2 shrink-0 mt-0.5" />
            <span className="text-gray-700 leading-relaxed font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function TableRow({ area, current, opportunity }: { area: string; current: string; opportunity: string }) {
  return (
    <tr className="hover:bg-red-50/50 transition-colors">
      <td className="p-4 font-semibold text-[#8b0000]">{area}</td>
      <td className="p-4 text-gray-700">{current}</td>
      <td className="p-4 text-gray-700">{opportunity}</td>
    </tr>
  );
}

function TableRowRecommendation({ priority, rec, impact }: { priority: string; rec: string; impact: string }) {
  return (
    <tr className="hover:bg-red-50/50 transition-colors">
      <td className="p-4">
        <span className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
          priority === 'High' ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
        )}>
          {priority}
        </span>
      </td>
      <td className="p-4 text-gray-900 font-medium">{rec}</td>
      <td className="p-4 text-gray-600 font-medium">{impact}</td>
    </tr>
  );
}


