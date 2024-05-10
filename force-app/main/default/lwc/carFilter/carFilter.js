import { LightningElement, wire } from 'lwc';     
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';

//Car Schema
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';

//constants
const CATEGORY_ERROR = 'Error loading Category...'
const MAKE_ERROR = 'Error loading MakeType...'

export default class CarFilter extends LightningElement {
    filters={
        searchkey:'',
        maxPrice: 999999
    }
    categoryError = CATEGORY_ERROR
    makeError = MAKE_ERROR

    /***Fatching catefiory Picklist*/
    @wire(getObjectInfo, {objectApiName: CAR_OBJECT})
    carObjectInfo

    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: CATEGORY_FIELD
    })categories

     /***Fatching Make Picklist*/
    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: MAKE_FIELD
    })makeType

   /***Search Key Handler*/
    handleSearchKeyChange(event){
         console.log(event.target.value)
         this.filters= {...this.filters, "searchKey" : event.target.value}

    }

    /***Price Range Handler*/
    handleMaxPriceChange(event){
        console.log(event.target.value)
        this.filters= {...this.filters, "maxPrice" : event.target.value}
    }

    /***Handle CheckBox*/
    handleCheckbox(event){
        const {name, value} = event.target.dataset;
        console.log("name", name)
        console.log("value", value)
    }
}