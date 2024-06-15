/* 특정 퍼센트만큼 어두운 컬러값 반환 */
export const darkenColor = (hex: string, degree: number): string => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // 각 채널 값을 percent 만큼 줄임
  r = Math.round(r * (1 - degree / 100));
  g = Math.round(g * (1 - degree / 100));
  b = Math.round(b * (1 - degree / 100));

  // 다시 HEX로 변환
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const lightenColor = (hex: string, degree: number): string => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // 각 채널 값을 percent 만큼 증가시킴
  r = Math.round(r + (255 - r) * (degree / 100));
  g = Math.round(g + (255 - g) * (degree / 100));
  b = Math.round(b + (255 - b) * (degree / 100));

  // 다시 HEX로 변환
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
