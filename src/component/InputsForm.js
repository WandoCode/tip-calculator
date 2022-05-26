import {useState, useEffect} from "react";

const TIP_AMOUNT = [5, 10, 15, 25, 50];

function InputsForm(props) {
    let reset = props.reset
    const [customValue, setCustomValue] = useState("");
    const [tipValue, setTipValue] = useState("");
    const [bill, setBill] = useState("");
    const [nbrPerson, setNbrPerson] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (reset) resetAll();
    }, [reset]);

    useEffect(() => {
        if (nbrPerson === "0") setShowError(true);
        else setShowError(false)
    }, [nbrPerson]);

    useEffect(() => {
        if (nbrPerson !== "" && tipValue !== "" && bill !== "") {
            props.sendInputValues({
                tip: parseFloat(tipValue),
                bill: parseFloat(bill),
                nbrPerson: parseFloat(nbrPerson),
            });
        }
    }, [nbrPerson, tipValue, bill]);

    /*************** Handlers ******************/
    const handleCustomInput = (e) => {
        toggleActiveBtn();
        setCustomValue(e.target.value);
        setTipValue(e.target.value);
    };

    const handleTipBtn = (e) => {
        e.preventDefault();

        if (customValue) setCustomValue("");
        setTipValue(e.target.value);
        toggleActiveBtn(e.target);
    };

    /*************** Helpers *****************/
    const resetAll = () => {
        setCustomValue("");
        setTipValue("");
        setBill("");
        setNbrPerson("");
        toggleActiveBtn();
    }

    /*************** Buttons generator *****************/
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
                <label htmlFor="bill" className={"h3"}> Bill</label>
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
                <h3 className="h3">Select Tip %</h3>

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
                <label htmlFor="people" className="h3">Number of People</label>
                <input
                    type="number"
                    name="people"
                    id="people"
                    className={showError ? "error-display" : ""}
                    placeholder={"0"}
                    min={0}
                    value={nbrPerson}
                    onChange={(e) => setNbrPerson(e.target.value)}
                />
            </div>
        </form>
    );
}

const toggleActiveBtn = (target) => {
    const tipBtns = document.getElementsByClassName("btn--tip");
    for (const tipBtn of tipBtns) {
        tipBtn !== target
            ? tipBtn.classList.remove("btn--tip--active")
            : tipBtn.classList.add("btn--tip--active");
    }
};


export default InputsForm;
