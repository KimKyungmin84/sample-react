const MainNavItems = [
  {
    title: "SITE",
    path: "/site",
    child_depth: [
      {
        title: "Company",
        path: "/site/MDM_PRG_A0101000000",
        child_depth: []
      },
      {
        title: "Factory",
        path: "/site/factory",
        child_depth: [],
      },
      {
        title: "plant",
        path: "/site/plant",
        child_depth: [],
      },
      {
        title: "Operation",
        path: "/site/operation",
        child_depth: [],
      },
      {
        title: "Line",
        path: "/site/MDM_PRG_A0105000000",
        child_depth: [],
      },
    ]
  },
  {
    title: "Model",
    path: "/model",
    child_depth: [
      {
        title: "Model",
        path: "/model/MDM_PRG_A0201000000",
        child_depth: [],
      },
      {
        title: "Product",
        path: "/model/MDM_PRG_A0202000000",
        child_depth: []
      },
      {
        title: "Tact Time",
        path: "/model/MDM_PRG_A0203000000",
        child_depth: []
      },
      {
        title: "BOM",
        path: "/model/MDM_PRG_A0204010000",
        child_depth: [
          {
            title: "BOM",
            path: "/model/MDM_PRG_A0204010000"
          },
          {
            title: "BOM Structure",
            path: "/model/bom/bom-structure"
          },
          {
            title: "Item List",
            path: "/model/item-list"
          }
        ]
      },
    ]
  },
  {
    title: "Reference",
    path: "/reference",
    child_depth: [
      {
        title: "Part",
        path: "/reference/part",
        child_depth: [],
      },
      {
        title: "Size",
        path: "/reference/MDM_PRG_A0302000000",
        child_depth: [],
      },
      {
        title: "Gender",
        path: "/reference/gender",
        child_depth: [],
      },
      {
        title: "UOM",
        path: "/reference/uom",
        child_depth: [],
      },
      {
        title: "Color",
        path: "/reference/color",
        child_depth: [],
      },
      {
        title: "Defect",
        path: "/reference/MDM_PRG_A0306010000",
        child_depth: [
          {
            title: "불량코드",
            path: "/reference/MDM_PRG_A0306010000"
          },
          {
            title: "불량코드그룹",
            path: "/reference/defect/code-group"
          },
        ],
      },
      {
        title: "MCS",
        path: "/reference/mcs",
        child_depth: [],
      },
      {
        title: "Last",
        path: "/reference/MDM_PRG_A0308010000",
        child_depth: [
          {
            title: "전사관리",
            path: "/reference/MDM_PRG_A0308010000"
          },
          {
            title: "법인관리",
            path: "/reference/last/manage-company"
          },
          {
            title: "모델관리",
            path: "/reference/last/manage-model"
          },
        ],
      },
    ],
  },
  {
    title: "Time",
    path: "/time",
    child_depth: [
      {
        title: "Date",
        path: "",
        child_depth: [],
      },
      {
        title: "Week",
        path: "",
        child_depth: [],
      },
      {
        title: "Site Calendar",
        path: "",
        child_depth: [],
      },
      {
        title: "Line Calendar",
        path: "",
        child_depth: [],
      },
      {
        title: "Shift",
        path: "",
        child_depth: [],
      },
      {
        title: "Mold Change Time",
        path: "",
        child_depth: [],
      },
      {
        title: "FGCT",
        path: "",
        child_depth: [],
      },
    ],
  },
  {
    title: "Partner",
    path: "/partner",
    child_depth: [
      {
        title: "Destination",
        path: "",
        child_depth: [],
      },
      {
        title: "Vendor",
        path: "",
        child_depth: [],
      },
    ],
  },
  {
    title: "Governance",
    path: "/governance",
    child_depth: [
      {
        title: "Data Catalog",
        path: "",
        child_depth: [],
      },
      {
        title: "Master Data",
        path: "",
        child_depth: [],
      },
      {
        title: "Data Interface Report",
        path: "",
        child_depth: [],
      },
      {
        title: "Rule",
        path: "",
        child_depth: [],
      },
      {
        title: "Validation Check Result",
        path: "",
        child_depth: [],
      },
    ],
  },
]

export { MainNavItems }