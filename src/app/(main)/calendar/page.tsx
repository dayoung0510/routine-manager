'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage = () => {
  const [mounted, setMounted] = useState(false);
  const [value, onChange] = useState<Value>();

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log('v', value);

  return (
    !!mounted && (
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
    )
  );
};

export default CalendarPage;
