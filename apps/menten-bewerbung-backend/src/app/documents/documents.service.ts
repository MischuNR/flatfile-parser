import {Injectable} from '@nestjs/common';
import {decodeFile} from "../../utils/decode-file";
import {Doc} from "shared";

@Injectable()
export class DocumentsService {
    private readonly docs: Doc[] = [];

    uploadFile(file: Express.Multer.File) {
        const fileContents = decodeFile(file);
        return 'This action adds a new document';
    }

    getAllDocuments(): Doc[] {
        return [];
    }

    getJsonForId(id: string) {

    }
}
