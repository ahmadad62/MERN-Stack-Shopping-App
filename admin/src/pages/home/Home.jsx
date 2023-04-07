import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}



/* The useMemo hook is a memoization hook provided by React. It allows you to memoize expensive computations so that they are only re-computed when necessary.

In this code, the useMemo hook is used to memoize an array of month names. The memoized array is created using an arrow function that returns an array of month names. The second argument ([]) is an array of dependencies that specifies when the memoized value should be recomputed.

Since the array of month names does not depend on any external variables or props, the dependency array is empty ([]). This means that the memoized array will be computed once, when the component is mounted, and then reused for subsequent renders unless the dependencies change.

By memoizing the array of month names, this code avoids the unnecessary re-evaluation of the array on each render, which can help improve performance. */