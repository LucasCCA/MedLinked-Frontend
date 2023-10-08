export function cpfMask(cpf: string) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function phoneNumberMask(number: string) {
  return number
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1 - $2")
    .replace(/(\d{4})/, "$1");
}

export function crmMask(number: string) {
  return number.replace(/\D/g, "").replace(/(\d{6})\d+?$/, "$1");
}
