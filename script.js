/**
 * Inbouncy Outreach Plan Calculator
 * Purpose: Calculate cold outreach volume and enable easy copying of data.
 */

function calculateOutreach() {
    const revenueGoal = document.getElementById('revenueGoal').value;
    const avgRetainer = document.getElementById('avgRetainer').value;
    const resultDiv = document.getElementById('result');
    const copyBtn = document.getElementById('copyBtn');

    // Business Metrics
    const emailToMeetingRatio = 0.02; 
    const meetingToCustomerRatio = 0.20;

    if (revenueGoal > 0 && avgRetainer > 0) {
        const customersNeeded = Math.ceil(revenueGoal / avgRetainer);
        const meetingsNeeded = Math.ceil(customersNeeded / meetingToCustomerRatio);
        const emailsNeeded = Math.ceil(meetingsNeeded / emailToMeetingRatio);
        const weeklyEmails = Math.ceil(emailsNeeded / 4);

        resultDiv.innerHTML = `
            <div id="planText">
            To hit <span class="highlight">$${Number(revenueGoal).toLocaleString()}</span>/mo in new White Label revenue:
            <br>🤝 ${customersNeeded} New Agency Partners
            <br>📞 ${meetingsNeeded} Discovery Calls Booked
            <br>📧 ${emailsNeeded} Cold Emails Sent Monthly
            <br>🚀 Weekly Goal: ${weeklyEmails} Personalized Emails
            </div>
        `;

        // Show the copy button once the calculation is done
        copyBtn.style.display = "block";
    } else {
        resultDiv.innerHTML = "Please enter valid numbers.";
        copyBtn.style.display = "none";
    }
}

// New Copy Feature
function copyPlan() {
    const plan = document.getElementById('planText').innerText;
    
    navigator.clipboard.writeText(plan).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.innerText;
        
        // Feedback to user
        copyBtn.innerText = "✅ Plan Copied!";
        copyBtn.style.backgroundColor = "#22c55e"; // Success green
        
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.backgroundColor = "#334155";
        }, 2000);
    });
}