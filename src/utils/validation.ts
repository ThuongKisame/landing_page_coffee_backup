export function validatePhoneNumber(value: string) {
  const regex = /^\d{10}$/; // biểu thức chính quy để kiểm tra số điện thoại
  return regex.test(value);
}
