import { Album } from '@prisma/client'

interface AlbumWithPhotos extends Album {
  photos: []
}

type UploadData = {
    key: string;
    url: string;
    name: string;
    size: number;
};
type UploadError = {
    code: string;
    message: string;
    data: any;
};

type UploadFileResponse = {
    data: UploadData;
    error: null;
} | {
    data: null;
    error: UploadError;
};
