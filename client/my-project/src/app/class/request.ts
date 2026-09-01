export type RequestStatus = 'בהמתנה' | 'אושר' | 'נדחה';

export const STUDY_MAJORS = ['מדעי המחשב', 'הנדסה', 'כלכלה', 'פסיכולוגיה'] as const;
export type StudyMajor = typeof STUDY_MAJORS[number];

export const BANK_NAMES = ['לאומי', 'הפועלים', 'מזרחי טפחות', 'דיסקונט', 'בינלאומי'] as const;
export type BankName = typeof BANK_NAMES[number];

export interface PersonalDetails {
  birthDate: string;
  city: string;
  address: string;
  mobilePhone: string;
  homePhone?: string;
}

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
}

export interface FamilyDetails {
  father: FamilyMember;
  mother: FamilyMember;
  siblingsUnder18: number;
  siblingsOver21WithMoreThanOneChild: number;
}

export interface StudyDetails {
  major: StudyMajor;
  schoolName: string;
  yearsOfStudy: number;
  annualTuition: number;
}

export interface BankDetails {
  ownerId: string;
  bankName: BankName;
  branchNumber: string;
  accountNumber: string;
}

export interface CreateGrantRequest {
  personalDetails: PersonalDetails;
  familyDetails: FamilyDetails;
  studyDetails: StudyDetails;
  bankDetails: BankDetails;
}

export interface CreateGrantResponse {
  message: string;
  requestId: string;
}

export interface MyStatusResponse {
  requestId: string;
  status: RequestStatus;
}

// Row shape returned by GET /request/admin/all
export interface GrantRequestSummary {
  requestId: string;
  userId: string;
  firstName: string;
  lastName: string;
  major: StudyMajor;
  status: RequestStatus;
}

// Full document returned by GET /request/admin/request/:id
export interface GrantRequestDetail extends CreateGrantRequest {
  _id: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  userRef: {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
  };
}

export interface RequestFilters {
  city?: string;
  minTuition?: number;
  maxTuition?: number;
  minSiblings?: number;
  maxSiblings?: number;
  fromDate?: string;
  toDate?: string;
  userId?: string;
}

export interface UpdateStatusResponse {
  message: string;
  request: GrantRequestDetail;
}
