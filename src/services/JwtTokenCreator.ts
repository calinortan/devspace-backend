import { encode } from 'jwt-simple';
const config = require('../../config');

export interface ITokenPayload {
    iss: string,
    iat: number
}
class JwtTokenCreator {
    public static generateToken(iss: string, iat: number): string {
        const payload: ITokenPayload = {iss, iat};
        return encode(payload, config.secret);
    }
}

export default JwtTokenCreator;