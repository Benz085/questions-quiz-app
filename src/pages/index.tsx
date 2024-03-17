// pages/index.tsx
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { shuffle } from 'lodash';

const generateMockQuestions = () => {
  const mockQuestions = [];
  const questionCount = 20;

  for (let i = 1; i <= questionCount; i++) {
    const question = {
      id: i,
      question: `Question ${i}`,
      answers: [`Answer 1 for Question ${i}`, `Answer 2 for Question ${i}`, `Answer 3 for Question ${i}`, `Answer 4 for Question ${i}`],
      correctAnswer: Math.floor(Math.random() * 4), // Random correct answer index (0-3)
    };
    mockQuestions.push(question);
  }

  return mockQuestions;
};

const IndexPage = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const randomizedQuestions = shuffle(generateMockQuestions()).slice(0, 20);
    const randomizedAnswers = randomizedQuestions.map((question: any) =>
      shuffle(question.answers)
    );
    setQuestions(randomizedQuestions);
    setAnswers(randomizedAnswers);
  }, []);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const correctAnswer = questions[questionIndex].correctAnswer;
    if (answerIndex === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Quiz Application
        </Typography>
        <List>
          {questions.map((question, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Q${index + 1}: ${question.question}`}
                secondary={
                  <ul>
                    {answers[index].map((answer: string, answerIndex: number) => (
                      <li key={answerIndex}>
                        <Button variant="outlined" onClick={() => handleAnswer(index, answerIndex)}>
                          {answer}
                        </Button>
                      </li>
                    ))}
                  </ul>
                }
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h5" align="center">
          Score: {score}
        </Typography>
      </Box>
    </Container>
  );
};

export default IndexPage;
