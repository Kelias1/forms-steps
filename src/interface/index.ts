// src/interface/index.ts
export interface IStep {
  id: string;
  date: string;
  distance: number;
}

export interface IStepsForm {
  editData: IStep | undefined;
  setSteps: React.Dispatch<React.SetStateAction<IStep[]>>;
  setEditData: React.Dispatch<React.SetStateAction<IStep | undefined>>;
}

export interface IStepsRender {
  steps: IStep[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
