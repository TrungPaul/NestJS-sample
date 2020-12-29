import { User } from './../user.entity';
import { Test } from '@nestjs/testing';
import { UserRepository } from './../user.repository';
describe('userRepository', () => {
  let userRepository;

  const mockCredentialDto = {
    username: 'abc',
    password: '1234456567567678',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('sigup', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    // it('successfully signs up the user', () => {
    //   save.mockResolveValue(undefined);
    //   expect(userRepository.sigUp(mockCredentialDto)).resolves.not.toThrow();
    // });
  });

  describe('validate password', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      // eslint-disable-next-line prefer-const
      user = new User();
      user.username = 'testUsername';
      user.validatePassword = jest.fn();
    });

    it('return username as validation is successful', async () => {
      // userRepository.findOne.mockResolveValue(user);
      // user.validatePassword.mockResolveValue(true);
    });
  });
});
