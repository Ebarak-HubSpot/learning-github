require('dotenv').config();
const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

// The ID you got from your previous success (Check your screenshot!)
const contactId = "188928563042"; 

async function createDealForElon() {
    console.log(`🤖 AI Agent: Creating a Deal for Contact ID: ${contactId}...`);

    const DealObj = {
        properties: {
            dealname: "SpaceX - Q1 Marketing Retainer",
            pipeline: "default",
            dealstage: "presentationscheduled", // Logic: Move straight to presentation
            amount: "50000"
        },
        associations: [
            {
                to: { id: contactId },
                types: [
                    { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 } // 3 = Deal-to-Contact
                ]
            }
        ]
    };

    try {
        const createDealResponse = await hubspotClient.crm.deals.basicApi.create(DealObj);
        console.log("💰 SUCCESS! Created Deal:", createDealResponse.properties.dealname);
        console.log("🔗 Linked to Contact ID:", contactId);
        console.log("View Deal: https://app.hubspot.com/contacts/YOUR_PORTAL_ID/deal/" + createDealResponse.id);
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e);
    }
}

createDealForElon();