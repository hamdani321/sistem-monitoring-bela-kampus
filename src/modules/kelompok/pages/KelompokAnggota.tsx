import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Badge from "@/components/ui/badge/Badge";

import { AgGridProvider, AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";

import { Kelompok } from "@/modules/models/kelompok";
import { Undangan } from "@/modules/models/undangan";
import { Mahasiswa } from "@/modules/models/mahasiswa";

import { getKelompokById } from "../services/kelompok.service";
import ModalInviteMahasiswa from "../components/ModalInviteMahasiswa";
import ComponentPermission from "@/context/ComponentPermission";

const modules = [AllCommunityModule];

export function KelompokAnggota() {
  const { id } = useParams();

  const [kelompok, setKelompok] = useState<Kelompok | null>(null);
  const [undangan, setUndangan] = useState<Undangan[]>([]);
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [anggotaFilter, setAnggotaFilter] = useState("");
  const [undanganFilter, setUndanganFilter] = useState("");

  /**
   * Load data kelompok
   */
  const loadKelompok = useCallback(async () => {
    if (!id) {
      setError("ID kelompok tidak ditemukan.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await getKelompokById(id);

      setKelompok(response.data.kelompok ?? null);
      setUndangan(response.data.undangan ?? []);
      setMahasiswa(response.data.mahasiswa ?? []);
    } catch (error) {
      console.error("Gagal mengambil data kelompok:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data kelompok."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadKelompok();
  }, [loadKelompok]);

  /**
   * Column anggota kelompok
   */
  const anggotaColDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "No",
        width: 70,
        pinned: "left",
        sortable: false,
        filter: false,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      },

      {
        headerName: "Kelompok",
        minWidth: 180,
        flex: 1,
        cellRenderer: () => (
          <div className="py-2">
            <div className="font-medium text-gray-800 dark:text-white/90">
              {kelompok?.nama ?? "-"}
            </div>
          </div>
        ),
      },

      {
        headerName: "Anggota",
        minWidth: 240,
        flex: 1.5,
        autoHeight: true,
        wrapText: true,
        cellRenderer: (params: ICellRendererParams) => {
          const mahasiswa = params.data?.mahasiswa;

          return (
            <div className="py-2 leading-5">
              <div className="font-medium text-gray-800 dark:text-white/90">
                {mahasiswa?.nama ?? "-"}
              </div>

              <div className="text-xs text-gray-500">
                NIM: {mahasiswa?.nim ?? "-"}
              </div>

              <div className="text-xs text-gray-500">
                {mahasiswa?.prodi?.nama ?? ""}
              </div>
            </div>
          );
        },
      },
    ],
    [kelompok]
  );

  /**
   * Column request join
   */
  const undanganColDefs = useMemo<ColDef<Undangan>[]>(() => [
    {
      headerName: "No",
      width: 70,
      pinned: "left",
      sortable: false,
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
    },

    {
      headerName: "Mahasiswa",
      minWidth: 220,
      flex: 1.2,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: ICellRendererParams<Undangan>) => {
        const mahasiswa = params.data?.mahasiswa;

        return (
          <div className="py-2 leading-5">
            <div className="font-medium text-gray-800 dark:text-white/90">
              {mahasiswa?.nama ?? "-"}
            </div>

            <div className="text-xs text-gray-500">
              NIM: {mahasiswa?.nim ?? "-"}
            </div>
          </div>
        );
      },
    },

    {
      headerName: "Email",
      minWidth: 220,
      flex: 1,
      valueGetter: (params) => params.data?.mahasiswa?.email ?? "-",
    },

    {
      headerName: "Status",
      width: 140,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      cellRenderer: (params: ICellRendererParams<Undangan>) => {
        const status = params.data?.status;

        let color: "info" | "success" | "warning" | "error" | "primary" =
          "info";

        if (status === "Accept") {
          color = "success";
        } else if (status === "Request") {
          color = "error";
        } else if (status === "Request") {
          color = "warning";
        }

        return (
          <Badge variant="solid" color={color}>
            {status ?? "-"}
          </Badge>
        );
      },
    },

    {
      headerName: "Aksi",
      width: 130,
      pinned: "right",
      sortable: false,
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<Undangan>) => {
        return (
          <Button
            variant="primary"
            size="sm"
            className="bg-error-500 hover:bg-error-600"
            onClick={() => {
              console.log("Hapus undangan:", params.data);
            }}
          >
            Hapus
          </Button>
        );
      },
    },
  ]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const anggota = kelompok?.kelompok_anggota ?? [];

  return (
    <>
      {/* ============================= */}
      {/* DATA ANGGOTA */}
      {/* ============================= */}

      <ComponentCard title="Data Anggota Kelompok">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
              {kelompok?.nama ?? "Kelompok"}
            </h3>

            <p className="text-sm text-gray-500">
              Daftar mahasiswa yang tergabung dalam kelompok.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="w-full sm:w-64">
              <Input
                value={anggotaFilter}
                onChange={(e) => setAnggotaFilter(e.target.value)}
                placeholder="Cari anggota..."
              />
            </div>

            <ComponentPermission allowedRoles={["mahasiswa"]}>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setIsOpen(true)}
              >
                + Undang Anggota
              </Button>
            </ComponentPermission>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-600">
            <span>{error}</span>

            <Button size="sm" variant="primary" onClick={loadKelompok}>
              Coba Lagi
            </Button>
          </div>
        )}

        {/* Grid */}
        <AgGridProvider modules={modules}>
          <div className="h-[450px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <AgGridReact
              rowData={anggota}
              columnDefs={anggotaColDefs}
              defaultColDef={defaultColDef}
              loading={loading}
              pagination
              paginationAutoPageSize
              quickFilterText={anggotaFilter}
              animateRows
              suppressCellFocus
            />
          </div>
        </AgGridProvider>

        {/* Modal */}
        <ModalInviteMahasiswa
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          mahasiswa={mahasiswa}
          kelompok={kelompok ?? undefined}
        />
      </ComponentCard>

      {/* ============================= */}
      {/* REQUEST JOIN */}
      {/* ============================= */}

      <div className="mt-6">
        <ComponentCard title="Data Request Join">
          {/* Header */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
                Request Bergabung
              </h3>

              <p className="text-sm text-gray-500">
                Daftar mahasiswa yang meminta untuk bergabung ke kelompok.
              </p>
            </div>

            <div className="w-full sm:w-72">
              <Input
                value={undanganFilter}
                onChange={(e) => setUndanganFilter(e.target.value)}
                placeholder="Cari request..."
              />
            </div>
          </div>

          {/* Grid */}
          <AgGridProvider modules={modules}>
            <div className="h-[500px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
              <AgGridReact<Undangan>
                rowData={undangan}
                columnDefs={undanganColDefs}
                defaultColDef={defaultColDef}
                loading={loading}
                pagination
                paginationAutoPageSize
                quickFilterText={undanganFilter}
                animateRows
                suppressCellFocus
              />
            </div>
          </AgGridProvider>
        </ComponentCard>
      </div>
    </>
  );
}

// import ComponentCard from "@/components/common/ComponentCard";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Kelompok } from "@/modules/models/kelompok";
// import { useEffect, useState } from "react";
// import { getKelompokById } from "../services/kelompok.service";
// import { useParams } from "react-router";
// import Button from "@/components/ui/button/Button";
// import BasicMessage from "@/components/ui/messages/BasicMessage";
// import Spinner from "@/components/ui/spinner/Spinner";
// import { Undangan } from "@/modules/models/undangan";
// import ModalInviteMahasiswa from "../components/ModalInviteMahasiswa";
// import { Mahasiswa } from "@/modules/models/mahasiswa";
// import Badge from "@/components/ui/badge/Badge";

// export function KelompokAnggota() {
//   const [kelompok, setKelompok] = useState<Kelompok>();
//   const [undangan, setUndangan] = useState<Undangan[]>();
//   const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>();
//   const [loading, setLoading] = useState(true);
//   const params = useParams();

//   //modal state
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const getKelompok = async () => {
//       try {
//         const response = await getKelompokById(params.id);
//         setUndangan(response.data.undangan);
//         setKelompok(response.data.kelompok);
//         setMahasiswa(response.data.mahasiswa);
//       } catch (error) {
//       } finally {
//         setLoading(false);
//       }
//     };

//     getKelompok();
//   }, [params.id]);

//   return (
//     <>
//       <ComponentCard title="Data Anggota Kelompok">
//         <>
//           {/* Button */}
//           <Button
//             className="m-3"
//             size="sm"
//             variant="primary"
//             onClick={() => {
//               setIsOpen(true);
//             }}
//           >
//             Undang Anggota
//           </Button>

//           {/* Modal Invite */}

//           <ModalInviteMahasiswa
//             isOpen={isOpen}
//             setIsOpen={setIsOpen}
//             mahasiswa={mahasiswa}
//             kelompok={kelompok}
//           />
//         </>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-black text-start text-theme-xs dark:text-white"
//               >
//                 No
//               </TableCell>

//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-black text-start text-theme-xs dark:text-white"
//               >
//                 Nama
//               </TableCell>

//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-black text-start text-theme-xs dark:text-white"
//               >
//                 Anggota
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//             {loading ? (
//               <>
//                 <tr key={0}>
//                   <td colSpan={3} className="text-center px-4 py-3">
//                     <Spinner textColor="text-black" />
//                   </td>
//                 </tr>
//               </>
//             ) : kelompok!.kelompok_anggota!.length <= 0 ? (
//               <>
//                 <tr key={0}>
//                   <td colSpan={3} className="text-center">
//                     <BasicMessage
//                       message="Data tidak ditemukan!"
//                       title="Belum ada ada!"
//                     />
//                   </td>
//                 </tr>
//               </>
//             ) : (
//               <>
//                 {kelompok?.kelompok_anggota.map((item, index) => {
//                   return (
//                     <TableRow key={item.id}>
//                       <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                         {index + 1}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                         {kelompok.nama}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
//                         Nama : {item.mahasiswa?.nama}
//                         <br />
//                         NIM : {item.mahasiswa?.nim}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </>
//             )}
//           </TableBody>
//         </Table>
//       </ComponentCard>

//       <ComponentCard title="Data Request Join">
//         <Table>
//           <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 No
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Nama
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 NIM
//               </TableCell>

//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Email
//               </TableCell>

//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Status
//               </TableCell>

//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Aksi
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//             {loading ? (
//               <>
//                 <tr key={0}>
//                   <td colSpan={6} className="text-center px-4 py-3">
//                     <Spinner textColor="text-black" />
//                   </td>
//                 </tr>
//               </>
//             ) : undangan?.length <= 0 ? (
//               <>
//                 <tr key={0}>
//                   <td colSpan={5} className="text-center">
//                     <BasicMessage
//                       message="Data tidak ditemukan!"
//                       title="Belum ada ada!"
//                     />
//                   </td>
//                 </tr>
//               </>
//             ) : (
//               <>
//                 {undangan?.map((item, index) => (
//                   <TableRow key={item.id}>
//                     <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                       {index + 1}
//                     </TableCell>
//                     <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                       {item.mahasiswa?.nama}
//                     </TableCell>

//                     <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
//                       Nama : {item.mahasiswa?.nama}
//                       <br />
//                       NIM : {item.mahasiswa?.nim}
//                     </TableCell>
//                     <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                       {item.nim_mahasiswa}
//                     </TableCell>
//                     <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                       {/* {item.status} */}
//                       <Badge
//                         variant="solid"
//                         color={item.status == "Request" ? "info" : "success"}
//                       >
//                         {item.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
//                       <Button
//                         variant="primary"
//                         className="me-2 bg-red-600 hover:bg-red-400"
//                         size="sm"
//                       >
//                         Hapus
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </>
//             )}
//           </TableBody>
//         </Table>
//       </ComponentCard>
//     </>
//   );
// }
