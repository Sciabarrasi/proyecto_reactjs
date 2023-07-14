export const BASE_URL ='https://64ae3a1cc85640541d4ca496.mockapi.io/products';

export const API_URLS = {
    PRODUCTS: {
        url: `${BASE_URL}`,
        config: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }
}