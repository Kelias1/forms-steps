import React, { useState, useEffect } from "react";
import { IStepsForm } from "../../interface";

export const StepsForm: React.FC<IStepsForm> = ({ onSubmit, editData }) => {
  const [date, setDate] = useState('');
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
      onSubmit(date, parseFloat(distance.toString()));
      setDate('');
      setDistance('');
    }
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