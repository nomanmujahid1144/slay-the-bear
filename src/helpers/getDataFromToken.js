import jwt from 'jsonwebtoken';

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get('token')?.value || "";
        if (token.length > 0) {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            return decodedToken.id;
        }else{
            return null
        }
    } catch (error) {
        throw new Error(error.message)
    }
}