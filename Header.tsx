import React from 'react';
import { AlignJustify, X, Download, LogIn, UserCheck, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdminLoggedIn: boolean;
  currentUser: any;
  onLogout: () => void;
}

export default function Header({
  activeSection,
  setActiveSection,
  isAdminLoggedIn,
  currentUser,
  onLogout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'ceknik', label: 'Cek Bansos' },
    { id: 'registrasi', label: 'Registrasi' },
    { id: 'login', label: currentUser || isAdminLoggedIn ? 'Profil' : 'Login' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'login' && isAdminLoggedIn) {
      setActiveSection('dashboardAdmin');
    } else {
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };

  const apkDownloadUrl = "https://github.com/bansosresmiid/bansosresmiid/releases/download/v1.0/Bansos_2026.apk";

  return (
    <header className="sticky top-0 w-full bg-white border-b border-[#EAF4FF] shadow-sm z-50 transition-all duration-300">
      {/* Top Accent Strip */}
      <div className="h-1 bg-gradient-to-r from-[#0A2F73] via-[#0F5CC8] to-[#F5C400]"></div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left Side: Logo & Institution Name */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer group" 
          onClick={() => handleNavClick('beranda')}
        >
          <div className="p-1.5 border border-[#EAF4FF] rounded-xl bg-[#F5F7FA] group-hover:border-[#0F5CC8]/30 transition-all duration-300 shadow-xs">
            <img
              src="https://i.ibb.co.com/1fvdTbzz/Logo-Kemensos.png"
              alt="Kementerian Sosial Republik Indonesia"
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col border-l-2 border-[#0F5CC8] pl-3">
            <h1 className="font-sans text-base sm:text-lg font-extrabold tracking-tight text-[#0A2F73] leading-tight group-hover:text-[#0F5CC8] transition-colors">
              KEMENTERIAN SOSIAL
            </h1>
            <h2 className="font-sans text-[10px] sm:text-xs font-semibold text-[#6B7280] tracking-wider uppercase">
              Republik Indonesia
            </h2>
            <span className="text-[9px] font-medium text-[#0F5CC8] tracking-tight flex items-center gap-1 mt-0.5">
              <ShieldCheck size={11} className="text-[#0F5CC8]" /> PORTAL RESMI BANTUAN SOSIAL NASIONAL
            </span>
          </div>
        </div>

        {/* Right Side Desktop: Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Download APK Button - Accent Yellow */}
          <a
            href={apkDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#F5C400] hover:bg-[#E9B400] text-[#1F2937] font-bold text-xs uppercase tracking-wider rounded-[14px] btn-glow-yellow flex items-center gap-2 cursor-pointer transition-all duration-300"
          >
            <Download size={15} className="text-[#1F2937]" />
            Unduh APK Bansos
          </a>

          {/* Login / Profile Button - Primary Blue */}
          <button
            onClick={() => handleNavClick('login')}
            className="px-4 py-2.5 bg-[#0F5CC8] hover:bg-[#0A2F73] text-white font-bold text-xs uppercase tracking-wider rounded-[14px] btn-glow-blue flex items-center gap-2 cursor-pointer transition-all duration-300"
          >
            {currentUser || isAdminLoggedIn ? (
              <>
                <UserCheck size={15} />
                {isAdminLoggedIn ? 'Dashboard Admin' : 'Profil SAYA'}
              </>
            ) : (
              <>
                <LogIn size={15} />
                Login Masuk
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#0A2F73] text-white border-t border-[#0F5CC8]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-1 items-center w-full justify-center">
              {navItems.map((item) => {
                const isActive = activeSection === item.id || 
                  (item.id === 'login' && activeSection === 'dashboardAdmin');
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-t-lg ${
                      isActive
                        ? 'bg-white text-[#0A2F73] font-extrabold shadow-sm border-t-2 border-[#F5C400]'
                        : 'text-[#EAF4FF] hover:bg-[#0F5CC8]/50 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {isAdminLoggedIn && (
                <button
                  onClick={() => handleNavClick('dashboardAdmin')}
                  className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider bg-[#F5C400] text-[#0A2F73] rounded-t-lg hover:bg-[#E9B400] cursor-pointer transition-colors ${
                    activeSection === 'dashboardAdmin' ? 'ring-2 ring-white' : ''
                  }`}
                >
                  ⚙️ Dashboard Admin
                </button>
              )}
            </div>

            {/* Mobile Nav Header */}
            <div className="flex md:hidden items-center justify-between w-full py-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EAF4FF] flex items-center gap-2">
                Menu Utama
              </span>
              
              <div className="flex items-center gap-2">
                <a
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#F5C400] text-[#1F2937] font-bold text-[10px] uppercase rounded-lg flex items-center gap-1"
                >
                  <Download size={12} />
                  APK
                </a>
                
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded-lg bg-[#0F5CC8] text-white hover:bg-[#2A74D9] focus:outline-none cursor-pointer"
                >
                  {mobileMenuOpen ? <X size={20} /> : <AlignJustify size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A2F73] border-t border-[#0F5CC8]/30 px-4 py-3 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const isActive = activeSection === item.id ||
                (item.id === 'login' && activeSection === 'dashboardAdmin');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0A2F73] font-extrabold shadow-sm'
                      : 'text-[#EAF4FF] hover:bg-[#0F5CC8]/40 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#0F5CC8]/30 space-y-2">
              <a
                href={apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 bg-[#F5C400] text-[#1F2937] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
              >
                <Download size={14} />
                Unduh Aplikasi APK Bansos
              </a>

              {isAdminLoggedIn && (
                <button
                  onClick={() => handleNavClick('dashboardAdmin')}
                  className="block w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#F5C400] text-[#0A2F73] hover:bg-[#E9B400] cursor-pointer"
                >
                  ⚙️ Dashboard Admin
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
