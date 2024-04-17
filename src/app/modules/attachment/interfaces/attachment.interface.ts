export interface Attachment {
    is_photo?:     boolean;
    is_active?:    boolean;
    id?:           string;
    fieldname?:    string;
    filename?:     string;
    originalname?: string;
    encoding?:     string;
    mimetype?:     string;
    size?:         string;
    bucket?:       string;
    location?:     string;
    created_date?: Date;
    updated_date?: Date;
}
