import styled from 'styled-components';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/icon/Icon';
import { useMediaQuery } from 'hooks/useMediaQuery';

type Props = {
  handleScore: (score: number) => void;
  score: number;
};

const ScorePanel = ({ score, handleScore }: Props) => {
  const isMobile = useMediaQuery();

  const handleMinus = () => {
    handleScore(score - 1);
  };

  const handlePlus = () => {
    handleScore(score + 1);
  };

  return (
    <Container>
      <Button
        type="button"
        size="sm"
        color="lilac"
        onClick={handleMinus}
        disabled={score < 2}
      >
        -
      </Button>
      <ScoreWrapper>{score}</ScoreWrapper>
      <Button
        type="button"
        size="sm"
        color="purple"
        onClick={handlePlus}
        disabled={score > 9}
      >
        +
      </Button>
    </Container>
  );
};

export default ScorePanel;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;

  ${({ theme }) => theme.device.mobile} {
    column-gap: 0.5rem;
  }
`;

const ScoreWrapper = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;
