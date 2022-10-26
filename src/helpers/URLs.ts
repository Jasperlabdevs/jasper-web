const baseUrl = " https://api-staging.calljasper.com/api/v1/";
const URL = {
  registerManager: baseUrl + "community_manager_register/",
  login: baseUrl + "signin/",
  logout: baseUrl + "logout/",

  communityTypes: baseUrl + "community/community_type/",
  occupantTypes: baseUrl + "community/occupancy_type/",

  chooseOccupancyType: baseUrl + "community/choose_occupancy_type/",
  getOccupancyType: baseUrl + "community/community_occupancy_type/",
  selectableOccupancyTypes: baseUrl + "community/selectable_occupancy_type/",

  validateEmail: baseUrl + "validate_email/",
  resetPassword: baseUrl + "reset_password/",
  forgotPassword: baseUrl + "forgot_password/",

  changePassword: baseUrl + "change_password/",

  editProfile: baseUrl + "me/",
  getUser: baseUrl + "me/",
  verifyGate: baseUrl + "gate/verify_access_code/",

  identification: baseUrl + "gate/verify_access_identification/",
  entryGate: baseUrl + "gate/verify_access_entry/",
  exitGate: baseUrl + "gate/verify_access_exit/",

  getGates: baseUrl + "gate/",
  getAllGates: baseUrl + "gate/community_gates/",
  community: baseUrl + "community/",
  gate: baseUrl + "gate/",
  unested_gate: baseUrl + "gate/available_gates_to_be_nested/",
  communityGate: baseUrl + "community_gates/",
  denestGate: baseUrl + "gate/remove_nested_gate/",
  toggleGate: baseUrl + "gate/change_active_state/",
  loginGate: baseUrl + "gate/login/",

  access: baseUrl + "access/",
  updateAccessCode: baseUrl + "access/update_access_code/",
  communityAccessHistory: baseUrl + "access/get_all_community_access_history/",
  userAccessHistory: baseUrl + "access/get_all_user_access_history/",

  accessHistorySearchFilter: baseUrl + "access/search_filter/",

  accessRules: baseUrl + "access/create_rules/",
  communityAccessRules: baseUrl + "access/rules/",

  userNotificationSettings: baseUrl + "user_notification_settings/",

  overview: baseUrl + "overview/",
  notifications: baseUrl + "user_notifications/",

  banks: baseUrl + "banks/",
  submitBank: baseUrl + "community/submit_bank_account/",
  verifyAccount: baseUrl + "verify_account/",
  payment: baseUrl + "payment_request/",
  paymentDetails: baseUrl + "payment_request_details/",
  transactionHistory: baseUrl + "transaction_history/",
  transactionHistorySearch: baseUrl + "transaction_history_search/",

  addRemoveRecepients: baseUrl + "add_or_remove_payment_recipients/",

  markPaymentComplete: baseUrl + "mark_payment_complete/",
  sendPaymentReminder: baseUrl + "send_payment_reminder/",

  communityMembers: baseUrl + "community/member/",

  communityMemberSearchFilter: baseUrl + "community_member/?",
};

export default URL;
