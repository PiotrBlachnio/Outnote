import Agenda from 'agenda';
import config from '../assets/config';
import resetUsers from './reset-users';

export default async (): Promise<void> => {
    const agenda: Agenda = new Agenda({ db: { address: config.DATABASE_CONN, options: { useUnifiedTopology: true }}});

    agenda.define('RESET_USERS', resetUsers);

    await agenda.start();
    
    await agenda.every('10 hours', 'RESET_USERS');
};