import { ValueType } from "realgrid";

export const fields = [
  // CheckBar에 대한 설정 추가
  {
    fieldName: "defectGroup",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "defectGroupName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "defectType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "remarks",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "useYn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "confirmYn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "confirmUser",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "confirmDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "regUser",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "regDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "updateUser",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "updateDate",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "defectGroup",
    fieldName: "defectGroup",
    width: "150",
    header: {
      text: "불량그룹코드",
    },
  },
  {
    name: "defectGroupName",
    fieldName: "defectGroupName",
    width: "150",
    header: {
      text: "불량그룹명",
    },
  },
  {
    name: "defectType",
    fieldName: "defectType",
    width: "150",
    header: {
      text: "불량Type",
    },
    editable: false,
  },
  {
    name: "remark",
    fieldName: "remark",
    width: "150",
    header: {
      text: "비고",
    },
  },
  {
    name: "useYn",
    fieldName: "useYn",
    width: "150",
    header: {
      text: "사용여부",
    },
    editable: false,
  },
  {
    name: "confirmYn",
    fieldName: "confirmYn",
    width: "150",
    header: {
      text: "확정여부",
    },
    editable: false,
  },
  {
    name: "confirmUser",
    fieldName: "confirmUser",
    width: "150",
    header: {
      text: "확정자",
    },
    editable: false,
  },
  {
    name: "confirmDate",
    fieldName: "confirmDate",
    width: "150",
    header: {
      text: "확정일",
    },
    editable: false,
  },
  {
    name: "regUser",
    fieldName: "regUser",
    width: "150",
    header: {
      text: "등록자",
    },
    editable: false,
  },
  {
    name: "regDate",
    fieldName: "regDate",
    width: "150",
    header: {
      text: "등록일",
    },
  },
  {
    name: "updateUser",
    fieldName: "updateUser",
    width: "150",
    header: {
      text: "수정자",
    },
    editable: false,
  },
  {
    name: "updateDate",
    fieldName: "updateDate",
    width: "150",
    header: {
      text: "수정일",
    },
    editable: false,
  },
];

export const options = {
  // checkBar: {
  //   visible: true,
  //   headText: "H",
  // },
  // 다른 그리드 옵션들도 필요하다면 여기에 추가할 수 있습니다.
};