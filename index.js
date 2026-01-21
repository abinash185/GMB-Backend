import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { google } from "googleapis";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// OAuth Client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// STEP 1 — LOGIN URL
app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/business.manage"],
  });

  res.redirect(url);
});

// STEP 2 — CALLBACK URL
app.get("/auth/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    global.accessToken = tokens.access_token;

    return res.send(`
      <h2>Google Business Account Connected Successfully!</h2>
      <p>Now open: <b>http://localhost:5000/api/gmb/details</b></p>
    `);
  } catch (error) {
    res.status(500).send("Error while authenticating. " + error);
  }
});

// STEP 3 — FETCH BUSINESS DETAILS
app.get("/api/gmb/details", async (req, res) => {
  try {
    if (!global.accessToken)
      return res.status(401).json({ error: "Please login using /auth first" });

    // Fetch accounts
    const accountRes = await axios.get(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      { headers: { Authorization: `Bearer ${global.accessToken}` } }
    );

    const accountName = accountRes.data.accounts[0].name;

    // Fetch business location
    const locationsRes = await axios.get(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`,
      { headers: { Authorization: `Bearer ${global.accessToken}` } }
    );

    const business = locationsRes.data.locations[0];

    res.json({
      name: business.title,
      address: business.storefrontAddress?.addressLines?.join(", "),
      phone: business.storefrontPhoneNumber,
      website: business.websiteUri,
      primaryCategory: business.categories?.primaryCategory?.displayName,
      rating: business.averageRating,
      totalReviews: business.totalReviewCount,
    });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Start server
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
