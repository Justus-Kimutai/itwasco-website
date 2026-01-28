// Authentication helper with HMAC-signed session tokens
import { createHmac, timingSafeEqual } from 'node:crypto';

const ADMIN_USERNAME = import.meta.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD || 'itwasco2024';
const JWT_SECRET = import.meta.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function verifyCredentials(username: string, password: string): boolean {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

function sign(payload: string): string {
    return createHmac('sha256', JWT_SECRET).update(payload).digest('hex');
}

// Create an HMAC-signed session token
export function createSessionToken(): string {
    const payload = Buffer.from(JSON.stringify({
        user: 'admin',
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    })).toString('base64url');

    const signature = sign(payload);
    return `${payload}.${signature}`;
}

// Verify session token signature and expiration
export function verifySessionToken(token: string): boolean {
    try {
        const [payload, signature] = token.split('.');
        if (!payload || !signature) return false;

        // Verify signature using timing-safe comparison
        const expected = sign(payload);
        const sigBuffer = Buffer.from(signature, 'utf8');
        const expectedBuffer = Buffer.from(expected, 'utf8');
        if (sigBuffer.length !== expectedBuffer.length) return false;
        if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

        // Verify expiration
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
        return data.user === 'admin' && data.exp > Date.now();
    } catch {
        return false;
    }
}

// Check if request is authenticated
export function isAuthenticated(request: Request): boolean {
    const cookies = request.headers.get('cookie') || '';
    const match = cookies.match(/admin_session=([^;]+)/);
    if (!match) return false;
    return verifySessionToken(match[1]);
}
