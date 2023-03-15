import { useState, useEffect } from "react";
import axios from "axios";

export default function ExportAPI() {
    const [exportcost, setExportCost] = useState([]);
    const [callback, setCallback] = useState(false);
    // Lấy dữ liệu phiếu xuất kho
    useEffect(() => {
        const getExportCost = async () => {
          const res = await axios.get(
            "/api/exports"
          );
          console.log(res);
          setExportCost(res.data);
          
        };
        getExportCost();
      }, [callback]); 
      return {
        exportcost: [exportcost, setExportCost],
        callback: [callback, setCallback],
        
      };
}
