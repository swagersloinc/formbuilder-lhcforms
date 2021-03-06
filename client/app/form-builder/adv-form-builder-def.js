/**
 * Created by akanduru on 6/21/17.
 */
var advFormBuilderDef = {
  "type": "LOINC",
  "code": "form",
  "name": "Advanced",
  "templateOptions": {
    "allowHTMLInInstructions": true,
    "hideFormControls": true,
    "showFormHeader": false,
    "hideUnits": true,
    "viewMode": "lg",
    "defaultAnswerLayout": {
      "answerLayout": {
        "type": "RADIO_CHECKBOX",
        "columns": "2"
      }
    }
  },
  items: [
    {
      // ********** Hidden item signal header from basic widget ********,
      "questionCode": "_isHeader",
      "question": "You should never see this!",
      "dataType": "ST",
      "header": false,
      "displayControl": {
        "css": [
          {
            "name": "display",
            "value": "none"
          }
        ]
      },
      "value": "No"
    },
    {
      // ********** Use Restrictions flag **************************,
      "questionCode": "useRestrictions",
      "question": "Add restrictions",
      "dataType": "CNE",
      "answers": "boolean",
      "header": false,
      "codingInstructions": "Choose to add value restrictions to the input.",
      "value": {
        "text": "No",
        "code": false
      },
      "skipLogic": {
        "conditions": [
          {
            "source": "_isHeader",
            "trigger": {
              "value": "No"
            }
          }
        ],
        "action": "show"
      },
      "items": [{
        // ********** Restrictions **************************,
        "questionCode": "restrictions",
        "question": "Restriction",
        "header": true,
        "codingInstructions": "Choose to add restriction to the input of this item.",
        "skipLogic": {
          "action": "show",
          "logic": "ALL",
          "conditions": [
            {
              "source": "useRestrictions",
              "trigger": {
                "code": true
              }
            }
          ]
        },
        "questionCardinality": {
          "min": "1",
          "max": "*"
        },
        "items": [
          {
            "questionCode": "name",
            "question": "Type",
            "dataType": "CNE",
            "displayControl": {
              "answerLayout": {
                "type": "COMBO_BOX"
              }
            },
            "answers": "restrictionName",
            "header": false,
            "codingInstructions": "Pick a restriction from the supported list of types"
          },
          {
            "questionCode": "value",
            "question": "Value",
            "dataType": "ST",
            "header": false,
            "codingInstructions": "Enter value for the selected restriction"
          }
        ]
      }]

  },
    {
      // ********** Use Skip logic flag **************************,
      "questionCode": "useSkipLogic",
      "question": "Add conditional show logic?",
      "dataType": "CNE",
      "answers": "boolean",
      "header": false,
      "codingInstructions": "Choose to add show logic to conditionally include this item.",
      "value": {
        "text": "No",
        "code": false
      },
      "items": [{
        // ********** SkipLogic **************************,
        "questionCode": "skipLogic",
        "question": "Criteria to show this item",
        "header": true,
        "codingInstructions": "Choose to add skip logic to conditionally display this item.",
        "skipLogic": {
          "action": "show",
          "logic": "ALL",
          "conditions": [
            {
              "source": "useSkipLogic",
              "trigger": {
                "code": true
              }
            }
          ]
        },
        "items": [
          {
            "questionCode": "action",
            "question": "Show or hide?",
            "dataType": "CNE",
            "answers": "skipLogicAction",
            "header": false,
            "codingInstructions": "Pick an action to perform if the conditions are satisfied. If the condition is NOT satisfied, opposite action is implied.",
            "skipLogic": {
              "conditions": [
                {
                  "source": "_isHeader",
                  "trigger": {
                    "value": "notThisString"
                  }
                }
              ],
              "action": "show"
            },
            "value": {
              "text": "Show",
              "code": "show"
            }
          },
          {
            "questionCode": "logic",
            "question": "Show this item when",
            "dataType": "CNE",
            "answers": "skipLogicLogic",
            "header": false,
            "codingInstructions": "Choose how the conditions should satisfy. Choose 'Any' to satisfy any one condition (boolean OR), 'All' to satisfy all conditions (boolean AND).",
            "displayControl": {
              "answerLayout": {
                "type": "RADIO_CHECKBOX",
                "columns": "1"
              }
            },
            "value": {
              "text": "Any condition is true",
              "code": "ANY"
            }
          },
          {
            "questionCode": "conditions",
            "question": "Condition",
            "header": true,
            "codingInstructions": "Specify conditions",
            "questionCardinality": {
              "min": "1",
              "max": "*"
            },
            "items": [
              {
                "questionCode": "source",
                "question": "Select Source Field",
                "dataType": "CNE",
                "answers": [],
                "header": false,
                "codingInstructions": "Choose a source field to apply a condition.",
                "displayControl": {
                  "answerLayout": {
                    "type": "COMBO_BOX"
                  }
                }
              },
              {
                "questionCode": "hiddenItemForSourceType",
                "question": "You shouldn't see this",
                "header": false,
                "dataType": "ST",
                "skipLogic": {
                  "conditions": [
                    {
                      "source": "_isHeader",
                      "trigger": {
                        "value": "notThisString"
                      }
                    }
                  ],
                  "action": "show"
                },
                "dataControl": [
                  {
                    "source": {
                      "sourceType": "INTERNAL",
                      "sourceItemCode": "source"
                    },
                    "construction": "SIMPLE",
                    "dataFormat": "value.dataType",
                    "onAttribute": "value"
                  }
                ]
              },
              {
                "questionCode": "trigger",
                "question": "Select value to satisfy the condition",
                "header": false,
                "codingInstructions": "Specify a source field value to satisfy the condition.",
                "skipLogic": {
                  "logic": "ANY",
                  "conditions": [
                    // Everything except INT and REAL.
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "BL"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "TM"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "DT"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "DTM"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "EMAIL"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "CNE"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "CWE"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "PHONE"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "RTO"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "ST"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "URL"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "YEAR"
                      }
                    }
                  ],
                  "action": "show"
                },
                "dataControl": [
                  {
                    "source": {
                      "sourceType": "INTERNAL",
                      "sourceItemCode": "source"
                    },
                    "construction": "SIMPLE",
                    "dataFormat": "value.dataType",
                    "onAttribute": "dataType"
                  },
                  {
                    "source": {
                      "sourceType": "INTERNAL",
                      "sourceItemCode": "source"
                    },
                    "construction": "SIMPLE",
                    "dataFormat": "value.answers",
                    "onAttribute": "answers"
                  }
                ]
              },
              {
                "questionCode": "triggerRange",
                "question": "Numerical range",
                "header": true,
                "codingInstructions": "Specify numerical range to satisfy the condition.",
                "questionCardinality": {
                  "min": "1",
                  "max": "*"
                },
                "skipLogic": {
                  "logic": "ANY",
                  "conditions": [
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "INT"
                      }
                    },
                    {
                      "source": "hiddenItemForSourceType",
                      "trigger": {
                        "value": "REAL"
                      }
                    }
                  ],
                  "action": "show"
                },
                "items": [
                  {
                    "questionCode": "rangeBoundary",
                    "question": "Select conditional operator",
                    "dataType": "CNE",
                    "answers": "numericalRange",
                    "header": false,
                    "codingInstructions": "Choose a conditional operator for this range."
                  },
                  {
                    "questionCode": "rangeValue",
                    "question": "Value for the condition",
                    "dataType": "REAL",
                    "header": false,
                    "codingInstructions": "Specify a value for above conditional operator."
                  }
                ]
              }
            ]
          }
        ]
      }]
    },
    {
      // ********** Use data control flag **************************,
      "questionCode": "useDataControl",
      "question": "Create data from other items? [2]",
      "dataType": "CNE",
      "answers": "boolean",
      "header": false,
      "codingInstructions": "Choose to create data from other items (build dataControl).",
      "value": {
        "text": "No",
        "code": false
      },
      "skipLogic": {
        "conditions": [
          {
            "source": "_isHeader",
            "trigger": {
              "value": "No"
            }
          }
        ],
        "action": "show"
      },
      "items": [{
        // ************* Data control *******************************
        "questionCode": "dataControl",
        "question": "Create data using data from other item",
        "header": true,
        "questionCardinality": {
          "min": "1",
          "max": "*"
        },
        "codingInstructions": "Create data using data from other items.",
        "skipLogic": {
          "action": "show",
          "logic": "ALL",
          "conditions": [
            {
              "source": "useDataControl",
              "trigger": {
                "code": true
              }
            }
          ]
        },
        "items": [
          {
            "questionCode": "construction",
            "question": "Type",
            "header": false,
            "answers": "dataControlConstruction",
            "dataType": "CNE",
            "displayControl": {
              "answerLayout": {
                "type": "RADIO_CHECKBOX",
                "columns": "3"
              }
            },
            "value": {
              "text": "Simple",
              "code": "SIMPLE"
            }
          },
          {
            "questionCode": "source",
            "question": "Other item",
            "header": false,
            "answers": [],
            "dataType": "CNE",
            "displayControl": {
              "answerLayout": {
                "type": "COMBO_BOX"
              }
            }
          },
          {
            "questionCode": "dataFormat",
            "question": "Specify data format using other item",
            "header": false,
            "answers": "dataControlFormat",
            "dataType": "CWE",
            "displayControl": {
              "answerLayout": {
                "type": "COMBO_BOX"
              }
            },
            "value": {
              "text": "Value",
              "code": "value"
            }
          },
          {
            "questionCode": "onAttribute",
            "question": "Assign to",
            "header": false,
            "answers": "itemFields",
            "dataType": "CNE",
            "displayControl": {
              "answerLayout": {
                "type": "COMBO_BOX"
              }
            },
            "value": {
              "text": "Value",
              "code": "value"
            }
          }
        ]
      }]
    },
    {
      // *********** codingInstructions ************************,
      "questionCode": "copyrightNotice",
      "question": "Copyright Notice",
      "dataType": "ST",
      "header": false,
      "codingInstructions": "Add any copy right notice text you wish to include for this item."
    }

  ]
};
