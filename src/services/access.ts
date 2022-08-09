import axios from "axios";
import URL from "helpers/URLs";
import { getToken } from "helpers/utils";

export type TAccessRuleRequestBody = {
  visitor_entry_and_exit: boolean;
  identity_verification: boolean;
  enable_secondary_gate_access: boolean;
  allow_users_generate_multiple_access_codes: boolean;
  allow_users_request_multiple_access_codes: boolean;
  allow_users_generate_onetime_access_codes: boolean;
  allow_users_generate_event_access_codes: boolean;
  allow_users_generate_recurring_access_codes: boolean;
  occupancy_type_allowed_to_generate_onetime_access_codes: string[];
  occupancy_type_allowed_to_generate_event_access_codes: string[];
  occupancy_type_allowed_to_generate_recurring_access_codes: string[];
  occupancy_type_allowed_to_generate_multiple_access_codes: string[];
  occupancy_type_allowed_to_request_multiple_access_codes: string[];
  additional_information: Array<{
    additional_information: string;
    make_required: string;
    selected: boolean;
  }>;
};

export const DEFAULT_RULES: TAccessRuleRequestBody = {
  visitor_entry_and_exit: false,
  identity_verification: false,
  enable_secondary_gate_access: true,
  allow_users_generate_multiple_access_codes: false,
  allow_users_request_multiple_access_codes: false,
  allow_users_generate_onetime_access_codes: true,
  allow_users_generate_event_access_codes: true,
  allow_users_generate_recurring_access_codes: true,
  occupancy_type_allowed_to_generate_onetime_access_codes: [],
  occupancy_type_allowed_to_generate_event_access_codes: [],
  occupancy_type_allowed_to_generate_recurring_access_codes: [],
  occupancy_type_allowed_to_generate_multiple_access_codes: [],
  occupancy_type_allowed_to_request_multiple_access_codes: [],
  additional_information: [
    {
      additional_information: "Visitor Company",
      make_required: "not required",
      selected: false,
    },
    {
      additional_information: "Visitor Type",
      make_required: "not required",
      selected: false,
    },
    {
      additional_information: "Requesting Department",
      make_required: "not required",
      selected: false,
    },
    {
      additional_information: "Reason for visiting",
      make_required: "not required",
      selected: false,
    },
  ],
};

const configuration = () => {
  const token = getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
};

export const setAccessRules = (
  data: TAccessRuleRequestBody = DEFAULT_RULES
) => {
  let config = configuration();
  const {
    visitor_entry_and_exit,
    identity_verification,
    enable_secondary_gate_access,
    allow_users_generate_multiple_access_codes,
    allow_users_request_multiple_access_codes,
    allow_users_generate_onetime_access_codes,
    allow_users_generate_event_access_codes,
    allow_users_generate_recurring_access_codes,
    occupancy_type_allowed_to_generate_onetime_access_codes,
    occupancy_type_allowed_to_generate_event_access_codes,
    occupancy_type_allowed_to_generate_recurring_access_codes,
    occupancy_type_allowed_to_generate_multiple_access_codes,
    occupancy_type_allowed_to_request_multiple_access_codes,
    additional_information,
  } = data;
  return axios.post(
    URL.accessRules,
    {
      visitor_entry_and_exit,
      identity_verification,
      enable_secondary_gate_access,
      allow_users_generate_multiple_access_codes,
      allow_users_request_multiple_access_codes,
      allow_users_generate_onetime_access_codes,
      allow_users_generate_event_access_codes,
      allow_users_generate_recurring_access_codes,
      occupancy_type_allowed_to_generate_onetime_access_codes,
      occupancy_type_allowed_to_generate_event_access_codes,
      occupancy_type_allowed_to_generate_recurring_access_codes,
      occupancy_type_allowed_to_generate_multiple_access_codes,
      occupancy_type_allowed_to_request_multiple_access_codes,
      additional_information,
    },
    config
  );
};

export const updateAccessRules = ({
  visitor_entry_and_exit,
  identity_verification,
  enable_secondary_gate_access,
  allow_users_generate_multiple_access_codes,
  allow_users_request_multiple_access_codes,
  allow_users_generate_onetime_access_codes,
  allow_users_generate_event_access_codes,
  allow_users_generate_recurring_access_codes,
  occupancy_type_allowed_to_generate_onetime_access_codes,
  occupancy_type_allowed_to_generate_event_access_codes,
  occupancy_type_allowed_to_generate_recurring_access_codes,
  occupancy_type_allowed_to_generate_multiple_access_codes,
  occupancy_type_allowed_to_request_multiple_access_codes,
  additional_information,
}: TAccessRuleRequestBody) => {
  let config = configuration();

  return axios.post(
    URL.communityAccessRules,
    {
      visitor_entry_and_exit,
      identity_verification,
      enable_secondary_gate_access,
      allow_users_generate_multiple_access_codes,
      allow_users_request_multiple_access_codes,
      allow_users_generate_onetime_access_codes,
      allow_users_generate_event_access_codes,
      allow_users_generate_recurring_access_codes,
      occupancy_type_allowed_to_generate_onetime_access_codes,
      occupancy_type_allowed_to_generate_event_access_codes,
      occupancy_type_allowed_to_generate_recurring_access_codes,
      occupancy_type_allowed_to_generate_multiple_access_codes,
      occupancy_type_allowed_to_request_multiple_access_codes,
      additional_information,
    },
    config
  );
};

export const getCommunityAccessRules = () => {
  let config = configuration();
  return axios.get(URL.communityAccessRules, config);
};

export const createEventAccess = (data: any) => {
  let config = configuration();
  return axios.post(URL.access, { ...data }, config);
};

export const getCommunityAccessHistory = () => {
  let config = configuration();
  return axios.get(URL.communityAccessHistory, config);
};

export const accessHistorySearchHistory = (data: any) => {
  let config = configuration();
  return axios.post(URL.accessHistorySearchFilter, data, config);
};

export const disableAccessCode = (data:any) => {
  let config = configuration()
  return axios.post(URL.updateAccessCode, data, config)
}