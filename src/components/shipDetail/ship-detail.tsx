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
export function ShipDetail() {
  const navigate = useNavigate();
  const { shipId } = useParams();

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



//const BASE = import.meta.env.DEV ? "/optc-ships/" : "/";
  const BASE = "/optc-ships/";
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
            <b>획득 조건: </b>
            
            <span
              dangerouslySetInnerHTML={{
                __html: replaceAndSanitizeEffect(ship.obtain),
              }}
            ></span>            
                      
          </blockquote>
        )}
        {!!ship.note && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>Note:</b> {ship.note}
          </blockquote>
        )}
        {!!ship.specialEffect1 && (
          <p className="whitespace-pre-line font-light text-center text-sm text italic p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800">
            {`특별효과 발동 조건:배를 레벨 12로 만들고 배를 개조 가능,
          특별효과1 = 체력, 공격력, 회복 모두 개조 효과 랭크 4 이상,
          특별효과2 = 체력, 공격력, 회복 모두 개조 효과 랭크 5`}
          </p>
        )}
        {!!ship.specialEffect1 && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>특별효과1:</b>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: replaceAndSanitizeEffect(ship.specialEffect1),
              }}
            ></span>
          </blockquote>
        )}
        {!!ship.specialEffect2 && (
          <blockquote className="text-center p-1 mb-1 max-md:mb-0 bg-stone-200 dark:bg-stone-800 font-light">
            <b>특별효과2:</b>{" "}
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