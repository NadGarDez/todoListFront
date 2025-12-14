export const CLIENT_ID = '4g18cqrugc9kv0tdev8vhsgieh';
export const COGNITO_DOMAIN = "https://us-east-2tr2vhtad9.auth.us-east-2.amazoncognito.com";
export const LOGOUT_URL = "http://localhost:5173/logout";
export const AUTHORITY = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_TR2vhtAD9";
export const LOGIN_URL = 'http://localhost:5173/'

export const cognitoAuthConfig = {
    authority: AUTHORITY,
    client_id: CLIENT_ID,
    redirect_uri: LOGIN_URL,
    response_type: "code",
    scope: "phone openid email",
};