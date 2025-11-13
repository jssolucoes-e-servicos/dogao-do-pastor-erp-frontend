export function isValidPhoneNumber(phone: string): boolean {
  // Remove caracteres não numéricos e o DDD
  const cleanPhone = phone.replace(/[^\d]+/g, '');

  // Valida o formato geral (DDD + número)
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return false;
  }

  // Validação conforme a sua regra (8 ou 9 dígitos)
  const numberWithoutDdd = cleanPhone.slice(2);
  const firstDigit = numberWithoutDdd.charAt(0);

  if (['2', '3', '4'].includes(firstDigit) && numberWithoutDdd.length !== 8) {
    return false;
  }

  if (['0', '1', '5', '6', '7', '8', '9'].includes(firstDigit) && numberWithoutDdd.length !== 9) {
    return false;
  }

  return true;
}