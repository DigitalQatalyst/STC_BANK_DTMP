import { Request, Response } from 'express';
import { fetchAllProducts, fetchProductById, fetchProductsByMarketplace } from '../services/productServices';

interface ProductRequestBody {
  token: string;
  productId?: string;
}

interface MarketplaceRequestBody {
  token: string;
  marketplaceType: string;
}

export const getAllProducts = async (req: Request<{}, {}, ProductRequestBody>, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ error: 'Token is required' });
    return;
  }

  try {
    const productsData = await fetchAllProducts(token);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      totalCount: productsData['@odata.count'] || 0,
      data: productsData.value,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error fetching products:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch products',
      details: error.response?.data || error.message
    });
  }
};

export const getProductById = async (req: Request<{}, {}, ProductRequestBody>, res: Response): Promise<void> => {
  const { token, productId } = req.body;

  if (!token || !productId) {
    res.status(400).json({ error: 'Token and productId are required' });
    return;
  }

  try {
    const productData = await fetchProductById(token, productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: productData,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error fetching product:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch product',
      details: error.response?.data || error.message
    });
  }
};

export const getProductsByMarketplace = async (req: Request<{}, {}, MarketplaceRequestBody>, res: Response): Promise<void> => {
  const { token, marketplaceType } = req.body;

  if (!token || !marketplaceType) {
    res.status(400).json({ error: 'Token and marketplaceType are required' });
    return;
  }

  try {
    const productsData = await fetchProductsByMarketplace(token, marketplaceType);

    res.status(200).json({
      success: true,
      message: `${marketplaceType} products fetched successfully`,
      totalCount: productsData['@odata.count'] || 0,
      data: productsData.value,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error fetching marketplace products:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch marketplace products',
      details: error.response?.data || error.message
    });
  }
};

// export const getAccountById = async (req: Request<{}, {}, AccountRequestBody>, res: Response): Promise<void> => {
//   const { token, accountId } = req.body;

//   if (!token || !accountId) {
//     res.status(400).json({ error: 'Token and accountId are required' });
//     return;
//   }

//   try {
//     const accountData = await fetchAccountById(token, accountId);

//     res.status(200).json({
//       success: true,
//       message: 'Account fetched successfully',
//       data: accountData,
//       timestamp: new Date().toISOString()
//     });

//   } catch (error: any) {
//     console.error('Error fetching account:', error.response?.data || error.message);
//     res.status(error.response?.status || 500).json({
//       error: 'Failed to fetch account',
//       details: error.response?.data || error.message
//     });
//   }
// };