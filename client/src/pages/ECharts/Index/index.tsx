import React, { Fragment, useEffect, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Api from "@/api";
import PageContent from "@/components/PageContent";
import * as echarts from "@/pages/ECharts/components/ec-canvas/echarts.js";
// import EChartsNode from "@/pages/ECharts/components/EChartsNode";
// import EChartsTable from "@/pages/ECharts/components/EChartsTable";

import "./index.less";

export default function ECharts() {
  const { params } = useRouter();

  const chart = useRef<any>(null);
  const timerRefresh = useRef<NodeJS.Timeout>(null);

  const onLoad = async () => {
    Taro.hideShareMenu();

    if (!timerRefresh.current) {
      // clearInterval(timerRefresh.current);
      timerRefresh.current = setInterval(() => {
        console.log("setChartData...");
        const option = setChartData();
        option.series[0].data[3] = Math.floor(Math.random() * 1000);
        chart.current.setOption(option);
      }, 1000);
    }
  };

  const setChartData = () => {
    const option = {
      title: {
        text: "堆叠区域图",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    return option;
  };

  // 初始化图表
  const initChart = (canvas, width, height) => {
    chart.current = echarts.init(canvas, null, {
      width: width,
      height: height,
    });
    canvas.setChart(chart.current);
    return chart;
  };

  const [ec, setEC] = useState({
    onInit: initChart,
  });

  useEffect(() => {
    onLoad();
    return () => {
      if (timerRefresh.current) {
        clearInterval(timerRefresh.current);
        timerRefresh.current = null;
      }
    };
  }, []);

  const hanldeTestClick = () => {
    // console.log("hanldeTestClick", refChart);
  };

  const handleTitleClick = () => {
    // console.log("handleTitleClick", refChart);
    // setChartData();
  };

  return (
    <PageContent
      strNavigationTitle=""
      colorBackgroud="transparent"
      isShowLeftIcon
      isTransparent
      customClass="flex-center-v"
    >
      <View onClick={hanldeTestClick}>Test</View>
      <View onClick={handleTitleClick}>This is Page ECharts.</View>
      {/* <EChartsNode option={optionECharts} /> */}
      {/* <EChartsTable /> */}
      <View className="echartWrap">
        <ec-canvas id="mychart-dom-area" canvas-id="mychart-area" ec={ec} />
      </View>
    </PageContent>
  );
}
