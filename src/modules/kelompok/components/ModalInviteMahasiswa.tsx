import { useMemo, useState } from "react";
import Swal from "sweetalert2";

import {
  AllCommunityModule,
  ColDef,
  CustomCellRendererProps,
} from "ag-grid-community";

import { AgGridProvider, AgGridReact } from "ag-grid-react";

import Button from "@/components/ui/button/Button";
import { Kelompok } from "@/modules/models/kelompok";
import { Mahasiswa as DataMahasiswa } from "@/modules/models/mahasiswa";
import { inviteJoinGroup } from "../services/kelompok.service";

const modules = [AllCommunityModule];

interface ModalInviteMahasiswaProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mahasiswa: DataMahasiswa[] | undefined;
  kelompok: Kelompok | undefined;
}

interface InviteButtonParams extends CustomCellRendererProps<DataMahasiswa> {
  onInvite: (mahasiswa: DataMahasiswa) => void;
}

function InviteButton({ data, onInvite }: InviteButtonParams) {
  if (!data) {
    return null;
  }

  const alreadyInvited = data.undangan?.length > 0;

  return (
    <div className="flex h-full items-center">
      {alreadyInvited ? (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12l4 4L19 6"
            />
          </svg>
          Sudah Diundang
        </span>
      ) : (
        <Button size="sm" onClick={() => onInvite(data)}>
          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14M5 12h14"
              />
            </svg>
            Undang
          </span>
        </Button>
      )}
    </div>
  );
}

export default function ModalInviteMahasiswa({
  isOpen,
  setIsOpen,
  mahasiswa,
  kelompok,
}: ModalInviteMahasiswaProps) {
  const [quickFilter, setQuickFilter] = useState("");

  const mahasiswaData = mahasiswa ?? [];

  const invitedCount = mahasiswaData.filter(
    (item) => item.undangan?.length > 0
  ).length;

  const availableCount = mahasiswaData.length - invitedCount;

  const handleClose = () => {
    setIsOpen(false);
    setQuickFilter("");
  };

  const handleInviteStudent = async (mahasiswa: DataMahasiswa) => {
    if (!kelompok) {
      Swal.fire({
        icon: "error",
        title: "Kelompok tidak ditemukan",
        text: "Data kelompok tidak tersedia.",
      });

      return;
    }

    const result = await Swal.fire({
      title: "Undang mahasiswa?",
      html: `
        <div class="text-sm text-slate-500">
          Anda akan mengundang
          <strong class="text-slate-700">
            ${mahasiswa.nama}
          </strong>
          untuk bergabung ke kelompok
          <strong class="text-slate-700">
            ${kelompok.nama}
          </strong>.
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Undang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await inviteJoinGroup(mahasiswa.nim, kelompok.id);

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `${mahasiswa.nama} berhasil diundang ke kelompok.`,
        confirmButtonText: "OK",
        confirmButtonColor: "#2563eb",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal mengundang",
        text: "Terjadi kesalahan saat mengundang mahasiswa.",
        confirmButtonText: "OK",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const defaultColDef: ColDef<DataMahasiswa> = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressHeaderMenuButton: true,
    }),
    []
  );

  const columnDefs: ColDef<DataMahasiswa>[] = useMemo(
    () => [
      {
        headerName: "Mahasiswa",
        field: "nama",
        flex: 1.4,
        minWidth: 220,
        cellRenderer: (params: CustomCellRendererProps<DataMahasiswa>) => {
          if (!params.data) {
            return null;
          }

          return (
            <div className="flex h-full items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                {params.data.nama?.charAt(0)?.toUpperCase()}
              </div>

              <div className="min-w-0">
                <div className="truncate font-medium text-slate-800">
                  {params.data.nama}
                </div>

                <div className="text-xs text-slate-400">{params.data.nim}</div>
              </div>
            </div>
          );
        },
      },

      {
        field: "email",
        headerName: "Email",
        flex: 1.2,
        minWidth: 220,
      },

      {
        field: "jenis_kelamin",
        headerName: "Jenis Kelamin",
        width: 150,
        minWidth: 140,
      },

      {
        field: "prodi.nama",
        headerName: "Program Studi",
        flex: 1.2,
        minWidth: 200,
      },

      {
        headerName: "Status",
        width: 160,
        minWidth: 150,
        sortable: false,
        filter: false,

        cellRenderer: (params: CustomCellRendererProps<DataMahasiswa>) => {
          if (!params.data) {
            return null;
          }

          const invited = params.data.undangan?.length > 0;

          return (
            <div className="flex h-full items-center">
              {invited ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Sudah Diundang
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Belum Diundang
                </span>
              )}
            </div>
          );
        },
      },

      {
        headerName: "Aksi",
        width: 130,
        minWidth: 120,
        sortable: false,
        filter: false,

        cellRenderer: InviteButton,

        cellRendererParams: {
          onInvite: handleInviteStudent,
        },
      },
    ],
    [kelompok]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-blue-600" />

          <div className="flex items-start justify-between gap-4 px-6 py-5">
            <div className="flex min-w-0 items-center gap-4">
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                  />
                  <circle cx="9" cy="7" r="4" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 8v6M22 11h-6"
                  />
                </svg>
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-slate-900">
                  Undang Mahasiswa
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  Pilih mahasiswa yang ingin bergabung ke kelompok.
                </p>

                {kelompok && (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-700">
                      Kelompok:
                    </span>

                    <span className="rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700">
                      {kelompok.nama}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-lg
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
                focus:outline-none
                focus:ring-4
                focus:ring-slate-100
              "
              aria-label="Tutup modal"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= STATISTICS ================= */}
        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Total */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Total Mahasiswa
                  </p>

                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {mahasiswaData.length}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                    />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Belum diundang */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Belum Diundang
                  </p>

                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {availableCount}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17h.01"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.3 3.5L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 3.5a2 2 0 00-3.4 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sudah diundang */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Sudah Diundang
                  </p>

                  <p className="mt-1 text-xl font-semibold text-slate-800">
                    {invitedCount}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12l4 4L19 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TOOLBAR ================= */}
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Daftar Mahasiswa
            </h3>

            <p className="mt-0.5 text-xs text-slate-400">
              Cari berdasarkan nama, NIM, email, atau program studi.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />

              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              type="text"
              value={quickFilter}
              onChange={(event) => setQuickFilter(event.target.value)}
              placeholder="Cari mahasiswa..."
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-9 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            {quickFilter && (
              <button
                type="button"
                onClick={() => setQuickFilter("")}
                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ================= GRID ================= */}
        <div className="min-h-0 flex-1 px-6 py-4">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <AgGridProvider modules={modules}>
              <div className="w-full" style={{ height: "430px" }}>
                <AgGridReact<DataMahasiswa>
                  rowData={mahasiswaData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  quickFilterText={quickFilter}
                  pagination={true}
                  paginationPageSize={10}
                  paginationPageSizeSelector={[10, 20, 50]}
                  animateRows={true}
                  rowHeight={56}
                  headerHeight={44}
                  suppressCellFocus={true}
                  overlayNoRowsTemplate="
                    <div class='flex flex-col items-center justify-center py-10'>
                      <div class='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100'>
                        <svg class='h-6 w-6 text-slate-400' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8'>
                          <circle cx='11' cy='11' r='8'/>
                          <path d='m21 21-4.3-4.3'/>
                        </svg>
                      </div>
                      <p class='text-sm font-medium text-slate-600'>
                        Tidak ada mahasiswa
                      </p>
                      <p class='mt-1 text-xs text-slate-400'>
                        Data mahasiswa tidak ditemukan.
                      </p>
                    </div>
                  "
                />
              </div>
            </AgGridProvider>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span>{invitedCount} mahasiswa sudah memiliki undangan</span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
              hover:text-slate-800
              focus:outline-none
              focus:ring-4
              focus:ring-slate-100
            "
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
