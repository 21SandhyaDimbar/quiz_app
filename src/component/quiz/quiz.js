import { Button, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [showFinalResult, setFinalResult] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [items, setItems]=useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: " http://localhost:3000/quizData",
    }).then(function (res) {
      console.log(res);
      setCurrentQuestion(res.data);
     
    });
  }, []);

  const handleAnsChecked = (correct_answer,option) => {
    if (correct_answer===option) {
      console.log("Correct");
      setScore(score + 1);
    } else {
      console.log("wrong");
      if(score)
      setScore(score-1);
    }
  };

  const showAnswer = (id) => {
  const  item = currentQuestion.find((question)=>question.id ===id);
   //setCurrentQuestion({...currentQuestion,})
   //console.log("itesms==>>>",items)
   // setIsShow(!isShow);
         //setResult({...items,...result});
         setItems(item);
         
         if(item.id){
          setIsShow(!isShow);
          setItems({...items,isShow:isShow})
         }
         console.log(result,'result');
       };

  const handleSubmit = () => {
    window.alert("Quiz Submmited...");
    setFinalResult(true);
  };
  const handleRestart = () => {
    navigate("/");
  };
  return (
    <div>
      {showFinalResult ? (
        <div className="box">
          <Card className="result-card">
            <p
              style={{
                color: "white",
                padding: 10,
                fontSize: 35,
                fontWeight: "bold",
              }}
            >
              {" "}
              Result Page
            </p>
            <h1 style={{ color: "maroon", padding: 15 }}>
              {" "}
              Final Score: {score}
            </h1>
            <Button
              variant="contained"
              color="success"
              style={{
                borderRadius: 10,
                fontSize: 25,
                fontWeight: "bold",
                padding: 5,
                margin: 10,
              }}
              onClick={handleRestart}
            >
              Restat Game
            </Button>
          </Card>
        </div>
      ) : (
        <div className="box">
          <div>
            {currentQuestion.map((currentQuestion) => (
              <div key={currentQuestion.id}>
                <Card
                  sx={{
                    minWidth: "80%",
                    backgroundColor: "black",
                    height:'auto',
                  }}
                >
                  <CardContent>
                    {/********Question Dislpay Code*********/}
                    <Box
                      sx={{
                        width: "100%",
                        height: 45,
                        backgroundColor: "white",
                        borderRadius: "5px",
                      }}
                    >
                      <h2 style={{ color: "blue", marginTop: 30 }}>
                        <pre>
                          {currentQuestion.id} : {currentQuestion.question}
                        </pre>
                      </h2>
                    </Box>

                    {/********Options Dislpay Code*********/}

                    <Box className="li" sx={{ width: "100%", height: 320 }}>
                      {currentQuestion?.answers?.map(({answer_a, answer_b, answer_c, answer_d}) => {
                        return (
                          <ul>
                            <li >
                              <Button onClick={()=> handleAnsChecked(currentQuestion.correct_answer,answer_a)}>{answer_a}</Button>
                              
                              {/* <input type="radio" name={currentQuestion.id} value={choice.id}
                                onChange={() => handleAnsChecked(choice.isCorrect) } />
                              {choice.text} */}
                            </li>
                            <li >
                              <Button onClick={()=> handleAnsChecked(currentQuestion.correct_answer,answer_b)}>{answer_b}</Button>
                            </li>
                            <li >
                              <Button onClick={()=> handleAnsChecked(currentQuestion.correct_answer, answer_c)}>{answer_c}</Button>
                            </li>
                            <li >
                              <Button onClick={()=> handleAnsChecked(currentQuestion.correct_answer, answer_d)}>{answer_d}</Button>
                            </li>
                          </ul>
                        );
                      })}
                    </Box>

                    {/* Show Answer Button Code */}
                    <Button
                      variant="contained"
                      size="large"
                      style={{ backgroundColor: "green", marginTop: "20px" }}
                      onClick={() =>showAnswer(currentQuestion.id)}
                    >
                      {result.isShow?"Hide ":"Show "}Answer
                    </Button>
                    {/* {result?.isShow  && (
                      <>
                        <h3 style={{ color: "white" }}>
                          
                          Correct Answer: {result?.correct_answer}
                        </h3>
                        <h3 style={{ color: "white" }}>
                          Explanation: {result?.explanation}
                        </h3>
                      </>
                    )} */}
                  </CardContent>
                  {items?.isShow  && (
                      <>
                        <h3 style={{ color: "white" }}>
                          
                          Correct Answer: {items?.correct_answer}
                        {console.log(items,"result")}
                        </h3>
                        <h3 style={{ color: "white" }}>
                          Explanation: {items?.explanation}
                        </h3>
                      </>
                    )}
                </Card>
              </div>
            ))}
            <div></div>
             
             {/*Submit Button */}
            <div>
              <Button variant="contained" color="primary"
                style={{width: "60%", margin: 20, height: 50, padding: 10, fontSize: 30, fontWeight: "bold",}}
                onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Quiz;
