const toInches = (value: number) => Number(value * 0.3937).toFixed(1);

export const cmToInches = (value: string) => {
  if (!value) return '';

  const [, width, height] = value.match(/(\d+)\s*x\s*(\d+)\s*cm?/);

  return `${toInches(Number(width))} x ${toInches(Number(height))} in`;
};
