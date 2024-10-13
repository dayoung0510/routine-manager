'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useGetDateList } from 'hooks/tasks';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage = () => {
  const user = useAtomValue(userAtom);

  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const { data } = useGetDateList({ userId: user.id });
  const recordedDateList = data?.map((i) => i.date);

  console.log(data);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    !!mounted && (
      <div style={{ width: '100%', background: 'white' }}>
        <StyledCalendar
          locale="en-EN"
          value={selectedDate}
          formatDay={(_, date) => dayjs(date).format('DD')}
          formatShortWeekday={(_, value) => dayjs(value).format('dd')}
          tileContent={({ date, view }) => {
            const stringValue = dayjs(date).format('YYYYMMDD');
            if (recordedDateList?.includes(stringValue)) {
              return (
                <div className="score">
                  ({data?.find((i) => i.date === stringValue)?.score})
                </div>
              );
            }
            return <></>;
          }}
        />
      </div>
    )
  );
};

export default CalendarPage;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  font-size: 18px;
  border: 0;
  background: 0;
  font-family: 'Dung';

  /* 날짜 타일 */
  .react-calendar__tile {
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  /* 달력 타일 */
  .react-calendar__tile {
  }

  /* 선택된 날짜 타일 */
  .react-calendar__tile--active {
    background: 0;
  }

  /* 호버 및 액티브 스타일 */
  .react-calendar__tile--active:active,
  .react-calendar__tile:focus,
  .react-calendar__tile:hover {
    background: 0;
  }

  /* 오늘 날짜에 대한 호버 및 액티브 스타일 */
  .react-calendar__tile--now:active,
  .react-calendar__tile--now:hover {
    background: 0;
  }

  /* 오늘 날짜 스타일 */
  .react-calendar__tile--now {
    color: ${({ theme }) => theme.colors.black0};
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }

  /* 요일 텍스트 */
  .react-calendar__month-view__weekdays {
    abbr {
      color: ${({ theme }) => theme.colors.black9};
      letter-spacing: 2px;
    }
  }

  /* 토요일 요일 스타일 */
  .react-calendar__month-view__weekdays__weekday:nth-child(6) abbr {
    color: ${({ theme }) => theme.colors.blue};
  }

  /* 일요일 요일 스타일 */
  .react-calendar__month-view__weekdays__weekday:nth-child(7) abbr {
    color: ${({ theme }) => theme.colors.red};
  }

  .score {
    color: ${({ theme }) => theme.colors.purple};
  }
`;
