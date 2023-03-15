import React, { useContext, useState, useEffect } from "react";
import Header from "../headers/Header";
import { Service } from "../../GlobalState";
import "./DashBoard.css"
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import { element } from "prop-types";
import CountTitleTable from "./CountTitleTable";
export default function DashBoard() {
  const state = useContext(Service);
  const [token] = state.token
  const [payment] = state.paymentAPI.payment;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [services]= state.servicesAPI.services;
  const [categories]= state.categoriesAPI.categories;
  const [allUser, setAllUser]= state.alluserAPI.alluser;
  const [ishowrevenuebyday, setIsShowRevenueByDay]= useState(false);
  const [cost, setCost]= state.costAPI.costs;
  const [exportcost, setExportCost]= state.exportAPI.exportcost;
  const [test, setTest] = useState(false);
  
  const totaluserdebt = ()=>{
    let totaldebt =0;
    allUser.forEach(au=>
      {
        totaldebt += au.debt;
      }
      );
      return totaldebt;
  }
  const sumPrice = (payment) => {
    let ab = 0;
    payment.forEach(element => {
      element.cart.forEach(item => {
        ab += item.price;
      });
    });
    return ab;
  };
  // tính doanh thu tháng trong năm
  const revenuebymonth = (month, year) => {
    const getdatamonth = payment.filter((al) =>
      new Date(al.createdAt).getMonth() + 1 === month &&
      new Date(al.createdAt).getFullYear() === year
    );
    let total = 0;
    getdatamonth.forEach(element => {
      if(element.status===true){element.cart.forEach(item => {
        total += item.price;
      });}
      
    });
    return total;

  }
  // tính doanh thu ngày trong tháng
  const revenuebyday = (day, month, year) => {
    const getdataday = payment.filter((al) =>
      new Date(al.createdAt).getDate()=== day &&
      new Date(al.createdAt).getMonth() === month &&
      new Date(al.createdAt).getFullYear() === year
    );
    let total = 0;
    getdataday.forEach(element => {
      if(element.status===true){element.cart.forEach(item => {
        total += item.price;
      });}
    });
    return total;

  }
  let DataRevenueForLineMonth = [
    { month: "Jan", revenue: revenuebymonth(1, endDate.getFullYear()) },
    { month: "Feb", revenue: revenuebymonth(2, endDate.getFullYear()) },
    { month: "Mar", revenue: revenuebymonth(3, endDate.getFullYear()) },
    { month: "Apr", revenue: revenuebymonth(4, endDate.getFullYear()) },
    { month: "May", revenue: revenuebymonth(5, endDate.getFullYear()) },
    { month: "Jun", revenue: revenuebymonth(6, endDate.getFullYear()) },
    { month: "Jul", revenue: revenuebymonth(7, endDate.getFullYear()) },
    { month: "Aug", revenue: revenuebymonth(8, endDate.getFullYear()) },
    { month: "Sep", revenue: revenuebymonth(9, endDate.getFullYear()) },
    { month: "Oct", revenue: revenuebymonth(10, endDate.getFullYear()) },
    { month: "Nov", revenue: revenuebymonth(11, endDate.getFullYear()) },
    { month: "Dec", revenue: revenuebymonth(12, endDate.getFullYear()) },
  ];
  const DataRevenueForLineDay = [
    { day: "1", revenue: revenuebyday(1, endDate.getMonth(), endDate.getFullYear()) },
    { day: "2", revenue: revenuebyday(2, endDate.getMonth(), endDate.getFullYear()) },
    { day: "3", revenue: revenuebyday(3, endDate.getMonth(), endDate.getFullYear()) },
    { day: "4", revenue: revenuebyday(4, endDate.getMonth(), endDate.getFullYear()) },
    { day: "5", revenue: revenuebyday(5, endDate.getMonth(), endDate.getFullYear()) },
    { day: "6", revenue: revenuebyday(6, endDate.getMonth(), endDate.getFullYear()) },
    { day: "7", revenue: revenuebyday(7, endDate.getMonth(), endDate.getFullYear()) },
    { day: "8", revenue: revenuebyday(8, endDate.getMonth(), endDate.getFullYear()) },
    { day: "9", revenue: revenuebyday(9, endDate.getMonth(), endDate.getFullYear()) },
    { day: "10", revenue: revenuebyday(10, endDate.getMonth(), endDate.getFullYear()) },
    { day: "11", revenue: revenuebyday(11, endDate.getMonth(), endDate.getFullYear()) },
    { day: "12", revenue: revenuebyday(12, endDate.getMonth(), endDate.getFullYear()) },
    { day: "13", revenue: revenuebyday(13, endDate.getMonth(), endDate.getFullYear()) },
    { day: "14", revenue: revenuebyday(14, endDate.getMonth(), endDate.getFullYear()) },
    { day: "15", revenue: revenuebyday(15, endDate.getMonth(), endDate.getFullYear()) },
    { day: "16", revenue: revenuebyday(16, endDate.getMonth(), endDate.getFullYear()) },
    { day: "17", revenue: revenuebyday(17, endDate.getMonth(), endDate.getFullYear()) },
    { day: "18", revenue: revenuebyday(18, endDate.getMonth(), endDate.getFullYear()) },
    { day: "19", revenue: revenuebyday(19, endDate.getMonth(), endDate.getFullYear()) },
    { day: "20", revenue: revenuebyday(20, endDate.getMonth(), endDate.getFullYear()) },
    { day: "21", revenue: revenuebyday(21, endDate.getMonth(), endDate.getFullYear()) },
    { day: "22", revenue: revenuebyday(22, endDate.getMonth(), endDate.getFullYear()) },
    { day: "23", revenue: revenuebyday(23, endDate.getMonth(), endDate.getFullYear()) },
    { day: "24", revenue: revenuebyday(24, endDate.getMonth(), endDate.getFullYear()) },
    { day: "25", revenue: revenuebyday(25, endDate.getMonth(), endDate.getFullYear()) },
    { day: "26", revenue: revenuebyday(26, endDate.getMonth(), endDate.getFullYear()) },
    { day: "27", revenue: revenuebyday(27, endDate.getMonth(), endDate.getFullYear()) },
    { day: "28", revenue: revenuebyday(28, endDate.getMonth(), endDate.getFullYear()) },
    { day: "29", revenue: revenuebyday(29, endDate.getMonth(), endDate.getFullYear()) },
    { day: "30", revenue: revenuebyday(30, endDate.getMonth(), endDate.getFullYear()) },
    { day: "31", revenue: revenuebyday(31, endDate.getMonth(), endDate.getFullYear()) },

  ];
  let [revenuedata, setRevenueData] = useState({
    labels: DataRevenueForLineMonth.map((drfl) => drfl.month),
    datasets: [
      {
        label: "Doanh Thu ($) ",
        data: DataRevenueForLineMonth.map((drfl) => drfl.revenue),
        borderColor: "#c71616",
      },
    ],
  });
  let [revenuedatabyday, setRevenueDataByDay] = useState({
    labels: DataRevenueForLineDay.map((drfl) => drfl.day),
    datasets: [
      {
        label: "Doanh Thu ($) ",
        data: DataRevenueForLineDay.map((drfl) => drfl.revenue),
        borderColor: "#c71616",
      },
    ],
  });
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  }
  const [paymentbyselectdate, setPaymentBySelect] = useState(payment);
  // tính doạn thu theo ngày chọn
  const revenuebyselectday =()=>{  
      let total = 0;
      paymentbyselectdate.forEach(element => {
        element.cart.forEach(item => {
          total += item.price;
        });
      });
      return total;
  }
  console.log(endDate);

  // Xử lý Line
  const [exportbyselectdate, setExportBySelect] = useState(exportcost);

  // xử lý khoảng thời gian chọn
  const handleSelect = (date) => {
    setTest(date);
    let paymentselect = payment.filter((payment) => {
      let paymentdate = new Date(payment.createdAt);
      let currentDate = new Date(date.selection.endDate); 
      currentDate.setDate(currentDate.getDate() + 1); 
      return (
        (paymentdate >= date.selection.startDate &&
        paymentdate <= currentDate)
      )
    })
    let exportselect = exportcost.filter((exportcost) => {
      let exporttdate = new Date(exportcost.createdAt);
      let currentDate = new Date(date.selection.endDate); 
      currentDate.setDate(currentDate.getDate() + 1); 
      return (
        (exporttdate >= date.selection.startDate &&
          exporttdate <= currentDate)
      )
    })
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setPaymentBySelect(paymentselect);
    setExportBySelect(exportselect)
    setIsShowRevenueByDay(true);
    setRevenueData({
      labels: DataRevenueForLineMonth.map((drfl) => drfl.month),
      datasets: [
        {
          label: `Doanh Thu Theo Các Tháng trong năm ${endDate.getFullYear()} ($) `,
          data: DataRevenueForLineMonth.map((drfl) => drfl.revenue),
          borderColor: "#c71616",
        },
      ],
    });
    setRevenueDataByDay({
      labels: DataRevenueForLineDay.map((drfl) => drfl.day),
      datasets: [
        {
          label: `Doanh Thu Theo Các Ngày trong tháng ${endDate.getMonth()+1} ($) `,
          data: DataRevenueForLineDay.map((drfl) => drfl.revenue),
          borderColor: "#c71616",
        },
      ],
    });

  }
  const countcategory = (category)=>{
    let count=0;
    paymentbyselectdate.forEach((pbsd)=>{
    if(pbsd.status){
    pbsd.cart.forEach((item)=>{
        
      if(item.category==category){
          count +=1;
        }
      
    }
    )
  }})
    
    return count;
  }
  const dataServiceSoldByCategory = categories.map((category) =>
         countcategory(category.name)
  );
  const color = dataServiceSoldByCategory.map(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16)
  );
  const data = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: "Đã bán",
        data: dataServiceSoldByCategory,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };
  const totalimport = cost.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0); 
    const totalexport = exportbyselectdate.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    }, 0); 


    
  return (
    <>
      <Header />
      <div className="dashboard">
      
        <div className="contentdashboard">
          <div className="revenueinfo"><h1>Thông tin Doanh Thu</h1></div>
          <div className="bottomdashboard"> 
          <div>
          <div className="linedatabymonth"><Line data={revenuedata} /> </div>
            <div className="linedatabyday"><Line data={revenuedatabyday} />
            </div>
            </div>
            <div className="piechartdashboard">
            <h5>Doanh thu từ ngày {(startDate.getDate())}/{(startDate.getMonth()+1)}/{(startDate.getFullYear())} đến
             ngày {(endDate.getDate())}/{(endDate.getMonth()+1)}/{(endDate.getFullYear())} là : 
            {ishowrevenuebyday&&(revenuebyselectday())}$</h5>
            <h5>Tổng tiền chưa thanh toán của khách hàng: {totaluserdebt()} $</h5>
            <h5>Tổng tiền số tiền hàng nhập vào: {totalimport} $</h5>
            <h5>Tổng tiền số tiền hàng xuất ra: {totalexport} $</h5>
             {(ishowrevenuebyday) && 
           ( <Pie data={data} />)}
            </div>
            <div className="daterange">
            <div className="daterangeselect"><DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
            </div>
            <hr/>

            <div className="top5service">
            <h4>Top 5 sản dịch vụ bán được từ ngày {(startDate.getDate())}/{(startDate.getMonth()+1)}/{(startDate.getFullYear())} đến
             ngày {(endDate.getDate())}/{(endDate.getMonth()+1)}/{(endDate.getFullYear())}</h4>
            <CountTitleTable arr={paymentbyselectdate} />
              </div>  
            </div>
            
            </div>
          </div>
        </div>
      </>
      );
}