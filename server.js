require('dotenv').config();
const express = require('express');
const Nexmo = require('nexmo');
const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const app = express();

const PORT = process.env.PORT || 3000;
const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const SMS_TO_NUMBER = process.env.SMS_TO_NUMBER;
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER;

const cakeword = quantity => `Cake${quantity > 1 ? 's' : ''}`;
const twilioSend = async (req, res) => {
    try {
        const {
            FullName,
            Description,
            Date: date,
            Quantity,
            Time,
            Total,
            Photo
        } = req.body;
        const { OrderId } = req.params;

        const message = await twilio.messages.create({
            body: `Order ID: ${OrderId}\n\n${FullName} will pay ${Total}k Rwf for the Requested ${Quantity} ${cakeword(
                Quantity
            )}.\nThe ${cakeword(
                Quantity
            )} are to be finished on ${date} at ${Time}.\n\n\nPreview the cake: ${Photo} .\nDescription: ${Description}\n\n`,
            from: TWILIO_FROM_NUMBER,
            to: SMS_TO_NUMBER
        });

        if (message.sid) {
            console.log();
            res.status(200).json({ success: true, data: message.body });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: error.message });
    }
};
const nexmoSend = (req, res) => {
    try {
        const {
            FullName,
            Description,
            Date: date,
            Quantity,
            Time,
            Total,
            Photo
        } = req.body;
        const { OrderId } = req.params;

        const nexmo = new Nexmo({
            apiKey: NEXMO_API_KEY,
            apiSecret: NEXMO_API_SECRET
        });

        const from = 'Home Of Cakes';
        const to = SMS_TO_NUMBER;
        const text = `Order ID: ${OrderId}\n\n${FullName} will pay ${Total}k Rwf for the Requested ${Quantity} ${cakeword(
            Quantity
        )}.\nThe ${cakeword(
            Quantity
        )} are to be finished on ${date} at ${Time}.\n\n\nPreview the cake: ${Photo} .\nDescription: ${Description}\n\n`;

        nexmo.message.sendSms(from, to, text);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, X-Request-With, Authorization, Accept'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});
app.use('/', express.static('public'));
app.post('/sendsms/:OrderId', twilioSend);

app.listen(PORT, console.log('server started at http://localhost:' + PORT));
