import { ValueType } from "realgrid";

export const fields = [
    {
        fieldName: "ModelId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ModelName",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ModelShortName",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "P_CARD_NAME",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "OsNo",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "MsNo",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "UseYn",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ConfirmYn",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ConfirmUserId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ConfirmDt",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "CreateUserId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "CreateDt",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "UpdateUserId",
        dataType: ValueType.TEXT,
    },{
        fieldName: "UpdateDt",
        dataType: ValueType.TEXT,
    }
];

export const columns = [
    {
        name: "ModelId",
        fieldName: "ModelId",
        width: "100",
        header: {
            text: "모델 ID",
        },
    },
    {
        name: "ModelName",
        fieldName: "ModelName",
        width: "250",
        header: {
            text: "모델명",
        },
    },
    {
        name: "ModelShortName",
        fieldName: "ModelShortName",
        width: "250",
        header: {
            text: "약식 모델명",
        },
    },
    {
        name: "P_CARD_NAME",
        fieldName: "P_CARD_NAME",
        width: "100",
        header: {
            text: "약식 P-Card 명",
        },
    },
    {
        name: "OsNo",
        fieldName: "OsNo",
        width: "100",
        header: {
            text: "OUTSOLE 번호",
        },
    },
    {
        name: "MsNo",
        fieldName: "MsNo",
        width: "100",
        header: {
            text: "MS 번호",
        },
    },
    {
        name: "UseYn",
        fieldName: "UseYn",
        width: "100",
        header: {
            text: "사용여부",
        },
    },
    {
        name: "ConfirmYn",
        fieldName: "ConfirmYn",
        width: "100",
        header: {
            text: "확정여부",
        },
    },
    {
        name: "ConfirmUserId",
        fieldName: "ConfirmUserId",
        width: "100",
        header: {
            text: "확정자",
        },
    },
    {
        name: "ConfirmDt",
        fieldName: "ConfirmDt",
        width: "100",
        header: {
            text: "확정일",
        },
    },
    {
        name: "CreateUserId",
        fieldName: "CreateUserId",
        width: "100",
        header: {
            text: "등록자",
        },
    },
    {
        name: "CreateDt",
        fieldName: "CreateDt",
        width: "150",
        header: {
            text: "등록일",
        },
    },
    {
        name: "UpdateUserId",
        fieldName: "UpdateUserId",
        width: "100",
        header: {
            text: "수정자",
        },
    },
    {
        name: "UpdateDt",
        fieldName: "UpdateDt",
        width: "150",
        header: {
            text: "수정일",
        },
    },
];

export const options = {};