export interface IUser {
  userId: string
  userName: string
  firstName: string
  lastName: string
  email: string
  status: string
  lastLoginAt: string
  contacts: any[]
  addresses: any[]
  listCustomFields: IListCustomField[]
  employmentDetails: any[]
  memberships: IMembership[]
  kycDetails: IKycDetails
  apps: IApp[]
  listRoles: string[]
  permissions: any[]
  createdAt: string
  passwordExpired: boolean
  updatedAt: string
}

export interface IListCustomField {
  customFieldId: string
  customKey: string
  customValue: string
}

export interface IMembership {
  membershipId: string
  organisationId: string
  roleName: string
  token: string
}

export interface IKycDetails {
  documents: any[]
}

export interface IApp {
  appName: string
}

export interface IStatus {
  code: string
  message: string
}

export interface IPaging {
  pageNum: number
  pageSize: number
  dateType?: string
  sortBy?: string
  ordering?: string
  fromDate?: string
  toDate?: string
  keyword?: string
}

export interface IInvoice {
  invoiceId: string
  invoiceNumber: string
  referenceNo: string
  type: string
  currency: string
  invoiceDate: string
  createdAt: string
  dueDate: string
  status: InvoiceStatus[]
  subStatus: any[]
  numberOfDocuments: number
  totalTax: number
  totalAmount: number
  balanceAmount: number
  description: string
  totalPaid: number
  invoiceSubTotal: number
  customFields: InvoiceCustomField[]
  totalDiscount: number
  extensions: any[]
  version: string
  customer: ICustomer
  merchant: IMerchant
  invoiceGrossTotal: number
}

export interface InvoiceStatus {
  key: string
  value: boolean
}

export interface InvoiceCustomField {
  key: string
  value: string
}

export interface ICustomer {
  id: string
  firstName: string
  lastName: string
  name: string
  addresses: any[]
}

export interface IMerchant {
  id: string
}

export interface IPagingServer {
  pageNumber: number
  pageSize: number
  totalRecords: number
}
