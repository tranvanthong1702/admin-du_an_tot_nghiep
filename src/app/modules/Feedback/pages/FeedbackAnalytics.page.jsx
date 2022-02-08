import React, { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router'
import { PieChart, Pie, Sector, Cell, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import FilterFeedback from '../components/filterFeedback'
import FeedbackService from '../service/Feedback.sevice'


function FeedbackAnalyticsPage() {
  const { status, month, year } = useParams()
  const start = Date.now()
  const convertDate = (data) => {
    const date = new Date(data)
    const newData = {
      monthNow: date.getMonth() + 1,
      yearNow: date.getFullYear()
    }
    return newData
  }
  // console.log(date)
  const defaultDate = convertDate(start)
  console.log(defaultDate)
  const [chars, setChars] = useState([]) // 1
  useEffect(() => {
    const getChars = async () => {
      try {
        const { data: chars } = await FeedbackService.analytics(defaultDate.monthNow, defaultDate.yearNow)
        console.log(chars)
        const keys = Object.values(chars.pointName)
        const array = keys.map((i, index) => ({
          pointName: i,
          value: chars.value[index]
        }))
        setChars(array)
      } catch (error) {
        console.log(error)
      }
    }
    getChars()
  }, [])
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.pointName}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Số sao ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return (
    <div>

      <div>
        <FilterFeedback />
        <h1>
          Tháng : {defaultDate.monthNow}, Năm : {defaultDate.yearNow}
        </h1>

        <section className="mt-20 d-flex justify-content-center">
          <ComposedChart
            width={500}
            height={400}
            data={chars}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="pointName" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={20} name="số sao" fill="#413ea0" />
            {/* <Line type="monotone" dataKey="value" stroke="#ff7300" /> */}
          </ComposedChart>
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chars}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </section>
      </div>

    </div>
  )
}

export default FeedbackAnalyticsPage
