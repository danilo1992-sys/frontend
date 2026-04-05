export interface Actividad {
  id?: string;
  titulo: string;
  hora: string;
}

export interface Evento {
  id?: number;
  nombre: string;
  fecha: string;
  direccion: string;
  descripcion: string;
  actividades?: Actividad[];
}

export interface FormData {
  nombre: string;
  fecha: string;
  direccion: string;
  descripcion: string;
}

export type PageState = boolean;

export interface FormStoreState {
  pageState: PageState;
  setPageState: (state: PageState) => void;
  isSaving: boolean;
  setIsSaving: (state: boolean) => void;
}

export interface DeleteStoreState {
  pageState: PageState;
  setPageState: (state: PageState) => void;
}
