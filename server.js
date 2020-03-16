require('dotenv').config();
const express = require('express');
const Nexmo = require('nexmo');

const app = express();

const PORT = process.env.PORT || 3000;
const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const SMS_TO_NUMBER = process.env.SMS_TO_NUMBER;

app.use(express.json());
app.use('/', express.static('public'));
app.post('/sendsms/:OrderId', (req, res) => {
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

        const cakeword = `Cake${Quantity > 1 ? 's' : ''}`;

        const from = 'Home Of Cakes';
        const to = SMS_TO_NUMBER;
        const text = `Order ID: ${OrderId}\n\n${FullName} will pay ${Total}k Rwf for the Requested ${Quantity} ${cakeword}.\nThe ${cakeword} are to be finished on ${date} at ${Time}.\n\n\nPreview the cake: ${Photo} .\nDescription: ${Description}\n\n`;

        nexmo.message.sendSms(from, to, text);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, console.log('server started at http://localhost:' + PORT));
