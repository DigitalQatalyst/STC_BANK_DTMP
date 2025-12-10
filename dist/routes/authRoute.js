"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
router.use(express_1.default.urlencoded({ extended: true }));
router.post('/get-token', AuthController_1.getToken);
router.post('/get-account-profile', AuthController_1.getAccountProfile);
router.post('/get-contact-info', AuthController_1.getContactInformation);
exports.default = router;
