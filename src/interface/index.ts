export interface IStep {
  id: number;
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
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}