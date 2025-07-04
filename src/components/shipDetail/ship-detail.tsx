import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { details } from "@/data/details";
import {
  getShipFullImage,
  flattenShipData,
  replaceAndSanitizeEffect,
  replaceAndSanitizeSpecial,
  flattenShipModificationData,
} from "@/lib/utils";
import { shipDetailColumns } from "./columns";
import { ShipDetailTable } from "./ship-detail-table";
import {
  ShipModificationTable,
  shipModificationDetailColumns,
} from "./modification";

/**
 * ⭐️ 핵심! Astro에서 base를 전달받는 props 타입 정의
 */
type ShipDetailProps = {
  base: string;
};

export function ShipDetail({ base }: ShipDetailProps) {
  const navigate = useNavigate();
  const { shipId } = useParams();
  console.log("✅ base props 확인:", base);
  if (!shipId) {
    return null;
  }

  const ship = useMemo(() => {
    const tempShip = details[parseInt(shipId)];
    return {
      id: shipId,
      name: tempShip.name,
      obtain: tempShip.obtain,
      note: tempShip.note,
      specialEffect1: tempShip.specialEffect1,
      specialEffect2: tempShip.specialEffect2,
    };
  }, [shipId]);

  const data = useMemo(() => {
    return flattenShipData(details[parseInt(shipId)]);
  }, [shipId]);



const BASE = import.meta.env.DEV ? "/optc-ships/" : "/";

  const modificationData = useMemo(() => {
    if (details[parseInt(shipId)].modification) {
      return flattenShipModificationData(
        details[parseInt(shipId)].modification!,
      );
    }
    return undefined;
  }, [shipId]);

  return (
    <Dialog open onOpenChange={() => navigate("/")}>
      <DialogContent
        className="h-5/6 overflow-y-auto w-11/12 max-w-6xl pt-0 max-md:px-2 border-none"
        showDialogClose={false}
      >
        <DialogHeader className="sticky top-0 z-40 py-6 max-md:py-4 text-left bg-white dark:bg-black">
          <DialogTitle>{ship.name}</DialogTitle>
        </DialogHeader>

        <div className="py-3 flex justify-center">
          <img
            className="lazyload min-h-20 md:min-h-64"
            loading="lazy"
            data-src={`${BASE}${getShipFullImage(shipId)}`}
            alt={ship.name}
          />
        </div>

  

        {!!ship.obtain && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>How to obtain:</b> {ship.obtain}
          </blockquote>
        )}
        {!!ship.note && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>Note:</b> {ship.note}
          </blockquote>
        )}
        {!!ship.specialEffect1 && (
          <p className="font-light text-center text-sm text italic p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800">
            <b>Criteria for special effect:</b> Ship at lvl. 12 can be modified
            to add further stat modifiers. Special effect 1 is obtained at
            modification rank 4 or above for all HP/ATK/RCV. Special effect 2 is
            obtained at modification rank 5 for all HP/ATK/RCV.
          </p>
        )}
        {!!ship.specialEffect1 && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>Special Effect 1:</b>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: replaceAndSanitizeEffect(ship.specialEffect1),
              }}
            ></span>
          </blockquote>
        )}
        {!!ship.specialEffect2 && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>Special Effect 2:</b>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: replaceAndSanitizeSpecial(
                  replaceAndSanitizeEffect(ship.specialEffect2),
                ),
              }}
            ></span>
          </blockquote>
        )}
        <div className="max-md:h-max max-md:max-w-2xl max-md:overflow-x-auto">
          <ShipDetailTable data={data} columns={shipDetailColumns} />

          {modificationData && (
            <ShipModificationTable
              data={modificationData}
              columns={shipModificationDetailColumns}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}