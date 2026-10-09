//komponen lama

import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { Portal as DataPortal } from "@/modules/models/portal";
import { getPortal } from "@/modules/portal/services/portal.service";
import { Link } from "react-router";
import Spinner from "@/components/ui/spinner/Spinner";
import CardPortal from "@/modules/portal/components/CardPortal";
import ComponentPermission from "@/context/ComponentPermission";
import { getPortalStatus } from "@/modules/utils/portal-status";

export default function Portal() {
  // const [portal, setPortal] = useState<DataPortal[]>();
  const [portal, setPortal] = useState<DataPortal | null>();
  const [isAlreadyRegistered, setIsAlreadyRegistered] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getDataPortal = async () => {
      const response = await getPortal();
      if (response.ok) {
        const responseBody = await response.json();
        console.log(responseBody);
        setPortal(responseBody.data.portal);
        setIsAlreadyRegistered(responseBody.data.registrasi != null);
        // setPortal(responseBody.data);
        setLoading(false);
      }
    };
    getDataPortal();
  }, []);

  return (
    <>
      <ComponentCard title="Data Portal">
        <ComponentPermission allowedRoles={["admin"]}>
          <Link to={"/portal/create"}>
            <Button variant="primary" size="sm" className="m-3">
              Tambah Portal
            </Button>
          </Link>
        </ComponentPermission>

        {loading ? (
          <>
            <Spinner textColor="text-white" />
          </>
        ) : portal == null ? (
          <>Tidak ada portal</>
        ) : (
          <>
            <CardPortal
              alreadyRegistered={true}
              portal={portal}
              status="aktif"
            />
          </>
        )}

        {/* {loading ? (
          <Spinner textColor="text-white" />
        ) : (
          <>
            <CardPortal alreadyRegistered={true} portal={portal} />
          </>
          // portal?.map((item, index) => {
          //   return (
          //     <CardPortal
          //       key={index}
          //       portal={item}
          //       status={getPortalStatus(item.waktu_mulai, item.waktu_selesai)}
          //     />
          //   );
          // })
        )} */}
      </ComponentCard>
    </>
  );
}
