import multer from 'multer';
import CloudStorage, { S3 } from 'ibm-cos-sdk';
import config from '../assets/config';
import sharp from 'sharp';

const settings = {
    endpoint: config.CLOUD_STORAGE_ENDPOINT,
    apiKeyId: config.CLOUD_STORAGE_API_KEY,
    ibmAuthEndpoint: config.CLOUD_STORAGE_AUTH_ENDPOINT,
    serviceInstanceId: config.CLOUD_STORAGE_SERVICE_INSTANCE,
};

class FileService {
    private _cloudStorage: S3 = new CloudStorage.S3(settings);

    public middleware = multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            };
        }
    });

    public async uploadImage(image: Buffer): Promise<string> {
        try {
            const filename: string = this._generateFilename();

            await this._cloudStorage.putObject({
                Bucket: config.CLOUD_STORAGE_BUCKET_NAME,
                Key: filename,
                Body: await this._prepareImage(image)
            }).promise();

            return filename;
        } catch(error) {
            throw error;
        };
    };

    private async _prepareImage(image: Buffer): Promise<Buffer> {
        const updatedImage: Buffer = await sharp(image)
        .resize(256, 256)
        .toFormat('jpeg', { quality: 75 })
        .toBuffer();
        
        return updatedImage;
    };

    private _generateFilename(): string {
        return Date.now() * 2 + '.jpeg';
    };
};

export default FileService;