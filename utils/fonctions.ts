export const changeName = (name: string | undefined | null) => {
  if (!name) return "NN";

  let slicedName = name.split(" ")[0];
  slicedName = slicedName.slice(0, 2);
  return slicedName.toUpperCase();
};

export const changeTypeSalary = (type: string | undefined | null) => {
  if (!type) return "mensuel";

  switch (type) {
    case "monthly":
      return "mensuel";
    case "weekly":
      return "hebdomadaire";
    case "daily":
      return "journalier";
    case "by work":
      return "par travail";
    case "per hour":
      return "par heure";

    default:
      return "mensuel";
  }
};

export const changeMomentSalary = (type: string | undefined | null) => {
  if (!type) return "apres travail";

  switch (type) {
    case "before":
      return "avant travail";
    case "after":
      return "apres travail";
    default:
      return "a tout moment";
  }
};

export const changeOptionPaiment = (type: string | undefined | null) => {
  if (!type) return "tout type";

  switch (type) {
    case "mobile":
      return "mobile(mpesa, orange, airtel)";
    case "paypal":
      return "paypal";
    case "cash":
      return "cash";
    case "creditCard":
      return "carte de credit";
    default:
      return "tout type";
  }
};
