import { useState, useEffect } from "react";
import axios from "axios";

export default function BooklistAPI() {
  const [booklists, setBookLists] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getBookLists = async () => {
      const res = await axios.get("/api/booklist");
      console.log(res);
      setBookLists(res.data);
    };

    getBookLists();
  }, [callback]);
  return {
    booklists: [booklists, setBookLists],
    callback: [callback, setCallback],
  };
}
