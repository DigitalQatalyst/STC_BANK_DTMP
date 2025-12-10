"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactInformation = exports.getAccountProfile = exports.getToken = void 0;
const axios_1 = __importDefault(require("axios"));
const getToken = async (req, res) => {
    try {
        const url = 'https://login.microsoftonline.com/199ebd0d-2986-4f3d-8659-4388c5b2a724/oauth2/v2.0/token';
        const data = {
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            scope: process.env.scope,
            grant_type: process.env.grant_type,
        };
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        const response = await axios_1.default.post(url, new URLSearchParams(data), config);
        res.cookie('token', response.data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }).status(200).json({
            message: 'Token fetched successfully',
            token: response.data.access_token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch token' });
    }
};
exports.getToken = getToken;
const getAccountProfile = async (req, res) => {
    const { token, accountid } = req.body;
    if (!token) {
        res.status(400).json({ error: 'authToken is required in the request body' });
        return;
    }
    try {
        const headers = {
            Authorization: `${token}`,
            Accept: 'application/json',
            'Data-Version': '4.0',
            'Data-MaxVersion': '4.0'
        };
        const response = await axios_1.default.get(`https://kf-dev-a.crm15.dynamics.com/api/data/v9.2/accounts?$filter=accountid eq '${accountid}'`, { headers });
        console.log('filtered contact response', response.data);
        res.status(200).json(response.data);
        const contact = response?.data?.value[0]?._primarycontactid_value;
        console.log('contact', contact);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Error fetching data for specific account:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({
                error: error.response?.data || error.message
            });
        }
        else {
            console.error('Error fetching data for specific account:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
};
exports.getAccountProfile = getAccountProfile;
const getContactInformation = async (req, res) => {
    const { token, accountid } = req.body;
    try {
        const headers = {
            Authorization: `${token}`,
            Accept: 'application/json',
            'OData-Version': '4.0',
            'OData-MaxVersion': '4.0',
            Cookie: 'ARRAffinity=de748f861f5e21be476552c1143548f3836026b3b72f0a814fa5b7cfbebeab19dc748ed02332839cb0efbb9e2898da096c2226348c1e154ec1706e5f470d25ad08DDFFFE324130F20000001712084436; ReqClientId=497f5db0-8672-4508-a3d2-1e6b840925bf; orgId=f1255e28-8de7-ef11-933e-6045bd6a2361'
        };
        const response = await axios_1.default.get(`https://kf-dev-a.crm15.dynamics.com/api/data/v9.2/contacts(${accountid})`, { headers });
        console.log('contact response', response.data);
        res.status(200).json(response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Error fetching contact:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({
                error: error.response?.data || error.message
            });
        }
        else {
            console.error('Error fetching contact:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
};
exports.getContactInformation = getContactInformation;
