import bcrypt from 'bcryptjs';

export default (ipList: string[], ip: string): Promise<boolean> => {
    return new Promise(async (resolve: Function, reject: Function) => {
        let isValid: boolean = false;

        try {
            for(let i = 0; i < ipList.length; i++) {
                isValid = await bcrypt.compare(ip, ipList[i]);
    
                if(isValid) {
                    resolve(true);
                }
            };
    
            if(!isValid) resolve(false);
        } catch(error) {
            reject(error);
        };
    });
}; 