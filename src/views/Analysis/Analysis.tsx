import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { CircularProgress, Typography } from "@mui/joy"
import { ResponsiveBar } from "@nivo/bar"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { getAnalysis } from "../../api/getAnalysis"
import { Analysis, FeatureList, VariableRanking } from "../../api/mockedData"

function ModelDisplay({ analysis }: { analysis: Analysis[] }) {
  const featureList = analysis[0] as FeatureList
  const keys = featureList.value
  const data = (analysis.slice(1) as VariableRanking[]).map(val => ({
    origin: val.origin,
    ...val.value,
  }))

  return (
    <div className="w-screen p-2">
      <div className="mx-auto max-w-[800px] overflow-scroll rounded-md border border-gray-300 bg-gray-200 px-2">
        <div style={{ height: "calc(100vh - 12rem)" }} className="min-w-[500px]">
          <ResponsiveBar
            layout="horizontal"
            data={data as any}
            indexBy="origin"
            keys={keys as any}
            barAriaLabel={e => `${e.index}`}
            groupMode="grouped"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueFormat={val => `${(val * 100).toFixed(1)}%`}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "origin",
              legendPosition: "middle",
              legendOffset: 32,
              truncateTickAt: 0,
            }}
            labelSkipWidth={20}
            labelSkipHeight={20}
            axisBottom={{ format: val => `${(val * 100).toFixed(0)}%`, truncateTickAt: 0 }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

const AnalysisView = () => {
  const params = useParams()
  const navigate = useNavigate()
  const modelName = params.model_name
  if (!modelName) throw new Error("No model name provided")
  const [loading, setLoading] = useState(true)
  const [analyses, setAnalyses] = useState<Analysis[][]>([])

  useEffect(() => {
    setLoading(true)
    getAnalysis(modelName).then(({ data: newAnalyses }) => {
      if (!newAnalyses[0]) {
        return navigate("/404")
      }
      setAnalyses(newAnalyses as Analysis[][])
      setLoading(false)
    })
  }, [])

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <div className="relative my-2 flex w-full flex-row items-center justify-center p-2">
        <Link className="absolute left-4 rounded-md p-2 hover:bg-slate-100" to="/Inventory">
          <KeyboardBackspaceIcon />
        </Link>
        <Typography level="h3">{modelName}</Typography>
      </div>
      <div className="inline-flex flex-shrink flex-row flex-wrap justify-center gap-4">
        {loading ? (
          <CircularProgress />
        ) : (
          analyses.map(analysis => <ModelDisplay analysis={analysis} />)
        )}
      </div>
    </div>
  )
}

export default AnalysisView
