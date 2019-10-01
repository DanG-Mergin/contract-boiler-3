import { Component, OnInit } from '@angular/core';

import { SAMPLESService } from '../../services/sample-data-service';

@Component({
  selector: 'app-template-constructor',
  templateUrl: './template-constructor.component.html',
  styleUrls: ['./template-constructor.component.css']
})
export class TemplateConstructorComponent implements OnInit {
	dataset: any[] = [
		{"object":'', "displayName":'', "fieldName":'', "type":'',
    	"sample":'', "minLength":'', "maxLength": '', "required":'', "technicalUser":'', "clientAdmin":'', 
    	"operator":'', "dbField": ''}
	];

	//private constructedData= [];
	private constructedEntities = {};
	private sampleData = {};

	public interfaceOutput = '';
	public constructorOutput = '';
	public inputBuilderOutput = '';
	public inputBuilderParams = {
		class: ''
	}
	//sample data properties
	public mockTableData: any[] = [{
		"name":"",
		"type":"",
		"sample":""
	}];
	public sampleDataOut = {};

	//Sql properties
	public rawSqlData = "";
	sqlToFieldsOut: any[] = [
		{
			"object": 'object',
			"fieldName": 'fieldName',
			"fieldType": 'fieldType',
			"sqlType": 'sqlType',
			"minLength": 'minLength',
			"maxLength": 'maxLength',
			"required": 'required'
		}
	];
	//fake json 
	public fakeJsonData = {};
	
  	constructor(private sampleService: SAMPLESService) { }

	ngOnInit() {
		this._retrieveCollatedSamples();
	}

	clearOutputs(){
		this.constructedEntities = {};
		this.interfaceOutput = '';
		this.constructorOutput = '';
		this.inputBuilderOutput = '';
		this.inputBuilderParams = {
			class: ''
		}
		this.mockTableData = [{
			"name":"",
			"type":"",
			"sample":""
		}];
	}
	tableUpdated(){
		this.clearOutputs();
		this.constructObjects();
		this.createInterfaces();
		this.createIntConstructors();
		this.createInputElements();
		this.createSampleData();
		this.createFakeJson();
	}
	_capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}
	_buildObject(fieldObj: object){
		let currentObj = {
			object: {
				"entityName": '',
				"displayName": '',
				"fieldName": '',
				"fieldType": '',
				"jsFieldType": '',
				"sampleData": '', 
				"required": false,
				"minLength": '',
				"maxLength": '',
				"dbField": ''
			},
			security: {
				"technicalUser": true,
				"clientAdmin": false,
				"operator": false
			}
		};
		//TODO: need to account for array datatypes
		let isRequired = false;
		if(fieldObj['required']){
			isRequired = fieldObj['required'].trim() == 'TRUE'? true : false;
		}
		let sampleData = '';

		if(!fieldObj['sample'] || !fieldObj['sample'].trim().length) {
			sampleData = this._getStoredMockDataByField(fieldObj['fieldName']);
		}else {
			sampleData = fieldObj['sample'];
		}
		currentObj.object.entityName = fieldObj['object'] || '';
		currentObj.object.displayName = fieldObj['displayName'] || '';
		currentObj.object.fieldName = fieldObj['fieldName'] || '';
		currentObj.object.fieldType = fieldObj['type'] || 'string';
		currentObj.object.jsFieldType = this._getJsFieldType(currentObj.object);
		currentObj.object.sampleData = sampleData;
		currentObj.object.required = isRequired;
		//security fields
		currentObj.security.technicalUser = fieldObj['technicalUser'] || '';
		currentObj.security.clientAdmin = fieldObj['clientAdmin'] || '';
		currentObj.security.operator = fieldObj['operator'] || '';

		console.log(currentObj.object.fieldName, ';'+  currentObj.object.sampleData);
		return currentObj;
	}
	constructObjects(){
		for(let i=0; i<this.dataset.length; i++){
			if(this.dataset[i]['object'].length){
				if(!this.constructedEntities[this.dataset[i]['object']]){
					this.constructedEntities[this.dataset[i]['object']] = [];
				}
				this.constructedEntities[this.dataset[i]['object']]
				.push(this._buildObject(this.dataset[i]));
			}

		}
		console.log(this.constructedEntities);
	}

	/* Interface String Building */

	_buildInterfaceField(currentObj: object){
		let fieldDef = "";

		let requiredFlag = currentObj['required'] === true ? '' : '?';

		fieldDef += "'" + currentObj['fieldName'] + "'" + requiredFlag + ":" 
			+ currentObj['jsFieldType'] + ";\r\n";

		return fieldDef;
	}

	createInterfaces(){
		for(let ent in this.constructedEntities){
			let interfaceOutput = "export interface ";
			interfaceOutput += this._capitalizeFirstLetter(ent) + ' {\r\n';

			if(this.constructedEntities[ent].length){
				for(let i=0; i<this.constructedEntities[ent].length; i++){
					let currentObj = this.constructedEntities[ent][i].object;

					interfaceOutput += this._buildInterfaceField(currentObj);
				}
			}
			interfaceOutput += '}\r\n\r\n';
			console.log(interfaceOutput);
			this.interfaceOutput += interfaceOutput;
		}
	}
	
	/* Constructor String Building */

	_createIntSignature(currentObj: object, isLast: boolean, addNewSigLine: boolean){
		let fieldDef = "";
		let newSigLine = addNewSigLine ? '\r\n' : '';
		let comma = isLast ? '){\r\n\treturn{\r\n' : ', ';

		let requiredFlag = currentObj['required'] === true ? '' : '?';

		fieldDef += currentObj['fieldName'] + requiredFlag + ':' 
			+ currentObj['jsFieldType'] + comma + newSigLine;

		return fieldDef;
	}
	_createIntConstructorObj(currentObj: object, isLast: boolean){
		let fieldDef = "";
		let comma = isLast ? '\r\n\t}\r\n' : ',\r\n';


		fieldDef += "'" + currentObj['fieldName'] + "'" + ': ' 
			+ currentObj['fieldName'] + comma;

		return fieldDef;
	}
	createIntConstructors(){
		for(let ent in this.constructedEntities){
			let signatureName = "create" + this._capitalizeFirstLetter(ent);
			let constructorOutput = "export function " + signatureName + "(";
			let constructorObjOutput = "";

			if(this.constructedEntities[ent].length){
				for(let i=0, len=this.constructedEntities[ent].length; i<len; i++){
					// console.log(i);
					let currentObj = this.constructedEntities[ent][i].object;
					let addComma = (i === (len - 1));
					let addNewSigLine = (10 % i === 2);

					constructorOutput += this._createIntSignature(currentObj, addComma, addNewSigLine);
					constructorObjOutput += this._createIntConstructorObj(currentObj, addComma);
				}
			}
			constructorOutput += constructorObjOutput + '}\r\n\r\n';
			console.log(constructorOutput);
			this.constructorOutput += constructorOutput;
		}
	}

	/* Input String Building */
	_createInputLabel(currentObj: object){
		let labelEl = "<label ";
		labelEl += " for=" + '"' + currentObj['fieldName'] + '"';
		labelEl += " >" + currentObj['displayName'] + "</label>\r\n";

		return labelEl;
	}
	// <label for="computerType">Computer Type</label>
	// <input type="text" class="form-control" id="computerType" name="computerType"
	// [(ngModel)]="newEntity.sbc.type">
	//TODO: merge with sql field type
	_getJsFieldType(currentObj: object) {
		let type = "string";
		if(currentObj['fieldType'] && currentObj['fieldType'].trim().length){
			switch (currentObj['fieldType']) {
			    case 'int': case 'double': case 'float': case 'number':
			        type = 'number'
			        break;
			    case 'bit': case 'boolean':
			        type = 'boolean'
			        break;	    	
			}
		}
		return type;
	}
	_createInput(currentObj: object){
		let inputEl = "<input ";
		// inputEl += 'type=' + '"' + this._getJsFieldType(currentObj) + '"';
		inputEl += 'type=' + '"' + currentObj['jsFieldType'] + '"';

		if(this.inputBuilderParams.class){
			inputEl += ' class=' + '"' + this.inputBuilderParams.class + '"';
		}
		inputEl += ' id=' + '"' + currentObj['fieldName'] + '"';
		inputEl += ' name=' + '"' + currentObj['fieldName'] + '"';
		inputEl += '\r\n [(ngModel)]=' + '"' + currentObj['fieldName'] + '"';
		inputEl += '>\r\n\r\n';

		return inputEl;
	}
	createInputElements(){
		for(let ent in this.constructedEntities){
			let inputOutput = "<div class='row'> \r\n<h3>" + ent + "</h3>\r\n";

			if(this.constructedEntities[ent].length){
				for(let i=0, len=this.constructedEntities[ent].length; i<len; i++){
					let currentObj = this.constructedEntities[ent][i].object;

					inputOutput += this._createInputLabel(currentObj);
					inputOutput += this._createInput(currentObj);
				}
			}
			inputOutput += '</div>\r\n\r\n';
			console.log(inputOutput);
			this.inputBuilderOutput += inputOutput;
		}
	}
	_getStoredMockDataByField(fieldName: string){
		fieldName = fieldName;
		if(this.sampleData && this.sampleData[fieldName]){
			return this.sampleData[fieldName]['sample'] || '';
		}
		return '';
	}
	_collateSampleData(){
		for(let i=0; i<this.mockTableData.length; i++){
			if(this.mockTableData[i]['name'].length && this.mockTableData[i]['sample'].length){
				let fieldName  = this.mockTableData[i]['name'];
				if(!this.sampleData[fieldName]){
					this.sampleData[fieldName] = {'sample': '', 'name': ''};
				}
				this.sampleData[fieldName]['sample'] = this.mockTableData[i]['sample'].trim();
				this.sampleData[fieldName]['name'] = this.mockTableData[i]['name'].trim();
			}
		}
	}
	_retrieveCollatedSamples(){
		this.sampleData = this.sampleService.getSamples();
	}
	createSampleData(){
		this._collateSampleData();

		this.sampleDataOut = this.sampleData;
	}
	//**********************************************//
	// fake json for testing
	//**********************************************//
	createFakeJson(){
		let mockData = {};
		for(let ent in this.constructedEntities){
			mockData[ent] = {};

			if(this.constructedEntities[ent].length){
				//mockData[ent][numEntities] = {};
				let objectId = "1";
				let newMockObj = {};
				for(let i=0, len=this.constructedEntities[ent].length; i<len; i++){
					let currentObj = this.constructedEntities[ent][i].object;

					if(currentObj['fieldName']){
						newMockObj[currentObj.fieldName] = currentObj['sampleData'].trim() || '';
						if(currentObj['fieldName'] === 'id' && currentObj['sampleData'].length){
							objectId = currentObj.sampleData;
						}
					}
				}
				mockData[ent][objectId] = newMockObj;
			}

		}
		this.fakeJsonData = mockData;
	}




	_splitString(stringToSplit, separator, limit?) {
		let arrayOfStrings = [];
		if(!limit){
		 	arrayOfStrings= stringToSplit.split(separator);
		}else {
			arrayOfStrings= stringToSplit.split(separator, limit);
		}

		//console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '));
		return arrayOfStrings;
	}
	_getJsType(sqlType: string){
		sqlType = sqlType.toLowerCase().trim();
		let type = "string";
		if(sqlType.length){
			switch (sqlType) {
			    case 'int': case 'double': case 'float':
			        type ='number'
			        break;
			    case 'bit':
			        type = 'boolean'
			        break;
			}
		}
		return type;
	}
	_getFieldProperties(fieldsArr: Array<string>, objectName: string){
		console.log("fieldsArr is ", fieldsArr);
		let fieldObjects = [];

		for(let i=0; i<fieldsArr.length; i++){
			let typeSeparator = '('; 
			let maxLengthSet = fieldsArr[i].indexOf(typeSeparator) > -1 ? true : false;
			let maxLenSplit = [''];
	
			if(fieldsArr[i].trim().length && fieldsArr[i].indexOf('sys_id') < 0){
				let fieldNameSplit= this._splitString(fieldsArr[i], '` ');
				let fieldName = fieldNameSplit[0].replace('`', '').trim();
				let fieldRequired = fieldsArr[i].indexOf('NOT NULL') > -1;

				let typeSplit = [''];
				if(maxLengthSet){
					typeSplit = this._splitString(fieldNameSplit[1], typeSeparator);
					maxLenSplit = this._splitString(typeSplit[1], ')')
				}else {
					typeSplit = this._splitString(fieldNameSplit[1], ' ');
				}
				
				let sqlType = typeSplit[0];
				let fieldType = this._getJsType(sqlType);

				let minLength = '';
				if(maxLenSplit[0].indexOf(',') > -1){
					maxLenSplit = this._splitString(maxLenSplit[0], ',');
					minLength = maxLenSplit[1];
				} 	
			 	let maxLength = maxLenSplit[0];


				fieldObjects.push({
					"object": objectName,
					"fieldName": fieldName,
					"fieldType": fieldType,
					"sqlType": sqlType,
					"minLength": minLength,
					"maxLength": maxLength,
					"required": fieldRequired
				});
			}

		}
		return fieldObjects;

	}

	//TODO: make recursive
	_parseRawSql(rawSql: string){
		let parsedSql = [];

		//rawSql = rawSql.replace(/(\r\n\t|\n|\r\t)/gm,"");
		let objectStrings = this._splitString(rawSql, 'CREATE TABLE');
		objectStrings.splice(0,1);

		let fieldStrings = [];

		//console.log("createObjOutput is ", this._createObjFromSql(rawSql));
		for(let i=0,tempSplit=[]; i<objectStrings.length; i++){
			tempSplit=[];
			tempSplit.push(this._splitString(objectStrings[i], 'PRIMARY KEY')[0]);

			for(let j=0, objectName=''; j<tempSplit.length; j++){
				//splitting off object names
				objectName = this._splitString(tempSplit[j], '(', 1)[0].trim();
				tempSplit[j] = tempSplit[j].replace(objectName + ' (', '');

				fieldStrings.push({
					fieldStrings: this._splitString(tempSplit[j], ',\n'), 
					objectName: objectName.replace(/`/g, '') 
				});
				
				// parsedSql.push({"object": objectName.replace('`', '')});

			}
		}
		for(let k=0; k<fieldStrings.length; k++){  
			let fieldObj = this._getFieldProperties(fieldStrings[k].fieldStrings, fieldStrings[k].objectName);

			parsedSql = parsedSql.concat(fieldObj);
		}
		//console.log(parsedSql);
		return parsedSql;
	}
	// _flattenSqlObject(parsedSql: Array<Array>)
	sqlToFieldNames(){
		let parsedSql = this._parseRawSql(this.rawSqlData);
		this.sqlToFieldsOut = parsedSql;

		console.log(this.sqlToFieldsOut);
	}


	// type="text"
//       ng-model="string"
//       [name="string"]
//       [required="string"]
//       [ng-required="string"]
//       [ng-minlength="number"]
//       [ng-maxlength="number"]
//       [pattern="string"]
//       [ng-pattern="string"]
//       [ng-change="string"]
//       [ng-trim="boolean"]


	/* create mySQL signatures */

// CREATE TABLE `entity` (
//   `id` int(20) NOT NULL AUTO_INCREMENT,
//   `sys_id` int(20) NOT NULL DEFAULT '1',
//   `name` varchar(64) DEFAULT NULL,
//   `type` varchar(20) DEFAULT NULL,
//   `lon` double DEFAULT NULL,
//   `lat` double DEFAULT NULL,
//   `make` varchar(20) DEFAULT NULL,
//   `model` varchar(20) DEFAULT NULL,
//   `mfcSerial` varchar(20) DEFAULT NULL,
//   `picSixSerial` varchar(20) DEFAULT NULL,
//   PRIMARY KEY (`id`,`sys_id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='all entities info, type:master /slave';



}


