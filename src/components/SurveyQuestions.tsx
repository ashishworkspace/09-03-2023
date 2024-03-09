import React, { useState } from "react";

const QuestionArray = [
  { questions: "How satisfied are you with our products?", type: "rating", range: 5 },
  { questions: "How fair are the prices compared to similar retailers?", type: "rating", range: 5 },
  { questions: "How satisfied are you with the value for money of your purchase?", type: "rating", range: 5 },
  { questions: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", range: 10 },
  { questions: "What could we do to improve our service?", type: "text" },
];

const SurveyQuestions = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userResponses, setUserResponses] = useState<Array<string | number>>([]);
  const [surveyCompleted, setSurveyCompleted] = useState<boolean>(false);

  const handleRatingClick = (value: number) => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentIndex] = value;
    setUserResponses(updatedResponses);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentIndex] = event.target.value;
    setUserResponses(updatedResponses);
  };

  const handleFinish = () => {
    const resp: { questions: string, value: number | string }[] = []
    QuestionArray.forEach((each, index) => {
      resp.push({ questions: each.questions, value: userResponses[index] })
    });
    localStorage.setItem('userResponses', JSON.stringify(resp));
    setUserResponses([]);
    setSurveyCompleted(true);
    setTimeout(() => {
      setSurveyCompleted(false);
      setCurrentIndex(0);
    }, 15000);
  };

  const renderInput = () => {
    const currentQuestion = QuestionArray[currentIndex];
    if (currentQuestion.type === "rating") {
      return (
        <div className="flex space-x-4 max-w-[80%] flex-wrap">
          {[...Array(currentQuestion.range)].map((_, i) => (
            <button
              key={i}
              className={`bg-${Number(userResponses[currentIndex]) === i + 1 ? "emerald-600" : "sky-600"} text-white p-3 min-w-11 font-semibold hover:bg-sky-800 rounded-lg m-2`}
              onClick={() => handleRatingClick(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    } else if (currentQuestion.type === "text") {
      return (
        <textarea
          rows={4}
          cols={50}
          placeholder="Type your response here..."
          className="p-2 border border-gray-300 rounded-md bg-black/35"
          value={userResponses[currentIndex] || ""}
          onChange={handleTextChange}
        />
      );
    }

    return null;
  };

  return (
    <section className="md:w-[600px] md:h-[500px] bg-black/25 shadow-xl rounded-2xl flex flex-col justify-around items-center h-full w-full p-4">
      {
        surveyCompleted ? (<p className="text-2xl text-center text-white">Thanks for your feedback!</p>) : (<>
          <h1 className="font-bold text-3xl text-sky-400">Customer survey</h1>
          <p className="text-white self-end mr-20 text-xl">{currentIndex + 1}/{QuestionArray.length}</p>
          <p className="font-semibold text-xl max-w-[80%]">{QuestionArray[currentIndex].questions}</p>
          {renderInput()}
          <div className="flex flex-row justify-around w-full">
            {currentIndex !== 0 ? (
              <button onClick={() => setCurrentIndex(state => state - 1)} className="bg-sky-600 min-w-40 text-white p-3 font-semibold hover:bg-sky-800 rounded-lg">
                Prev
              </button>
            ) : (
              <div></div>
            )}
            {currentIndex !== QuestionArray.length - 1 ? (
              <button onClick={() => setCurrentIndex(state => state + 1)} className="bg-sky-600 min-w-40 text-white p-3 font-semibold hover:bg-sky-800 rounded-lg">
                Next
              </button>
            ) : (
              <button onClick={handleFinish} className="bg-sky-600 min-w-40 text-white p-3 font-semibold hover:bg-sky-800 rounded-lg">
                Finish
              </button>
            )}
          </div>
        </>)
      }
    </section>
  );
};

export default SurveyQuestions;
