import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

describe('_saveQuestion', () => {
  it('should save a question when all fields are provided', async () => {
    const questionData = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'sarahedo',
    };

    const result = await _saveQuestion(questionData);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('timestamp');
    expect(result).toMatchObject({
      author: 'sarahedo',
      optionOne: {
        votes: [],
        text: 'Option One',
      },
      optionTwo: {
        votes: [],
        text: 'Option Two',
      },
    });
  });

  it('should throw an error when required fields are missing', async () => {
    const incompleteQuestionData = {
      optionOneText: 'Option One',
      author: 'sarahedo',
    };

    await expect(_saveQuestion(incompleteQuestionData)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});

describe('_saveQuestionAnswer', () => {
  it('should save a question answer when all fields are provided', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };

    const result = await _saveQuestionAnswer(answerData);

    expect(result).toBe(true);
  });

  it('should throw an error when required fields are missing', async () => {
    const incompleteAnswerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
    };

    await expect(_saveQuestionAnswer(incompleteAnswerData)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
