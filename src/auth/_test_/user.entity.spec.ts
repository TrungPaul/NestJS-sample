import { User } from './../user.entity';
import * as bcrypt from 'bcryptjs';
describe('user entity', () => {
  let user: User;
  beforeEach(() => {
    user = new User();
    user.password = 'testPass';
    user.salt = 'testSalt';
    bcrypt.hash = jest.fn();
  });
  describe('validate password', () => {
    it(' true as password valid', async () => {
      bcrypt.hash.mockReturnValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('12345678');
      expect(bcrypt.hash).not.toHaveBeenCalledWith('12345678', 'testSalt');
      expect(result).toEqual(true);
    });
  });
});
