export function onlyNumbers(number: string) {
  if (!number) return "";

  return number.replace(/\D/g, "");
}

export function cpfMask(cpf: string) {
  if (!cpf) return "";

  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function phoneNumberMask(phoneNumber: string) {
  if (!phoneNumber) return "";

  if (phoneNumber.length == 17) {
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

export function crmMask(crm: string) {
  if (!crm) return "";

  return crm.replace(/\D/g, "").replace(/(\d{6})\d+?$/, "$1");
}

export function cepMask(cep: string) {
  if (!cep) return "";

  return cep.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1 - $2");
}

export function dateMask(date: string) {
  if (!date) return "";

  return date
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})/, "$1");
}

export function timeMask(time: string) {
  if (!time) return "";

  return time
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1:$2")
    .replace(/(\d{2})/, "$1");
}
