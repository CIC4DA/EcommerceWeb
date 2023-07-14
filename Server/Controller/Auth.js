const User = require('../modal/User');
const crypto = require('crypto');
const { sanitizeUser, sendMail } = require('../services/common');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SECRET_KEY'


exports.createUser = async (req, res) => {
    try {
        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            const user = new User({ ...req.body, password: hashedPassword, salt });

            const response = await user.save();

            req.login(sanitizeUser(response), (error) => {
                if (error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    const token = jwt.sign(sanitizeUser(response), SECRET_KEY);
                    res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(200).json(token);
                }
            });
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.signinUser = async (req, res) => {
    res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(200).json(req.user.token);
}
exports.checkAuth = async (req, res) => {
    if (req.user) {
        const token = jwt.sign(sanitizeUser(req.user), SECRET_KEY);
        res.json(token);
    }
    else {
        res.sendStatus(401);
    }
}
exports.resetPasswordRequest = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (user) {
        const token = crypto.randomBytes(48).toString('hex');
        user.resetPasswordToken = token;
        await user.save();

        const link = `http://localhost:3000/reset-password?token=${token}&email=${email}`;
        const subject = "Reset password for DJ&Co";
        const text = `text`;
        const html = `
    <p>Hello There</p>
    <p>We have received a request to reset your password for your account. To proceed with the password reset, please follow the instructions below:</p>
    
    <p>1.Click on the following link to access the password reset page:<a href='${link}'>Reset Password</a>\n</p>
    <p>2.On the password reset page, enter your new password twice to confirm it.\n</p>
    <p>3.Once you have entered your new password, click on the "Reset Password" button.</p>
    <p>If you did not initiate this password reset request, please ignore this email. Your account's security remains intact, and no changes will be made\n</p>

    <p>Please ensure that you choose a strong and unique password that is not easily guessable and consists of a combination of letters, numbers, and special characters.\n</p>

    <p>If you need further assistance or have any questions, please don't hesitate to contact our support team at support@support.com.\n</p>
        <p>Thank you for using DJ&Co.</p>`;


        if (email) {
            const response = await sendMail({
                to: email,
                subject,
                html,
                text
            });
            res.send(response);
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.status(400).json({ error: error.message });
    }
}

exports.resetPassword = async (req, res) => {
    const { email, password, token } = req.body;

    const user = await User.findOne({ email: email, resetPasswordToken: token });

    if (user) {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            'sha256',
            async function (err, hashedPassword) {
                user.password = hashedPassword;
                user.salt = salt;
                await user.save();
                const subject = 'Password successfully reset for DJ&Co';
                const html = `<p>Successfully able to Reset Password</p>`;
                if (email) {
                    const response = await sendMail({ to: email, subject, html });
                    res.json(response);
                } else {
                    res.sendStatus(400);
                }
            }
        );
    } else {
        res.sendStatus(400);
    }
}

exports.resetPasswordRequestUser = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (user) {
        const token = crypto.randomBytes(48).toString('hex');
        user.resetPasswordToken = token;
        await user.save();
        const link = `http://localhost:3000/reset-password-user?token=${token}&email=${email}`;
        res.json(link);

    } else {
        res.sendStatus(400);
    }
}

exports.resetPasswordUser = async (req, res) => {
    const { email, newPassword, token, oldPassword } = req.body;
    const user = await User.findOne({ email: email, resetPasswordToken: token });

    if (user) {
                const salt = crypto.randomBytes(16);
                crypto.pbkdf2(
                    newPassword,
                    salt,
                    310000,
                    32,
                    'sha256',
                    async function (err, hashedPassword) {
                        user.password = hashedPassword;
                        user.salt = salt;
                        await user.save();
                    }
                );
    } else {
        res.sendStatus(400);
    }
}