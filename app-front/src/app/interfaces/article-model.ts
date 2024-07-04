export interface Article {  // Reflects the 'articles' table/collection in the backend.
    id: string;
    blogId: string;
    authorId: string;
    title: string;
    content: string;
    created: Date;
    updated: Date;
}