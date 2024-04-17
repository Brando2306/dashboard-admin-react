export type EditableEntityArray<T> = (Omit<T, 'id'> | T)[];
export type CreateEntityArray<T> = Omit<T, 'id'>[];
// export type EditableFileEntityArray<T> =  (Omit<T, 'id'> | File)[];
export type EditEntity<T> = Omit<T, 'id'>;