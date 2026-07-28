import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';

interface KontakProps {
  onShowToast: (message: string, isError?: boolean) => void;
}

export default function Kontak({ onShowToast }: KontakProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      onShowToast('Semua kolom pesan pengaduan wajib diisi!', true);
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onShowToast('Pesan pengaduan terkirim! Tim kurator Kemensos akan segera meninjau laporan Anda.');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EAF4FF] text-[#0F5CC8] rounded-full text-xs font-bold uppercase tracking-wider border border-[#0F5CC8]/20">
          <ShieldCheck size={14} /> Pusat Layanan Pengaduan Resmi
        </div>
        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0A2F73]">
          Kontak & Pengaduan Resmi
        </h2>
        <p className="text-sm text-[#6B7280] max-w-lg mx-auto leading-relaxed">
          Hubungi pusat bantuan atau kirimkan pengaduan terkait kendala proses verifikasi data bantuan sosial nasional Kemensos RI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Contact info card */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#0A2F73] text-white rounded-[18px] p-6 space-y-6 shadow-md border border-[#0F5CC8]/30">
            <h3 className="font-sans text-[#F5C400] text-base font-extrabold uppercase tracking-wide border-b border-[#0F5CC8]/30 pb-3">
              Kantor Pusat Kemensos RI
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <MapPin className="text-[#F5C400] shrink-0 mt-0.5" size={18} />
                <p className="leading-relaxed text-[#EAF4FF]">
                  <strong className="text-white block font-bold">Kementerian Sosial Republik Indonesia</strong>
                  Jl. Salemba Raya No. 28, Jakarta Pusat, DKI Jakarta 10430
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-[#F5C400] shrink-0 mt-0.5" size={18} />
                <p className="text-[#EAF4FF]">
                  <strong className="text-white block font-bold">E-mail Pengaduan:</strong>
                  pengaduan@kemensos.go.id
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-[#F5C400] shrink-0 mt-0.5" size={18} />
                <p className="text-[#EAF4FF]">
                  <strong className="text-white block font-bold">Hotline Center:</strong>
                  021-3950482 / Call Center: 159
                </p>
              </div>
            </div>

            <div className="bg-[#0F5CC8]/30 p-4 rounded-xl border border-[#2A74D9]/40 text-[11px] text-[#EAF4FF] leading-relaxed">
              ⚠️ <strong className="text-[#F5C400]">Layanan Pengaduan 24 Jam:</strong> Untuk respon tercepat serta verifikasi biometrik yang aman, silakan sampaikan laporan Anda langsung melalui menu Pengaduan di dalam <strong>APK Bansos Kemensos</strong>.
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="md:col-span-3 card-official p-6 sm:p-8">
          <h3 className="font-sans text-lg font-extrabold text-[#0A2F73] uppercase tracking-wide border-b border-[#EAF4FF] pb-3 mb-4">
            Kirim Pengaduan Online
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#0A2F73] uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sesuai KTP"
                  className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] text-xs text-[#1F2937]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#0A2F73] uppercase tracking-wider">Alamat Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] text-xs text-[#1F2937]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#0A2F73] uppercase tracking-wider">Isi Laporan Pengaduan / Keluhan</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan secara lengkap detail kendala atau pengaduan Anda..."
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] text-xs text-[#1F2937]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 bg-[#0F5CC8] hover:bg-[#0A2F73] disabled:bg-slate-300 text-white font-extrabold text-xs tracking-wider rounded-[14px] btn-glow-blue transition-all duration-300 uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSending ? (
                'Mengirim Laporan...'
              ) : (
                <>
                  <Send size={15} /> Kirim Pengaduan Terpadu
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
