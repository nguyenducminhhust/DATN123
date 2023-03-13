import React, { useContext, useState, useEffect } from "react";
import Header from "../headers/Header";
import { Service } from "../../GlobalState";
import "./DashBoard.css"
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import { element } from "prop-types";

export default function DashBoard() {
  const state = useContext(Service);
  const [token] = state.token
  const [allpayment, setAllPayment] = useState();
  const [callback, setCallBack] = useState(false);
  const [payment] = state.paymentAPI.payment;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [services]= state.servicesAPI.services;
  const [categories]= state.categoriesAPI.categories;
  console.log(services, categories);
  const [callback1, setCallback1] = useState(false);
  const [allUser, setAllUser]= state.alluserAPI.alluser;
  const [ishowrevenuebyday, setIsShowRevenueByDay]= useState(false);
  //   useEffect(() => {
  //   const getPayment = async () => {
  //     const res = await axios.get("/api/payment");
  //     console.log(res);
  //     setPayment(res.data);
  //   };

  //   getPayment();
  // }, [callback1]);
  //  const [revenuebyyear, setrevenuebyyear] = useState(false);
  const [datamonth, setDataMonth] = useState([]);
  const [test, setTest] = useState(false);
  const [datamonthlength, setDataMonthLength] = useState([]);
  const revenuebyyear = payment.filter((al) =>
    new Date(al.createdAt).getFullYear() === new Date().getFullYear()
  );
  const totaluserdebt = ()=>{
    let totaldebt =0;
    allUser.forEach(au=>
      {
        totaldebt += au.debt;
      }
      );
      return totaldebt;
  }
  //   const arr2 = payment.map(item => {      // hàm quan trọng
  //     return item.cart.map(i => i.price);
  //   });
  //   const arr2 = payment.map(el => el.cart.map(el => el.price));
  // const totalrevenuebyyear= arr2.reduce((total, value)=> total+value,0)
  // console.log(getPrice(revenuebyyear));
  const sumPrice = (payment) => {
    let ab = 0;
    payment.forEach(element => {
      element.cart.forEach(item => {
        ab += item.price;
      });
    });
    return ab;
  };
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
  console.log(endDate.getFullYear(), typeof endDate.getFullYear());
  
  const getServiceSoldByCategory = (category) =>services
      .filter((service) => service.category === category)
      .map((service) => service.sold)
      .reduce((accumulator, value) => accumulator + value, 0);

  

  // const dataServiceSoldByCategory = categories.map((category) =>
  //   getServiceSoldByCategory(category.name)
  // );
  

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
  console.log(revenuebymonth(1));
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
//   const DataRevenueForLineDay = [];

// for (let i = 1; i <= 31; i++) {
//   DataRevenueForLineDay.push({ day: i.toString(), revenue: revenuebyday(i, endDate.getMonth(), endDate.getFullYear()) });
// }
  console.log(DataRevenueForLineMonth);

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

  const revenuebyselectday =()=>{  
      let ab = 0;
      paymentbyselectdate.forEach(element => {
        element.cart.forEach(item => {
          ab += item.price;
        });
      });
      return ab;
  }
  console.log(endDate);

  // Xử lý Line
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
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setPaymentBySelect(paymentselect);
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
  console.log(paymentbyselectdate);
  const countcategory = (category)=>{
    let count=0;
    paymentbyselectdate.forEach((pbsd)=>
    pbsd.cart.forEach((item)=>{
        if(item.category==category){
          count +=1;
        }
      
    })
    )
    return count;
  }
  const dataServiceSoldByCategory = categories.map((category) =>
         countcategory(category.name)
  );
  console.log(dataServiceSoldByCategory);
  const color = dataServiceSoldByCategory.map(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16)
  );
  console.log(dataServiceSoldByCategory);

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
  console.log(paymentbyselectdate, test);
  // console.log(to)
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
            <h2>Doanh thu từ ngày {(startDate.getDate())}/{(startDate.getMonth()+1)}/{(startDate.getFullYear())}  đến ngày {(endDate.getDate())}/{(endDate.getMonth()+1)}/{(endDate.getFullYear())} là : {ishowrevenuebyday&&(revenuebyselectday())}$</h2>
            <h2>Tổng tiền chưa thanh toán của khách hàng: {totaluserdebt()} $</h2>
             {(ishowrevenuebyday) && 
           ( <Pie data={data} />)}
            <div className="daterange">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            /></div>
            </div>       
            </div>
          </div>
        </div>
      </>
      );
}