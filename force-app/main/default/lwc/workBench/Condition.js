var id = 0;
export default class Condition {
    
    MyCondition = '';
    MyFilterOption = '';
    MyConditionText = '';
    key = id++;

    constructor(wb) { this.wb = wb }

    getQuery = () =>{
        var _MyContition = this.MyCondition.split(',');
        var condOne = _MyContition[0];
        var typeOne = _MyContition[1];
        if(this.MyConditionText.length > 0 && condOne.length > 0){    
            switch (this.MyFilterOption) {
                case '=':
                    if(typeOne == 'STRING' || typeOne == 'TEXTAREA' || typeOne == 'ID' || typeOne == 'REFERENCE')
                        return condOne + ' ' + this.MyFilterOption + ' \'' + this.MyConditionText + '\'';
                    else
                        return condOne + ' ' + this.MyFilterOption + ' ' + this.MyConditionText;
                case '!=':
                    if(typeOne == 'STRING' || typeOne == 'TEXTAREA' || typeOne == 'ID' || typeOne == 'REFERENCE') 
                        return condOne + ' ' + this.MyFilterOption + ' \'' + this.MyConditionText + '\'';
                    else
                        return condOne + ' ' + this.MyFilterOption + ' ' + this.MyConditionText;
                case '>' :
                    return condOne + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
                case '>=' :
                    return condOne + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
                case '<' :
                    return condOne + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
                case '<=' :
                    return condOne + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
                case 'starts_with':
                    return condOne + ' LIKE \''+this.MyConditionText+'%\'';
                case 'ends_with':
                    return condOne + ' LIKE \'%'+this.MyConditionText + '\'';
                case 'contains':
                    return condOne + ' LIKE \'%'+this.MyConditionText+'%\'';
                case 'in' :
                    return condOne + ' IN ('+this.MyConditionText+')';
                case 'not_in':
                    return condOne + ' NOT IN ('+this.MyConditionText+')';
                case 'includes':
                    return condOne + ' INCLUDES ('+this.MyConditionText+')';
                case 'excludes':
                    return condOne + ' EXCLUDES ('+this.MyConditionText+')';
                default:
                    return '';
            }
        }
        else
            return ''
    }

    ConditionHandleChange = (event)  => { this.MyCondition = event.detail.value; }

    FilterByHandleChange = (event) => { this.MyFilterOption = event.detail.value; }

    ConditionParameterHandlerChange = (event) => {
        this.MyConditionText = event.detail.value;
        this.wb.generateQuery();
    }
}


