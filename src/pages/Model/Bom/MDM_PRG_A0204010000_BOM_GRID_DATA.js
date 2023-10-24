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
        fieldName: "ParentItemCode",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ChildItemCode",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "OpSeq",
        dataType: ValueType.NUMBER,
    },
    {
        fieldName: "Oper",
        dataType: ValueType.NUMBER,
    },
    {
        fieldName: "RatioQty",
        dataType: ValueType.NUMBER,
    },
    {
        fieldName: "WareHouse",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "SupplyType",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ItemSeq",
        dataType: ValueType.NUMBER,
    },
    {
        fieldName: "EffectivityDate",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "DisableDate",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "ResultWareHouse",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "PccYieldRate",
        dataType: ValueType.NUMBER,
    },
    {
        fieldName: "ProdYieldRate",
        dataType: ValueType.NUMBER,
    },
    {
        fieldName: "OracleYieldRate",
        dataType: ValueType.NUMBER,
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
        name: "ParentItemCode",
        fieldName: "ParentItemCode",
        width: "150",
        header: {
            text: "모코드",
        },
    },
    {
        name: "ChildItemCode",
        fieldName: "ChildItemCode",
        width: "150",
        header: {
            text: "자코드",
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
        name: "RatioQty",
        fieldName: "RatioQty",
        width: "100",
        header: {
            text: "소요량",
        },
    },
    {
        name: "WareHouse",
        fieldName: "WareHouse",
        width: "100",
        header: {
            text: "창고",
        },
    },
    {
        name: "SupplyType",
        fieldName: "SupplyType",
        width: "100",
        header: {
            text: "공급유형",
        },
    },
    {
        name: "ItemSeq",
        fieldName: "ItemSeq",
        width: "80",
        header: {
            text: "순서",
        },
    },
    {
        name: "EffectivityDate",
        fieldName: "EffectivityDate",
        width: "100",
        header: {
            text: "유효 시작일",
        },
    },

    {
        name: "DisableDate",
        fieldName: "DisableDate",
        width: "100",
        header: {
            text: "무효 시작일",
        },
    },
    {
        name: "ResultWareHouse",
        fieldName: "ResultWareHouse",
        width: "100",
        header: {
            text: "결과 창고",
        },
    },
    {
        name: "PccYieldRate",
        fieldName: "PccYieldRate",
        width: "100",
        header: {
            text: "PCC 지정 여유율",
        },
    },
    {
        name: "ProdYieldRate",
        fieldName: "ProdYieldRate",
        width: "100",
        header: {
            text: "생산 지정 여유율",
        },
    },
    {
        name: "OracleYieldRate",
        fieldName: "OracleYieldRate",
        width: "100",
        header: {
            text: "ERP 지정 여유율",
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