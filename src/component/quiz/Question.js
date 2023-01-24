import React from 'react'
import { Button, Card, CardContent } from '@mui/material'
import { Box } from '@mui/system'
function Question ({ currentQuestion, handleAnsChecked, showAnswer, result }) {
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
              {currentQuestion?.answers?.map(
              ({ answer_a, answer_b, answer_c, answer_d }) => {
                return (
                  <ul>
                    <li>
                      <Button
                        onClick={() =>
                          handleAnsChecked(
                            currentQuestion?.correct_answer,
                            answer_a
                          )
                        }
                      >
                        {answer_a}
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={() =>
                          handleAnsChecked(
                            currentQuestion?.correct_answer,
                            answer_b
                          )
                        }
                      >
                        {answer_b}
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={() =>
                          handleAnsChecked(
                            currentQuestion?.correct_answer,
                            answer_c
                          )
                        }
                      >
                        {answer_c}
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={() =>
                          handleAnsChecked(
                            currentQuestion?.correct_answer,
                            answer_d
                          )
                        }
                      >
                        {answer_d}
                      </Button>
                    </li>
                  </ul>
                )
              }
            )}
              {/* <ul>
                {Object.keys(currentQuestion?.answers[1])?.map(keyName => (
                  <li key={keyName}>
                    <Button
                      onClick={() =>
                        handleAnsChecked(
                          currentQuestion?.correct_answer,
                          keyName
                        )
                      }
                    >
                      {keyName}
                    </Button>
                  </li>
                ))}
              </ul> */}
            </Box>
          )}

          {/* Show Answer Button Code */}
          <Button
            variant='contained'
            size='large'
            style={{ backgroundColor: 'green', marginTop: '20px' }}
            onClick={() => showAnswer(currentQuestion?.id)}
          >
            {result.isShow ? 'Hide ' : 'Show '}Answer
          </Button>
          {/* {items?.isShow && (
                      <>
                        <h3 style={{ color: 'white' }}>
                          Correct Answer: {items?.correct_answer}
                          {console.log(items, 'result')}
                        </h3>
                        <h3 style={{ color: 'white' }}>
                          Explanation: {items?.explanation}
                        </h3>
                      </>
                    )} */}
        </CardContent>
      </Card>
    </div>
  )
}

export default Question
