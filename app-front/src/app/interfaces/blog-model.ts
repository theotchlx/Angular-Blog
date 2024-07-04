export interface BlogModel {  // Reflects the 'blogs' table/collection in the backend.
    id: string;
    ownerId: string;
    title: string;
    description: string;
    created: Date;
    updated: Date;
}