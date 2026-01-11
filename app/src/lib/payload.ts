import { getPayload } from 'payload';
import config from '@payload-config';

export const getPayloadClient = async () => {
    return await getPayload({ config });
};
