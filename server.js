import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'The Candleier' });
});

// Reverse geocode proxy for current location detection
app.get('/api/reverse-geocode', async (req, res) => {
  const { lat, lng } = req.query;
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ success: false, error: 'Invalid latitude or longitude coordinates provided.' });
  }

  // 1. Primary: Nominatim OpenStreetMap
  try {
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`;
    const response = await fetch(geoUrl, {
      headers: {
        'User-Agent': 'TheCandleier/1.0 (concierge@thecandleier.com)',
        'Accept-Language': 'en'
      }
    });

    if (response.ok) {
      const data = await response.json();
      const addr = data.address || {};

      const line1Parts = [
        addr.house_number || addr.building || '',
        addr.road || addr.street || addr.residential || ''
      ].filter(Boolean);

      const line2Parts = [
        addr.suburb || addr.neighbourhood || addr.quarter || addr.commercial || '',
        addr.city_district || addr.hamlet || ''
      ].filter(Boolean);

      const city = addr.city || addr.town || addr.village || addr.municipality || addr.state_district || addr.county || '';
      const rawPostcode = (addr.postcode || '').replace(/\D/g, '');
      const pincode = rawPostcode.length >= 6 ? rawPostcode.slice(0, 6) : rawPostcode;

      const result = {
        address1: line1Parts.join(', ') || (data.name !== city ? data.name : ''),
        address2: line2Parts.join(', '),
        city: city,
        state: addr.state || '',
        pincode: pincode,
        country: addr.country || 'India'
      };

      return res.json({
        success: true,
        ...result,
        data: result
      });
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode lookup failed:', err.message);
  }

  // 2. Fallback: Photon Komoot OSM Mirror
  try {
    const photonUrl = `https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`;
    const response = await fetch(photonUrl, {
      headers: {
        'User-Agent': 'TheCandleier/1.0',
        'Accept-Language': 'en'
      }
    });

    if (response.ok) {
      const pData = await response.json();
      const props = pData.features?.[0]?.properties || {};
      const line1 = [props.housenumber, props.street].filter(Boolean).join(' ') || props.name || '';
      const line2 = [props.district, props.locality].filter(Boolean).join(', ');
      const rawPostcode = (props.postcode || '').replace(/\D/g, '');
      const pincode = rawPostcode.length >= 6 ? rawPostcode.slice(0, 6) : rawPostcode;

      const result = {
        address1: line1,
        address2: line2,
        city: props.city || props.town || props.county || '',
        state: props.state || '',
        pincode: pincode,
        country: props.country || 'India'
      };

      return res.json({
        success: true,
        ...result,
        data: result
      });
    }
  } catch (pErr) {
    console.warn('Photon reverse geocode lookup failed:', pErr.message);
  }

  res.status(502).json({
    success: false,
    error: 'Unable to determine street address from location coordinates. Please enter your address manually.'
  });
});

// Indian PIN code courier availability checker
app.get('/api/check-pincode', (req, res) => {
  const pincode = String(req.query.pincode || '').trim();
  const isValid = /^[1-9][0-9]{5}$/.test(pincode);

  if (!isValid) {
    return res.status(400).json({
      serviceable: false,
      error: 'Please enter a valid 6-digit Indian PIN code.'
    });
  }

  // Bluedart / Delhivery pan-India serviceability coverage
  res.json({
    serviceable: true,
    pincode,
    courier: 'Bluedart & Delhivery Express',
    estimatedDays: '2–4 Business Days',
    codAvailable: true,
    message: 'Express Botanical Delivery is available at your PIN code.'
  });
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Route handlers for clean paths (e.g. /about instead of /about-us.html if requested)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for missing routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`The Candleier server running at http://0.0.0.0:${PORT}`);
});
