'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useGetDateList } from 'hooks/tasks';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import CalendarModal from 'components/organisms/CalendarModal';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage = () => {
  const user = useAtomValue(userAtom);

  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [modalOpen, setModalOpen] = useState(false);

  // 모든데이터가 아닌, 한달치 데이터만 불러오기 위함
  const [renderedYear, setRenderedYear] = useState<number | undefined>(
    selectedDate ? selectedDate.getFullYear() : undefined,
  );
  const [renderedMonth, setRenderedMonth] = useState<number | undefined>(
    selectedDate ? selectedDate.getMonth() + 1 : undefined,
  );

  const { data } = useGetDateList({
    userId: user.id,
    year: renderedYear,
    month: renderedMonth,
  });
  const recordedDateList = data?.map((i) => i.date);

  const today = dayjs().format('YYYYMMDD');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    !!mounted && (
      <div style={{ width: '100%', background: 'white' }}>
        <StyledCalendar
          locale="en-EN"
          value={selectedDate}
          onClickDay={(date) => {
            const formattedDate = dayjs(date).format('YYYYMMDD');
            if (recordedDateList?.includes(formattedDate)) {
              setSelectedDate(date);
              setModalOpen(true);
            }
          }}
          formatDay={(_, date) => dayjs(date).format('DD')}
          formatShortWeekday={(_, value) => dayjs(value).format('dd')}
          onActiveStartDateChange={({ activeStartDate }) => {
            if (activeStartDate) {
              const year = activeStartDate?.getFullYear();
              const month = activeStartDate?.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
              setRenderedYear(year);
              setRenderedMonth(month);
            }
          }}
          tileContent={({ date, view }) => {
            const stringValue = dayjs(date).format('YYYYMMDD');
            if (recordedDateList?.includes(stringValue)) {
              return (
                <div className="score">
                  {data?.find((i) => i.date === stringValue)?.score}
                </div>
              );
            }
            return <></>;
          }}
        />

        {modalOpen && user.id && (
          <CalendarModal
            open={modalOpen}
            onClose={() => {
              setSelectedDate(null);
              setModalOpen(false);
            }}
            date={dayjs(selectedDate).format('YYYYMMDD')}
            userId={user.id}
          />
        )}
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

  /* 평일 달력 타일 */
  .react-calendar__tile {
    color: ${({ theme }) => theme.colors.black5};
  }

  /* 주말 달력 타일 */
  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => theme.colors.black5};
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
    background: 0 !important;
    background-color: 0 !important;

    abbr {
      color: ${({ theme }) => theme.colors.black0};
      text-decoration: underline;
    }
  }

  /* 요일 텍스트 */
  .react-calendar__month-view__weekdays {
    color: ${({ theme }) => theme.colors.black9};
    letter-spacing: 2px;
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
    padding: 1px 5px;
    background-color: ${({ theme }) => theme.colors.red};
    color: #fff;
    border-radius: 0.5rem;
  }
`;
