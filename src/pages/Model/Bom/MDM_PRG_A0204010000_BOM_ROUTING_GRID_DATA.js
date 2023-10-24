import { ValueType } from "realgrid";

export const fields = [
    {
        fieldName: "Company",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "Site",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ItemCode",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "OpSeq",
        dataType: ValueType.NUMBER,
    },
    {
        fieldName: "Oper",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "StdOper",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "EffectivityDate",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "CreateUserId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "CreateDate",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "UpdateUserId",
        dataType: ValueType.TEXT,
    },{
        fieldName: "UpdateDate",
        dataType: ValueType.TEXT,
    }
];

export const columns = [
    {
        name: "Company",
        fieldName: "Company",
        width: "80",
        header: {
            text: "법인",
        },
    },
    {
        name: "Site",
        fieldName: "Site",
        width: "80",
        header: {
            text: "회계법인",
        },
    },
    {
        name: "ItemCode",
        fieldName: "ItemCode",
        width: "150",
        header: {
            text: "모코드",
        },
    },
    {
        name: "OpSeq",
        fieldName: "OpSeq",
        width: "80",
        header: {
            text: "공정순서",
        },
    },
    {
        name: "Oper",
        fieldName: "Oper",
        width: "100",
        header: {
            text: "공정",
        },
    },
    {
        name: "StdOper",
        fieldName: "StdOper",
        width: "100",
        header: {
            text: "표준공정",
        },
    },
    {
        name: "EffectivityDate",
        fieldName: "EffectivityDate",
        width: "150",
        header: {
            text: "유효 시작일",
        },
    },
    {
        name: "DisableDate",
        fieldName: "DisableDate",
        width: "150",
        header: {
            text: "무효 시작일",
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
        name: "CreateDate",
        fieldName: "CreateDate",
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
        name: "UpdateDate",
        fieldName: "UpdateDate",
        width: "150",
        header: {
            text: "수정일",
        },
    },
];

export const options = {};