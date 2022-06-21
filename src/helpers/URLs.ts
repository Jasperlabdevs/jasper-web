const baseUrl = " https://jasper-api-staging.herokuapp.com/api/v1/";
const URL = {
  registerManager: baseUrl + "community_manager_register/",
  login: baseUrl + "signin/",
  logout: baseUrl + "logout/",

  communityTypes: baseUrl + "community/community_type/",

  validateEmail: baseUrl + "validate_email/",
  resetPassword: baseUrl + "reset_password/",
  forgotPassword: baseUrl + "forgot_password/",

  changePassword: baseUrl + "change_password/",

  editProfile: baseUrl + "me/",
  getUser: baseUrl + "me/",

  community: baseUrl + "community/",
  gate: baseUrl + "gate/",
  communityGate: baseUrl + "community_gates/",

  toggleGate: baseUrl + "gate/change_active_state/",
  loginGate: baseUrl + "gate/login/",
};

export default URL;
