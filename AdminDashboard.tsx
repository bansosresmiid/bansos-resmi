import React, { useState } from 'react';
import { Users, FileText, Calendar, PlusCircle, Edit2, Trash2, Search, X, Save, Shield, Clock, TrendingUp } from 'lucide-react';
import { Penerima, ActivityLog } from '../types';
import { visiMisiBansos } from '../data/initialData';
import GaleriArsip from './GaleriArsip';
import VisiMisiUUSection from './VisiMisiUUSection';

interface AdminDashboardProps {
  daftarPenerima: Penerima[];
  activityLogs: ActivityLog[];
  onAddPenerima: (p: Penerima) => void;
  onUpdatePenerima: (updated: Penerima) => void;
  onDeletePenerima: (nik: string) => void;
  onLogout: () => void;
  onShowToast: (message: string, isError?: boolean) => void;
}

export default function AdminDashboard({
  daftarPenerima,
  activityLogs,
  onAddPenerima,
  onUpdatePenerima,
  onDeletePenerima,
  onLogout,
  onShowToast,
}: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPenerima, setEditingPenerima] = useState<Penerima | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Add/Edit
  const [formNik, setFormNik] = useState('');
  const [formNama, setFormNama] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formHp, setFormHp] = useState('');
  const [formAlamat, setFormAlamat] = useState('');
  const [formKk, setFormKk] = useState('');
  const [formBankName, setFormBankName] = useState('Bank Mandiri');
  const [formBankAccount, setFormBankAccount] = useState('');
  const [formBankAccountName, setFormBankAccountName] = useState('');
  const [formStatus, setFormStatus] = useState<'Berhak' | 'Proses'>('Berhak');

  const todayStr = '2026-07-28';
  const registeredToday = daftarPenerima.filter((p) => p.createdAt === todayStr);

  const filteredPenerima = daftarPenerima.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nik.includes(searchTerm)
  );

  const handleOpenEdit = (p: Penerima) => {
    setEditingPenerima(p);
    setFormNik(p.nik);
    setFormNama(p.nama);
    setFormEmail(p.email);
    setFormHp(p.hp);
    setFormAlamat(p.alamat);
    setFormKk(p.kk || '');
    setFormBankName(p.bankName || 'Bank Mandiri');
    setFormBankAccount(p.bankAccount || '');
    setFormBankAccountName(p.bankAccountName || p.nama);
    setFormStatus(p.status === 'Berhak' ? 'Berhak' : 'Proses');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPenerima) return;

    if (formNik.length !== 16 || formKk.length !== 16) {
      onShowToast('NIK dan KK wajib terdiri dari 16 digit angka!', true);
      return;
    }

    const updated: Penerima = {
      ...editingPenerima,
      nik: formNik.trim(),
      nama: formNama.trim(),
      email: formEmail.trim(),
      hp: formHp.trim(),
      alamat: formAlamat.trim(),
      kk: formKk.trim(),
      bankName: formBankName,
      bankAccount: formBankAccount.trim(),
      bankAccountName: formBankAccountName.trim(),
      status: formStatus,
    };

    onUpdatePenerima(updated);
    setEditingPenerima(null);
    onShowToast(`Data pelanggan ${formNama} berhasil diperbarui!`);
  };

  const handleOpenAdd = () => {
    setFormNik('');
    setFormNama('');
    setFormEmail('');
    setFormHp('');
    setFormAlamat('');
    setFormKk('');
    setFormBankName('Bank Mandiri');
    setFormBankAccount('');
    setFormBankAccountName('');
    setFormStatus('Berhak');
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formNik.length !== 16 || formKk.length !== 16) {
      onShowToast('NIK dan KK wajib terdiri dari 16 digit angka!', true);
      return;
    }

    if (daftarPenerima.some((p) => p.nik === formNik)) {
      onShowToast(`NIK ${formNik} sudah terdaftar sebelumnya!`, true);
      return;
    }

    const newPenerima: Penerima = {
      nik: formNik.trim(),
      nama: formNama.trim(),
      email: formEmail.trim(),
      hp: formHp.trim(),
      alamat: formAlamat.trim(),
      kk: formKk.trim(),
      bankName: formBankName,
      bankAccount: formBankAccount.trim(),
      bankAccountName: formBankAccountName.trim(),
      status: formStatus,
      stage: 1,
      createdAt: todayStr,
      lastActive: new Date().toLocaleTimeString('id-ID', { hour12: false }),
    };

    onAddPenerima(newPenerima);
    setIsAddModalOpen(false);
    onShowToast(`Pelanggan baru ${formNama} berhasil ditambahkan ke database.`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF4FF] pb-5">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#0F5CC8] tracking-wider flex items-center gap-1.5">
            <Shield size={14} /> Administrator Secured Zone (DTKS Kemensos)
          </span>
          <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-[#0A2F73] uppercase tracking-tight mt-1">
            Dashboard Pengelolaan Bansos
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#0F5CC8] hover:bg-[#0A2F73] text-white font-extrabold text-xs uppercase tracking-wider rounded-[14px] btn-glow-blue transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle size={15} /> TAMBAH PENERIMA KPM
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-white border border-[#E5E7EB] hover:bg-[#F5F7FA] text-[#0A2F73] font-extrabold text-xs uppercase tracking-wider rounded-[14px] transition cursor-pointer"
          >
            KELUAR (LOGOUT)
          </button>
        </div>
      </div>

      {/* Grid Stats Per Hari (Official government cards with top yellow border) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Registered */}
        <div className="bg-white border-t-4 border-t-[#F5C400] border-x border-b border-[#EAF4FF] rounded-[18px] p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Total Terdaftar</span>
            <div className="text-2xl font-black text-[#0A2F73]">{daftarPenerima.length} KK</div>
            <p className="text-[10px] text-[#6B7280] font-medium">Seluruh Wilayah NKRI</p>
          </div>
          <div className="p-3.5 bg-[#EAF4FF] text-[#0F5CC8] rounded-xl">
            <Users size={24} />
          </div>
        </div>

        {/* Stat 2: Real-time Today */}
        <div className="bg-white border-t-4 border-t-[#F5C400] border-x border-b border-[#EAF4FF] rounded-[18px] p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Registrasi Hari Ini</span>
            <div className="text-2xl font-black text-[#2E7D32] flex items-center gap-1">
              +{registeredToday.length}
              <TrendingUp size={18} className="text-[#2E7D32] animate-bounce" />
            </div>
            <p className="text-[10px] text-[#6B7280] font-medium">Real-Time: {todayStr}</p>
          </div>
          <div className="p-3.5 bg-[#2E7D32]/10 text-[#2E7D32] rounded-xl">
            <Calendar size={24} />
          </div>
        </div>

        {/* Stat 3: Total Budget Allocated */}
        <div className="bg-white border-t-4 border-t-[#F5C400] border-x border-b border-[#EAF4FF] rounded-[18px] p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Dana Alokasi KK</span>
            <div className="text-2xl font-black text-[#0A2F73]">Rp3,4 Jt</div>
            <p className="text-[10px] text-[#6B7280] font-medium">Per Keluarga Penerima</p>
          </div>
          <div className="p-3.5 bg-[#EAF4FF] text-[#0F5CC8] rounded-xl">
            <FileText size={24} />
          </div>
        </div>

        {/* Stat 4: Stage 1 Completed Ratio */}
        <div className="bg-white border-t-4 border-t-[#F5C400] border-x border-b border-[#EAF4FF] rounded-[18px] p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Tahap 1 Selesai</span>
            <div className="text-2xl font-black text-[#0A2F73]">
              {daftarPenerima.filter((p) => p.stage === 1).length} KPM
            </div>
            <p className="text-[10px] text-[#6B7280] font-medium">100% Akun Valid</p>
          </div>
          <div className="p-3.5 bg-[#F5C400]/15 text-[#E9B400] rounded-xl">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Main Grid: Management Table + Log + Visi Misi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table Column - Spans 2 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h3 className="font-sans text-lg font-extrabold text-[#0A2F73]">
              Daftar Keluarga Penerima Manfaat (KPM)
            </h3>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari nama atau NIK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] text-[#1F2937]"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F5CC8]">
                <Search size={14} />
              </div>
            </div>
          </div>

          <div className="card-official overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0A2F73] text-white font-sans uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 font-extrabold">NIK & KK</th>
                    <th className="p-3.5 font-extrabold">Nama Lengkap</th>
                    <th className="p-3.5 font-extrabold">Kontak & Rekening</th>
                    <th className="p-3.5 font-extrabold">Tanggal Reg</th>
                    <th className="p-3.5 font-extrabold">Kelayakan</th>
                    <th className="p-3.5 text-center font-extrabold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAF4FF] font-sans">
                  {filteredPenerima.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#6B7280] font-medium">
                        Tidak ada data penerima yang cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  ) : (
                    filteredPenerima.map((p) => (
                      <tr key={p.nik} className="hover:bg-[#F5F7FA] transition">
                        <td className="p-3.5 space-y-1">
                          <div className="font-mono font-extrabold text-[#0A2F73]">{p.nik}</div>
                          <div className="text-[10px] text-[#6B7280] font-mono">KK: {p.kk || 'N/A'}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-[#1F2937]">{p.nama}</div>
                          <div className="text-[10px] text-[#6B7280] max-w-[150px] truncate">{p.alamat}</div>
                        </td>
                        <td className="p-3.5 space-y-1">
                          <div className="text-[#1F2937] font-medium">{p.email}</div>
                          <div className="text-[10px] text-[#6B7280] font-mono">{p.hp}</div>
                          <div className="text-[10px] text-[#0A2F73] bg-[#EAF4FF] px-2 py-0.5 rounded-md inline-block font-mono font-semibold">
                            🏢 {p.bankName} - {p.bankAccount || 'Belum diinput'}{p.bankAccountName ? ` (a.n. ${p.bankAccountName})` : ''}
                          </div>
                        </td>
                        <td className="p-3.5 font-mono font-semibold text-[#6B7280]">
                          {p.createdAt}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full font-extrabold uppercase text-[9px] border tracking-wider ${
                              p.status === 'Berhak'
                                ? 'bg-[#2E7D32]/10 border-[#2E7D32]/20 text-[#2E7D32]'
                                : 'bg-[#F5C400]/20 border-[#E9B400]/30 text-[#1F2937]'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-2 hover:bg-[#EAF4FF] text-[#0F5CC8] hover:text-[#0A2F73] rounded-lg transition cursor-pointer"
                              title="Edit Data Pelanggan"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Apakah Anda yakin ingin menghapus data KPM ${p.nama}? Tindakan ini permanen.`)) {
                                  onDeletePenerima(p.nik);
                                }
                              }}
                              className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                              title="Hapus Data Pelanggan"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Log & Visi Misi Column */}
        <div className="space-y-6">
          {/* Government Visi Misi Block */}
          <div className="bg-[#0A2F73] text-white rounded-[18px] border border-[#0F5CC8]/30 p-5 space-y-4 shadow-md">
            <h4 className="font-sans text-xs font-extrabold text-[#F5C400] uppercase tracking-wider border-b border-[#0F5CC8]/30 pb-2 flex items-center gap-2">
              👑 Visi Misi Republik Indonesia
            </h4>
            
            <div className="space-y-3 text-xs leading-relaxed">
              <p className="italic text-[#EAF4FF] font-sans font-medium border-l-2 border-[#F5C400] pl-3">
                &ldquo;{visiMisiBansos.visi}&rdquo;
              </p>
              
              <div className="space-y-2">
                <span className="font-bold text-[#F5C400] uppercase text-[9px] tracking-wider block">Misi Utama Kemensos:</span>
                <ul className="list-disc list-inside space-y-1.5 text-[#EAF4FF]/90 pl-1 text-[11px]">
                  {visiMisiBansos.misi.slice(0, 2).map((m, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Real-time Activity Log */}
          <div className="card-official p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAF4FF] pb-2">
              <h4 className="font-sans text-xs font-extrabold text-[#0A2F73] uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={15} className="text-[#2E7D32]" />
                Log Aktivitas Terkini (Hari Ini)
              </h4>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#2E7D32] animate-pulse"></span>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {activityLogs.map((log) => (
                <div key={log.id} className="text-[11px] leading-relaxed flex items-start gap-2 border-b border-[#F5F7FA] pb-2">
                  <div className="text-[#6B7280] font-mono mt-0.5 font-bold shrink-0">{log.timestamp}</div>
                  <div>
                    <span className="font-bold text-[#0A2F73]">{log.nama}</span>{' '}
                    <span className="text-[#6B7280]">{log.action}</span>
                    <span className="text-[9px] text-[#6B7280] font-mono block">NIK: {log.nik}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Galeri Arsip Dokumentasi Program Kemasyarakatan - Admin View */}
      <GaleriArsip 
        title="Dokumentasi & File Arsip Penting Kemensos RI"
        subtitle="Galeri arsip resmi nasional untuk keperluan pengawasan, transparansi, dan tata kelola program bantuan sosial."
      />

      {/* Visi, Misi & Landasan Hukum UU untuk Admin */}
      <VisiMisiUUSection 
        title="Visi, Misi & Landasan Hukum (Undang-Undang) Pengawasan Bansos"
      />

      {/* Edit Modal */}
      {editingPenerima && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-[18px] border border-[#EAF4FF] shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#0A2F73] text-white px-6 py-4 flex items-center justify-between border-b border-[#0F5CC8]/30">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#F5C400]">✏️ Edit Data Pelanggan KPM</h3>
              <button
                onClick={() => setEditingPenerima(null)}
                className="text-[#EAF4FF] hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#0A2F73] uppercase">NIK KTP (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formNik}
                    onChange={(e) => setFormNik(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl font-mono text-xs tracking-wider"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#0A2F73] uppercase">Nomor KK (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formKk}
                    onChange={(e) => setFormKk(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl font-mono text-xs tracking-wider"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#0A2F73] uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#0A2F73] uppercase">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#0A2F73] uppercase">No HP</label>
                  <input
                    type="text"
                    value={formHp}
                    onChange={(e) => setFormHp(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl font-mono text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#0A2F73] uppercase">Alamat Lengkap</label>
                <textarea
                  value={formAlamat}
                  onChange={(e) => setFormAlamat(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3 bg-[#F5F7FA] p-3 rounded-xl border border-[#EAF4FF]">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase">Bank Penerima</label>
                  <select
                    value={formBankName}
                    onChange={(e) => setFormBankName(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                  >
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank BNI">Bank BNI</option>
                    <option value="Bank BTN">Bank BTN</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank BSI">Bank BSI</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase">No Rekening</label>
                  <input
                    type="text"
                    value={formBankAccount}
                    onChange={(e) => setFormBankAccount(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-2 py-1.5 border border-[#E5E7EB] rounded-lg font-mono text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase">Atas Nama</label>
                  <input
                    type="text"
                    value={formBankAccountName}
                    onChange={(e) => setFormBankAccountName(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#E5E7EB] rounded-lg text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#0A2F73] uppercase block">Status Kelayakan</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1F2937]">
                    <input
                      type="radio"
                      checked={formStatus === 'Berhak'}
                      onChange={() => setFormStatus('Berhak')}
                      className="accent-[#0F5CC8]"
                    />
                    Berhak (Rp3.400.000)
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1F2937]">
                    <input
                      type="radio"
                      checked={formStatus === 'Proses'}
                      onChange={() => setFormStatus('Proses')}
                      className="accent-[#0F5CC8]"
                    />
                    Proses Verifikasi
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-[#EAF4FF] justify-end">
                <button
                  type="button"
                  onClick={() => setEditingPenerima(null)}
                  className="px-4 py-2 bg-[#F5F7FA] hover:bg-[#EAF4FF] text-[#6B7280] font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F5CC8] hover:bg-[#0A2F73] text-white font-extrabold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={14} /> Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-[18px] border border-[#EAF4FF] shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#0A2F73] text-white px-6 py-4 flex items-center justify-between border-b border-[#0F5CC8]/30">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#F5C400]">➕ Tambah Pelanggan Baru (KPM)</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#EAF4FF] hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#0A2F73] uppercase">NIK KTP (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formNik}
                    onChange={(e) => setFormNik(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 32730..."
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl font-mono text-xs tracking-wider"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#0A2F73] uppercase">Nomor KK (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formKk}
                    onChange={(e) => setFormKk(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 32730..."
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl font-mono text-xs tracking-wider"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#0A2F73] uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  placeholder="Nama lengkap sesuai KTP"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#0A2F73] uppercase">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#0A2F73] uppercase">No HP</label>
                  <input
                    type="text"
                    value={formHp}
                    onChange={(e) => setFormHp(e.target.value.replace(/\D/g, ''))}
                    placeholder="0812XXXXXXXX"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl font-mono text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#0A2F73] uppercase">Alamat Lengkap</label>
                <textarea
                  value={formAlamat}
                  onChange={(e) => setFormAlamat(e.target.value)}
                  placeholder="RT/RW Kelurahan, Kecamatan, Kota"
                  rows={2}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3 bg-[#F5F7FA] p-3 rounded-xl border border-[#EAF4FF]">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase">Bank Penerima</label>
                  <select
                    value={formBankName}
                    onChange={(e) => setFormBankName(e.target.value)}
                    className="w-full px-2 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                  >
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank BNI">Bank BNI</option>
                    <option value="Bank BTN">Bank BTN</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank BSI">Bank BSI</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase">No Rekening</label>
                  <input
                    type="text"
                    value={formBankAccount}
                    onChange={(e) => setFormBankAccount(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234XXXXXXXX"
                    className="w-full px-2 py-1.5 border border-[#E5E7EB] rounded-lg font-mono text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase">Atas Nama</label>
                  <input
                    type="text"
                    value={formBankAccountName}
                    onChange={(e) => setFormBankAccountName(e.target.value)}
                    placeholder="Nama pemilik rekening"
                    className="w-full px-2 py-1.5 border border-[#E5E7EB] rounded-lg text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#0A2F73] uppercase block">Status Kelayakan</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1F2937]">
                    <input
                      type="radio"
                      checked={formStatus === 'Berhak'}
                      onChange={() => setFormStatus('Berhak')}
                      className="accent-[#0F5CC8]"
                    />
                    Berhak (Rp3.400.000)
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1F2937]">
                    <input
                      type="radio"
                      checked={formStatus === 'Proses'}
                      onChange={() => setFormStatus('Proses')}
                      className="accent-[#0F5CC8]"
                    />
                    Proses Verifikasi
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-[#EAF4FF] justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-[#F5F7FA] hover:bg-[#EAF4FF] text-[#6B7280] font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F5CC8] hover:bg-[#0A2F73] text-white font-extrabold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle size={14} /> Tambah Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
