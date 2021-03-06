export interface LoginInfo {
  accessCode: string;
  token?: string;
  sessionId?: string;
  userId?: string;
  requestId?: string;
  username: string;
  password: string;
  channel?: string;
}

export interface LoginDist {
  RequestId: string;
  Channel: string;
  username: string;
  password: string;
  SessionId: string;
}

export interface ResponsePrincipals {
  allPrincipals: AllPrincipal[];
  responseCode: string;
  responseDescription: string;
  requestId: string;
}

export interface ResponseUpload {
  responseCode: string;
  responseDescription: string;
  requestId: string;
}

export interface AllPrincipal {
  id: string;
  customerID: string;
  userID: string;
}

export interface ResponseDistributor {
  distributorCount: string;
  allDistributors: AllDistributor[];
  responseCode: string;
  responseDescription: string;
  requestId: string;
}

export interface AllDistributor {
  distributorName: string;
  distributorCode: string;
}

export interface ResponseDist {
  userId: string;
  distributorCode: string;
  distributorName: string;
  responseCode: string;
  responseDescription: string;
  requestId: string;
}

export interface User {
  requestId: string;
  responseCode: string;
  responseDescription: string;
  userInfor: UserDetails;
}

export interface Profiledist {
  responseCode: string;
  responseDescription: string;
  requestId: string;
}

export interface StockResponse {
  stockValue: string;
  tradeDebt: string;
  totalStock: string;
  distributorCode?: any;
  availedFacilityAmount: string;
  usedFacilityAmount: string;
  percentageUtilization: string;
  percentageEfficiency: string;
  distributorCount: string;
  responseCode: string;
  responseDescription: string;
  requestId: string;
}

export interface UserDetails {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  customerID: string;
  customerType: string;
  userLevel: number;
  status: boolean;
  roleID: number;
  pwdExpire: boolean;
  useToken: boolean;
  locked: boolean;
  requireQuestion: boolean;
  password: any;
  newPwd: any;
  confirmPwd: any;
  secretQuest: any;
  answer: any;
  encryptKey: any;
  userID: any;
  uploadType: any;
  fileType: any;
  filePath: any;
  lastLoginDate: Date;
  customerName: string;
  approvalStruct: string;
  decidePaymentMode: string;
  autoPay: string;
  useVendorList: any;
  pwdReset: boolean;
  alertOnUpload: string;
  nip: string;
  lastLogin: any;
  passwordResetDate: Date;
  userVendorList: string;
  sessionExpiry: number;
  sessionId: string;
  userIp: any;
  mAnswer: any;
  mQuestion: any;
  mRequireQuestion: boolean;
  strCustomerName: any;
  requestId?: any;
  responseCode?: any;
  responseDescription?: any;
}

export interface AllMonthlyStockDetail {
  month: string;
  stockValue: string;
  tradeDebt: string;
  totalStock: string;
  distributorCode?: any;
}

export interface FetchStockDetailsMonthly {
  allMonthlyStockDetails: AllMonthlyStockDetail[];
  responseCode: string;
  responseDescription: string;
  requestId: string;
}

