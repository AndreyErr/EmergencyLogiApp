class dictsInfo {
    allowedFieldsGeneral = ['name', 'descr', 'code_name', 'type', 'time', 'pattern_input', "pattern_reaction"];
    allowedFieldsGeneralReaction = ['item_name', "reaction_item", "default_reaction_item", 'status'];

    allowedFieldsReaction = ['value_type', 'value'];

    validDataTypes = {'числовой': "number", 'булевый': "boolean", 'строковой': "string"}
    validRequiredField = ['required', 'not_required'];
    validActiveField = ['active', 'not_active'];
    validInputData = ['between', 'in'];
    validValueField = ['per_1', 'generally', 'custom'];
    operators = ['>', '>=', '<', '<=', '='];
}

module.exports = new dictsInfo();