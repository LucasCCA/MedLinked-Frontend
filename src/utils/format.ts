export function formatCpf(cpf: number) {
  const stringCpf = cpf.toString();
  let formattedCpf = stringCpf;

  if (stringCpf.length < 11) {
    const difference = 11 - stringCpf.length;

    for (let i = 0; i < difference; i++) {
      formattedCpf = `0${formattedCpf}`;
    }
  }

  return formattedCpf;
}

export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length == 11) {
    return phoneNumber
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1 - $2")
      .replace(/(\d{4})/, "$1");
  }

  return phoneNumber
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1 - $2")
    .replace(/(\d{4})/, "$1");
}
