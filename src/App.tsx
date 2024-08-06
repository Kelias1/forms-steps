import React, { useState } from "react";
import { StepsForm } from "./components/StepsForm";
import { StepsRender } from "./components/StepsRender";
import { IStep } from "./interface";
import './App.css';

const App: React.FC = () => {
  const [steps, setSteps] = useState<IStep[]>([]);
  const [editData, setEditData] = useState<IStep | undefined>(undefined);

  const deleteStep = (id: number) => {
    setSteps((prevSteps) => prevSteps.filter((w) => w.id !== id));
  };

  const editStep = (id: number) => {
    const step = steps.find((w) => w.id === id);
    if (step) {
      setEditData(step);
    }
  };

  return (
    <div className="App">
      <StepsForm editData={editData} setSteps={setSteps} setEditData={setEditData} />
      {/* @ts-ignore */}
      <StepsRender steps={steps} onDelete={deleteStep} onEdit={editStep} />
    </div>
  );
};

export default App;