export const changeName = (name: string | undefined | null) => {
  if (!name) return "NN";

  let slicedName = name.split(" ")[0];
  slicedName = slicedName.slice(0, 2);
  return slicedName.toUpperCase();
};
