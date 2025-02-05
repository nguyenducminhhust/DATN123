import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
import ManageCost from "./ManageCost";
import Exportcost from "./Exportcost";
import "./cost.css"
export default function Cost() {
    const state = useContext(Service);
    const [cost, setCost]= state.costAPI.costs;
    const [callback, setCallback] = useState(false);

    const [inputinforcost, setInputInforCost] = useState([{ 
        productid: "", 
        productname: "",
        unit: "",
        quantity:0,
        unitprice:0,
        amount:0,
     }]);
     // Lấy danh sách sản phẩm
     useEffect(() => {
        const getCosts = async () => {
          const res = await axios.get(
            `/api/costs`
          );
          setCost(res.data);
          
        };
        getCosts();
      }, [callback]); 
    const handleInputForCost = (e, index, ) => {
        const { name, value } = e.target;
        const list = [...inputinforcost];
        list[index][name] = value;
        setInputInforCost(list);
      };
      const handleInputForCost2 = (e, index, amount) => {
        const { name, value } = e.target;
        const list = [...inputinforcost];
        list[index][name] = amount;
        setInputInforCost(list);
      };
      // xử lý sự kiện nhấp chuột của nút Xóa
      const handlePriceRemoveClick = index => {
        const list = [...inputinforcost];
        list.splice(index, 1);
        setInputInforCost(list);
      };
    
      // xử lý sự kiện click của nút Thêm
      const handlePriceAddClick = () => {
        setInputInforCost([...inputinforcost, { 
        productid: "", 
        productname: "",
        unit: "",
        quantity:"",
        unitprice:0,
        amount:0, }]);
      };
      // Tạo sản phẩm
      const costSubmit = async (e) => {
        e.preventDefault();
        try {
            for(let i=0; i<inputinforcost.length;i++){
          await axios.post("/api/costs", 
          {...inputinforcost[i], 
            amount:inputinforcost[i].quantity*inputinforcost[i].unitprice });}
            setCallback(!callback);
        alert("Tạo thành công");
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
    return(
<>
        <Header/>
        <div className="tablecostmain">
            <div className="titletablecost">Bảng tồn kho</div>
            <div className="divtablemain">
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
                                {/* <th>Hành Động</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {cost.map((cs, index)=>{
                                return(

                                <tr>
                                    <td>{index+1}</td>
                                    <td>
                                    {cs.productid}
                                    </td>
                                    <td>
                                    {cs.productname}
                                    </td>
                                    <td>
                                    {cs.unit}
                                    </td>
                                    <td>
                                    {cs.quantity}
                                    </td>
                                    <td>
                                    {cs.unitprice}$
                                    </td>
                                    <td>
                                    {cs.amount}$
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                        </table>
                        </div>
                      
            <h2>Tạo Sản Phẩm</h2>
            <div className="managecosttable">
                <form onSubmit={costSubmit}>
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
                            {inputinforcost.map((x, i) => {
                                return (
                                    <tr>

                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <input 
                                            type="text" 
                                            name="productid"
                                            placeholder="Mã sản phẩm" 
                                            value={x.productid}
                                            onChange={e => handleInputForCost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="text" 
                                            name="productname"
                                            placeholder="Tên sản phẩm"
                                            value={x.productname}
                                            onChange={e => handleInputForCost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="text" 
                                            name="unit"
                                            placeholder="Đơn vị tính"
                                            value={x.unit}
                                            onChange={e => handleInputForCost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="number" 
                                            name="quantity"
                                            placeholder="Số lượng"
                                            value={x.quantity}
                                            onChange={e => handleInputForCost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="number" 
                                            name="unitprice"
                                            placeholder="Đơn giá"
                                            value={x.unitprice}
                                            onChange={e => handleInputForCost(e, i)} />$
                                        </td>
                                        <td>
                                        <input 
                                            type="number" 
                                            name="amount"
                                            placeholder="Thành tiền"
                                            value={x.unitprice*x.quantity}
                                            />$
                                           
                                        </td>
                                        <td>
                                    <div className="actioncost">
                                        {inputinforcost.length !== 1 && <button
                                            className="actionremovecost"
                                            onClick={() => handlePriceRemoveClick(i)}>Xóa</button>}
                                        {inputinforcost.length - 1 === i && <button onClick={handlePriceAddClick}>Thêm </button>}
                                    </div>
                                    </td>  
                                    </tr>    
                                );
                            })}
                        </tbody>
                    </table>
                    <div><button type="submit">Nhập</button></div>
                </form>
                </div>
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputinforcost)}</div> */}
                           <div className="tableimport">
                           <h2> Nhập vào</h2>
                            <ManageCost/></div>
                            <div className="tableexport">
                            <h2>Xuất Ra</h2>
                            <Exportcost/></div>
            </div>
</>
)
}