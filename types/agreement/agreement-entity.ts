export interface NewAgreementEntity extends Omit<AgreementEntity, 'id' | 'count'> {
    id?: string,
    count?: number,
}

export interface SimpleAgreementEntity {
    id: string,
    institutionName: string,
    institutionCity: string,
    institutionStreet: string,
    agreementNo?: string,
    agreementEndDate?: string,
    executionDate?: string,
    reportId?: string,
    count: number,
}

export interface AgreementEntity extends SimpleAgreementEntity {
    institutionZipCode: string,
    personForContact: string,
    personForContactMail: string,
    personForContactPhone?: string,
    offerSendingDate?: string,
    agreementStartDate?: string,
    reportDate?: string,
    invoiceAmount?: number,
    invoiceDate?: string,
    responseDate: string,
    employeeId1: string,
    employeeId2: string,
    notes?: string,
    count: number,
}


