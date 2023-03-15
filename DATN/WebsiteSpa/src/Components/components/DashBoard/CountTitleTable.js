import React, { useState, useEffect } from 'react';
import "./CountTitleTable.css";
export default function CountTitleTable ({ arr }) {
  const [titleCounts, setTitleCounts] = useState([]);
useEffect(() => {
    // Lọc ra các payment có trạng thái bằng true
    const truePayments = arr.filter(item => item.status === true).map(item => item.cart);
    // Duyệt qua các cart để tính số lượng của từng title
    const countObj = truePayments.reduce((obj, cart) => {
      cart.forEach(item => {
        if (item.title in obj) {
          obj[item.title]++;
        } else {
          obj[item.title] = 1;
        }
      });
      return obj;
    }, {});
    // Chuyển đổi từ object sang mảng và sắp xếp theo thứ tự giảm dần của số lượng
    const counts = Object.keys(countObj).map(title => ({ title, count: countObj[title] }));
    counts.sort((a, b) => b.count - a.count);
    setTitleCounts(counts);
  }, [arr]);
  return (
    <div className="tabletop5service">
        <table>
      <thead>
        <tr>
          <th>Tên dịch vụ</th>
          <th>Số lượng bán được</th>
        </tr>
      </thead>
      <tbody>
        {titleCounts.map(item => (
          <tr key={item.title}>
            <td>{item.title}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );

}


