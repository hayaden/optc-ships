import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  ShipDetail,
  ShipInfo,
  ShipModificationEffect,
  ShipModificationEffectTable,
} from "@/types/Ship";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// public\icon\ship_0001_thumbnail.png
export function getShipThumbnail(shipId: string) {
  const id = ("000" + shipId).slice(-4);
  return `icon/ship_${id}_thumbnail.png`;
}
export function convertToPSTTimestamp() {
  const dateTime = new Date();
  dateTime.setHours(dateTime.getUTCHours() - 8);
  return dateTime.getTime();
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
 * @param dateString - format YYYY-MM-DDTHH:mm:ss.sss
 * @returns no. of milliseconds
 */
export function getPSTTimestamp(dateString: string) {
  return new Date(dateString + "-08:00").getTime();
}

// public\full\ship_0001_full.png
export function getShipFullImage(shipId: string) {
  const id = ("0000" + shipId).slice(-4);
  return `full/ship_${id}_full.png`;
}

export function replaceAndSanitizeEffect(text: string) {
  return text
    .replaceAll(
      /\[힘\]?/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black STR">힘</span>',
    )
    .replaceAll(
      /\[기\]?/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black DEX">기</span>',
    )
    .replaceAll(
      /\[속\]?/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black QCK">속</span>',
    )
        .replaceAll(
      /\[심\]?/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black PSY">심</span>',
    )
    .replaceAll(
      /\[지\]?/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black INT">지</span>',
    )
    .replaceAll(
      /\[고기\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-black RCV">고기</span>',
    )
    .replaceAll(
      /\[셈라\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-white SEMLA">셈라</span>',
    )
    .replaceAll(
      /\[와\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-white WANO">와</span>',
    )
    .replaceAll(
     /\[메인 스토리\]/g,
     '<span class="text-sm font-bold bg-purple-700 text-white rounded px-1">메인 스토리</span>'
    )
    .replaceAll(
     /\[특훈의 숲\]/g,
     '<span class="text-sm font-bold bg-green-700 text-white rounded px-1">특훈의 숲</span>'
    )
    .replaceAll(
     /\[레일리 교환소\]/g,
     '<span class="text-sm font-bold bg-orange-700 text-white rounded px-1">레일리 교환소</span>'
    )
    .replaceAll(
     /\(현재 획득 불가\)/g,
     '<span class="text-sm font-bold bg-red-700 text-white rounded px-1">현재 획득 불가</span>'
    )
    .replaceAll(
     /\[타임 모험\]/g,
     '<span class="text-sm font-bold bg-teal-700 text-white rounded px-1">타임 모험</span>'
    ) 
    .replaceAll(
     /\[트레저맵\]/g,
     '<span class="text-sm font-bold bg-indigo-700 text-white rounded px-1">트레저맵</span>'
    )
    .replaceAll(
     /\[유대결전\]/g,
     '<span class="text-sm font-bold bg-indigo-700 text-white rounded px-1">유대 결전</span>'
    )             
    .replaceAll(
      /\[무지개\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black RAINBOW">무지개</span>',
    )
    .replaceAll(
      /\[공백\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background EMPTY">공백</span>',
    )
    .replaceAll(
      /\[방해\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background BLOCK">방해</span>',
    )
    .replaceAll(
      /\[폭탄\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-white BOMB">폭탄</span>',
    )
    .replaceAll(
      /\[강화 폭탄\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background SUPERBOMB">강화 폭탄</span>',
    )
    .replaceAll(
      /\[G\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black G">G</span>',
    )
    .replaceAll(
      /\[연\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-white TND">연</span>',
    );
}

export function replaceAndSanitizeSpecial(text: string) {
  return text
    .replace(
      /\[THRESHOLD_DAMAGE_CUT\]/,
      '<img class="w-5 h-5 inline" src="/optc-ships/threshold_damagecut.png" alt="threshold damage cut" />',
    )
    .replace(
      /\[ATK_UP\]/,
      '<img class="w-5 h-5 inline" src="/optc-ships/atk_up.png" alt="attack up"  />',
    )
    .replace(
      /\[EOT_HEAL\]/,
      '<img class="w-5 h-5 inline" src="/optc-ships/eot_heal.png" alt="eot heal"  />',
    )
    .replace(
      /\[EOT_HEAL_TO_DAMAGE\]/,
      '<img class="w-5 h-5 inline" src="/optc-ships/heal_slot_to_damage.png" alt="eot heal slot to damage"  />',
    );
}
   

export function flattenShipData(shipInfo: ShipInfo) {
  const shipDetail: ShipDetail[] = [];
  for (let index = 0; index < shipInfo.effect.length; index++) {
    const tempDetail = {
      effect: shipInfo.effect[index],
      ...(shipInfo.superCola && { superColaCount: shipInfo.superCola[index] }),
      ...(shipInfo.cola && { colaCount: shipInfo.cola[index] }),
      ...(shipInfo.cd && { cd: shipInfo.cd[index] }),
      ...(shipInfo.period && { period: shipInfo.period[index] }),
      ...(shipInfo.special && { special: shipInfo.special[index] }),
    };
    shipDetail.push(tempDetail);
  }
  return shipDetail;
}

export function flattenShipModificationData(
  modificationInfo: ShipModificationEffectTable,
) {
  const modificationDetail: ShipModificationEffect[] = [];
  for (let index = 0; index < modificationInfo.phase.length; index++) {
    const tempModificationDetail = {
      phase: modificationInfo.phase[index],
      effect: modificationInfo.effect[index],
      special: modificationInfo.special[index],
      cd: modificationInfo.cd[index],
    };
    modificationDetail.push(tempModificationDetail);
  }
  return modificationDetail;
}
