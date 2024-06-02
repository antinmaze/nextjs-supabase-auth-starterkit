	import { assert, expect, test, describe } from 'vitest';
	import { isValidPassword } from "../src/utils/auth/factory";

	/**
	 * Password must contain the following:
	 * A lowercase letter
	 * A capital (uppercase) letter
	 * A number
	 * A special caracter such as .[]()\^$|?*+!@#<>
	 * Minimum 8 characters
	 */
	describe('isValidPassword', () => {
	test('should return false for invalid passwords', () => {
		expect(isValidPassword('weak')).toBe(false);
		expect(isValidPassword('short')).toBe(false);
		expect(isValidPassword('NO_SPECIAL_CHAR')).toBe(false);
		expect(isValidPassword('noUPPERCASE')).toBe(false);
		expect(isValidPassword('NOlowercase')).toBe(false);
		expect(isValidPassword('1234567')).toBe(false);
		expect(isValidPassword('1nN!')).toBe(false);
	});

	test('should return true for valid passwords', () => {
		expect(isValidPassword('Valid123$')).toBe(true);
		expect(isValidPassword('Secure456!')).toBe(true);
		expect(isValidPassword('Strong789#')).toBe(true);
	});
	});
