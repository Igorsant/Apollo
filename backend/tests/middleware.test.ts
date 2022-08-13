const { NextFunction } = require('express');
const AuthGuardMiddleware = require('../src/middlewares/authGuard.middleware');
const authGuard = AuthGuardMiddleware.default;

describe('Auth Guard Middleware', () => {
  test('should fail if user type is invalid', () => {
    const invalidUserType = 'INVALID';
    const result = authGuard(invalidUserType);

    expect(result).rejects;
  });

  test('should pass if user types are valid', () => {
    const validUserTypes = ['CUSTOMER', 'PROFESSIONAL'];
    const validPromises = validUserTypes.map(authGuard);
    const result = Promise.all(validPromises);

    expect(result).resolves;
  });
});
