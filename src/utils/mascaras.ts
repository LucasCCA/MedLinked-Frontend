export function onlyNumbers(number: string) {
  return number.replace(/\D/g, "");
}

export function cpfMask(cpf: string) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function phoneNumberMask(phoneNumber: string) {
  return phoneNumber
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1 - $2")
    .replace(/(\d{4})/, "$1");
}

export function crmMask(crm: string) {
  return crm.replace(/\D/g, "").replace(/(\d{6})\d+?$/, "$1");
}

export function cepMask(cep: string) {
  return cep.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1 - $2");
}
