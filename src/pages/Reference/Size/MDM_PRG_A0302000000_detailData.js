import { ValueType } from "realgrid";

export const detailFields = [
  // CheckBar에 대한 설정 추가
  {
    fieldName: "comCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "comKrNm",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "comEnNm",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "region",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "erpYn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sort",
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

export const detailColumns = [
  {
    name: "comCode",
    fieldName: "comCode",
    width: "150",
    header: {
      text: "법인코드",
    },
  },
  {
    name: "comKrNm",
    fieldName: "comKrNm",
    width: "150",
    header: {
      text: "법인명(kr)",
    },
  },
  {
    name: "comEnNm",
    fieldName: "comEnNm",
    width: "150",
    header: {
      text: "법인명(en)",
    },
  },
  {
    name: "region",
    fieldName: "region",
    width: "150",
    header: {
      text: "지역",
    },
    values: [],
    labels: [],
    editor: {
      type: "list", // dropDown 구성
      domainOnly: true,
      textReadOnly: true
    },
  },
  {
    name: "erpYn",
    fieldName: "erpYn",
    width: "150",
    header: {
      text: "erp여부",
    },
    values: ["", "Y", "N"],
    labels: ["선택", "Y", "N"],
    editor: {
      type: "list", // dropDown 구성
      domainOnly: true,
      textReadOnly: true
    },
  },
  {
    name: "sort",
    fieldName: "sort",
    width: "150",
    header: {
      text: "sort",
    },
  },
  {
    name: "useYn",
    fieldName: "useYn",
    width: "150",
    header: {
      text: "사용여부",
    },
    style: {
      "background": "#edeef0", color:"#edeef0"
    },
    values: ["", "Y", "N"],
    labels: ["선택", "Y", "N"],
    editor: {
      type: "list", // dropDown 구성
      domainOnly: true,
      textReadOnly: true
    },
  },
  {
    name: "confirmYn",
    fieldName: "confirmYn",
    width: "150",
    header: {
      text: "확정여부",
    },
    editable: false,
    // values: ["", "Y", "N"],
    // labels: ["선택", "Y", "N"],
    // editor: {
    //   type: "list", // dropDown 구성
    //   domainOnly: true,
    //   textReadOnly: true
    // },
  },
  {
    name: "confirmUser",
    fieldName: "confirmUser",
    width: "150",
    header: {
      text: "확정자",
    },
  },
  {
    name: "confirmDate",
    fieldName: "confirmDate",
    width: "150",
    header: {
      text: "확정일",
    },
  },
  {
    name: "regUser",
    fieldName: "regUser",
    width: "150",
    header: {
      text: "등록자",
    },
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
  },
  {
    name: "updateDate",
    fieldName: "updateDate",
    width: "150",
    header: {
      text: "수정일",
    },
  },

];

export const detailOptions = {
  // checkBar: {
  //   visible: true,
  //   headText: "H",
  // },
  // 다른 그리드 옵션들도 필요하다면 여기에 추가할 수 있습니다.
};