import axios from 'axios';

interface ProductResponse {
  value: any[];
  '@odata.count'?: number;
}

export const fetchAllProducts = async (token: string): Promise<ProductResponse> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };

  const response = await axios.get(
    `${process.env.WEB_API_URL}/products?$count=true`,
    { headers }
  );

  // Transform marketplace values to readable text
  const transformedData = {
    ...response.data,
    value: response.data.value.map((product: any) => ({
      ...product,
      kf_marketplace: product.kf_marketplace === 123950000 ? 'Financial' 
        : product.kf_marketplace === 123950001 ? 'Non-Financial' 
        : 'Non-Financial'
    }))
  };

  return transformedData;
};

export const fetchProductById = async (token: string, productId: string): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };

  const response = await axios.get(
    `${process.env.WEB_API_URL}/products(${productId})`,
    { headers }
  );

  return response.data;
};

export const fetchProductsByMarketplace = async (token: string, marketplaceType: string): Promise<ProductResponse> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };

  let filterQuery = '';
  
  if (marketplaceType === 'Financial') {
    filterQuery = '$filter=kf_marketplace eq 123950000';
  } else if (marketplaceType === 'Non-Financial') {
    filterQuery = '$filter=(kf_marketplace eq 123950001 or kf_marketplace eq null)';
  } else if (marketplaceType === 'All') {
    // No filter - return all products
    filterQuery = '';
  } else {
    // Default to Non-Financial if invalid type provided
    filterQuery = '$filter=(kf_marketplace eq 123950001 or kf_marketplace eq null)';
  }

  const url = filterQuery 
    ? `${process.env.WEB_API_URL}/products?${filterQuery}&$count=true`
    : `${process.env.WEB_API_URL}/products?$count=true`;

  const response = await axios.get(url, { headers });

  // Transform marketplace values to readable text
  const transformedData = {
    ...response.data,
    value: response.data.value.map((product: any) => ({
      ...product,
      kf_marketplace: product.kf_marketplace === 123950000 ? 'Financial' 
        : product.kf_marketplace === 123950001 ? 'Non-Financial' 
        : 'Non-Financial'
    }))
  };

  return transformedData;
};

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