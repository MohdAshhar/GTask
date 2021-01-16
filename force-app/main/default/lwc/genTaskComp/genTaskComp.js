import { LightningElement, wire, api, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class genTaskComp extends LightningElement {
    @api recordId;
    @track record;
    @api objectApiName;

    fieldsFormatted = ['Id'];

    fields='Name,CreatedDate';

    @wire(getRecord, { recordId: '$recordId', fields: '$fieldsFormatted' })
    fetchRecord({ data, error }) {
        console.log('Record => ', data, error);
        if (data) {
            
            this.record = data;
        } else if (error) {
            console.error('ERROR => ', JSON.stringify(error)); // handle error properly
        }
    }

    connectedCallback() {
        console.log("constructor-----nnnn->>",this.objectApiName);
        this.fieldsFormatted = (this.fields || 'Id').split(',').map(field => this.objectApiName + '.' + field);
    }
}