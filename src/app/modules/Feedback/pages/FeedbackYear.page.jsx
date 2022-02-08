import React, { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { PieChart, Pie, Sector, Cell, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import FilterFeedback from '../components/filterFeedback'
import FeedbackService from '../service/Feedback.sevice'
function FeedbackYear() {
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()

    const [chars, setChars] = useState([]) // 1
    const [date, setDates] = useState([]) // 1
    const onHandSubmit = async (data) => {

        setDates({ monthNow: 0, yearNow: data.yearNow })
        const { data: chars } = await FeedbackService.analytics(0, data.yearNow)
        const keys = Object.values(chars.time)
        const array = keys.map((i, index) => ({
            time: i,
            value: chars.value[index]
        }))
        setChars(array)
    }
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
        <div className='section-all'>
            <FilterFeedback />
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
            <section className='row'>
                <div className="col-lg-3 d-flex align-items-center">
                    <form onSubmit={handleSubmit(onHandSubmit)} className='d-flex align-items-center'>
                        <select id="cars" name="yearNow" form="carform" ref={register}>
                            <option value="">Chọn năm</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                        </select>
                        <button className="btn-success font-weight-bolder font-size-sm" type="submit">
                            Xem biểu đồ
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}
export default FeedbackYear