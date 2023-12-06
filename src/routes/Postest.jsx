import Quiz from "../components/Quiz";
import QuizFix from "../components/QuizFix";

function Postest() {
  return (
    <div className="container w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full rounded-xl shadow-xl bg-slate-50 text-my-dark-blue">
          {/* <Quiz/> */}
          <QuizFix />
      </div>
    </div>
  );
}

export default Postest;
