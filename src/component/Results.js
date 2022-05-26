function Results(props) {
  return (
    <section className="calculator__results">
      <div className="calculator__results__wrapper">
        <div className="calculator__results__wrapper__description">
          <h2>Tip amount</h2>
          <h3 className="h3">/ person</h3>
        </div>
        <div className="calculator__results__wrapper__amount">
          $ {props.tipPerPers || 0}
        </div>
      </div>
      <div className="calculator__results__wrapper">
        <div className="calculator__results__wrapper__description">
          <h2>Total</h2>
          <h3>/ person</h3>
        </div>
        <div className="calculator__results__wrapper__amount">
          $ {props.totalPerPers || 0}
        </div>
      </div>
    </section>
  );
}

export default Results;
