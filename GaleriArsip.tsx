import React, { useState } from 'react';
import { Image as ImageIcon, ShieldCheck, FileText, ZoomIn, X, Landmark, Archive } from 'lucide-react';
import { arsipImages, ARSIP_NOTICE, ArsipImage } from '../data/arsipData';

interface GaleriArsipProps {
  title?: string;
  subtitle?: string;
}

export default function GaleriArsip({
  title = "Dokumentasi & Arsip Program Kemasyarakatan",
  subtitle = "Galeri resmi dokumentasi pelayanan publik dan program bantuan sosial Kementerian Sosial Republik Indonesia."
}: GaleriArsipProps) {
  const [selectedImage, setSelectedImage] = useState<ArsipImage | null>(null);

  return (
    <div className="space-y-6 my-8 animate-fade-in">
      {/* Title & Official Notice Banner */}
      <div className="card-official overflow-hidden border border-[#0F5CC8]/30">
        <div className="bg-[#0A2F73] text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0F5CC8]/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0F5CC8] text-[#F5C400] rounded-xl shadow-xs shrink-0">
              <Archive size={22} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#F5C400] text-[#1F2937] text-[10px] font-extrabold uppercase tracking-wider rounded-md mb-1">
                <Landmark size={12} /> ARSIP NEGARA RESMI
              </div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight uppercase text-white">
                {title}
              </h3>
            </div>
          </div>

          <div className="px-3.5 py-2 bg-[#0F5CC8]/40 border border-[#2A74D9]/50 rounded-xl text-right shrink-0">
            <span className="text-[10px] font-mono text-[#EAF4FF] uppercase tracking-wider block font-bold">
              STATUS DOKUMEN:
            </span>
            <span className="text-xs font-extrabold text-[#F5C400] uppercase tracking-wider flex items-center justify-end gap-1">
              <ShieldCheck size={14} /> TERSIMPAN DALAM DATABASE DTKS
            </span>
          </div>
        </div>

        {/* Highlight Notice Strip */}
        <div className="bg-[#EAF4FF] border-b border-[#0F5CC8]/15 px-6 py-3.5 flex items-start sm:items-center gap-3">
          <FileText size={18} className="text-[#0F5CC8] shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs font-extrabold text-[#0A2F73] leading-relaxed uppercase tracking-wide">
            📌 KETERANGAN ARSIP: <span className="font-semibold text-[#1F2937] lowercase first-letter:capitalize">{ARSIP_NOTICE}</span>
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-[#6B7280] leading-relaxed max-w-3xl">
            {subtitle} Gambar-gambar berikut dikelompokkan sebagai <strong className="text-[#0A2F73]">file arsip penting negara</strong> mengenai perjalanan, transparansi, serta integrasi teknologi digital dalam penyaluran bantuan sosial kepada masyarakat luas.
          </p>

          {/* Grid of 5 Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arsipImages.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-[#EAF4FF] hover:border-[#0F5CC8]/40 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Box */}
                <div className="relative aspect-video bg-[#F5F7FA] overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Badge & Overlay */}
                  <div className="absolute top-3 left-3 bg-[#0A2F73]/85 text-white backdrop-blur-xs text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-lg border border-white/20 shadow-xs flex items-center gap-1">
                    <ImageIcon size={12} className="text-[#F5C400]" />
                    ARSIP #{item.id}
                  </div>

                  <button
                    onClick={() => setSelectedImage(item)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#0A2F73] rounded-xl shadow-md opacity-90 group-hover:opacity-100 transition cursor-pointer"
                    title="Perbesar Gambar Arsip"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-sans text-sm font-extrabold text-[#0A2F73] group-hover:text-[#0F5CC8] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-4 font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F5F7FA] flex items-center justify-between text-[10px] text-[#6B7280]">
                    <span className="font-mono uppercase font-bold text-[#0F5CC8]">Kemensos RI</span>
                    <span className="italic font-medium">Dokumentasi Resmi</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-[#EAF4FF] text-center text-xs text-[#6B7280]">
            🇮🇩 <strong>Dokumentasi Resmi Program Kemasyarakatan</strong> — Seluruh materi visual dalam galeri ini terdaftar secara sah dalam database inventarisasi arsip nasional Kementerian Sosial Republik Indonesia.
          </div>
        </div>
      </div>

      {/* Lightbox Modal for enlarged view */}
      {selectedImage && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EAF4FF]">
            <div className="bg-[#0A2F73] text-white px-6 py-4 flex items-center justify-between border-b border-[#0F5CC8]/30">
              <div className="flex items-center gap-2">
                <Archive size={18} className="text-[#F5C400]" />
                <span className="text-xs font-extrabold tracking-wider uppercase">
                  Detail Arsip Negara #{selectedImage.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-[#EAF4FF] hover:text-white p-1 rounded-lg transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="rounded-xl overflow-hidden bg-slate-100 border border-[#EAF4FF]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[450px] object-contain mx-auto"
                />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 bg-[#EAF4FF] text-[#0F5CC8] text-[10px] font-extrabold uppercase rounded-md border border-[#0F5CC8]/20">
                  Dokumentasi Resmi Kemensos RI
                </span>
                <h3 className="text-lg font-extrabold text-[#0A2F73]">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-[#1F2937] leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>

              <div className="p-3 bg-[#EAF4FF]/60 border border-[#0F5CC8]/20 rounded-xl text-xs text-[#0A2F73] font-medium flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#0F5CC8] shrink-0" />
                <span><strong>Catatan Arsip:</strong> {ARSIP_NOTICE}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
