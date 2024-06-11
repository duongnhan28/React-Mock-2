import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSubmitAnswer } from '../../redux/pollSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { selectLogin } from '../../redux/loginSlice';
import { ANSWER_OPTION } from '../../constants/constant';
import { checkIfAnswered } from '../../redux/utils/common';
import { ChoiceCard } from '../components/ChoiceCard';

const Poll = () => {
  const dispatch = useDispatch();
  const allQuestions = useSelector((state) => state.polls.polls);
  const loading = useSelector((state) => state.polls.loading);
  const users = useSelector((state) => state.users.users);
  const authedUser = useSelector(selectLogin);
  const locationPathname = useLocation().pathname;
  const questionId = locationPathname.split('/')[2];
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [noUserSelectOption1, setNoUserSelectOption1] = useState(0);
  const [noUserSelectOption2, setNoUserSelectOption2] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const isAnswered =
    !!Object.keys(currentQuestion).length && checkIfAnswered(currentQuestion, authedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!allQuestions[questionId]) {
      navigate('/404');
    }
    setCurrentQuestion(allQuestions[questionId]);
    setNoUserSelectOption1(allQuestions[questionId]?.optionOne?.votes?.length || 0);
    setNoUserSelectOption2(allQuestions[questionId]?.optionTwo?.votes?.length || 0);
    setTotalVotes(
      (allQuestions[questionId]?.optionOne?.votes?.length || 0) +
        (allQuestions[questionId]?.optionTwo?.votes?.length || 0),
    );
    setPercent1(Math.round((noUserSelectOption1 / totalVotes) * 100));
    setPercent2(Math.round((noUserSelectOption2 / totalVotes) * 100));
  }, [allQuestions, currentQuestion]);

  const selectOptionOne = (e) => {
    e.preventDefault();
    dispatch(
      handleSubmitAnswer({ qid: currentQuestion.id, answer: ANSWER_OPTION.OPTION_ONE, authedUser }),
    );
  };
  const selectOptionTwo = (e) => {
    e.preventDefault();
    dispatch(
      handleSubmitAnswer({ qid: currentQuestion.id, answer: ANSWER_OPTION.OPTION_TWO, authedUser }),
    );
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ my: 5 }}>
        Polls by {currentQuestion.author}
      </Typography>
      <Box
        component="img"
        sx={{
          height: 200,
          width: 200,
          maxHeight: { xs: 233, md: 200 },
          maxWidth: { xs: 200, md: 200 },
        }}
        alt="author avatar"
        src={users[currentQuestion.author]?.avatarURL}
      />
      <Typography variant="h3" sx={{ my: 5 }}>
        Would you rather
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <ChoiceCard
          loading={loading}
          isAnswered={isAnswered}
          clickHandler={selectOptionOne}
          isSelected={users[authedUser]?.answers[questionId] === ANSWER_OPTION.OPTION_ONE}
          sx={{ flex: 1, minWidth: '45%', textAlign: 'center' }}
        >
          <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>
            {currentQuestion.optionOne?.text}
          </Typography>
        </ChoiceCard>
        <ChoiceCard
          loading={loading}
          isAnswered={isAnswered}
          clickHandler={selectOptionTwo}
          isSelected={users[authedUser]?.answers[questionId] === ANSWER_OPTION.OPTION_TWO}
          sx={{ flex: 1, minWidth: '45%', textAlign: 'center' }}
        >
          <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>
            {currentQuestion.optionTwo?.text}
          </Typography>
        </ChoiceCard>
      </Box>
      {isAnswered && (
        <Box sx={{ display: 'flex', mt: 2, border: '1px solid grey', width: '100%' }}>
          <Box
            sx={{
              width: `${percent1}%`,
              backgroundColor: 'blue',
            }}
          >
            {!!noUserSelectOption1 && (
              <Typography sx={{ p: 1 }} variant="body1" color="white">
                {noUserSelectOption1}/{totalVotes} votes, {percent1}%
              </Typography>
            )}
          </Box>
          <Box sx={{ flex: 1, backgroundColor: 'green' }}>
            {!!noUserSelectOption2 && (
              <Typography sx={{ p: 1 }} variant="body1" color="initial">
                {noUserSelectOption2}/{totalVotes} votes, {percent2}%
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Poll;
