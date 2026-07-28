import React from 'react';
import { Landmark, Scale, Target, CheckCircle2, ShieldCheck, ScrollText } from 'lucide-react';
import { visiMisiBansos } from '../data/initialData';

interface VisiMisiUUSectionProps {
  title?: string;
  compact?: boolean;
}

export default function VisiMisiUUSection({
  title = "Visi, Misi & Landasan Hukum (Undang-Undang) Bansos",
  compact = false
}: VisiMisiUUSectionProps) {
  return (
    <div className="space-y-6 my-8 animate-fade-in">
      {/* Main Container Card */}
      <div className="card-official overflow-hidden border border-[#0F5CC8]/30">
        
        {/* Banner Header */}
        <div className="bg-[#0A2F73] text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0F5CC8]/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0F5CC8] text-[#F5C400] rounded-xl shadow-xs shrink-0">
              <Landmark size={22} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#F5C400] text-[#1F2937] text-[10px] font-extrabold uppercase tracking-wider rounded-md mb-1">
                <ShieldCheck size={12} /> REPUBLIK INDONESIA
              </div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight uppercase text-white">
                {title}
              </h3>
            </div>
          </div>

          <div className="px-3.5 py-1.5 bg-[#0F5CC8]/40 border border-[#2A74D9]/50 rounded-xl text-right shrink-0">
            <span className="text-[10px] font-mono text-[#EAF4FF] uppercase tracking-wider block font-bold">
              REGULASI RESMI:
            </span>
            <span className="text-xs font-extrabold text-[#F5C400] uppercase tracking-wider flex items-center justify-end gap-1">
              <Scale size={14} /> KEMENTERIAN SOSIAL RI
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Visi Block */}
          <div className="bg-[#EAF4FF] border border-[#0F5CC8]/20 p-5 sm:p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-[#0A2F73]">
              <Target size={20} className="text-[#0F5CC8]" />
              <h4 className="font-sans text-sm font-extrabold uppercase tracking-wider">
                Visi Perlindungan Sosial Nasional
              </h4>
            </div>
            <p className="text-sm font-semibold text-[#0A2F73] leading-relaxed italic border-l-4 border-[#F5C400] pl-4 py-1">
              &ldquo;{visiMisiBansos.visi}&rdquo;
            </p>
          </div>

          {/* Misi & Tujuan Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Misi */}
            <div className="bg-[#F5F7FA] border border-[#EAF4FF] p-5 sm:p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-extrabold text-[#0A2F73] uppercase tracking-widest flex items-center gap-2 border-b border-[#EAF4FF] pb-3">
                <CheckCircle2 size={18} className="text-[#0F5CC8]" />
                Misi Utama Penyaluran Bansos
              </h4>
              <ul className="space-y-3 text-xs text-[#1F2937]">
                {visiMisiBansos.misi.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="h-5 w-5 rounded-full bg-[#0F5CC8] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tujuan Program */}
            <div className="bg-[#F5F7FA] border border-[#EAF4FF] p-5 sm:p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-extrabold text-[#0A2F73] uppercase tracking-widest flex items-center gap-2 border-b border-[#EAF4FF] pb-3">
                <Target size={18} className="text-[#2E7D32]" />
                Tujuan Strategis Kemensos RI
              </h4>
              <ul className="space-y-3 text-xs text-[#1F2937]">
                {visiMisiBansos.tujuan.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="h-5 w-5 rounded-full bg-[#2E7D32] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Landasan Hukum & Undang-Undang (UU) Section */}
          <div className="border-t border-[#EAF4FF] pt-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#0A2F73] text-[#F5C400] rounded-xl">
                  <ScrollText size={20} />
                </div>
                <div>
                  <h4 className="font-sans text-base font-extrabold text-[#0A2F73] uppercase tracking-wide">
                    Landasan Hukum & Undang-Undang Republik Indonesia
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    Dasar hukum penyelenggaraan program Bantuan Sosial dan Data Terpadu Kesejahteraan Sosial (DTKS).
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-[#F5C400]/20 border border-[#E9B400]/30 text-[#1F2937] text-[10px] font-mono font-extrabold rounded-full uppercase tracking-wider self-start sm:self-auto">
                LEGALITAS RESMI
              </span>
            </div>

            {/* UU List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visiMisiBansos.uuList?.map((uu, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAF4FF] hover:border-[#0F5CC8]/40 shadow-2xs transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-extrabold bg-[#0A2F73] text-white px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                      {uu.nomor}
                    </span>
                    <h5 className="font-sans text-xs font-extrabold text-[#0A2F73] uppercase tracking-tight">
                      Tentang: {uu.tentang}
                    </h5>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      {uu.deskripsi}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F5F7FA] flex items-center justify-between text-[9px] text-[#0F5CC8] font-mono font-bold">
                    <span>SEKRETARIS JENDERAL KEMENSOS</span>
                    <span>DIUNDANGKAN RESMI</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
