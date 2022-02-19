import { addEnumerations, t } from "mendix/native";

export const nf_ds_ctx = {
  "name": "RNV.nf_ds_ctx",
  "instructions": [
    {
      "type": "createObject",
      "label": "cffb23aa-ce1f-430e-9284-5dfcaee45810",
      "objectType": "RNV.Ctx",
      "outputVar": "obj_ctx"
    },
    {
      "type": "changeObject",
      "inputVar": "obj_ctx",
      "member": "Ident",
      "value": {
        "type": "function",
        "name": "+",
        "parameters": [
          {
            "type": "literal",
            "value": "test_"
          },
          {
            "type": "function",
            "name": "formatDateTime",
            "parameters": [
              {
                "type": "token",
                "name": "currentDateTime"
              },
              {
                "type": "literal",
                "value": "ssss"
              }
            ]
          }
        ]
      }
    },
    {
      "type": "changeObject",
      "inputVar": "obj_ctx",
      "member": "RoomName",
      "value": {
        "type": "literal",
        "value": "Room_2"
      }
    },
    {
      "type": "microflowCall",
      "label": "2d7352a4-672e-45ed-af7d-53e2afd28e08",
      "flow": "RNV.ds_atok",
      "parameters": [
        {
          "name": "obj_ctx",
          "value": {
            "type": "variable",
            "variable": "obj_ctx"
          },
          "kind": "object"
        }
      ],
      "outputVar": "obj_ctx_"
    },
    {
      "type": "return",
      "label": "3c55b173-7f8e-4887-a1c8-27dee46f1e08",
      "result": {
        "type": "variable",
        "variable": "obj_ctx"
      },
      "resultKind": "object"
    }
  ]
};
