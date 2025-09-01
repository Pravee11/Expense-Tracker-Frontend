const ExpenseItem=(props)=>{
    const {item,deleteExpense,editExpense}=props
    const {title,amount,id}=item
    const type=amount<0 ? "negative" : "positive";
    
    const handleDelete=()=>{
        deleteExpense(item._id)
    }

    const handleEdit=()=>{
        editExpense(item)
    }
    return(
        <div className={`expense-item ${type}`}>
            <span className="title">{title}</span>
            <span className="amount">${amount}</span>
            <div className="btn-container">
                <button className="edit-btn" onClick={handleEdit}>Edit</button>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}
export default ExpenseItem;