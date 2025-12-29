require('dotenv').config();
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

const TARGET_EMAIL = "jeff.test@amazon.com";

async function runSmartAgent() {
    console.log(`🤖 AI Agent: Searching for ${TARGET_EMAIL}...`);

    // 1. SEARCH for the Contact first
    const publicObjectSearchRequest = {
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: TARGET_EMAIL }] }],
        sorts: ['id'],
        properties: ['firstname', 'lastname', 'email'],
        limit: 1
    };

    try {
        const searchResult = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
        
        let contactId;

        // 2. LOGIC: Does he exist?
        if (searchResult.total > 0) {
            console.log("✅ FOUND HIM! Contact exists.");
            contactId = searchResult.results[0].id;
        } else {
            console.log("❌ NOT FOUND. Creating new contact...");
            const createResponse = await hubspotClient.crm.contacts.basicApi.create({
                properties: { email: TARGET_EMAIL, firstname: "Elon", lastname: "Musk" }
            });
            contactId = createResponse.id;
            console.log("✅ NEW CONTACT CREATED with ID:", contactId);
        }

        // 3. ACTION: Always create the deal, regardless of whether he was new or old
        console.log(`💰 Creating Deal for Contact ID: ${contactId}...`);
        const DealObj = {
            properties: {
                dealname: "SpaceX - AI Consultation",
                amount: "100000",
                pipeline: "default",
                dealstage: "appointmentscheduled"
            },
            associations: [{
                to: { id: contactId },
                types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }]
            }]
        };

        const dealResponse = await hubspotClient.crm.deals.basicApi.create(DealObj);
        console.log(`🎉 SUCCESS! Deal "${dealResponse.properties.dealname}" created.`);

    } catch (e) {
        console.error("Error:", e.message === 'HTTP request failed' ? JSON.stringify(e.response, null, 2) : e);
    }
}

runSmartAgent();