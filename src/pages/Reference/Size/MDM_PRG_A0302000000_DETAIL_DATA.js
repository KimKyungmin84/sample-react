import { ValueType } from "realgrid";

export const fields = [
  // CheckBar에 대한 설정 추가
  {
    fieldName: "stdSize",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gender",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sizeType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "size",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sampleSizeYn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "useYn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "confirmType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "confirmDt",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "createUserId",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "createDt",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "updateUserId",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "updateDt",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "loadDt",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "stdSize",
    fieldName: "stdSize",
    width: "100",
  },
  {
    name: "gender",
    fieldName: "gender",
    width: "100",
  },
  {
    name: "sizeType",
    fieldName: "sizeType",
    width: "100",
  },
  {
    name: "sampleSizeYn",
    fieldName: "sampleSizeYn",
    width: "100",
  },
  {
    name: "useYn",
    fieldName: "useYn",
    width: "100",
  },
  {
    name: "confirmType",
    fieldName: "confirmType",
    width: "100",
  },
  {
    name: "confirmDt",
    fieldName: "confirmDt",
    width: "100",
  },
  {
    name: "createUserId",
    fieldName: "createUserId",
    width: "100",
  },
  {
    name: "createDt",
    fieldName: "createDt",
    width: "100",
  },
  {
    name: "updateUserId",
    fieldName: "updateUserId",
    width: "100",
  },
  {
    name: "updateDt",
    fieldName: "updateDt",
    width: "100",
  },
  {
    name: "loadDt",
    fieldName: "loadDt",
    width: "100",
  },
];

export const options = {
  // checkBar: {
  //   visible: true,
  //   headText: "H",
  // },
  // 다른 그리드 옵션들도 필요하다면 여기에 추가할 수 있습니다.
};