import { Button, Card, CardContent } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Question from './Question'

import './quiz.css'

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState([])
  const [question, setQuestion] = useState('')
  const [showFinalResult, setFinalResult] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [questionNo, setQuestionNo] = useState(0)
  const [items, setItems] = useState('')
  const [score, setScore] = useState(0)
  const [result, setResult] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!question) {
      axios({
        method: 'get',
        url: ' http://localhost:3000/quizData'
      }).then(function (res) {
        console.log(res)
        setCurrentQuestion(res.data)
        setQuestion(res.data[questionNo])
      })
    }
  }, [questionNo])

  const handleAnsChecked = (correct_answer, option) => {
    if (correct_answer === option) {
      console.log('Correct')
      setScore(score + 1)
    } else {
      console.log('wrong')
      if (score) setScore(score - 1)
    }
  }

  const showAnswer = id => {
    const item = currentQuestion.find(question => question.id === id)
    //setCurrentQuestion({...currentQuestion,})
    //console.log("itesms==>>>",items)
    // setIsShow(!isShow);
    //setResult({...items,...result});
    setItems(item)

    if (item.id) {
      setIsShow(!isShow)
      setItems({ ...items, isShow: isShow })
    }
    console.log(result, 'result')
  }
  const onPrevious = () => {
    if (questionNo >= 1) {
      setQuestionNo(questionNo - 1)
      setQuestion(currentQuestion[questionNo])
    }
  }
  const onNext = () => {
    if (currentQuestion.length > questionNo) {
      setQuestionNo(questionNo + 1)
      setQuestion(currentQuestion[questionNo])
    }
  }
  const handleSubmit = () => {
    window.alert('Quiz Submmited...')
    setFinalResult(true)
  }
  const handleRestart = () => {
    navigate('/')
  }
  return (
    <div>
      {showFinalResult ? (
        <div className='box'>
          <Card className='result-card'>
            <p
              style={{
                color: 'white',
                padding: 10,
                fontSize: 35,
                fontWeight: 'bold'
              }}
            >
              Result Page
            </p>
            <h1 style={{ color: 'maroon', padding: 15 }}>
              Final Score: {score}
            </h1>
            <Button
              variant='contained'
              color='success'
              style={{
                borderRadius: 10,
                fontSize: 25,
                fontWeight: 'bold',
                padding: 5,
                margin: 10
              }}
              onClick={handleRestart}
            >
              Restat Game
            </Button>
          </Card>
        </div>
      ) : (
        <div className='box'>
          <div>
            {/* {currentQuestion.map(currentQuestion => ( */}
            {question && (
              <Question
                currentQuestion={question}
                handleAnsChecked={handleAnsChecked}
                showAnswer={showAnswer}
                result={result}
              />
            )}
            {/* /))} */}
            <div style={{ display: 'flex' }}>
              <Button
                variant='contained'
                color='primary'
                style={{
                  width: '60%',
                  margin: 20,
                  height: 50,
                  padding: 10,
                  fontSize: 30,
                  fontWeight: 'bold'
                }}
                disabled={questionNo === 0}
                onClick={onPrevious}
              >
                Previous
              </Button>
              <Button
                variant='contained'
                color='primary'
                style={{
                  width: '60%',
                  margin: 20,
                  height: 50,
                  padding: 10,
                  fontSize: 30,
                  fontWeight: 'bold'
                }}
                disabled={currentQuestion.length === questionNo}
                onClick={onNext}
              >
                Next
              </Button>
            </div>
            {/*Submit Button */}
            {currentQuestion.length === questionNo && (
              <div>
                <Button
                  variant='contained'
                  color='primary'
                  style={{
                    width: '60%',
                    margin: 20,
                    height: 50,
                    padding: 10,
                    fontSize: 30,
                    fontWeight: 'bold'
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Quiz
