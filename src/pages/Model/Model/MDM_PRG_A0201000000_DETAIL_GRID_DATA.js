import { ValueType } from "realgrid";

export const fields = [
    {
        fieldName: "Company",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ModelId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "Gender",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "LAST",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "SizeUpDownType",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "VersionId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "UseYn",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ConfirmType",
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
        name: "Company",
        fieldName: "Company",
        width: "100",
        header: {
            text: "Company",
        },
    },
    {
        name: "ModelId",
        fieldName: "ModelId",
        width: "100",
        header: {
            text: "ModelId",
        },
    },
    {
        name: "Gender",
        fieldName: "Gender",
        width: "100",
        header: {
            text: "Gender",
        },
    },
    {
        name: "LAST",
        fieldName: "LAST",
        width: "100",
        header: {
            text: "LAST",
        },
    },
    {
        name: "SizeUpDownType",
        fieldName: "SizeUpDownType",
        width: "100",
        header: {
            text: "SizeUpDownType",
        },
    },
    {
        name: "VersionId",
        fieldName: "VersionId",
        width: "100",
        header: {
            text: "VersionId",
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