import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent } from '@mui/material'
import { Box } from '@mui/system'
function Question ({ currentQuestion, handleAnsChecked }) {
  const answerOptions = currentQuestion?.answers[0]
  const [buttonColor, setSetButtonColor] = useState({
    buttonValue: '',
    selected: false
  })
  const { buttonValue, selected } = buttonColor
  const [isCorrect, setIsCorrect] = useState(false)
  const [show, setShow] = useState({
    showAnswerId: '',
    isShow: false
  })
  const { isShow, showAnswerId } = show
  const showAnswer = id => {
    setShow({ ...show, showAnswerId: id, isShow: !isShow })
  }
  useEffect(() => {
    setShow({ ...show, isShow: false })
  }, [currentQuestion?.id])
  return (
    <div key={currentQuestion?.id}>
      <Card
        sx={{
          minWidth: '80%',
          backgroundColor: 'black',
          height: 'auto'
        }}
      >
        <CardContent>
          {/********Question Dislpay Code*********/}
          <Box
            sx={{
              width: '100%',
              height: 45,
              backgroundColor: 'white',
              borderRadius: '5px'
            }}
          >
            <h2 style={{ color: 'blue', marginTop: 30 }}>
              <pre>
                {currentQuestion?.id} : {currentQuestion?.question}
              </pre>
            </h2>
          </Box>

          {/********Options Dislpay Code*********/}

          {currentQuestion?.answers && (
            <Box className='li' sx={{ width: '100%', height: 320 }}>
              <ul>
                {Object.keys(answerOptions)?.map(keyName => (
                  <li
                    key={keyName}
                    style={{
                      backgroundColor:
                        buttonValue === answerOptions[keyName] &&
                        selected &&
                        isCorrect
                          ? 'green'
                          : buttonValue === answerOptions[keyName] &&
                            selected &&
                            !isCorrect
                          ? 'red'
                          : 'white'
                    }}
                    onClick={() => {
                      setIsCorrect(
                        handleAnsChecked(
                          currentQuestion?.correct_answer,
                          answerOptions[keyName],
                          currentQuestion.id
                        )
                      )
                      setSetButtonColor({
                        buttonValue: answerOptions[keyName],
                        selected: true
                      })
                    }}
                  >
                    <Button
                      style={{
                        color:
                          buttonValue === answerOptions[keyName] &&
                          selected &&
                          isCorrect
                            ? 'black'
                            : buttonValue === answerOptions[keyName] &&
                              selected &&
                              !isCorrect
                            ? 'black'
                            : '#1976d2'
                      }}
                    >
                      {answerOptions[keyName]}
                    </Button>
                  </li>
                ))}
              </ul>
            </Box>
          )}

          {/* Show Answer Button Code */}
          <Button
            variant='contained'
            size='large'
            style={{ backgroundColor: 'green', marginTop: '20px' }}
            onClick={() => showAnswer(currentQuestion?.id)}
          >
            {showAnswerId === currentQuestion.id && isShow ? 'Hide ' : 'Show '}
            Answer
          </Button>
          {showAnswerId === currentQuestion.id && isShow && (
            <>
              <h3 style={{ color: 'white' }}>
                Correct Answer: {currentQuestion?.correct_answer}
              </h3>
              <h3 style={{ color: 'white' }}>
                Explanation: {currentQuestion?.explanation}
              </h3>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Question
