export type SlotColumnConfig = {
  start: number; // % เริ่มต้น
  reverse: boolean; // วิ่งขึ้น / ลง
  speed: number; // ความเร็ว
};

export function createSlotColumns(count: number): SlotColumnConfig[] {
  return Array.from({ length: count }).map(() => ({
    start: Math.random() * 50,
    reverse: Math.random() > 0.5,
    speed: 18 + Math.random() * 6,
  }));
}
