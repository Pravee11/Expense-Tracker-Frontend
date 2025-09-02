// import { useState } from "react";
// import History from "./History";
// import ExpenseForm from "./ExpenseForm";
// import { toast } from "react-toastify";
// import BalanceContainer from "./BalanceContainer";

// const INITIAL_EXPENSE = [
//     { id: 1, title: "Salary", amount: 1000 },
//     { id: 2, title: "Rent", amount: -200 }
// ]

// const Container = () => {

//     const [transactions, setTransaction] = useState(INITIAL_EXPENSE)
//     const [editItem, setEditItem] = useState(null)
//     const [searchterm, setSearchterm] = useState("")

//     const addExpense = (title, amount) => {
//         if (title) {
//             setTransaction([
//                 ...transactions,
//                 { id: transactions.length + 1, title: title, amount: amount }
//             ])
//             toast.success("Transaction added successfully")
//         } else {
//             toast.error("Title and Amount are missing")
//         }
//     }

//     const deleteExpense = (id) => {
//         let res = transactions.filter((txn) => {
//             return txn.id !== id
//         })
//         setTransaction(res)
//         toast.success("Transaction deleted successfully")
//     }

//     const updateExpense = (id, title, amount) => {
//         const res = transactions.map((txn) => {
//             if (txn.id === id) {
//                 return { id: id, title: title, amount: amount }
//             }
//             return txn
//         })
//         setTransaction(res)
//     }

//     const editExpense = (item) => {
//         setEditItem(item)
//     }

//     return (
//         <div className="container">
//             <h2>Expense Tracker</h2>
//             <BalanceContainer transactions={transactions} />
//             <input type="text" placeholder="Search by title.." value={searchterm} className="search"></input>
//             <History transactions={transactions} deleteExpense={deleteExpense} editExpense={editExpense} />
//             <ExpenseForm addExpense={addExpense} editItem={editItem} setEditItem={setEditItem} updateExpense={updateExpense} />
//         </div>
//     )
// }

// export default Container;


import BalanceContainer from "./BalanceContainer";
import ExpenseForm from "./ExpenseForm";
import History from "./History";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify"
const INITIAL_EXPENSE = []
const Container = () => {

    const [transactions, setTransactions] = useState(INITIAL_EXPENSE)
    const [editItem, seteditItem] = useState(null)
    
    const addExpense = async (title, amount) => {
        await fetch("https://expense-tracker-backend-f805.onrender.com/addExpense", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, amount })
        })
        getAllExpense()
        toast.success("transaction added successfully")
    }

    useEffect(() => {
        getAllExpense();
    }, []);

    const getAllExpense = async () => {
        const response = await fetch("https://expense-tracker-backend-f805.onrender.com/getExpenses");
        const data = await response.json();
        setTransactions(data);
    };

    const deleteExpense = async (id) => {
        await fetch("https://expense-tracker-backend-f805.onrender.com/deleteExpense", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        getAllExpense();
        toast.success("transaction deleted successfully")
    }

    const updateExpense = async (id, title, amount) => {
        let result = await fetch("https://expense-tracker-backend-f805.onrender.com/updateExpense", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, title, amount })
        })
        getAllExpense();
        toast.success("transaction editeded successfully")
    }

    const editExpense = (item) => {
        seteditItem(item)
    }
    return (
        <div className="container">
            <h2>Expense Tracker</h2>
            <BalanceContainer transactions={transactions} />
            <History transactions={transactions} deleteExpense={deleteExpense} editExpense={editExpense} />
            <ExpenseForm addExpense={addExpense} editItem={editItem} seteditItem={seteditItem} updateExpense={updateExpense} />

        </div>
    )

}
export default Container;