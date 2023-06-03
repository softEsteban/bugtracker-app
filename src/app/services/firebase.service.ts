import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

interface CustomMetadata {
    [key: string]: any;
}


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

    uploadFile(file: File, path?: string, metadata?: CustomMetadata) {
        const refUrl = (path || "") + file.name;
        const childRef = ref(this.storageRef, refUrl);

        return uploadBytes(childRef, file, { customMetadata: metadata })
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                return getDownloadURL(childRef)
                    .then((urlUpload) => {
                        console.log(urlUpload);
                        return urlUpload;
                    });
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                throw error;
            });
    }


    uploadFiles(files: File[], path?: string, metadata?: CustomMetadata): Promise<string[]> {
        const uploadPromises = files.map((file) => {
            const refUrl = (path || "") + file.name;
            const childRef = ref(this.storageRef, refUrl);

            return uploadBytes(childRef, file, { customMetadata: metadata })
                .then(() => getDownloadURL(childRef))
                .catch((error) => {
                    console.error('Error uploading file:', file.name, error);
                    throw error;
                });
        });

        return Promise.all(uploadPromises);
    }


    listAllFiles(): Promise<any> {
        return listAll(this.storageRef).then((result) => {
            console.log('List of files:');
            result.items.forEach((itemRef) => {
                console.log('File obj:', itemRef);
                console.log('File:', itemRef.name);
            });
        });
    }


}
