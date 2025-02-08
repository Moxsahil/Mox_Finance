"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { Chart, ChartLoading } from "@/components/chart";
import { SpendingPie, SpendingPieLoading } from "@/components/spending-pie";

export const DataCharts = () => {
    const { data, isLoading } = useGetSummary();

    if( isLoading ){
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="col-span-1 ">
                    <ChartLoading />
                </div>
                <div className="col-span-1 ">
                    <SpendingPieLoading />
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="col-span-1 ">
                <Chart data={data?.days}/>
            </div>
            <div className="col-span-1">
                <SpendingPie data={data?.categories}/>
            </div>
        </div>
    )
}