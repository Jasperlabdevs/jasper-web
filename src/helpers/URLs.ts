const baseUrl = " https://jasper-api-staging.herokuapp.com/api/v1/";
const URL = {
  registerManager: baseUrl + "community_manager_register/",
  login: baseUrl + "signin/",
  logout: baseUrl + "logout/",

  communityTypes: baseUrl + "community/community_type/",
  occuoantTypes: baseUrl + "community/occupancy_type/",

  chooseOccupancyType: baseUrl + "community/choose_occupancy_type/",
  getOccupancyType: baseUrl + "community/community_occupancy_type/",

  validateEmail: baseUrl + "validate_email/",
  resetPassword: baseUrl + "reset_password/",
  forgotPassword: baseUrl + "forgot_password/",

  changePassword: baseUrl + "change_password/",

  editProfile: baseUrl + "me/",
  getUser: baseUrl + "me/",
  verifyGate: baseUrl + "gate/pass_gate/",
  getGates: baseUrl + "gate/",
  getAllGates: baseUrl + "gate/community_gates/",
  community: baseUrl + "community/",
  gate: baseUrl + "gate/",
  communityGate: baseUrl + "community_gates/",
  denestGate: baseUrl + "gate/remove_nested_gate/",
  toggleGate: baseUrl + "gate/change_active_state/",
  loginGate: baseUrl + "gate/login/",

  access: baseUrl + "access/",
  communityAccessHistory: baseUrl + "access/get_all_community_access_history/",

  accessHistorySearchFilter: baseUrl + "access/search_filter/?",

  accessRules: baseUrl + "access/create_rules/",
};

export default URL;
