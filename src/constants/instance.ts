interface InstanceI {
    baseUrl: string;
    options: {
        method: string;
        headers: {
            'X-API-KEY': string;
        }
    };
}

export const instance: InstanceI = {
    baseUrl: 'https://api.kinopoisk.dev/',
    options: {
        method: 'GET',
        headers: {
            'X-API-KEY': 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA'   // me
            // 'X-API-KEY': 'J5M4GGT-XQC4SQC-J8RM0ZR-KW1XY45'  // kate
        }
    }
};
