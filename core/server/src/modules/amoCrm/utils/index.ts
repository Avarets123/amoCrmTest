export const makeMapFromArray = <T extends { id: number }>(data: T[]) => {
  const res: [number, T][] = data.map((el) => [el.id, el]);

  return new Map<number, T>(res);
};
