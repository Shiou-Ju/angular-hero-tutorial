export interface Mission {
  /** 任務序號 */
  id: number;
  /** 例如：伏地挺身、練習英文 */
  name: string;
  /** 單位，例如「組」 */
  unit: string;
  /** 數量 */
  number: number;
  /** 是否為每日定量 */
  isFixed: boolean;
  /** 每日增量額度 */
  increment?: number;
}

export interface User {
  id: number;
  name: string;
  // TODO: encrypt password if possible
  password: string;
}
