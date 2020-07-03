import validator from '../validators';
import faker from 'faker';
import bcrypt from 'bcryptjs';

describe('Validator', () => {
    describe('Has min length function', () => {
        describe('When the value is shorter than the provided length', () => {
            it('Should return false', (done) => {
                expect(validator.hasMinLength(faker.random.alphaNumeric(3), 4)).toBeFalsy();
                done();
            });
        });

        describe('When the value has the same length', () => {
            it('Should return true', (done) => {
                expect(validator.hasMinLength(faker.random.alphaNumeric(4), 4)).toBeTruthy();
                done();
            });
        });

        describe('When the values is longer than the provided length', () => {
            it('Should return true', (done) => {
                expect(validator.hasMinLength(faker.random.alphaNumeric(5), 4)).toBeTruthy();
                done();
            });
        });
    });

    describe('Has max length function', () => {
        describe('When the value is longer than the provided length', () => {
            it('Should return false', (done) => {
                expect(validator.hasMaxLength(faker.random.alphaNumeric(5), 4)).toBeFalsy();
                done();
            });
        });

        describe('When the value has the same length', () => {
            it('Should return true', (done) => {
                expect(validator.hasMaxLength(faker.random.alphaNumeric(4), 4)).toBeTruthy();
                done();
            });
        });

        describe('When the values is shorter than the provided length', () => {
            it('Should return true', (done) => {
                expect(validator.hasMaxLength(faker.random.alphaNumeric(3), 4)).toBeTruthy();
                done();
            });
        });
    });

    describe('Is email function', () => {
        describe('When email is correct and does not have a dot', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('email@example.com')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has a dot', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('firstname.lastname@example.com')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has a subdomen', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('email@subdomain.example.com')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has a plus sign', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('firstname+lastname@example.com')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has many domens in square brackets', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('email@[123.123.123.123]')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has double quotes', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('"email"@example.com')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and contains only numbers', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('1234567890@example.com')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has a dash in a domain', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('email@example-one.com')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and contains only underscores', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('_______@example.com')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and unusual domain', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('email@example.museum')).toBeTruthy();
                done();
            });
        }); 
        
        describe('When email is correct and contains 2 domains', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('email@example.co.jp')).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and contains dash in the first part', () => {
            it('Should return true', (done) => {
                expect(validator.isEmail('firstname-lastname@example.com')).toBeTruthy();
                done();
            });
        });

        describe('When email does not contain at and domain', () => {
            it('Should return false', (done) => {
                expect(validator.isEmail('plainaddress')).toBeFalsy();
                done();
            });
        });

        describe('When email does not contain at', () => {
            it('Should return false', (done) => {
                expect(validator.isEmail('#@%^%#$@#$@#.com')).toBeFalsy();
                done();
            });
        });

        describe('When email does not contain first part', () => {
            it('Should return false', (done) => {
                expect(validator.isEmail('@example.com')).toBeFalsy();
                done();
            });
        });

        describe('When email has whitespaces', () => {
            it('Should return false', (done) => {
                expect(validator.isEmail('Joe Smith <email@example.com>')).toBeFalsy();
                done();
            });
        });

        describe('When email has two ats', () => {
            it('Should return false', (done) => {
                expect(validator.isEmail('email@example@example.com')).toBeFalsy();
                done();
            });
        });

        describe('When email starts with a dot', () => {
            it('Should return false', (done) => {
                expect(validator.isEmail('.email@example.com')).toBeFalsy();
                done();
            });
        });

        describe('When email has a dot before an at', () => {
            it('Should return false', (done) => {
                expect(validator.isEmail('email.@example.com')).toBeFalsy();
                done();
            });
        });
    });

    describe('Is numeric function', () => {
        describe('When value contains only numbers', () => {
            it('Should return true', (done) => {
                expect(validator.isNumeric('519751510')).toBeTruthy();
                done();
            });
        });

        describe('When value contains numbers and letters', () => {
            it('Should return false', (done) => {
                expect(validator.isNumeric('5197515ag161fagfab51510')).toBeFalsy();
                done();
            });
        });
    });

    describe('Is alphanumeric function', () => {
        describe('When value contains only numbers', () => {
            it('Should return true', (done) => {
                expect(validator.isAlphanumeric('519751510')).toBeTruthy();
                done();
            });
        });

        describe('When value contains numbers and letters', () => {
            it('Should return true', (done) => {
                expect(validator.isAlphanumeric('5197515ag161fagfab51510')).toBeTruthy();
                done();
            });
        });

        describe('When value contains special characters', () => {
            it('Should return false', (done) => {
                expect(validator.isAlphanumeric('5197515!ag161fa#gfa.b51510')).toBeFalsy();
                done();
            });
        });
    });

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
                    expect(validator.validateInput({ email: [] })).toBeFalsy();
                    done();
                });
            });
    
            describe('When email has length shorter than 5 characters', () => {
                it('Should return false', (done) => {
                    expect(validator.validateInput({ email: 'test' })).toBeFalsy();
                    done();
                });
            });
    
            describe('When email has length longer than 30 characters', () => {
                it('Should return false', (done) => {
                    const characters: string[] = new Array(35).fill('a');
    
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
                    expect(validator.validateInput({ password: {} })).toBeFalsy();
                    done();
                });
            });
    
            describe('When password has length shorter than 3 characters', () => {
                it('Should return false', (done) => {
                    expect(validator.validateInput({ password: 'Te' })).toBeFalsy();
                    done();
                });
            });
    
            describe('When password has length longer than 32 characters', () => {
                const characters: string[] = new Array(35).fill('a');
    
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
                    expect(validator.validateInput({ username: ['', 123] })).toBeFalsy();
                    done();
                });
            });
    
            describe('When username has length shorter than 4 characters', () => {
                it('Should return false', (done) => {
                    expect(validator.validateInput({ username: 'Tes' })).toBeFalsy();
                    done();
                });
            });
    
            describe('When username has length longer than 20 characters', () => {
                const characters: string[] = new Array(25).fill('a');
    
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
    
        describe('Invitation status validation', () => {
            describe('When status equal 1', () => {
                it('Should return true', (done) => {
                    expect(validator.validateInput({ invitationStatus: 1 })).toBeTruthy();
                    done();
                });
            });
    
            describe('When status equal 2', () => {
                it('Should return true', (done) => {
                    expect(validator.validateInput({ invitationStatus: 2 })).toBeTruthy();
                    done();
                });
            });
    
            describe('When status does not equal 1 or 2', () => {
                it('Should return false', (done) => {
                    expect(validator.validateInput({ invitationStatus: 59 })).toBeFalsy();
                    done();
                });
            });
    
            describe('When status is not a number', () => {
                it('Should return false', (done) => {
                    expect(validator.validateInput({ invitationStatus: '1' })).toBeFalsy();
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
});