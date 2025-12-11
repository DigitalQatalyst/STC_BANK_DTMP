import express, { Router } from 'express';
import { getToken, getAccountProfile, getContactInformation } from '../controllers/AuthController.js';

const router: Router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.post('/get-token', getToken);
router.post('/get-account-profile', getAccountProfile);
router.post('/get-contact-info', getContactInformation);

export default router;