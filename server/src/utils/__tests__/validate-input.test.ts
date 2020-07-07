import validator from '../validators';
import faker from 'faker';
import bcrypt from 'bcryptjs';
import config from '../../assets/config';

describe('Validate input function', () => {
    describe('Email validation', () => {
        describe('When email is valid', () => {
            it('Should return true', (done) => {
                expect(validator.validateInput({ email: 'test@gmail.com' })).toBeTruthy();
                done();
            });
        });

        describe('When email has invalid type', () => {
            it('Should return false', (done) => {
                //@ts-ignore-start
                expect(validator.validateInput({ email: [] })).toBeFalsy();
                done();
            });
        });

        describe('When email has length shorter than min characters', () => {
            it('Should return false', (done) => {
                expect(validator.validateInput({ email: faker.random.alphaNumeric(config.validation.email.MIN_LENGTH - 2) })).toBeFalsy();
                done();
            });
        });

        describe('When email has length longer than max characters', () => {
            it('Should return false', (done) => {
                const characters: string[] = new Array(config.validation.email.MAX_LENGTH + 4).fill('a');

                expect(validator.validateInput({ email: characters.join('') })).toBeFalsy();
                done();
            });
        });

        describe('When email does not have at', () => {
            it('Should return false', (done) => {
                expect(validator.validateInput({ email: 'qwertyu.com' })).toBeFalsy();
                done();
            });
        });

        describe('When email has more than one at', () => {
            it('Should return false', (done) => {
                expect(validator.validateInput({ email: 'qwertyu@@.com' })).toBeFalsy();
                done();
            });
        });

        describe('When email does not have any dot', () => {
            it('Should return false', (done) => {
                expect(validator.validateInput({ email: 'qwertyu@@com' })).toBeFalsy();
                done();
            });
        });
    });

    describe('Password validation', () => {
        describe('When password is valid', () => {
            it('Should return true', (done) => {
                expect(validator.validateInput({ password: 'Test123' })).toBeTruthy();
                done();
            });
        });

        describe('When password has invalid type', () => {
            it('Should return false', (done) => {
                //@ts-ignore-start
                expect(validator.validateInput({ password: {} })).toBeFalsy();
                done();
            });
        });

        describe('When password has length shorter than min characters', () => {
            it('Should return false', (done) => {
                expect(validator.validateInput({ password: faker.random.alphaNumeric(config.validation.password.MIN_LENGTH - 1) })).toBeFalsy();
                done();
            });
        });

        describe('When password has length longer than max characters', () => {
            const characters: string[] = new Array(config.validation.password.MAX_LENGTH + 2).fill('a');

            it('Should return false', (done) => {
                expect(validator.validateInput({ password: characters.join('') })).toBeFalsy();
                done();
            });
        });
    });

    describe('Username validation', () => {
        describe('When username is valid', () => {
            it('Should return true', (done) => {
                expect(validator.validateInput({ username: 'Hello123' })).toBeTruthy();
                done();
            });
        });

        describe('When username has invalid type', () => {
            it('Should return false', (done) => {
                //@ts-ignore-start
                expect(validator.validateInput({ username: ['', 123] })).toBeFalsy();
                done();
            });
        });

        describe('When username has length shorter than min characters', () => {
            it('Should return false', (done) => {
                expect(validator.validateInput({ username: faker.random.alphaNumeric(config.validation.username.MIN_LENGTH - 1) })).toBeFalsy();
                done();
            });
        });

        describe('When username has length longer than max characters', () => {
            const characters: string[] = new Array(config.validation.username.MAX_LENGTH + 2).fill('a');

            it('Should return false', (done) => {
                expect(validator.validateInput({ username: characters.join('') })).toBeFalsy();
                done();
            });
        });
    });

    describe('ID validation', () => {
        describe('When ID is valid', () => {
            it('Should return true', async (done) => {
                expect(validator.validateInput({ id: '5ef4429ccc4ff01ad85c009a' })).toBeTruthy();
                done();
            });
        });

        describe('When ID has invalid type', () => {
            it('Should return false', (done) => {
                //@ts-ignore-start
                expect(validator.validateInput({ id: 12341 })).toBeFalsy();
                done();
            });
        });

        describe('When ID has length equal 0', () => {
            it('Should return false', (done) => {
                expect(validator.validateInput({ id: '' })).toBeFalsy();
                done();
            });
        });
    });
});

describe('Validate ip function', () => {
    const validIP: string = faker.internet.ip();
    let ipList: string[] = [];

    describe('When there is no valid ip', () => {
        it('Should return false', async (done) => {
            ipList = [await bcrypt.hash(faker.internet.ip(), 12), await bcrypt.hash(faker.internet.ip(), 12)];

            validator.validateIP(ipList, validIP).then((success: boolean) => {
                expect(success).toBeFalsy();
                done();
            });
        });
    });

    describe('When valid ip exists', () => {
        it('Should return true', async (done) => {
            ipList.push(await bcrypt.hash(validIP, 12));

            validator.validateIP(ipList, validIP).then((success: boolean) => {
                expect(success).toBeTruthy();
                done();
            });
        });
    });
});