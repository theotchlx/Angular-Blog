export interface BlogModel {  // Reflects the 'blogs' table/collection in the backend.
    id: string;
    title: string;
    description: string;
    created: Date;
    updated: Date;
}