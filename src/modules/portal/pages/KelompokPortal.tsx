import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import BasicMessage from "@/components/ui/messages/BasicMessage";
import Spinner from "@/components/ui/spinner/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getKelompokById } from "@/modules/kelompok/services/kelompok.service";
import { Kelompok } from "@/modules/models/kelompok";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function KelompokPortal() {
  const [kelompok, setKelompok] = useState<Kelompok>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const getKelompokPortal = async () => {
      const dataKelompok = await getKelompokById(params.kelompokId);
      setKelompok(dataKelompok);
      setLoading(false);
    };

    getKelompokPortal();
  }, []);
  return (
    <>
      <ComponentCard title="Data Kelompok Portal">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                <strong>Nama Kelompok</strong>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {kelompok?.nama}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                <strong>Nama Ketua</strong>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {kelompok?.mahasiswa.nama}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                <strong>Jumlah Anggota</strong>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {kelompok?.kelompok_anggota.length}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                <Button variant="primary" size="sm">
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentCard>

      <ComponentCard
        key={"Card 2"}
        title="Data Anggota Kelompok"
        className="mt-3"
      >
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nomor
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                NIM
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              <>
                <tr key={0}>
                  <td colSpan={6} className="text-center px-4 py-3">
                    <Spinner textColor="text-white" />
                  </td>
                </tr>
              </>
            ) : kelompok?.kelompok_anggota?.length <= 0 ? (
              <>
                <tr key={0}>
                  <td colSpan={5} className="text-center">
                    <BasicMessage
                      title="Belum ada data!"
                      message="Data tidak ditemukan!"
                    />
                  </td>
                </tr>
              </>
            ) : (
              kelompok?.kelompok_anggota?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.mahasiswa?.nama}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {item.nim_mahasiswa}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {item.nim_mahasiswa}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Button size="sm" variant="primary">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}

            {/* {} */}
          </TableBody>
        </Table>
      </ComponentCard>
    </>
  );
}
