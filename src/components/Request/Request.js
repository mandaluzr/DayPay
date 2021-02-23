
import { useHistory } from "react-router-dom";
import "./Request.css"
import "../Send/Send.css"
import Button from '../Button/Button';
import { useState } from 'react';
import { ReactComponent as DotPattern } from "../../assets/Pattern.svg"
import { validateEmail } from "../../Utils/validations";

const Request = () => {

  const history = useHistory();

  const WALLET_ID = "6021ff060e5bd82c2fccd226"

  const [email, setEmail] = useState();

  const [amount, setAmount] = useState();

  const [errorStyle, setErrorStyle] = useState({
    "email": 'errorInvisible',
    "amount": 'errorInvisible'
  });


  

  const body = {
    sender: WALLET_ID,
    receiver: email,
    amount: amount * 100
  };

  const cleanForm = () => {
    setEmail("");
    setAmount("");
  };

  const cleanErrors = () => {
    setErrorStyle({
      "email": 'errorInvisible',
      "amount": 'errorInvisible'
    })
  };

  const handleSubmit = (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    if (!validateEmail(email) && (amount <= 0 || !amount)) {
      setErrorStyle({
        'email': 'errorVisible',
        'amount': 'errorVisible',
      })
    } else if (amount <= 0) {
      setErrorStyle({
        'email': 'errorInvisible',
        'amount': 'errorVisible',
      })
    } else if (!validateEmail(email)) {
      setErrorStyle({
        'email': 'errorVisible',
        'amount': 'errorInvisible',
      })
    } else {
      fetch(`http://localhost:5000/api/requestMoney/`, options).then((response) => {
        console.log(response.status)
        cleanErrors();
        history.replace("/dashboard");
    }
      ).catch(error => {
        console.log(error);
      });
    }

    cleanForm();
  };


  return (
    <div className="tradePage_container">
      <div className="box">
        <div className="boxShapeTop"><DotPattern></DotPattern></div>
        <div className="boxShapeBottom"><DotPattern></DotPattern></div>

        <span> Request money from another user</span>
        <form className="tradeForm">
          <input required className="input__container" 
            placeholder="Email"
            type="email"
            name="email"
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <span className={errorStyle.email}>Invalid email</span>
          <input required className="input__container" 
            placeholder="Amount"
            type="number"
            name="amount"
            onChange={(e) => { setAmount(e.target.value) }}
          />
          <span className={errorStyle.amount}>Introduce a number greater than 0</span>
          <Button
            style="defaultButton_featured"
            value="Request funds"
            onClick={() => handleSubmit(WALLET_ID)} />
        </form>
      </div>
    </div>
  )
}

export default Request;