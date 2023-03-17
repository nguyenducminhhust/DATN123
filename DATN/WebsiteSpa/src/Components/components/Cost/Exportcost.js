import React, { useContext, useState, useEffect } from "react";
import { Service } from "../../GlobalState";
import axios from "axios";
import Header from "../headers/Header";
export default function Exportcost() {
    const state = useContext(Service);
    const [inputinforexportcost, setInputInforExportcost] = useState([{ 
        exportid:"",
        productid: "", 
        productname: "",
        unit: "",
        quantity:0,
        unitprice:0,
        amount:0,
     }]);
     const [cost, setCost]= state.costAPI.costs;
     const [callback, setCallback] = useState(false);
     useEffect(() => {
        const getCosts = async () => {
          const res = await axios.get(
            `/api/costs`
          );
          setCost(res.data);
          
        };
        getCosts();
      }, [callback]); 
    const handleInputForExportcost = (e, index, ) => {
        const { name, value } = e.target;
        const list = [...inputinforexportcost];
        list[index][name] = value;
        setInputInforExportcost(list);
      };
      const handleInputForExportcost2 = (e, index, amount) => {
        const { name, value } = e.target;
        const list = [...inputinforexportcost];
        list[index][name] = amount;
        setInputInforExportcost(list);
      };
      // xử lý sự kiện nhấp chuột của nút Xóa
      const handlePriceRemoveClick = index => {
        const list = [...inputinforexportcost];
        list.splice(index, 1);
        setInputInforExportcost(list);
      };
    
      // xử lý sự kiện click của nút Thêm
      const handlePriceAddClick = () => {
        setInputInforExportcost([...inputinforexportcost, { 
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
        const list = [...inputinforexportcost];
        list[index].productid = productinfo[0].productid;
        list[index].productname = productinfo[0].productname;
        list[index].unit = productinfo[0].unit;
        list[index].unitprice = productinfo[0].unitprice;
        setInputInforExportcost(list);
      }
      // tạo phiếu xuất kho
      const exportcostSubmit = async (e) => {
        e.preventDefault();
        try {
            for(let i=0; i<inputinforexportcost.length;i++){
            const productinfo = checkProductID(inputinforexportcost[i].productid);
            // số lượng mới
            const newquantity = parseInt(productinfo[0].quantity) - parseInt(inputinforexportcost[i].quantity);
            // tổng tiền mới
            const newamount = parseInt(productinfo[0].amount)-parseInt(inputinforexportcost[i].quantity*inputinforexportcost[i].unitprice);
            const quantity = parseInt(inputinforexportcost[i].quantity);
            const exportID= `id${new Date().getTime()}`;
            if(newquantity>=0&&newamount>=0){
            await axios.put("/api/costs", 
            {...inputinforexportcost[i], quantity: newquantity,
              amount: newamount});
              setCallback(!callback);
        await axios.post("/api/exports", 
          {...inputinforexportcost[i], quantity: quantity,exportid:exportID,
            amount:inputinforexportcost[i].quantity*inputinforexportcost[i].unitprice });
            alert("Xuất kho thành công"); 
        } else { alert("Số lượng không hợp lệ"); }
        }
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
    return(
<>
        {/* <Header/> */}
            <div className="manageexportcosttable">
                <form onSubmit={exportcostSubmit}>
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
                            {inputinforexportcost.map((x, i) => {
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
                                                <option value="default">Chọn sản phẩm</option>
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
                                            onChange={e => handleInputForExportcost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="text" 
                                            name="unit"
                                            placeholder="Đơn vị tính"
                                            value={x.unit}
                                            onChange={e => handleInputForExportcost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="number" 
                                            name="quantity"
                                            placeholder="Số lượng"
                                            value={x.quantity}
                                            onChange={e => handleInputForExportcost(e, i)} />
                                        </td>
                                        <td>
                                        <input 
                                            type="number" 
                                            name="unitprice"
                                            placeholder="Đơn giá"
                                            value={x.unitprice}
                                            onChange={e => handleInputForExportcost(e, i)} />$
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
                                    <div className="actionexportcost">
                                        {inputinforexportcost.length !== 1 && <button
                                            className="actionremoveexportcost"
                                            onClick={() => handlePriceRemoveClick(i)}>Xóa</button>}
                                        {inputinforexportcost.length - 1 === i && <button onClick={handlePriceAddClick}>Thêm </button>}
                                    </div>
                                    </td>
                                    </tr>    
                                );
                            })}
                        </tbody>
                    </table>
                    <div><button type="submit">Xuất Hàng</button></div>
                </form>
            </div>
</>
)
}