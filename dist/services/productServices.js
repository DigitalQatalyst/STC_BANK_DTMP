"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProductsByMarketplace = exports.fetchProductById = exports.fetchAllProducts = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchAllProducts = async (token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'OData-Version': '4.0',
        'OData-MaxVersion': '4.0'
    };
    const response = await axios_1.default.get(`${process.env.WEB_API_URL}/products?$count=true`, { headers });
    // Transform marketplace values to readable text
    const transformedData = {
        ...response.data,
        value: response.data.value.map((product) => ({
            ...product,
            kf_marketplace: product.kf_marketplace === 123950000 ? 'Financial'
                : product.kf_marketplace === 123950001 ? 'Non-Financial'
                    : 'Non-Financial'
        }))
    };
    return transformedData;
};
exports.fetchAllProducts = fetchAllProducts;
const fetchProductById = async (token, productId) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'OData-Version': '4.0',
        'OData-MaxVersion': '4.0'
    };
    const response = await axios_1.default.get(`${process.env.WEB_API_URL}/products(${productId})`, { headers });
    return response.data;
};
exports.fetchProductById = fetchProductById;
const fetchProductsByMarketplace = async (token, marketplaceType) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'OData-Version': '4.0',
        'OData-MaxVersion': '4.0'
    };
    let filterQuery = '';
    if (marketplaceType === 'Financial') {
        filterQuery = '$filter=kf_marketplace eq 123950000';
    }
    else if (marketplaceType === 'Non-Financial') {
        filterQuery = '$filter=(kf_marketplace eq 123950001 or kf_marketplace eq null)';
    }
    else if (marketplaceType === 'All') {
        // No filter - return all products
        filterQuery = '';
    }
    else {
        // Default to Non-Financial if invalid type provided
        filterQuery = '$filter=(kf_marketplace eq 123950001 or kf_marketplace eq null)';
    }
    const url = filterQuery
        ? `${process.env.WEB_API_URL}/products?${filterQuery}&$count=true`
        : `${process.env.WEB_API_URL}/products?$count=true`;
    const response = await axios_1.default.get(url, { headers });
    // Transform marketplace values to readable text
    const transformedData = {
        ...response.data,
        value: response.data.value.map((product) => ({
            ...product,
            kf_marketplace: product.kf_marketplace === 123950000 ? 'Financial'
                : product.kf_marketplace === 123950001 ? 'Non-Financial'
                    : 'Non-Financial'
        }))
    };
    return transformedData;
};
exports.fetchProductsByMarketplace = fetchProductsByMarketplace;
// export const fetchAccountById = async (token: string, accountId: string): Promise<any> => {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     Accept: 'application/json',
//     'OData-Version': '4.0',
//     'OData-MaxVersion': '4.0'
//   };
//   const response = await axios.get(
//     `${process.env.WEB_API_URL}/accounts(${accountId})`,
//     { headers }
//   );
//   return response.data;
// };
