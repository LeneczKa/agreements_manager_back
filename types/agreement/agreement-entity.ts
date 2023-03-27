export interface NewAgreementEntity extends Omit<AgreementEntity, 'id'> {
    id?: string,
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
}

export interface AgreementEntity extends SimpleAgreementEntity {
    institutionZipCode: string,
    personForContact: string,
    personForContactEmail: string,
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
}

export interface SetEmployeeForAgreement {
    employeeId: string;
}