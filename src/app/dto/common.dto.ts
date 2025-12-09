/* eslint-disable no-useless-escape */
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const DtoRegex = {
  ipv4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  pan: /^[A-Z]{5}\d{4}[A-Z]{1}$/,
  tin: /^[A-Z]{4}\d{5}[A-Z]{1}$/,
  cin: /^[A-Z]{1}\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/,
  legalName: /^[a-zA-Z0-9 ]{4,75}$/,
  personName: /^[a-zA-Z ]{3,40}$/,
  website: /^[a-z.-]{4,60}[.][a-z]{2,}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^(NA|[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{0,16})$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^?_])[A-Za-z\d!@#$%^?_]{8,32}$/,
  rate: /^\d+$/,
  decimalPattern: /^(?!$)\d{0,10}(?:\.\d{1,2})?$/,
  negativeDecimalPattern: /^-?\d{0,10}(?:\.\d{1,2})?$/,
  currencyRate: /^\d{0,15}(?:\.\d*)?$/,
  tinNumber: /^(?:C|PT)[a-zA-Z0-9]{6,11}$/,
  taxNumber: /^(?:NA|[a-zA-Z0-9]{3}-\d{4}-\d{8})$/,
  malaysiaPhone: /^(NA|[1-9]{1}[0-9]{6,19})$/,
  documentNo: /^([a-zA-Z1-9]{1}[a-zA-Z0-9/-]{0,50})$/,
  space: /\s/,
  digitsPattern: /^\d+$/,
  postalCodePattern: /^(?! )[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$|^NA$/,
  otp: /^[0-9]{1,6}$/,
  counterPartyTin: /^(F|TN|CS|PT|D|TR|TC|TA|EI|C)[a-zA-Z0-9]{6,11}$/,
};

export const required = Validators.required;
export const ipv4 = Validators.pattern(DtoRegex.ipv4);
export const pan = Validators.pattern(DtoRegex.pan);
export const tin = Validators.pattern(DtoRegex.tin);
export const cin = Validators.pattern(DtoRegex.cin);
export const legalName = Validators.pattern(DtoRegex.legalName);
export const personName = Validators.pattern(DtoRegex.personName);
export const website = Validators.pattern(DtoRegex.website);
export const email = Validators.pattern(DtoRegex.email);
export const phone = Validators.pattern(DtoRegex.phone);
export const malaysiaPhone = Validators.pattern(DtoRegex.malaysiaPhone);
export const password = Validators.pattern(DtoRegex.password);
export const tinNumber = Validators.pattern(DtoRegex.tinNumber);
export const taxNumber = Validators.pattern(DtoRegex.taxNumber);
export const rate = [Validators.required, Validators.pattern(DtoRegex.rate)];
export const decimalPattern = Validators.pattern(DtoRegex.decimalPattern);
export const negativeDecimalPattern = Validators.pattern(DtoRegex.negativeDecimalPattern);
export const currencyRate = Validators.pattern(DtoRegex.currencyRate);
export const documentNo = Validators.pattern(DtoRegex.documentNo);
export const digitsPattern = [Validators.pattern(DtoRegex.digitsPattern)];
export const postalCodePattern = Validators.pattern(DtoRegex.postalCodePattern);
export const otp = Validators.pattern(DtoRegex.otp);
export const counterPartyTin = Validators.pattern(DtoRegex.counterPartyTin);

export const regexDto = (regex: RegExp) => [Validators.pattern(regex)];

export const lengthDto = (min: number, max: number) => [
  Validators.minLength(min),
  Validators.maxLength(max),
];

export const alphaNumeric = (min: number, max: number) => [
  Validators.minLength(min),
  Validators.maxLength(max),
  Validators.pattern(/^[a-zA-Z0-9 ]*$/),
];

export const digits = (min: number, max: number) => [
  Validators.minLength(min),
  Validators.maxLength(max),
  Validators.pattern(/^\d+$/),
];

export const numeric = (min: number, max: number) => [
  Validators.min(min),
  Validators.max(max),
  Validators.pattern(/^\d+$/),
];

export const multiTaxNumber = (control: AbstractControl) => {
  if (!control.value) return null;

  const value = control.value.trim();
  if (value === '') return null;

  const values = value.split(',');
  const allOk = values.filter((e: string) => !DtoRegex.taxNumber.test(e.trim()));

  if (allOk.length > 0) return { multiTaxNumber: true };
  return null;
};

export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const value = control.value;
    const firstCharIsSpace = value.length > 0 && value[0] === ' ';
    return firstCharIsSpace ? { noLeadingSpace: true } : null;
  };
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const newPassword = control.get('newPassword');
    const confirmNewPassword = control.get('confirmNewPassword');
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmNewPassword) {
      if (newPassword.value === confirmNewPassword.value) {
        return null;
      } else {
        return { passwordMismatch: true };
      }
    }

    if (password && confirmPassword) {
      if (password.value === confirmPassword.value) {
        return null;
      } else {
        return { passwordMismatch: true };
      }
    }

    return null;
  };
}

export function allowNAAndLengthValidator(
  length: number,
): (control: AbstractControl) => Record<string, boolean> | null {
  return (control: AbstractControl): Record<string, boolean> | null => {
    if (control.value === '') return null;

    if (control.value === 'NA') {
      return null;
    }

    if (control?.value?.length !== length) {
      return { invalidLength: true };
    }

    return null;
  };
}

export function commaSeparatedMaxLengthValidator(
  length: number,
  isExactLength: boolean,
): (control: AbstractControl) => Record<string, boolean> | null {
  return (control: AbstractControl): Record<string, boolean> | null => {
    if (control.value) {
      if (control.value === 'NA') {
        return null; // Valid input
      }
      const regex = /^[a-zA-Z0-9,\s]*$/;
      const values = control.value.split(',');
      const invalidValues = values.filter((value: string) => {
        const trimmedValue = value.trim();
        if (trimmedValue === '') {
          return null;
        }

        return (
          !regex.test(trimmedValue) ||
          (isExactLength ? trimmedValue.length !== length : trimmedValue.length > length)
        );
      });

      if (invalidValues.length > 0) {
        return { commaSeparatedMaxLength: true };
      }
    }

    return null;
  };
}

export function commaSeparatedEmailMaxLengthValidator(
  length: number,
): (control: AbstractControl) => Record<string, boolean> | null {
  return (control: AbstractControl): Record<string, boolean> | null => {
    if (control.value) {
      const emails = control.value.split(',').map((email: string) => email.trim());
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const invalidEmails = emails.filter(
        (email: string) => email.length > length || !emailPattern.test(email),
      );

      if (invalidEmails.length > 0) {
        return { commaSeparatedEmailMaxLength: true };
      }
    }

    return null;
  };
}
