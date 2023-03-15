import React, { createContext, useState, useEffect } from "react";
import ServicesAPI from "./API/ServicesAPI";
import UserAPI from "./API/UserAPI";
import axios from "axios";
import CategoriesAPI from "./API/CategoriesAPI";
import ContainerServiceAPI from "./API/ContainerServiceAPI";
import BookingAPI from "./API/BookingAPI";
import AllUserAPI from "./API/AllUserAPi";
import DataProcessCustomerAPI from "./API/DataDrocessCustomerAPI";
import StaffScheduleAPI from "./API/StaffScheduleAPI";
import PaymentAPI from "./API/PaymentAPI";
import CostAPI from "./API/CostAPI";
import ContactAPI from "./API/ContactAPI";
import ExportAPI from "./API/ExportAPI";
export const Service = createContext();
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
    servicesAPI: ServicesAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
    containerserviceAPI: ContainerServiceAPI(),
    bookingAPI: BookingAPI(),
    alluserAPI: AllUserAPI(),
    dataprocesscustomerAPI: DataProcessCustomerAPI(),
    staffscheduleAPI: StaffScheduleAPI(),
    paymentAPI: PaymentAPI(),
    costAPI: CostAPI(),
    contactAPI: ContactAPI(),
    exportAPI : ExportAPI(),
  };

  ServicesAPI();
  return <Service.Provider value={state}>{children}</Service.Provider>;
};
