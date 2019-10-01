import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class SAMPLESService {
	// private scanURL = 'api/scan';
  //btsSelections = [];

  //observable bts selections source 
  // private btsSelections = new BehaviorSubject<SAMPLES[]>([]);
  // //observable bts selections stream
  // currentSdataSelection = this.btsSelections.asObservable();
  private samples = {
  "id": {
    "sample": "1",
    "name": "id"
  },
  "name": {
    "sample": "",
    "name": "name"
  },
  "type": {
    "sample": "targetType",
    "name": "type"
  },
  "make": {
    "sample": "cisco",
    "name": "make"
  },
  "model": {
    "sample": "500",
    "name": "model"
  },
  "mfcSerial": {
    "sample": "a4sd5f4a54fd6a4d6fa46f4asdf4a89sda",
    "name": "mfcSerial"
  },
  "picSixSerial": {
    "sample": "a7sd89f7a89sd7f89a79f8da7",
    "name": "picSixSerial"
  },
  "lon": {
    "sample": "30.2",
    "name": "lon"
  },
  "lat": {
    "sample": "31.2",
    "name": "lat"
  },
  "entityId": {
    "sample": "1",
    "name": "entityId"
  },
  "operatingSys": {
    "sample": "Linux",
    "name": "operatingSys"
  },
  "license": {
    "sample": "ausd89f07ua8s9f07sad89fu",
    "name": "license"
  },
  "simCard": {
    "sample": "1238",
    "name": "simCard"
  },
  "imsi": {
    "sample": "357129072664184",
    "name": "imsi"
  },
  "buildInstall": {
    "sample": "3a",
    "name": "buildInstall"
  },
  "ip": {
    "sample": "188.166.952",
    "name": "ip"
  },
  "sbcId": {
    "sample": "1",
    "name": "sbcId"
  },
  "2gSupport": {
    "sample": "1",
    "name": "2gSupport"
  },
  "3gSupport": {
    "sample": "1",
    "name": "3gSupport"
  },
  "4gSupport": {
    "sample": "1",
    "name": "4gSupport"
  },
  "port": {
    "sample": "6060",
    "name": "port"
  },
  "maxPower": {
    "sample": "50",
    "name": "maxPower"
  },
  "sdrId": {
    "sample": "1",
    "name": "sdrId"
  },
  "rfChainId": {
    "sample": "1",
    "name": "rfChainId"
  },
  "btsList": {
    "sample": "1,2",
    "name": "btsList"
  },
  "loss": {
    "sample": "10",
    "name": "loss"
  },
  "rfList": {
    "sample": "1,2,3,4",
    "name": "rfList"
  },
  "alc": {
    "sample": "TRUE",
    "name": "alc"
  },
  "alcLevel": {
    "sample": "15",
    "name": "alcLevel"
  },
  "band": {
    "sample": "2100",
    "name": "band"
  },
  "gain": {
    "sample": "20",
    "name": "gain"
  },
  "rfControllerId": {
    "sample": "1",
    "name": "rfControllerId"
  },
  "tmsi": {
    "sample": "87307107",
    "name": "tmsi"
  },
  "btsId": {
    "sample": "1",
    "name": "btsId"
  },
  "btsName": {
    "sample": "1",
    "name": "btsName"
  },
  "time": {
    "sample": "7/24/2018 5:06:38 PM",
    "name": "time"
  },
  "operator": {
    "sample": "Pelephone",
    "name": "operator"
  },
  "arfcn": {
    "sample": "10738",
    "name": "arfcn"
  },
  "addressList": {
    "sample": "1",
    "name": "addressList"
  },
  "socialList": {
    "sample": "1,2,3",
    "name": "socialList"
  },
  "phoneList": {
    "sample": "1",
    "name": "phoneList"
  },
  "cellNumber": {
    "sample": "967-123-456-7891",
    "name": "cellNumber"
  },
  "phoneId": {
    "sample": "7",
    "name": "phoneId"
  },
  "city": {
    "sample": "Tel Aviv",
    "name": "city"
  },
  "country": {
    "sample": "Israel",
    "name": "country"
  },
  "streetAddress": {
    "sample": "47 Kikar Shalom",
    "name": "streetAddress"
  },
  "postalCode": {
    "sample": "04455-9025",
    "name": "postalCode"
  },
  "email": {
    "sample": "target@target.com",
    "name": "email"
  },
  "skype": {
    "sample": "TargetMe",
    "name": "skype"
  },
  "facebook": {
    "sample": "target.facebook123",
    "name": "facebook"
  },
  "otherSocialMedia": {
    "sample": "target.facebook123",
    "name": "otherSocialMedia"
  },
  "imei": {
    "sample": "425020322183426",
    "name": "imei"
  },
  "lastTMSI": {
    "sample": "D532C046",
    "name": "lastTMSI"
  },
  "noteId": {
    "sample": "",
    "name": "noteId"
  },
  "note": {
    "sample": "Hi this is a note",
    "name": "note"
  },
  "title": {
    "sample": "Note 1",
    "name": "title"
  },
  "author": {
    "sample": "user577",
    "name": "author"
  },
  "notesList": {
    "sample": "1",
    "name": "notesList"
  },
  "socialText": {
    "sample": "target@target.com",
    "name": "socialText"
  },
  "dateTime": {
    "sample": "7/24/2018 5:06:38 PM",
    "name": "dateTime"
  },
  "rat": {
    "sample": "UTMS",
    "name": "rat"
  },
  "date": {
    "sample": "7/24/2018 5:06:38 PM",
    "name": "date"
  },
  "isTarget": {
    "sample": "False",
    "name": "isTarget"
  },
  "interest": {
    "sample": "False",
    "name": "interest"
  },
  "mcc": {
    "sample": "425",
    "name": "mcc"
  },
  "mnc": {
    "sample": "3",
    "name": "mnc"
  },
  "cellId": {
    "sample": "707",
    "name": "cellId"
  },
  "ta": {
    "sample": "0",
    "name": "ta"
  },
  "lac": {
    "sample": "2350",
    "name": "lac"
  },
  "rac": {
    "sample": "0",
    "name": "rac"
  },
  "powerLvl": {
    "sample": "10",
    "name": "powerLvl"
  },
  "msisdn": {
    "sample": "183426425020322",
    "name": "msisdn"
  },
  "distance": {
    "sample": "-80",
    "name": "distance"
  },
  "runId": {
    "sample": "1",
    "name": "runId"
  },
  "rssi": {
    "sample": "-85",
    "name": "rssi"
  }
};
	constructor() { 

	}
  getSamples(){
    return this.samples;
  }
  // getSAMPLES(): Observable<SAMPLES[]> {
  //   console.log("in getSAMPLES");
  //   return this.http.get<SAMPLES[]>(this.scanURL)
  //   .pipe(
  //     tap(scans => this.log(`fetched scans`)),
  //     catchError(this.handleError('getScans', []))
  //   );
		// //return Observable.of(this.scans);
  // }
  
  // setSelectedSAMPLES(btsArr: Array<SAMPLES>){
  //   if(btsArr.length){
  //     console.log('setSelectedSAMPLES called');
  //   console.log(this.btsSelections);
  //     this.btsSelections.next(btsArr);
  //     //this.btsSelections = btsArr;
  //   }
  // }
  // // setSelectedSAMPLES(btsArr: Array<SAMPLES>){
  // //     if(btsArr.length){
  // //       this.btsSelections = btsArr;
  // //     }
  // // }
  // getAllSelectedSAMPLES() {
  //   console.log('getAllSelectedSAMPLES called');
  //   console.log(this.btsSelections);
  //   return this.btsSelections.asObservable();

    
  // }



	 //  *
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
   
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
 
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
 
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
 
  //     // Let the app keep running by returning an empty result.
  //     return Observable.of(result as T);
  //   };
  // }

  //  /** TODO: add a  MessageService */
  // private log(message: string, value?) {
  // 	console.log(message);
  // 	console.log(value || '');
  //   //this.messageService.add('ScanService: ' + message);
  // }
}

