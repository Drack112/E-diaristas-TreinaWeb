import {
    NEXT_PUBLIC_API,
    NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY,
    NEXT_PUBLIC_PASSWORD_RECOVERY,
    // @ts-ignore
} from '@env';

const RN_ENV = {
    NEXT_PUBLIC_API,
    NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY,
    NEXT_PUBLIC_PASSWORD_RECOVERY,
};

for (const key in RN_ENV) {
    if (!process.env[key]) {
        // @ts-ignore
        process.env[key] = RN_ENV[key];
    }
}
