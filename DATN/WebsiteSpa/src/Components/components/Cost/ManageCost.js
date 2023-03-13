import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
export default function ManageCost() {
    const state = useContext(Service);
    const [inputinformanagecost, setInputInforManageCost] = useState([{ 
        productid: "", 
        productname: "",
        unit: "",
        quantity:0,
        unitprice:0,
        amount:0,
     }]);
     const [cost, setCost]= state.costAPI.costs;
    const handleInputForManageCost = (e, index ) => {
        const { name, value } = e.target;
        const list = [...inputinformanagecost];
        list[index][name] = value;
        setInputInforManageCost(list);
      };
      const handleInputForManageCost2 = (e, index, amount) => {
        const { name, value } = e.target;
        const list = [...inputinformanagecost];
        list[index][name] = amount;
        setInputInforManageCost(list);
      };
      // handle click event of the Remove button
      const handlePriceRemoveClick = index => {
        const list = [...inputinformanagecost];
        list.splice(index, 1);
        setInputInforManageCost(list);
      };
    
      // handle click event of the Add button
      const handlePriceAddClick = () => {
        setInputInforManageCost([...inputinformanagecost, { 
        productid: "", 
        productname: "",
        unit: "",
        quantity:"",
        unitprice:0,
        amount:0, }]);
      };
      const checkProductID = (productid)=> cost.filter((cst) => 
      cst.productid === productid );
      const handleCost = (e, index) => {
        const { name, value } = e.target;
        const productinfo = checkProductID(value);
        const list = [...inputinformanagecost];
        // list[index][name] = value;
        list[index].productid = productinfo[0].productid;
        list[index].productname = productinfo[0].productname;
        list[index].unit = productinfo[0].unit;
        list[index].unitprice = productinfo[0].unitprice;
        setInputInforManageCost(list);
      }
      
      const managecostSubmit = async (e) => {
        e.preventDefault();
        try {
            for(let i=0; i<inputinformanagecost.length;i++){
            const productinfo = checkProductID(inputinformanagecost[i].productid);
            const newquantity = parseInt(productinfo[0].quantity) + parseInt(inputinformanagecost[i].quantity);
            const newamount = parseInt(productinfo[0].amount)+parseInt(inputinformanagecost[i].quantity*inputinformanagecost[i].unitprice);
            await axios.put("/api/costs", 
          {...inputinformanagecost[i], quantity: newquantity,
            amount: newamount});}
          
        alert("Nhập kho thành công");
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
    return(
<>
            <div className="managemanagecosttable">
                <form onSubmit={managecostSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Đơn vị tính</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputinformanagecost.map((x, i) => {
                                return (
                                    <tr>

                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <select
                                                id="productid"
                                                name="productid"
                                                aria-label="Role"
                                                onChange={e=>handleCost(e, i)}
                                                className="managecostpdid"
                                            >
                                                <option value="default">Chọn Dịch Vụ</option>
                                                {cost.map((cst, index) =>
                                                    <option value={cst.productid}>{`${index + 1}. ${cst.productid}`}</option>
                                                )}


                                            </select>
                                        </td>
                                        <td>
                                        <input 
                                            type="text" 
                                            name="productname"
                                            placeholder="Tên sản phẩm"
                                            value={x.productname}
                                            onChange={e => handleInputForManageCost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="text" 
                                            name="unit"
                                            placeholder="Đơn vị tính"
                                            value={x.unit}
                                            onChange={e => handleInputForManageCost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="number" 
                                            name="quantity"
                                            placeholder="Số lượng"
                                            value={x.quantity}
                                            onChange={e => handleInputForManageCost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="number" 
                                            name="unitprice"
                                            placeholder="Đơn giá"
                                            value={x.unitprice}
                                            onChange={e => handleInputForManageCost(e, i)} />$
                                        </td>
                                        <td>
                                        <input 
                                            type="number" 
                                            name="amount"
                                            placeholder="Thành tiền"
                                            value={x.unitprice*x.quantity}
                                            />
                                           $
                                        </td>
                                        <td>
                                    <div className="actionmanagecost">
                                        {inputinformanagecost.length !== 1 && <button
                                            className="actionremovemanagecost"
                                            onClick={() => handlePriceRemoveClick(i)}>Xóa</button>}
                                        {inputinformanagecost.length - 1 === i && <button onClick={handlePriceAddClick}>Thêm </button>}
                                    </div>
                                    </td>
 
                                        
                                   
                                    </tr>    
                                );
                            })}
                        </tbody>
                    </table>
                    <div><button className="importproduct" type="submit">Nhập Hàng</button></div>
                </form>
            </div>
</>
)
}