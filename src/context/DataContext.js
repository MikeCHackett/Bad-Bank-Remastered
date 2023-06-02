import { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {

  const [balance, setBalance] = useState(100);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);

  const createUser = (username, email) => {
    const newUser = { username, email, balance: 100 };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const deposit = (username, amount) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.username === username) {
          return { ...user, balance: user.balance + amount };
        }
        return user;
      })
    ); setUsers();
  };

  const withdraw = (username, amount) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.username === username) {
          const newBalance = user.balance - amount;
          return { ...user, balance: newBalance < 0 ? 0 : newBalance };
        }
        return user;
      })
    );  setUsers();
  };

  const value = {
    balance,
    setBalance,
    deposits,
    setDeposits,
    withdrawals,
    setWithdrawals,
    users,
    setUsers,
    createUser,
    deposit,
    withdraw
  };


  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};