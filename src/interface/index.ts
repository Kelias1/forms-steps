export interface IStep {
  date: string;
  distance: number;
}

export interface ISteps {
  date: string;
  distance: number;
}

export interface IStepsForm {
  onSubmit: (date: string, distance: number) => void;
  editData?: { date: string; distance: number };
}

export interface IStepsRender {
  steps: ISteps[];
  onDelete: (date: string) => void;
  onEdit: (date: string) => void;
}