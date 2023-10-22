export function formatCpf(cpf: number) {
  const stringCpf = cpf.toString();
  let formattedCpf = stringCpf;

  if (stringCpf.length < 11) {
    const difference = 11 - stringCpf.length;

    for (let i = 0; i < difference; i++) {
      formattedCpf = `0${stringCpf}`;
    }
  }

  return formattedCpf;
}
