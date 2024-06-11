import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import PollsList from '../components/PollsList';
import { ANSWER_TYPE } from '../../constants/constant';

const Dashboard = () => { 
  const authedUser = useSelector((state) => state.login.authedUser);
  const [newQuestions, setNewQuestions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const allQuestions = useSelector((state) => state.polls.polls);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (authedUser) {
      const answeredQuestionIds = Object.keys(users[authedUser].answers).sort(
        (firstQId, secondQId) => allQuestions[secondQId].timestamp - allQuestions[firstQId].timestamp
      );
      const newQuestionIds = Object.keys(allQuestions)
        .filter((questionId) => !users[authedUser].answers[questionId])
        .sort((firstQId, secondQId) => allQuestions[secondQId].timestamp - allQuestions[firstQId].timestamp);
      setNewQuestions(
        newQuestionIds.reduce((acc, questionId) => ({ ...acc, [questionId]: allQuestions[questionId] }), {})
      );
      setAnsweredQuestions(
        answeredQuestionIds.reduce((acc, questionId) => ({ ...acc, [questionId]: allQuestions[questionId] }), {})
      );
    }
  }, [authedUser, allQuestions, users]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <PollsList questions={newQuestions} questionType={ANSWER_TYPE.UNANSWERED} />
        <PollsList questions={answeredQuestions} questionType={ANSWER_TYPE.ANSWERED} />
      </Box>
    </Container>
  );
};

export default Dashboard;