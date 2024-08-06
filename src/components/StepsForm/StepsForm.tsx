import React, { useState, useEffect } from "react";
import { IStepsForm, IStep } from "../../interface";
import { v4 as uuidv4 } from 'uuid';

export const StepsForm: React.FC<IStepsForm> = ({ editData, setSteps, setEditData }) => {
  const [date, setDate] = useState<string>('');
  const [distance, setDistance] = useState<number | string>('');

  useEffect(() => {
    if (editData) {
      setDate(editData.date);
      setDistance(editData.distance);
    }
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && distance !== '') {
      if (editData) {
        updateStep(editData.id, date, parseFloat(distance.toString()));
      } else {
        addOrUpdateStep(date, parseFloat(distance.toString()));
      }
      setDate('');
      setDistance('');
    }
  };

  const addOrUpdateStep = (date: string, distance: number) => {
    setSteps((prevSteps) => {
      const existingStep = prevSteps.find((step) => step.date === date);
      if (existingStep) {
        existingStep.distance += distance;
      } else {
        prevSteps.push({ id: uuidv4(), date, distance });
      }
      return [...prevSteps].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  const updateStep = (id: number, date: string, distance: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.id === id) {
          return {
            ...step,
            date,
            distance: step.date === date ? step.distance + distance : distance,
          };
        }
        return step;
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
    setEditData(undefined);
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDistance = e.target.value;
    if (!isNaN(parseFloat(inputDistance))) {
      setDistance(inputDistance);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date" className="date__form">Дата (ДД.ММ.ГГ)</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="distance" className="distance__form">Пройдено км</label>
        <input
          id="distance"
          type="text"
          value={distance}
          onChange={handleDistanceChange}
          required
          step="0.1"
        />
      </div>
      <button className='btn__submit' type="submit">Ok</button>
    </form>
  );
};
