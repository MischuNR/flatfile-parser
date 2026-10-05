import {Controller, Get, Post, Param, UseInterceptors, UploadedFile, BadRequestException, Res} from '@nestjs/common';
import {DocumentsService} from './documents.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {Doc, documentBaseRoute, documentGetJsonFileRoute} from 'shared';
import type {Response} from 'express';

@Controller(documentBaseRoute)
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    public uploadFile(@UploadedFile() file?: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException(`Das Feld 'file' ist nicht gesetzt. Eine Datei muss geschickt werden.`);
        }
        return this.documentsService.uploadFile(file);
    }

    @Get()
    public getAllDocuments(): Doc[] {
        return this.documentsService.getAllDocuments();
    }

    @Get(documentGetJsonFileRoute)
    public getJsonFileById(
        @Param('id') id: string,
        @Res({passthrough: true}) res: Response
    ) {
        const {fileName, data} = this.documentsService.getJsonForId(id);
        res.set({
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': 'application/json',
        });
        return data;
    }
}
