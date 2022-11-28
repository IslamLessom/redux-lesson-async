import './App.css';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addCustomerAction, removeCustomerAction} from './store/customerReducer'
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

  const addCash = (cash) => {
    dispatch({ type: 'ADD_CASH', payload: cash })
  }

  const getCash = (cash) => {
    dispatch({ type: 'GET_CASH', payload: cash })
  }

  const addCustomers = (name) => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }


  return (
    <div className="App">
      <div className='number'>
        <h1>{cash}</h1>
       </div>
      <div className='buttons'>
        <button onClick={() => addCash(Number(prompt()))}>пополнить</button>
        <button onClick={() => getCash(Number(prompt()))}>снять</button>
        <button onClick={() => addCustomers(prompt())}>Добавить клиента</button>
        <button onClick={() => removeCustomer(Number(prompt()))}>Удалить клиента</button>
        <button onClick={() => dispatch(fetchCustomers()) }>Получить пользователей из базы</button>
      </div>
      <div className='client'>
        {customers.length > 0 ?
          <div >
            {customers.map((customer, index) =>
              <div key={index} onClick={() => removeCustomer(customer)}>
                {customer.name}
              </div>
            )}
          </div>
          :
          <div>
            <h1>Клиенты отсутсвуют !</h1>
          </div>
          }
      </div>
    </div>
  );
}

export default App;
