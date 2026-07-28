import React, { useState } from 'react';
import { LogIn, Mail, Phone, LogOut, Smartphone, Lock, ClipboardCheck, ShieldCheck, Download } from 'lucide-react';
import { Penerima } from '../types';
import GaleriArsip from './GaleriArsip';
import VisiMisiUUSection from './VisiMisiUUSection';

interface LoginProps {
  daftarPenerima: Penerima[];
  onAdminLoginSuccess: () => void;
  onUserLoginSuccess: (user: Penerima) => void;
  currentUser: Penerima | null;
  onLogout: () => void;
  onShowToast: (message: string, isError?: boolean) => void;
}

export default function Login({
  daftarPenerima,
  onAdminLoginSuccess,
  onUserLoginSuccess,
  currentUser,
  onLogout,
  onShowToast,
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');

  const apkDownloadUrl = "https://github.com/bansosresmiid/bansosresmiid/releases/download/v1.0/Bansos_2026.apk";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanHp = hp.trim();

    if (!cleanEmail || !cleanHp) {
      onShowToast('Email dan Nomor HP wajib diisi!', true);
      return;
    }

    if (cleanEmail === 'berkahkita937@gmail.com') {
      onAdminLoginSuccess();
      onShowToast('Login sebagai Administrator berhasil!');
      return;
    }

    const user = daftarPenerima.find(
      (p) => p.email.toLowerCase() === cleanEmail.toLowerCase() && p.hp === cleanHp
    );

    if (user) {
      onUserLoginSuccess(user);
      onShowToast(`Selamat datang kembali, ${user.nama}!`);
    } else {
      onShowToast('Email atau nomor HP tidak terdaftar. Silakan lakukan Registrasi.', true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EAF4FF] text-[#0F5CC8] rounded-full text-xs font-bold uppercase tracking-wider border border-[#0F5CC8]/20">
          <ShieldCheck size={14} /> Otentikasi Terpadu Kemensos RI
        </div>
        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0A2F73]">
          {currentUser ? 'Profil Penerima Bansos' : 'Login Portal Bansos'}
        </h2>
        <p className="text-sm text-[#6B7280] max-w-lg mx-auto leading-relaxed">
          {currentUser
            ? 'Informasi detail akun kependudukan dan status verifikasi bantuan sosial Anda.'
            : 'Masuk menggunakan email dan nomor HP Anda yang terdaftar untuk mengakses status bantuan sosial Anda.'}
        </p>
      </div>

      {currentUser ? (
        /* Logged In User Profile Card */
        <div className="card-official overflow-hidden">
          <div className="bg-[#0A2F73] text-white px-6 py-5 flex items-center justify-between border-b border-[#0F5CC8]/30">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2E7D32] animate-pulse"></span>
              <span className="text-xs font-bold font-mono tracking-wider text-[#EAF4FF] uppercase">AKUN KPM AKTIF</span>
            </div>
            <button
              onClick={onLogout}
              className="text-xs uppercase font-bold tracking-wider text-[#F5C400] hover:text-white flex items-center gap-1.5 cursor-pointer transition"
            >
              <LogOut size={14} /> Keluar (Logout)
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-[#EAF4FF] border border-[#0F5CC8]/20 p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-[#0F5CC8] text-white rounded-xl shadow-xs">
                <ClipboardCheck size={26} />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans text-lg font-extrabold uppercase tracking-tight text-[#0A2F73]">
                  Selamat Datang, {currentUser.nama}!
                </h4>
                <p className="text-xs text-[#1F2937] leading-relaxed">
                  Pendaftaran Akun Tahap 1 Anda telah <span className="font-extrabold underline text-[#0F5CC8]">SELESAI</span>. Anda terdaftar sebagai calon Keluarga Penerima Manfaat (KPM) bantuan sosial.
                </p>
              </div>
            </div>

            {/* Profile Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F5F7FA] p-4 rounded-xl space-y-1 border border-[#EAF4FF]">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Nomor NIK KTP</span>
                <span className="font-mono font-extrabold text-[#0A2F73]">{currentUser.nik}</span>
              </div>

              <div className="bg-[#F5F7FA] p-4 rounded-xl space-y-1 border border-[#EAF4FF]">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Nomor Kartu Keluarga (KK)</span>
                <span className="font-mono font-extrabold text-[#0A2F73]">{currentUser.kk || '-'}</span>
              </div>

              <div className="bg-[#F5F7FA] p-4 rounded-xl space-y-1 border border-[#EAF4FF]">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Alamat Email</span>
                <span className="text-[#1F2937] font-bold">{currentUser.email}</span>
              </div>

              <div className="bg-[#F5F7FA] p-4 rounded-xl space-y-1 border border-[#EAF4FF]">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Nomor HP Aktif</span>
                <span className="font-mono text-[#1F2937] font-bold">{currentUser.hp}</span>
              </div>

              <div className="bg-[#F5F7FA] p-4 rounded-xl space-y-1 border border-[#EAF4FF] sm:col-span-2">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Alamat Rumah</span>
                <span className="text-[#1F2937] leading-normal font-medium">{currentUser.alamat}</span>
              </div>

              <div className="bg-[#F5F7FA] p-4 rounded-xl space-y-1 border border-[#EAF4FF] sm:col-span-2">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Detail Rekening Rencana Penerima (Tahap 2)</span>
                <span className="text-[#1F2937] font-bold flex flex-wrap items-center gap-1.5">
                  🏢 {currentUser.bankName} – No. Rek: <span className="font-mono font-black text-[#0A2F73]">{currentUser.bankAccount || '-'}</span>
                  {currentUser.bankAccountName && (
                    <span className="text-[#6B7280] font-medium text-xs">
                      (a.n. <span className="font-bold text-[#1F2937]">{currentUser.bankAccountName}</span>)
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Stage Progress Block */}
            <div className="border-t border-[#EAF4FF] pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status Kelayakan:</span>
                <span className="text-xs font-extrabold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  BERHAK (Rp3.400.000)
                </span>
              </div>

              {/* Locked Notice & App CTA */}
              <div className="bg-[#F5F7FA] border border-[#EAF4FF] rounded-2xl p-5 text-[#1F2937] flex flex-col md:flex-row items-center gap-4 justify-between">
                <div className="space-y-1 text-center md:text-left max-w-md">
                  <h5 className="font-bold text-xs text-[#0A2F73] uppercase tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                    <Lock size={15} className="text-[#0F5CC8]" />
                    Tahap 2-5 Membutuhkan Verifikasi Biometrik
                  </h5>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Untuk menjamin kerahasiaan data perbankan dan keabsahan KTP Anda, verifikasi berkas mandatory (Tahap 2 s/d 5) harus diakses melalui aplikasi smartphone.
                  </p>
                </div>
                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#F5C400] hover:bg-[#E9B400] text-[#1F2937] font-extrabold text-xs tracking-wider rounded-[14px] uppercase btn-glow-yellow shrink-0 cursor-pointer inline-flex items-center gap-2 transition-all duration-300"
                >
                  <Download size={14} /> VERIFIKASI SEKARANG VIA APK
                </a>
              </div>

              {/* Information & Workflow */}
              <div className="border-t border-[#EAF4FF] pt-6 space-y-6">
                <div>
                  <h5 className="font-bold text-xs text-[#0A2F73] uppercase tracking-widest block font-mono mb-2">
                    💡 Informasi Program & Panduan Penyaluran
                  </h5>
                  <div className="bg-[#F5F7FA] border border-[#EAF4FF] rounded-2xl p-5 space-y-2">
                    <h6 className="text-xs font-bold text-[#0A2F73] uppercase tracking-wider">
                      Untuk Apa Bantuan Sosial (Bansos) Ini?
                    </h6>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Program ini disalurkan oleh Kementerian Sosial Republik Indonesia bertujuan untuk <strong>mengurangi beban pengeluaran</strong> Keluarga Penerima Manfaat (KPM), meningkatkan <strong>ketahanan pangan & gizi</strong>, mendukung <strong>kebutuhan pokok harian</strong>, serta menjadi pengaman sosial untuk memutus rantai kemiskinan ekstrem nasional secara merata dan tepat sasaran.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-bold text-xs text-[#0A2F73] uppercase tracking-widest block font-mono">
                    📍 Tahapan Penyaluran Bansos Anda (Step-by-Step)
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="bg-[#0A2F73] text-white p-3.5 rounded-2xl border border-[#0F5CC8]/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded font-black">TAHAP 1</span>
                        <span className="text-[#F5C400] font-bold text-xs">✓ Selesai</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight">Akun KPM</h6>
                      <p className="text-[10px] text-[#EAF4FF]/80 leading-normal">Pendaftaran NIK, No. KK, No. HP, dan Alamat di portal online.</p>
                    </div>

                    <div className="bg-[#0A2F73] text-white p-3.5 rounded-2xl border border-[#0F5CC8]/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded font-black">TAHAP 2</span>
                        <span className="text-[#F5C400] font-bold text-xs">✓ Selesai</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight">Rekening Bank</h6>
                      <p className="text-[10px] text-[#EAF4FF]/80 leading-normal">Pengisian nomor rekening dan bank penyalur terdaftar.</p>
                    </div>

                    <div className="bg-[#EAF4FF] border border-[#0F5CC8]/40 p-3.5 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-[#0F5CC8] text-white px-2 py-0.5 rounded font-black">TAHAP 3</span>
                        <span className="text-[#0F5CC8] font-bold text-[9px] animate-pulse">Berjalan...</span>
                      </div>
                      <h6 className="text-[11px] font-extrabold uppercase tracking-tight text-[#0A2F73]">Biometrik APK</h6>
                      <p className="text-[10px] text-[#6B7280] leading-normal">Unduh APK Kemensos untuk verifikasi wajah & foto KTP asli.</p>
                    </div>

                    <div className="bg-white border border-[#EAF4FF] p-3.5 rounded-2xl space-y-2 opacity-60">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-[#F5F7FA] text-[#6B7280] px-2 py-0.5 rounded font-black">TAHAP 4</span>
                        <span className="text-[#6B7280] font-mono text-[9px]">Terkunci</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight text-[#1F2937]">Verval Berkas</h6>
                      <p className="text-[10px] text-[#6B7280] leading-normal">Verifikasi administratif dan validasi kelayakan oleh Kemensos.</p>
                    </div>

                    <div className="bg-white border border-[#EAF4FF] p-3.5 rounded-2xl space-y-2 opacity-60">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-[#F5F7FA] text-[#6B7280] px-2 py-0.5 rounded font-black">TAHAP 5</span>
                        <span className="text-[#6B7280] font-mono text-[9px]">Terkunci</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight text-[#1F2937]">Cair Mandiri</h6>
                      <p className="text-[10px] text-[#6B7280] leading-normal">Penyaluran otomatis transfer dana Rp3.400.000 ke rekening.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Galeri Arsip Program Kemasyarakatan */}
              <GaleriArsip 
                title="Dokumentasi & Arsip Program untuk KPM" 
                subtitle="File arsip penting negara mengenai dokumentasi pelaksanaan program kemasyarakatan Kementerian Sosial RI."
              />

              {/* Visi Misi & UU Bansos Section for KPM */}
              <VisiMisiUUSection 
                title="Visi, Misi & Landasan Hukum Program Bansos KPM"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Log In Form Card */
        <div className="card-official overflow-hidden">
          <div className="bg-[#0A2F73] text-white px-6 py-5 flex items-center gap-3 border-b border-[#0F5CC8]/30">
            <div className="p-2 bg-[#0F5CC8] text-white rounded-xl shadow-xs">
              <LogIn size={20} />
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase">Login Kredensial</h3>
              <p className="text-[10px] text-[#EAF4FF] tracking-wider uppercase">PORTAL RESMI KEMENSOS RI</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="loginEmail" className="block text-[10px] font-bold text-[#0A2F73] uppercase tracking-wider">
                Alamat Email Aktif
              </label>
              <div className="relative">
                <input
                  id="loginEmail"
                  type="email"
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] text-sm text-[#1F2937] transition-all shadow-2xs"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F5CC8]">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="loginHp" className="block text-[10px] font-bold text-[#0A2F73] uppercase tracking-wider">
                Nomor Handphone Terdaftar
              </label>
              <div className="relative">
                <input
                  id="loginHp"
                  type="text"
                  placeholder="Contoh: 0812XXXXXXXX"
                  value={hp}
                  onChange={(e) => setHp(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] text-sm font-mono text-[#1F2937] transition-all shadow-2xs"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F5CC8]">
                  <Phone size={18} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0F5CC8] hover:bg-[#0A2F73] text-white font-extrabold text-xs tracking-wider rounded-[14px] btn-glow-blue transition-all duration-300 cursor-pointer uppercase"
            >
              MASUK (LOGIN)
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
