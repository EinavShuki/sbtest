const formatPhone = (phoneNumber) => {
  const [a, b, c, ...rest] = phoneNumber
    .split("")
    .filter((x) => Number.isInteger(parseInt(x)));

  return `(${a}${b}${c}) ${rest.join("")}`;
};

export { formatPhone };
