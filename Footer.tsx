import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A2F73] text-[#EAF4FF] border-t border-[#0F5CC8]/30 mt-16 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        
        {/* Logos Container */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#0F5CC8]/30 pb-8">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Kemensos Logo - Crisp White Silhouette */}
            <div className="flex items-center gap-3.5 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20">
              <img
                src="https://i.ibb.co.com/1fvdTbzz/Logo-Kemensos.png"
                alt="Logo Kemensos RI"
                className="h-10 w-auto object-contain filter brightness-200"
              />
              <div className="text-left border-l border-white/30 pl-3">
                <span className="text-xs font-extrabold tracking-wider text-white uppercase block">KEMENSOS RI</span>
                <span className="text-[10px] text-[#EAF4FF] uppercase tracking-wider block">Republik Indonesia</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right font-sans max-w-md">
            <h4 className="text-xs font-bold text-[#F5C400] tracking-wider uppercase">SINERGI KEMENTERIAN NKRI</h4>
            <p className="text-xs text-[#EAF4FF]/80 mt-1 leading-relaxed">
              Kolaborasi Dukcapil (Verifikasi NIK), Kemenkeu (Anggaran Negara), BPS (Satu Data Kemiskinan), dan Kemensos RI.
            </p>
          </div>
        </div>

        {/* Security Warning Card */}
        <div className="w-full bg-[#0F5CC8]/30 border border-[#2A74D9]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-inner">
          <ShieldCheck className="text-[#F5C400] shrink-0" size={26} />
          <div className="text-xs text-[#EAF4FF] leading-relaxed">
            <span className="font-bold text-[#F5C400] uppercase tracking-wider block sm:inline mr-1">Peringatan Keamanan Resmi:</span> Portal ini hanya melayani proses pendaftaran awal (Tahap 1). Kementerian Sosial Republik Indonesia <span className="text-white font-extrabold underline">TIDAK PERNAH</span> meminta biaya administrasi dalam bentuk apa pun. Hati-hati terhadap segala bentuk penipuan.
          </div>
        </div>

        {/* Footer Text */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EAF4FF]/70">
          <p className="text-center md:text-left">
            &copy; 2026 Kementerian Sosial Republik Indonesia – Program Bantuan Sosial Nasional.
          </p>
          <div className="flex gap-4">
            <a href="#kebijakan" className="hover:text-[#F5C400] transition">Kebijakan Privasi</a>
            <span>|</span>
            <a href="#syarat" className="hover:text-[#F5C400] transition">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
