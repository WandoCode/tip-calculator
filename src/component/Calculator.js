import { useState, useEffect } from "react";
import InputsForm from "./InputsForm";
import Results from "./Results";

function Calculator(props) {
  const [inputValue, setInputValue] = useState({
    tip: 0,
    bill: 0,
    nrbPerson: 0,
  });
  const [totalPerPers, setTotalPerPers] = useState(0);
  const [tipPerPers, setTipPerPers] = useState(0);

  useEffect(() => {
    if (inputValue.nbrPerson === 0) {
      setTotalPerPers(0);
      setTipPerPers(0);
    } else {
      const newTotal = inputValue.bill * (1 + inputValue.tip / 100);
      const roundedTotalPerPers =
        Math.round((newTotal / inputValue.nbrPerson) * 100) / 100;
      const roundedTipPerPerson =
        Math.round(
          ((newTotal - inputValue.bill) / inputValue.nbrPerson) * 100
        ) / 100;
      setTotalPerPers(roundedTotalPerPers);
      setTipPerPers(roundedTipPerPerson);
    }
  }, [inputValue]);

  const getInputValues = (inputValuesObj) => {
    setInputValue(inputValuesObj);
  };

  return (
    <div className="Calculator">
      <InputsForm sendInputValues={getInputValues} />
      <Results tipPerPers={tipPerPers} totalPerPers={totalPerPers} />
    </div>
  );
}

export default Calculator;
