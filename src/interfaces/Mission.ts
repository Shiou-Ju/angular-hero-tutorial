export interface Mission {
  /** 任務序號 */
  id: number;
  /** 例如：伏地挺身、練習英文 */
  name: string;
  /** 單位，例如「組」 */
  unit: string;
  /** 數量 */
  amount: number;
  /** 是否為每日定量 */
  // TODO: fix backend first
  // isFixed: boolean;
  isfixed: boolean;
  /** 每日增量額度 */
  increment?: number;
}
