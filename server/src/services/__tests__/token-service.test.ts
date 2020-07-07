import TokenService from "../token-service";
import faker from 'faker';
import jwt from 'jsonwebtoken';
import { Token } from "../../assets/enums";
import config from "../../assets/config";

describe('Token service', () => {
    const tokenService: TokenService = new TokenService();

    describe('Generate token function', () => {
        describe('Access token', () => {
            it('Should successfully validate token', (done) => {
                const token = tokenService.generateToken(Token.ACCESS, { id: faker.random.uuid(), ip: faker.internet.ip() });
              
                jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err) => {
                    expect(err).toBeNull();
                    done();
                });
            });
        });

        describe('Confirm email token', () => {
            it('Should successfully validate token', (done) => {
                const token = tokenService.generateToken(Token.CONFIRM_EMAIL, { id: faker.random.uuid(), ip: faker.internet.ip() });
          
                jwt.verify(token, config.CONFIRM_EMAIL_TOKEN_SECRET, (err) => {
                    expect(err).toBeNull();
                    done();
                });
            });
        });

        describe('Reset password token', () => {
            it('Should successfully validate token', (done) => {
                const token = tokenService.generateToken(Token.RESET_PASSWORD, { id: faker.random.uuid(), ip: faker.internet.ip() });

                jwt.verify(token, config.RESET_PASSWORD_TOKEN_SECRET, (err) => {
                    expect(err).toBeNull();
                    done();
                });
            });
        });

        describe('Confirm identity token', () => {
            it('Should successfully validate token', (done) => {
                const token = tokenService.generateToken(Token.CONFIRM_IDENTITY, { id: faker.random.uuid(), ip: faker.internet.ip() });

                jwt.verify(token, config.CONFIRM_IDENTITY_TOKEN_SECRET, (err) => {
                    expect(err).toBeNull();
                    done();
                });
            });
        });

        describe('Invalid token type', () => {
            it('Should throw an error', (done) => {
                try {
                    tokenService.generateToken(-1, { id: faker.random.uuid(), ip: faker.internet.ip() });
                } catch(error) {
                    expect(error.message).toEqual('Token type is invalid!');
                    done();
                };
            });
        });
    });

    describe('Verify token function', () => {
        describe('When token does not exist', () => {
            it('Should return null', (done) => {
                const payload = tokenService.verifyToken(Token.ACCESS, '');
                    
                expect(payload).toBeNull();
                done();
            });
        });
        
        describe('When token is not a string', () => {
            it('Should return null', (done) => {
                //@ts-ignore-start
                const payload = tokenService.verifyToken(Token.ACCESS, []);
                    
                expect(payload).toBeNull();
                done();
            });
        });
        
        describe('Access token', () => {
            describe('When token is valid', () => {
                it('Should return correct payload', (done) => {
                    const id = faker.random.uuid();
                    const token = jwt.sign({ id }, config.ACCESS_TOKEN_SECRET);
    
                    const payload = tokenService.verifyToken(Token.ACCESS, token);
                    
                    expect(payload).toMatchObject({ id });
                    done();
                });
            });

            describe('When token is not valid', () => {
                it('Should return null', (done) => {
                    const payload = tokenService.verifyToken(Token.ACCESS, faker.random.uuid());
                    
                    expect(payload).toEqual(null);
                    done();
                });
            });
        });

        describe('Confirm email token', () => {
            describe('When token is valid', () => {
                it('Should return correct payload', (done) => {
                    const id = faker.random.uuid();
                    const token = jwt.sign({ id }, config.CONFIRM_EMAIL_TOKEN_SECRET);
    
                    const payload = tokenService.verifyToken(Token.CONFIRM_EMAIL, token);
                    
                    expect(payload).toMatchObject({ id });
                    done();
                });
            });

            describe('When token is not valid', () => {
                it('Should return null', (done) => {
                    const payload = tokenService.verifyToken(Token.CONFIRM_EMAIL, faker.random.uuid());
                    
                    expect(payload).toEqual(null);
                    done();
                });
            });
        });

        describe('Reset password token', () => {
            describe('When token is valid', () => {
                it('Should return correct payload', (done) => {
                    const id = faker.random.uuid();
                    const token = jwt.sign({ id }, config.RESET_PASSWORD_TOKEN_SECRET);
    
                    const payload = tokenService.verifyToken(Token.RESET_PASSWORD, token);
                    
                    expect(payload).toMatchObject({ id });
                    done();
                });
            });

            describe('When token is not valid', () => {
                it('Should return null', (done) => {
                    const payload = tokenService.verifyToken(Token.RESET_PASSWORD, faker.random.uuid());
                    
                    expect(payload).toEqual(null);
                    done();
                });
            });
        });

        describe('Confirm identity token', () => {
            describe('When token is valid', () => {
                it('Should return correct payload', (done) => {
                    const id = faker.random.uuid();
                    const ip = faker.internet.ip();

                    const token = jwt.sign({ id, ip }, config.CONFIRM_IDENTITY_TOKEN_SECRET);
    
                    const payload = tokenService.verifyToken(Token.CONFIRM_IDENTITY, token);
                    
                    expect(payload).toMatchObject({ id, ip });
                    done();
                });
            });

            describe('When token is not valid', () => {
                it('Should return null', (done) => {
                    const payload = tokenService.verifyToken(Token.CONFIRM_IDENTITY, faker.random.uuid());
                    
                    expect(payload).toEqual(null);
                    done();
                });
            });
        });
    });

    describe('Is token expired function', () => {
        describe('When token is valid', () => {
            it('Should return false', (done) => {
                const token: string = jwt.sign({ id: faker.random.uuid() }, config.ACCESS_TOKEN_SECRET);
                const isExpired: boolean = tokenService.isTokenExpired(Token.ACCESS, token);

                expect(isExpired).toBeFalsy();
                done();
            });
        });

        describe('When token is not valid', () => {
            it('Should return false', (done) => {
                const token: string = jwt.sign({ id: faker.random.uuid() }, faker.random.uuid());
                const isExpired: boolean = tokenService.isTokenExpired(Token.ACCESS, token);

                expect(isExpired).toBeFalsy();
                done();
            });
        });

        describe('When token is expired', () => {
            it('Should return true', (done) => {
                const token: string = jwt.sign({ id: faker.random.uuid() }, config.ACCESS_TOKEN_SECRET, { expiresIn: '0.001s' });
                const isExpired: boolean = tokenService.isTokenExpired(Token.ACCESS, token);

                expect(isExpired).toBeTruthy();
                done();
            });
        });
    });
});