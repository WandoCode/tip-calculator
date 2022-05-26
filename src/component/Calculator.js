import {useState, useEffect} from "react";
import InputsForm from "./InputsForm";
import Results from "./Results";

function Calculator(props) {
    const [inputValue, setInputValue] = useState({
        tip: 0,
        bill: 0,
        nbrPerson: 0,
    });
    const [totalPerPers, setTotalPerPers] = useState(0);
    const [tipPerPers, setTipPerPers] = useState(0);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const nbrPerson = inputValue.nbrPerson;
        const bill = inputValue.bill;
        
        if (nbrPerson === 0) {
            setTotalPerPers(0);
            setTipPerPers(0);
        } else {
            const newTotal = getTotalWithTips(bill, inputValue.tip);
            const roundedTotalPerPers = getRoundedTotalPerPers(newTotal, nbrPerson);
            const roundedTipPerPerson =
                getRoundedTipPerPerson(bill, newTotal, nbrPerson);
            setTotalPerPers(roundedTotalPerPers);
            setTipPerPers(roundedTipPerPerson);
        }
    }, [inputValue]);

    const getInputValues = (inputValuesObj) => {
        setInputValue(inputValuesObj);
    };

    const handleReset = () => {
        setReset(true);
    }

    useEffect(() => {
        if (reset) {
            setTotalPerPers(0);
            setTipPerPers(0);
            setReset(false);
        }
    }, [reset])

    return (
        <main className="Calculator">
            <InputsForm sendInputValues={getInputValues} reset={reset}/>
            <section className="calculator__results">
                <Results tipPerPers={tipPerPers} totalPerPers={totalPerPers}/>
                <button className="calculator__result__reset" onClick={handleReset}>reset</button>
            </section>

        </main>
    );
}

const getTotalWithTips = (amount, tip) => {
    return amount * (1 + tip / 100)
}

const getRoundedTotalPerPers = (total, nbrPers) => {
    let perPerson = total / nbrPers;
    return Math.round(perPerson * 100) / 100;
}

const getRoundedTipPerPerson = (bill, total, nbrPerson) => {
    return Math.round(((total - bill) / nbrPerson) * 100) / 100;
}
export default Calculator;
