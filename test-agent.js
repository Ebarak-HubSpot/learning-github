require('dotenv').config(); // Load the secret token
const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

async function createTestLead() {
    console.log("🤖 AI Agent: Connecting to HubSpot...");

    const contactObj = {
        properties: {
            firstname: "Elon",
            lastname: "Musk (Test)",
            email: "elon.test@spacex.com",
            company: "SpaceX",
            website: "spacex.com"
        }
    };

    try {
        const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj);
        console.log("✅ SUCCESS! Created contact with ID:", createContactResponse.id);
        console.log("View it here: https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/" + createContactResponse.id);
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e);
    }
}

createTestLead();