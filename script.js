/**
 * Inbouncy Growth Partner Tool
 * Logic to calculate leads needed based on revenue goals.
 */

function calculateLeads() {
    // 1. Get the value from the input field
    const revenueGoal = document.getElementById('revenueGoal').value;
    const resultDiv = document.getElementById('result');

    // 2. Constants for calculation
    const averageDealValue = 2000;
    const conversionRate = .20; // 20% conversion rate

    if (revenueGoal > 0) {
        // 3. Perform the math
        const dealsNeeded = revenueGoal / averageDealValue;
        const leadsNeeded = Math.ceil(dealsNeeded / conversionRate);

        // 4. Display the result
        resultDiv.innerHTML = `
            To reach $${Number(revenueGoal).toLocaleString()}, you need:<br>
            🎯 ${dealsNeeded} Closed Deals<br>
            🚀 ${leadsNeeded} Qualified Leads
        `;
    } else {
        resultDiv.innerHTML = "Please enter a valid revenue goal.";
    }
}