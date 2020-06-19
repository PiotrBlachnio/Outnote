import axios from 'axios';
import logger from './logger';
import config from '../assets/config';

export default async (ip: string): Promise<any> => {
    let localization: any;

    try {
        localization = await axios.get(`http://api.ipstack.com/${ip}?access_key=${config.LOCALIZATION_API_KEY}`);
    } catch(error) {
        await logger.log({ type: 'error', message: error.message, place: 'Fetching localization' });
    };

    return localization;
};