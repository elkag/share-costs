export const API_PREFIX = 'http://localhost:8080';
export const LOGIN_SERVICE_URL =  API_PREFIX + '/users/login';
export const REGISTER_SERVICE_URL = API_PREFIX + '/users/register';
export const LOGOUT_SERVICE_URL = API_PREFIX + '/users/logout';
export const USER_INFO_SERVICE_URL = API_PREFIX + '/auth/current';
export const GET_GROUPS_URL = API_PREFIX + '/groups/get-all';
export const GET_GROUP_URL = API_PREFIX + '/groups/get';
export const NEW_EXPENSE_API = API_PREFIX + '/payment/make-payment';
export const CREATE_GROUP_API = API_PREFIX + '/groups/create';
export const FIND_USER_URL = API_PREFIX + '/groups/find-new-members';
export const ADD_USER_URL = API_PREFIX + '/groups/add-user';
export const REMOVE_PENDING_USER_URL = API_PREFIX + '/groups/remove-user';
export const JOIN_GROUP_URL = API_PREFIX + '/groups/join';


// OAUTH2
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_PREFIX + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_PREFIX + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_PREFIX + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;