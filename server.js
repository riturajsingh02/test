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

// Reverse geocode proxy for current location detection powered by Google Maps
app.get('/api/reverse-geocode', async (req, res) => {
  const { lat, lng } = req.query;
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ success: false, error: 'Invalid latitude or longitude coordinates provided.' });
  }

  const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCriOZym4bzKhht6AoTpMtC1CUkToNbgYA';

  // 1. Primary High-Accuracy: Google Maps Geocoding API
  if (googleMapsKey) {
    try {
      const gUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${encodeURIComponent(googleMapsKey)}&solution_id=gmp_git_agentskills_v1`;
      const gResp = await fetch(gUrl);
      if (gResp.ok) {
        const gData = await gResp.json();
        if (gData.status === 'OK' && Array.isArray(gData.results) && gData.results.length > 0) {
          const primaryResult = gData.results[0];
          const components = primaryResult.address_components || [];

          const getComp = (type, useShort = false) => {
            const match = components.find(item => item.types.includes(type));
            return match ? (useShort ? match.short_name : match.long_name) : '';
          };

          const streetNumber = getComp('street_number') || getComp('premise') || getComp('subpremise');
          const route = getComp('route');
          const neighborhood = getComp('neighborhood');
          const sublocality2 = getComp('sublocality_level_2');
          const sublocality1 = getComp('sublocality_level_1') || getComp('sublocality');
          const locality = getComp('locality') || getComp('administrative_area_level_3') || getComp('administrative_area_level_2');
          const state = getComp('administrative_area_level_1');
          const rawPostal = getComp('postal_code').replace(/\D/g, '');
          const pincode = rawPostal.length >= 6 ? rawPostal.slice(0, 6) : rawPostal;
          const country = getComp('country') || 'India';

          let line1 = [streetNumber, route].filter(Boolean).join(' ');
          if (!line1) {
            line1 = sublocality2 || getComp('point_of_interest') || primaryResult.formatted_address.split(',')[0] || '';
          }

          const line2Items = [
            (sublocality2 && !line1.includes(sublocality2)) ? sublocality2 : '',
            sublocality1,
            neighborhood
          ].filter(Boolean).filter((item, idx, arr) => arr.indexOf(item) === idx && !line1.includes(item));

          const line2 = line2Items.join(', ');

          const result = {
            provider: 'google_maps',
            formattedAddress: primaryResult.formatted_address,
            address1: line1,
            address2: line2,
            city: locality,
            state: state,
            pincode: pincode,
            country: country
          };

          return res.json({
            success: true,
            ...result,
            data: result
          });
        }
      }
    } catch (gErr) {
      console.warn('Google Maps reverse geocoding request error:', gErr.message);
    }
  }

  // 2. Fallback: Nominatim OpenStreetMap
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
        provider: 'osm',
        formattedAddress: data.display_name || '',
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

  // 3. Fallback: Photon Komoot OSM Mirror
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
        provider: 'photon',
        formattedAddress: '',
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

// Client Maps config
app.get('/api/maps-config', (req, res) => {
  const key = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCriOZym4bzKhht6AoTpMtC1CUkToNbgYA';
  res.json({ apiKey: key });
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
