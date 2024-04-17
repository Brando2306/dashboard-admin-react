export interface PairPageModel {
    empty: boolean
    first: boolean
    last: boolean
    number: string
    numberOfElements: number
    totalElements: number
    totalPages: number
    content: PairModel[]
}

export type PairModel = {
    ParesID: number
    NombrePar: string
    NombreSonido: string
    Descripcion?: string
    Sintomatologia?: string
    Etiologia?: string
    Observacion?: string
    Posicion: number
    Imagen?: string
    ImagenUrl?: string
    is_active?: boolean
    is_deleted?: boolean
    created_date?: Date
    updated_date?: Date
    aud_creation_user_id?: string
    aud_update_user_id?: string
};

export interface PairCreateModel {
    name: string
    name_sound: string
    description: string
    symptomatology?: string
    etiology?: string
    observation?: string
    image_url?: string
    position?: number
}

export interface PairEditModel {
    id?: number;
    name: string
    name_sound: string
    description: string
    symptomatology?: string
    etiology?: string
    observation?: string
    image_url?: string
    position?: number
}

export type PairPositionQueryParamsModel = {
    positions: number[]
    pairs: number[]
};

export type PairPageQueryParamsModel = {
    page_size?: number
    page_number?: number
    search: string;
};