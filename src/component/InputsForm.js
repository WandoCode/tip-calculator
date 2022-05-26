import { useState, useEffect } from "react";

const TIP_AMOUNT = [5, 10, 15, 25, 50];

function InputsForm(props) {
  const [customValue, setCustomValue] = useState("");
  const [tipValue, setTipValue] = useState("");
  const [bill, setBill] = useState("");
  const [nbrPerson, setNbrPerson] = useState("");
  const [showError, setShowError] = useState(false);

  // TODO: show error msg
  useEffect(() => {
    if (nbrPerson === "0") {
      setShowError(true);
    }
    if (nbrPerson !== "" && tipValue !== "" && bill !== "") {
      props.sendInputValues({
        tip: parseFloat(tipValue),
        bill: parseFloat(bill),
        nbrPerson: parseFloat(nbrPerson),
      });
    }
  }, [nbrPerson, tipValue, bill]);

  const handleTipBtn = (e) => {
    e.preventDefault();

    if (customValue) setCustomValue("");
    setTipValue(e.target.value);
    toggleActiveBtn(e.target);
  };

  const handleCustomInput = (e) => {
    toggleActiveBtn();
    setCustomValue(e.target.value);
    setTipValue(e.target.value);
  };

  const toggleActiveBtn = (target) => {
    const tipBtns = document.getElementsByClassName("btn--tip");
    for (const tipBtn of tipBtns) {
      tipBtn !== target
        ? tipBtn.classList.remove("btn--tip--active")
        : tipBtn.classList.add("btn--tip--active");
    }
  };

  const tipButtons = (tipsArray) => {
    return tipsArray.map((tip) => {
      return (
        <button
          className="btn--tip"
          onClick={handleTipBtn}
          value={tip}
          key={tip}
        >
          {tip}%
        </button>
      );
    });
  };

  return (
    <form className="calculator__inputs">
      <div className="input-wrapper">
        <label htmlFor="bill"> Bill</label>
        <input
          type="number"
          name="bill"
          id="bill"
          placeholder={"0"}
          min={0}
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <h3 className={"h3--btn"}>Select Tip %</h3>

        {tipButtons(TIP_AMOUNT)}

        <input
          type="number"
          name="tip"
          id="tip-custom"
          placeholder={"Custom"}
          value={customValue}
          onChange={handleCustomInput}
          min={0}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="people">Number of People</label>
        <input
          type="number"
          name="people"
          id="people"
          placeholder={"0"}
          min={0}
          value={nbrPerson}
          onChange={(e) => setNbrPerson(e.target.value)}
        />
      </div>
    </form>
  );
}

export default InputsForm;
