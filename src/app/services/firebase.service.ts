import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    host = environment.host;
    storage: any;
    storageRef: any;

    constructor() {
        this.storage = getStorage();
        this.storageRef = ref(this.storage);
    }

    uploadFile(file: File): Promise<any> {
        const childRef = ref(this.storageRef, 'files/' + file.name);
        return uploadBytes(childRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }

    listAllFiles(): Promise<any> {
        return listAll(this.storageRef).then((result) => {
            console.log('List of files:');
            result.items.forEach((itemRef) => {
                console.log('File:', itemRef.name);
            });
        });
    }


}
