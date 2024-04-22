"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const zod = require("zod");
const registerUserSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    username: zod.string(),
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = registerUserSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    try {
        let user = yield user_1.default.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new user_1.default({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        });
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(req.body.password, salt);
        yield user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
const loginUserSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = loginUserSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    try {
        let user = yield user_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.loginUser = loginUser;
