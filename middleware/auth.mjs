import jwt from 'jsonwebtoken';
import axios from 'axios';

let clerkPublicKey = null; // Cache the public key to avoid fetching it on every request

// Function to retrieve Clerk's public key from JWKS endpoint
const getClerkPublicKey = async () => {
  if (!clerkPublicKey) {
    try {
      const response = await axios.get('https://funny-whippet-86.clerk.accounts.dev/.well-known/jwks.json');
      // Extract the first key (assuming it's a single key JWKS)
      const jwk = response.data.keys[0];
      clerkPublicKey = `-----BEGIN CERTIFICATE-----\n${jwk.x5c[0]}\n-----END CERTIFICATE-----`;
    } catch (error) {
      console.error('Failed to retrieve Clerk public key:', error);
      throw new Error('Could not retrieve Clerk public key');
    }
  }
  return clerkPublicKey;
};

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Fetch Clerk’s public key to verify the JWT
    const publicKey = await getClerkPublicKey();

    // Verify the token using the Clerk public key
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
