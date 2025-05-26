const express = require('express');
const path = require('path');
const fs = require('fs'); 
const app = express();
const port = process.env.PORT || 3002; 

app.use(express.static(path.join(__dirname, '/')));

// --- Payment Verification Route ---
app.get('/payment-verify/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const verificationApiUrl = `https://school-api.republicschoolofjournalism.com/api/applications/register/payment-verify/${orderId}`;

  console.log(`Verifying payment for order: ${orderId} using POST`);

  try {
    // Use POST method for the fetch call
    const apiResponse = await fetch(verificationApiUrl, {
      method: 'POST',
      headers: {
      },
    });
    const result = await apiResponse.json();

    if (!apiResponse.ok) {
       console.error(`API Error for ${orderId}: Status ${apiResponse.status}`, JSON.stringify(result));
       result.status = false; // Force failure status if API response wasn't OK
       result.message = result.message || `API request failed with status ${apiResponse.status}`;
    } else {
      console.log(`API Response for ${orderId}:`, JSON.stringify(result));
    }

    const success = result.status && result.data && result.data.payment_status === 'SUCCESS';
    const templatePath = success
      ? path.join(__dirname, 'payment-success.html')
      : path.join(__dirname, 'payment-failure.html');

    fs.readFile(templatePath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error(`Error reading template file ${templatePath}:`, err);
        return res.status(500).send('Error loading verification page.');
      }

      let finalHtml = htmlData.replace(/{{ORDER_ID}}/g, orderId); // Replace all occurrences

      if (!success) {
        const message = result.message || 'Could not verify payment status.';
        const statusInfo = result.data ? `Status: ${result.data.payment_status}` : 'Status unavailable';
        finalHtml = finalHtml.replace(/{{ERROR_MESSAGE}}/g, message);
        finalHtml = finalHtml.replace(/{{STATUS_INFO}}/g, statusInfo);
      }

      res.send(finalHtml);
    });

  } catch (error) {
    console.error(`Error verifying payment for order ${orderId}:`, error);
    // Generic Error HTML
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head><title>Error</title></head>
      <body><h1>Server Error</h1><p>Sorry, we encountered an error trying to verify your payment. Please try again later or contact support.</p></body>
      </html>
    `);
  }
});
// --- End Payment Verification Route ---

// --- Course Payment Route ---
app.get('/course-payment/:applicationId', (req, res) => {
  // const applicationId = req.params.applicationId; // applicationId is available if needed
  res.sendFile(path.join(__dirname, 'course-payment.html'));
});
// --- End Course Payment Route ---

// Catch-all 404 handler - MUST be after specific routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'), (err) => {
    if (err) {
      res.status(404).send('404: Page Not Found');
    }
  });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
