import { ValueType } from "realgrid";

export const fields = [
    {
        fieldName: "ModelName",
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
        fieldName: "PoId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "Season",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "LastCode",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "DevLastCode",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "Category1",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "Category2",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "Category3",
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
        name: "ModelName",
        fieldName: "ModelName",
        width: "100",
        header: {
            text: "Model",
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
        name: "PoId",
        fieldName: "PoId",
        width: "100",
        header: {
            text: "P/O ID",
        },
    },
    {
        name: "Season",
        fieldName: "Season",
        width: "100",
        header: {
            text: "시즌",
        },
    },
    {
        name: "LastCode",
        fieldName: "LastCode",
        width: "100",
        header: {
            text: "LAST",
        },
    },
    {
        name: "DevLastCode",
        fieldName: "DevLastCode",
        width: "100",
        header: {
            text: "DevLAST",
        },
    },
    {
        name: "Category1",
        fieldName: "Category1",
        width: "100",
        header: {
            text: "CATEGORY코드",
        },
    },
    {
        name: "Category2",
        fieldName: "Category2",
        width: "100",
        header: {
            text: "SUB_CATEGORY2_코드",
        },
    },
    {
        name: "Category3",
        fieldName: "Category3",
        width: "100",
        header: {
            text: "SUB_CATEGORY3_코드",
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