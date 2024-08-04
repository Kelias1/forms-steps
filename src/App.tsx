import { useState } from "react";
import { StepsForm } from "./components/StepsForm";
import { StepsRender } from "./components/StepsRender";
import { IStep } from "./interface";
import './App.css';

const App: React.FC = () => {
  const [steps, setSteps] = useState<IStep[]>([]);
  const [editData, setEditData] = useState<IStep | undefined>(undefined)

  const addStep = (date: string, distance: number) => {
    setSteps((prevSteps) => {
      const existingStep = prevSteps.find((w) => w.date === date);
      if (existingStep) {
        return prevSteps.map((w) =>
          w.date === date ? { ...w, distance: w.distance + distance } : w
        );
      }
      return [...prevSteps, { date, distance }].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    setEditData(undefined);
  };

  const deleteStep = (date: string) => {
    setSteps((prevSteps) => prevSteps.filter((w) => w.date !== date));
  };

  const editStep= (date: string) => {
    const step = steps.find((w) => w.date === date);
    if (step) {
      setEditData(step);
    }
  };

  return (
    <div className="App">
      <StepsForm onSubmit={addStep} editData={editData} />
      <StepsRender steps={steps} onDelete={deleteStep} onEdit={editStep} />
    </div>
  );
};

export default App;