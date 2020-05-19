var id = 0;
export default class Condition {
    MyCondition = '';
    MyFilterOption = '';
    MyConditionText = '';
    key = id++;

    getQuery = () =>{
        switch (this.MyFilterOption) {
            case '=':
                return this.MyCondition + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
            case '!=':
                return this.MyCondition + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
            case '>' :
                return this.MyCondition + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
            case '>=' :
                return this.MyCondition + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
            case '<' :
                return this.MyCondition + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
            case '<=' :
                return this.MyCondition + ' ' + this.MyFilterOption + ' '+this.MyConditionText;
            case 'starts_with':
                return this.MyCondition + ' LIKE \''+this.MyConditionText+'%\'';
            case 'ends_with':
                return this.MyCondition + ' LIKE \'%'+this.MyConditionText + '\'';
            case 'contains':
                return this.MyCondition + ' LIKE \'%'+this.MyConditionText+'%\'';
            case 'in' :
                return this.MyCondition + ' IN ('+this.MyConditionText+')';
            case 'not_in':
                return this.MyCondition + ' NOT IN ('+this.MyConditionText+')';
            case 'includes':
                return this.MyCondition + ' INCLUDES ('+this.MyConditionText+')';
            case 'excludes':
                return this.MyCondition + ' EXCLUDES ('+this.MyConditionText+')';
            default:
                return '';
        }
    }

    ConditionHandleChange = (event)  => {
        this.MyCondition = event.detail.value;
        console.log(this.MyCondition + ' ' + this.key);
    }

    FilterByHandleChange = (event) => {
        this.MyFilterOption = event.detail.value;
        console.log(this.MyFilterOption);
    }

    ConditionParameterHandlerChange = (event) => {
        this.MyConditionText = event.detail.value;
        console.log(this.MyConditionText); 
    }
}


