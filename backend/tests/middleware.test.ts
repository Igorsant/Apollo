const { NextFunction } = require('express');
const AuthGuardMiddleware = require('../src/middlewares/authGuard.middleware');
const authGuard = AuthGuardMiddleware.default;

function createMockRequest() {
  const request = {
    headers: {}
  } as Express.Request;

  const response = {
    status: (statusCode: string) => {
      this.status = statusCode;
      return response;
    },
    json: (_message: string) => {}
  } as Express.Response;

  const next = [] as typeof NextFunction;

  return [request, response, next];
}

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

  test('should fail if unauthorized customer request', async () => {
    const authMethod = await authGuard('CUSTOMER');
    const unauthorizedRequest = authMethod(...createMockRequest());

    expect(unauthorizedRequest).rejects;
  });
});
