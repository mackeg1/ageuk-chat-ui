const path = require('path');
const faqs = require(path.join(__dirname, '../faqs.json'));

module.exports = async function (context, req) {
    const userMessage = (req.body && req.body.message) || "";
    const lowerMessage = userMessage.toLowerCase();

    for (let item of faqs) {
        for (let keyword of item.keywords) {
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            if (regex.test(lowerMessage)) {
                context.res = {
                    status: 200,
                    body: { answer: item.answer }
                };
                return;
            }
        }
    }

    context.res = {
        status: 200,
        body: {
            answer: "Sorry, I couldn't find an answer for that. Please call us on 01454 411 707 between 9:30am and 1:30pm, Monday to Friday."
        }
    };
};
