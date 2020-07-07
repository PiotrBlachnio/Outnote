import matchRegex from "../validators/lib/match-regex";
import config from "../../assets/config";

describe('Match regex function', () => {
   describe('Email regex', () => {
        describe('When email is correct and does not have a dot', () => {
            it('Should return true', (done) => {
                expect(matchRegex('email@example.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has a dot', () => {
            it('Should return true', (done) => {
                expect(matchRegex('firstname.lastname@example.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has a subdomen', () => {
            it('Should return true', (done) => {
                expect(matchRegex('email@subdomain.example.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has a plus sign', () => {
            it('Should return true', (done) => {
                expect(matchRegex('firstname+lastname@example.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has many domens in square brackets', () => {
            it('Should return true', (done) => {
                expect(matchRegex('email@[123.123.123.123]', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has double quotes', () => {
            it('Should return true', (done) => {
                expect(matchRegex('"email"@example.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and contains only numbers', () => {
            it('Should return true', (done) => {
                expect(matchRegex('1234567890@example.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and has a dash in a domain', () => {
            it('Should return true', (done) => {
                expect(matchRegex('email@example-one.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and contains only underscores', () => {
            it('Should return true', (done) => {
                expect(matchRegex('_______@example.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and unusual domain', () => {
            it('Should return true', (done) => {
                expect(matchRegex('email@example.museum', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        }); 
        
        describe('When email is correct and contains 2 domains', () => {
            it('Should return true', (done) => {
                expect(matchRegex('email@example.co.jp', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email is correct and contains dash in the first part', () => {
            it('Should return true', (done) => {
                expect(matchRegex('firstname-lastname@example.com', config.validation.email.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When email does not contain at and domain', () => {
            it('Should return false', (done) => {
                expect(matchRegex('plainaddress', config.validation.email.REGEX)).toBeFalsy();
                done();
            });
        });

        describe('When email does not contain at', () => {
            it('Should return false', (done) => {
                expect(matchRegex('#@%^%#$@#$@#.com', config.validation.email.REGEX)).toBeFalsy();
                done();
            });
        });

        describe('When email does not contain first part', () => {
            it('Should return false', (done) => {
                expect(matchRegex('@example.com', config.validation.email.REGEX)).toBeFalsy();
                done();
            });
        });

        describe('When email has whitespaces', () => {
            it('Should return false', (done) => {
                expect(matchRegex('Joe Smith <email@example.com>', config.validation.email.REGEX)).toBeFalsy();
                done();
            });
        });

        describe('When email has two ats', () => {
            it('Should return false', (done) => {
                expect(matchRegex('email@example@example.com', config.validation.email.REGEX)).toBeFalsy();
                done();
            });
        });

        describe('When email starts with a dot', () => {
            it('Should return false', (done) => {
                expect(matchRegex('.email@example.com', config.validation.email.REGEX)).toBeFalsy();
                done();
            });
        });

        describe('When email has a dot before an at', () => {
            it('Should return false', (done) => {
                expect(matchRegex('email.@example.com', config.validation.email.REGEX)).toBeFalsy();
                done();
            });
        });
   });

   describe('Username regex', () => {
        describe('When value contains only numbers', () => {
            it('Should return true', (done) => {
                expect(matchRegex('519751510', config.validation.username.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When value contains numbers and letters', () => {
            it('Should return true', (done) => {
                expect(matchRegex('5197515ag161fagfab51510', config.validation.username.REGEX)).toBeTruthy();
                done();
            });
        });

        describe('When value contains special characters', () => {
            it('Should return false', (done) => {
                expect(matchRegex('5197515!ag161fa#gfa.b51510', config.validation.username.REGEX)).toBeFalsy();
                done();
            });
        }); 
   });
});