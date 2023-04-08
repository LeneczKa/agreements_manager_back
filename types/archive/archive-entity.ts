export interface SimpleArchiveAgreementEntity {
    id: string,
    institutionName: string,
    institutionCity: string,
    agreementNo: string,
    executionDate: string,
    reportId: string,
}

export interface ArchiveAgreementEntity extends SimpleArchiveAgreementEntity {
    institutionStreet: string,
    agreementNo: string,
    agreementEndDate: string,
    institutionZipCode: string,
    personForContact: string,
    personForContactMail: string,
    personForContactPhone: string,
    offerSendingDate: string,
    agreementStartDate: string,
    reportDate: string,
    invoiceAmount: number,
    invoiceDate: string,
    responseDate: string,
    employeeId1: string,
    employeeId2: string,
    notes: string,
}