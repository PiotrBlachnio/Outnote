import CloudStorage, { S3 } from 'ibm-cos-sdk';
import config from '../assets/config';

const settings = {
    endpoint: config.CLOUD_STORAGE_ENDPOINT,
    apiKeyId: config.CLOUD_STORAGE_API_KEY,
    ibmAuthEndpoint: config.CLOUD_STORAGE_AUTH_ENDPOINT,
    serviceInstanceId: config.CLOUD_STORAGE_SERVICE_INSTANCE,
};

const cloudStorage: S3 = new CloudStorage.S3(settings);

export default cloudStorage;