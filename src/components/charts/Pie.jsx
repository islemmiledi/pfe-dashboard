import React, { useEffect } from "react";
import { Pie } from "@ant-design/plots";
import { getAllGerant } from "../../api/actions/gerant.actions";
import { getAllSalle } from "../../api/actions/salle.actions";
import { useDispatch, useSelector } from "react-redux";

const PieChart = () => {
  const dispatch = useDispatch();
  const gerants = useSelector((state) => state?.gerant?.users?.data);
  const salles = useSelector((state) => state?.salle?.salles?.data);

  useEffect(() => {
    dispatch(getAllGerant());
    dispatch(getAllSalle());
  }, [dispatch]);
  const data = [
    { type: "Gerant", value: gerants ? gerants.length : 0 },
    { type: "Salle", value: salles ? salles.length : 0 },

    { type: "Membre", value: 25 },

    //   { type: "其他", value: 5 },
  ];

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    paddingRight: 80,
    label: {
      text: "value",
      position: "outside",
    },
    legend: {
      color: {
        title: false,
        position: "left",
        rowPadding: 8,
      },
    },
  };
  return <Pie {...config} />;
};

export default PieChart;
