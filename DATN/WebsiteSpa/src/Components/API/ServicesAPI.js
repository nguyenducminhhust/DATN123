import { useState, useEffect } from "react";
import axios from "axios";

export default function ServicesAPI() {
  const [services, setServices] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  // Lấy dữ liệu dịch vụ
  useEffect(() => {
    const getServices = async () => {
      const res = await axios.get(
        `/api/services?${category}&${sort}&title[regex]=${search}` 
      );
      setServices(res.data.services);
      setResult(res.data.result);
    };

 
    getServices();
  }, [callback, category, sort, search, page]);
  console.log(services);
  return {
    services: [services, setServices],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}
