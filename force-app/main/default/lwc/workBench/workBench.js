import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getObjectFields from "@salesforce/apex/WorkBenchHelper.getObjectFields"
import getObjectNames from "@salesforce/apex/WorkBenchHelper.getObjectNames"

var id = 0;
class Condition {
    MyCondition = "";
    MyFilterOption = "";
    MyConditionText = "";
    key = id++;


    getQuery(){
        debugger;
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
                return this.MyCondition + ' LIKE '+this.MyConditionText+'%';
            case 'ends_with':
                return this.MyCondition + ' LIKE %'+this.MyConditionText;
            case 'contains':
                return this.MyCondition + ' LIKE %'+this.MyConditionText+'%';
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

    ConditionHandleChange(event) {
        this.MyCondition = event.detail.value;
        console.log(this.MyCondition);
    }

    FilterByHandleChange(event) {
        this.MyFilterOption = event.detail.value;
        console.log(this.MyFilterOption);
    }

    ConditionParameterHandlerChange(event) {
        this.MyConditionText = event.detail.value;
        console.log(this.MyConditionText); 
    }
}



export default class WorkBench extends LightningElement {
    @track con = [ new Condition() ]
    // Condition
    @track Query = '';
    @track limit = 0;
    
    AddCondition(event){
        this.con.push(new Condition());
        console.log(this.con);
    }

    limitHandler(event){
        this.limit = event.detail.value;
        this.generateQuery();
    }
    // Object
    ObjectValue = 'inProgress';
    @track ObjectInfo = {data: []};
    @wire(getObjectNames) ObjectInfo;
    get ObjectOptions() {
        var options = []
        for (const e in this.ObjectInfo.data) {
            options.push( { label: this.ObjectInfo.data[e], value: this.ObjectInfo.data[e] })
        }
        return options;
    }

    ObjectHandleChange(event) {
        this.ObjectValue = event.detail.value;
        this.Query = '';
    }

    // Fields
    FieldsValue = '';
    @track FieldInfo = {data: []};
    @wire(getObjectFields,{objs: "$ObjectValue"}) FieldInfo;
    get FieldsOptions() {
        var options = []
        for (const e in this.FieldInfo.data) {
            options.push( { label: this.FieldInfo.data[e], value: this.FieldInfo.data[e] })
        }
        return options;
    }

    FieldsHandleChange(event) {
        this.FieldsValue = event.detail.value;
        this.generateQuery();
    }

    // View As
    VaValue = 'list';

    get VaOptions() {
        return [
            { label: 'List', value: 'list' },
            { label: 'Matrix', value: 'matrix' },
            { label: 'Bulk Csv', value: 'bulkCsv' },
            { label: 'Bulk Xml', value: 'bulkXml' },
        ];
    }

    VaHandleChange(event) {
        this.VaValue = event.detail.value;

    }

    // DAR
    DARValue = 'exclude';

    get DAROptions() {
        return [
            { label: 'Exclude', value: 'exclude' },
            { label: 'Include', value: 'include' },
        ];
    }

    DARHandleChange(event) {
        this.DARValue = event.detail.value;
    }


    // SortBy
    SortByValue = '';

    get SortByOptions() {
        var options = []
        for (const e in this.FieldInfo.data) {
            options.push( { label: this.FieldInfo.data[e], value: this.FieldInfo.data[e] })
        }
        return options;
    }

    SortByHandleChange(event) {
        this.SortByValue = event.detail.value;
        this.generateQuery();
    }

    // Order
    OrderValue = 'ASC';

    get OrderOptions() {
        return [
            { label: 'A - Z', value: 'ASC' },
            { label: 'Z - A', value: 'DESC' }
        ];
    }

    OrderHandleChange(event) {
        this.OrderValue = event.detail.value;
        this.generateQuery();
    }

    // NullPo
    NullPoValue = 'NULL LAST';

    get NullPoOptions() {
        return [
            { label: 'Null First', value: 'NULL FIRST' },
            { label: 'Null Last', value: 'NULL LAST' },
            
        ];
    }

    NullPoHandleChange(event) {
        this.NullPoValue = event.detail.value;
        this.generateQuery();
    }

    // Condition

    get ConditionOptions() {
        return [
            { label: '=', value: '=' },
            { label: '!=', value: '!=' },
            { label: '>', value: '>' },
            { label: '>=', value: '>=' },
            { label: '<', value: '<' },
            { label: '<=', value: '<=' },
            { label: 'starts with', value: 'starts_with' },
            { label: 'ends with', value: 'ends_with' },
            { label: 'contains', value: 'contains' },
            { label: 'in', value: 'in' },
            { label: 'not in', value: 'not_in' },
            { label: 'includes', value: 'includes' },
            { label: 'excludes', value: 'excludes' }
            
        ];
    }

    

    // FilterBy

    get FilterByOptions() {
        var options = []
        for (const e in this.FieldInfo.data) {
            options.push( { label: this.FieldInfo.data[e], value: this.FieldInfo.data[e] })
        }
        return options;
    }

    
    generateQuery(){
        var order = '';
        var where = '';
        var lim = '';
        var b = true;
        if(this.SortByValue.length > 1){
            order = "ORDER BY " + this.SortByValue + " " + this.OrderValue + " " + this.NullPoValue;
        }

        if(this.limit > 0){
            lim = "LIMIT "+this.limit;
        }

        for(var i = 0 ; i < this.con.length;i++){
            var cq = this.con[i].getQuery();
            if(cq.length > 1){
                if(b){
                    where = cq; 
                }else{
                    where += ' AND ' + cq;
                }
            }
            console.log(this.con[i]);
        }
        this.Query = 'SELECT ' + this.FieldsValue + ' FROM '+ this.ObjectValue + " " + where + " " + order + " " + lim;   
    }  
}