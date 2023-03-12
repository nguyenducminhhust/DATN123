import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./API/ProductsAPI";
import UserAPI from "./API/UserAPI";
import axios from "axios";
import CategoriesAPI from "./API/CategoriesAPI";
import ContainerServiceAPI from "./API/ContainerServiceAPI";
import BookingAPI from "./API/BookingAPI";
import BooklistAPI from "./API/BooklistAPI";
import UserStaffAPI from "./API/UserStaffAPi";
import DataProcessCustomerAPI from "./API/DataDrocessCustomerAPI";
import StaffScheduleAPI from "./API/StaffScheduleAPI";
import PaymentAPI from "./API/PaymentAPI";
import CostAPI from "./API/CostAPI";
export const Cart2 = createContext();
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
 

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin === "true") {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        setToken(res.data.accesstoken);
        console.log(res.data);
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
    containerserviceAPI: ContainerServiceAPI(),
    booklistAPI: BooklistAPI(),
    bookingAPI: BookingAPI(),
    userstaffAPI: UserStaffAPI(),
    dataprocesscustomerAPI: DataProcessCustomerAPI(),
    staffscheduleAPI: StaffScheduleAPI(),
    paymentAPI: PaymentAPI(),
    costAPI: CostAPI(),
  };

  ProductsAPI();
  return <Cart2.Provider value={state}>{children}</Cart2.Provider>;
};
