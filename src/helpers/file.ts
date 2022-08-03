import { snakeCase } from 'lodash';
import { SerializableFileType } from '../types/common';

export const convertFileToSerializable = (file: File): SerializableFileType => {
    return {
        id: '0',
        name: file.name,
        type: file.type,
        size: file.size,
        uri: URL.createObjectURL(file),
        lastModified: file.lastModified,
    };
};

export const blobCreationFromURL = (inputURI: string) => {
    var binaryVal;

    // mime extension extraction
    var inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];

    // Extract remaining part of URL and convert it to binary value
    if (inputURI.split(',')[0].indexOf('base64') >= 0)
        binaryVal = atob(inputURI.split(',')[1]);
    // Decoding of base64 encoded string
    else binaryVal = unescape(inputURI.split(',')[1]);

    // Computation of new string in which hexadecimal
    // escape sequences are replaced by the character
    // it represents

    // Store the bytes of the string to a typed array
    var blobArray = [];
    for (var index = 0; index < binaryVal.length; index++) {
        blobArray.push(binaryVal.charCodeAt(index));
    }

    return new Blob([blobArray as unknown as BlobPart], {
        type: inputMIME,
    });
};

export const convertAttachmentIntoSerializable = (
    attachments: Array<any> | any
) => {
    if (!attachments) return attachments;
    if (Array.isArray(attachments)) {
        const convertedAttachments: Array<SerializableFileType> = [];
        for (const attachment of attachments) {
            convertedAttachments.push({
                id: attachment.id,
                uri: process.env.REACT_APP_BASE_URL + attachment.url,
            });
        }
        return convertedAttachments;
    } else {
        return {
            id: attachments.id,
            uri: process.env.REACT_APP_BASE_URL + attachments.url,
        };
    }
};
export const convertObjectToFormData = <T>(data: T) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(snakeCase(key), data[key as keyof T] as any);
    }
    return formData;
};

export const appImageUrl = (url: string | undefined | null) => {
    if (!url) return '';
    if (url.startsWith('http://' || url.startsWith('https://'))) return url;

    if (!url.startsWith('/')) {
        url = '/' + url;
    }
    return process.env.REACT_APP_BASE_URL + url;
};
