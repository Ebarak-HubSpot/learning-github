/**
 * Inbouncy Outreach Plan Calculator
 * Purpose: Calculate cold outreach volume needed to hit white label revenue goals.
 */

function calculateOutreach() {
    // 1. Inputs
    const revenueGoal = document.getElementById('revenueGoal').value;
    const avgRetainer = document.getElementById('avgRetainer').value;
    const resultDiv = document.getElementById('result');

    // 2. Your Specific Business Metrics
    const emailToMeetingRatio = 0.02; // 2% 
    const meetingToCustomerRatio = 0.20; // 20%

    if (revenueGoal > 0 && avgRetainer > 0) {
        // 3. Funnel Math (Working Backwards)
        const customersNeeded = Math.ceil(revenueGoal / avgRetainer);
        const meetingsNeeded = Math.ceil(customersNeeded / meetingToCustomerRatio);
        const emailsNeeded = Math.ceil(meetingsNeeded / emailToMeetingRatio);
        
        // Weekly breakdown for better actionability
        const weeklyEmails = Math.ceil(emailsNeeded / 4);

        // 4. Detailed Display
        resultDiv.innerHTML = `
            <div style="margin-bottom: 10px;">To hit <span class="highlight">$${Number(revenueGoal).toLocaleString()}</span>/mo in new White Label revenue:</div>
            <ul style="list-style: none; padding: 0;">
                <li>🤝 <strong>${customersNeeded}</strong> New Agency Partners</li>
                <li>📞 <strong>${meetingsNeeded}</strong> Discovery Calls Booked</li>
                <li>📧 <strong>${emailsNeeded}</strong> Cold Emails Sent Monthly</li>
            </ul>
            <div style="background: #0f172a; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #38bdf8;">
                <strong>Weekly Action Plan:</strong><br>
                Send <span class="highlight">${weeklyEmails}</span> highly personalized emails per week.
            </div>
        `;
    } else {
        resultDiv.innerHTML = "Please enter valid numbers for the goal and retainer.";
    }
}