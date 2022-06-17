type HeaderDataType = {
  id: number;
  title: string;
  link?: string;
};

type SidebarDataType = {
  icon: string;
} & HeaderDataType;

type ChecklistDataType = {
  id: number;
  name: string;
  checked?: boolean;
};
type ConfigurationDataType = {
  id: number;
  title: string;
  description: string;
  hasCheckList?: boolean;
};

export const headerData: HeaderDataType[] = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Settings",
    link: "/settings",
  },
  {
    id: 3,
    title: "Grant Access",
    link: "/grant_access",
  },
  {
    id: 4,
    title: "Community",
    link: "/community",
  },
  {
    id: 5,
    title: "Message Credits",
    link: "/message_credits",
  },
  {
    id: 6,
    title: "Gates",
    link: "/gates",
  },
];
export const settingsHeaderData: HeaderDataType[] = [
  {
    id: 1,
    title: "Onboarding",
    link: "onboarding",
  },
  {
    id: 2,
    title: "Access Rules",
    link: "access_rules",
  },
  {
    id: 3,
    title: "Community Account",
    link: "community_account",
  },
  {
    id: 4,
    title: "Admin Account",
    link: "admin_account",
  },
  {
    id: 5,
    title: "Push Notifications",
    link: "push_notifications",
  },
];
export const accessHeaderData: HeaderDataType[] = [
  {
    id: 1,
    title: "One Time Access",
    link: "one_time_access",
  },
  {
    id: 2,
    title: "Reccuring Access",
    link: "recurring_access",
  },
  {
    id: 3,
    title: "Event Access",
    link: "event_access",
  },
  {
    id: 4,
    title: "Multiple Access",
    link: "multiple_access",
  },
  {
    id: 5,
    title: "Access History",
    link: "access_history",
  },
];
export const communityHeaderData: HeaderDataType[] = [
  {
    id: 1,
    title: "Feed",
    link: "feed",
  },
  {
    id: 2,
    title: "Chat",
    link: "chat",
  },
  {
    id: 3,
    title: "Issues",
    link: "issues",
  },
  {
    id: 4,
    title: "Members",
    link: "members",
  },
  {
    id: 5,
    title: "Community Access History",
    link: "community_access_history",
  },
  {
    id: 6,
    title: "Staff Directory",
    link: "staff_directory",
  },
  {
    id: 7,
    title: "Manage Access Requests",
    link: "manage_access_requests",
  },
  {
    id: 8,
    title: "Collect Payments",
    link: "collect_payments",
  },
];

export const sidebarData: SidebarDataType[] = [
  {
    id: 1,
    title: "Onboarding",
    icon: "people",
  },
  {
    id: 2,
    title: "Access Rules",
    icon: "lock",
  },
  {
    id: 3,
    title: "Community Account",
    icon: "community",
  },
  {
    id: 4,
    title: "Admin Account",
    icon: "account",
  },
  {
    id: 5,
    title: "Notifications",
    icon: "notif",
  },
];

export const checklistData: ChecklistDataType[] = [
  {
    id: 1,
    name: "Tenant",
    checked: true,
  },
  {
    id: 2,
    name: "Developer",
  },
  {
    id: 3,
    name: "Facility Manager",
  },
  {
    id: 4,
    name: "Property Owner",
  },
  {
    id: 5,
    name: "Landloard",
  },
  {
    id: 6,
    name: "Guest",
  },
];

export const NigeriaStates = [
  {
    name: "Abia",
    shortCode: "AB",
  },
  {
    name: "Abuja Federal Capital Territory",
    shortCode: "FC",
  },
  {
    name: "Adamawa",
    shortCode: "AD",
  },
  {
    name: "Akwa Ibom",
    shortCode: "AK",
  },
  {
    name: "Anambra",
    shortCode: "AN",
  },
  {
    name: "Bauchi",
    shortCode: "BA",
  },
  {
    name: "Bayelsa",
    shortCode: "BY",
  },
  {
    name: "Benue",
    shortCode: "BE",
  },
  {
    name: "Borno",
    shortCode: "BO",
  },
  {
    name: "Cross River",
    shortCode: "CR",
  },
  {
    name: "Delta",
    shortCode: "DE",
  },
  {
    name: "Ebonyi",
    shortCode: "EB",
  },
  {
    name: "Edo",
    shortCode: "ED",
  },
  {
    name: "Ekiti",
    shortCode: "EK",
  },
  {
    name: "Enugu",
    shortCode: "EN",
  },
  {
    name: "Gombe",
    shortCode: "GO",
  },
  {
    name: "Imo",
    shortCode: "IM",
  },
  {
    name: "Jigawa",
    shortCode: "JI",
  },
  {
    name: "Kaduna",
    shortCode: "KD",
  },
  {
    name: "Kano",
    shortCode: "KN",
  },
  {
    name: "Katsina",
    shortCode: "KT",
  },
  {
    name: "Kebbi",
    shortCode: "KE",
  },
  {
    name: "Kogi",
    shortCode: "KO",
  },
  {
    name: "Kwara",
    shortCode: "KW",
  },
  {
    name: "Lagos",
    shortCode: "LA",
  },
  {
    name: "Nassarawa",
    shortCode: "NA",
  },
  {
    name: "Niger",
    shortCode: "NI",
  },
  {
    name: "Ogun",
    shortCode: "OG",
  },
  {
    name: "Ondo",
    shortCode: "ON",
  },
  {
    name: "Osun",
    shortCode: "OS",
  },
  {
    name: "Oyo",
    shortCode: "OY",
  },
  {
    name: "Plateau",
    shortCode: "PL",
  },
  {
    name: "Rivers",
    shortCode: "RI",
  },
  {
    name: "Sokoto",
    shortCode: "SO",
  },
  {
    name: "Taraba",
    shortCode: "TA",
  },
  {
    name: "Yobe",
    shortCode: "YO",
  },
  {
    name: "Zamfara",
    shortCode: "ZA",
  },
];

export const configurationData: ConfigurationDataType[] = [
  {
    id: 1,
    title: "Capture Visitor Entry and Exit",
    description: "Confirm entry/exit before granting access",
    hasCheckList: false,
  },
  {
    id: 2,
    title: "Identity Verification",
    description: "Confirm visitor ID before granting access",
  },
  {
    id: 3,
    title: "Enable Secondary Gate Access",
    description:
      "This will be sent to all platform users on onboarding, prompting them to specify if they have a secondary gate.",
  },
  {
    id: 4,
    title: "Allow users to generate one-time access codes",
    description:
      "By turning on this toggle, you agree to confirm entry/exit before granting access",
    hasCheckList: true,
  },
  {
    id: 5,
    title: "Allow users to generate event access codes",
    description:
      "By turning on this toggle, you give users access to generate access codes for events",
    hasCheckList: true,
  },
  {
    id: 6,
    title: "Allow users to generate recurring access codes",
    description:
      "By turning on this toggle, you give users access to generate access codes for recurring events",
    hasCheckList: true,
  },
  {
    id: 7,
    title: "Allow users to generate multiple access codes",
    description:
      "By turning on this toggle, you give users access to generate mutiple access codes",
    hasCheckList: true,
  },
  {
    id: 8,
    title: "Allow users to request multiple access codes",
    description:
      "By turning on this toggle, you give users access to generate mutiple access codes",
    hasCheckList: true,
  },
];

export const TableContent = [
  {
    id: 1,
    additionalInfomation: "Visitor Company",
    requried: "Requried",
    select: true,
  },
  {
    id: 2,
    additionalInfomation: "Visitor Type",
    requried: "Requried",
    select: true,
  },
  {
    id: 3,
    additionalInfomation: "Visitor Department",
    requried: "Requried",
    select: true,
  },
  {
    id: 2,
    additionalInfomation: "Reason for visiting",
    requried: "Not Requried",
    select: false,
  },
];

export const incomingRequests = [
  {
    id: 1,
    name: "Tobi Oshowobi",
  },
  {
    id: 2,
    name: "Emmanuel Gabriel",
  },
  {
    id: 3,
    name: "Franca Nnenna",
  },
  {
    id: 4,
    name: "Olufunke Faweya",
  },
  {
    id: 5,
    name: "Kianna Durant",
  },
  {
    id: 6,
    name: "Doris Brown",
  },
];

export const posts = [
  {
    id: 1,
    user: "Chidinma Ukaegbu",
    userType: "admin",
    time: "5h",
    message:
      "Hello everyone, we would like to announce that due to the ongoing fuel scarcity, we would have to cut down on electricity supply for now. This is unexpected and we apologise fr the inconvenience caused.",
    likes: 22,
    dislike: 50,
    comments: 50,
  },
  {
    id: 2,
    user: "Chidinma Ukaegbu",
    userType: "admin",
    time: "2d",
    message:
      "Hello everyone, it’s that time of the year again! #Valentine. We are going to have a valentine party this weekend! Date and venue will be communicated soon! ",
    likes: 100,
    dislike: 2,
    comments: 30,
  },
  {
    id: 3,
    user: "Kiana Durant",
    userType: "tenant",
    time: "2mins",
    message:
      "I would like to inform everyone that some cats got into the estate, they’re eating out of the garbage, littering everywhere and making a huge mess. Please let’s ensure that our garbage is propery placed in the main garbage at the back. I’d also appreciate if the cats are taken care of. Thanks.",
    likes: 20,
    dislike: 10,
    comments: 30,
  },
];

export const communityTypeList = [
  {
    id: 1,
    option: "Residential Community",
    value: "residential_community",
  },
  {
    id: 2,
    option: "Hospitality & Events",
    value: "hospitality_events",
  },
  {
    id: 3,
    option: "Workplace / Office",
    value: "workplace_office",
  },
  {
    id: 4,
    option: "School",
    value: "school",
  },
  {
    id: 5,
    option: "Other",
    value: "other",
  },
];
