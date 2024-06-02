import { assert, expect, test, describe } from 'vitest';
import { isValidEmail } from "../src/utils/auth/factory";

describe('isValidEmail', () => {
  test('should return false for invalid emails', () => {
    expect(isValidEmail('invalidemail')).toBe(false);
    expect(isValidEmail('invalidemail@')).toBe(false);
    expect(isValidEmail('invalidemail@example')).toBe(false);
    expect(isValidEmail('invalidemail@example.')).toBe(false);
    expect(isValidEmail('invalid.email@example.c')).toBe(false);
    expect(isValidEmail('invalid_email@example.c')).toBe(false);
    expect(isValidEmail('invalid email@example.com')).toBe(false);
    expect(isValidEmail('invalid@example.com.')).toBe(false);
    expect(isValidEmail('invalid@example.com.123')).toBe(false);
  });

  test('should return true for valid emails', () => {
    expect(isValidEmail('valid@example.com')).toBe(true);
    expect(isValidEmail('valid.email@example.com')).toBe(true);
    expect(isValidEmail('valid-email@example.com')).toBe(true);
    expect(isValidEmail('valid_email@example.com')).toBe(true);
    expect(isValidEmail('valid+email@example.com')).toBe(true);
    expect(isValidEmail('valid.email.with.dots@example.com')).toBe(true);
    expect(isValidEmail('valid-email-with-dashes@example.com')).toBe(true);
    expect(isValidEmail('valid_email_with_underscores@example.com')).toBe(true);
    expect(isValidEmail('valid+email+with+pluses@example.com')).toBe(true);
    expect(isValidEmail('valid@example.co.uk')).toBe(true);
    expect(isValidEmail('valid@example.org')).toBe(true);
    expect(isValidEmail('valid@example.net')).toBe(true);
  });
});
